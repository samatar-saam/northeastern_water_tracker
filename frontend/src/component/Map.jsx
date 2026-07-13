// src/component/Map.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Droplets,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  X,
} from "lucide-react";

/* ---------------------------------------------------------
   Data – same counties as homepage, plus more water points
--------------------------------------------------------- */

const COUNTIES = [
  { name: "Garissa", x: 300, y: 205, status: "good" },
  { name: "Wajir", x: 340, y: 95, status: "caution" },
  { name: "Mandera", x: 420, y: 55, status: "good" },
  { name: "Isiolo", x: 175, y: 150, status: "issue" },
  { name: "Tana River", x: 150, y: 280, status: "good" },
];

// Generate random water points within county bounds
const WATER_POINTS = [
  { id: 1, name: "Dertu borehole", county: "Wajir", x: 310, y: 110, status: "issue" },
  { id: 2, name: "Sankuri pan", county: "Garissa", x: 270, y: 220, status: "good" },
  { id: 3, name: "Rhamu well", county: "Mandera", x: 400, y: 60, status: "caution" },
  { id: 4, name: "Merti borehole", county: "Isiolo", x: 190, y: 160, status: "good" },
  { id: 5, name: "Bura pan", county: "Tana River", x: 140, y: 300, status: "caution" },
  { id: 6, name: "Modogashe borehole", county: "Garissa", x: 330, y: 190, status: "good" },
  { id: 7, name: "Wajir Bor well", county: "Wajir", x: 370, y: 80, status: "issue" },
  { id: 8, name: "Elwak borehole", county: "Mandera", x: 440, y: 40, status: "good" },
  { id: 9, name: "Habaswein pan", county: "Garissa", x: 250, y: 240, status: "caution" },
  { id: 10, name: "Kotile well", county: "Tana River", x: 120, y: 310, status: "good" },
  { id: 11, name: "Garsen borehole", county: "Tana River", x: 180, y: 290, status: "issue" },
  { id: 12, name: "Kinna well", county: "Isiolo", x: 210, y: 140, status: "good" },
  { id: 13, name: "Lafey borehole", county: "Mandera", x: 460, y: 30, status: "good" },
  { id: 14, name: "Griftu pan", county: "Wajir", x: 350, y: 100, status: "caution" },
  { id: 15, name: "Dadaab borehole", county: "Garissa", x: 280, y: 250, status: "issue" },
  { id: 16, name: "Takaba well", county: "Mandera", x: 380, y: 70, status: "good" },
  { id: 17, name: "Bulla Mpya borehole", county: "Isiolo", x: 160, y: 170, status: "caution" },
  { id: 18, name: "Sericho pan", county: "Isiolo", x: 200, y: 130, status: "good" },
  { id: 19, name: "Fafi borehole", county: "Garissa", x: 310, y: 210, status: "good" },
  { id: 20, name: "Buna well", county: "Wajir", x: 390, y: 90, status: "issue" },
];

const STATUS_STYLES = {
  good: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", label: "Flowing", Icon: CheckCircle2, ring: "#10b981" },
  caution: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", label: "Low", Icon: Clock, ring: "#f59e0b" },
  issue: { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50", label: "Attention", Icon: AlertTriangle, ring: "#ef4444" },
};

/* ---------------- Reveal helper ---------------- */
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

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative pt-0 pb-8 md:pt-2 md:pb-12 overflow-hidden bg-[#f8fafc]">
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
            Live coverage
          </p>
          <h1 className="font-[Poppins] text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#0b1e33] leading-[1.1] mb-4">
            Every water point, one map
          </h1>
          <p className="font-[Inter] text-lg text-[#1e293b]/80 max-w-2xl mx-auto leading-relaxed">
            Zoom in on any county to see boreholes, water pans, and shallow wells
            colour‑coded by status. Hover a point for details.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Legend ---------------- */
function Legend() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-wrap items-center gap-6 shadow-sm">
      <span className="font-[Inter] text-xs font-medium text-[#1e293b]/70 uppercase tracking-wider">
        Status
      </span>
      {Object.entries(STATUS_STYLES).map(([key, s]) => (
        <div key={key} className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${s.dot}`} />
          <span className="font-[Inter] text-sm text-[#1e293b]">
            {s.label}
          </span>
        </div>
      ))}
      <div className="ml-auto flex items-center gap-2 text-[#1e293b]/50">
        <MapPin className="w-4 h-4" />
        <span className="font-[Inter] text-xs">
          {WATER_POINTS.length} points shown
        </span>
      </div>
    </div>
  );
}

/* ---------------- Interactive Map (SVG) ---------------- */
function MapSVG() {
  const [active, setActive] = useState(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-[Poppins] font-semibold text-[#0b1e33] text-sm">
          North Eastern Water Points
        </h3>
        <span className="font-[Inter] text-xs text-[#1e293b]/50">
          Hover a point for details
        </span>
      </div>

      <div className="p-4">
        <svg viewBox="0 0 600 400" className="w-full h-auto">
          {/* Background */}
          <rect width="600" height="400" fill="#f0f6fd" rx="12" ry="12" />

          {/* County outlines (simplified) */}
          <path
            d="M 60 80 L 540 60 L 520 320 L 80 340 Z"
            fill="#dce9fa"
            stroke="#bcd6f5"
            strokeWidth="2"
          />

          {/* Counties */}
          {COUNTIES.map((c) => (
            <g key={c.name}>
              <text
                x={c.x}
                y={c.y - 14}
                textAnchor="middle"
                className="font-[Inter]"
                fontSize="12"
                fill="#0b1e33"
                fontWeight="600"
              >
                {c.name}
              </text>
              <circle
                cx={c.x}
                cy={c.y}
                r={6}
                fill={STATUS_STYLES[c.status].ring}
                opacity="0.3"
              />
            </g>
          ))}

          {/* Water points */}
          {WATER_POINTS.map((p) => {
            const s = STATUS_STYLES[p.status];
            const isActive = active === p.id;
            return (
              <g
                key={p.id}
                onMouseEnter={() => setActive(p.id)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 8 : 5}
                  fill={s.ring}
                  stroke="#fff"
                  strokeWidth={isActive ? 2 : 1.5}
                  className="transition-all duration-200"
                />
                {isActive && (
                  <>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={14}
                      fill="none"
                      stroke={s.ring}
                      strokeWidth="1.5"
                      className="animate-pulse"
                      opacity="0.5"
                    />
                    <foreignObject
                      x={p.x + 12}
                      y={p.y - 20}
                      width="140"
                      height="60"
                      className="pointer-events-none"
                    >
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-100 p-2 text-[11px] font-[Inter] text-[#0b1e33]">
                        <div className="font-semibold">{p.name}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          <span className={s.text}>{s.label}</span>
                          <span className="text-[#1e293b]/50 mx-1">·</span>
                          <span className="text-[#1e293b]/60">{p.county}</span>
                        </div>
                      </div>
                    </foreignObject>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Hover info */}
      <div className="px-4 pb-4 text-center">
        <p className="font-[Inter] text-xs text-[#1e293b]/40">
          {active
            ? `Showing details for ${WATER_POINTS.find(p => p.id === active)?.name}`
            : "Hover over any water point to see its name and status"}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-slate-100 pt-16 pb-8 mt-10">
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
            { h: "About", items: ["Our story", "How it works", "Partners"] },
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

/* ---------------- Main Export ---------------- */
export default function MapPage() {
  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
        `}
      </style>
      <Hero />
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <Reveal>
          <Legend />
        </Reveal>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <Reveal delay={100}>
          <MapSVG />
        </Reveal>
      </section>
      <Footer />
    </div>
  );
}