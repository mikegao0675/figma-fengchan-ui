import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar, { MobileTabBar } from "./Sidebar";

const SIDEBAR_W = 200;

/* Page title map for shell header */
const PAGE_META: Record<string, { label: string; group: string; badge?: { count: number; color: string } }> = {
  "/":          { label: "实时数据门户", group: "数据概览" },
  "/penalty":   { label: "处罚预警",    group: "运营预警", badge: { count: 8,  color: "#f87171" } },
  "/logistics": { label: "物流实时预警", group: "运营预警", badge: { count: 14, color: "#f87171" } },
  "/profit":    { label: "商品利润",    group: "商品管理" },
  "/streamer":  { label: "主播分析",    group: "达人管理" },
  "/design":    { label: "设计规范",    group: "系统" },
};

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loc = useLocation();
  const meta = PAGE_META[loc.pathname] ?? { label: "—", group: "FENGCHAN" };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0c0c0c" }}>

      {/* ── Desktop layout ── */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

        {/* Desktop sidebar — hidden on mobile */}
        <aside
          style={{
            width: SIDEBAR_W, flexShrink: 0,
            background: "#0c0c0c",
            borderRight: "1px solid #1a1a1a",
            position: "sticky", top: 0, height: "100vh",
            overflowY: "auto",
          }}
          className="hidden xl:block"
        >
          <Sidebar />
        </aside>

        {/* Main content column */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

          {/* Shell top bar — shared across all pages */}
          <header style={{
            background: "#0c0c0c", borderBottom: "1px solid #1a1a1a",
            padding: "0 20px", height: 50, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            position: "sticky", top: 0, zIndex: 40,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Mobile hamburger */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="xl:hidden"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 4, color: "#555", fontSize: 18, lineHeight: 1,
                }}
              >☰</button>

              {/* Desktop: brand + breadcrumb */}
              <span className="hidden xl:inline" style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.1em", color: "#f0f0f0" }}>FENGCHAN</span>
              <div className="hidden xl:block" style={{ width: 1, height: 16, background: "#222" }} />
              <span style={{ fontSize: 12, color: "#3a3a3a" }}>{meta.group}</span>
              <span style={{ fontSize: 12, color: "#2a2a2a" }}>›</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>{meta.label}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {meta.badge && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "3px 9px",
                  background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
                  borderRadius: 5,
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: meta.badge.color, boxShadow: `0 0 5px ${meta.badge.color}` }} />
                  <span style={{ fontSize: 11, color: meta.badge.color, fontWeight: 600 }}>{meta.badge.count} 单待处理</span>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
                <span style={{ fontSize: 11, color: "#3a3a3a" }}>实时</span>
              </div>
            </div>
          </header>

          {/* Page content — each page brings its own scroll */}
          <main style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
            <Outlet />
          </main>

          {/* Mobile bottom tab bar */}
          <div className="xl:hidden">
            <MobileTabBar />
          </div>
        </div>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <>
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 60,
              background: "rgba(0,0,0,0.7)",
            }}
          />
          <div style={{
            position: "fixed", top: 0, left: 0, bottom: 0,
            width: SIDEBAR_W + 20, zIndex: 70,
            background: "#0c0c0c", borderRight: "1px solid #1e1e1e",
            animation: "slideInLeft 0.2s ease-out",
            display: "flex", flexDirection: "column",
          }}>
            {/* Drawer close button */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 14px 0" }}>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ background: "none", border: "none", color: "#555", fontSize: 20, cursor: "pointer" }}
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
        /* Hide each page's own top bar when inside shell */
        .page-topbar-standalone { display: none !important; }
      `}</style>
    </div>
  );
}
