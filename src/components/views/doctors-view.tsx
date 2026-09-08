"use client";

import { PageHero } from "@/components/site/page-hero";
import { DoctorsSection } from "@/components/home/about";
import { FinalCta } from "@/components/home/faq";

export function DoctorsView() {
  return (
    <>
      <PageHero
        label="Doctors"
        title={
          <>
            Meet Our <span className="text-hero-accent">Eye Care Specialists</span>
          </>
        }
        description="Qualified ophthalmologists with subspecialty expertise — unhurried consultations, clear explanations and treatment plans you can trust."
      />
      <DoctorsSection hideHeading />
      <FinalCta />
    </>
  );
}
