interface PenaltyType {
  key: string;
  label: string;
  icon: string;
  overtimeRate: number;
  orders: number;
  amount: number;
  change: number;
  rule: string;
  color: string;
  breakdown: { label: string; val: string }[];
}

const penalties: PenaltyType[] = [
  {
    key: "delivery",
    label: "延迟发货处罚",
    icon: "⏱",
    overtimeRate: 4.2,
    orders: 42,
    amount: 12840,
    change: 31.2,
    rule: "超48h ¥5/单 · 超72h ¥20/单 · 超7天 ¥50/单",
    color: "#f87171",
    breakdown: [
      { label: "48-72h", val: "¥4,200 · 28单" },
      { label: "72h-7天", val: "¥6,640 · 12单" },
      { label: ">7天", val: "¥2,000 · 2单" },
    ],
  },
  {
    key: "fake",
    label: "虚假揽收处罚",
    icon: "📦",
    overtimeRate: 1.8,
    orders: 14,
    amount: 4200,
    change: -8.4,
    rule: "揽收后24h无轨迹更新，¥50-200/单",
    color: "#fb923c",
    breakdown: [
      { label: "24-48h无更新", val: "¥1,400 · 7单" },
      { label: "48h+无更新", val: "¥2,800 · 7单" },
    ],
  },
  {
    key: "track",
    label: "轨迹异常处罚",
    icon: "🛰",
    overtimeRate: 0.9,
    orders: 7,
    amount: 1600,
    change: -22.1,
    rule: "派送失败/丢失 ¥100-500/单",
    color: "#60a5fa",
    breakdown: [
      { label: "派送失败", val: "¥600 · 3单" },
      { label: "疑似丢件", val: "¥1,000 · 4单" },
    ],
  },
];

export default function PenaltyCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12, marginBottom: 8 }}>
      {penalties.map((p) => <PenaltyCard key={p.key} p={p} />)}
    </div>
  );
}

function PenaltyCard({ p }: { p: PenaltyType }) {
  const isUp = p.change > 0;

  return (
    <div style={{
      background: "#141414",
      border: `1px solid #222`,
      borderRadius: 10,
      overflow: "hidden",
    }}>
      {/* Top accent bar */}
      <div style={{ height: 3, background: p.color }} />

      <div style={{ padding: "16px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: `${p.color}18`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>{p.icon}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#d0d0d0" }}>{p.label}</span>
          </div>
          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 9999, color: p.color, background: `${p.color}15`, fontWeight: 600 }}>
            {p.overtimeRate}% 超时率
          </span>
        </div>

        {/* Hero amount */}
        <div style={{ marginBottom: 10 }}>
          <p style={{ margin: 0, fontSize: 10, color: "#555", marginBottom: 4 }}>预估处罚金额</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="mono" style={{ fontSize: 30, fontWeight: 800, color: p.color, letterSpacing: "-0.03em" }}>
              ¥{p.amount.toLocaleString()}
            </span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: isUp ? "#f87171" : "#34d399" }}>
                {isUp ? "▲" : "▼"} {Math.abs(p.change)}%
              </div>
              <div style={{ fontSize: 10, color: "#444" }}>同比上月</div>
            </div>
          </div>
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "#555" }}>
            涉及 <span style={{ color: "#ccc", fontWeight: 600 }}>{p.orders} 单</span>
          </p>
        </div>

        {/* Rule */}
        <div style={{ padding: "8px 10px", background: "#0e0e0e", borderRadius: 6, marginBottom: 12 }}>
          <p style={{ margin: 0, fontSize: 10, color: "#3a3a3a" }}>处罚规则：{p.rule}</p>
        </div>

        {/* Breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {p.breakdown.map((b) => (
            <div key={b.label} style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, color: "#555" }}>{b.label}</span>
              <span className="mono" style={{ fontSize: 11, color: "#888" }}>{b.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
