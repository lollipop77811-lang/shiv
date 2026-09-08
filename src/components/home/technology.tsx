"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JOURNEY, TECHNOLOGY } from "@/lib/site-data";
import {
  Reveal,
  SectionHeading,
  StaggerGrid,
  StaggerItem,
} from "@/components/site/reveal";
import {
  CalendarCheck,
  ClipboardList,
  HeartPulse,
  UserRound,
  type LucideIcon,
} from "lucide-react";

const STEP_ICONS: Record<string, LucideIcon> = {
  calendar: CalendarCheck,
  doctor: UserRound,
  scan: ClipboardList,
  heart: HeartPulse,
};

/** Horizontal scrolling technology cards with arrow controls */
export function Technology() {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    updateArrows();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 420), behavior: "smooth" });
  };

  return (
    <section id="technology" className="relative overflow-hidden scroll-mt-24 bg-brand-950 py-16 sm:py-20 lg:py-24" aria-labelledby="tech-heading">
      {/* cyan/mint glow + slow optical rings */}
      <div className="pointer-events-none absolute -left-32 top-4 h-[26rem] w-[26rem] rounded-full bg-jade-500/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
      <svg
        className="ring-spin pointer-events-none absolute -right-44 -top-44 h-[34rem] w-[34rem] text-jade-400 opacity-20"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        {[35, 62, 89].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 7" />
        ))}
      </svg>
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-jade-700/60 bg-jade-900/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-jade-300">
                Facilities & Technology
              </span>
              <h2 id="tech-heading" className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Technology That Supports{" "}
                <span className="text-gradient">Better Eye Care</span>
              </h2>
              <p className="text-base leading-relaxed text-jade-100/75 sm:text-lg">
                Precise diagnosis is the first act of good treatment. Our
                diagnostic suite is designed to measure carefully and explain
                clearly.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition enabled:hover:bg-white/15 disabled:opacity-30"
              aria-label="Scroll technology list left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition enabled:hover:bg-white/15 disabled:opacity-30"
              aria-label="Scroll technology list right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            ref={scroller}
            className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            role="list"
            aria-label="Technology and facilities"
          >
            {TECHNOLOGY.map((t) => (
              <article
                key={t.name}
                role="listitem"
                className="group w-[19rem] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-gold-400/50 hover:shadow-[0_0_44px_rgba(247,213,84,0.16)] sm:w-[21.5rem]"
              >
                <div className="relative h-52 overflow-hidden bg-jade-50">
                  <img
                    src={t.image}
                    alt={t.subtitle}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-jade-300">
                    {t.name}
                  </p>
                  <h3 className="mt-1.5 text-lg font-extrabold tracking-tight text-white">
                    {t.subtitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-jade-100/70">
                    {t.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {/* dots indicator */}
        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-8 bg-jade-400" : "w-1.5 bg-white/20"}`} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs font-medium text-jade-100/50">
          Representative facility previews — final equipment list will be confirmed with the clinic.
        </p>
      </div>
    </section>
  );
}

export function Journey() {
  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="journey-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="What to Expect"
          title={
            <span id="journey-heading">
              Your Eye Care <span className="text-gradient">Journey</span>
            </span>
          }
          description="Four simple steps from first contact to a clear, personalised treatment plan."
        />

        <div className="relative mt-14">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-9 hidden lg:block" aria-hidden="true">
            <div className="mx-auto h-px w-[72%] bg-gradient-to-r from-transparent via-jade-300 to-transparent" />
          </div>
          <StaggerGrid className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {JOURNEY.map((step) => {
              const Icon = STEP_ICONS[step.icon];
              return (
                <StaggerItem key={step.step} className="relative text-center">
                  <div className="relative mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-3xl border border-jade-200 bg-white shadow-soft">
                    <Icon className="h-8 w-8 text-jade-600" strokeWidth={1.7} />
                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-jade-500 to-brand-800 text-[0.65rem] font-extrabold text-white shadow-soft">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight text-brand-900">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-ink-500">
                    {step.description}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </div>
    </section>
  );
}
