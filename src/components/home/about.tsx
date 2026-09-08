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
    <section id="about" className="scroll-mt-24 bg-mist py-16 sm:py-20 lg:py-24" aria-labelledby="about-heading">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* image composition */}
        <Reveal className="relative">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.5rem] border border-jade-200/60" aria-hidden="true" />
            <div className="overflow-hidden rounded-[2.25rem] shadow-lift">
              <img
                src="/images/clinic-interior.png"
                alt="Modern reception area of Shiv Netralay eye clinic"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* stat card */}
            <div className="float-slow absolute -bottom-6 -right-3 rounded-3xl border border-border/60 bg-white p-5 shadow-lift sm:-right-6">
              <p className="text-3xl font-extrabold text-gradient">10,000+</p>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.12em] text-ink-500">
                Eyes cared for
              </p>
            </div>
            <div className="absolute -left-4 top-6 hidden items-center gap-2 rounded-full border border-border/60 bg-white/90 px-4 py-2.5 shadow-soft backdrop-blur sm:flex">
              <MapPin className="h-4 w-4 text-jade-600" />
              <span className="text-xs font-bold text-brand-900">Your City — easy to reach</span>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Shiv Netralay"
            title={
              <span id="about-heading">
                Dedicated to <span className="text-gradient">Better Vision</span>
              </span>
            }
          />
          <Reveal delay={0.1}>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-600 sm:text-lg">
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
                <li key={point} className="flex items-center gap-2.5 text-sm font-semibold text-brand-800">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-jade-600" />
                  {point}
                </li>
              ))}
            </ul>
            <button
              onClick={() => nav.navigate({ view: "treatments" })}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand-900 px-7 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand-800"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4 text-jade-300 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function DoctorsSection() {
  const nav = useNav();
  return (
    <section id="doctors" className="scroll-mt-24 bg-jade-50 py-16 sm:py-20 lg:py-24" aria-labelledby="doctors-heading">
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

        <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DOCTORS.map((d, i) => (
            <StaggerItem key={d.id}>
              <article
                className={`group flex h-full flex-col overflow-hidden rounded-3xl glass-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${
                  i % 2 === 1 ? "lg:mt-10" : ""
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={d.image}
                    alt={`Portrait of ${d.name}, ${d.role}`}
                    className="aspect-[4/4.1] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-jade-700 shadow-soft backdrop-blur">
                    {d.experience}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold tracking-tight text-brand-900">{d.name}</h3>
                  <p className="mt-0.5 text-sm font-semibold text-jade-700">{d.specialization}</p>
                  <p className="mt-2 text-xs font-semibold leading-relaxed text-ink-500">{d.qualification}</p>
                  <div className="mt-4 flex flex-1 flex-col justify-end gap-2.5">
                    <button
                      onClick={() => nav.navigate({ view: "doctor", doctorId: d.id })}
                      className="w-full rounded-full border border-jade-200 bg-jade-50/60 px-4 py-2.5 text-sm font-bold text-jade-700 transition hover:border-jade-300 hover:bg-jade-50"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() =>
                        nav.navigate({ view: "appointment", prefill: { doctorId: d.id, department: d.departments[0] } })
                      }
                      className="w-full rounded-full bg-brand-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
