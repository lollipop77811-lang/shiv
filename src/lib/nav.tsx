"use client";

import { createContext, useCallback, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { RouteState } from "./site-data";

/** Build a real href from a RouteState — also usable directly with <Link> */
export function hrefForRoute(route: RouteState): string {
  switch (route.view) {
    case "treatments":
      return "/treatments";
    case "treatment":
      return route.treatmentId ? `/treatments/${route.treatmentId}` : "/treatments";
    case "doctor":
      return route.doctorId ? `/doctors/${route.doctorId}` : "/";
    case "appointment": {
      const params = new URLSearchParams();
      if (route.prefill?.department) params.set("department", route.prefill.department);
      if (route.prefill?.doctorId) params.set("doctor", route.prefill.doctorId);
      const qs = params.toString();
      return qs ? `/appointment?${qs}` : "/appointment";
    }
    case "home":
    default:
      return "/";
  }
}

/** Derive the current RouteState from a real URL path */
function routeFromPath(pathname: string): RouteState {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { view: "home" };
  if (parts[0] === "treatments") {
    return parts[1] ? { view: "treatment", treatmentId: parts[1] } : { view: "treatments" };
  }
  if (parts[0] === "doctors" && parts[1]) return { view: "doctor", doctorId: parts[1] };
  if (parts[0] === "appointment") return { view: "appointment" };
  return { view: "home" };
}

export function scrollToAnchor(anchor: string) {
  if (anchor === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(anchor);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

interface NavContextValue {
  route: RouteState;
  navigate: (next: RouteState) => void;
  /** Navigate to a home-page section (scrolls if already home) */
  goHomeSection: (anchor: string) => void;
}

export const NavContext = createContext<NavContextValue>({
  route: { view: "home" },
  navigate: () => {},
  goHomeSection: () => {},
});

/** URL-routed navigation provider — wraps the whole site in the root layout */
export function NavProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const route = routeFromPath(pathname);

  const navigate = useCallback(
    (next: RouteState) => {
      router.push(hrefForRoute(next));
    },
    [router]
  );

  const goHomeSection = useCallback(
    (anchor: string) => {
      if (pathname === "/") {
        scrollToAnchor(anchor);
        return;
      }
      router.push(`/#${anchor}`);
    },
    [pathname, router]
  );

  // after landing on the home page via a hash link, scroll to the section once it paints
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const t = setTimeout(() => scrollToAnchor(hash), 90);
    return () => clearTimeout(t);
  }, [pathname]);

  return <NavContext.Provider value={{ route, navigate, goHomeSection }}>{children}</NavContext.Provider>;
}

export const useNav = () => useContext(NavContext);
