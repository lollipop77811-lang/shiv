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
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="why-heading">
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

        <StaggerGrid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <StaggerItem key={item.title}>
                <article className="group h-full rounded-3xl glass-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-jade-200 hover:shadow-lift">
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-jade-50 to-jade-100 text-jade-600 transition-all duration-300 group-hover:from-jade-500 group-hover:to-jade-700 group-hover:text-white group-hover:shadow-soft">
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight text-brand-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                    {item.description}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}
