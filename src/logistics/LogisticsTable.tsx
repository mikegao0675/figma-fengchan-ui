import { useState } from "react";

/* ── Types ── */
type LogStatus = "全部" | "无物流" | "未揽收" | "在途" | "派送中" | "已签收" | "停更" | "异常";

interface LogRow {
  internalId: string;
  trackingNo: string;
  carrier: string;
  logStatus: LogStatus;
  orderStatus: string;
  product: string;
  platform: string;
  lastUpdate: string;
  lastEvent: string;
  staleDays?: number;        // days since last update (if stale)
  hasPending: boolean;       // whether tracking source is connected for this row
}

/* ── Mock data ── */
const ALL_ROWS: LogRow[] = [
  { internalId: "#20240709-1823", trackingNo: "SF1234567890", carrier: "顺丰", logStatus: "异常",   orderStatus: "发货超时", product: "香云纱旗袍·月白 M",  platform: "抖音", lastUpdate: "07-07 10:22", lastEvent: "派送失败，无人签收", staleDays: 2, hasPending: true },
  { internalId: "#20240709-1812", trackingNo: "YT9876543210", carrier: "圆通", logStatus: "停更",   orderStatus: "已发货",  product: "莨绸阔腿裤·烟灰 L", platform: "淘宝", lastUpdate: "07-05 16:34", lastEvent: "已到达上海中转站",   staleDays: 4, hasPending: true },
  { internalId: "#20240709-1801", trackingNo: "ZT1122334455", carrier: "中通", logStatus: "在途",   orderStatus: "已发货",  product: "真丝衬衫·杏粉 S",   platform: "淘宝", lastUpdate: "07-09 08:11", lastEvent: "广州已发出，预计明日达", hasPending: true },
  { internalId: "#20240709-1798", trackingNo: "JD0099887766", carrier: "京东",  logStatus: "派送中", orderStatus: "已发货",  product: "莨绸外套·藏蓝 L",   platform: "抖音", lastUpdate: "07-09 11:45", lastEvent: "快递员正在派送中",    hasPending: true },
  { internalId: "#20240709-1791", trackingNo: "EMS5544332211",carrier: "EMS",   logStatus: "未揽收", orderStatus: "已发货",  product: "香云纱半裙·墨绿 M",  platform: "批发", lastUpdate: "07-09 09:00", lastEvent: "已下单，等待揽收",    hasPending: true },
  { internalId: "#20240709-1786", trackingNo: "—",            carrier: "—",     logStatus: "无物流", orderStatus: "待发货",  product: "真丝睡衣·米白 S",   platform: "淘宝", lastUpdate: "—",          lastEvent: "未创建物流单",        hasPending: false },
  { internalId: "#20240709-1780", trackingNo: "ST3344556677", carrier: "申通", logStatus: "已签收", orderStatus: "已完成",  product: "香云纱围巾·水蓝",   platform: "1688", lastUpdate: "07-08 14:20", lastEvent: "已签收，签收人：本人", hasPending: true },
  { internalId: "#20240709-1775", trackingNo: "YD7788996655", carrier: "韵达", logStatus: "停更",   orderStatus: "已发货",  product: "莨绸阔腿裤·烟灰 M", platform: "达人", lastUpdate: "07-04 19:55", lastEvent: "北京已发出",          staleDays: 5, hasPending: true },
  { internalId: "#20240709-1769", trackingNo: "SF9988776655", carrier: "顺丰", logStatus: "在途",   orderStatus: "已发货",  product: "香云纱旗袍·月白 L",  platform: "抖音", lastUpdate: "07-09 07:33", lastEvent: "成都已揽收，发往上海", hasPending: true },
  { internalId: "#20240709-1762", trackingNo: "—",            carrier: "—",     logStatus: "无物流", orderStatus: "待发货",  product: "真丝衬衫·杏粉 M",   platform: "淘宝", lastUpdate: "—",          lastEvent: "未创建物流单",        hasPending: false },
  { internalId: "#20240709-1755", trackingNo: "ZT8877665544", carrier: "中通", logStatus: "异常",   orderStatus: "已发货",  product: "香云纱半裙·墨绿 L",  platform: "淘宝", lastUpdate: "07-06 22:10", lastEvent: "包裹扫描异常，已转客服",staleDays: 3, hasPending: true },
  { internalId: "#20240709-1748", trackingNo: "YT6655443322", carrier: "圆通", logStatus: "已签收", orderStatus: "已完成",  product: "莨绸外套·藏蓝 M",   platform: "批发", lastUpdate: "07-08 16:08", lastEvent: "已签收",              hasPending: true },
];

