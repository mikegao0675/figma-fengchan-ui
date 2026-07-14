import { useState } from "react";

/* ── Types ── */
interface TimeBucket {
  label: string;
  range: string;
  count: number;
  color: string;
}

interface WarningCard {
  key: string;
  icon: string;
  title: string;
  desc: string;
  connected: boolean;       // false = placeholder / 待接入
  buckets: TimeBucket[];
  total: number;
  accentColor: string;
  rule?: string;
}

/* ── Data ── */
const CONNECTED_BUCKETS = (counts: [number, number, number, number]) => [
  { label: "已超时", range: ">0h",     count: counts[0], color: "var(--danger)" },
  { label: "0–6h",  range: "剩余 <6h", count: counts[1], color: "var(--warn)" },
  { label: "6–12h", range: "剩余 6-12h",count: counts[2], color: "#fbbf24" },
  { label: "12–18h",range: "剩余 12-18h",count: counts[3],color: "#a3e635" },
];

const PLACEHOLDER_BUCKETS: TimeBucket[] = [
  { label: "已超时", range: ">0h",      count: 0, color: "var(--border-strong)" },
  { label: "0–6h",  range: "剩余 <6h",  count: 0, color: "var(--border-strong)" },
  { label: "6–12h", range: "剩余 6-12h",count: 0, color: "var(--border-strong)" },
  { label: "12–18h",range: "剩余 12-18h",count: 0, color: "var(--border-strong)" },
];

const cards: WarningCard[] = [
  {
    key: "ship-timeout",
    icon: "⏱",
    title: "发货快超时",
    desc: "距平台要求发货时间不足 18h",
    connected: true,
    buckets: CONNECTED_BUCKETS([8, 12, 19, 24]),
    total: 63,
    accentColor: "var(--danger)",
    rule: "淘宝 48h · 抖音 24h · 拼多多 24h",
  },
  {
    key: "pickup-timeout",
    icon: "📬",
    title: "揽收快超时",
    desc: "已下单物流单但快递未揽收",
    connected: true,
    buckets: CONNECTED_BUCKETS([3, 7, 11, 9]),
    total: 30,
    accentColor: "var(--warn)",
    rule: "发货后 12h 内应完成揽收",
  },
  {
    key: "pickup-stale",
    icon: "🔍",
    title: "揽收未更新",
    desc: "揽收后长时间无新轨迹",
    connected: false,
    buckets: PLACEHOLDER_BUCKETS,
    total: 0,
    accentColor: "var(--text-muted)",
    rule: "依赖快递轨迹推送 API",
  },
  {
    key: "transit-stale",
    icon: "🛰",
    title: "运输未更新",
    desc: "在途中超过 72h 无轨迹变化",
    connected: false,
    buckets: PLACEHOLDER_BUCKETS,
    total: 0,
    accentColor: "var(--text-muted)",
    rule: "依赖快递轨迹推送 API",
  },
  {
    key: "attention",
    icon: "⚠️",
    title: "重点关注",
    desc: "预发货失败 / 包裹异常 / 已取消有轨迹",
    connected: false,
    buckets: PLACEHOLDER_BUCKETS,
    total: 0,
    accentColor: "#a78bfa",
    rule: "依赖快递轨迹推送 API",
  },
];

