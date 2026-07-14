import { useState } from "react";
import type { DrillOrder } from "./PenaltyPage";

interface Bucket {
  key: string;
  label: string;
  sub: string;
  orders: number;
  skus: number;
  amount: number;
  urgency: "critical" | "high" | "mid" | "low" | "safe" | "planning";
  tip: string;
  sampleOrders: DrillOrder[];
}

const buckets: Bucket[] = [
  {
    key: "overdue",
    label: "已超时",
    sub: "超48h · 已产生处罚",
    orders: 8,
    skus: 6,
    amount: 3200,
    urgency: "critical",
    tip: "已进入扣款流程，立即处理可减少后续累计",
    sampleOrders: [
      { orderId: "#1823", product: "香云纱旗袍·月白 M", platform: "抖音直播", overdue: "超时 72h", penalty: 400 },
      { orderId: "#1791", product: "莨绸阔腿裤·烟灰 L", platform: "淘宝旗舰", overdue: "超时 49h", penalty: 200 },
    ],
  },
  {
    key: "0-1d",
    label: "0–1 天",
    sub: "剩余 <24h · 紧急",
    orders: 12,
    skus: 9,
    amount: 4800,
    urgency: "high",
    tip: "今日内发货可避免处罚，优先安排",
    sampleOrders: [
      { orderId: "#1867", product: "真丝衬衫·杏粉 S", platform: "淘宝旗舰", overdue: "剩余 8h", penalty: 500 },
      { orderId: "#1834", product: "香云纱半裙·墨绿 M", platform: "抖音直播", overdue: "剩余 18h", penalty: 400 },
    ],
  },
  {
    key: "1-3d",
    label: "1–3 天",
    sub: "较紧急 · 高风险",
    orders: 16,
    skus: 11,
    amount: 6400,
    urgency: "mid",
    tip: "安排明后天发货可规避全部",
    sampleOrders: [
      { orderId: "#1901", product: "莨绸外套·藏蓝 L", platform: "批发渠道", overdue: "剩余 36h", penalty: 320 },
    ],
  },
  {
    key: "3-5d",
    label: "3–5 天",
    sub: "中风险 · 可安排",
    orders: 11,
    skus: 8,
    amount: 2200,
    urgency: "low",
    tip: "本周内按时发货即可，关注库存是否充足",
    sampleOrders: [
      { orderId: "#1956", product: "真丝睡衣套装·米白 S", platform: "淘宝旗舰", overdue: "剩余 4天", penalty: 200 },
    ],
  },
  {
    key: "5-7d",
    label: "5–7 天",
    sub: "低风险",
    orders: 9,
    skus: 7,
    amount: 900,
    urgency: "safe",
    tip: "留意库存准备，提前备货",
    sampleOrders: [],
  },
  {
    key: "7-15d",
    label: "7–15 天",
    sub: "预备期",
    orders: 7,
    skus: 5,
    amount: 700,
    urgency: "planning",
    tip: "提前规划，不紧急",
    sampleOrders: [],
  },
];

const urgencyColor: Record<string, string> = {
  critical: "var(--danger)",
  high: "var(--warn)",
  mid: "#fbbf24",
  low: "#a3e635",
  safe: "var(--success)",
  planning: "var(--text-muted)",
};

const urgencyBg: Record<string, string> = {
  critical: "var(--danger-sub)",
  high: "var(--warn-sub)",
  mid: "rgba(251,191,36,0.06)",
  low: "rgba(163,230,53,0.06)",
  safe: "rgba(52,211,153,0.06)",
  planning: "rgba(80,80,80,0.06)",
};

const maxAmount = Math.max(...buckets.map((b) => b.amount));

