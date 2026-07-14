export default function LogisticsTopBar() {
  return (
    <header style={{
      background: "var(--bg)", borderBottom: "1px solid #1a1a1a",
      padding: "0 24px", height: 50,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.1em", color: "var(--text-primary)" }}>FENGCHAN</span>
        <div style={{ width: 1, height: 16, background: "var(--border)" }} />
        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>运营</span>
        <span style={{ fontSize: 12, color: "var(--border-strong)" }}>›</span>
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>物流实时预警</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Refresh info */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--success)" }} />
          <span style={{ fontSize: 13, color: "var(--text-faint)" }}>数据更新于 3 分钟前</span>
        </div>
        <div style={{ width: 1, height: 14, background: "var(--border)" }} />
        {/* Critical badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--danger)", boxShadow: "0 0 6px #f87171" }} />
          <span style={{ fontSize: 13, color: "var(--danger)", fontWeight: 600 }}>14 单异常</span>
        </div>
        {/* Refresh btn */}
        <button style={{ background: "none", border: "1px solid #222", borderRadius: 4, padding: "4px 10px", color: "var(--text-muted)", fontSize: 13, cursor: "pointer" }}>
          ↻ 刷新
        </button>
      </div>
    </header>
  );
}
