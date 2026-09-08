"use client";

import { PageHero } from "@/components/site/page-hero";
import { Blog } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";

export function ResourcesView() {
  return (
    <>
      <PageHero
        label="Patient Resources"
        title={
          <>
            Patient <span className="text-hero-accent">Resources</span>
          </>
        }
        description="Plain-language guides from our specialists and clear answers to the questions patients ask most — so you can make confident decisions about your eyes."
      />
      <Blog />
      <Faq />
    </>
  );
}
