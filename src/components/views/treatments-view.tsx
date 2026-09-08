"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TREATMENTS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import { Reveal } from "@/components/site/reveal";

export function TreatmentsView() {
  const nav = useNav();

  return (
    <>
      {/* hero band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-jade-800 py-16 sm:py-20">
        <svg className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 opacity-15" viewBox="0 0 200 200" aria-hidden="true">
          {[30, 60, 90].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#FDE174" strokeWidth="0.8" strokeDasharray="2 8" />
          ))}
        </svg>
        <div className="container-x relative">
          <motion.nav
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-jade-300"
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
            Eye Care <span className="text-hero-accent">Treatments</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-4 max-w-2xl text-lg leading-relaxed text-jade-100/85"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-jade-50 transition hover:border-jade-300/50 hover:bg-white/15"
              >
                <t.icon className="h-4 w-4 text-jade-300" />
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
                {/* cover photo */}
                <button
                  onClick={() => nav.navigate({ view: "treatment", treatmentId: t.id })}
                  className="relative block h-48 w-full overflow-hidden"
                  aria-label={`Learn about ${t.name}`}
                >
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className={`block h-full w-full bg-gradient-to-br ${t.gradient}`} />
                  )}
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-brand-950/45 via-brand-950/5 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-3 left-5 inline-flex items-center gap-2 text-sm font-extrabold text-white">
                    <t.icon className="h-4.5 w-4.5 text-gold-400" strokeWidth={1.8} />
                    {t.shortName}
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-extrabold tracking-tight text-brand-900">{t.name}</h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-500">{t.tagline}</p>

                  <button
                    onClick={() => nav.navigate({ view: "treatment", treatmentId: t.id })}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-jade-200 bg-jade-50/60 px-5 py-2.5 text-sm font-bold text-jade-700 transition hover:border-jade-300 hover:bg-jade-50"
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
                <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">
                  Not sure which treatment you need?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
                  Start with a comprehensive eye examination — our specialists
                  will explain your options in plain language and help you
                  decide with confidence.
                </p>
              </div>
              <button
                onClick={() => nav.navigate({ view: "appointment" })}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-base font-extrabold text-brand-900 shadow-lift transition hover:bg-gold-400"
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
