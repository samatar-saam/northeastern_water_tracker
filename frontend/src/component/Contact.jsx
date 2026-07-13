import React, { useState, useEffect, useRef } from "react";
import {
  Droplets,
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

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

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
        <Reveal>
          <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-4">
            Get in touch
          </p>
          <h1 className="font-[Poppins] text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#0b1e33] leading-[1.1] mb-6">
            We'd love to hear from you
          </h1>
          <p className="font-[Inter] text-lg text-[#1e293b]/80 max-w-2xl mx-auto leading-relaxed">
            Whether you're a community member, a county water officer, or an NGO
            partner – reach out and help us make water tracking better for everyone.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Contact form + info ---------------- */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send the data to your backend
    console.log("Form submitted:", form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact info */}
          <Reveal className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-[Poppins] text-2xl font-bold text-[#0b1e33] mb-6">
                Reach us directly
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1565C0]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#1565C0]" />
                  </div>
                  <div>
                    <p className="font-[Inter] text-sm font-medium text-[#0b1e33]">
                      North Eastern Water Tracker
                    </p>
                    <p className="font-[Inter] text-sm text-[#1e293b]/60">
                      Garissa, Kenya
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1565C0]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[#1565C0]" />
                  </div>
                  <div>
                    <p className="font-[Inter] text-sm font-medium text-[#0b1e33]">
                      Email
                    </p>
                    <a
                      href="mailto:support@newatertracker.ke"
                      className="font-[Inter] text-sm text-[#1565C0] hover:underline"
                    >
                      support@newatertracker.ke
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1565C0]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#1565C0]" />
                  </div>
                  <div>
                    <p className="font-[Inter] text-sm font-medium text-[#0b1e33]">
                      Phone
                    </p>
                    <a
                      href="tel:+254700123456"
                      className="font-[Inter] text-sm text-[#1565C0] hover:underline"
                    >
                      +254 700 123 456
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1565C0]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#1565C0]" />
                  </div>
                  <div>
                    <p className="font-[Inter] text-sm font-medium text-[#0b1e33]">
                      Office hours
                    </p>
                    <p className="font-[Inter] text-sm text-[#1e293b]/60">
                      Mon–Fri, 8:00 AM – 5:00 PM (EAT)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Contact form */}
          <Reveal delay={100} className="lg:col-span-3">
            <div className="bg-[#f8fafc] rounded-2xl border border-slate-100 p-6 md:p-8">
              <h2 className="font-[Poppins] text-2xl font-bold text-[#0b1e33] mb-6">
                Send a message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full font-[Inter] text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b]"
                    placeholder="Fatuma Abdi"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full font-[Inter] text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b]"
                    placeholder="fatuma@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full font-[Inter] text-sm bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b] resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full font-[Inter] font-medium text-sm px-6 py-3.5 rounded-full bg-[#1565C0] text-white hover:bg-[#0e4c93] transition-colors inline-flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Message sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send message
                    </>
                  )}
                </button>
                {submitted && (
                  <p className="font-[Inter] text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2 text-center">
                    Thank you! We'll get back to you within 24 hours.
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer (shared) ---------------- */
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
export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
        `}
      </style>
      <Hero />
      <ContactSection />
      <Footer />
    </div>
  );
}