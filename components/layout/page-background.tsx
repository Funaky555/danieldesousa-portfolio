interface PageBackgroundProps {
  imageUrl: string;
  showGlowOrbs?: boolean;
}

export function PageBackground({
  imageUrl,
  showGlowOrbs = false,
}: PageBackgroundProps) {
  return (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/70" />
      {/* AI Glow Orbs */}
      {showGlowOrbs && (
        <>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-ai-blue/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-football-green/15 blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-tech-purple/10 blur-3xl" />
        </>
      )}
    </div>
  );
}
