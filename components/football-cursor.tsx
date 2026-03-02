"use client";

import { useEffect, useRef } from "react";

export function FootballCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const rotRef     = useRef(0);
  const prevPos    = useRef({ x: 0, y: 0 });
  const rafRef     = useRef<number | null>(null);
  const latestXY   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const el = cursorRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      latestXY.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return; // já há um frame agendado

      rafRef.current = requestAnimationFrame(() => {
        const { x, y } = latestXY.current;
        const dx   = x - prevPos.current.x;
        const dy   = y - prevPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        prevPos.current = { x, y };
        rotRef.current += dist * 0.5;

        // Mutação directa do DOM — zero re-renders React
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rotRef.current}deg)`;
        rafRef.current = null;
      });
    };

    const onLeave = () => { el.style.opacity = "0"; };
    const onEnter = () => { el.style.opacity = "1"; };

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
      ref={cursorRef}
      aria-hidden
      style={{
        position:      "fixed",
        left:          0,
        top:           0,
        transform:     "translate(-200px, -200px) translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex:        99999,
        fontSize:      "24px",
        lineHeight:    1,
        opacity:       0,
        transition:    "opacity 0.15s ease",
        userSelect:    "none",
        willChange:    "transform",
      }}
    >
      ⚽
    </div>
  );
}
