"use client";

import { createContext, useContext } from "react";
import type { RouteState } from "./site-data";

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

export const useNav = () => useContext(NavContext);
