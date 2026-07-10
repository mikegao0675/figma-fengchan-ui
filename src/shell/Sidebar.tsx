import { NavLink, useLocation } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  icon: string;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const groups: NavGroup[] = [
  {
    label: "数据概览",
    items: [
      { to: "/", label: "实时数据门户", icon: "◈" },
    ],
  },
  {
    label: "运营预警",
    items: [
      { to: "/penalty",    label: "处罚预警",    icon: "⚡", badge: 8 },
      { to: "/logistics",  label: "物流实时预警", icon: "🛰", badge: 14 },
    ],
  },
  {
    label: "商品管理",
    items: [
      { to: "/profit", label: "商品利润", icon: "◎" },
    ],
  },
  {
    label: "系统",
    items: [
      { to: "/design", label: "设计规范", icon: "⊞" },
    ],
  },
];

/* Active indicator colour per route */
const accentFor = (to: string) =>
  to === "/penalty" || to === "/logistics" ? "#f87171" : "#f0f0f0";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const loc = useLocation();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Brand */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.1em", color: "#f0f0f0" }}>FENGCHAN</div>
        <div style={{ fontSize: 10, color: "#3a3a3a", marginTop: 2, letterSpacing: "0.06em" }}>凤婵丝绸 · 管理系统</div>
      </div>

      {/* Nav groups */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
        {groups.map((g) => (
          <div key={g.label} style={{ marginBottom: 20 }}>
            <p style={{
              margin: "0 0 4px", padding: "2px 10px",
              fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
              color: "#333", textTransform: "uppercase",
            }}>{g.label}</p>

            {g.items.map((item) => {
              // Exact match for root, prefix match for others
              const isActive = item.to === "/"
                ? loc.pathname === "/"
                : loc.pathname.startsWith(item.to);
              const accent = accentFor(item.to);

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onClose}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 10px", borderRadius: 6, marginBottom: 1,
                    background: isActive ? "#1a1a1a" : "transparent",
                    transition: "background 0.12s",
                    cursor: "pointer",
                  }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#141414"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {/* Active indicator bar */}
                    <div style={{
                      width: 3, height: 16, borderRadius: 2, flexShrink: 0,
                      background: isActive ? accent : "transparent",
                      transition: "background 0.12s",
                    }} />
                    <span style={{ fontSize: 13, color: "#3a3a3a", flexShrink: 0 }}>{item.icon}</span>
                    <span style={{
                      fontSize: 13, fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#f0f0f0" : "#666",
                      flex: 1,
                    }}>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, minWidth: 16, textAlign: "center",
                        padding: "1px 5px", borderRadius: 9999,
                        background: "rgba(248,113,113,0.15)", color: "#f87171",
                      }}>{item.badge}</span>
                    )}
                  </div>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, background: "#1e1e1e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#888" }}>凤</div>
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#666" }}>管理员</p>
            <p style={{ margin: 0, fontSize: 10, color: "#333" }}>老板视图</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile bottom tab bar (max 4 items) ── */
export function MobileTabBar() {
  const loc = useLocation();
  const tabs: NavItem[] = [
    { to: "/",          label: "数据",  icon: "◈" },
    { to: "/penalty",   label: "处罚",  icon: "⚡", badge: 8 },
    { to: "/logistics", label: "物流",  icon: "🛰", badge: 14 },
    { to: "/profit",    label: "利润",  icon: "◎" },
  ];

  return (
    <div style={{
      display: "flex",
      borderTop: "1px solid #1a1a1a",
      background: "#0c0c0c",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      {tabs.map((t) => {
        const isActive = t.to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(t.to);
        return (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.to === "/"}
            style={{ flex: 1, textDecoration: "none" }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 0 6px" }}>
              <div style={{ position: "relative" }}>
                <span style={{ fontSize: 20, opacity: isActive ? 1 : 0.35 }}>{t.icon}</span>
                {t.badge && (
                  <div style={{
                    position: "absolute", top: -2, right: -6,
                    width: 14, height: 14, borderRadius: "50%",
                    background: "#f87171", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 8, fontWeight: 700, color: "#fff",
                  }}>{t.badge}</div>
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? "#f0f0f0" : "#444" }}>
                {t.label}
              </span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