export default function PenaltyBuckets({ onDrill }: { onDrill: (o: DrillOrder) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ background: "var(--surface)", border: "1px solid #1e1e1e", borderRadius: 10, overflow: "hidden" }}>
      {/* Column headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr 60px 60px 100px 28px",
        gap: "0 12px",
        padding: "10px 18px",
        borderBottom: "1px solid #1a1a1a",
      }}>
        {["时长分桶", "预估处罚金额", "单数", "SKU数", "操作建议", ""].map((h) => (
          <span key={h} style={{ fontSize: 12, color: "var(--text-faint)", fontWeight: 600, letterSpacing: "0.06em" }}>{h}</span>
        ))}
      </div>

      {buckets.map((b, bi) => {
        const color = urgencyColor[b.urgency];
        const bg = urgencyBg[b.urgency];
        const barPct = Math.round((b.amount / maxAmount) * 100);
        const isOpen = expanded === b.key;

        return (
          <div key={b.key} style={{ borderBottom: bi < buckets.length - 1 ? "1px solid #181818" : "none" }}>
            <div
              onClick={() => setExpanded(isOpen ? null : b.key)}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 60px 60px 100px 28px",
                gap: "0 12px",
                padding: "13px 18px",
                cursor: "pointer",
                background: isOpen ? bg : "transparent",
                transition: "background 0.15s",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                if (!isOpen) (e.currentTarget as HTMLElement).style.background = "var(--surface-raised)";
              }}
              onMouseLeave={(e) => {
                if (!isOpen) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Bucket label */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0,
                  boxShadow: b.urgency === "critical" ? `0 0 8px ${color}` : "none" }} />
                <div>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>{b.label}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--text-faint)", marginTop: 1 }}>{b.sub}</p>
                </div>
              </div>

              {/* Bar + amount */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                  <span className="mono" style={{ fontSize: 16, fontWeight: 800, color, letterSpacing: "-0.02em" }}>
                    ¥{b.amount.toLocaleString()}
                  </span>
                </div>
                <div style={{ height: 5, background: "var(--surface-raised)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${barPct}%`, background: color,
                    borderRadius: 3, transition: "width 0.5s ease",
                    opacity: b.urgency === "planning" ? 0.4 : 1,
                  }} />
                </div>
              </div>

              {/* Order count */}
              <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)" }}>{b.orders}</span>

              {/* SKU count */}
              <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-muted)" }}>{b.skus}</span>

              {/* Tip */}
              <span style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>{b.tip}</span>

              {/* Expand chevron */}
              <span style={{ fontSize: 12, color: "var(--text-faint)", transform: isOpen ? "rotate(90deg)" : "none", display: "inline-block", transition: "transform 0.15s", textAlign: "center" }}>›</span>
            </div>

            {/* Expanded sample orders */}
            {isOpen && (
              <div style={{ background: bg, borderTop: `1px solid ${color}22`, padding: "0 18px 12px 46px" }}>
                {b.sampleOrders.length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--text-faint)", paddingTop: 10 }}>暂无需下钻的订单</p>
                ) : (
                  <>
                    <p style={{ fontSize: 12, color: "var(--text-faint)", paddingTop: 10, marginBottom: 6, fontWeight: 600, letterSpacing: "0.06em" }}>样本订单（点击查看详情）</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {b.sampleOrders.map((o) => o && (
                        <button
                          key={o.orderId}
                          onClick={(e) => { e.stopPropagation(); onDrill(o); }}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "9px 12px",
                            background: "var(--surface)", border: `1px solid #222`,
                            borderRadius: 6, cursor: "pointer", textAlign: "left",
                            transition: "border-color 0.1s",
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = color; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                        >
                          <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
                            <span className="mono" style={{ fontSize: 13, color: "var(--text-muted)", flexShrink: 0 }}>{o.orderId}</span>
                            <span style={{ fontSize: 12, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.product}</span>
                            <span style={{ fontSize: 13, color: "var(--text-faint)", flexShrink: 0 }}>{o.platform}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{o.overdue}</span>
                            <span className="mono" style={{ fontSize: 14, fontWeight: 700, color }}>¥{o.penalty}</span>
                            <span style={{ fontSize: 12, color: "var(--border-strong)" }}>›</span>
                          </div>
                        </button>
                      ))}
                      <button style={{ fontSize: 13, color: color, background: "transparent", border: "none", cursor: "pointer", textAlign: "left", paddingLeft: 12 }}>
                        查看全部 {b.orders} 单 →
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Footer total */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", background: "var(--bg)", borderTop: "1px solid #1a1a1a" }}>
        <span style={{ fontSize: 13, color: "var(--text-faint)" }}>合计 {buckets.reduce((s, b) => s + b.orders, 0)} 单 · {buckets.reduce((s, b) => s + b.skus, 0)} SKU</span>
        <span className="mono" style={{ fontSize: 16, fontWeight: 800, color: "var(--danger)" }}>
          ¥{buckets.reduce((s, b) => s + b.amount, 0).toLocaleString()} 预估总处罚
        </span>
      </div>
    </div>
  );
}
