import { useState, useEffect } from "react";

export default function TopBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "short" });

  return (
    <header
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid #1c1c1c",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-primary)" }}>FENGCHAN</div>
          <div style={{ fontSize: 12, color: "var(--text-faint)", letterSpacing: "0.08em" }}>凤婵丝绸 · 数据智能</div>
        </div>
        <div style={{ width: 1, height: 28, background: "var(--border)" }} />
        <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>实时数据门户</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ textAlign: "right" }}>
          <div className="mono" style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1 }}>{timeStr}</div>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 2 }}>{dateStr}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }} />
          <span style={{ fontSize: 13, color: "var(--text-faint)" }}>实时</span>
        </div>
      </div>
    </header>
  );
}
