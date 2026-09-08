"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Stethoscope } from "lucide-react";
import { SYMPTOMS, TREATMENTS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import {
  Reveal,
  SectionHeading,
  StaggerGrid,
  StaggerItem,
} from "@/components/site/reveal";

export function Services() {
  const nav = useNav();
  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24" aria-labelledby="services-heading">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Our Services"
            title={
              <span id="services-heading">
                Comprehensive Eye Care <span className="text-gradient">Under One Roof</span>
              </span>
            }
            description="From routine examinations to advanced surgical care — every service follows the same standard of detailed diagnosis and honest counselling."
          />
          <Reveal delay={0.1} className="shrink-0">
            <button
              onClick={() => nav.navigate({ view: "treatments" })}
              className="group inline-flex items-center gap-2 rounded-full border border-jade-200 bg-white px-6 py-3.5 text-sm font-bold text-brand-900 shadow-soft transition hover:border-jade-300 hover:bg-jade-50"
            >
              View All Treatments
              <ArrowRight className="h-4 w-4 text-jade-600 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>

        <StaggerGrid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TREATMENTS.map((t) => (
            <StaggerItem key={t.id}>
              <button
                onClick={() => nav.navigate({ view: "treatment", treatmentId: t.id })}
                className="group flex h-full w-full flex-col rounded-3xl border border-border/70 bg-white p-6 text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-jade-200 hover:shadow-lift"
                aria-label={`Learn about ${t.name}`}
              >
                <span
                  className={`relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                >
                  <t.icon className="h-7 w-7" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-brand-900">
                  {t.shortName}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                  {t.cardDescription}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-jade-700">
                  Explore
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

export function FindCare() {
  const nav = useNav();
  const [tab, setTab] = useState<"symptoms" | "treatments">("symptoms");

  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="findcare-heading">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-900 via-brand-800 to-jade-800 shadow-lift">
          {/* decorative rings */}
          <svg
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 opacity-20"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            {[40, 70, 100].map((r) => (
              <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#7CC5B2" strokeWidth="0.8" strokeDasharray="2 8" />
            ))}
          </svg>
          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-jade-200">
                Find the Right Eye Care
              </span>
              <h2
                id="findcare-heading"
                className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                What are you looking for?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-jade-100/85">
                You don&apos;t need to know the medical terms — tell us what you
                are experiencing, or simply browse by treatment.
              </p>
            </div>

            {/* tabs */}
            <div className="mt-8 inline-flex rounded-full border border-white/15 bg-white/10 p-1.5" role="tablist" aria-label="Browse mode">
              {(
                [
                  { id: "symptoms", label: "I have a vision problem" },
                  { id: "treatments", label: "Explore by treatment" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                    tab === t.id
                      ? "bg-white text-brand-900 shadow-soft"
                      : "text-jade-100 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* chips */}
            <div className="mt-7 flex flex-wrap gap-3" role="tabpanel">
              {tab === "symptoms"
                ? SYMPTOMS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => nav.navigate({ view: "treatment", treatmentId: s.treatmentId })}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-jade-50 transition hover:border-jade-300/50 hover:bg-white/15"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-jade-300 transition group-hover:bg-white" />
                      {s.label}
                    </button>
                  ))
                : TREATMENTS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => nav.navigate({ view: "treatment", treatmentId: t.id })}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-jade-50 transition hover:border-jade-300/50 hover:bg-white/15"
                    >
                      <t.icon className="h-4.5 w-4.5 text-jade-300 transition group-hover:text-white" />
                      {t.shortName}
                    </button>
                  ))}
            </div>

            <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-jade-200/80">
              <Stethoscope className="h-4 w-4" />
              Not sure? Start with a Comprehensive Eye Exam — we will guide you from there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
