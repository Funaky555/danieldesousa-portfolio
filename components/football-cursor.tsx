"use client";

import { useEffect, useRef, useState } from "react";

export function FootballCursor() {
  const [state, setState] = useState({ x: -100, y: -100, rotation: 0, visible: false });
  const prevPos  = useRef({ x: -100, y: -100 });
  const rafRef   = useRef<number | null>(null);
  const latestXY = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: MouseEvent) => {
      latestXY.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return; // já há um frame agendado — skip

      rafRef.current = requestAnimationFrame(() => {
        const { x, y } = latestXY.current;
        const dx   = x - prevPos.current.x;
        const dy   = y - prevPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        prevPos.current = { x, y };
        setState(s => ({ x, y, rotation: s.rotation + dist * 0.5, visible: true }));
        rafRef.current = null;
      });
    };

    const onLeave = () => setState(s => ({ ...s, visible: false }));
    const onEnter = () => setState(s => ({ ...s, visible: true }));

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position:      "fixed",
        left:          state.x,
        top:           state.y,
        transform:     `translate(-50%, -50%) rotate(${state.rotation}deg)`,
        pointerEvents: "none",
        zIndex:        99999,
        fontSize:      "24px",
        lineHeight:    1,
        opacity:       state.visible ? 1 : 0,
        transition:    "opacity 0.15s ease",
        userSelect:    "none",
      }}
    >
      ⚽
    </div>
  );
}
