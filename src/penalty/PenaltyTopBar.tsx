export default function PenaltyTopBar() {
  return (
    <header style={{
      background: "#0c0c0c", borderBottom: "1px solid #1a1a1a",
      padding: "0 24px", height: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.1em", color: "#f0f0f0" }}>FENGCHAN</span>
        <div style={{ width: 1, height: 16, background: "#222" }} />
        {/* Breadcrumb */}
        <span style={{ fontSize: 12, color: "#444" }}>运营</span>
        <span style={{ fontSize: 12, color: "#333" }}>›</span>
        <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>处罚预警</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Period picker */}
        <div style={{ display: "flex", gap: 2 }}>
          {["今日", "本周", "本月"].map((p, i) => (
            <button key={p} style={{
              padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: i === 2 ? 700 : 400,
              background: i === 2 ? "#1e1e1e" : "transparent",
              color: i === 2 ? "#f0f0f0" : "#444",
              border: "none", cursor: "pointer",
            }}>{p}</button>
          ))}
        </div>
        {/* Alert badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f87171", boxShadow: "0 0 6px #f87171" }} />
          <span style={{ fontSize: 11, color: "#f87171", fontWeight: 600 }}>8 单已超时</span>
        </div>
      </div>
    </header>
  );
}
