"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { TREATMENTS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import { Reveal } from "@/components/site/reveal";

export function TreatmentsView() {
  const nav = useNav();

  return (
    <>
      {/* hero band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-azure-800 py-16 sm:py-20">
        <svg className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-15" viewBox="0 0 200 200" aria-hidden="true">
          {[30, 60, 90].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#8cc8ec" strokeWidth="0.8" strokeDasharray="2 8" />
          ))}
        </svg>
        <div className="container-x relative">
          <motion.nav
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-azure-300"
            aria-label="Breadcrumb"
          >
            <button onClick={() => nav.navigate({ view: "home" })} className="transition hover:text-white">
              Home
            </button>
            <span>/</span>
            <span className="text-white">Treatments</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl"
          >
            Eye Care <span className="text-gradient">Treatments</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-4 max-w-2xl text-lg leading-relaxed text-azure-100/85"
          >
            Specialised ophthalmology services designed around your individual
            eye-care needs — every treatment begins with precise diagnosis and
            honest counselling.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {TREATMENTS.map((t) => (
              <button
                key={t.id}
                onClick={() => nav.navigate({ view: "treatment", treatmentId: t.id })}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-azure-50 transition hover:border-azure-300/50 hover:bg-white/15"
              >
                <t.icon className="h-4 w-4 text-azure-300" />
                {t.shortName}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* cards */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                {/* cover */}
                <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${t.gradient}`}>
                  <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
                    <defs>
                      <pattern id={`p-${t.id}`} width="28" height="28" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.2" fill="#fff" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#p-${t.id})`} />
                  </svg>
                  <t.icon className="relative h-12 w-12 text-white transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                  <span className="absolute bottom-3 right-4 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-white/70">
                    {t.name}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-extrabold tracking-tight text-navy-900">{t.name}</h2>
                  <p className="mt-1.5 text-sm font-semibold text-azure-700">{t.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{t.cardDescription}</p>

                  <ul className="mt-4 space-y-1.5">
                    {t.symptoms.items.slice(0, 3).map((s) => (
                      <li key={s} className="flex items-start gap-2 text-xs font-semibold text-slate-500">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure-500" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => nav.navigate({ view: "treatment", treatmentId: t.id })}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-800"
                  >
                    Learn More
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* bottom CTA */}
        <div className="container-x mt-14">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-white p-8 shadow-soft sm:p-10 lg:flex-row">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">
                  Not sure which treatment you need?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
                  Start with a comprehensive eye examination — our specialists
                  will explain your options in plain language and help you
                  decide with confidence.
                </p>
              </div>
              <button
                onClick={() => nav.navigate({ view: "appointment" })}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-azure-600 px-8 py-4 text-base font-extrabold text-white shadow-lift transition hover:bg-azure-700"
              >
                Book an Eye Exam
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
