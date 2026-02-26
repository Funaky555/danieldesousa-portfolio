"use client";

import { useEffect, useRef, useState } from "react";

export function FootballCursor() {
  const [pos, setPos]           = useState({ x: -100, y: -100 });
  const [rotation, setRotation] = useState(0);
  const [visible, setVisible]   = useState(false);
  const prevPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: MouseEvent) => {
      const dx   = e.clientX - prevPos.current.x;
      const dy   = e.clientY - prevPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      prevPos.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      // Rotate proportional to distance moved — stops when mouse stops
      setRotation((r) => r + dist * 0.5);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position:      "fixed",
        left:          pos.x,
        top:           pos.y,
        transform:     `translate(-50%, -50%) rotate(${rotation}deg)`,
        pointerEvents: "none",
        zIndex:        99999,
        fontSize:      "24px",
        lineHeight:    1,
        opacity:       visible ? 1 : 0,
        transition:    "opacity 0.15s ease",
        userSelect:    "none",
      }}
    >
      ⚽
    </div>
  );
}
