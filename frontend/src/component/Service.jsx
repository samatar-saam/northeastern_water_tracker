import React, { useState, useEffect, useRef } from "react";
import {
  Droplets,
  MapPin,
  ClipboardList,
  BarChart3,
  Radio,
  Wrench,
  Building2,
  HeartHandshake,
  Users,
  ChevronRight,
  ChevronDown,
  Plug,
  GraduationCap,
  LifeBuoy,
  Check,
} from "lucide-react";

/* ---------------------------------------------------------
   Same token system as the rest of the site:
   ink #0b1e33 · slate #1e293b · blue #1565C0 · sky #42A5F5
   bg #f8fafc
   No navbar in this file — it's rendered elsewhere in the app.
--------------------------------------------------------- */

const CORE_SERVICES = [
  {
    icon: Droplets,
    title: "Water point monitoring",
    desc: "Every borehole, water pan, shallow well, and kiosk gets a living record — status, yield, depth, and history in one place.",
    bullets: ["Status updated as reports come in", "Depth & yield history per point", "Works from any phone, no app required"],
  },
  {
    icon: Radio,
    title: "Community reporting network",
    desc: "Residents and committee members flag issues the moment they happen, with photos and exact locations attached.",
    bullets: ["Simple report form, minutes to fill", "Photo & location capture", "Anonymous reporting supported"],
  },
  {
    icon: MapPin,
    title: "Live interactive mapping",
    desc: "One map of every source across five counties, colour-coded so field teams always know where to go first.",
    bullets: ["County-level and point-level views", "Colour-coded by current status", "Shareable with any partner team"],
  },
  {
    icon: BarChart3,
    title: "Data & seasonal analytics",
    desc: "Trend lines show which sources dry up first — often months before the dry season makes it visible on the ground.",
    bullets: ["Seasonal drawdown patterns", "County and point-level exports", "Early-warning trend flags"],
  },
  {
    icon: Wrench,
    title: "Repair coordination",
    desc: "Reports route straight to the right desk, with priority and dispatch tracked from first flag to confirmed fix.",
    bullets: ["Report → verify → dispatch → fixed", "Priority flagging for urgent cases", "Full repair history per water point"],
  },
  {
    icon: Plug,
    title: "Partner data access",
    desc: "County offices, NGOs, and researchers can pull the same data into their own systems and dashboards.",
    bullets: ["Read access to county-level data", "CSV export and API access", "No cost for government partners"],
  },
];

const AUDIENCES = [
  {
    key: "government",
    label: "County governments",
    icon: Building2,
    intro: "A shared, verifiable record of every water asset in your county — the same one your field teams, budget office, and residents all see.",
    items: [
      "Full inventory of water points with condition history",
      "Direct routing of resident reports to your water desk",
      "Data exports for budgeting and donor reporting",
      "No licensing cost for county government use",
    ],
  },
  {
    key: "ngo",
    label: "NGOs & partners",
    icon: HeartHandshake,
    intro: "Plan interventions around real, current data instead of survey snapshots that are out of date before the report is printed.",
    items: [
      "County and sub-county coverage dashboards",
      "API access to integrate with your own systems",
      "Coordination view to avoid duplicate repairs",
      "Support setting up new counties or regions",
    ],
  },
  {
    key: "community",
    label: "Communities",
    icon: Users,
    intro: "Report what you see, and see what happens next — no more wondering if a report reached anyone.",
    items: [
      "Report an issue in under two minutes",
      "Track your report from submission to fix",
      "See the status of every water point near you",
      "Free to use, works on any phone",
    ],
  },
];

const ENGAGEMENT_STEPS = [
  {
    icon: ClipboardList,
    title: "Onboarding",
    text: "We map your existing water points onto the platform, using whatever records you already have — spreadsheets, paper logs, or none at all.",
  },
  {
    icon: Plug,
    title: "Data integration",
    text: "If you run your own systems, we connect them via API so the tracker and your internal tools stay in sync automatically.",
  },
  {
    icon: GraduationCap,
    title: "Training",
    text: "Water committees and field staff get a short, practical walkthrough — reporting an issue takes about as long as sending a text.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing support",
    text: "A direct line to our team for new counties, data questions, or anything that comes up once you're live.",
  },
];

