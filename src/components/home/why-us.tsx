"use client";

import {
  Award,
  Building2,
  CalendarCheck,
  HeartHandshake,
  Layers,
  ScanEye,
  type LucideIcon,
} from "lucide-react";
import { WHY_US } from "@/lib/site-data";
import { SectionHeading, StaggerGrid, StaggerItem } from "@/components/site/reveal";

const ICONS: Record<string, LucideIcon> = {
  award: Award,
  scan: ScanEye,
  layers: Layers,
  heart: HeartHandshake,
  building: Building2,
  calendar: CalendarCheck,
};

export function WhyUs() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="why-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Shiv Netralay"
          title={
            <span id="why-heading">
              Trusted Care, <span className="text-gradient">Built Around You</span>
            </span>
          }
          description="Expertise, technology, services and patient trust — placed together so your eyes get complete care."
        />

        {/* soft yellow-glow container — signature of the specialty grid */}
        <StaggerGrid className="relative mx-auto mt-12 max-w-6xl rounded-[2rem] bg-gradient-to-br from-gold-50 via-gold-50/70 to-white p-3 ring-1 ring-gold-200/60 sm:p-4">
          <div
            className="pointer-events-none absolute -top-10 left-1/2 h-40 w-[28rem] -translate-x-1/2 rounded-full bg-gold-300/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <StaggerItem key={item.title}>
                  <article className="group h-full rounded-2xl border border-white bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-500/15 text-gold-600 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-brand-900">
                      <Icon className="h-6 w-6" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold tracking-tight text-brand-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {item.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerGrid>
      </div>
    </section>
  );
}
