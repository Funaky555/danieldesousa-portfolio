"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight, Camera, Eraser, Eye, EyeOff, Minus, MousePointer2,
  Play, Plus, Square, Triangle, Undo2, Trash2, X, ZapIcon,
  ChevronRight, ChevronLeft, StopCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Ball, BoardSnapshot, Drawing, FieldView, FormationName, Keyframe, Player, Point, Tool } from "./types";
import {
  PITCH_W, PITCH_H,
  canvasToLogical, logicalToCanvas, renderBoard, findPlayerAtPoint,
  findDrawingAtPoint,
} from "./pitch-renderer";

// ─── Constants ────────────────────────────────────────────────────────────────
const PL = 15, PR = PITCH_W - 15, PT = 15, PB = PITCH_H - 15;

const FORMATIONS: Record<FormationName, Array<{ x: number; y: number }>> = {
  "4-3-3": [
    { x: 0.04, y: 0.50 }, { x: 0.20, y: 0.15 }, { x: 0.20, y: 0.36 },
    { x: 0.20, y: 0.64 }, { x: 0.20, y: 0.85 }, { x: 0.41, y: 0.26 },
    { x: 0.42, y: 0.50 }, { x: 0.41, y: 0.74 }, { x: 0.65, y: 0.15 },
    { x: 0.68, y: 0.50 }, { x: 0.65, y: 0.85 },
  ],
  "4-4-2": [
    { x: 0.04, y: 0.50 }, { x: 0.20, y: 0.10 }, { x: 0.20, y: 0.37 },
    { x: 0.20, y: 0.63 }, { x: 0.20, y: 0.90 }, { x: 0.42, y: 0.10 },
    { x: 0.42, y: 0.37 }, { x: 0.42, y: 0.63 }, { x: 0.42, y: 0.90 },
    { x: 0.64, y: 0.33 }, { x: 0.64, y: 0.67 },
  ],
  "4-2-3-1": [
    { x: 0.04, y: 0.50 }, { x: 0.20, y: 0.10 }, { x: 0.20, y: 0.37 },
    { x: 0.20, y: 0.63 }, { x: 0.20, y: 0.90 }, { x: 0.37, y: 0.37 },
    { x: 0.37, y: 0.63 }, { x: 0.52, y: 0.15 }, { x: 0.53, y: 0.50 },
    { x: 0.52, y: 0.85 }, { x: 0.68, y: 0.50 },
  ],
  "3-5-2": [
    { x: 0.04, y: 0.50 }, { x: 0.20, y: 0.23 }, { x: 0.20, y: 0.50 },
    { x: 0.20, y: 0.77 }, { x: 0.39, y: 0.08 }, { x: 0.41, y: 0.30 },
    { x: 0.42, y: 0.50 }, { x: 0.41, y: 0.70 }, { x: 0.39, y: 0.92 },
    { x: 0.63, y: 0.35 }, { x: 0.63, y: 0.65 },
  ],
};

function genId() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

function makeTeam(team: "A" | "B", formation: FormationName): Player[] {
  return FORMATIONS[formation].map((pos, i) => {
    const rawX = PL + pos.x * (PR - PL);
    const rawY = PT + pos.y * (PB - PT);
    return {
      id: `${team}${i + 1}`,
      team,
      type: i === 0 ? "goalkeeper" : "player",
      number: i + 1,
      name: "",
      x: team === "A" ? rawX : PITCH_W - rawX,
      y: rawY,
      visible: true,
    };
  });
}

function getInitialPlayers(): Player[] {
  return [...makeTeam("A", "4-3-3"), ...makeTeam("B", "4-3-3")];
}

