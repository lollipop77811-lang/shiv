"use client";

import { PageHero } from "@/components/site/page-hero";
import { Location, Emergency } from "@/components/home/faq";
import { FinalCta } from "@/components/home/faq";

export function ContactView() {
  return (
    <>
      <PageHero
        label="Contact"
        title={
          <>
            Location &amp; <span className="text-hero-accent">Contact</span>
          </>
        }
        description="Visit us, call us or write to us — address, hours, phone, email and directions, all in one place."
      />
      <Location />
      <Emergency />
      <FinalCta />
    </>
  );
}
