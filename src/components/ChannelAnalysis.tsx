import { useState } from "react";
import type { DrillDownTarget } from "../types";

interface Channel {
  name: string;
  amount: number;
  orders: number;
  items: number;
  color: string;
  shops?: Channel[];
}

const channels: Channel[] = [
  {
    name: "抖音直播",
    amount: 58600,
    orders: 142,
    items: 487,
    color: "#a78bfa",
    shops: [
      { name: "凤婵旗舰直播间", amount: 42300, orders: 98, items: 341, color: "#a78bfa" },
      { name: "凤婵香云纱专场", amount: 16300, orders: 44, items: 146, color: "#a78bfa" },
    ],
  },
  {
    name: "淘宝/天猫",
    amount: 34200,
    orders: 89,
    items: 312,
    color: "#fb923c",
    shops: [
      { name: "凤婵官方旗舰店", amount: 24800, orders: 61, items: 214, color: "#fb923c" },
      { name: "凤婵香云纱专馆", amount: 9400, orders: 28, items: 98, color: "#fb923c" },
    ],
  },
  {
    name: "批发渠道",
    amount: 21400,
    orders: 67,
    items: 384,
    color: "#34d399",
    shops: [
      { name: "广州档口批发", amount: 14200, orders: 42, items: 256, color: "#34d399" },
      { name: "1688线上批发", amount: 7200, orders: 25, items: 128, color: "#34d399" },
    ],
  },
  {
    name: "达人供货",
    amount: 14260,
    orders: 49,
    items: 101,
    color: "#38bdf8",
  },
];

const total = channels.reduce((s, c) => s + c.amount, 0);
type Tab = "amount" | "orders" | "items";

export default function ChannelAnalysis({ onDrill }: { onDrill: (t: DrillDownTarget) => void }) {
  const [tab, setTab] = useState<Tab>("amount");
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = [...channels].sort((a, b) => b[tab === "amount" ? "amount" : tab === "orders" ? "orders" : "items"] - a[tab === "amount" ? "amount" : tab === "orders" ? "orders" : "items"]);
  const maxVal = sorted[0]?.[tab === "amount" ? "amount" : tab === "orders" ? "orders" : "items"] ?? 1;

  const tabLabels: { key: Tab; label: string }[] = [
    { key: "amount", label: "金额" },
    { key: "orders", label: "订单" },
    { key: "items", label: "件数" },
  ];

  return (
    <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 8, padding: 16, height: "100%" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {tabLabels.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "4px 10px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: tab === t.key ? "#f0f0f0" : "#1e1e1e",
              color: tab === t.key ? "#0c0c0c" : "#555",
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: "#333", alignSelf: "center" }}>今日</span>
      </div>

      {/* Channel rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sorted.map((ch) => {
          const val = tab === "amount" ? ch.amount : tab === "orders" ? ch.orders : ch.items;
          const pct = Math.round((ch.amount / total) * 100);
          const barW = Math.round((val / maxVal) * 100);
          const isOpen = expanded === ch.name;

          return (
            <div key={ch.name}>
              <button
                onClick={() => {
                  if (ch.shops) setExpanded(isOpen ? null : ch.name);
                  else onDrill({ type: "渠道", label: ch.name });
                }}
                style={{
                  width: "100%",
                  background: isOpen ? "#1a1a1a" : "transparent",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 8px",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 3, height: 14, borderRadius: 2, background: ch.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "#ccc" }}>{ch.name}</span>
                    {ch.shops && <span style={{ fontSize: 9, color: "#444" }}>▾</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "#f0f0f0" }}>
                      {tab === "amount" ? `¥${(val / 10000).toFixed(1)}万` : val}
                    </span>
                    <span style={{ fontSize: 10, color: "#444", width: 28, textAlign: "right" }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ height: 3, background: "#1e1e1e", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${barW}%`, background: ch.color, borderRadius: 2, transition: "width 0.4s" }} />
                </div>
              </button>

              {/* Sub-shops */}
              {isOpen && ch.shops && (
                <div style={{ marginLeft: 16, marginBottom: 4 }}>
                  {ch.shops.map((s) => {
                    const sv = tab === "amount" ? s.amount : tab === "orders" ? s.orders : s.items;
                    const sbW = Math.round((sv / maxVal) * 100);
                    return (
                      <button
                        key={s.name}
                        onClick={() => onDrill({ type: "店铺", label: s.name })}
                        style={{
                          width: "100%", background: "transparent", border: "none",
                          borderRadius: 4, padding: "6px 8px", cursor: "pointer", textAlign: "left",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 11, color: "#666" }}>{s.name}</span>
                          <span className="mono" style={{ fontSize: 11, color: "#888" }}>
                            {tab === "amount" ? `¥${(sv / 10000).toFixed(1)}万` : sv}
                          </span>
                        </div>
                        <div style={{ height: 2, background: "#1e1e1e", borderRadius: 1, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${sbW}%`, background: ch.color, opacity: 0.5, borderRadius: 1 }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #1e1e1e", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "#444" }}>合计</span>
        <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "#f0f0f0" }}>¥{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
