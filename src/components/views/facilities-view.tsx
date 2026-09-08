"use client";

import { PageHero } from "@/components/site/page-hero";
import { Technology } from "@/components/home/technology";
import { FinalCta } from "@/components/home/faq";

export function FacilitiesView() {
  return (
    <>
      <PageHero
        label="Facilities & Technology"
        title={
          <>
            Facilities &amp; <span className="text-hero-accent">Technology</span>
          </>
        }
        description="A modern diagnostic suite designed to measure carefully and explain clearly — precise imaging and testing that supports better treatment decisions."
      />
      <Technology />
      <FinalCta />
    </>
  );
}