/* ---------------- Reveal ---------------- */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-[#f8fafc]">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M -50 ${100 + i * 90} Q 150 ${60 + i * 90}, 350 ${110 + i * 90} T 850 ${100 + i * 90}`}
            fill="none"
            stroke="#1565C0"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-4">
            Services
          </p>
          <h1 className="font-[Poppins] text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#0b1e33] leading-[1.1] mb-6">
            Everything it takes to keep a water point accounted for.
          </h1>
          <p className="font-[Inter] text-lg text-[#1e293b]/80 max-w-2xl mx-auto leading-relaxed">
            From the first report at the pump to the repair crew showing up —
            here's what runs underneath the North Eastern Community Water
            Tracker, and how county offices, NGOs, and communities each use it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Core services grid ---------------- */
function CoreServices() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="max-w-xl mb-14">
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
            What's included
          </p>
          <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
            Six services, one connected system.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <div className="group bg-[#f8fafc] rounded-2xl p-7 border border-slate-100 hover:border-[#1565C0]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-[#1565C0]/10 flex items-center justify-center mb-5 group-hover:bg-[#1565C0] transition-colors">
                  <s.icon className="w-5 h-5 text-[#1565C0] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-[Poppins] font-semibold text-lg text-[#0b1e33] mb-2">
                  {s.title}
                </h3>
                <p className="font-[Inter] text-sm text-[#1e293b]/70 leading-relaxed mb-5">
                  {s.desc}
                </p>
                <ul className="space-y-2 mt-auto pt-4 border-t border-slate-200/70">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 font-[Inter] text-xs text-[#1e293b]/70">
                      <Check className="w-3.5 h-3.5 text-[#1565C0] shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Audience tabs (signature element) ---------------- */
function AudienceTabs() {
  const [active, setActive] = useState(AUDIENCES[0].key);
  const current = AUDIENCES.find((a) => a.key === active);

  return (
    <section className="bg-[#f8fafc] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="max-w-xl mb-12">
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
            Built for three kinds of users
          </p>
          <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
            The same platform, tailored to what you need from it.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-white rounded-3xl border border-slate-100 p-3 md:p-4 flex flex-col sm:flex-row gap-2 mb-8 max-w-2xl">
            {AUDIENCES.map((a) => (
              <button
                key={a.key}
                onClick={() => setActive(a.key)}
                className={`flex-1 flex items-center justify-center gap-2 font-[Inter] text-sm font-medium px-5 py-3 rounded-2xl transition-all duration-300 ${
                  active === a.key
                    ? "bg-[#1565C0] text-white shadow-sm"
                    : "text-[#1e293b]/70 hover:bg-slate-50"
                }`}
              >
                <a.icon className="w-4 h-4" />
                {a.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} key={active}>
          <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12 grid md:grid-cols-[1fr_1.3fr] gap-10">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#1565C0]/10 flex items-center justify-center mb-6">
                <current.icon className="w-6 h-6 text-[#1565C0]" />
              </div>
              <h3 className="font-[Poppins] text-2xl font-bold text-[#0b1e33] mb-4">
                {current.label}
              </h3>
              <p className="font-[Inter] text-[#1e293b]/70 leading-relaxed">
                {current.intro}
              </p>
            </div>
            <ul className="space-y-4 self-center">
              {current.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1565C0]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#1565C0]" />
                  </div>
                  <span className="font-[Inter] text-sm text-[#1e293b]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Engagement steps (accordion) ---------------- */
function EngagementSteps() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal className="mb-14 text-center">
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
            Getting started
          </p>
          <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
            How we bring a new county or partner on board
          </h2>
        </Reveal>

        <div className="space-y-3">
          {ENGAGEMENT_STEPS.map((step, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={step.title} delay={i * 70}>
                <div
                  className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                    isOpen ? "border-[#1565C0]/30 bg-[#f8fafc]" : "border-slate-100 bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-[Poppins] text-sm font-bold text-[#1565C0] w-6 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isOpen ? "bg-[#1565C0]" : "bg-[#1565C0]/10"
                      }`}
                    >
                      <step.icon className={`w-4.5 h-4.5 transition-colors duration-300 ${isOpen ? "text-white" : "text-[#1565C0]"}`} />
                    </div>
                    <span className="font-[Poppins] font-semibold text-[#0b1e33] flex-1">
                      {step.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1e293b]/40 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-[Inter] text-sm text-[#1e293b]/70 leading-relaxed px-6 pb-6 pl-[4.5rem]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="bg-[#f8fafc] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="bg-gradient-to-br from-[#1565C0] to-[#0e4c93] rounded-3xl px-8 py-14 md:px-16 md:py-20 text-center relative overflow-hidden">
            <svg className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10" viewBox="0 0 200 200">
              <Droplets className="w-full h-full text-white" />
            </svg>
            <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-white mb-4">
              Want to bring your county or organisation on board?
            </h2>
            <p className="font-[Inter] text-white/80 max-w-xl mx-auto mb-9">
              Onboarding is free for county governments and takes about two
              weeks from first call to first live water point.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="font-[Inter] font-medium px-7 py-3.5 rounded-full bg-white text-[#1565C0] hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
                Talk to our team <ChevronRight className="w-4 h-4" />
              </button>
              <button className="font-[Inter] font-medium px-7 py-3.5 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors">
                Explore the map
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#1565C0] flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <span className="font-[Poppins] font-semibold text-[#0b1e33] text-sm">
                NE Water Tracker
              </span>
            </div>
            <p className="font-[Inter] text-sm text-[#1e293b]/60 leading-relaxed">
              Safe water, accounted for, across Garissa, Wajir, Mandera, Isiolo,
              and Tana River.
            </p>
          </div>
          {[
            { h: "Platform", items: ["Water points", "Map", "Reports", "Communities"] },
            { h: "Services", items: ["For governments", "For NGOs", "For communities"] },
            { h: "Contact", items: ["Report an issue", "Partner with us", "support@newatertracker.ke"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="font-[Poppins] font-semibold text-sm text-[#0b1e33] mb-4">{col.h}</p>
              <ul className="space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="font-[Inter] text-sm text-[#1e293b]/60 hover:text-[#1565C0] transition-colors">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[Inter] text-xs text-[#1e293b]/50">
            © {new Date().getFullYear()} North Eastern Community Water Tracker. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy", "Terms"].map((l) => (
              <a key={l} href="#" className="font-[Inter] text-xs text-[#1e293b]/50 hover:text-[#1565C0] transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
      `}</style>
      <Hero />
      <CoreServices />
      <AudienceTabs />
      <EngagementSteps />
      <CTA />
      <Footer />
    </div>
  );
}