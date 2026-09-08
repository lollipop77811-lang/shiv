import type { Metadata } from "next";
import { ResourcesView } from "@/components/views/resources-view";

export const metadata: Metadata = {
  title: "Patient Resources — Shiv Netralay",
  description:
    "Eye care insights and answers to frequently asked questions — plain-language guides from the specialists at Shiv Netralay.",
};

export default function PatientResourcesPage() {
  return <ResourcesView />;
}