/* ── Card component ── */
function Card({ card }: { card: WarningCard }) {
  const [expanded, setExpanded] = useState(false);
  const maxCount = Math.max(...card.buckets.map((b) => b.count), 1);

  if (!card.connected) {
    return (
      <div style={{
        background: "var(--surface)",
        border: "1px dashed #222",
        borderRadius: 10,
        padding: "16px",
        opacity: 0.65,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle diagonal pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.015) 8px, rgba(255,255,255,0.015) 10px)",
          pointerEvents: "none",
        }} />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 18, opacity: 0.4 }}>{card.icon}</span>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--text-muted)" }}>{card.title}</p>
            <p style={{ margin: 0, fontSize: 12, color: "var(--border-strong)", marginTop: 2 }}>{card.desc}</p>
          </div>
        </div>

        {/* Placeholder buckets */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {card.buckets.map((b) => (
            <div key={b.label} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: 28, background: "var(--border)", borderRadius: 3, marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "var(--border-strong)" }}>—</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "var(--border-strong)" }}>{b.label}</p>
            </div>
          ))}
        </div>

        {/* Pending badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 10px", background: "var(--surface)",
          border: "1px solid #1e1e1e", borderRadius: 6,
        }}>
          <span style={{ fontSize: 12 }}>🔌</span>
          <div>
            <p style={{ margin: 0, fontSize: 12, color: "var(--text-faint)", fontWeight: 600 }}>待接入快递轨迹源</p>
            <p style={{ margin: 0, fontSize: 12, color: "var(--border-strong)", marginTop: 1 }}>{card.rule}</p>
          </div>
        </div>
      </div>
    );
  }

  const criticalCount = card.buckets[0].count;

  return (
    <div style={{
      background: "var(--surface)",
      border: `1px solid ${expanded ? card.accentColor + "40" : "var(--surface-raised)"}`,
      borderRadius: 10,
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      {/* Top accent */}
      <div style={{ height: 3, background: card.accentColor }} />

      <div style={{ padding: "16px" }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: `${card.accentColor}18`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17,
            }}>{card.icon}</div>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>{card.title}</p>
              <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{card.desc}</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="mono" style={{ fontSize: 24, fontWeight: 800, color: card.accentColor, letterSpacing: "-0.02em" }}>{card.total}</span>
            <p style={{ margin: 0, fontSize: 12, color: "var(--text-faint)" }}>单</p>
          </div>
        </div>

        {/* Time buckets — mini bar chart */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {card.buckets.map((b) => {
              const barH = b.count > 0 ? Math.max(Math.round((b.count / maxCount) * 40), 6) : 3;
              return (
                <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span className="mono" style={{
                    fontSize: 15, fontWeight: 800,
                    color: b.count > 0 ? b.color : "var(--border-strong)",
                    lineHeight: 1,
                  }}>{b.count}</span>
                  {/* Bar */}
                  <div style={{ width: "100%", height: 40, display: "flex", alignItems: "flex-end" }}>
                    <div style={{
                      width: "100%", height: barH,
                      background: b.count > 0 ? b.color : "var(--border)",
                      borderRadius: "2px 2px 0 0",
                      opacity: b.count > 0 ? 0.85 : 1,
                      transition: "height 0.3s",
                    }} />
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--text-faint)", textAlign: "center", lineHeight: 1.3 }}>{b.label}</p>
                  <p style={{ margin: 0, fontSize: 8, color: "var(--border-strong)", textAlign: "center" }}>{b.range}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rule + CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--border-strong)" }}>{card.rule}</p>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "4px 10px",
              background: criticalCount > 0 ? `${card.accentColor}15` : "var(--border)",
              border: `1px solid ${criticalCount > 0 ? card.accentColor + "40" : "var(--border)"}`,
              borderRadius: 4, cursor: "pointer",
              color: criticalCount > 0 ? card.accentColor : "var(--text-muted)",
              fontSize: 13, fontWeight: 600,
            }}
          >
            明细 {expanded ? "▲" : "▼"}
          </button>
        </div>

        {/* Expanded mini list */}
        {expanded && (
          <div style={{ marginTop: 12, borderTop: `1px solid ${card.accentColor}20`, paddingTop: 10 }}>
            <MiniOrderList accentColor={card.accentColor} cardKey={card.key} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Mini inline order list ── */
const SAMPLE_ORDERS: Record<string, { id: string; product: string; platform: string; bucket: string; bucketColor: string }[]> = {
  "ship-timeout": [
    { id: "#1823", product: "香云纱旗袍·月白 M", platform: "抖音", bucket: "已超时", bucketColor: "var(--danger)" },
    { id: "#1867", product: "真丝衬衫·杏粉 S",  platform: "淘宝", bucket: "0–6h",  bucketColor: "var(--warn)" },
    { id: "#1834", product: "莨绸阔腿裤·烟灰 L",platform: "抖音", bucket: "0–6h",  bucketColor: "var(--warn)" },
    { id: "#1801", product: "香云纱半裙·墨绿 M",platform: "拼多多",bucket: "6–12h", bucketColor: "#fbbf24" },
  ],
  "pickup-timeout": [
    { id: "#1798", product: "莨绸外套·藏蓝 L",  platform: "淘宝", bucket: "已超时", bucketColor: "var(--danger)" },
    { id: "#1756", product: "真丝睡衣·米白 S",  platform: "抖音", bucket: "0–6h",  bucketColor: "var(--warn)" },
    { id: "#1745", product: "香云纱围巾·水蓝",  platform: "1688", bucket: "6–12h", bucketColor: "#fbbf24" },
  ],
};

function MiniOrderList({ accentColor, cardKey }: { accentColor: string; cardKey: string }) {
  const orders = SAMPLE_ORDERS[cardKey] ?? [];
  if (!orders.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {orders.map((o) => (
        <div key={o.id} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "6px 10px", background: "var(--surface)",
          border: "1px solid #1e1e1e", borderRadius: 5,
        }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", minWidth: 0 }}>
            <span className="mono" style={{ fontSize: 12, color: "var(--text-muted)", flexShrink: 0 }}>{o.id}</span>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.product}</span>
            <span style={{ fontSize: 12, color: "var(--text-faint)", flexShrink: 0 }}>{o.platform}</span>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 700, padding: "2px 6px", borderRadius: 9999,
            color: o.bucketColor, background: `${o.bucketColor}18`, flexShrink: 0,
          }}>{o.bucket}</span>
        </div>
      ))}
      <button style={{ fontSize: 12, color: accentColor, background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "2px 0", marginTop: 2 }}>
        查看全部 →
      </button>
    </div>
  );
}

export default function WarningCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginBottom: 32 }}>
      {cards.map((c) => <Card key={c.key} card={c} />)}
    </div>
  );
}
