import { useState } from "react";

interface Alert {
  key: string;
  icon: string;
  label: string;
  count: number;
  severity: "high" | "mid" | "low";
  desc: string;
  items: string[];
}

const alerts: Alert[] = [
  {
    key: "overdue",
    icon: "⏱",
    label: "发货超时",
    count: 8,
    severity: "high",
    desc: "已超48小时未发货",
    items: ["订单 #20240709-1823 · 杏粉衬衫M · 超时52h", "订单 #20240709-1791 · 香云纱旗袍L · 超时49h", "其余6单 →"],
  },
  {
    key: "logistics",
    icon: "📦",
    label: "物流异常",
    count: 14,
    severity: "mid",
    desc: "超96h无更新或派送失败",
    items: ["顺丰 SF123456 · 广州 → 北京 · 停滞72h", "圆通 YT987654 · 显示派送失败 × 2", "其余12单 →"],
  },
  {
    key: "quality",
    icon: "↩",
    label: "售后质量退货",
    count: 3,
    severity: "low",
    desc: "质量原因退货需核查",
    items: ["香云纱旗袍·月白M · 脱线", "莨绸阔腿裤·烟灰L · 色差", "真丝衬衫·杏粉S · 尺寸偏差"],
  },
];

const severityStyle: Record<string, { border: string; badge: string; badgeText: string; dot: string }> = {
  high: { border: "var(--danger)", badge: "rgba(248,113,113,0.12)", badgeText: "var(--danger)", dot: "var(--danger)" },
  mid:  { border: "var(--warn)", badge: "rgba(251,146,60,0.12)", badgeText: "var(--warn)", dot: "var(--warn)" },
  low:  { border: "var(--text-faint)", badge: "rgba(100,100,100,0.12)", badgeText: "var(--text-muted)", dot: "var(--text-muted)" },
};

export default function AlertEntries() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {alerts.map((a) => {
        const s = severityStyle[a.severity];
        const isOpen = open === a.key;

        return (
          <div
            key={a.key}
            style={{
              background: "var(--surface)",
              border: `1px solid ${isOpen ? s.border : "var(--surface-raised)"}`,
              borderRadius: 8,
              overflow: "hidden",
              transition: "border-color 0.15s",
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : a.key)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px",
                background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: s.badge, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0,
              }}>
                {a.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{a.label}</span>
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    background: s.badge, color: s.badgeText,
                    border: `1px solid ${s.border}33`,
                    borderRadius: 4, padding: "1px 6px",
                  }}>{a.count}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, marginTop: 2 }}>{a.desc}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot,
                  boxShadow: a.severity === "high" ? `0 0 6px ${s.dot}` : "none" }} />
                <span style={{ fontSize: 12, color: "var(--text-faint)", transform: isOpen ? "rotate(90deg)" : "none", display: "inline-block", transition: "transform 0.15s" }}>›</span>
              </div>
            </button>

            {isOpen && (
              <div style={{ padding: "0 16px 14px", borderTop: "1px solid #1e1e1e" }}>
                <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                  {a.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ width: 3, height: 3, borderRadius: "50%", background: s.dot, marginTop: 6, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button style={{
                  marginTop: 10, padding: "6px 14px",
                  background: s.badge, border: `1px solid ${s.border}44`,
                  borderRadius: 6, color: s.badgeText, fontSize: 13, fontWeight: 600,
                  cursor: "pointer",
                }}>
                  查看全部 →
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