// ─── Component ────────────────────────────────────────────────────────────────
export function CoachLabApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const isPlayingRef = useRef(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Drag / draw refs (no re-render needed during operation)
  const draggingRef = useRef<{ id: string; type: "player" | "ball"; offsetX: number; offsetY: number } | null>(null);
  const isDrawingRef = useRef(false);
  const drawStartRef = useRef<Point | null>(null);
  const pendingHistoryRef = useRef<BoardSnapshot | null>(null);

  // Live value refs (for event handlers & animation loop)
  const activeToolRef = useRef<Tool>("select");
  const fieldViewRef = useRef<FieldView>("full");
  const drawColorRef = useRef("#ffffff");
  const showNamesRef = useRef(true);
  const showZonesRef = useRef(false);
  const lightFieldRef = useRef(false);
  const playersRef = useRef<Player[]>([]);
  const ballRef = useRef<Ball>({ x: PITCH_W / 2, y: PITCH_H / 2 });
  const drawingsRef = useRef<Drawing[]>([]);

  // ─── State ──────────────────────────────────────────────────────────────────
  const [players, setPlayers] = useState<Player[]>(getInitialPlayers);
  const [ball, setBall] = useState<Ball>({ x: PITCH_W / 2, y: PITCH_H / 2 });
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [currentDraw, setCurrentDraw] = useState<{ start: Point; end: Point; tool: Drawing["tool"]; color: string } | null>(null);
  const [history, setHistory] = useState<BoardSnapshot[]>([]);
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]);
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [drawColor, setDrawColor] = useState("#ffffff");
  const [fieldView, setFieldView] = useState<FieldView>("full");
  const [showNames, setShowNames] = useState(true);
  const [showZones, setShowZones] = useState(false);
  const [lightField, setLightField] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  // Sync refs with state
  useEffect(() => { playersRef.current = players; }, [players]);
  useEffect(() => { ballRef.current = ball; }, [ball]);
  useEffect(() => { drawingsRef.current = drawings; }, [drawings]);

  // ─── Canvas resize ──────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      setCanvasSize({ w: canvas.width, h: canvas.height });
    };
    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  // ─── Canvas render ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderBoard(ctx, canvas, players, ball, drawings, fieldView, showNames, showZones, lightField, currentDraw, selectedPlayerId);
  }, [players, ball, drawings, fieldView, showNames, showZones, lightField, currentDraw, selectedPlayerId, canvasSize]);

  // ─── Keyboard shortcuts ─────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (editingPlayerId) return;
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if (e.key === "Escape") {
        setSelectedPlayerId(null);
        setEditingPlayerId(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingPlayerId]);

  // ─── History helpers ────────────────────────────────────────────────────────
  const captureHistory = useCallback(() => {
    pendingHistoryRef.current = {
      players: playersRef.current,
      ball: ballRef.current,
      drawings: drawingsRef.current,
    };
  }, []);

  const commitHistory = useCallback(() => {
    if (pendingHistoryRef.current) {
      setHistory(prev => [...prev.slice(-49), pendingHistoryRef.current!]);
      pendingHistoryRef.current = null;
    }
  }, []);

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setPlayers(last.players);
      setBall(last.ball);
      setDrawings(last.drawings);
      return prev.slice(0, -1);
    });
  }, []);

  // ─── Canvas coordinate helper ───────────────────────────────────────────────
  const toLogical = useCallback((clientX: number, clientY: number): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    return canvasToLogical(clientX, clientY, canvas, fieldViewRef.current);
  }, []);

  // ─── Pointer handlers ───────────────────────────────────────────────────────
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (editingPlayerId) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const { x, y } = toLogical(e.clientX, e.clientY);
    captureHistory();

    const tool = activeToolRef.current;

    if (tool === "eraser") {
      const drawId = findDrawingAtPoint(drawingsRef.current, x, y);
      if (drawId) {
        commitHistory();
        setDrawings(prev => prev.filter(d => d.id !== drawId));
      }
      return;
    }

    if (tool === "select") {
      const hit = findPlayerAtPoint(playersRef.current, ballRef.current, x, y);
      if (hit) {
        setSelectedPlayerId(hit.type === "player" ? hit.id : null);
        const px = hit.type === "player" ? playersRef.current.find(p => p.id === hit.id)!.x : ballRef.current.x;
        const py = hit.type === "player" ? playersRef.current.find(p => p.id === hit.id)!.y : ballRef.current.y;
        draggingRef.current = { id: hit.type === "player" ? hit.id : "__ball__", type: hit.type, offsetX: x - px, offsetY: y - py };
      } else {
        setSelectedPlayerId(null);
      }
      return;
    }

    // Drawing tool
    isDrawingRef.current = true;
    drawStartRef.current = { x, y };
    setCurrentDraw({ start: { x, y }, end: { x, y }, tool: tool as Drawing["tool"], color: drawColorRef.current });
  }, [toLogical, captureHistory, commitHistory, editingPlayerId]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = toLogical(e.clientX, e.clientY);

    if (draggingRef.current) {
      const clamped = {
        x: Math.max(0, Math.min(PITCH_W, x - draggingRef.current.offsetX)),
        y: Math.max(0, Math.min(PITCH_H, y - draggingRef.current.offsetY)),
      };
      if (draggingRef.current.type === "player") {
        const id = draggingRef.current.id;
        setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...clamped } : p));
      } else {
        setBall(clamped);
      }
    }

    if (isDrawingRef.current && drawStartRef.current) {
      setCurrentDraw(prev => prev ? { ...prev, end: { x, y } } : null);
    }
  }, [toLogical]);

  const handlePointerUp = useCallback(() => {
    const wasDragging = draggingRef.current !== null;
    const wasDrawing = isDrawingRef.current;

    draggingRef.current = null;

    if (wasDrawing && currentDraw) {
      const dx = currentDraw.end.x - currentDraw.start.x;
      const dy = currentDraw.end.y - currentDraw.start.y;
      if (Math.hypot(dx, dy) > 8) {
        commitHistory();
        setDrawings(prev => [...prev, { id: genId(), ...currentDraw }]);
      }
      setCurrentDraw(null);
      isDrawingRef.current = false;
      drawStartRef.current = null;
    }

    if (wasDragging) commitHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDraw, commitHistory]);

  const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = toLogical(e.clientX, e.clientY);
    const hit = findPlayerAtPoint(playersRef.current, ballRef.current, x, y);
    if (hit?.type === "player") {
      const player = playersRef.current.find(p => p.id === hit.id);
      if (player) {
        setEditingPlayerId(hit.id);
        setEditingName(player.name);
        setTimeout(() => nameInputRef.current?.focus(), 50);
      }
    }
  }, [toLogical]);

  const commitEdit = useCallback(() => {
    if (!editingPlayerId) return;
    setPlayers(prev => prev.map(p => p.id === editingPlayerId ? { ...p, name: editingName } : p));
    setEditingPlayerId(null);
  }, [editingPlayerId, editingName]);

  // ─── Tool/setting setters (sync ref + state) ────────────────────────────────
  const changeTool = (t: Tool) => { activeToolRef.current = t; setActiveTool(t); };
  const changeView = (v: FieldView) => { fieldViewRef.current = v; setFieldView(v); };
  const changeColor = (c: string) => { drawColorRef.current = c; setDrawColor(c); };
  const toggleNames = () => { showNamesRef.current = !showNames; setShowNames(v => !v); };
  const toggleZones = () => { showZonesRef.current = !showZones; setShowZones(v => !v); };
  const toggleLight = () => { lightFieldRef.current = !lightField; setLightField(v => !v); };

  // ─── Board actions ──────────────────────────────────────────────────────────
  const clearDrawings = () => {
    setHistory(prev => [...prev.slice(-49), { players, ball, drawings }]);
    setDrawings([]);
  };
  const clearAll = () => {
    setHistory(prev => [...prev.slice(-49), { players, ball, drawings }]);
    setDrawings([]);
    setPlayers(getInitialPlayers());
    setBall({ x: PITCH_W / 2, y: PITCH_H / 2 });
    setKeyframes([]);
  };
  const ballToCenter = () => {
    setHistory(prev => [...prev.slice(-49), { players, ball, drawings }]);
    setBall({ x: PITCH_W / 2, y: PITCH_H / 2 });
  };

  const applyFormation = (team: "A" | "B", formation: FormationName) => {
    setHistory(prev => [...prev.slice(-49), { players, ball, drawings }]);
    const newTeam = makeTeam(team, formation);
    setPlayers(prev => [...prev.filter(p => p.team !== team), ...newTeam]);
  };

  const mirrorAtoB = () => {
    setHistory(prev => [...prev.slice(-49), { players, ball, drawings }]);
    const teamA = players.filter(p => p.team === "A");
    setPlayers(prev => [
      ...prev.filter(p => p.team === "A"),
      ...prev.filter(p => p.team === "B").map(pb => {
        const matchA = teamA.find(pa => pa.number === pb.number);
        return matchA ? { ...pb, x: PITCH_W - matchA.x, y: matchA.y } : pb;
      }),
    ]);
  };

  const togglePlayerVisibility = (id: string) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
  };

  // ─── Screenshot ─────────────────────────────────────────────────────────────
  const takeScreenshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `coach-lab-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  // ─── Keyframes ──────────────────────────────────────────────────────────────
  const saveKeyframe = () => {
    const label = `Phase ${keyframes.length + 1}`;
    setKeyframes(prev => [...prev, {
      id: genId(), label,
      players: JSON.parse(JSON.stringify(players)),
      ball: { ...ball },
    }]);
  };
  const deleteKeyframe = (id: string) => setKeyframes(prev => prev.filter(k => k.id !== id));

  // ─── Animation ──────────────────────────────────────────────────────────────
  const stopAnimation = useCallback(() => {
    isPlayingRef.current = false;
    cancelAnimationFrame(animFrameRef.current);
    setIsPlaying(false);
    setIsRecording(false);
    setPlayProgress(0);
  }, []);

  const playAnimation = useCallback(async (shouldRecord: boolean) => {
    if (keyframes.length < 2 || isPlayingRef.current) return;
    isPlayingRef.current = true;
    setIsPlaying(true);

    const canvas = canvasRef.current;
    if (!canvas) { stopAnimation(); return; }
    const ctx = canvas.getContext("2d");
    if (!ctx) { stopAnimation(); return; }

    let recorder: MediaRecorder | null = null;
    const chunks: Blob[] = [];

    if (shouldRecord) {
      try {
        const stream = canvas.captureStream(30);
        const mimeType = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"]
          .find(t => MediaRecorder.isTypeSupported(t)) ?? "video/webm";
        recorder = new MediaRecorder(stream, { mimeType });
        recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
        recorder.start();
        setIsRecording(true);
      } catch {
        // MediaRecorder not supported
      }
    }

    const DURATION = 1500;
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (!isPlayingRef.current) break;
      const from = keyframes[i];
      const to = keyframes[i + 1];
      await new Promise<void>(resolve => {
        const t0 = performance.now();
        const tick = (now: number) => {
          if (!isPlayingRef.current) { resolve(); return; }
          const t = Math.min((now - t0) / DURATION, 1);
          const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const ap = from.players.map(fp => {
            const tp = to.players.find(p => p.id === fp.id);
            return tp ? { ...fp, x: fp.x + (tp.x - fp.x) * e, y: fp.y + (tp.y - fp.y) * e } : fp;
          });
          const ab = { x: from.ball.x + (to.ball.x - from.ball.x) * e, y: from.ball.y + (to.ball.y - from.ball.y) * e };
          renderBoard(ctx, canvas, ap, ab, drawingsRef.current, fieldViewRef.current, showNamesRef.current, showZonesRef.current, lightFieldRef.current, null, null);
          setPlayProgress((i + t) / (keyframes.length - 1));
          if (t < 1) { animFrameRef.current = requestAnimationFrame(tick); }
          else { resolve(); }
        };
        animFrameRef.current = requestAnimationFrame(tick);
      });
    }

    if (isPlayingRef.current) {
      const last = keyframes[keyframes.length - 1];
      setPlayers([...last.players]);
      setBall({ ...last.ball });
    }

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `coach-lab-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
      };
    }

    isPlayingRef.current = false;
    setIsPlaying(false);
    setIsRecording(false);
    setPlayProgress(0);
  }, [keyframes, stopAnimation]);

  // ─── Cursor ─────────────────────────────────────────────────────────────────
  const getCursor = () => {
    if (activeTool === "eraser") return "cell";
    if (activeTool === "select") return "grab";
    return "crosshair";
  };

  // ─── Editing player screen position ─────────────────────────────────────────
  const getEditInputPos = () => {
    const canvas = canvasRef.current;
    if (!canvas || !editingPlayerId) return null;
    const player = players.find(p => p.id === editingPlayerId);
    if (!player) return null;
    return logicalToCanvas(player.x, player.y + 22, canvas, fieldView);
  };

  const editPos = getEditInputPos();

  // ─── UI helpers ─────────────────────────────────────────────────────────────
  const teamA = players.filter(p => p.team === "A").sort((a, b) => a.number - b.number);
  const teamB = players.filter(p => p.team === "B").sort((a, b) => a.number - b.number);
  const formations: FormationName[] = ["4-3-3", "4-4-2", "4-2-3-1", "3-5-2"];
  const viewOptions: { label: string; value: FieldView }[] = [
    { label: "Full", value: "full" }, { label: "½L", value: "half-left" },
    { label: "½R", value: "half-right" }, { label: "AreaL", value: "area-left" },
    { label: "AreaR", value: "area-right" },
  ];
  const TOOL_COLORS: Record<"A" | "B", string> = { A: "#0066FF", B: "#EF4444" };

  // ─── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 flex flex-col" style={{ top: "3.5rem" }}>

      {/* ── Toolbar ───────────────────────────────────────────────────────────── */}
      <div className="flex-none bg-card border-b border-border flex items-center gap-1 px-2 py-1 overflow-x-auto">

        {/* Drawing tools */}
        {([
          { t: "select", icon: <MousePointer2 className="h-4 w-4" />, title: "Select / Move (drag players)" },
          { t: "line",   icon: <Minus className="h-4 w-4" />,          title: "Line" },
          { t: "arrow",  icon: <ArrowRight className="h-4 w-4" />,     title: "Arrow (movement)" },
          { t: "run",    icon: <ZapIcon className="h-4 w-4" />,        title: "Run / Desmarcação (dashed arrow)" },
          { t: "triangle",icon: <Triangle className="h-4 w-4" />,      title: "Triangle" },
          { t: "rect",   icon: <Square className="h-4 w-4" />,         title: "Rectangle" },
          { t: "eraser", icon: <Eraser className="h-4 w-4" />,         title: "Eraser" },
        ] as { t: Tool; icon: React.ReactNode; title: string }[]).map(({ t, icon, title }) => (
          <Button key={t} size="sm" variant={activeTool === t ? "default" : "ghost"}
            className="h-8 w-8 p-0" title={title} onClick={() => changeTool(t)}>
            {icon}
          </Button>
        ))}

        {/* Color picker */}
        <div className="relative mx-1 flex items-center gap-1" title="Arrow / Line color">
          <div className="h-6 w-6 rounded border-2 border-border" style={{ background: drawColor }} />
          <input type="color" value={drawColor} onChange={e => changeColor(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Field view */}
        {viewOptions.map(v => (
          <Button key={v.value} size="sm" variant={fieldView === v.value ? "default" : "ghost"}
            className="h-8 px-2 text-xs font-medium" onClick={() => changeView(v.value)}>
            {v.label}
          </Button>
        ))}

        <div className="w-px h-6 bg-border mx-1" />

        {/* Actions */}
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Undo (Ctrl+Z)" onClick={undo} disabled={history.length === 0}>
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Clear drawings" onClick={clearDrawings}>
          <Eraser className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-400" title="Reset all" onClick={clearAll}>
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Screenshot (PNG)" onClick={takeScreenshot}>
          <Camera className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Toggles */}
        <Button size="sm" variant={showNames ? "default" : "ghost"} className="h-8 px-2 text-xs" title="Show player names" onClick={toggleNames}>
          {showNames ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />} Names
        </Button>
        <Button size="sm" variant={showZones ? "default" : "ghost"} className="h-8 px-2 text-xs" title="Show zone labels" onClick={toggleZones}>
          Zones
        </Button>
        <Button size="sm" variant={lightField ? "default" : "ghost"} className="h-8 px-2 text-xs" title="Light field (for print)" onClick={toggleLight}>
          Light
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Ball to center */}
        <Button size="sm" variant="ghost" className="h-8 px-2 text-xs" title="Ball to center" onClick={ballToCenter}>
          ⚽ Center
        </Button>

        {/* Sidebar toggles (mobile friendly) */}
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 lg:hidden" onClick={() => setLeftOpen(v => !v)}>
            {leftOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 lg:hidden" onClick={() => setRightOpen(v => !v)}>
            {rightOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* ── Main area ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* Left panel: Teams */}
        <div className={`flex-none bg-card border-r border-border overflow-y-auto transition-all duration-200 ${leftOpen ? "w-48" : "w-0 overflow-hidden"}`}>
          <div className="p-2 min-w-[12rem]">
            {(["A", "B"] as const).map(team => (
              <div key={team} className="mb-4">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs font-bold" style={{ color: TOOL_COLORS[team] }}>
                    Team {team}
                  </span>
                </div>

                {/* Formation presets */}
                <div className="flex flex-wrap gap-0.5 mb-1">
                  {formations.map(f => (
                    <button key={f} onClick={() => applyFormation(team, f)}
                      className="text-[10px] px-1 py-0.5 rounded border border-border hover:border-muted-foreground/50 bg-secondary/50 transition-colors font-mono">
                      {f}
                    </button>
                  ))}
                </div>

                {team === "A" && (
                  <button onClick={mirrorAtoB}
                    className="text-[10px] px-1.5 py-0.5 rounded border border-border hover:border-muted-foreground/50 bg-secondary/50 mb-1 w-full text-center">
                    Mirror A → B
                  </button>
                )}

                {/* Player list */}
                <div className="space-y-0.5">
                  {(team === "A" ? teamA : teamB).map(p => (
                    <div key={p.id} className="flex items-center gap-1 text-xs">
                      <button onClick={() => togglePlayerVisibility(p.id)} className="flex-none">
                        {p.visible
                          ? <Eye className="h-3 w-3 text-muted-foreground" />
                          : <EyeOff className="h-3 w-3 text-muted-foreground/40" />
                        }
                      </button>
                      <span className="flex-none w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: p.type === "goalkeeper" ? (team === "A" ? "#93c5fd" : "#fca5a5") : TOOL_COLORS[team] }}>
                        {p.number}
                      </span>
                      <span className="truncate text-muted-foreground text-[10px]" title={p.name || "(no name)"}>
                        {p.name || <span className="italic opacity-50">dbl-click</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div ref={containerRef} className="flex-1 relative overflow-hidden min-w-0">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ cursor: getCursor(), touchAction: "none" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={handleDoubleClick}
          />

          {/* Player name editing overlay */}
          {editPos && editingPlayerId && (
            <input
              ref={nameInputRef}
              value={editingName}
              onChange={e => setEditingName(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={e => { if (e.key === "Enter") commitEdit(); if (e.key === "Escape") setEditingPlayerId(null); }}
              placeholder="Player name"
              style={{ left: editPos.x - 50, top: editPos.y }}
              className="absolute z-10 w-24 text-xs px-1 py-0.5 rounded bg-card border border-border text-foreground shadow-lg outline-none focus:ring-1 focus:ring-primary"
            />
          )}

          {/* Playing overlay */}
          {isPlaying && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 rounded-full px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="w-32 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-football-green transition-all" style={{ width: `${playProgress * 100}%` }} />
              </div>
              <button onClick={stopAnimation} className="text-white/80 hover:text-white">
                <StopCircle className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right panel: Animation + Instructions */}
        <div className={`flex-none bg-card border-l border-border overflow-y-auto transition-all duration-200 ${rightOpen ? "w-52" : "w-0 overflow-hidden"}`}>
          <div className="p-2 min-w-[13rem]">

            {/* Keyframes */}
            <p className="text-xs font-semibold text-foreground mb-1">Keyframes</p>
            <div className="space-y-0.5 mb-2">
              {keyframes.length === 0 && (
                <p className="text-[10px] text-muted-foreground italic">No keyframes yet. Save a moment to start animating.</p>
              )}
              {keyframes.map((kf, i) => (
                <div key={kf.id} className="flex items-center gap-1 bg-secondary/40 rounded px-1.5 py-0.5">
                  <span className="text-[10px] font-mono text-muted-foreground w-4">{i + 1}</span>
                  <span className="flex-1 text-xs truncate">{kf.label}</span>
                  <button onClick={() => deleteKeyframe(kf.id)} className="text-muted-foreground/60 hover:text-red-400">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            <Button size="sm" variant="outline" className="w-full h-7 text-xs mb-2" onClick={saveKeyframe}>
              <Plus className="h-3 w-3 mr-1" /> Save Moment
            </Button>

            {/* Animation controls */}
            <div className="space-y-1 mb-3">
              <Button size="sm" variant="default" className="w-full h-7 text-xs bg-football-green/80 hover:bg-football-green text-white"
                onClick={() => playAnimation(false)} disabled={keyframes.length < 2 || isPlaying}>
                <Play className="h-3 w-3 mr-1" /> Play
              </Button>
              <Button size="sm" variant="default"
                className={`w-full h-7 text-xs ${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-red-500/80 hover:bg-red-500"} text-white`}
                onClick={isRecording ? stopAnimation : () => playAnimation(true)}
                disabled={keyframes.length < 2 || (isPlaying && !isRecording)}>
                {isRecording ? <><StopCircle className="h-3 w-3 mr-1" /> Stop Rec</> : <><span className="mr-1">⏺</span> Record + Play</>}
              </Button>
              {isPlaying && (
                <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-football-green transition-all duration-100" style={{ width: `${playProgress * 100}%` }} />
                </div>
              )}
            </div>

            <div className="w-full h-px bg-border mb-2" />

            {/* Instructions */}
            <p className="text-xs font-semibold text-foreground mb-1">Instructions</p>
            <textarea
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              placeholder="Write tactical notes here..."
              className="w-full h-32 text-xs bg-secondary/30 border border-border rounded p-1.5 resize-none text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
