"use client";

import { Hero } from "@/components/home/hero";
import { QuickAppointment } from "@/components/home/quick-appointment";
import { WhyUs } from "@/components/home/why-us";
import { Services } from "@/components/home/services";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCta } from "@/components/home/faq";

/**
 * Home = a focused landing page. Every section below is a short teaser;
 * the full detail lives on its own page:
 *   /about, /doctors, /facilities, /patient-resources, /contact, /treatments
 */
export function HomeView() {
  return (
    <>
      <Hero />
      <QuickAppointment />
      <WhyUs />
      <Services />
      <Testimonials />
      <FinalCta />
    </>
  );
}
