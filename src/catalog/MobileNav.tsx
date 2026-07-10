interface MobileNavProps {
  cartCount: number;
}

export default function MobileNav({ cartCount }: MobileNavProps) {
  const tabs = [
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      label: "分类",
      active: false,
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: "货盘",
      active: true,
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      label: "选款车",
      active: false,
      badge: cartCount,
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: "我的",
      active: false,
    },
  ];

  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        background: "rgba(250,250,248,0.96)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #ede9e0",
        display: "flex",
        zIndex: 50,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.label}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: "10px 0 8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: t.active ? "#1a1706" : "#b0a898",
            position: "relative",
          }}
        >
          {t.badge ? (
            <div style={{ position: "relative" }}>
              {t.icon}
              <div style={{
                position: "absolute", top: -4, right: -6,
                minWidth: 16, height: 16, borderRadius: 8,
                background: "#9b7b52", color: "#fff",
                fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 4px",
              }}>{t.badge}</div>
            </div>
          ) : t.icon}
          <span style={{
            fontSize: 10, fontWeight: t.active ? 600 : 400,
            letterSpacing: "0.04em",
          }}>{t.label}</span>
          {t.active && (
            <div style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: 20, height: 2, background: "#1a1706", borderRadius: 1,
            }} />
          )}
        </button>
      ))}
    </div>
  );
}
