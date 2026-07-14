import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar, { MobileTabBar } from "./Sidebar";
import { useTheme, type ThemeMode } from "../theme/ThemeContext";

const SIDEBAR_W = 200;

const PAGE_META: Record<string, { label: string; group: string; badge?: { count: number; color: string } }> = {
  "/":          { label: "实时数据门户", group: "数据概览" },
  "/penalty":   { label: "处罚预警",    group: "运营预警", badge: { count: 8,  color: "var(--danger)" } },
  "/logistics": { label: "物流实时预警", group: "运营预警", badge: { count: 14, color: "var(--danger)" } },
  "/profit":    { label: "商品利润",    group: "商品管理" },
  "/streamer":  { label: "主播分析",    group: "达人管理" },
  "/catalog":   { label: "货盘展示",    group: "商品管理" },
  "/design":    { label: "设计规范",    group: "系统" },
};

function ThemeToggle() {
  const { mode, setMode } = useTheme();

  const options: { m: ThemeMode; icon: string; label: string }[] = [
    { m: "dark",   icon: "☽", label: "深色" },
    { m: "light",  icon: "☀", label: "浅色" },
    { m: "system", icon: "⊙", label: "跟随系统" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 6, padding: 2 }}>
      {options.map((o) => {
        const active = mode === o.m;
        return (
          <button
            key={o.m}
            onClick={() => setMode(o.m)}
            title={o.label}
            style={{
              padding: "3px 7px",
              borderRadius: 4,
              border: "none",
              background: active ? "var(--surface-raised)" : "transparent",
              color: active ? "var(--text-primary)" : "var(--text-faint)",
              fontSize: 13,
              cursor: "pointer",
              lineHeight: 1,
              transition: "background 0.12s, color 0.12s",
            }}
          >{o.icon}</button>
        );
      })}
    </div>
  );
}

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loc = useLocation();
  const meta = PAGE_META[loc.pathname] ?? { label: "—", group: "FENGCHAN" };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--bg)" }}>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

        {/* Desktop sidebar */}
        <aside
          style={{
            width: SIDEBAR_W, flexShrink: 0,
            background: "var(--bg)",
            borderRight: "1px solid var(--border)",
            position: "sticky", top: 0, height: "100vh",
            overflowY: "auto",
          }}
          className="hidden xl:block"
        >
          <Sidebar />
        </aside>

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {/* Shell top bar */}
          <header style={{
            background: "var(--bg)", borderBottom: "1px solid var(--border)",
            padding: "0 20px", height: 50, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            position: "sticky", top: 0, zIndex: 40,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                onClick={() => setDrawerOpen(true)}
                className="xl:hidden"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 4, color: "var(--text-muted)", fontSize: 18, lineHeight: 1,
                }}
              >☰</button>

              <span className="hidden xl:inline" style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.1em", color: "var(--text-primary)" }}>FENGCHAN</span>
              <div className="hidden xl:block" style={{ width: 1, height: 16, background: "var(--border)" }} />
              <span style={{ fontSize: 12, color: "var(--text-faint)" }}>{meta.group}</span>
              <span style={{ fontSize: 12, color: "var(--border-strong)" }}>›</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>{meta.label}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {meta.badge && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "3px 9px",
                  background: "var(--danger-sub)", border: "1px solid var(--danger-sub)",
                  borderRadius: 5,
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--danger)" }} />
                  <span style={{ fontSize: 12, color: "var(--danger)", fontWeight: 600 }}>{meta.badge.count} 单待处理</span>
                </div>
              )}

              {/* Theme toggle */}
              <ThemeToggle />

              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--success)" }} />
                <span style={{ fontSize: 12, color: "var(--text-faint)" }}>实时</span>
              </div>
            </div>
          </header>

          <main style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
            <Outlet />
          </main>

          <div className="xl:hidden">
            <MobileTabBar />
          </div>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <>
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.7)" }}
          />
          <div style={{
            position: "fixed", top: 0, left: 0, bottom: 0,
            width: SIDEBAR_W + 20, zIndex: 70,
            background: "var(--bg)", borderRight: "1px solid var(--border)",
            animation: "slideInLeft 0.2s ease-out",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 14px 0" }}>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 20, cursor: "pointer" }}
              >×</button>
            </div>
            <div style={{ flex: 1, overflow: "auto" }}>
              <Sidebar onClose={() => setDrawerOpen(false)} />
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%) }
          to   { transform: translateX(0) }
        }
        .page-topbar-standalone { display: none !important; }
      `}</style>
    </div>
  );
}
