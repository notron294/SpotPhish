import { useState } from "react";
import { Terminal, Check, Copy, Zap, Lock, Globe } from "lucide-react";

const SNIPPETS = {
  curl: `curl -X POST https://api.phishguard.io/v1/scan \\
  -H "Authorization: Bearer $PHISHGUARD_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "email",
    "raw": "From: secure@account-verify-id.com\\nSubject: Urgent..."
  }'`,
  json: `{
  "scan_id": "scn_8f2d1a",
  "risk_score": 92,
  "severity": "critical",
  "verdict": "Likely phishing — do not interact",
  "flags": [
    {
      "category": "Sender",
      "signal": "Brand impersonation",
      "confidence": 96,
      "delta": 87
    },
    {
      "category": "Links",
      "signal": "Suspicious TLD (.ru)",
      "confidence": 92,
      "delta": 74
    }
  ],
  "urgency_meter": 88,
  "scanned_at": "2026-04-24T12:04:11Z"
}`,
};

export function ApiSection() {
  const [tab, setTab] = useState<"curl" | "json">("curl");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(SNIPPETS[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="api" className="px-6 py-20 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — docs */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <Terminal className="mr-1 inline h-3 w-3" />
              Developer API
            </p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ship phishing detection in <span className="text-primary">5 minutes</span>.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              One REST endpoint. JSON in, forensic verdict out. SDKs for Node, Python, Go and Rust.
              Rate limits scale automatically with your plan.
            </p>

            <div className="mt-8 space-y-5">
              <Feature
                icon={<Zap className="h-4 w-4" />}
                title="Sub-200ms p95 latency"
                detail="Edge-deployed inference across 14 regions. No cold starts."
              />
              <Feature
                icon={<Lock className="h-4 w-4" />}
                title="Zero data retention"
                detail="Email contents are scanned in-memory and discarded. SOC 2 Type II."
              />
              <Feature
                icon={<Globe className="h-4 w-4" />}
                title="Webhook callbacks"
                detail="Stream verdicts to your SIEM, Slack or custom incident pipelines."
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button className="rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:opacity-90">
                Get an API key
              </button>
              <a
                href="#"
                className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground transition hover:border-border-strong"
              >
                Read full docs →
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
              {[
                { v: "99.99%", l: "Uptime" },
                { v: "14", l: "Edge regions" },
                { v: "10M+", l: "Daily scans" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-mono text-lg text-foreground">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — code window */}
          <div className="lg:pt-10">
            <div
              className="overflow-hidden rounded-2xl border border-border bg-[oklch(0.12_0.01_260)] shadow-elevated"
              style={{ boxShadow: "0 30px 80px -30px oklch(0 0 0 / 0.7)" }}
            >
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-border/60 bg-[oklch(0.16_0.012_260)] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-critical/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[oklch(0.2_0.012_260)] p-0.5">
                  {(["curl", "json"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider transition ${
                        tab === t
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t === "curl" ? "Request" : "Response"}
                    </button>
                  ))}
                </div>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground transition hover:text-foreground"
                >
                  {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Code body */}
              <pre
                className="overflow-x-auto p-5 text-[12.5px] leading-relaxed text-foreground/90"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <code>{SNIPPETS[tab]}</code>
              </pre>

              {/* Status bar */}
              <div className="flex items-center justify-between border-t border-border/60 bg-[oklch(0.16_0.012_260)] px-4 py-2 font-mono text-[10px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success ticker-pulse" />
                  POST /v1/scan
                </span>
                <span>200 OK · 142ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-border bg-surface text-primary">
        {icon}
      </span>
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{detail}</div>
      </div>
    </div>
  );
}
