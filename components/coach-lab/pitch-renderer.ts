import type { Player, Ball, Drawing, Point, Tool, FieldView, ViewBounds } from './types';

// Logical pitch dimensions
export const PITCH_W = 1050;
export const PITCH_H = 680;

// Field boundaries (15px margin on all sides)
const PL = 15;  // pitch left
const PR = 1035; // pitch right
const PT = 15;  // pitch top
const PB = 665; // pitch bottom

// Derived constants
const CENTER_X = 525;
const CENTER_Y = 340;
const CENTER_CIRCLE_R = 88;   // 9.15m scaled
const PENALTY_DEPTH = 160;     // 16.5m from goal line
const PENALTY_HEIGHT = 386;    // 40.32m wide (half = 193)
const GOAL_AREA_DEPTH = 53;    // 5.5m
const GOAL_AREA_HEIGHT = 174;  // 18.32m wide (half = 87)
const PENALTY_SPOT_OFFSET = 107; // 11m
const CORNER_R = 10;
const PLAYER_R = 18;
const BALL_R = 12;
const PENALTY_ARC_ANGLE = Math.acos(53 / 88); // ~52.7°
const GOAL_HALF = 35; // half goal width (7m ≈ 70px, so 35 each side)
const GOAL_DEPTH = 15; // visual goal depth

export function getViewBounds(view: FieldView): ViewBounds {
  switch (view) {
    case 'full':       return { viewX: 0,   viewY: 0,   viewW: PITCH_W,   viewH: PITCH_H };
    case 'half-left':  return { viewX: 0,   viewY: 0,   viewW: PITCH_W/2, viewH: PITCH_H };
    case 'half-right': return { viewX: PITCH_W/2, viewY: 0, viewW: PITCH_W/2, viewH: PITCH_H };
    case 'area-left':  return { viewX: 0,   viewY: 130, viewW: 400, viewH: 420 };
    case 'area-right': return { viewX: 650, viewY: 130, viewW: 400, viewH: 420 };
  }
}

export function setupTransform(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  view: FieldView,
) {
  const { viewX, viewY, viewW, viewH } = getViewBounds(view);
  const w = canvas.width;
  const h = canvas.height;
  ctx.setTransform(w / viewW, 0, 0, h / viewH, -viewX * (w / viewW), -viewY * (h / viewH));
}

export function canvasToLogical(
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement,
  view: FieldView,
): Point {
  const rect = canvas.getBoundingClientRect();
  const relX = clientX - rect.left;
  const relY = clientY - rect.top;
  const { viewX, viewY, viewW, viewH } = getViewBounds(view);
  return {
    x: viewX + (relX / rect.width) * viewW,
    y: viewY + (relY / rect.height) * viewH,
  };
}

export function logicalToCanvas(
  lx: number,
  ly: number,
  canvas: HTMLCanvasElement,
  view: FieldView,
): Point {
  const { viewX, viewY, viewW, viewH } = getViewBounds(view);
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((lx - viewX) / viewW) * rect.width,
    y: ((ly - viewY) / viewH) * rect.height,
  };
}

