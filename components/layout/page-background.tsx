interface PageBackgroundProps {
  imageUrl: string;
  overlay?: string;
}

export function PageBackground({
  imageUrl,
  overlay = "rgba(10, 14, 26, 0.75)",
}: PageBackgroundProps) {
  return (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: overlay }}
      />
    </div>
  );
}
