import type { Metadata } from "next";
import { AboutView } from "@/components/views/about-view";

export const metadata: Metadata = {
  title: "About Us — Shiv Netralay",
  description:
    "Shiv Netralay is a specialist eye clinic built on personal attention, honest counselling and modern ophthalmology — advanced eye care that feels calm and human.",
};

export default function AboutPage() {
  return <AboutView />;
}
