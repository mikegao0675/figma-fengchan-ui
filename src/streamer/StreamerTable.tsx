import React, { useState } from "react";
import type { StreamerGroup } from "./data";

const fmt = (n: number) => "¥" + n.toLocaleString();
const pct = (n: number) => n.toFixed(1) + "%";

function RefundBadge({ rate }: { rate: number }) {
  const bad = rate >= 20;
  const warn = rate >= 15;
  return (
    <span
      className="mono"
      style={{
        color: bad ? "var(--danger)" : warn ? "var(--warn)" : "var(--text-muted)",
        fontWeight: bad ? 700 : 400,
        display: "inline-flex", alignItems: "center", gap: 4,
      }}
    >
      {bad && <span style={{ fontSize: 12 }}>▲</span>}
      {pct(rate)}
    </span>
  );
}

interface Props {
  groups: StreamerGroup[];
  sortKey: "sales" | "orders" | "refundRate";
  onSortKey: (k: "sales" | "orders" | "refundRate") => void;
}

export default function StreamerTable({ groups, sortKey, onSortKey }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const SortTh = ({
    label, k, right,
  }: { label: string; k: "sales" | "orders" | "refundRate"; right?: boolean }) => (
    <th
      onClick={() => onSortKey(k)}
      style={{
        padding: "9px 12px",
        textAlign: right ? "right" : "left",
        fontWeight: 600, fontSize: 13,
        letterSpacing: "0.06em", color: sortKey === k ? "var(--text-primary)" : "var(--text-faint)",
        cursor: "pointer", userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      <span style={{ marginLeft: 4, opacity: sortKey === k ? 1 : 0.3, fontSize: 12 }}>
        {sortKey === k ? "↓" : "↕"}
      </span>
    </th>
  );

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid #222",
      borderRadius: 8, overflow: "hidden",
    }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e1e1e" }}>
              <th style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", color: "var(--text-faint)", width: 36 }}>#</th>
              <th style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", color: "var(--text-faint)" }}>主播分组</th>
              <SortTh label="销售金额" k="sales" right />
              <SortTh label="订单数" k="orders" right />
              <th style={{ padding: "9px 12px", textAlign: "right", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", color: "var(--text-faint)" }}>件数</th>
              <SortTh label="退款率" k="refundRate" right />
              <th style={{ padding: "9px 12px", textAlign: "right", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", color: "var(--text-faint)", whiteSpace: "nowrap" }}>关联店铺</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {groups.map((g, i) => {
              const isOpen = expanded.has(g.id);
              const totalSales = groups.reduce((s, x) => s + x.sales, 0);
              const shareW = totalSales ? (g.sales / totalSales) * 100 : 0;

              return (
                <React.Fragment key={g.id}>
                  <tr
                    onClick={() => toggle(g.id)}
                    style={{
                      borderBottom: isOpen ? "none" : "1px solid #1a1a1a",
                      cursor: "pointer",
                      transition: "background 0.1s",
                      background: isOpen ? "var(--surface-raised)" : "transparent",
                    }}
                    onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "var(--surface-raised)"; }}
                    onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {/* Rank */}
                    <td style={{ padding: "11px 12px" }}>
                      <span className="mono" style={{
                        fontSize: 12, fontWeight: 700,
                        color: i < 3 ? "var(--text-primary)" : "var(--text-faint)",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </td>

                    {/* Group name + share bar */}
                    <td style={{ padding: "11px 12px", minWidth: 160 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 5 }}>
                        {g.name}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{
                          height: 3, borderRadius: 2,
                          background: "var(--border-strong)", width: 80, flexShrink: 0,
                          overflow: "hidden",
                        }}>
                          <div style={{ width: `${shareW}%`, height: "100%", background: "var(--text-muted)", borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>{shareW.toFixed(1)}%</span>
                      </div>
                    </td>

                    {/* Sales */}
                    <td style={{ padding: "11px 12px", textAlign: "right" }}>
                      <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{fmt(g.sales)}</span>
                    </td>

                    {/* Orders */}
                    <td style={{ padding: "11px 12px", textAlign: "right" }}>
                      <span className="mono" style={{ fontSize: 13, color: "var(--text-secondary)" }}>{g.orders.toLocaleString()}</span>
                    </td>

                    {/* Qty */}
                    <td style={{ padding: "11px 12px", textAlign: "right" }}>
                      <span className="mono" style={{ fontSize: 13, color: "var(--text-secondary)" }}>{g.qty.toLocaleString()}</span>
                    </td>

                    {/* Refund rate */}
                    <td style={{ padding: "11px 12px", textAlign: "right" }}>
                      <RefundBadge rate={g.refundRate} />
                    </td>

                    {/* Store count */}
                    <td style={{ padding: "11px 12px", textAlign: "right" }}>
                      <span className="mono" style={{ fontSize: 13, color: "var(--text-muted)" }}>{g.storeCount}</span>
                    </td>

                    {/* Expand toggle */}
                    <td style={{ padding: "11px 8px", textAlign: "center" }}>
                      <span style={{
                        fontSize: 12, color: "var(--text-faint)",
                        display: "inline-block",
                        transition: "transform 0.2s",
                        transform: isOpen ? "rotate(90deg)" : "none",
                      }}>▶</span>
                    </td>
                  </tr>

                  {/* Expanded detail rows */}
                  {isOpen && (
                    <tr>
                      <td colSpan={8} style={{ padding: "0 0 4px", background: "var(--surface-raised)", borderBottom: "1px solid #1a1a1a" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr style={{ borderTop: "1px solid #222" }}>
                              <th style={{ padding: "7px 12px 7px 48px", textAlign: "left", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "var(--border-strong)" }}>达人号</th>
                              <th style={{ padding: "7px 12px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "var(--border-strong)" }}>平台</th>
                              <th style={{ padding: "7px 12px", textAlign: "left", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "var(--border-strong)" }}>店铺</th>
                              <th style={{ padding: "7px 12px", textAlign: "right", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "var(--border-strong)" }}>销售额</th>
                              <th style={{ padding: "7px 12px", textAlign: "right", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "var(--border-strong)" }}>订单</th>
                              <th style={{ padding: "7px 12px", textAlign: "right", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "var(--border-strong)" }}>件数</th>
                              <th style={{ padding: "7px 12px", textAlign: "right", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", color: "var(--border-strong)" }}>退款率</th>
                            </tr>
                          </thead>
                          <tbody>
                            {g.details.map((d, di) => (
                              <tr
                                key={di}
                                style={{ borderTop: "1px solid #1d1d1d" }}
                              >
                                <td style={{ padding: "8px 12px 8px 48px", fontSize: 12, color: "var(--text-muted)", fontFamily: "monospace" }}>{d.kolId}</td>
                                <td style={{ padding: "8px 12px" }}>
                                  <span style={{
                                    fontSize: 12, padding: "2px 6px", borderRadius: 3,
                                    background: "var(--surface-raised)", color: "var(--text-muted)",
                                    border: "1px solid #2a2a2a",
                                  }}>{d.platform}</span>
                                </td>
                                <td style={{ padding: "8px 12px", fontSize: 12, color: "var(--text-muted)" }}>{d.store}</td>
                                <td style={{ padding: "8px 12px", textAlign: "right" }}>
                                  <span className="mono" style={{ fontSize: 12, color: "var(--text-secondary)" }}>{fmt(d.sales)}</span>
                                </td>
                                <td style={{ padding: "8px 12px", textAlign: "right" }}>
                                  <span className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{d.orders}</span>
                                </td>
                                <td style={{ padding: "8px 12px", textAlign: "right" }}>
                                  <span className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>{d.qty}</span>
                                </td>
                                <td style={{ padding: "8px 12px", textAlign: "right" }}>
                                  <RefundBadge rate={d.refundRate} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
