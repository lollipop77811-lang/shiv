import type { Metadata } from "next";
import { FacilitiesView } from "@/components/views/facilities-view";

export const metadata: Metadata = {
  title: "Facilities & Technology — Shiv Netralay",
  description:
    "Modern diagnostic facilities — OCT, fundus photography, visual field analysis and slit lamp examination — supporting precise eye care at Shiv Netralay.",
};

export default function FacilitiesPage() {
  return <FacilitiesView />;
}
