"use client";

import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { CLINIC } from "@/lib/site-data";
import { useNav } from "@/lib/nav";

/** Fixed bottom action bar — mobile & tablet only */
export function MobileActionBar() {
  const nav = useNav();
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="pb-safe border-t border-brand-800/60 bg-brand-900/95 text-white shadow-lift backdrop-blur-md">
        <div className="mx-auto grid max-w-lg grid-cols-3">
          <a
            href={CLINIC.phoneHref}
            className="flex flex-col items-center gap-1 py-2.5 text-[0.7rem] font-bold text-jade-100 transition active:bg-brand-800"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-jade-600/90">
              <Phone className="h-4 w-4" />
            </span>
            Call
          </a>
          <button
            onClick={() => nav.navigate({ view: "appointment" })}
            className="relative -top-2 flex flex-col items-center gap-1 text-[0.7rem] font-bold"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-500 text-brand-900 shadow-lift ring-4 ring-brand-900">
              <CalendarCheck className="h-5 w-5" />
            </span>
            Appointment
          </button>
          <button
            onClick={() => nav.navigate({ view: "contact" })}
            className="flex flex-col items-center gap-1 py-2.5 text-[0.7rem] font-bold text-jade-100 transition active:bg-brand-800"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-jade-600/90">
              <MapPin className="h-4 w-4" />
            </span>
            Directions
          </button>
        </div>
      </div>
    </div>
  );
}
