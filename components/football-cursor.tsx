"use client";

import { useEffect, useState } from "react";

function SoccerBallSvg() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.35))" }}
    >
      <defs>
        {/* 3D gradient — stays fixed so sphere looks solid */}
        <radialGradient id="fg" cx="37%" cy="32%" r="68%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="55%"  stopColor="#e6e6e6" />
          <stop offset="100%" stopColor="#a0a0a0" />
        </radialGradient>
        {/* Clip pentagon pattern to ball circle */}
        <clipPath id="fc">
          <circle cx="15" cy="15" r="13.5" />
        </clipPath>
      </defs>

      {/* ── Static sphere ── */}
      <circle
        cx="15" cy="15" r="13.5"
        fill="url(#fg)"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.5"
      />

      {/* ── Rotating pentagon pattern ── */}
      <g
        clipPath="url(#fc)"
        style={{
          animation: "ball-spin 1.8s linear infinite",
          transformOrigin: "15px 15px",
        }}
      >
        {/* Center pentagon */}
        <polygon points="15,8 20.1,12.1 18.1,18.6 11.9,18.6 9.9,12.1" fill="#161616" />
        {/* Top-left (partially off ball, clipped) */}
        <polygon points="0.5,5.5 6.5,2.5 9.9,12.1 3.5,15.5 -2,10.5" fill="#161616" />
        {/* Top-right */}
        <polygon points="29.5,5.5 23.5,2.5 20.1,12.1 26.5,15.5 32,10.5" fill="#161616" />
        {/* Bottom-left */}
        <polygon points="2,26.5 6.5,20 11.9,18.6 10.5,26 5,29.5" fill="#161616" />
        {/* Bottom-right */}
        <polygon points="28,26.5 23.5,20 18.1,18.6 19.5,26 25,29.5" fill="#161616" />
        {/* Bottom-center */}
        <polygon points="10.5,26 19.5,26 18.1,18.6 11.9,18.6 15,30" fill="#161616" />
      </g>

      {/* ── Static shine ── */}
      <ellipse
        cx="9.5" cy="8"
        rx="3.8" ry="2.4"
        fill="rgba(255,255,255,0.42)"
        transform="rotate(-20,9.5,8)"
      />
    </svg>
  );
}

export function FootballCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);

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
        position: "fixed",
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.15s ease",
        userSelect: "none",
      }}
    >
      <SoccerBallSvg />
    </div>
  );
}
