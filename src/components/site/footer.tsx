"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { CLINIC, TREATMENTS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import { Logo } from "@/components/site/header";

export function Footer() {
  const nav = useNav();
  const year = 2026;

  const quickLinks = [
    { label: "Home", action: () => nav.navigate({ view: "home" }) },
    { label: "About Us", action: () => nav.navigate({ view: "about" }) },
    { label: "Our Doctors", action: () => nav.navigate({ view: "doctors" }) },
    { label: "Treatments", action: () => nav.navigate({ view: "treatments" }) },
    { label: "Facilities & Technology", action: () => nav.navigate({ view: "facilities" }) },
    { label: "Contact", action: () => nav.navigate({ view: "contact" }) },
  ];

  const resources = [
    { label: "Book an Appointment", action: () => nav.navigate({ view: "appointment" }) },
    { label: "Eye Care Insights", action: () => nav.navigate({ view: "resources" }) },
    { label: "Patient Journey", action: () => nav.navigate({ view: "about" }) },
    { label: "FAQs", action: () => nav.navigate({ view: "resources" }) },
    { label: "Emergency Eye Care", action: () => nav.navigate({ view: "contact" }) },
    { label: "Privacy Policy", action: () => nav.navigate({ view: "contact" }) },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-cream via-gold-50 to-gold-400/70 pb-24 pt-14 lg:pb-10">
      {/* white footer card — signature closing block */}
      <div className="container-x">
        <div className="rounded-[2rem] bg-white p-8 shadow-lift sm:p-12">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
            {/* brand */}
            <div>
              <Logo />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-500">
                Comprehensive eye care with experienced specialists, modern
                diagnostic technology and a patient-first approach — advanced
                ophthalmology for a clearer tomorrow.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <a href={CLINIC.phoneHref} className="flex items-center gap-3 transition hover:text-jade-700">
                  <Phone className="h-4 w-4 shrink-0 text-gold-600" /> {CLINIC.phoneDisplay}
                </a>
                <a href={`mailto:${CLINIC.email}`} className="flex items-center gap-3 transition hover:text-jade-700">
                  <Mail className="h-4 w-4 shrink-0 text-gold-600" /> {CLINIC.email}
                </a>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  <span>
                    {CLINIC.addressLines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </span>
                </p>
              </div>
            </div>

            {/* quick links */}
            <nav aria-label="Quick links">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-900">Quick Links</h3>
              <ul className="mt-5 space-y-2.5 text-sm">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <button onClick={l.action} className="group inline-flex items-center gap-1.5 text-ink-500 transition hover:text-brand-900">
                      <span className="h-px w-3 bg-gold-500/70 transition-all group-hover:w-5 group-hover:bg-gold-500" aria-hidden="true" />
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* treatments */}
            <nav aria-label="Treatments">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-900">Treatments</h3>
              <ul className="mt-5 space-y-2.5 text-sm">
                {TREATMENTS.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => nav.navigate({ view: "treatment", treatmentId: t.id })}
                      className="group inline-flex items-center gap-1.5 text-ink-500 transition hover:text-brand-900"
                    >
                      <span className="h-px w-3 bg-gold-500/70 transition-all group-hover:w-5 group-hover:bg-gold-500" aria-hidden="true" />
                      {t.shortName}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* resources */}
            <nav aria-label="Patient resources">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-brand-900">Patient Resources</h3>
              <ul className="mt-5 space-y-2.5 text-sm">
                {resources.map((l) => (
                  <li key={l.label}>
                    <button onClick={l.action} className="group inline-flex items-center gap-1.5 text-ink-500 transition hover:text-brand-900">
                      <span className="h-px w-3 bg-gold-500/70 transition-all group-hover:w-5 group-hover:bg-gold-500" aria-hidden="true" />
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border py-7 text-xs font-medium text-ink-400 sm:flex-row">
            <p>© {year} {CLINIC.name} — {CLINIC.tagline}. All rights reserved.</p>
            <p className="text-center sm:text-right">
              Prototype for client review · Images &amp; content are placeholders pending clinic confirmation.
            </p>
          </div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group mx-auto mt-8 flex items-center gap-1 text-xs font-bold text-brand-900 transition hover:text-jade-700"
        >
          Back to top <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
