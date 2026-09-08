"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { DOCTORS, DEPARTMENTS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import { Reveal } from "@/components/site/reveal";

/* ── helpers ────────────────────────────────────────────────── */
const MONTH_FMT = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const DAY_FMT = new Intl.DateTimeFormat("en-US", { weekday: "short", day: "numeric", month: "short" });

interface DayCell {
  date: Date;
  inMonth: boolean;
  disabled: boolean;
}

function buildMonthGrid(year: number, month: number, today: Date): DayCell[] {
  const first = new Date(year, month, 1);
  const startPad = first.getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: DayCell[] = [];

  for (let i = 0; i < startPad; i++) {
    cells.push({ date: new Date(year, month, -startPad + i + 1), inMonth: false, disabled: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const disabled = date.getDay() === 0 || date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    cells.push({ date, inMonth: true, disabled });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false, disabled: true });
  }
  return cells;
}

/** deterministic pseudo-random so SSR & client match */
function isBooked(date: Date, slotIndex: number): boolean {
  const seed = date.getDate() * 31 + date.getMonth() * 7 + slotIndex * 13;
  return seed % 6 === 2;
}

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
];

const STEPS = ["Department", "Doctor", "Date", "Time", "Details"] as const;

/* ── main view ──────────────────────────────────────────────── */
export function AppointmentView({ prefill }: { prefill?: { department?: string; doctorId?: string } }) {
  const nav = useNav();
  const today = useMemo(() => new Date(), []);

  const [step, setStep] = useState(0);
  const [department, setDepartment] = useState<string | null>(prefill?.department ?? null);
  const [doctorId, setDoctorId] = useState<string | null>(prefill?.doctorId ?? null); // "any" = no preference
  const [monthOffset, setMonthOffset] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const viewYear = today.getMonth() + monthOffset > 11 ? today.getFullYear() + 1 : today.getFullYear();
  const viewMonth = (today.getMonth() + monthOffset) % 12;
  const grid = useMemo(() => buildMonthGrid(viewYear, viewMonth, today), [viewYear, viewMonth, today]);

  const doctors = department
    ? DOCTORS.filter((d) => d.departments.includes(department))
    : DOCTORS;
  const doctor = DOCTORS.find((d) => d.id === doctorId) ?? null;
  const dept = DEPARTMENTS.find((d) => d.id === department) ?? null;

  const canContinue =
    (step === 0 && department !== null) ||
    (step === 1 && doctorId !== null) ||
    (step === 2 && date !== null) ||
    (step === 3 && time !== null) ||
    (step === 4 && name.trim().length > 1 && phone.replace(/\D/g, "").length >= 10);

  const confirm = () => setSubmitted(true);

  const reset = () => {
    setSubmitted(false);
    setStep(0);
    setDepartment(null);
    setDoctorId(null);
    setDate(null);
    setTime(null);
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
  };

  /* ── success screen ── */
  if (submitted) {
    return (
      <section className="bg-mist py-16 sm:py-24">
        <div className="container-x max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-lift"
          >
            <div className="bg-gradient-to-br from-navy-900 to-azure-700 px-8 py-12 text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 12 }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur"
              >
                <CheckCircle2 className="h-11 w-11 text-white" />
              </motion.span>
              <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white">
                Appointment Request Submitted
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-azure-100/85">
                Thank you, {name.split(" ")[0] || "friend"}. Our front desk will
                call you shortly to confirm your slot.
              </p>
            </div>
            <div className="p-8 sm:p-10">
              <dl className="grid gap-3 rounded-2xl bg-mist p-6 text-sm">
                {[
                  ["Department", dept?.name ?? "—"],
                  ["Doctor", doctor ? doctor.name : "Any available specialist"],
                  ["Date", date ? DAY_FMT.format(date) : "—"],
                  ["Time", time ?? "—"],
                  ["Patient", `${name} · ${phone}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-wrap justify-between gap-2">
                    <dt className="font-bold text-navy-900">{k}</dt>
                    <dd className="text-right text-slate-500">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 rounded-2xl border border-azure-200 bg-azure-50 p-4 text-xs font-semibold leading-relaxed text-azure-700">
                This is a frontend demonstration — no real appointment was
                booked. The production build will connect to the clinic&apos;s
                scheduling system.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => nav.navigate({ view: "home" })}
                  className="flex-1 rounded-full bg-navy-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-navy-800"
                >
                  Back to Home
                </button>
                <button
                  onClick={reset}
                  className="flex-1 rounded-full border border-azure-200 bg-azure-50 px-6 py-3.5 text-sm font-bold text-azure-700 transition hover:bg-azure-100"
                >
                  Book Another
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  /* ── booking flow ── */
  return (
    <section className="bg-mist py-12 sm:py-16">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-azure-200 bg-azure-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-azure-700">
            <CalendarDays className="h-3.5 w-3.5" />
            Book an Appointment
          </span>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl lg:text-[2.75rem]">
            Schedule Your <span className="text-gradient">Eye Care Visit</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Five quick steps. Our front desk will confirm your appointment by
            phone — no payment needed to request a slot.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
          {/* ── progress rail ── */}
          <Reveal>
            <aside className="rounded-3xl border border-border/70 bg-white p-7 shadow-soft lg:sticky lg:top-24">
              <ol className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                {STEPS.map((label, i) => {
                  const done = i < step;
                  const active = i === step;
                  return (
                    <li key={label} className="flex shrink-0 items-center gap-3 lg:w-full">
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-extrabold transition-all ${
                          done
                            ? "bg-azure-600 text-white"
                            : active
                              ? "bg-navy-900 text-white ring-4 ring-azure-100"
                              : "bg-mist text-slate-400"
                        }`}
                      >
                        {done ? <CheckCircle2 className="h-4.5 w-4.5" /> : i + 1}
                      </span>
                      <span
                        className={`whitespace-nowrap text-sm font-bold lg:whitespace-normal ${
                          active ? "text-navy-900" : done ? "text-azure-700" : "text-slate-400"
                        }`}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>

              {/* live summary */}
              <div className="mt-7 hidden rounded-2xl bg-mist p-5 lg:block">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  Your Selection
                </p>
                <ul className="mt-3 space-y-2 text-sm font-semibold text-navy-800">
                  <li className="flex justify-between gap-3">
                    <span className="text-slate-400">Department</span>
                    <span className="text-right">{dept?.name ?? "—"}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-slate-400">Doctor</span>
                    <span className="text-right">{doctor ? doctor.name.replace("Dr. ", "Dr ") : doctorId === "any" ? "Any available" : "—"}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-slate-400">Date</span>
                    <span className="text-right">{date ? DAY_FMT.format(date) : "—"}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-slate-400">Time</span>
                    <span className="text-right">{time ?? "—"}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </Reveal>

          {/* ── step panel ── */}
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-border/70 bg-white p-7 shadow-soft sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* STEP 0 — department */}
                  {step === 0 && (
                    <div>
                      <h2 className="text-xl font-extrabold tracking-tight text-navy-900">
                        Select Department
                      </h2>
                      <p className="mt-1.5 text-sm text-slate-500">
                        Which service do you need? Not sure — choose General Eye Care.
                      </p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {DEPARTMENTS.map((dep) => (
                          <button
                            key={dep.id}
                            onClick={() => setDepartment(dep.id)}
                            aria-pressed={department === dep.id}
                            className={`group flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                              department === dep.id
                                ? "border-azure-600 bg-azure-50 ring-2 ring-azure-200"
                                : "border-border bg-white hover:border-azure-300 hover:bg-azure-50/40"
                            }`}
                          >
                            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${
                              department === dep.id ? "bg-azure-600 text-white" : "bg-mist text-azure-600"
                            }`}>
                              <dep.icon className="h-5 w-5" />
                            </span>
                            <span className="text-sm font-extrabold text-navy-900">{dep.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 1 — doctor */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-extrabold tracking-tight text-navy-900">
                        Select Doctor
                      </h2>
                      <p className="mt-1.5 text-sm text-slate-500">
                        Specialists for {dept?.name}. You may also request any available doctor.
                      </p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <button
                          onClick={() => setDoctorId("any")}
                          aria-pressed={doctorId === "any"}
                          className={`flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                            doctorId === "any"
                              ? "border-azure-600 bg-azure-50 ring-2 ring-azure-200"
                              : "border-border bg-white hover:border-azure-300"
                          }`}
                        >
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-azure-400 to-navy-800 text-sm font-extrabold text-white">
                            Any
                          </span>
                          <span>
                            <span className="block text-sm font-extrabold text-navy-900">No Preference</span>
                            <span className="text-xs font-semibold text-slate-500">Matched to earliest slot</span>
                          </span>
                        </button>
                        {doctors.map((doc) => (
                          <button
                            key={doc.id}
                            onClick={() => setDoctorId(doc.id)}
                            aria-pressed={doctorId === doc.id}
                            className={`flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                              doctorId === doc.id
                                ? "border-azure-600 bg-azure-50 ring-2 ring-azure-200"
                                : "border-border bg-white hover:border-azure-300"
                            }`}
                          >
                            <img
                              src={doc.image}
                              alt={doc.name}
                              className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
                            />
                            <span>
                              <span className="block text-sm font-extrabold text-navy-900">{doc.name}</span>
                              <span className="block text-xs font-semibold text-azure-700">{doc.specialization}</span>
                            </span>
                          </button>
                        ))}
                        {doctors.length === 0 && (
                          <p className="rounded-2xl bg-mist p-4 text-sm font-semibold text-slate-500">
                            No named specialist for this department — &ldquo;No Preference&rdquo; will route you to the right doctor.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 2 — date */}
                  {step === 2 && (
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-extrabold tracking-tight text-navy-900">Select Date</h2>
                          <p className="mt-1.5 text-sm text-slate-500">Sundays and past dates are not bookable.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
                            disabled={monthOffset === 0}
                            className="grid h-10 w-10 place-items-center rounded-full border border-border transition enabled:hover:bg-azure-50 disabled:opacity-30"
                            aria-label="Previous month"
                          >
                            <ChevronLeft className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => setMonthOffset((m) => Math.min(3, m + 1))}
                            disabled={monthOffset === 3}
                            className="grid h-10 w-10 place-items-center rounded-full border border-border transition enabled:hover:bg-azure-50 disabled:opacity-30"
                            aria-label="Next month"
                          >
                            <ChevronRight className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>

                      <p className="mt-6 text-center text-base font-extrabold uppercase tracking-[0.14em] text-navy-900">
                        {MONTH_FMT.format(new Date(viewYear, viewMonth, 1))}
                      </p>
                      <div className="mt-4 grid grid-cols-7 gap-1.5 text-center">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                          <span key={d} className="py-2 text-[0.7rem] font-extrabold uppercase tracking-wider text-slate-400">
                            {d}
                          </span>
                        ))}
                        {grid.map((cell, i) => {
                          const selected =
                            date != null && cell.date.toDateString() === date.toDateString();
                          return (
                            <button
                              key={i}
                              disabled={cell.disabled}
                              onClick={() => setDate(cell.date)}
                              aria-pressed={selected}
                              className={`aspect-square rounded-xl text-sm font-bold transition-all ${
                                !cell.inMonth
                                  ? "opacity-0"
                                  : selected
                                    ? "scale-105 bg-azure-600 text-white shadow-soft"
                                    : cell.disabled
                                      ? "text-slate-300"
                                      : "text-navy-800 hover:bg-azure-50 hover:ring-2 hover:ring-azure-100"
                              } ${cell.inMonth && !selected ? "bg-mist" : ""}`}
                            >
                              {cell.inMonth ? cell.date.getDate() : ""}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — time */}
                  {step === 3 && (
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-azure-50 text-azure-600">
                          <Clock className="h-5.5 w-5.5" />
                        </span>
                        <div>
                          <h2 className="text-xl font-extrabold tracking-tight text-navy-900">Select Time</h2>
                          <p className="mt-0.5 text-sm font-semibold text-azure-700">
                            {date ? DAY_FMT.format(date) : ""}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
                        {TIME_SLOTS.map((slot, i) => {
                          const booked = date ? isBooked(date, i) : false;
                          return (
                            <button
                              key={slot}
                              disabled={booked}
                              onClick={() => setTime(slot)}
                              aria-pressed={time === slot}
                              className={`rounded-xl px-2 py-3 text-sm font-bold transition-all ${
                                booked
                                  ? "cursor-not-allowed bg-mist text-slate-300 line-through"
                                  : time === slot
                                    ? "bg-azure-600 text-white shadow-soft"
                                    : "bg-mist text-navy-800 hover:bg-azure-50 hover:ring-2 hover:ring-azure-100"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                      <p className="mt-4 text-xs font-semibold text-slate-400">
                        Struck-through slots are already reserved — sample availability for the demo.
                      </p>
                    </div>
                  )}

                  {/* STEP 4 — details */}
                  {step === 4 && (
                    <div>
                      <h2 className="text-xl font-extrabold tracking-tight text-navy-900">Patient Details</h2>
                      <p className="mt-1.5 text-sm text-slate-500">
                        We will call to confirm your appointment.
                      </p>
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-navy-900">
                            <User className="h-3.5 w-3.5 text-azure-600" /> Full Name *
                          </span>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Priya Nair"
                            className="w-full rounded-2xl border border-border bg-mist/60 px-4.5 py-3.5 text-sm font-semibold outline-none transition focus:border-azure-400 focus:bg-white focus:ring-2 focus:ring-azure-100"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-navy-900">
                            <Phone className="h-3.5 w-3.5 text-azure-600" /> Phone Number *
                          </span>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98XXX XXXXX"
                            inputMode="tel"
                            className="w-full rounded-2xl border border-border bg-mist/60 px-4.5 py-3.5 text-sm font-semibold outline-none transition focus:border-azure-400 focus:bg-white focus:ring-2 focus:ring-azure-100"
                          />
                        </label>
                        <label className="block sm:col-span-2">
                          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-navy-900">
                            <Mail className="h-3.5 w-3.5 text-azure-600" /> Email (optional)
                          </span>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            type="email"
                            className="w-full rounded-2xl border border-border bg-mist/60 px-4.5 py-3.5 text-sm font-semibold outline-none transition focus:border-azure-400 focus:bg-white focus:ring-2 focus:ring-azure-100"
                          />
                        </label>
                        <label className="block sm:col-span-2">
                          <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-[0.12em] text-navy-900">
                            Notes (optional)
                          </span>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Anything the doctor should know before your visit…"
                            rows={3}
                            className="w-full resize-none rounded-2xl border border-border bg-mist/60 px-4.5 py-3.5 text-sm font-semibold outline-none transition focus:border-azure-400 focus:bg-white focus:ring-2 focus:ring-azure-100"
                          />
                        </label>
                      </div>

                      {/* summary */}
                      <div className="mt-6 rounded-2xl bg-mist p-6">
                        <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                          Appointment Summary
                        </p>
                        <ul className="mt-3 space-y-2 text-sm font-semibold text-navy-800">
                          <li className="flex justify-between gap-3"><span className="text-slate-400">Department</span>{dept?.name}</li>
                          <li className="flex justify-between gap-3"><span className="text-slate-400">Doctor</span>{doctor ? doctor.name : "Any available"}</li>
                          <li className="flex justify-between gap-3"><span className="text-slate-400">Date</span>{date ? DAY_FMT.format(date) : "—"}</li>
                          <li className="flex justify-between gap-3"><span className="text-slate-400">Time</span>{time}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* nav buttons */}
              <div className="mt-9 flex items-center justify-between gap-4 border-t border-border pt-6">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-bold text-navy-900 transition enabled:hover:bg-azure-50 disabled:invisible"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                {step < 4 ? (
                  <button
                    onClick={() => canContinue && setStep((s) => s + 1)}
                    disabled={!canContinue}
                    className={`group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-extrabold transition-all ${
                      canContinue
                        ? "bg-azure-600 text-white shadow-soft hover:bg-azure-700"
                        : "cursor-not-allowed bg-mist text-slate-400"
                    }`}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    onClick={confirm}
                    disabled={!canContinue}
                    className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-extrabold transition-all ${
                      canContinue
                        ? "bg-navy-900 text-white shadow-soft hover:bg-navy-800"
                        : "cursor-not-allowed bg-mist text-slate-400"
                    }`}
                  >
                    <CheckCircle2 className="h-4.5 w-4.5" />
                    Confirm Appointment
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
