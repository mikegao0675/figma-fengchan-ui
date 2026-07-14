export default function ProfitTopBar() {
  return (
    <header style={{
      background: "var(--bg)", borderBottom: "1px solid #1a1a1a",
      padding: "0 24px", height: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.1em" }}>FENGCHAN</span>
        <div style={{ width: 1, height: 16, background: "var(--border)" }} />
        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>运营</span>
        <span style={{ fontSize: 12, color: "var(--border-strong)" }}>›</span>
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>商品利润</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 2 }}>
          {["今日", "本周", "本月", "自定义"].map((p, i) => (
            <button key={p} style={{
              padding: "4px 10px", borderRadius: 4, fontSize: 13,
              fontWeight: i === 0 ? 700 : 400,
              background: i === 0 ? "var(--surface-raised)" : "transparent",
              color: i === 0 ? "var(--text-primary)" : "var(--text-faint)",
              border: "none", cursor: "pointer",
            }}>{p}</button>
          ))}
        </div>
        <div style={{ width: 1, height: 14, background: "var(--border)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--success)" }} />
          <span style={{ fontSize: 13, color: "var(--text-faint)" }}>实时</span>
        </div>
      </div>
    </header>
  );
}