const TAB_ORDER: LogStatus[] = ["全部", "无物流", "未揽收", "在途", "派送中", "已签收", "停更", "异常"];

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  "全部":   { color: "#888",   bg: "#1e1e1e" },
  "无物流": { color: "#555",   bg: "#1a1a1a" },
  "未揽收": { color: "#8a8a8a",bg: "#1e1e1e" },
  "在途":   { color: "#60a5fa",bg: "rgba(96,165,250,0.1)" },
  "派送中": { color: "#a78bfa",bg: "rgba(167,139,250,0.1)" },
  "已签收": { color: "#34d399",bg: "rgba(52,211,153,0.1)" },
  "停更":   { color: "#fb923c",bg: "rgba(251,146,60,0.1)" },
  "异常":   { color: "#f87171",bg: "rgba(248,113,113,0.1)" },
};

const ORDER_STATUS_STYLE: Record<string, string> = {
  "待发货":   "#fb923c",
  "已发货":   "#60a5fa",
  "发货超时": "#f87171",
  "已完成":   "#34d399",
};

export default function LogisticsTable() {
  const [activeTab, setActiveTab] = useState<LogStatus>("全部");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = ALL_ROWS.filter((r) => {
    const matchTab = activeTab === "全部" || r.logStatus === activeTab;
    const matchSearch = !search ||
      r.internalId.includes(search) ||
      r.trackingNo.includes(search) ||
      r.product.includes(search);
    return matchTab && matchSearch;
  });

  const counts: Record<string, number> = { "全部": ALL_ROWS.length };
  ALL_ROWS.forEach((r) => {
    counts[r.logStatus] = (counts[r.logStatus] ?? 0) + 1;
  });

  return (
    <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, overflow: "hidden" }}>

      {/* Tab bar + search */}
      <div style={{ borderBottom: "1px solid #1a1a1a" }}>
        {/* Status tabs — scrollable on mobile */}
        <div style={{ display: "flex", overflowX: "auto", padding: "0 16px" }}>
          {TAB_ORDER.map((tab) => {
            const cnt = counts[tab] ?? 0;
            const s = STATUS_STYLE[tab];
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "11px 12px", whiteSpace: "nowrap",
                  background: "transparent", border: "none",
                  borderBottom: `2px solid ${isActive ? s.color : "transparent"}`,
                  cursor: "pointer", marginBottom: -1,
                  transition: "color 0.12s",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: isActive ? 700 : 400, color: isActive ? s.color : "#444" }}>{tab}</span>
                {cnt > 0 && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, minWidth: 18, textAlign: "center",
                    padding: "1px 5px", borderRadius: 9999,
                    color: isActive ? s.color : "#444",
                    background: isActive ? s.bg : "#1a1a1a",
                  }}>{cnt}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search + filter row */}
        <div style={{ display: "flex", gap: 8, padding: "10px 16px", borderTop: "1px solid #181818" }}>
          <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
            <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "#444", fontSize: 12 }}>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索单号 / 商品名"
              style={{
                width: "100%", paddingLeft: 28, padding: "6px 10px 6px 28px",
                background: "#0e0e0e", border: "1px solid #222",
                borderRadius: 4, color: "#ccc", fontSize: 12, outline: "none",
              }}
            />
          </div>
          <span style={{ fontSize: 11, color: "#444", alignSelf: "center", marginLeft: 4 }}>共 {filtered.length} 条</span>
        </div>
      </div>

      {/* Column headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "160px 140px 80px 90px 90px 1fr 80px",
        padding: "8px 16px",
        borderBottom: "1px solid #181818",
        overflowX: "auto",
        minWidth: 760,
      }}>
        {["内部单号", "物流单号", "物流公司", "物流状态", "订单状态", "最新轨迹", "更新时间"].map((h) => (
          <span key={h} style={{ fontSize: 10, color: "#3a3a3a", fontWeight: 700, letterSpacing: "0.06em" }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ overflowX: "auto", minWidth: 760 }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#333" }}>
            <p style={{ margin: 0, fontSize: 13 }}>暂无数据</p>
          </div>
        ) : (
          filtered.map((row, ri) => {
            const ls = STATUS_STYLE[row.logStatus];
            const isOpen = expandedRow === row.internalId;
            const isStale = row.logStatus === "停更" || row.logStatus === "异常";

            return (
              <div key={row.internalId} style={{ borderBottom: ri < filtered.length - 1 ? "1px solid #181818" : "none" }}>
                {/* Main row */}
                <div
                  onClick={() => setExpandedRow(isOpen ? null : row.internalId)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 140px 80px 90px 90px 1fr 80px",
                    padding: "11px 16px",
                    cursor: "pointer",
                    background: isOpen ? "#181818" : "transparent",
                    alignItems: "center",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "#161616"; }}
                  onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {/* Internal ID */}
                  <div>
                    <p className="mono" style={{ margin: 0, fontSize: 11, color: "#60a5fa" }}>{row.internalId}</p>
                    <p style={{ margin: 0, fontSize: 10, color: "#444", marginTop: 2 }}>{row.product}</p>
                  </div>

                  {/* Tracking no */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {row.trackingNo !== "—" ? (
                      <span className="mono" style={{ fontSize: 11, color: "#888" }}>{row.trackingNo.slice(0, 12)}</span>
                    ) : (
                      <span style={{ fontSize: 11, color: "#2a2a2a", fontStyle: "italic" }}>未填写</span>
                    )}
                  </div>

                  {/* Carrier */}
                  <span style={{ fontSize: 12, color: row.carrier !== "—" ? "#aaa" : "#2a2a2a" }}>{row.carrier}</span>

                  {/* Log status chip */}
                  <span style={{
                    display: "inline-block", fontSize: 11, fontWeight: 700,
                    padding: "2px 8px", borderRadius: 9999,
                    color: ls.color, background: ls.bg,
                  }}>{row.logStatus}</span>

                  {/* Order status */}
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: ORDER_STATUS_STYLE[row.orderStatus] ?? "#888",
                  }}>{row.orderStatus}</span>

                  {/* Last event */}
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: isStale ? "#555" : "#aaa" }}>{row.lastEvent}</p>
                    {!row.hasPending && (
                      <p style={{ margin: 0, fontSize: 9, color: "#2e2e2e", marginTop: 2 }}>轨迹源待接入</p>
                    )}
                  </div>

                  {/* Last update */}
                  <div style={{ textAlign: "right" }}>
                    <p className="mono" style={{ margin: 0, fontSize: 10, color: isStale ? "#555" : "#555" }}>{row.lastUpdate}</p>
                    {row.staleDays && (
                      <p style={{ margin: 0, fontSize: 9, fontWeight: 700, color: row.staleDays >= 4 ? "#f87171" : "#fb923c", marginTop: 2 }}>
                        停更 {row.staleDays}天
                      </p>
                    )}
                  </div>
                </div>

                {/* Expanded row — timeline placeholder */}
                {isOpen && (
                  <div style={{ padding: "12px 16px 16px 32px", background: "#0f0f0f", borderTop: "1px solid #181818" }}>
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                      {/* Timeline */}
                      <div style={{ flex: 1, minWidth: 240 }}>
                        <p style={{ margin: "0 0 10px", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#444" }}>物流轨迹</p>
                        {row.hasPending ? (
                          <TrackingTimeline row={row} />
                        ) : (
                          <PendingPlaceholder label="物流轨迹" />
                        )}
                      </div>
                      {/* Order meta */}
                      <div style={{ width: 200, flexShrink: 0 }}>
                        <p style={{ margin: "0 0 10px", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#444" }}>订单信息</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          {[
                            ["商品", row.product],
                            ["平台", row.platform],
                            ["物流公司", row.carrier],
                            ["内部单号", row.internalId],
                          ].map(([k, v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                              <span style={{ fontSize: 11, color: "#444" }}>{k}</span>
                              <span className="mono" style={{ fontSize: 11, color: "#888" }}>{v}</span>
                            </div>
                          ))}
                        </div>
                        <button style={{
                          marginTop: 12, width: "100%", padding: "7px",
                          background: "#1a1a1a", border: "1px solid #222",
                          borderRadius: 5, color: "#888", fontSize: 11, fontWeight: 600, cursor: "pointer",
                        }}>
                          查看完整订单 →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderTop: "1px solid #181818", background: "#0e0e0e" }}>
        <span style={{ fontSize: 11, color: "#3a3a3a" }}>共 {ALL_ROWS.length} 条物流记录</span>
        <div style={{ display: "flex", gap: 12 }}>
          {[["停更", "#fb923c", counts["停更"] ?? 0], ["异常", "#f87171", counts["异常"] ?? 0]].map(([label, color, cnt]) => (
            <span key={label as string} style={{ fontSize: 11, color: color as string }}>
              {label} {cnt as number} 单
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Tracking timeline (mock) ── */
function TrackingTimeline({ row }: { row: LogRow }) {
  type TrackEvent = { time: string; text: string; highlight?: boolean; stale?: boolean };
  const events: TrackEvent[] = row.logStatus === "异常"
    ? [
        { time: row.lastUpdate, text: row.lastEvent, highlight: true },
        { time: "07-07 08:00", text: "到达目的地网点" },
        { time: "07-06 20:12", text: "已到达派送城市" },
        { time: "07-06 09:45", text: "在途中转，预计明日到达" },
      ]
    : row.logStatus === "停更"
    ? [
        { time: row.lastUpdate, text: row.lastEvent, stale: true },
        { time: "更早记录", text: "已揽收，发往目的地" },
      ]
    : [
        { time: row.lastUpdate, text: row.lastEvent },
        { time: "更早", text: "快递已揽收" },
      ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {events.map((ev, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", marginTop: 3,
              background: ev.highlight ? "#f87171" : ev.stale ? "#fb923c" : "#333",
              boxShadow: ev.highlight ? "0 0 6px #f87171" : "none",
            }} />
            {i < events.length - 1 && <div style={{ width: 1, height: 20, background: "#1e1e1e", marginTop: 2 }} />}
          </div>
          <div style={{ paddingBottom: 16 }}>
            <p style={{ margin: 0, fontSize: 11, color: ev.highlight ? "#f87171" : ev.stale ? "#555" : "#888" }}>{ev.text}</p>
            <p className="mono" style={{ margin: 0, fontSize: 9, color: "#333", marginTop: 2 }}>{ev.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Pending placeholder ── */
function PendingPlaceholder({ label }: { label: string }) {
  return (
    <div style={{
      padding: "14px", background: "#141414",
      border: "1px dashed #1e1e1e", borderRadius: 6,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ fontSize: 16, opacity: 0.4 }}>🔌</span>
      <div>
        <p style={{ margin: 0, fontSize: 11, color: "#3a3a3a", fontWeight: 600 }}>{label} 待接入</p>
        <p style={{ margin: 0, fontSize: 10, color: "#2a2a2a", marginTop: 2 }}>接入快递100 / 菜鸟轨迹API后展示</p>
      </div>
    </div>
  );
}
