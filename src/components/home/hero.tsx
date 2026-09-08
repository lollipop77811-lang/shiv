"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, CheckCircle2, ShieldCheck, Sparkles, Star, Stethoscope } from "lucide-react";
import { useNav } from "@/lib/nav";

/** Slow-rotating concentric iris — pure SVG, very subtle */
function IrisVisual({ className }: { className?: string }) {
  // Rounded to 2dp so SSR (JSC) and client (V8) Math.cos/sin agree exactly
  const r2 = (v: number) => Math.round(v * 100) / 100;
  const spokes = Array.from({ length: 48 }, (_, i) => ({
    x: r2(240 * Math.cos((i * Math.PI * 2) / 48)),
    y: r2(240 * Math.sin((i * Math.PI * 2) / 48)),
    w: i % 4 === 0 ? 1.6 : 0.7,
  }));
  const ticks = Array.from({ length: 96 }, (_, i) => {
    const rad = 150 + (i % 3) * 42;
    return {
      cx: r2(rad * Math.cos((i * Math.PI * 2) / 96)),
      cy: r2(rad * Math.sin((i * Math.PI * 2) / 96)),
      r: i % 6 === 0 ? 2.4 : 1.2,
    };
  });
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="irisG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#35A78F" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#219880" stopOpacity="0.28" />
          <stop offset="78%" stopColor="#123C35" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#123C35" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="290" fill="url(#irisG)" />
      <g className="iris-spin" style={{ transformOrigin: "300px 300px" }}>
        {spokes.map((s, i) => (
          <line
            key={i}
            x1="300"
            y1="300"
            x2={r2(300 + s.x)}
            y2={r2(300 + s.y)}
            stroke="#219880"
            strokeOpacity="0.10"
            strokeWidth={s.w}
          />
        ))}
        {ticks.map((t, i) => (
          <circle key={i} cx={r2(300 + t.cx)} cy={r2(300 + t.cy)} r={t.r} fill="#35A78F" fillOpacity="0.35" />
        ))}
        <circle cx="300" cy="300" r="120" fill="none" stroke="#219880" strokeOpacity="0.22" strokeWidth="1.4" />
        <circle cx="300" cy="300" r="200" fill="none" stroke="#219880" strokeOpacity="0.14" strokeWidth="1.2" strokeDasharray="3 10" />
      </g>
      <g className="iris-spin-rev" style={{ transformOrigin: "300px 300px" }}>
        <circle cx="300" cy="300" r="260" fill="none" stroke="#7CC5B2" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="1 14" />
        <circle cx="300" cy="300" r="82" fill="none" stroke="#123C35" strokeOpacity="0.14" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

const TRUST_ITEMS = [
  { icon: Stethoscope, label: "Experienced Ophthalmologists" },
  { icon: ShieldCheck, label: "Advanced Eye Care" },
  { icon: Sparkles, label: "Modern Technology" },
  { icon: CheckCircle2, label: "Patient-Centred Care" },
];

export function Hero() {
  const nav = useNav();

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-jade-50 via-mist to-white">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-jade-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-ivory-100/70 blur-3xl" />
      {/* animated iris backdrop */}
      <IrisVisual className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] opacity-70 lg:right-[-8rem] lg:top-[-6rem]" />

      <div className="container-x relative grid items-center gap-14 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-20">
        {/* ── copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-jade-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-jade-700 shadow-soft backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-jade-500" />
            Advanced Ophthalmology Care
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-brand-900 sm:text-5xl lg:text-[3.6rem]">
            Advanced Eye Care for a{" "}
            <span className="text-gradient">Clearer Tomorrow</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-ink-600">
            Comprehensive ophthalmology care with experienced specialists, modern
            diagnostic technology and patient-focused treatment — for every age,
            from routine check-ups to advanced surgery.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => nav.navigate({ view: "appointment" })}
              className="group inline-flex items-center gap-2.5 rounded-full bg-jade-600 px-7 py-4 text-base font-bold text-white shadow-lift transition hover:bg-jade-700"
            >
              <CalendarCheck className="h-5 w-5" />
              Book an Appointment
            </button>
            <button
              onClick={() => nav.navigate({ view: "treatments" })}
              className="group inline-flex items-center gap-2 rounded-full border border-jade-200 bg-white/80 px-7 py-4 text-base font-bold text-brand-900 shadow-soft backdrop-blur transition hover:border-jade-300 hover:bg-white"
            >
              Explore Treatments
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3.5">
            {TRUST_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm font-semibold text-brand-800">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-jade-100 text-jade-700">
                  <item.icon className="h-4 w-4" />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── visual composition ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto w-full max-w-[30rem] lg:max-w-none"
        >
          <div className="relative">
            {/* ring frame */}
            <div className="absolute -inset-4 rounded-[2.5rem] border border-jade-200/70" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.25rem] shadow-lift">
              <img
                src="/images/hero-main.jpg"
                alt="Ophthalmologist examining a patient's eyes with a slit lamp at Shiv Netralay"
                className="aspect-[4/4.2] w-full object-cover sm:aspect-[4/3.6]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/25 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* floating rating card */}
            <div className="float-slow glass absolute -left-4 bottom-8 rounded-2xl p-4 shadow-lift sm:-left-8">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500/90 text-white">
                  <Star className="h-5 w-5 fill-current" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-brand-900">4.8 / 5 Rating</p>
                  <p className="text-xs font-semibold text-ink-500">500+ patient reviews</p>
                </div>
              </div>
            </div>

            {/* floating experience card */}
            <div className="float-slower glass absolute -right-3 top-8 rounded-2xl p-4 shadow-lift sm:-right-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-jade-600 text-white">
                  <EyeIcon />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-brand-900">25+ Years</p>
                  <p className="text-xs font-semibold text-ink-500">of trusted eye care</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
