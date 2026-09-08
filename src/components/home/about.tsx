"use client";

import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { DOCTORS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import {
  Reveal,
  SectionHeading,
  StaggerGrid,
  StaggerItem,
} from "@/components/site/reveal";

export function About() {
  const nav = useNav();
  return (
    <section id="about" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="about-heading">
      <div className="container-x">
        {/* steel-blue feature card — signature About band */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-jade-400 via-jade-500 to-jade-700 shadow-lift sm:rounded-[2.5rem]">
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:p-16">
            {/* copy */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                About Shiv Netralay
              </span>
              <h2 id="about-heading" className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Dedicated to <span className="text-gold-400">Better Vision</span>
              </h2>
              <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-white/85">
                <p>
                  Shiv Netralay was founded on a simple belief — that advanced eye
                  care should feel personal, honest and calm. Every consultation
                  here begins with listening, and every treatment plan is built
                  around the patient in front of us, not a template.
                </p>
                <p>
                  Our clinic brings together experienced ophthalmologists, modern
                  diagnostic technology and structured follow-up care, so that
                  conditions from a simple refractive error to complex cataract
                  are managed under one roof with complete transparency.
                </p>
              </div>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Experienced, specialised doctors",
                  "Modern diagnostic facilities",
                  "Patient-first approach",
                  "Clear, honest counselling",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm font-semibold text-white">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-500 text-brand-900">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => nav.navigate({ view: "treatments" })}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-brand-900 shadow-lift transition hover:bg-gold-400"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* image composition */}
            <Reveal className="relative">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2.25rem] border border-white/25" aria-hidden="true" />
                <div className="overflow-hidden rounded-[1.75rem] shadow-lift">
                  <img
                    src="/images/clinic-interior.png"
                    alt="Modern reception area of Shiv Netralay eye clinic"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* stat card */}
                <div className="float-slow absolute -bottom-6 -right-3 rounded-3xl border border-white/60 bg-white p-5 shadow-lift sm:-right-6">
                  <p className="text-3xl font-extrabold text-gradient">10,000+</p>
                  <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.12em] text-ink-500">
                    Eyes cared for
                  </p>
                </div>
                <div className="absolute -left-4 top-6 hidden items-center gap-2 rounded-full border border-white/50 bg-white/90 px-4 py-2.5 shadow-soft backdrop-blur sm:flex">
                  <MapPin className="h-4 w-4 text-jade-700" />
                  <span className="text-xs font-bold text-brand-900">Your City — easy to reach</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DoctorsSection() {
  const nav = useNav();
  return (
    <section id="doctors" className="scroll-mt-24 bg-cream py-16 sm:py-20 lg:py-24" aria-labelledby="doctors-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Team"
          title={
            <span id="doctors-heading">
              Meet Our <span className="text-gradient">Eye Care Specialists</span>
            </span>
          }
          description="Qualified ophthalmologists with subspecialty expertise — unhurried consultations and treatment plans you can trust."
        />

        {/* flat expert grid — square portraits on cream, like the reference */}
        <StaggerGrid className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((d) => (
            <StaggerItem key={d.id}>
              <article className="group flex h-full flex-col items-center text-center">
                <div className="relative w-full overflow-hidden rounded-2xl bg-jade-100 shadow-soft transition-shadow duration-300 group-hover:shadow-lift">
                  <img
                    src={d.image}
                    alt={`Portrait of ${d.name}, ${d.role}`}
                    className="aspect-square w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-jade-700 shadow-soft backdrop-blur">
                    {d.experience}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-brand-900">{d.name}</h3>
                <p className="mt-0.5 text-sm font-semibold text-jade-700">{d.specialization}</p>
                <p className="mt-1 text-xs font-semibold leading-relaxed text-ink-500">{d.qualification}</p>
                <div className="mt-4 flex w-full flex-col gap-2">
                  <button
                    onClick={() => nav.navigate({ view: "doctor", doctorId: d.id })}
                    className="w-full rounded-full border border-jade-200 bg-white/70 px-4 py-2.5 text-sm font-bold text-jade-700 transition hover:border-jade-300 hover:bg-white"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() =>
                      nav.navigate({ view: "appointment", prefill: { doctorId: d.id, department: d.departments[0] } })
                    }
                    className="w-full rounded-full bg-gold-500 px-4 py-2.5 text-sm font-bold text-brand-900 transition hover:bg-gold-400"
                  >
                    Book Appointment
                  </button>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
