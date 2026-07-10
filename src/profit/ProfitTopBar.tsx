export default function ProfitTopBar() {
  return (
    <header style={{
      background: "#0c0c0c", borderBottom: "1px solid #1a1a1a",
      padding: "0 24px", height: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.1em" }}>FENGCHAN</span>
        <div style={{ width: 1, height: 16, background: "#222" }} />
        <span style={{ fontSize: 12, color: "#444" }}>运营</span>
        <span style={{ fontSize: 12, color: "#333" }}>›</span>
        <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>商品利润</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 2 }}>
          {["今日", "本周", "本月", "自定义"].map((p, i) => (
            <button key={p} style={{
              padding: "4px 10px", borderRadius: 4, fontSize: 11,
              fontWeight: i === 0 ? 700 : 400,
              background: i === 0 ? "#1e1e1e" : "transparent",
              color: i === 0 ? "#f0f0f0" : "#444",
              border: "none", cursor: "pointer",
            }}>{p}</button>
          ))}
        </div>
        <div style={{ width: 1, height: 14, background: "#222" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
          <span style={{ fontSize: 11, color: "#444" }}>实时</span>
        </div>
      </div>
    </header>
  );
}
