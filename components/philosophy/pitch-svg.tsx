export function PitchSVG() {
  return (
    <svg
      viewBox="0 0 340 500"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Field background */}
      <rect
        x="0"
        y="0"
        width="340"
        height="500"
        rx="8"
        className="fill-football-green/5"
      />

      {/* Outer boundary */}
      <rect
        x="10"
        y="10"
        width="320"
        height="480"
        rx="2"
        fill="none"
        className="stroke-muted-foreground/20"
        strokeWidth="1.5"
      />

      {/* Center line */}
      <line
        x1="10"
        y1="250"
        x2="330"
        y2="250"
        className="stroke-muted-foreground/20"
        strokeWidth="1.5"
      />

      {/* Center circle */}
      <circle
        cx="170"
        cy="250"
        r="45"
        fill="none"
        className="stroke-muted-foreground/20"
        strokeWidth="1.5"
      />

      {/* Center spot */}
      <circle cx="170" cy="250" r="2" className="fill-muted-foreground/30" />

      {/* Top penalty area */}
      <rect
        x="75"
        y="10"
        width="190"
        height="75"
        fill="none"
        className="stroke-muted-foreground/20"
        strokeWidth="1.5"
      />

      {/* Top goal area */}
      <rect
        x="120"
        y="10"
        width="100"
        height="30"
        fill="none"
        className="stroke-muted-foreground/20"
        strokeWidth="1.5"
      />

      {/* Top penalty spot */}
      <circle cx="170" cy="65" r="2" className="fill-muted-foreground/30" />

      {/* Top penalty arc */}
      <path
        d="M 125 85 A 45 45 0 0 0 215 85"
        fill="none"
        className="stroke-muted-foreground/20"
        strokeWidth="1.5"
      />

      {/* Bottom penalty area */}
      <rect
        x="75"
        y="415"
        width="190"
        height="75"
        fill="none"
        className="stroke-muted-foreground/20"
        strokeWidth="1.5"
      />

      {/* Bottom goal area */}
      <rect
        x="120"
        y="460"
        width="100"
        height="30"
        fill="none"
        className="stroke-muted-foreground/20"
        strokeWidth="1.5"
      />

      {/* Bottom penalty spot */}
      <circle cx="170" cy="435" r="2" className="fill-muted-foreground/30" />

      {/* Bottom penalty arc */}
      <path
        d="M 125 415 A 45 45 0 0 1 215 415"
        fill="none"
        className="stroke-muted-foreground/20"
        strokeWidth="1.5"
      />

      {/* Corner arcs */}
      <path d="M 10 18 A 8 8 0 0 0 18 10" fill="none" className="stroke-muted-foreground/20" strokeWidth="1.5" />
      <path d="M 322 10 A 8 8 0 0 0 330 18" fill="none" className="stroke-muted-foreground/20" strokeWidth="1.5" />
      <path d="M 10 482 A 8 8 0 0 1 18 490" fill="none" className="stroke-muted-foreground/20" strokeWidth="1.5" />
      <path d="M 322 490 A 8 8 0 0 1 330 482" fill="none" className="stroke-muted-foreground/20" strokeWidth="1.5" />
    </svg>
  );
}