export function drawPitch(
  ctx: CanvasRenderingContext2D,
  lightMode: boolean,
  showZones: boolean,
) {
  const green1 = lightMode ? '#5a9e4a' : '#1f5c32';
  const green2 = lightMode ? '#4f8e40' : '#1a4f2b';
  const lineColor = 'rgba(255,255,255,0.9)';
  const lw = 2;

  // Alternating grass stripes
  const stripeW = PITCH_W / 10;
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = i % 2 === 0 ? green1 : green2;
    ctx.fillRect(i * stripeW, 0, stripeW, PITCH_H);
  }

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lw;

  // Outer boundary
  ctx.strokeRect(PL, PT, PR - PL, PB - PT);

  // Center line
  ctx.beginPath();
  ctx.moveTo(CENTER_X, PT);
  ctx.lineTo(CENTER_X, PB);
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, CENTER_CIRCLE_R, 0, Math.PI * 2);
  ctx.stroke();

  // Center spot
  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, 3, 0, Math.PI * 2);
  ctx.fill();

  // --- LEFT SIDE ---
  const leftPenaltyX = PL + PENALTY_DEPTH;
  const leftPenaltyTop = CENTER_Y - PENALTY_HEIGHT / 2;
  const leftGoalAreaX = PL + GOAL_AREA_DEPTH;
  const leftGoalAreaTop = CENTER_Y - GOAL_AREA_HEIGHT / 2;
  const leftSpotX = PL + PENALTY_SPOT_OFFSET;

  // Left penalty area
  ctx.strokeRect(PL, leftPenaltyTop, PENALTY_DEPTH, PENALTY_HEIGHT);
  // Left goal area
  ctx.strokeRect(PL, leftGoalAreaTop, GOAL_AREA_DEPTH, GOAL_AREA_HEIGHT);
  // Left penalty spot
  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(leftSpotX, CENTER_Y, 3, 0, Math.PI * 2);
  ctx.fill();
  // Left penalty arc (portion outside penalty area)
  ctx.beginPath();
  ctx.arc(leftSpotX, CENTER_Y, CENTER_CIRCLE_R, -PENALTY_ARC_ANGLE, PENALTY_ARC_ANGLE);
  ctx.stroke();

  // Left goal (in margin, extends to left edge)
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(0, CENTER_Y - GOAL_HALF, GOAL_DEPTH, GOAL_HALF * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(0, CENTER_Y - GOAL_HALF, GOAL_DEPTH, GOAL_HALF * 2);
  ctx.lineWidth = lw;
  ctx.strokeStyle = lineColor;

  // --- RIGHT SIDE ---
  const rightPenaltyX = PR - PENALTY_DEPTH;
  const rightPenaltyTop = leftPenaltyTop;
  const rightGoalAreaX = PR - GOAL_AREA_DEPTH;
  const rightGoalAreaTop = leftGoalAreaTop;
  const rightSpotX = PR - PENALTY_SPOT_OFFSET;

  // Right penalty area
  ctx.strokeRect(rightPenaltyX, rightPenaltyTop, PENALTY_DEPTH, PENALTY_HEIGHT);
  // Right goal area
  ctx.strokeRect(rightGoalAreaX, rightGoalAreaTop, GOAL_AREA_DEPTH, GOAL_AREA_HEIGHT);
  // Right penalty spot
  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(rightSpotX, CENTER_Y, 3, 0, Math.PI * 2);
  ctx.fill();
  // Right penalty arc
  ctx.beginPath();
  ctx.arc(rightSpotX, CENTER_Y, CENTER_CIRCLE_R, Math.PI - PENALTY_ARC_ANGLE, Math.PI + PENALTY_ARC_ANGLE);
  ctx.stroke();

  // Right goal
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(PR, CENTER_Y - GOAL_HALF, GOAL_DEPTH, GOAL_HALF * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(PR, CENTER_Y - GOAL_HALF, GOAL_DEPTH, GOAL_HALF * 2);
  ctx.lineWidth = lw;
  ctx.strokeStyle = lineColor;

  // --- CORNER ARCS ---
  ctx.beginPath(); ctx.arc(PL,  PT,  CORNER_R, 0,          Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(PR,  PT,  CORNER_R, Math.PI / 2, Math.PI);    ctx.stroke();
  ctx.beginPath(); ctx.arc(PL,  PB,  CORNER_R, -Math.PI / 2, 0);         ctx.stroke();
  ctx.beginPath(); ctx.arc(PR,  PB,  CORNER_R, -Math.PI,     -Math.PI/2); ctx.stroke();

  // --- ZONE LABELS ---
  if (showZones) {
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = 'bold 28px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DEF', CENTER_X * 0.4, CENTER_Y);
    ctx.fillText('MID', CENTER_X, CENTER_Y);
    ctx.fillText('ATK', CENTER_X * 1.6, CENTER_Y);
    ctx.textBaseline = 'alphabetic';
  }
}

export function drawPlayers(
  ctx: CanvasRenderingContext2D,
  players: Player[],
  selectedId: string | null,
  showNames: boolean,
) {
  for (const player of players) {
    if (!player.visible) continue;
    const { x, y, team, type, number, name, id } = player;

    let fillColor: string;
    let textColor: string;
    let borderColor: string;

    if (type === 'goalkeeper') {
      if (team === 'A') {
        fillColor = '#f0f4ff';
        textColor = '#0055dd';
        borderColor = '#0066FF';
      } else {
        fillColor = '#111111';
        textColor = '#ffffff';
        borderColor = '#EF4444';
      }
    } else {
      if (team === 'A') {
        fillColor = '#0066FF';
        textColor = '#ffffff';
        borderColor = 'rgba(255,255,255,0.8)';
      } else {
        fillColor = '#EF4444';
        textColor = '#ffffff';
        borderColor = 'rgba(255,255,255,0.8)';
      }
    }

    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Fill
    ctx.beginPath();
    ctx.arc(x, y, PLAYER_R, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Border
    ctx.lineWidth = id === selectedId ? 3 : 2;
    ctx.strokeStyle = id === selectedId ? '#FFD700' : borderColor;
    ctx.stroke();

    // Number
    ctx.fillStyle = textColor;
    ctx.font = `bold 13px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(number), x, y);

    // Name label
    if (showNames && name) {
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.font = `10px Inter, system-ui, sans-serif`;
      ctx.fillText(name, x, y + PLAYER_R + 10);
    }
  }
  ctx.textBaseline = 'alphabetic';
}

export function drawBall(ctx: CanvasRenderingContext2D, ball: Ball) {
  const { x, y } = ball;

  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.beginPath();
  ctx.arc(x, y, BALL_R, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;

  // Simplified football pattern
  ctx.fillStyle = '#1a1a1a';
  const patches: [number, number, number][] = [
    [x, y - 5, 3.5],
    [x + 6.5, y + 4, 2.5],
    [x - 6.5, y + 4, 2.5],
    [x + 4, y - 7, 2],
    [x - 4, y - 7, 2],
  ];
  for (const [px, py, pr] of patches) {
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawArrowHead(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  size = 14,
) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(
    to.x - size * Math.cos(angle - Math.PI / 6),
    to.y - size * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    to.x - size * Math.cos(angle + Math.PI / 6),
    to.y - size * Math.sin(angle + Math.PI / 6),
  );
  ctx.closePath();
  ctx.fill();
}

export function drawShape(
  ctx: CanvasRenderingContext2D,
  tool: Drawing['tool'],
  start: Point,
  end: Point,
  color: string,
  isPreview = false,
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = isPreview ? 2 : 2.5;
  ctx.setLineDash([]);
  if (isPreview) ctx.globalAlpha = 0.65;

  switch (tool) {
    case 'line': {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      break;
    }
    case 'arrow': {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      drawArrowHead(ctx, start, end);
      break;
    }
    case 'run': {
      ctx.setLineDash([10, 6]);
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.setLineDash([]);
      drawArrowHead(ctx, start, end, 12);
      break;
    }
    case 'triangle': {
      const mx = (start.x + end.x) / 2;
      ctx.beginPath();
      ctx.moveTo(mx, start.y);
      ctx.lineTo(start.x, end.y);
      ctx.lineTo(end.x, end.y);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'rect': {
      ctx.beginPath();
      ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
      break;
    }
  }
  ctx.restore();
}

export function drawDrawings(
  ctx: CanvasRenderingContext2D,
  drawings: Drawing[],
) {
  for (const d of drawings) {
    drawShape(ctx, d.tool, d.start, d.end, d.color);
  }
}

export function renderBoard(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  players: Player[],
  ball: Ball,
  drawings: Drawing[],
  view: FieldView,
  showNames: boolean,
  showZones: boolean,
  lightField: boolean,
  currentDraw: { start: Point; end: Point; tool: Drawing['tool']; color: string } | null,
  selectedPlayerId: string | null,
) {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  setupTransform(ctx, canvas, view);
  drawPitch(ctx, lightField, showZones);
  drawDrawings(ctx, drawings);
  if (currentDraw) {
    drawShape(ctx, currentDraw.tool, currentDraw.start, currentDraw.end, currentDraw.color, true);
  }
  drawPlayers(ctx, players, selectedPlayerId, showNames);
  drawBall(ctx, ball);
  ctx.resetTransform();
}

function distToSegment(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (dx === 0 && dy === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
}

export function findPlayerAtPoint(
  players: Player[],
  ball: Ball,
  x: number,
  y: number,
): { type: 'player'; id: string } | { type: 'ball' } | null {
  if (Math.hypot(x - ball.x, y - ball.y) <= BALL_R + 6) {
    return { type: 'ball' };
  }
  for (let i = players.length - 1; i >= 0; i--) {
    const p = players[i];
    if (!p.visible) continue;
    if (Math.hypot(x - p.x, y - p.y) <= PLAYER_R + 6) {
      return { type: 'player', id: p.id };
    }
  }
  return null;
}

export function findDrawingAtPoint(drawings: Drawing[], x: number, y: number): string | null {
  const TOLERANCE = 10;
  for (let i = drawings.length - 1; i >= 0; i--) {
    const d = drawings[i];
    if (distToSegment({ x, y }, d.start, d.end) < TOLERANCE) {
      return d.id;
    }
  }
  return null;
}
