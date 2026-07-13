import React, { useState, useEffect, useRef } from "react";
import {
  Droplets,
  Users,
  MapPin,
  User,
  Award,
  Target,
  ChevronRight,
  Handshake,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

/* ---------------- Data ---------------- */

const COMMUNITIES = [
  {
    id: 1,
    name: "Garissa County",
    waterPoints: 340,
    committees: 12,
    members: 156,
    status: "active",
    description:
      "The pilot community where it all began. Home to 340 boreholes and water pans, with the most active reporting network in the region.",
    leaders: ["Fatuma Abdi (Chair)", "Hassan Noor (Elder)"],
    icon: "🏜️",
  },
  {
    id: 2,
    name: "Wajir County",
    waterPoints: 280,
    committees: 10,
    members: 132,
    status: "active",
    description:
      "Joined in 2022 after seeing the impact in Garissa. Now tracks over 280 water points with a growing committee network.",
    leaders: ["Ali Sheikh (Chair)", "Amina Yusuf (Secretary)"],
    icon: "🌾",
  },
  {
    id: 3,
    name: "Mandera County",
    waterPoints: 310,
    committees: 14,
    members: 168,
    status: "active",
    description:
      "One of the most active regions, with 14 committees monitoring over 310 water points across the county.",
    leaders: ["Mohamed Hassan (Chair)", "Khadiija Noor (Treasurer)"],
    icon: "🏝️",
  },
  {
    id: 4,
    name: "Isiolo County",
    waterPoints: 180,
    committees: 8,
    members: 95,
    status: "growing",
    description:
      "The newest addition to the network. Rapidly expanding as more communities join the tracking effort.",
    leaders: ["David Lekuton (Chair)", "Grace Chebet (Secretary)"],
    icon: "🌄",
  },
  {
    id: 5,
    name: "Tana River County",
    waterPoints: 174,
    committees: 9,
    members: 108,
    status: "growing",
    description:
      "Completes our coverage across the five ASAL counties. Communities along the Tana River are now actively reporting.",
    leaders: ["Kiprop Kiptoo (Chair)", "Lilian Muthoni (Secretary)"],
    icon: "🌊",
  },
];

const STATS = [
  { label: "Communities engaged", value: 47, suffix: "" },
  { label: "Active committees", value: 53, suffix: "" },
  { label: "Community members", value: 659, suffix: "+" },
  { label: "Water points monitored", value: 1284, suffix: "+" },
];

const ACHIEVEMENTS = [
  {
    icon: Award,
    title: "47 communities engaged",
    desc: "Across Garissa, Wajir, Mandera, Isiolo, and Tana River counties.",
  },
  {
    icon: Users,
    title: "53 active committees",
    desc: "Local water committees leading the charge in every community.",
  },
  {
    icon: Handshake,
    title: "659 community members",
    desc: "Residents, elders, and chiefs working together for safe water.",
  },
  {
    icon: Target,
    title: "98% reporting rate",
    desc: "Regular updates from communities keep the map accurate.",
  },
];

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

/* ---------------- Hero (minimal padding, like homepage) ---------------- */
function Hero() {
  return (
    <section className="relative pt-0 pb-12 md:pt-2 md:pb-16 overflow-hidden bg-[#f8fafc]">
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
            Communities across the North East
          </p>
          <h1 className="font-[Poppins] text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#0b1e33] leading-[1.1] mb-6">
            Powered by the people on the ground
          </h1>
          <p className="font-[Inter] text-lg text-[#1e293b]/80 max-w-2xl mx-auto leading-relaxed">
            From Garissa to Tana River, local water committees and community
            members are the eyes and ears of this platform — reporting issues,
            tracking water points, and ensuring safe water for everyone.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Stats Bar ---------------- */
function StatsBar() {
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center md:text-left">
            <div className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#1565C0]">
              {s.value.toLocaleString()}
              {s.suffix}
            </div>
            <div className="font-[Inter] text-sm text-[#1e293b]/70 mt-1">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Achievements ---------------- */
function Achievements() {
  return (
    <section className="bg-[#f8fafc] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="max-w-2xl mb-14">
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-3">
            What we've built together
          </p>
          <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
            Communities driving change
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 border border-slate-100 h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-[#1565C0]/10 flex items-center justify-center mx-auto mb-4">
                  <a.icon className="w-5 h-5 text-[#1565C0]" />
                </div>
                <h3 className="font-[Poppins] font-semibold text-[#0b1e33] mb-2">
                  {a.title}
                </h3>
                <p className="font-[Inter] text-sm text-[#1e293b]/60 leading-relaxed">
                  {a.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Community Cards ---------------- */
function CommunitiesGrid() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div>
            <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-2">
              Our counties
            </p>
            <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-[#0b1e33]">
              Every community, on the map
            </h2>
          </div>
          <p className="font-[Inter] text-sm text-[#1e293b]/60 max-w-sm">
            {COMMUNITIES.length} counties with active water committees and
            community members reporting daily.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMUNITIES.map((community, i) => (
            <Reveal key={community.id} delay={i * 60}>
              <div className="group bg-[#f8fafc] rounded-2xl p-6 border border-slate-100 hover:border-[#1565C0]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{community.icon}</div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-[Inter] font-medium px-2.5 py-1 rounded-full ${
                      community.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        community.status === "active" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    {community.status === "active" ? "Active" : "Growing"}
                  </span>
                </div>

                <h3 className="font-[Poppins] font-semibold text-xl text-[#0b1e33] mb-2">
                  {community.name}
                </h3>
                <p className="font-[Inter] text-sm text-[#1e293b]/70 leading-relaxed flex-1">
                  {community.description}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <p className="font-[Poppins] font-bold text-[#1565C0] text-lg">
                      {community.waterPoints}
                    </p>
                    <p className="font-[Inter] text-[10px] text-[#1e293b]/50 uppercase tracking-wider">
                      Water points
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-[Poppins] font-bold text-[#1565C0] text-lg">
                      {community.committees}
                    </p>
                    <p className="font-[Inter] text-[10px] text-[#1e293b]/50 uppercase tracking-wider">
                      Committees
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-[Poppins] font-bold text-[#1565C0] text-lg">
                      {community.members}
                    </p>
                    <p className="font-[Inter] text-[10px] text-[#1e293b]/50 uppercase tracking-wider">
                      Members
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-start gap-2">
                    <User className="w-3.5 h-3.5 text-[#1565C0] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-[Inter] text-[11px] text-[#1e293b]/60">
                        Community leaders
                      </p>
                      <p className="font-[Inter] text-xs font-medium text-[#0b1e33]">
                        {community.leaders.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Community Spotlight ---------------- */
function Spotlight() {
  return (
    <section className="bg-[#0b1e33] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#42A5F5] font-semibold mb-8">
            Community spotlight
          </p>
          <blockquote className="font-[Poppins] text-2xl md:text-3xl font-medium text-white leading-snug">
            "When we started, we had no idea how many water points were broken
            across our county. Now we know exactly where they are, and we're
            fixing them in days instead of months."
          </blockquote>
          <div className="mt-8">
            <p className="font-[Inter] font-semibold text-white text-sm">
              Fatuma Abdi
            </p>
            <p className="font-[Inter] text-white/50 text-xs">
              Water committee chair, Garissa
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="bg-gradient-to-br from-[#1565C0] to-[#0e4c93] rounded-3xl px-8 py-14 md:px-16 md:py-20 text-center relative overflow-hidden">
            <svg
              className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10"
              viewBox="0 0 200 200"
            >
              <Droplets className="w-full h-full text-white" />
            </svg>
            <h2 className="font-[Poppins] text-3xl md:text-4xl font-bold text-white mb-4">
              Is your community on the map?
            </h2>
            <p className="font-[Inter] text-white/80 max-w-xl mx-auto mb-9">
              If you're part of a water committee or community group working to
              track water in the North East, we'd love to have you join us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="font-[Inter] font-medium px-7 py-3.5 rounded-full bg-white text-[#1565C0] hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
                Join a community <ChevronRight className="w-4 h-4" />
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

/* ---------------- Main Export ---------------- */
export default function Communities() {
  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
        `}
      </style>
      <Hero />
      <StatsBar />
      <Achievements />
      <CommunitiesGrid />
      <Spotlight />
      <CTA />
      <Footer />
    </div>
  );
}