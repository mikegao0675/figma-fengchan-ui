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
        background: "#0c0c0c",
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
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", color: "#f0f0f0" }}>FENGCHAN</div>
          <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.08em" }}>凤婵丝绸 · 数据智能</div>
        </div>
        <div style={{ width: 1, height: 28, background: "#222" }} />
        <span style={{ fontSize: 11, color: "#555", fontWeight: 500 }}>实时数据门户</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ textAlign: "right" }}>
          <div className="mono" style={{ fontSize: 18, fontWeight: 600, color: "#f0f0f0", lineHeight: 1 }}>{timeStr}</div>
          <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>{dateStr}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
          <span style={{ fontSize: 11, color: "#444" }}>实时</span>
        </div>
      </div>
    </header>
  );
}
