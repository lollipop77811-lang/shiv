"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Aperture,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Focus,
  Glasses,
  RotateCcw,
  ScanEye,
  ZoomIn,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNav } from "@/lib/nav";

/** Slow-rotating concentric iris — pure SVG, very subtle (light-on-blue) */
function IrisVisual({ className }: { className?: string }) {
  // Rounded to 2dp so SSR (JSC) and client (V8) Math.cos/sin agree exactly
  const r2 = (v: number) => Math.round(v * 100) / 100;
  const spokes = Array.from({ length: 48 }, (_, i) => ({
    x: r2(240 * Math.cos((i * Math.PI * 2) / 48)),
    y: r2(240 * Math.sin((i * Math.PI * 2) / 48)),
    w: i % 4 === 0 ? 1.6 : 0.7,
  }));
  const ticks = Array.from({ length: 96 }, (_, i) => {
    const rad = 150 + (i % 3) * 42;
    return {
      cx: r2(rad * Math.cos((i * Math.PI * 2) / 96)),
      cy: r2(rad * Math.sin((i * Math.PI * 2) / 96)),
      r: i % 6 === 0 ? 2.4 : 1.2,
    };
  });
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="irisG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE174" stopOpacity="0.30" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="78%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="irisSheen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="290" fill="url(#irisG)" />
      <ellipse cx="232" cy="200" rx="180" ry="128" fill="url(#irisSheen)" opacity="0.3" transform="rotate(-16 232 200)" />
      <g className="iris-spin" style={{ transformOrigin: "300px 300px" }}>
        {spokes.map((s, i) => (
          <line
            key={i}
            x1="300"
            y1="300"
            x2={r2(300 + s.x)}
            y2={r2(300 + s.y)}
            stroke="#FFFFFF"
            strokeOpacity="0.12"
            strokeWidth={s.w}
          />
        ))}
        {ticks.map((t, i) => (
          <circle key={i} cx={r2(300 + t.cx)} cy={r2(300 + t.cy)} r={t.r} fill="#FDE174" fillOpacity="0.4" />
        ))}
        <circle cx="300" cy="300" r="120" fill="none" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.4" />
        <circle cx="300" cy="300" r="200" fill="none" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.2" strokeDasharray="3 10" />
      </g>
      <g className="iris-spin-rev" style={{ transformOrigin: "300px 300px" }}>
        <circle cx="300" cy="300" r="260" fill="none" stroke="#FDE174" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="1 14" />
        <circle cx="300" cy="300" r="82" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/** Interactive "Lens & Vision" demo — the site stays blurred (no timeout) until
 *  a lens is picked; that lens first shows the condition's UNCORRECTED view for
 *  4 seconds, then corrects it to a sharp finish. */
const SIMULATION_MS = 4000;

type VisionPhase = "unselected" | "simulating" | "corrected";

type LensId = (typeof LENSES)[number]["id"];

const LENSES = [
  {
    id: "myopia",
    label: "Myopia",
    icon: Focus,
    simNote: "Eye too long — light focuses early. Distance blurs, near stays clear.",
    correctedNote: "Distance snaps into sharp focus with the correcting lens.",
  },
  {
    id: "hyperopia",
    label: "Hyperopia",
    icon: ZoomIn,
    simNote: "Eye too short — light focuses behind the retina. Near blurs, distance stays clear.",
    correctedNote: "Near focus settles in — the strain lifts away.",
  },
  {
    id: "astigmatism",
    label: "Astigmatism",
    icon: Aperture,
    simNote: "Uneven cornea bends light askew — edges stretch, double and streak.",
    correctedNote: "Streaks dissolve into clean, single edges.",
  },
  {
    id: "presbyopia",
    label: "Presbyopia",
    icon: Glasses,
    simNote: "The stiffening lens drifts out of focus — reading dims up close.",
    correctedNote: "Reading focus locks in, bright and steady.",
  },
] as const;

export function Hero() {
  const nav = useNav();
  const prefersReducedMotion = useReducedMotion();
  const [selectedLens, setSelectedLens] = useState<string | null>(null);
  const [phase, setPhase] = useState<VisionPhase>("unselected");

  // No auto-focus timeout: the site stays blurred until the visitor picks a
  // lens. Picking one first plays that condition's uncorrected view for 4s,
  // then the lens "corrects" it. Reduced-motion users skip straight to the
  // corrected state for accessibility.
  const handleSelectLens = (id: string) => {
    setSelectedLens(id);
    setPhase(prefersReducedMotion ? "corrected" : "simulating");
  };
  const handleResetVision = () => {
    setSelectedLens(null);
    setPhase("unselected");
  };

  // 4s condition simulation → correction. Re-picking a lens mid-simulation
  // restarts the clock for the new condition.
  useEffect(() => {
    if (phase !== "simulating") return;
    const timer = setTimeout(() => setPhase("corrected"), SIMULATION_MS);
    return () => clearTimeout(timer);
  }, [phase, selectedLens]);

  // Veil state machine: generic blur → condition-specific simulation → sharp.
  // The blur is an INLINE style because the CSS minifier strips the standard
  // backdrop-filter property from globals.css (this Chromium ignores the
  // -webkit- alias it leaves behind). Per-lens dissolve timings live here too:
  // myopia snaps back fastest, presbyopia resolves the slowest.
  const veilBlur =
    prefersReducedMotion || phase === "corrected"
      ? "blur(0px) saturate(1)"
      : phase === "simulating"
        ? "blur(15px) saturate(0.8)"
        : "blur(12px) saturate(0.85)";
  const veilClearMs =
    phase === "corrected"
      ? { myopia: 900, hyperopia: 1200, astigmatism: 1300, presbyopia: 1600 }[selectedLens as LensId] ?? 1100
      : 1100;
  const veilClass = prefersReducedMotion
    ? "vision-veil vision-clear"
    : phase === "unselected"
      ? "vision-veil"
      : phase === "simulating"
        ? `vision-veil vision-veil--${selectedLens}`
        : `vision-veil vision-clear vision-clear--${selectedLens}`;

  return (
    /* tight top gap + ~56px desktop gutters + ~28px bottom gap — measured from the reference */
    <section id="top" className="px-4 pb-6 pt-2 sm:px-6 sm:pb-7 lg:px-14">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* viewport-fit card: header strip (36px) + sticky nav (72px) + section
            paddings (8px top / 28px bottom) = 9rem — the card fills the rest of
            the first screen so the lens demo is fully visible without scrolling */}
        <div className="relative flex flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-jade-400 via-jade-500 to-jade-700 shadow-lift lg:min-h-[calc(100dvh-9rem)]">
          {/* ambient glows + animated iris backdrop */}
          <IrisVisual className="pointer-events-none absolute -right-36 -top-44 h-[38rem] w-[38rem] opacity-80 lg:right-[-6rem] lg:top-[-8rem]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute right-1/3 top-0 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" aria-hidden="true" />

          {/* ── Lens & Focus interactive layer (blur veil + hint badge + lens controls) ── */}
          <LensFocusLayer
            phase={phase}
            selectedLens={selectedLens}
            veilClass={veilClass}
            veilBlur={veilBlur}
            veilClearMs={veilClearMs}
            onSelect={handleSelectLens}
            onReset={handleResetVision}
          />

          <div className="relative grid flex-1 gap-10 px-6 pb-12 pt-12 sm:px-10 sm:pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6 lg:px-[6.5rem] lg:pb-14 lg:pt-32">
            {/* ── copy ── */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-w-xl flex-col lg:max-w-none lg:justify-center"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-gold-400" />
                Advanced Ophthalmology Care
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]">
                Advanced Eye Care for a{" "}
                <span className="text-gold-400">Clearer Tomorrow</span>
              </h1>

              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
                Comprehensive ophthalmology care with experienced specialists, modern
                diagnostic technology and patient-focused treatment — for every age,
                from routine check-ups to advanced surgery.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => nav.navigate({ view: "appointment" })}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-4 text-base font-bold text-brand-900 shadow-lift transition hover:bg-gold-400"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book an Appointment
                </button>
                <button
                  onClick={() => nav.navigate({ view: "treatments" })}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-4 text-base font-bold text-white backdrop-blur transition hover:border-white/70 hover:bg-white/20"
                >
                  Explore Treatments
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* ── visual — transparent cutout blending straight into the card's blue,
                flush with the bottom-right corner (no frame, like the reference) ── */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 hidden sm:block"
            >
              <img
                src="/images/hero-exam-people.png"
                alt="Ophthalmologist examining a patient's eyes with a slit lamp at Shiv Netralay"
                className="mx-auto -mb-12 mt-8 w-full max-w-[26rem] -translate-x-4 lg:absolute lg:bottom-[-3.5rem] lg:right-[-6.5rem] lg:mb-0 lg:mt-0 lg:w-[31rem] lg:max-w-none xl:w-[42rem] 2xl:w-[46rem]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Lens = (typeof LENSES)[number];

/**
 * "Lens & Focus" layer.
 * - Veil: full-viewport backdrop blur (z-40 — below the sticky header / mobile
 *   bar at z-50, so navigation stays usable while the page is blurred).
 * - Badge + lens controls: z-50 siblings of the veil, so they stay crisp and
 *   clickable above the blur. All are direct children of the hero card (no
 *   transformed ancestors), which keeps `fixed`/z-index behaviour predictable.
 * - Desktop: vertical lens stack hugging the card's right edge.
 * - Mobile/tablet: horizontal lens row at the top of the card, under the badge.
 */
function LensFocusLayer({
  phase,
  selectedLens,
  veilClass,
  veilBlur,
  veilClearMs,
  onSelect,
  onReset,
}: {
  phase: VisionPhase;
  selectedLens: string | null;
  veilClass: string;
  veilBlur: string;
  veilClearMs: number;
  onSelect: (id: string) => void;
  onReset: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const activeLens = LENSES.find((lens) => lens.id === selectedLens) ?? null;

  return (
    <>
      {/* blur veil — the whole site sits behind it until a lens brings it into focus.
          The backdrop-filter lives ON the wrapper (a child would get its backdrop
          clipped to the wrapper's own paint) and is inline-styled (see veilBlur). */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-40 ${veilClass}`}
        style={{
          backdropFilter: veilBlur,
          WebkitBackdropFilter: veilBlur,
          backgroundColor: phase === "corrected" ? "transparent" : "rgba(233, 240, 248, 0.16)",
          transition: `backdrop-filter ${veilClearMs}ms ease, -webkit-backdrop-filter ${veilClearMs}ms ease, background-color ${veilClearMs}ms ease`,
        }}
      >
        <div className="vision-veil__streaks absolute inset-0" />
        <div className="vision-veil__warmth absolute inset-0" />
        <div className="vision-veil__vignette absolute inset-0" />
        <div className="vision-veil__smear absolute inset-0" />
      </div>

      {/* phase status pill — desktop: floats over the card's top edge */}
      <div className="absolute inset-x-0 top-4 z-50 hidden justify-center px-6 sm:top-6 lg:flex">
        <VisionStatus phase={phase} lens={activeLens} reduced={prefersReducedMotion === true} />
      </div>

      {/* lens controls — vertical stack hugging the card's right edge (desktop) */}
      <div className="absolute right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3.5 lg:flex xl:right-4">
        {LENSES.map((lens) => (
          <LensButton key={lens.id} lens={lens} active={selectedLens === lens.id} onSelect={() => onSelect(lens.id)} />
        ))}
        <ResetButton visible={phase !== "unselected"} onReset={onReset} />
      </div>

      {/* lens controls — horizontal row at the top of the card (mobile / tablet) */}
      <div className="relative z-50 order-first flex flex-col items-center gap-4 px-4 pt-5 sm:px-6 lg:hidden">
        <VisionStatus phase={phase} lens={activeLens} reduced={prefersReducedMotion === true} />
        <div className="grid grid-cols-2 place-items-center gap-x-3 gap-y-4 sm:flex sm:items-start sm:justify-center sm:gap-x-8">
          {LENSES.map((lens) => (
            <LensButton key={lens.id} lens={lens} active={selectedLens === lens.id} onSelect={() => onSelect(lens.id)} />
          ))}
        </div>
        <ResetButton visible={phase !== "unselected"} onReset={onReset} />
      </div>
    </>
  );
}

/** Phase-driven status pill: invite → simulating (with 4s progress) → corrected. */
function VisionStatus({
  phase,
  lens,
  reduced,
}: {
  phase: VisionPhase;
  lens: Lens | null;
  reduced: boolean;
}) {
  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {phase === "unselected" && (
          <motion.div
            key="vision-invite"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex justify-center"
          >
            <VisionBadge reduced={reduced} />
          </motion.div>
        )}
        {phase === "simulating" && lens && (
          <motion.div
            key={`sim-${lens.id}`}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full"
          >
            <SimulationPill lens={lens} />
          </motion.div>
        )}
        {phase === "corrected" && lens && (
          <motion.div
            key={`done-${lens.id}`}
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <CorrectedPill lens={lens} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Floating pill that invites the visitor to pick a lens — shown while no lens is chosen. */
function VisionBadge({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      animate={reduced ? undefined : { y: [0, -5, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      className="flex items-center gap-2.5 rounded-full border border-white/30 bg-brand-950/60 py-2.5 pl-4 pr-5 text-white shadow-lift backdrop-blur-md"
      role="status"
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
      </span>
      <ScanEye className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
      <p className="text-center text-[11px] font-semibold leading-snug sm:text-sm">
        Select a lens to experience a vision condition — corrected in 4s
      </p>
    </motion.div>
  );
}

/** Pill shown while a condition's uncorrected view is on stage — gold progress
 *  bar fills over the 4-second simulation, then the lens corrects the vision. */
function SimulationPill({ lens }: { lens: Lens }) {
  const Icon = lens.icon;
  return (
    <div
      role="status"
      className="flex w-full items-center gap-3 rounded-2xl border border-white/30 bg-brand-950/60 px-4 py-3 text-white shadow-lift backdrop-blur-md sm:rounded-full"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-500/20 text-gold-400">
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gold-400 sm:text-xs">
          {lens.label} vision — uncorrected
        </p>
        <p className="leading-snug text-white/85 sm:truncate text-[11px] font-medium sm:text-sm">{lens.simNote}</p>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/20" aria-hidden="true">
          <motion.div
            key={lens.id}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SIMULATION_MS / 1000, ease: "linear" }}
            className="h-full rounded-full bg-gold-400"
          />
        </div>
      </div>
    </div>
  );
}

/** Gold-rimmed pill confirming the chosen lens has corrected the vision. */
function CorrectedPill({ lens }: { lens: Lens }) {
  return (
    <div
      role="status"
      className="flex w-full items-center gap-3 rounded-2xl border border-gold-400/50 bg-brand-950/60 px-4 py-3 text-white shadow-lift backdrop-blur-md sm:rounded-full"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-500 text-brand-900">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gold-400 sm:text-xs">
          Vision corrected — {lens.label} lens
        </p>
        <p className="truncate text-[11px] font-medium text-white/90 sm:text-sm">{lens.correctedNote}</p>
      </div>
    </div>
  );
}

/** Circular glassmorphism lens button with a label chip underneath. */
function LensButton({ lens, active, onSelect }: { lens: Lens; active: boolean; onSelect: () => void }) {
  const Icon = lens.icon;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        aria-label={`${lens.label} lens — simulate this vision condition`}
        className={`grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 sm:h-14 sm:w-14 ${
          active
            ? "border-gold-400 bg-gold-500/30 shadow-[0_0_30px_rgba(247,213,84,0.6)] ring-2 ring-gold-400"
            : "border-white/40 bg-white/15 shadow-lift hover:scale-105 hover:border-white/70 hover:bg-white/25"
        }`}
      >
        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${active ? "text-gold-400" : "text-white"}`} aria-hidden="true" />
      </button>
      <span
        className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] backdrop-blur-md sm:px-2.5 sm:text-[10px] ${
          active ? "border-gold-400/60 bg-brand-950/70 text-gold-400" : "border-white/30 bg-brand-950/50 text-white/90"
        }`}
      >
        {lens.label}
      </span>
    </div>
  );
}

/** Small ghost pill that returns the site to the blurred state. */
function ResetButton({ visible, onReset }: { visible: boolean; onReset: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="reset-vision"
          type="button"
          onClick={onReset}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="Reset vision — return the site to the blurred state"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-brand-950/55 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-md transition hover:border-gold-400/70 hover:text-gold-400"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Reset Vision
        </motion.button>
      )}
    </AnimatePresence>
  );
}
