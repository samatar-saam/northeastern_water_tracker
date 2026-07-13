import React, { useState, useEffect, useRef } from "react";
import {
  Droplets,
  MapPin,
  ClipboardList,
  Users,
  BarChart3,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

// ✅ Import hero image
import heroImage from "../assets/images/hero.png";

/* ---------------------------------------------------------
   Design tokens (unchanged)
--------------------------------------------------------- */

const COUNTIES = [
  { name: "Garissa", x: 300, y: 205, status: "good" },
  { name: "Wajir", x: 340, y: 95, status: "caution" },
  { name: "Mandera", x: 420, y: 55, status: "good" },
  { name: "Isiolo", x: 175, y: 150, status: "issue" },
  { name: "Tana River", x: 150, y: 280, status: "good" },
];

const STATS = [
  { label: "Boreholes monitored", value: 1284, suffix: "+" },
  { label: "Water pans tracked", value: 96, suffix: "" },
  { label: "Communities engaged", value: 47, suffix: "" },
  { label: "Reports resolved", value: 512, suffix: "+" },
];

const FEATURES = [
  {
    icon: Droplets,
    title: "Water points",
    desc: "Live status, yield, and depth for every borehole, water pan, and shallow well across the region.",
  },
  {
    icon: ClipboardList,
    title: "Reports",
    desc: "Community members flag breakdowns or contamination the moment they happen, with photo evidence.",
  },
  {
    icon: MapPin,
    title: "Map",
    desc: "One map of every source in the North East, colour-coded so field teams know where to go first.",
  },
  {
    icon: Users,
    title: "Communities",
    desc: "Local water committees and chiefs coordinate repairs without waiting on a phone chain.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Seasonal trend lines show which sources dry up first, months before the dry season hits.",
  },
];

const REPORTS = [
  { title: "Pump handle broken", place: "Dertu borehole, Wajir East", status: "issue", time: "2h ago" },
  { title: "Water pan refilled after rains", place: "Sankuri, Garissa", status: "good", time: "5h ago" },
  { title: "Salinity rising in dry season", place: "Rhamu shallow well, Mandera", status: "caution", time: "1d ago" },
  { title: "New kiosk connected to grid", place: "Merti, Isiolo", status: "good", time: "2d ago" },
];

const VOICES = [
  {
    quote:
      "Before this, we found out a borehole had broken down weeks later, from someone passing through. Now the committee knows the same day.",
    name: "Fatuma Abdi",
    role: "Water committee chair, Wajir",
  },
  {
    quote:
      "During the last dry spell we could see which pans were still holding water and move the herds there instead of guessing.",
    name: "Hassan Noor",
    role: "Community elder, Garissa",
  },
  {
    quote:
      "Reporting a broken pump used to mean a two-hour trip to town. Now it takes a text and a photo.",
    name: "Amina Yusuf",
    role: "Resident, Merti",
  },
];

const STATUS_STYLES = {
  good: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", label: "Flowing", Icon: CheckCircle2 },
  caution: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", label: "Low", Icon: Clock },
  issue: { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50", label: "Attention", Icon: AlertTriangle },
};

/* ---------------- Reveal & Counter helpers ---------------- */
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
      { threshold: 0.15 }
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

function Counter({ value, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- Hero (now with minimal top padding) ---------------- */
function Hero() {
  return (
    <section className="relative pt-0 pb-12 md:pt-2 md:pb-20 overflow-hidden bg-[#f8fafc]">
      {/* subtle pattern */}
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

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-4">
            GARISSA · WAJIR · MANDERA · ISIOLO · TANA RIVER · MARSABIT
          </p>
          <h1 className="font-[Poppins] text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-[#0b1e33] leading-[1.08] mb-6">
            Every borehole in the North East, tracked in real time.
          </h1>
          <p className="font-[Inter] text-lg text-[#1e293b]/80 max-w-lg mb-9 leading-relaxed">
            Boreholes, water pans, and shallow wells across five ASAL counties —
            monitored by the communities that depend on them, so a breakdown is
            fixed in days, not months.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="font-[Inter] font-medium px-7 py-3.5 rounded-full bg-[#1565C0] text-white hover:bg-[#0e4c93] transition-all hover:shadow-lg hover:shadow-blue-900/20 inline-flex items-center gap-2">
              Explore water points <ChevronRight className="w-4 h-4" />
            </button>
            <button className="font-[Inter] font-medium px-7 py-3.5 rounded-full border border-[#1565C0]/40 text-[#1565C0] hover:bg-[#1565C0]/5 transition-colors">
              Report an issue
            </button>
          </div>
        </Reveal>

        <Reveal delay={150} className="flex justify-center">
          <div className="relative w-full max-w-[500px] mx-auto">
            <div className="absolute -inset-4 rounded-full bg-[#1565C0]/20 blur-3xl" />
            <div
              className="relative rounded-[40%_60%_55%_45%/45%_40%_60%_55%] overflow-hidden shadow-2xl border-4 border-white/20"
            >
              <img
                src={heroImage}
                alt="North Eastern community water tracking"
                className="h-[320px] md:h-[380px] lg:h-[450px] w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- All other components (unchanged) ---------------- */
function StatsBar() {
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center md:text-left">
            <div className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#1565C0]">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="font-[Inter] text-sm text-[#1e293b]/70 mt-1">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-[#f8fafc] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="max-w-xl mb-14">
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
            What's on the platform
          </p>
          <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
            One place for every source, every report, every committee.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-100 h-full">
                <div className="w-11 h-11 rounded-xl bg-[#1565C0]/10 flex items-center justify-center mb-5 group-hover:bg-[#1565C0] transition-colors">
                  <f.icon className="w-5 h-5 text-[#1565C0] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-[Poppins] font-semibold text-lg text-[#0b1e33] mb-2">{f.title}</h3>
                <p className="font-[Inter] text-sm text-[#1e293b]/70 leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapPreview() {
  const [active, setActive] = useState(null);
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
              Live coverage
            </p>
            <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33] max-w-lg">
              Five counties, one map, colour-coded by status.
            </h2>
          </div>
          <button className="font-[Inter] text-sm font-medium text-[#1565C0] inline-flex items-center gap-1 hover:gap-2 transition-all">
            View full map <ArrowUpRight className="w-4 h-4" />
          </button>
        </Reveal>
        <Reveal delay={100}>
          <div className="bg-[#f0f6fd] rounded-3xl border border-slate-100 p-6 md:p-10 grid md:grid-cols-[1.4fr_1fr] gap-8">
            <div className="relative bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <svg viewBox="0 0 500 350" className="w-full h-full">
                <rect width="500" height="350" fill="#eaf2fc" />
                <path
                  d="M60 60 L470 40 L440 300 L100 320 Z"
                  fill="#dce9fa"
                  stroke="#bcd6f5"
                  strokeWidth="2"
                />
                {COUNTIES.map((c) => {
                  const s = STATUS_STYLES[c.status];
                  return (
                    <g
                      key={c.name}
                      onMouseEnter={() => setActive(c.name)}
                      onMouseLeave={() => setActive(null)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={active === c.name ? 12 : 9}
                        className={`transition-all duration-200`}
                        fill={
                          c.status === "good"
                            ? "#10b981"
                            : c.status === "caution"
                            ? "#f59e0b"
                            : "#ef4444"
                        }
                        opacity="0.9"
                      />
                      <text
                        x={c.x}
                        y={c.y - 16}
                        textAnchor="middle"
                        className="font-[Inter]"
                        fontSize="13"
                        fill="#0b1e33"
                        fontWeight={active === c.name ? 700 : 500}
                      >
                        {c.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex flex-col justify-center gap-5">
              {Object.entries(STATUS_STYLES).map(([key, s]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                  <span className="font-[Inter] text-sm text-[#1e293b]">{s.label}</span>
                </div>
              ))}
              <p className="font-[Inter] text-sm text-[#1e293b]/60 leading-relaxed mt-2">
                Hover a county to see its name highlighted. Full map view includes
                every individual water point with depth, yield, and last-checked date.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RecentReports() {
  return (
    <section className="bg-[#f8fafc] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="flex items-end justify-between mb-10">
          <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
            Latest from the field
          </h2>
          <a
            href="#"
            className="font-[Inter] text-sm font-medium text-[#1565C0] hidden sm:inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            See all reports <ArrowUpRight className="w-4 h-4" />
          </a>
        </Reveal>
        <div className="divide-y divide-slate-200 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {REPORTS.map((r, i) => {
            const s = STATUS_STYLES[r.status];
            return (
              <Reveal key={r.title} delay={i * 60}>
                <div className="flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition-colors">
                  <div className={`w-9 h-9 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                    <s.Icon className={`w-4 h-4 ${s.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-[Inter] font-medium text-[#0b1e33] text-sm truncate">{r.title}</p>
                    <p className="font-[Inter] text-xs text-[#1e293b]/60">{r.place}</p>
                  </div>
                  <span className="font-[Inter] text-xs text-[#1e293b]/50 shrink-0">{r.time}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Spotlight() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % VOICES.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="bg-[#0b1e33] py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#42A5F5] font-semibold mb-8">
            Community spotlight
          </p>
          <blockquote className="font-[Poppins] text-2xl md:text-3xl font-medium text-white leading-snug min-h-[7rem] md:min-h-[6rem] transition-opacity duration-500">
            "{VOICES[idx].quote}"
          </blockquote>
          <div className="mt-8">
            <p className="font-[Inter] font-semibold text-white text-sm">{VOICES[idx].name}</p>
            <p className="font-[Inter] text-white/50 text-xs">{VOICES[idx].role}</p>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {VOICES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === idx ? "bg-[#42A5F5] w-6" : "bg-white/25"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="bg-gradient-to-br from-[#1565C0] to-[#0e4c93] rounded-3xl px-8 py-14 md:px-16 md:py-20 text-center relative overflow-hidden">
            <svg className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10" viewBox="0 0 200 200">
              <Droplets className="w-full h-full text-white" />
            </svg>
            <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to help track water in your community?
            </h2>
            <p className="font-[Inter] text-white/80 max-w-xl mx-auto mb-9">
              Join the committees and residents across the North East already
              keeping every borehole and water pan accounted for.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="font-[Inter] font-medium px-7 py-3.5 rounded-full bg-white text-[#1565C0] hover:bg-slate-100 transition-colors">
                Get started
              </button>
              <button className="font-[Inter] font-medium px-7 py-3.5 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-slate-100 pt-16 pb-8">
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
            { h: "Resources", items: ["How it works", "For committees", "Data & privacy"] },
            { h: "Contact", items: ["Report an issue", "Partner with us", "support@newatertracker.ke"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="font-[Poppins] font-semibold text-sm text-[#0b1e33] mb-4">{col.h}</p>
              <ul className="space-y-2.5">
                {col.items.map((it) => (
                  <li key={it}>
                    <a
                      href="#"
                      className="font-[Inter] text-sm text-[#1e293b]/60 hover:text-[#1565C0] transition-colors"
                    >
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
              <a
                key={l}
                href="#"
                className="font-[Inter] text-xs text-[#1e293b]/50 hover:text-[#1565C0] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Main Export ---------------- */
export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
        `}
      </style>
      <Hero />
      <StatsBar />
      <Features />
      <MapPreview />
      <RecentReports />
      <Spotlight />
      <CTA />
      <Footer />
    </div>
  );
}