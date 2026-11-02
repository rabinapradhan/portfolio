export function StarLoader({ fullPage = false }) {
  const tones = ["text-lavender", "text-pink", "text-cyan"];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`flex h-full w-full flex-col items-center justify-center gap-5 ${
        fullPage ? "min-h-[75vh] pt-24" : ""
      }`}
    >
      <div className="star-loader" aria-hidden="true">
        {tones.map((tone) => (
          <span className={`star-loader-track ${tone}`} key={tone}>
            <span className="star-loader-trail" />
            <span className="star-loader-spark" />
          </span>
        ))}
      </div>

      <span className="text-sm text-muted-foreground">
        Loading<span aria-hidden="true">…</span>
      </span>
    </div>
  );
}
