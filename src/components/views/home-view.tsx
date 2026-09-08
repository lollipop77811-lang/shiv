"use client";

import { Hero } from "@/components/home/hero";
import { QuickAppointment } from "@/components/home/quick-appointment";
import { WhyUs } from "@/components/home/why-us";
import { Services, FindCare } from "@/components/home/services";
import { About, DoctorsSection } from "@/components/home/about";
import { Technology, Journey } from "@/components/home/technology";
import { Testimonials, Blog } from "@/components/home/testimonials";
import { Faq, Emergency, FinalCta, Location } from "@/components/home/faq";

export function HomeView() {
  return (
    <>
      <Hero />
      <QuickAppointment />
      <WhyUs />
      <Services />
      <FindCare />
      <About />
      <DoctorsSection />
      <Technology />
      <Journey />
      <Testimonials />
      <Blog />
      <Faq />
      <Emergency />
      <FinalCta />
      <Location />
    </>
  );
}
