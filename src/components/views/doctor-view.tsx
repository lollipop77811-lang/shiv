"use client";

import { motion } from "framer-motion";
import {
  Award,
  CalendarCheck,
  ChevronRight,
  Clock,
  GraduationCap,
  Languages,
  Phone,
  Quote,
  Star,
  Stethoscope,
} from "lucide-react";
import { CLINIC, getDoctor } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import { Reveal } from "@/components/site/reveal";

export function DoctorView({ id }: { id?: string }) {
  const nav = useNav();
  const d = getDoctor(id);

  return (
    <>
      {/* ── profile hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-jade-800 py-14 sm:py-18">
        <svg className="pointer-events-none absolute -left-24 -bottom-28 h-[26rem] w-[26rem] opacity-15" viewBox="0 0 200 200" aria-hidden="true">
          {[30, 60, 90].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#FDE174" strokeWidth="0.8" strokeDasharray="2 8" />
          ))}
        </svg>
        <div className="container-x relative">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-jade-300"
            aria-label="Breadcrumb"
          >
            <button onClick={() => nav.navigate({ view: "home" })} className="transition hover:text-white">Home</button>
            <ChevronRight className="h-3.5 w-3.5" />
            <button onClick={() => nav.navigate({ view: "doctors" })} className="transition hover:text-white">Doctors</button>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{d.name}</span>
          </motion.nav>

          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            {/* photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="absolute -inset-3 rounded-[2.5rem] border border-white/15" aria-hidden="true" />
              <div className="overflow-hidden rounded-[2.25rem] shadow-lift">
                <img
                  src={d.image}
                  alt={`Portrait of ${d.name}`}
                  className="aspect-[4/4.3] w-full object-cover object-top"
                />
              </div>
              <div className="glass absolute -bottom-5 left-1/2 flex w-max -translate-x-1/2 items-center gap-2.5 rounded-2xl px-5 py-3 shadow-lift">
                <Star className="h-4.5 w-4.5 fill-gold-500 text-gold-500" />
                <span className="text-sm font-extrabold text-brand-900">{d.experience}</span>
              </div>
            </motion.div>

            {/* info */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-jade-200 backdrop-blur">
                <Stethoscope className="h-3.5 w-3.5" />
                {d.specialization}
              </span>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {d.name}
              </h1>
              <p className="mt-2 text-lg font-semibold text-jade-200">{d.role}</p>
              <p className="mt-3 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur">
                <GraduationCap className="h-4.5 w-4.5 text-jade-300" />
                {d.qualification}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => nav.navigate({ view: "appointment", prefill: { doctorId: d.id, department: d.departments[0] } })}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-base font-extrabold text-brand-900 shadow-lift transition hover:bg-jade-50"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book Appointment
                </button>
                <a
                  href={CLINIC.phoneHref}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <Phone className="h-5 w-5" />
                  Call Clinic
                </a>
              </div>

              {/* quick stats */}
              <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
                {[
                  { value: `${d.experienceYears}+`, label: "Years Experience" },
                  { value: d.languages.length.toString(), label: "Languages" },
                  { value: d.expertise.length.toString(), label: "Focus Areas" },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
                    <p className="text-2xl font-extrabold text-white">{s.value}</p>
                    <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-jade-200">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── body ── */}
      <section className="bg-mist py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* left column */}
          <div className="space-y-10">
            <Reveal>
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">About {d.name.split(" ").slice(0, 2).join(" ")}</h2>
              <div className="mt-4 space-y-4">
                {d.bio.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-ink-600">{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Areas of Expertise</h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {d.expertise.map((e) => (
                  <span key={e} className="rounded-full border border-jade-200 bg-jade-50 px-4 py-2.5 text-sm font-bold text-jade-700">
                    {e}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Treatments Performed</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {d.treatments.map((tr) => (
                  <div key={tr} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-white px-5 py-4 shadow-soft">
                    <Award className="h-5 w-5 shrink-0 text-jade-600" />
                    <span className="text-sm font-bold text-brand-800">{tr}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-900">Patient Feedback</h2>
              <div className="mt-4 space-y-4">
                {d.reviews.map((r) => (
                  <figure key={r.name} className="relative rounded-3xl border border-border/70 bg-white p-6 pl-8 shadow-soft">
                    <Quote className="absolute left-3 top-6 h-4 w-4 rotate-180 text-jade-300" aria-hidden="true" />
                    <div className="flex gap-0.5 text-gold-500" aria-label={`${r.rating} stars`}>
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <blockquote className="mt-2.5 text-sm leading-relaxed text-ink-600">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-900">
                      — {r.name}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>

          {/* right column */}
          <div className="space-y-6">
            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-border/70 bg-white p-7 shadow-soft sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-jade-50 text-jade-600">
                    <Clock className="h-5.5 w-5.5" />
                  </span>
                  <h2 className="text-lg font-extrabold tracking-tight text-brand-900">Consultation Schedule</h2>
                </div>
                <div className="mt-5 space-y-3">
                  {d.timings.map((t) => (
                    <div key={t.days} className="rounded-2xl bg-mist px-5 py-3.5">
                      <p className="text-sm font-extrabold text-brand-900">{t.days}</p>
                      <p className="mt-0.5 text-sm font-semibold text-jade-700">{t.time}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => nav.navigate({ view: "appointment", prefill: { doctorId: d.id, department: d.departments[0] } })}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3.5 text-sm font-bold text-brand-900 shadow-soft transition hover:bg-gold-400"
                >
                  <CalendarCheck className="h-4.5 w-4.5" />
                  Book with {d.name.split(" ").slice(0, 2).join(" ")}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-3xl border border-border/70 bg-white p-7 shadow-soft sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-jade-50 text-jade-600">
                    <Languages className="h-5.5 w-5.5" />
                  </span>
                  <h2 className="text-lg font-extrabold tracking-tight text-brand-900">Languages</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {d.languages.map((l) => (
                    <span key={l} className="rounded-full bg-mist px-4 py-2 text-sm font-bold text-brand-800">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-3xl bg-gradient-to-br from-brand-900 to-jade-800 p-7 text-white shadow-lift sm:p-8">
                <GraduationCap className="h-8 w-8 text-jade-300" />
                <h2 className="mt-4 text-lg font-extrabold tracking-tight">Qualifications</h2>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-jade-100/85">{d.qualification}</p>
                <p className="mt-4 text-xs leading-relaxed text-jade-100/60">
                  Sample profile content for the prototype — final credentials,
                  registration numbers and biography will be provided by the clinic.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
