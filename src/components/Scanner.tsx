import { useCallback, useState } from "react";
import { FileUp, Sparkles, Loader2, Link2, Mail } from "lucide-react";

interface ScannerProps {
  onScan: (sample: string) => void;
  scanning: boolean;
}

const SAMPLE = `From: Apple Security <secure-apple@account-verify-id.com>
Subject: URGENT: Your Apple ID has been suspended (Action required in 24h)

Dear Customer,

We detected unusual sign-in activity. Your account will be permanently
LOCKED unless you verify your identity immediately.

>> Click here to restore access: http://apple-id-verify.secure-login.ru/r=98a

Failure to act within 24 hours will result in account termination.

Sincerely,
Apple Support Team`;

const SAMPLE_URL = "http://apple-id-verify.secure-login.ru/r=98a";

export function Scanner({ onScan, scanning }: ScannerProps) {
  const [text, setText] = useState("");
  const [target, setTarget] = useState("");
  const [drag, setDrag] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const file = e.dataTransfer.files[0];
      if (!file) return;
      file.text().then((t) => {
        setText(t);
        onScan(t);
      });
    },
    [onScan],
  );

  const runScan = () => {
    const payload = [text.trim(), target.trim() ? `\n\n[scan-target] ${target.trim()}` : ""]
      .join("")
      .trim();
    if (payload) onScan(payload);
  };

  return (
    <section id="scan" className="relative px-6 pb-20 pt-2">
      <div className="mx-auto max-w-4xl space-y-4">
        {/* Field 1 — full email content */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
          className={`relative rounded-3xl border bg-surface/60 p-2 backdrop-blur transition-all ${
            drag ? "border-primary shadow-[0_0_60px_-15px_var(--primary)]" : "border-border"
          }`}
          style={{ boxShadow: "0 20px 60px -30px oklch(0 0 0 / 0.6)" }}
        >
          <div className="rounded-[20px] border border-border bg-background/80 p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileUp className="h-3.5 w-3.5" />
                Paste headers or drop an .eml file
              </div>
              <button
                onClick={() => {
                  setText(SAMPLE);
                  setTarget(SAMPLE_URL);
                }}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-border-strong hover:text-foreground"
              >
                Try a sample
              </button>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="From: ...&#10;Subject: ...&#10;&#10;Paste the full email source here."
              className="h-44 w-full resize-none rounded-xl border border-border bg-surface/50 p-4 font-mono text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              style={{ fontFamily: "var(--font-mono)" }}
            />

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                {text.length.toLocaleString()} chars · scanned locally
              </span>
            </div>
          </div>
        </div>

        {/* Field 2 — URL / Sender Address */}
        <div
          className="relative rounded-3xl border border-border bg-surface/60 p-2 backdrop-blur"
          style={{ boxShadow: "0 20px 60px -30px oklch(0 0 0 / 0.6)" }}
        >
          <div className="rounded-[20px] border border-border bg-background/80 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Link2 className="h-3.5 w-3.5" />
              URL or sender address
              <span className="ml-1 rounded-full bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">
                optional
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="https://suspicious-site.ru  ·  no-reply@brand-verify.com"
                className="h-11 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                style={{ fontFamily: "var(--font-mono)" }}
              />
            </div>
          </div>
        </div>

        {/* Single CTA */}
        <div className="flex items-center justify-end pr-2">
          <button
            onClick={runScan}
            disabled={(!text.trim() && !target.trim()) || scanning}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_8px_30px_-8px_var(--primary)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {scanning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
                Analyze
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
