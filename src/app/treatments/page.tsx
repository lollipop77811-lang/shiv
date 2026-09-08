import type { Metadata } from "next";
import { TreatmentsView } from "@/components/views/treatments-view";

export const metadata: Metadata = {
  title: "Eye Care Treatments — Shiv Netralay",
  description:
    "Cataract, LASIK, Glaucoma, Retina, Cornea, Dry Eye, Pediatric and General eye exams — specialised ophthalmology services at Shiv Netralay.",
};

export default function TreatmentsPage() {
  return <TreatmentsView />;
}
