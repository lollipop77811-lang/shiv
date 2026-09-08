"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Phone,
  Stethoscope,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CLINIC, getTreatment, TREATMENTS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import { Reveal } from "@/components/site/reveal";

export function TreatmentDetailView({ id }: { id?: string }) {
  const nav = useNav();
  const t = getTreatment(id);
  const others = TREATMENTS.filter((x) => x.id !== t.id).slice(0, 4);

  return (
    <>
      {/* ── hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-jade-800 py-14 sm:py-18 lg:py-20">
        {t.heroImage ? (
          <div className="absolute inset-0">
            <img src={t.heroImage} alt="" className="h-full w-full object-cover opacity-25" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-900/40" aria-hidden="true" />
          </div>
        ) : (
          <svg className="pointer-events-none absolute -right-24 -top-28 h-[28rem] w-[28rem] opacity-15" viewBox="0 0 200 200" aria-hidden="true">
            {[30, 60, 90, 120].map((r) => (
              <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#7BD0C4" strokeWidth="0.8" strokeDasharray="2 8" />
            ))}
          </svg>
        )}

        <div className="container-x relative">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-jade-300"
            aria-label="Breadcrumb"
          >
            <button onClick={() => nav.navigate({ view: "home" })} className="transition hover:text-white">Home</button>
            <ChevronRight className="h-3.5 w-3.5" />
            <button onClick={() => nav.navigate({ view: "treatments" })} className="transition hover:text-white">Treatments</button>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{t.shortName}</span>
          </motion.nav>

          <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className={`inline-grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br ${t.gradient} text-white shadow-lift`}
              >
                <t.icon className="h-8 w-8" strokeWidth={1.7} />
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
              >
                {t.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="mt-3 max-w-xl text-lg font-semibold text-jade-200 sm:text-xl"
              >
                {t.tagline}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="flex flex-wrap gap-3 lg:justify-end"
            >
              <button
                onClick={() => nav.navigate({ view: "appointment", prefill: { department: t.id } })}
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-base font-extrabold text-brand-900 shadow-lift transition hover:bg-jade-50"
              >
                <CalendarCheck className="h-5 w-5" />
                Book Consultation
              </button>
              <a
                href={CLINIC.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── overview ── */}
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-jade-700">Understanding</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-900">
              What is {t.shortName}?
            </h2>
            <div className="mt-6 space-y-4">
              {t.overview.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-600 sm:text-lg">
                  {p}
                </p>
              ))}
            </div>

            {/* candidates */}
            <div className="mt-10 rounded-3xl border border-jade-200/70 bg-jade-50/50 p-7 sm:p-8">
              <h3 className="text-lg font-extrabold tracking-tight text-brand-900">
                {t.candidates.title}
              </h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {t.candidates.items.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm font-semibold text-brand-800">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-jade-600" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* symptoms */}
          <Reveal delay={0.1}>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl border border-border/70 bg-white p-7 shadow-soft sm:p-8">
                <h3 className="text-lg font-extrabold tracking-tight text-brand-900">{t.symptoms.title}</h3>
                <ul className="mt-4 space-y-3">
                  {t.symptoms.items.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm leading-relaxed text-ink-600">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-jade-500 to-brand-700" />
                      {s}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => nav.navigate({ view: "appointment", prefill: { department: t.id } })}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-jade-600 px-5 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-jade-700"
                >
                  Discuss Your Symptoms
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-brand-900 to-jade-800 p-7 text-white shadow-lift sm:p-8">
                <Stethoscope className="h-8 w-8 text-jade-300" />
                <p className="mt-4 text-base font-semibold leading-relaxed">
                  Experiencing these symptoms? An early consultation protects
                  both your vision and your treatment options.
                </p>
                <a
                  href={CLINIC.phoneHref}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur transition hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" /> {CLINIC.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── treatment options ── */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-jade-700">Treatment</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-900 sm:text-4xl">
              Treatment Options
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600 sm:text-lg">
              Every option below is explained with its benefits, limitations and
              cost implications during your consultation — no surprises, no
              pressure.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.options.map((opt, i) => (
              <Reveal key={opt.title} delay={i * 0.06}>
                <article className="group h-full rounded-3xl border border-border/70 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-jade-200 hover:shadow-lift">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-jade-50 text-base font-extrabold text-jade-700 transition-colors group-hover:bg-jade-600 group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-base font-extrabold leading-snug tracking-tight text-brand-900">
                    {opt.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{opt.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── our approach + aftercare ── */}
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-jade-700">Our Method</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-900">Our Approach</h2>
            <ol className="mt-8 space-y-7">
              {t.approach.map((step, i) => (
                <li key={step.title} className="relative flex gap-5">
                  {i < t.approach.length - 1 && (
                    <span className="absolute left-[1.35rem] top-12 h-[calc(100%-1rem)] w-px bg-jade-200" aria-hidden="true" />
                  )}
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-jade-500 to-brand-800 text-sm font-extrabold text-white shadow-soft">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight text-brand-900">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-jade-700">After Your Treatment</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-900">Recovery &amp; Aftercare</h2>
            <div className="mt-8 space-y-4">
              {t.aftercare.map((a) => (
                <div key={a.title} className="rounded-3xl border border-border/70 bg-white p-6 shadow-soft">
                  <h3 className="text-sm font-extrabold uppercase tracking-[0.1em] text-jade-700">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{a.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── faq + related ── */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-900">
                {t.shortName} — Frequently Asked Questions
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-8">
              <Accordion type="single" collapsible className="space-y-3.5">
                {t.faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`tf-${i}`}
                    className="rounded-2xl border border-border/70 bg-white px-6 shadow-soft data-[state=open]:border-jade-200"
                  >
                    <AccordionTrigger className="py-5 text-left text-base font-bold text-brand-900 hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-[0.95rem] leading-relaxed text-ink-500">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <h3 className="text-lg font-extrabold tracking-tight text-brand-900">Explore Related Care</h3>
            <div className="mt-5 space-y-3.5">
              {others.map((o) => (
                <button
                  key={o.id}
                  onClick={() => nav.navigate({ view: "treatment", treatmentId: o.id })}
                  className="group flex w-full items-center gap-4 rounded-3xl border border-border/70 bg-white p-4 text-left shadow-soft transition hover:border-jade-200 hover:shadow-lift"
                >
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${o.gradient} text-white`}>
                    <o.icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-extrabold text-brand-900">{o.shortName}</span>
                    <span className="mt-0.5 block truncate text-xs font-semibold text-ink-500">{o.tagline}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-jade-300 transition group-hover:translate-x-1 group-hover:text-jade-600" />
                </button>
              ))}
            </div>
            <button
              onClick={() => nav.navigate({ view: "treatments" })}
              className="mt-6 w-full rounded-full border border-jade-200 bg-jade-50/60 px-5 py-3.5 text-sm font-bold text-jade-700 transition hover:bg-jade-50"
            >
              View All Treatments
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── bottom cta ── */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-900 via-brand-800 to-jade-700 px-8 py-14 text-center shadow-lift sm:px-16">
              <div className="relative mx-auto max-w-xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Discuss Your {t.shortName} Care
                </h2>
                <p className="mt-3.5 text-base leading-relaxed text-jade-100/85">
                  Book a consultation with our specialists — a clear diagnosis
                  and an honest plan, tailored to your eyes.
                </p>
                <button
                  onClick={() => nav.navigate({ view: "appointment", prefill: { department: t.id } })}
                  className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-extrabold text-brand-900 shadow-lift transition hover:bg-jade-50"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book Appointment
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
