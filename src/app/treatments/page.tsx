import type { Metadata } from "next";
import { TreatmentsView } from "@/components/views/treatments-view";

export const metadata: Metadata = {
  title: "Eye Care Treatments — Shiv Netralay",
  description:
    "Cataract, LASIK, Glaucoma, Diabetic Retinopathy, Macular Degeneration, Cornea, Dry Eye, Pediatric, Oculoplastics, Eye Exams and Contact Lens Fittings — specialised ophthalmology services at Shiv Netralay.",
};

export default function TreatmentsPage() {
  return <TreatmentsView />;
}
