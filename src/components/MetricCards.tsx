import type { DrillDownTarget } from "../types";

interface Metric {
  label: string;
  value: string;
  sub?: string;
  change?: number;
  unit?: string;
  pending?: boolean;
  color?: string;
}

const metrics: Metric[] = [
  { label: "今日销售额", value: "128,460", unit: "元", change: 12.3 },
  { label: "今日净销售额", value: "112,830", unit: "元", change: 8.7 },
  { label: "今日发货", value: "347", unit: "单", sub: "1,284件 · ¥98,200", change: -3.2 },
  { label: "待发货订单", value: "56", unit: "单", change: 22.1, color: "var(--warn)" },
  { label: "今日退款", value: "4,320", unit: "元", sub: "12单", change: -18.4 },
  { label: "毛利 / 成本", value: "—", pending: true },
];

export default function MetricCards({ onDrill }: { onDrill: (t: DrillDownTarget) => void }) {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-8"
    >
      {metrics.map((m) => (
        <MetricCard key={m.label} metric={m} onDrill={onDrill} />
      ))}
    </div>
  );
}

function MetricCard({ metric: m, onDrill }: { metric: Metric; onDrill: (t: DrillDownTarget) => void }) {
  const isUp = (m.change ?? 0) > 0;
  const changeColor = isUp ? "var(--success)" : "var(--danger)";

  if (m.pending) {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px dashed #222",
          borderRadius: 8,
          padding: "16px",
          opacity: 0.5,
        }}
      >
        <p style={{ fontSize: 13, color: "var(--text-faint)", marginBottom: 8 }}>{m.label}</p>
        <p className="mono" style={{ fontSize: 22, fontWeight: 700, color: "var(--border-strong)" }}>—</p>
        <p style={{ fontSize: 12, color: "var(--border-strong)", marginTop: 4 }}>待接入</p>
      </div>
    );
  }

  return (
    <button
      onClick={() => onDrill({ type: m.label, label: m.label })}
      style={{
        background: "var(--surface)",
        border: "1px solid #222",
        borderRadius: 8,
        padding: "16px",
        textAlign: "left",
        cursor: "pointer",
        transition: "border-color 0.15s, background 0.15s",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-strong)";
        (e.currentTarget as HTMLButtonElement).style.background = "var(--surface-raised)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLButtonElement).style.background = "var(--surface)";
      }}
    >
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8, lineHeight: 1 }}>{m.label}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span className="mono" style={{ fontSize: 24, fontWeight: 700, color: m.color ?? "var(--text-primary)", letterSpacing: "-0.02em" }}>
          {m.value}
        </span>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{m.unit}</span>
      </div>
      {m.sub && <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 4 }}>{m.sub}</p>}
      {m.change !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 6 }}>
          <span style={{ fontSize: 12, color: changeColor }}>
            {isUp ? "▲" : "▼"} {Math.abs(m.change)}%
          </span>
          <span style={{ fontSize: 12, color: "var(--border-strong)" }}>同比</span>
        </div>
      )}
    </button>
  );
}
