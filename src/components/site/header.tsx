"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, ChevronRight, Menu, Phone, X } from "lucide-react";
import { CLINIC } from "@/lib/site-data";
import { useNav } from "@/lib/nav";

export function Logo({ light = false }: { light?: boolean }) {
  const nav = useNav();
  return (
    <button
      onClick={() => nav.navigate({ view: "home" })}
      className="flex shrink-0 items-center gap-3 text-left"
      aria-label="Shiv Netralay — Home"
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-jade-500 to-brand-900 shadow-soft">
        <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
          <path
            d="M24 14c-6.6 0-11.4 4.6-13.7 8.2a3.5 3.5 0 0 0 0 3.6C12.6 29.4 17.4 34 24 34s11.4-4.6 13.7-8.2a3.5 3.5 0 0 0 0-3.6C35.4 18.6 30.6 14 24 14Z"
            fill="none"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="24" r="5" fill="#fff" />
          <circle cx="24" cy="24" r="2.1" fill="#1A1D4E" />
          <circle cx="26.2" cy="21.8" r="0.9" fill="#fff" />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={`block whitespace-nowrap text-lg font-extrabold tracking-tight ${
            light ? "text-white" : "text-brand-900"
          }`}
        >
          Shiv Netralay
        </span>
        <span
          className={`block whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.22em] ${
            light ? "text-jade-200" : "text-jade-600"
          }`}
        >
          {CLINIC.tagline}
        </span>
      </span>
    </button>
  );
}

const NAV_LINKS: { label: string; anchor?: string; view?: "treatments" }[] = [
  { label: "Home", anchor: "top" },
  { label: "About Us", anchor: "about" },
  { label: "Treatments", view: "treatments" },
  { label: "Doctors", anchor: "doctors" },
  { label: "Facilities", anchor: "technology" },
  { label: "Patient Resources", anchor: "resources" },
  { label: "Contact", anchor: "location" },
];

export function Header() {
  const nav = useNav();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLink = (link: (typeof NAV_LINKS)[number]) => {
    setOpen(false);
    if (link.view) {
      nav.navigate({ view: link.view });
    } else if (link.anchor) {
      nav.goHomeSection(link.anchor);
    }
  };

  return (
    <>
      {/* ── utility strip ─────────────────────────────────── */}
      <div className="hidden bg-brand-900 text-white lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs font-medium text-jade-100/85">
          <p>Mon – Sat · 9:00 AM – 7:00 PM · Comprehensive eye care for the whole family</p>
          <div className="flex items-center gap-5">
            <a href={CLINIC.phoneHref} className="inline-flex items-center gap-1.5 transition hover:text-gold-400">
              <Phone className="h-3.5 w-3.5 text-gold-400" /> {CLINIC.phoneDisplay}
            </a>
            <button
              onClick={() => nav.goHomeSection("location")}
              className="inline-flex items-center gap-1.5 transition hover:text-gold-400"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Clinic Location
            </button>
          </div>
        </div>
      </div>

      {/* ── main header ───────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-soft" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-3">
          <Logo />

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active =
                link.view === "treatments" &&
                (nav.route.view === "treatments" || nav.route.view === "treatment");
              return (
                <button
                  key={link.label}
                  onClick={() => handleLink(link)}
                  className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[0.84rem] font-semibold transition ${
                    active
                      ? "bg-jade-50 text-jade-700"
                      : "text-ink-600 hover:bg-jade-50 hover:text-brand-900"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={CLINIC.phoneHref}
              className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-jade-200 bg-jade-50/60 px-4 py-2.5 text-sm font-bold text-jade-700 transition hover:border-jade-300 hover:bg-jade-50 sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">Call Now</span>
              <span className="md:hidden">Call</span>
            </a>
            <button
              onClick={() => nav.navigate({ view: "appointment" })}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gold-500 px-4 py-2.5 text-sm font-bold text-brand-900 shadow-soft transition hover:bg-gold-600 hover:shadow-lift md:px-5"
            >
              <CalendarCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
            </button>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-brand-900 transition hover:bg-jade-50 xl:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── mobile drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-brand-950/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-full w-[85%] max-w-sm flex-col bg-white shadow-lift"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              aria-label="Menu"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-jade-50 text-brand-900"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleLink(link)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base font-semibold text-brand-900 transition hover:bg-jade-50"
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 text-ink-400" />
                  </button>
                ))}
              </nav>
              <div className="space-y-3 border-t border-border p-5">
                <a
                  href={CLINIC.phoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-jade-200 bg-jade-50 px-4 py-3 text-sm font-bold text-jade-700"
                >
                  <Phone className="h-4 w-4" /> Call {CLINIC.phoneDisplay}
                </a>
                <button
                  onClick={() => {
                    setOpen(false);
                    nav.navigate({ view: "appointment" });
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-4 py-3 text-sm font-bold text-brand-900 shadow-soft"
                >
                  <CalendarCheck className="h-4 w-4" /> Book Appointment
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
