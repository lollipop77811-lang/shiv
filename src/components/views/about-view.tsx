"use client";

import { PageHero } from "@/components/site/page-hero";
import { About, DoctorsSection } from "@/components/home/about";
import { WhyUs } from "@/components/home/why-us";
import { Journey } from "@/components/home/technology";
import { FinalCta } from "@/components/home/faq";

export function AboutView() {
  return (
    <>
      <PageHero
        label="About Us"
        title={
          <>
            About <span className="text-hero-accent">Shiv Netralay</span>
          </>
        }
        description="A specialist eye clinic built on personal attention, honest counselling and modern ophthalmology — advanced eye care that feels calm and human."
      />
      <About />
      <WhyUs />
      <Journey />
      <FinalCta />
    </>
  );
}
