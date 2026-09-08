"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, CheckCircle2, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { useNav } from "@/lib/nav";

/** Slow-rotating concentric iris — pure SVG, very subtle (light-on-blue) */
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
          <stop offset="0%" stopColor="#FDE174" stopOpacity="0.30" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="78%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="irisSheen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="290" fill="url(#irisG)" />
      <ellipse cx="232" cy="200" rx="180" ry="128" fill="url(#irisSheen)" opacity="0.3" transform="rotate(-16 232 200)" />
      <g className="iris-spin" style={{ transformOrigin: "300px 300px" }}>
        {spokes.map((s, i) => (
          <line
            key={i}
            x1="300"
            y1="300"
            x2={r2(300 + s.x)}
            y2={r2(300 + s.y)}
            stroke="#FFFFFF"
            strokeOpacity="0.12"
            strokeWidth={s.w}
          />
        ))}
        {ticks.map((t, i) => (
          <circle key={i} cx={r2(300 + t.cx)} cy={r2(300 + t.cy)} r={t.r} fill="#FDE174" fillOpacity="0.4" />
        ))}
        <circle cx="300" cy="300" r="120" fill="none" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.4" />
        <circle cx="300" cy="300" r="200" fill="none" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.2" strokeDasharray="3 10" />
      </g>
      <g className="iris-spin-rev" style={{ transformOrigin: "300px 300px" }}>
        <circle cx="300" cy="300" r="260" fill="none" stroke="#FDE174" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="1 14" />
        <circle cx="300" cy="300" r="82" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1.2" />
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

const STATS = [
  { value: "25+", label: "Years of Excellence" },
  { value: "10,000+", label: "Eyes Cared For" },
  { value: "4.8/5", label: "Patient Rating" },
];

export function Hero() {
  const nav = useNav();

  return (
    <section id="top" className="pt-4 sm:pt-6">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-jade-400 via-jade-500 to-jade-700 shadow-lift sm:rounded-[2.5rem]">
          {/* ambient glows + animated iris backdrop */}
          <IrisVisual className="pointer-events-none absolute -right-36 -top-44 h-[38rem] w-[38rem] opacity-80 lg:right-[-6rem] lg:top-[-8rem]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute right-1/3 top-0 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" aria-hidden="true" />

          <div className="relative grid gap-10 px-6 pb-10 pt-10 sm:px-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-14 lg:pb-0 lg:pt-16">
            {/* ── copy ── */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-xl"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-gold-400" />
                Advanced Ophthalmology Care
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]">
                Advanced Eye Care for a{" "}
                <span className="text-gold-400">Clearer Tomorrow</span>
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-white/85">
                Comprehensive ophthalmology care with experienced specialists, modern
                diagnostic technology and patient-focused treatment — for every age,
                from routine check-ups to advanced surgery.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => nav.navigate({ view: "appointment" })}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-4 text-base font-bold text-brand-900 shadow-lift transition hover:bg-gold-400"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book an Appointment
                </button>
                <button
                  onClick={() => nav.navigate({ view: "treatments" })}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:border-white/70 hover:bg-white/20"
                >
                  Explore Treatments
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {TRUST_ITEMS.map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-gold-400">
                      <item.icon className="h-4 w-4" />
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── visual composition — photo flush to card bottom ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mx-auto hidden w-full max-w-[26rem] sm:block lg:max-w-[30rem]"
            >
              <div className="relative mt-6 h-full min-h-[24rem] lg:min-h-[28rem]">
                {/* ring decorations */}
                <div className="ring-spin pointer-events-none absolute -left-10 top-6 h-28 w-28 rounded-full border border-dashed border-white/40" aria-hidden="true" />
                <div className="pointer-events-none absolute -inset-3 rounded-[2.25rem] border border-white/25" aria-hidden="true" />
                <div className="relative h-full overflow-hidden rounded-[1.75rem] shadow-lift">
                  <img
                    src="/images/hero-main.jpg"
                    alt="Ophthalmologist examining a patient's eyes with a slit lamp at Shiv Netralay"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jade-700/55 via-jade-700/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-0 bg-jade-700/15 mix-blend-multiply" aria-hidden="true" />
                </div>

                {/* floating rating card */}
                <div className="float-slow absolute -left-4 bottom-10 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lift backdrop-blur sm:-left-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500 text-brand-900">
                      <StarIcon />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-brand-900">4.8 / 5 Rating</p>
                      <p className="text-xs font-semibold text-ink-500">500+ patient reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── stats row — flush to card bottom ── */}
          <div className="relative border-t border-white/15 bg-white/5 px-6 py-6 backdrop-blur-sm sm:px-10 lg:px-14">
            <dl className="mx-auto grid max-w-2xl grid-cols-3 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{s.value}</dd>
                  <dd className="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-xs">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M12 2l2.9 6.26 6.85.72-5.09 4.62 1.43 6.74L12 16.9l-6.09 3.44 1.43-6.74-5.09-4.62 6.85-.72L12 2z" />
    </svg>
  );
}
