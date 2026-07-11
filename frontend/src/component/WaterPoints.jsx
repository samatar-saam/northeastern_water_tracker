import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Droplets,
  Search,
  MapPin,
  Ruler,
  Clock,
  ChevronDown,
  SlidersHorizontal,
  Waves,
  CircleDot,
} from "lucide-react";

/* ---------------------------------------------------------
   Token system: ink #0b1e33 · slate #1e293b · blue #1565C0
--------------------------------------------------------- */

const COUNTIES = ["Garissa", "Wajir", "Mandera", "Isiolo", "Tana River"];
const TYPES = ["Borehole", "Water pan", "Shallow well", "Kiosk"];
const STATUSES = ["good", "caution", "issue"];

const STATUS_STYLES = {
  good: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", ring: "#10b981", label: "Flowing" },
  caution: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", ring: "#f59e0b", label: "Low" },
  issue: { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50", ring: "#ef4444", label: "Attention" },
};

const NAMES = [
  "Dertu", "Sankuri", "Rhamu", "Merti", "Bura", "Modogashe", "Wajir Bor",
  "Elwak", "Habaswein", "Kotile", "Garsen", "Kinna", "Lafey", "Griftu",
  "Dadaab", "Takaba", "Bulla Mpya", "Sericho", "Fafi", "Buna",
  "Sabuli", "Malkagufu", "Waberi", "Chewele",
];

function buildWaterPoints() {
  return NAMES.map((name, i) => {
    const county = COUNTIES[i % COUNTIES.length];
    const type = TYPES[(i * 3) % TYPES.length];
    const status = STATUSES[(i * 2 + 1) % STATUSES.length];
    const depth = 30 + ((i * 17) % 90);
    const daysAgo = (i % 6) + 1;
    return {
      id: i + 1,
      name: `${name} ${type === "Borehole" ? "borehole" : type === "Water pan" ? "water pan" : type === "Shallow well" ? "shallow well" : "kiosk"}`,
      county,
      type,
      status,
      depth,
      lastChecked: daysAgo === 1 ? "Yesterday" : `${daysAgo} days ago`,
    };
  });
}

const WATER_POINTS = buildWaterPoints();

const TYPE_ICON = {
  Borehole: Droplets,
  "Water pan": Waves,
  "Shallow well": CircleDot,
  Kiosk: MapPin,
};

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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Status ring summary ---------------- */
function StatusRing({ counts, total }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t0 = performance.now();
          const dur = 1200;
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const r = 52;
  const circumference = 2 * Math.PI * r;
  let offsetAccum = 0;
  const segments = STATUSES.map((s) => {
    const frac = total ? counts[s] / total : 0;
    const seg = {
      status: s,
      len: frac * circumference * progress,
      offset: offsetAccum * circumference,
    };
    offsetAccum += frac;
    return seg;
  });

  return (
    <div className="flex items-center gap-6">
      <svg width="130" height="130" viewBox="0 0 130 130" className="-rotate-90">
        <circle cx="65" cy="65" r={r} fill="none" stroke="#e2e8f0" strokeWidth="14" />
        {segments.map((seg) => (
          <circle
            key={seg.status}
            cx="65"
            cy="65"
            r={r}
            fill="none"
            stroke={STATUS_STYLES[seg.status].ring}
            strokeWidth="14"
            strokeDasharray={`${seg.len} ${circumference}`}
            strokeDashoffset={-seg.offset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div ref={ref} className="space-y-2">
        {STATUSES.map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${STATUS_STYLES[s].dot}`} />
            <span className="font-[Inter] text-sm text-[#1e293b]">
              <span className="font-semibold">{counts[s]}</span> {STATUS_STYLES[s].label.toLowerCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Page header + filters (with updated padding) ---------------- */
function PageHeader({ filters, setFilters, resultCount, counts, total }) {
  const update = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }));

  return (
    <section className="bg-white border-b border-slate-100 pt-16 md:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-10">
          <Reveal>
            <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
              {total.toLocaleString()} water points across five counties
            </p>
            <h1 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
              Water points
            </h1>
            <p className="font-[Inter] text-[#1e293b]/70 mt-2 max-w-md">
              Boreholes, water pans, shallow wells, and kiosks — searchable and
              filterable, updated as reports come in.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <StatusRing counts={counts} total={total} />
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#1e293b]/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.query}
                onChange={update("query")}
                placeholder="Search by name or county..."
                className="w-full font-[Inter] text-sm bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1565C0] transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { key: "county", label: "All counties", options: COUNTIES },
                { key: "type", label: "All types", options: TYPES },
                { key: "status", label: "All statuses", options: STATUSES.map((s) => STATUS_STYLES[s].label) },
              ].map((f) => (
                <div key={f.key} className="relative">
                  <select
                    value={filters[f.key]}
                    onChange={update(f.key)}
                    className="appearance-none font-[Inter] text-sm bg-white border border-slate-200 rounded-xl pl-4 pr-9 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b] cursor-pointer"
                  >
                    <option value="">{f.label}</option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#1e293b]/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="font-[Inter] text-xs text-[#1e293b]/50 mt-4">
          Showing {resultCount} of {total} water points
        </p>
      </div>
    </section>
  );
}

/* ---------------- Water point card ---------------- */
function WaterPointCard({ point, delay }) {
  const s = STATUS_STYLES[point.status];
  const Icon = TYPE_ICON[point.type];

  return (
    <Reveal delay={delay}>
      <div className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="flex items-start justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#1565C0]/10 flex items-center justify-center group-hover:bg-[#1565C0] transition-colors">
            <Icon className="w-5 h-5 text-[#1565C0] group-hover:text-white transition-colors" />
          </div>
          <span className={`inline-flex items-center gap-1.5 ${s.bg} ${s.text} text-xs font-[Inter] font-medium px-2.5 py-1 rounded-full`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </span>
        </div>

        <h3 className="font-[Poppins] font-semibold text-[#0b1e33] text-base mb-1 capitalize">
          {point.name}
        </h3>
        <p className="font-[Inter] text-xs text-[#1e293b]/50 uppercase tracking-wide mb-5">
          {point.type} · {point.county}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between font-[Inter] text-xs text-[#1e293b]/60">
          <span className="flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5" /> {point.depth}m depth
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {point.lastChecked}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- Empty state ---------------- */
function EmptyState({ onReset }) {
  return (
    <div className="text-center py-24">
      <div className="w-14 h-14 rounded-2xl bg-[#1565C0]/10 flex items-center justify-center mx-auto mb-5">
        <SlidersHorizontal className="w-6 h-6 text-[#1565C0]" />
      </div>
      <h3 className="font-[Poppins] font-semibold text-lg text-[#0b1e33] mb-2">
        No water points match those filters
      </h3>
      <p className="font-[Inter] text-sm text-[#1e293b]/60 mb-6">
        Try widening your search or clearing a filter.
      </p>
      <button
        onClick={onReset}
        className="font-[Inter] text-sm font-medium px-6 py-2.5 rounded-full bg-[#1565C0] text-white hover:bg-[#0e4c93] transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
}

/* ---------------- Footer ---------------- */
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

/* ---------------- Main Export (no internal navbar) ---------------- */
export default function WaterPoints() {
  const [filters, setFilters] = useState({ query: "", county: "", type: "", status: "" });

  const filtered = useMemo(() => {
    return WATER_POINTS.filter((p) => {
      const matchesQuery =
        !filters.query ||
        p.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        p.county.toLowerCase().includes(filters.query.toLowerCase());
      const matchesCounty = !filters.county || p.county === filters.county;
      const matchesType = !filters.type || p.type === filters.type;
      const matchesStatus = !filters.status || STATUS_STYLES[p.status].label === filters.status;
      return matchesQuery && matchesCounty && matchesType && matchesStatus;
    });
  }, [filters]);

  const counts = useMemo(() => {
    const c = { good: 0, caution: 0, issue: 0 };
    WATER_POINTS.forEach((p) => c[p.status]++);
    return c;
  }, []);

  const resetFilters = () => setFilters({ query: "", county: "", type: "", status: "" });

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
        `}
      </style>
      <PageHeader
        filters={filters}
        setFilters={setFilters}
        resultCount={filtered.length}
        counts={counts}
        total={WATER_POINTS.length}
      />
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        {filtered.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <WaterPointCard key={p.id} point={p} delay={(i % 6) * 60} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}