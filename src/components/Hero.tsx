export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pt-16 pb-6 text-center sm:pt-20 sm:pb-8"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="relative z-10 mx-auto max-w-3xl fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-success ticker-pulse" />
          Engine live · v3.2 — Real-time threat intelligence
        </span>
      </div>
    </section>
  );
}
