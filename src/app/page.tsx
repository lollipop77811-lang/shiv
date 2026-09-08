"use client";

import { useCallback, useEffect, useState } from "react";
import { NavContext } from "@/lib/nav";
import type { RouteState } from "@/lib/site-data";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MobileActionBar } from "@/components/site/mobile-bar";
import { HomeView } from "@/components/views/home-view";
import { TreatmentsView } from "@/components/views/treatments-view";
import { TreatmentDetailView } from "@/components/views/treatment-detail-view";
import { DoctorView } from "@/components/views/doctor-view";
import { AppointmentView } from "@/components/views/appointment-view";

export default function Home() {
  const [route, setRoute] = useState<RouteState>({ view: "home" });

  const navigate = useCallback((next: RouteState) => {
    setRoute(next);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const goHomeSection = useCallback(
    (anchor: string) => {
      if (route.view !== "home") {
        setRoute({ view: "home", anchor });
      } else {
        scrollToAnchor(anchor);
      }
    },
    [route.view]
  );

  useEffect(() => {
    if (route.view === "home" && route.anchor) {
      // wait for home view to paint before scrolling
      const t = setTimeout(() => scrollToAnchor(route.anchor!), 80);
      return () => clearTimeout(t);
    }
  }, [route]);

  return (
    <NavContext.Provider value={{ route, navigate, goHomeSection }}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {route.view === "home" && <HomeView />}
          {route.view === "treatments" && <TreatmentsView />}
          {route.view === "treatment" && <TreatmentDetailView id={route.treatmentId} />}
          {route.view === "doctor" && <DoctorView id={route.doctorId} />}
          {route.view === "appointment" && <AppointmentView prefill={route.prefill} />}
        </main>
        <Footer />
        <MobileActionBar />
      </div>
    </NavContext.Provider>
  );
}

function scrollToAnchor(anchor: string) {
  if (anchor === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(anchor);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
