import React, { useState, useEffect, useRef } from "react";
import {
  Droplets,
  ChevronRight,
  ClipboardList,
  Radio,
  Wrench,
  CheckCircle2,
  Users,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

/* ---------------------------------------------------------
   Token system: ink #0b1e33 · slate #1e293b · blue #1565C0
--------------------------------------------------------- */

const MILESTONES = [
  {
    year: "2019",
    title: "A dry season, and a spreadsheet",
    text: "Three water committees in Garissa start sharing borehole status over WhatsApp voice notes, because the nearest working phone signal is an hour's walk from most pumps.",
  },
  {
    year: "2021",
    title: "The pilot",
    text: "40 water points across Garissa County get their first digital record. Reports that once took weeks to reach the county office now take a day.",
  },
  {
    year: "2022",
    title: "Wajir and Mandera join",
    text: "Neighbouring committees ask to be added after hearing how fast a broken pump in Dertu got fixed. The map grows to two more counties.",
  },
  {
    year: "2024",
    title: "All five counties",
    text: "Isiolo and Tana River complete the coverage. Over 1,200 boreholes and water pans are now tracked across the North East.",
  },
  {
    year: "Today",
    title: "512 reports resolved and counting",
    text: "What started as voice notes is now the record every county water office, NGO, and committee checks before sending a repair team.",
  },
];

const VALUES = [
  {
    icon: Radio,
    title: "Report from the ground",
    text: "The person standing at the pump knows its state before any office does. Every record starts with them, not a survey team.",
  },
  {
    icon: ShieldCheck,
    title: "One shared record",
    text: "No county office, NGO, or committee should be working from a different version of the truth. There's one map, and everyone sees it.",
  },
  {
    icon: HeartHandshake,
    title: "Built with committees, not for them",
    text: "Every feature on this platform was requested by a water committee first. We build what's asked for, not what looks good in a demo.",
  },
];

const PIPELINE = [
  { icon: ClipboardList, title: "Reported", text: "A resident or committee member flags an issue with a photo and location." },
  { icon: Radio, title: "Verified", text: "The county water desk confirms the report and sets a priority." },
  { icon: Wrench, title: "Dispatched", text: "A repair team or technician is assigned and given the exact water point." },
  { icon: CheckCircle2, title: "Fixed", text: "The status updates for everyone the moment the water point is working again." },
];

const PARTNERS = [
  "Garissa County Water Department",
  "Wajir Water & Sanitation Company",
  "Mandera WASH Consortium",
  "Isiolo County Government",
  "Tana River Water Committees Network",
  "Kenya Red Cross – North Eastern",
];

/* ---------------- Shared reveal wrapper ---------------- */
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

/* ---------------- Hero (adjusted padding to match homepage) ---------------- */
function Hero() {
  return (
    <section className="relative pt-16 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-[#f8fafc]">
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
            About the platform
          </p>
          <h1 className="font-[Poppins] text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#0b1e33] leading-[1.1] mb-6">
            We started with a voice note about a broken pump.
          </h1>
          <p className="font-[Inter] text-lg text-[#1e293b]/80 max-w-2xl mx-auto leading-relaxed">
            The North Eastern Community Water Tracker exists because the people
            closest to a water point are the last to be heard when it fails.
            We built one shared record so that's no longer true.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Mission / values ---------------- */
function Values() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="max-w-2xl mb-14">
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
            Why we exist
          </p>
          <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33] leading-tight">
            A water point that breaks quietly stays broken the longest.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 h-full">
                <div className="w-11 h-11 rounded-xl bg-[#1565C0]/10 flex items-center justify-center mb-6">
                  <v.icon className="w-5 h-5 text-[#1565C0]" />
                </div>
                <h3 className="font-[Poppins] font-semibold text-lg text-[#0b1e33] mb-3">
                  {v.title}
                </h3>
                <p className="font-[Inter] text-sm text-[#1e293b]/70 leading-relaxed">
                  {v.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pipeline ---------------- */
function Pipeline() {
  const ref = useRef(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          PIPELINE.forEach((_, i) => {
            setTimeout(() => setActive(i), i * 450 + 200);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-[#f8fafc] py-20 md:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="max-w-xl mb-16">
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
            How a report becomes a repair
          </p>
          <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
            Four steps. Usually a matter of days.
          </h2>
        </Reveal>

        <div className="relative">
          <div className="hidden md:block absolute top-[27px] left-0 right-0 h-0.5 bg-slate-200">
            <div
              className="h-full bg-[#1565C0] transition-all duration-700 ease-out"
              style={{ width: `${Math.max(0, (active / (PIPELINE.length - 1)) * 100)}%` }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-10 md:gap-6 relative">
            {PIPELINE.map((p, i) => {
              const reached = active >= i;
              return (
                <div key={p.title} className="flex flex-col items-start md:items-center md:text-center">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-5 border-2 transition-all duration-500 ${
                      reached
                        ? "bg-[#1565C0] border-[#1565C0] scale-100"
                        : "bg-white border-slate-200 scale-95"
                    }`}
                  >
                    <p.icon className={`w-6 h-6 transition-colors duration-500 ${reached ? "text-white" : "text-slate-300"}`} />
                  </div>
                  <h3 className="font-[Poppins] font-semibold text-base text-[#0b1e33] mb-2">
                    {i + 1}. {p.title}
                  </h3>
                  <p className="font-[Inter] text-sm text-[#1e293b]/65 leading-relaxed">
                    {p.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Timeline ---------------- */
function Timeline() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal className="mb-16 text-center">
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
            Our story
          </p>
          <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
            From WhatsApp voice notes to five counties
          </h2>
        </Reveal>

        <div className="relative pl-10 md:pl-0">
          <div className="absolute left-[7px] md:left-1/2 top-2 bottom-2 w-0.5 bg-slate-200 md:-translate-x-1/2" />

          <div className="space-y-12">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal key={m.year} delay={i * 80}>
                  <div className="relative md:grid md:grid-cols-2 md:gap-10">
                    <div className="absolute -left-10 md:left-1/2 top-1 w-4 h-4 rounded-full bg-[#1565C0] ring-4 ring-white md:-translate-x-1/2" />

                    {isLeft ? (
                      <>
                        <div className="md:text-right md:pr-4">
                          <span className="font-[Poppins] text-sm font-bold text-[#1565C0]">
                            {m.year}
                          </span>
                          <h3 className="font-[Poppins] font-semibold text-lg text-[#0b1e33] mt-1 mb-2">
                            {m.title}
                          </h3>
                          <p className="font-[Inter] text-sm text-[#1e293b]/70 leading-relaxed">
                            {m.text}
                          </p>
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div className="md:pl-4">
                          <span className="font-[Poppins] text-sm font-bold text-[#1565C0]">
                            {m.year}
                          </span>
                          <h3 className="font-[Poppins] font-semibold text-lg text-[#0b1e33] mt-1 mb-2">
                            {m.title}
                          </h3>
                          <p className="font-[Inter] text-sm text-[#1e293b]/70 leading-relaxed">
                            {m.text}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partners ---------------- */
function Partners() {
  return (
    <section className="bg-[#0b1e33] py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-12">
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#42A5F5] font-semibold mb-3">
            Who we work with
          </p>
          <h2 className="font-[Poppins] text-2xl md:text-3xl font-bold text-white">
            County water offices, committees, and partners across the region
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
              >
                <Users className="w-4 h-4 text-[#42A5F5] shrink-0" />
                <span className="font-[Inter] text-sm text-white/85">{p}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
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
              This only works with more eyes on the ground.
            </h2>
            <p className="font-[Inter] text-white/80 max-w-xl mx-auto mb-9">
              If you're part of a water committee, county office, or NGO working
              in the North East, we'd like to have you on the map.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="font-[Inter] font-medium px-7 py-3.5 rounded-full bg-white text-[#1565C0] hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
                Join as a partner <ChevronRight className="w-4 h-4" />
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
              <p className="font-[Poppins] font-semibold text-sm text-[#0b1e33] mb-4">
                {col.h}
              </p>
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

/* ---------------- Main Export (no internal navbar) ---------------- */
export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
        `}
      </style>
      <Hero />
      <Values />
      <Pipeline />
      <Timeline />
      <Partners />
      <CTA />
      <Footer />
    </div>
  );
}