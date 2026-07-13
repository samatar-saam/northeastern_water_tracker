// src/component/UserSignUp.jsx
import React, { useState } from "react";
import {
  Droplets,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  MapPin,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const COUNTIES = ["Garissa", "Wajir", "Mandera", "Isiolo", "Tana River"];

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative pt-0 pb-8 md:pt-2 md:pb-12 overflow-hidden bg-[#f8fafc]">
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M -50 ${100 + i * 90} Q 150 ${60 + i * 90}, 350 ${110 + i * 90} T 850 ${100 + i * 90}`} fill="none" stroke="#1565C0" strokeWidth="2" />
        ))}
      </svg>
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p className="font-[Inter] text-xs uppercase tracking-[0.2em] text-[#1565C0] font-semibold mb-4">
          Join the community
        </p>
        <h1 className="font-[Poppins] text-4xl md:text-5xl lg:text-[3.2rem] font-bold text-[#0b1e33] leading-[1.1]">
          Create your account
        </h1>
        <p className="font-[Inter] text-lg text-[#1e293b]/80 max-w-2xl mx-auto leading-relaxed mt-2">
          Start tracking water points and reporting issues in your community.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Sign Up Form ---------------- */
function SignUpForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    county: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      console.log("Sign up:", form);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Reset form
        setForm({ name: "", email: "", password: "", confirmPassword: "", county: "" });
      }, 4000);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto px-6 md:px-10 pb-20">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#1565C0]/10 flex items-center justify-center">
            <User className="w-6 h-6 text-[#1565C0]" />
          </div>
          <div>
            <h2 className="font-[Poppins] font-semibold text-lg text-[#0b1e33]">Sign Up</h2>
            <p className="font-[Inter] text-xs text-[#1e293b]/60">Create your community account</p>
          </div>
        </div>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-[Poppins] font-semibold text-[#0b1e33]">Account created!</h3>
            <p className="font-[Inter] text-sm text-[#1e293b]/60 mt-1">
              We've sent a verification link to your email.
            </p>
            <Link
              to="/user-login"
              className="mt-4 inline-block font-[Inter] text-sm font-medium text-[#1565C0] hover:underline"
            >
              Go to login →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block">
                Full name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#1e293b]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full font-[Inter] text-sm bg-[#f8fafc] border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b]"
                  placeholder="Fatuma Abdi"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#1e293b]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full font-[Inter] text-sm bg-[#f8fafc] border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="county" className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block">
                County
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#1e293b]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <select
                  id="county"
                  name="county"
                  value={form.county}
                  onChange={handleChange}
                  required
                  className="w-full font-[Inter] text-sm bg-[#f8fafc] border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b] appearance-none"
                >
                  <option value="">Select your county</option>
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#1e293b]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full font-[Inter] text-sm bg-[#f8fafc] border border-slate-200 rounded-xl pl-11 pr-11 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e293b]/40 hover:text-[#1e293b]/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="font-[Inter] text-xs font-medium text-[#1e293b]/70 mb-1.5 block">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#1e293b]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full font-[Inter] text-sm bg-[#f8fafc] border border-slate-200 rounded-xl pl-11 pr-11 py-3 outline-none focus:border-[#1565C0] transition-colors text-[#1e293b]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1e293b]/40 hover:text-[#1e293b]/70 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-[Inter] font-medium text-sm px-6 py-3.5 rounded-full bg-[#1565C0] text-white hover:bg-[#0e4c93] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        )}

        <div className="mt-6 text-center border-t border-slate-100 pt-6">
          <p className="font-[Inter] text-xs text-[#1e293b]/60">
            Already have an account?{" "}
            <Link to="/user-login" className="text-[#1565C0] hover:underline font-medium inline-flex items-center gap-1">
              Log in <ArrowLeft className="w-3 h-3" />
            </Link>
          </p>
        </div>
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

export default function UserSignUp() {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
      `}</style>
      <Hero />
      <SignUpForm />
      <Footer />
    </div>
  );
}