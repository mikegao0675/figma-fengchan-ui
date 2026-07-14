import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeMode = "dark" | "light" | "system";

interface ThemeCtx {
  mode: ThemeMode;
  resolved: "dark" | "light";
  setMode: (m: ThemeMode) => void;
}

const Ctx = createContext<ThemeCtx>({ mode: "dark", resolved: "dark", setMode: () => {} });

const STORAGE_KEY = "fengchan-theme";

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    return stored ?? "dark";
  });

  const resolved: "dark" | "light" =
    mode === "system" ? getSystemTheme() : mode;

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "system") {
      root.setAttribute("data-theme", "system");
    } else {
      root.setAttribute("data-theme", mode);
    }
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  /* Keep in sync if system preference changes while mode === "system" */
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setModeState((m) => m); // trigger re-render
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  const setMode = (m: ThemeMode) => setModeState(m);

  return <Ctx.Provider value={{ mode, resolved, setMode }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  return useContext(Ctx);
}
