"use client";

import { useState } from "react";
import { ArrowRight, CalendarSearch, ChevronDown } from "lucide-react";
import { DEPARTMENTS, DOCTORS } from "@/lib/site-data";
import { useNav } from "@/lib/nav";
import { Reveal } from "@/components/site/reveal";

/** Interactive pre-booking strip under the hero (frontend demo) */
export function QuickAppointment() {
  const nav = useNav();
  const [dept, setDept] = useState("cataract");
  const [doctor, setDoctor] = useState("any");
  const [when, setWhen] = useState("This week");

  const doctorsForDept = DOCTORS.filter((d) => d.departments.includes(dept));

  const findAppointment = () => {
    nav.navigate({
      view: "appointment",
      prefill: {
        department: dept,
        doctorId: doctor === "any" ? undefined : doctor,
      },
    });
  };

  const selectCls =
    "w-full appearance-none rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm font-semibold text-white outline-none transition focus:border-jade-300/60 focus:bg-white/15 [&>option]:text-brand-900";

  return (
    <section className="relative z-10 -mt-1">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-jade-700 shadow-lift">
            <div
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-jade-400/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-center lg:gap-10 lg:p-10">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Need an Eye Consultation?
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-jade-100/90 sm:text-base">
                  Book your visit with our ophthalmology specialists — pick a
                  department and doctor, and we will match the earliest
                  convenient slot.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="relative block">
                  <span className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-jade-200">
                    Select Department
                  </span>
                  <select
                    value={dept}
                    onChange={(e) => {
                      setDept(e.target.value);
                      setDoctor("any");
                    }}
                    className={selectCls}
                    aria-label="Select department"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute bottom-4 right-3.5 h-4 w-4 text-jade-200" />
                </label>

                <label className="relative block">
                  <span className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-jade-200">
                    Select Doctor
                  </span>
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className={selectCls}
                    aria-label="Select doctor"
                  >
                    <option value="any">Any available</option>
                    {doctorsForDept.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute bottom-4 right-3.5 h-4 w-4 text-jade-200" />
                </label>

                <label className="relative block">
                  <span className="mb-1.5 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-jade-200">
                    Preferred Time
                  </span>
                  <select
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                    className={selectCls}
                    aria-label="Preferred time"
                  >
                    <option>This week</option>
                    <option>Next week</option>
                    <option>Flexible</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute bottom-4 right-3.5 h-4 w-4 text-jade-200" />
                </label>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-between gap-4 border-t border-white/10 px-6 py-5 sm:flex-row sm:px-10">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-jade-100">
                <CalendarSearch className="h-4.5 w-4.5" />
                Frontend demo — preferences carry into the booking flow.
              </p>
              <button
                onClick={findAppointment}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-extrabold text-brand-900 shadow-soft transition hover:bg-gold-400 sm:w-auto"
              >
                Find Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
