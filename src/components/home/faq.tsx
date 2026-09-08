"use client";

import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CLINIC, FAQS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import { Reveal, SectionHeading } from "@/components/site/reveal";

export function Faq() {
  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24" aria-labelledby="faq-heading">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Good to Know"
            title={
              <span id="faq-heading">
                Frequently Asked <span className="text-gradient">Questions</span>
              </span>
            }
            description="Clear answers to the questions patients ask most — so you can book with confidence."
          />
          <Reveal delay={0.12}>
            <div className="mt-8 rounded-3xl border border-orchid-200/70 bg-white p-7 shadow-soft">
              <h3 className="text-lg font-extrabold tracking-tight text-plum-900">
                Still have a question?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Our front desk is happy to help you choose the right
                consultation and prepare for your visit.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={CLINIC.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-orchid-600 px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-orchid-700"
                >
                  <Phone className="h-4 w-4" /> Contact Us
                </a>
                <a
                  href={`mailto:${CLINIC.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-orchid-200 bg-white px-5 py-3 text-sm font-bold text-orchid-700 transition hover:bg-orchid-50"
                >
                  <Mail className="h-4 w-4" /> Email Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible className="space-y-3.5">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-border/70 bg-white px-6 shadow-soft transition hover:border-orchid-200 data-[state=open]:border-orchid-200"
              >
                <AccordionTrigger className="py-5 text-left text-base font-bold text-plum-900 hover:no-underline [&[data-state=open]>svg]:rotate-45">
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
    </section>
  );
}

export function Emergency() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="emergency-heading">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-coral-600/20 bg-gradient-to-br from-coral-50 via-white to-coral-50 shadow-soft">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral-600/10 blur-3xl" aria-hidden="true" />
            <div className="relative flex flex-col items-start gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-2xl items-start gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-coral-600 text-white shadow-soft">
                  <AlertTriangle className="h-7 w-7" />
                </span>
                <div>
                  <h2 id="emergency-heading" className="text-2xl font-extrabold tracking-tight text-plum-900 sm:text-3xl">
                    Experiencing an Eye Emergency?
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600 sm:text-base">
                    Sudden vision loss, a serious eye injury, chemical splash or
                    a painful red eye needs <strong>immediate medical
                    attention</strong>. Call us right away — or reach the nearest
                    emergency department without delay.
                  </p>
                </div>
              </div>
              <a
                href={CLINIC.phoneHref}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-coral-600 px-8 py-4 text-base font-extrabold text-white shadow-lift transition hover:bg-coral-600/90"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  const nav = useNav();
  return (
    <section className="pb-16 sm:pb-20" aria-labelledby="cta-heading">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-plum-900 via-plum-800 to-orchid-700 px-8 py-16 text-center shadow-lift sm:px-16 sm:py-20">
            <svg className="pointer-events-none absolute -left-20 -bottom-24 h-96 w-96 opacity-15" viewBox="0 0 200 200" aria-hidden="true">
              {[30, 60, 90].map((r) => (
                <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#C9B1D5" strokeWidth="0.8" strokeDasharray="2 8" />
              ))}
            </svg>
            <div className="relative mx-auto max-w-2xl">
              <h2 id="cta-heading" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to See the World More Clearly?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-orchid-100/85 sm:text-lg">
                Book your comprehensive eye examination today — a few minutes
                with a specialist can protect a lifetime of vision.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => nav.navigate({ view: "appointment" })}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-extrabold text-plum-900 shadow-lift transition hover:bg-orchid-50"
                >
                  Book an Appointment
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href={CLINIC.phoneHref}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <Phone className="h-5 w-5" />
                  {CLINIC.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Stylised location panel with custom map card */
export function Location() {
  return (
    <section id="location" className="scroll-mt-24 bg-mist py-16 sm:py-20 lg:py-24" aria-labelledby="location-heading">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Visit Us"
            title={
              <span id="location-heading">
                Find Your Way to <span className="text-gradient">Shiv Netralay</span>
              </span>
            }
            description="Location, hours, phone and directions — everything you need to plan your visit."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orchid-50 text-orchid-600">
                  <MapPin className="h-5.5 w-5.5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.1em] text-plum-900">Clinic Address</p>
                  {CLINIC.addressLines.map((line) => (
                    <p key={line} className="mt-0.5 text-sm text-ink-500">{line}</p>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orchid-50 text-orchid-600">
                  <Clock className="h-5.5 w-5.5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-extrabold uppercase tracking-[0.1em] text-plum-900">Opening Hours</p>
                  <div className="mt-1.5 space-y-1.5">
                    {CLINIC.hours.map((h) => (
                      <div key={h.days} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="font-semibold text-plum-800">{h.days}</span>
                        <span className="text-ink-500">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-orchid-50 text-orchid-600">
                  <Phone className="h-5.5 w-5.5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.1em] text-plum-900">Contact Us</p>
                  <p className="mt-0.5 text-sm text-ink-500">{CLINIC.phoneDisplay}</p>
                  <p className="text-sm text-ink-500">{CLINIC.email}</p>
                </div>
              </li>
            </ul>
            <a
              href={CLINIC.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-plum-900 px-7 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-plum-800"
            >
              <Navigation className="h-4 w-4 text-orchid-300" />
              Get Directions
            </a>
          </Reveal>
        </div>

        {/* stylised map panel */}
        <Reveal delay={0.12} className="relative">
          <div className="relative h-full min-h-[24rem] overflow-hidden rounded-[2rem] border border-border/70 bg-ivory-50 shadow-soft">
            {/* fake map grid */}
            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
                  <path d="M44 0H0V44" fill="none" stroke="#E4D9EC" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path d="M-20 200 C 120 160, 260 260, 420 180" stroke="#D5C2E0" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.8" />
              <path d="M60 -20 C 110 90, 240 120, 420 90" stroke="#D5C2E0" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.8" />
              <path d="M-20 320 C 160 300, 300 380, 480 320" stroke="#EAE1F1" strokeWidth="8" fill="none" strokeLinecap="round" />
            </svg>
            {/* pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="pin-pulse relative grid h-14 w-14 place-items-center rounded-full bg-orchid-600 text-white shadow-lift">
                <MapPin className="h-7 w-7" />
              </div>
              <div className="mt-3 whitespace-nowrap rounded-xl border border-border/60 bg-white px-4 py-2.5 text-center shadow-lift">
                <p className="text-sm font-extrabold text-plum-900">Shiv Netralay</p>
                <p className="text-xs font-semibold text-ink-500">Eye Care Clinic</p>
              </div>
            </div>
            {/* corner note */}
            <div className="absolute bottom-4 right-4 rounded-full border border-border/60 bg-white/90 px-4 py-2 text-xs font-bold text-ink-500 shadow-soft backdrop-blur">
              Interactive Google Map will be embedded here
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
