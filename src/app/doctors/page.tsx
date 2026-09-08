import type { Metadata } from "next";
import { DoctorsView } from "@/components/views/doctors-view";

export const metadata: Metadata = {
  title: "Our Eye Care Specialists — Shiv Netralay",
  description:
    "Meet our ophthalmologists — cataract & refractive surgery, glaucoma & medical retina, cornea and pediatric eye care specialists at Shiv Netralay.",
};

export default function DoctorsPage() {
  return <DoctorsView />;
}
