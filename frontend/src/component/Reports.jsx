import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Droplets,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  Send,
  ChevronDown,
  Inbox,
} from "lucide-react";

/* ---------------------------------------------------------
   API CONFIG — point this at your real backend.
--------------------------------------------------------- */
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || "/api";

const ISSUE_TYPES = [
  "No water",
  "Low pressure",
  "Contamination",
  "Broken pump",
  "Vandalism",
  "Other",
];

const STATUS_STYLES = {
  open: { dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50", label: "Open", Icon: AlertTriangle },
  in_progress: { dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", label: "In progress", Icon: Clock },
  resolved: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", label: "Resolved", Icon: CheckCircle2 },
};

function timeAgo(iso) {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

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

/* ---------------- Data hooks ---------------- */
function useWaterPoints() {
  const [points, setPoints] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE_URL}/water-points`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setPoints(Array.isArray(data) ? data : []);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { points, status, reload: load };
}

function useReports() {
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE_URL}/reports`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setReports(Array.isArray(data) ? data : []);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addReport = useCallback((report) => {
    setReports((prev) => [report, ...prev]);
  }, []);

  return { reports, status, reload: load, addReport };
}

/* ---------------- Stat pill ---------------- */
function StatPill({ label, value, tone }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex-1 min-w-[140px]">
      <p className={`font-[Poppins] text-2xl font-bold ${tone}`}>{value}</p>
      <p className="font-[Inter] text-xs text-[#1e293b]/60 mt-1">{label}</p>
    </div>
  );
}

/* ---------------- Submit report form ---------------- */
function ReportForm({ waterPoints, waterPointsStatus, onSubmitted }) {
  const [form, setForm] = useState({
    waterPointId: "",
    issueType: "",
    description: "",
    reporterName: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.waterPointId || !form.issueType || !form.description.trim()) {
      setError("Please fill in the water point, issue type, and a short description.");
      return;
    }
    setSubmitting(true);
    try {
      const selectedPoint = waterPoints.find((p) => String(p.id) === String(form.waterPointId));
      const res = await fetch(`${API_BASE_URL}/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          waterPointId: form.waterPointId,
          issueType: form.issueType,
          description: form.description.trim(),
          reporterName: form.reporterName.trim() || "Anonymous",
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const created = await res.json();
      onSubmitted({
        ...created,
        waterPointName: created.waterPointName || selectedPoint?.name,
        county: created.county || selectedPoint?.county,
      });
      setForm({ waterPointId: "", issueType: "", description: "", reporterName: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError("Couldn't submit your report right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#1565C0]/10 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-[#1565C0]" />
        </div>
        <h2 className="font-[Poppins] font-semibold text-lg text-[#0b1e33]">
          Report an issue
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block">
            Water point
          </label>
          <div className="relative">
            <select
              value={form.waterPointId}
              onChange={update("waterPointId")}
              disabled={waterPointsStatus !== "ready"}
              className="w-full appearance-none font-[Inter] text-sm bg-[#f8fafc] border border-slate-200 rounded-xl pl-4 pr-9 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b] disabled:opacity-50"
            >
              <option value="">
                {waterPointsStatus === "loading"
                  ? "Loading water points..."
                  : waterPointsStatus === "error"
                  ? "Couldn't load water points"
                  : "Select a water point"}
              </option>
              {waterPoints.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.county}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#1e293b]/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block">
            Issue type
          </label>
          <div className="relative">
            <select
              value={form.issueType}
              onChange={update("issueType")}
              className="w-full appearance-none font-[Inter] text-sm bg-[#f8fafc] border border-slate-200 rounded-xl pl-4 pr-9 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b]"
            >
              <option value="">Select an issue</option>
              {ISSUE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#1e293b]/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block">
            What's happening?
          </label>
          <textarea
            value={form.description}
            onChange={update("description")}
            rows={4}
            placeholder="Describe what you're seeing at the water point..."
            className="w-full font-[Inter] text-sm bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b] resize-none"
          />
        </div>

        <div>
          <label className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block">
            Your name <span className="text-[#1e293b]/40">(optional)</span>
          </label>
          <input
            type="text"
            value={form.reporterName}
            onChange={update("reporterName")}
            placeholder="Anonymous"
            className="w-full font-[Inter] text-sm bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b]"
          />
        </div>

        {error && (
          <p className="font-[Inter] text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="font-[Inter] text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
            Report submitted. Thank you — the county desk has been notified.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full font-[Inter] font-medium text-sm px-6 py-3.5 rounded-full bg-[#1565C0] text-white hover:bg-[#0e4c93] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Submit report
            </>
          )}
        </button>
      </form>
    </div>
  );
}

/* ---------------- Report row ---------------- */
function ReportRow({ report, delay }) {
  const s = STATUS_STYLES[report.status] || STATUS_STYLES.open;
  return (
    <Reveal delay={delay}>
      <div className="flex items-start gap-4 px-6 py-5 hover:bg-slate-50 transition-colors">
        <div className={`w-9 h-9 rounded-full ${s.bg} flex items-center justify-center shrink-0 mt-0.5`}>
          <s.Icon className={`w-4 h-4 ${s.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-[Inter] font-medium text-[#0b1e33] text-sm">
              {report.issueType}
            </p>
            <span className={`inline-flex items-center gap-1 ${s.bg} ${s.text} text-[11px] font-[Inter] font-medium px-2 py-0.5 rounded-full`}>
              {s.label}
            </span>
          </div>
          <p className="font-[Inter] text-xs text-[#1e293b]/60 mt-0.5">
            {report.waterPointName || "Unknown water point"}
            {report.county ? ` · ${report.county}` : ""}
          </p>
          {report.description && (
            <p className="font-[Inter] text-sm text-[#1e293b]/80 mt-2 leading-relaxed">
              {report.description}
            </p>
          )}
          <p className="font-[Inter] text-[11px] text-[#1e293b]/40 mt-2">
            {report.reporterName || "Anonymous"} · {timeAgo(report.createdAt)}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- Loading skeleton ---------------- */
function ReportSkeleton() {
  return (
    <div className="flex items-start gap-4 px-6 py-5 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-slate-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 bg-slate-100 rounded" />
        <div className="h-2.5 w-1/2 bg-slate-100 rounded" />
        <div className="h-2.5 w-2/3 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-slate-100 pt-16 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[Inter] text-xs text-[#1e293b]/50">
            © {new Date().getFullYear()} North Eastern Community Water Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Main Export (no internal navbar) ---------------- */
export default function Reports() {
  const { points: waterPoints, status: waterPointsStatus } = useWaterPoints();
  const { reports, status: reportsStatus, reload: reloadReports, addReport } = useReports();
  const [statusFilter, setStatusFilter] = useState("");

  const filteredReports = statusFilter
    ? reports.filter((r) => r.status === statusFilter)
    : reports;

  const counts = reports.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    },
    { open: 0, in_progress: 0, resolved: 0 }
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
      `}</style>

      {/* Page header with reduced top padding (matches global navbar offset) */}
      <section className="bg-white border-b border-slate-100 pt-16 md:pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
              Community reports
            </p>
            <h1 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33] mb-8">
              Reports
            </h1>
          </Reveal>

          <Reveal delay={100} className="flex flex-wrap gap-4">
            <StatPill label="Open" value={counts.open} tone="text-red-600" />
            <StatPill label="In progress" value={counts.in_progress} tone="text-amber-600" />
            <StatPill label="Resolved" value={counts.resolved} tone="text-emerald-600" />
            <StatPill label="Total" value={reports.length} tone="text-[#1565C0]" />
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid lg:grid-cols-[1fr_1.6fr] gap-8 items-start">
        <Reveal>
          <ReportForm
            waterPoints={waterPoints}
            waterPointsStatus={waterPointsStatus}
            onSubmitted={addReport}
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
              <h2 className="font-[Poppins] font-semibold text-[#0b1e33]">
                Recent activity
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none font-[Inter] text-xs bg-[#f8fafc] border border-slate-200 rounded-lg pl-3 pr-7 py-2 outline-none focus:border-[#1565C0] text-[#1e293b] cursor-pointer"
                  >
                    <option value="">All statuses</option>
                    {Object.entries(STATUS_STYLES).map(([key, s]) => (
                      <option key={key} value={key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#1e293b]/40 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <button
                  onClick={reloadReports}
                  className="font-[Inter] text-xs text-[#1565C0] inline-flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[#1565C0]/5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
              </div>
            </div>

            {reportsStatus === "loading" && (
              <div className="divide-y divide-slate-100">
                {[0, 1, 2, 3].map((i) => (
                  <ReportSkeleton key={i} />
                ))}
              </div>
            )}

            {reportsStatus === "error" && (
              <div className="text-center py-16 px-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <p className="font-[Inter] text-sm text-[#1e293b]/70 mb-4">
                  Couldn't load reports from the server.
                </p>
                <button
                  onClick={reloadReports}
                  className="font-[Inter] text-sm font-medium px-5 py-2.5 rounded-full bg-[#1565C0] text-white hover:bg-[#0e4c93] transition-colors inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Try again
                </button>
              </div>
            )}

            {reportsStatus === "ready" && filteredReports.length === 0 && (
              <div className="text-center py-16 px-6">
                <div className="w-12 h-12 rounded-2xl bg-[#1565C0]/10 flex items-center justify-center mx-auto mb-4">
                  <Inbox className="w-5 h-5 text-[#1565C0]" />
                </div>
                <p className="font-[Inter] text-sm text-[#1e293b]/70">
                  {statusFilter ? "No reports with this status yet." : "No reports yet. Be the first to submit one."}
                </p>
              </div>
            )}

            {reportsStatus === "ready" && filteredReports.length > 0 && (
              <div className="divide-y divide-slate-100">
                {filteredReports.map((r, i) => (
                  <ReportRow key={r.id ?? i} report={r} delay={(i % 6) * 50} />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}