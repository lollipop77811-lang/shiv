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
    { label: "About Us", action: () => nav.goHomeSection("about") },
    { label: "Our Doctors", action: () => nav.goHomeSection("doctors") },
    { label: "Treatments", action: () => nav.navigate({ view: "treatments" }) },
    { label: "Facilities & Technology", action: () => nav.goHomeSection("technology") },
    { label: "Contact", action: () => nav.goHomeSection("location") },
  ];

  const resources = [
    { label: "Book an Appointment", action: () => nav.navigate({ view: "appointment" }) },
    { label: "Eye Care Insights", action: () => nav.goHomeSection("resources") },
    { label: "Patient Journey", action: () => nav.goHomeSection("top") },
    { label: "FAQs", action: () => nav.goHomeSection("resources") },
    { label: "Emergency Eye Care", action: () => nav.goHomeSection("location") },
    { label: "Privacy Policy", action: () => nav.goHomeSection("top") },
  ];

  return (
    <footer className="bg-plum-950 pb-24 pt-16 text-orchid-100/80 lg:pb-0">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          {/* brand */}
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Comprehensive eye care with experienced specialists, modern
              diagnostic technology and a patient-first approach — advanced
              ophthalmology for a clearer tomorrow.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href={CLINIC.phoneHref} className="flex items-center gap-3 transition hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-orchid-400" /> {CLINIC.phoneDisplay}
              </a>
              <a href={`mailto:${CLINIC.email}`} className="flex items-center gap-3 transition hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-orchid-400" /> {CLINIC.email}
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orchid-400" />
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
            <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">Quick Links</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <button onClick={l.action} className="group inline-flex items-center gap-1.5 transition hover:text-white">
                    <span className="h-px w-3 bg-orchid-500/60 transition-all group-hover:w-5 group-hover:bg-orchid-300" aria-hidden="true" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* treatments */}
          <nav aria-label="Treatments">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">Treatments</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {TREATMENTS.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => nav.navigate({ view: "treatment", treatmentId: t.id })}
                    className="group inline-flex items-center gap-1.5 transition hover:text-white"
                  >
                    <span className="h-px w-3 bg-orchid-500/60 transition-all group-hover:w-5 group-hover:bg-orchid-300" aria-hidden="true" />
                    {t.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* resources */}
          <nav aria-label="Patient resources">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">Patient Resources</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {resources.map((l) => (
                <li key={l.label}>
                  <button onClick={l.action} className="group inline-flex items-center gap-1.5 transition hover:text-white">
                    <span className="h-px w-3 bg-orchid-500/60 transition-all group-hover:w-5 group-hover:bg-orchid-300" aria-hidden="true" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-xs font-medium text-orchid-100/60 sm:flex-row">
          <p>© {year} {CLINIC.name} — {CLINIC.tagline}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Prototype for client review · Images &amp; content are placeholders pending clinic confirmation.
          </p>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="container-x group mb-8 flex items-center gap-1 text-xs font-bold text-orchid-300 transition hover:text-white"
      >
        Back to top <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
}
