import { BookOpen, ArrowUpRight } from "lucide-react";

interface Article {
  badge: string;
  badgeTone: "primary" | "success" | "warning" | "critical";
  title: string;
  excerpt: string;
  readTime: string;
  hue: number; // for thumbnail gradient
}

const ARTICLES: Article[] = [
  {
    badge: "Security 101",
    badgeTone: "primary",
    title: "What is phishing? A 5-minute primer",
    excerpt: "How attackers weaponize trust, urgency and look-alike domains to bypass human intuition.",
    readTime: "5 min read",
    hue: 230,
  },
  {
    badge: "Advanced Headers",
    badgeTone: "success",
    title: "Reading SPF, DKIM and DMARC like a pro",
    excerpt: "Decode authentication results in raw email headers and spot spoofed senders instantly.",
    readTime: "9 min read",
    hue: 150,
  },
  {
    badge: "Tactics",
    badgeTone: "warning",
    title: "The psychology of urgency in scam emails",
    excerpt: "Why “24 hours” and “account suspended” work — and how to neutralize the panic response.",
    readTime: "6 min read",
    hue: 80,
  },
  {
    badge: "Case Study",
    badgeTone: "critical",
    title: "Anatomy of a $40M business email compromise",
    excerpt: "Step-by-step breakdown of a real BEC attack against a Fortune 500 finance team.",
    readTime: "12 min read",
    hue: 22,
  },
  {
    badge: "Tooling",
    badgeTone: "primary",
    title: "Hunting phish kits with passive DNS",
    excerpt: "Use historical DNS data to map attacker infrastructure before campaigns launch.",
    readTime: "8 min read",
    hue: 280,
  },
  {
    badge: "Best Practice",
    badgeTone: "success",
    title: "Building a 30-day phishing simulation program",
    excerpt: "Templates, KPIs and reporting tactics to lift your org's click-rate resilience.",
    readTime: "7 min read",
    hue: 175,
  },
];

const toneClass = (t: Article["badgeTone"]) => {
  switch (t) {
    case "success": return "bg-success/15 text-success border-success/30";
    case "warning": return "bg-warning/15 text-warning border-warning/30";
    case "critical": return "bg-critical/15 text-critical border-critical/30";
    default: return "bg-primary/15 text-primary border-primary/30";
  }
};

export function LearnGrid() {
  return (
    <section id="learn" className="px-6 py-20 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <BookOpen className="mr-1 inline h-3 w-3" />
              Learn · Phishing field guide
            </p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              From “what is phishing” to forensic analysis
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Hand-picked guides written by security researchers — short enough to finish over coffee.
            </p>
          </div>
          <a href="#" className="hidden items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground sm:inline-flex">
            Browse all <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <article
              key={a.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur transition hover:border-border-strong hover:bg-surface/70"
            >
              <div
                className="relative h-36 w-full overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, oklch(0.32 0.12 ${a.hue}), oklch(0.22 0.06 ${a.hue + 30}))`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, oklch(1 0 0 / 0.15), transparent 50%), radial-gradient(circle at 80% 80%, oklch(0 0 0 / 0.4), transparent 60%)",
                  }}
                />
                <span className={`absolute left-3 top-3 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur ${toneClass(a.badgeTone)}`}>
                  {a.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{a.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-foreground transition group-hover:text-primary">
                    Read <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
