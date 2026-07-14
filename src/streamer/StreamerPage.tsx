import { useState, useMemo } from "react";
import { STREAMER_GROUPS, UNGROUPED_SALES, UNGROUPED_ORDERS } from "./data";
import StreamerTable from "./StreamerTable";
import GroupPanel from "./GroupPanel";

type QuickRange = 7 | 30 | 90;
type SortKey = "sales" | "orders" | "refundRate";

function StatCard({
  label, value, sub, accent, note,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  note?: string;
}) {
  return (
    <div style={{
      background: "var(--surface)",
      border: `1px solid ${accent ? "rgba(248,113,113,0.25)" : "var(--border)"}`,
      borderRadius: 8,
      padding: "16px 18px",
      display: "flex", flexDirection: "column", gap: 6,
      minWidth: 0,
    }}>
      <div style={{ fontSize: 13, color: "var(--text-faint)", letterSpacing: "0.08em", fontWeight: 600 }}>{label}</div>
      <div
        className="mono"
        style={{
          fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em",
          color: accent ? "var(--danger)" : "var(--text-primary)",
          lineHeight: 1,
        }}
      >{value}</div>
      {sub && <div style={{ fontSize: 13, color: "var(--text-faint)" }}>{sub}</div>}
      {note && (
        <div style={{
          fontSize: 12, color: "#c0392b",
          display: "flex", alignItems: "center", gap: 4, marginTop: 2,
        }}>
          <span>⚠</span>{note}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", color: "var(--text-muted)", textTransform: "uppercase" }}>{label}</h2>
      {sub && <span style={{ fontSize: 13, color: "var(--border-strong)" }}>{sub}</span>}
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

export default function StreamerPage() {
  const [quickRange, setQuickRange] = useState<QuickRange>(30);
  const [dateFrom, setDateFrom] = useState("2026-06-14");
  const [dateTo, setDateTo] = useState("2026-07-14");
  const [refreshing, setRefreshing] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("sales");
  const [panelOpen, setPanelOpen] = useState(false);

  const handleQuick = (d: QuickRange) => {
    setQuickRange(d);
    const to = new Date("2026-07-14");
    const from = new Date(to);
    from.setDate(from.getDate() - d + 1);
    setDateFrom(from.toISOString().slice(0, 10));
    setDateTo(to.toISOString().slice(0, 10));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const sorted = useMemo(() => {
    return [...STREAMER_GROUPS].sort((a, b) =>
      sortKey === "refundRate" ? b.refundRate - a.refundRate : b[sortKey] - a[sortKey]
    );
  }, [sortKey]);

  const totalSales = STREAMER_GROUPS.reduce((s, g) => s + g.sales, 0) + UNGROUPED_SALES;
  const groupedSales = STREAMER_GROUPS.reduce((s, g) => s + g.sales, 0);
  const groupedOrdersRatio = Math.round(
    (STREAMER_GROUPS.reduce((s, g) => s + g.orders, 0) /
      (STREAMER_GROUPS.reduce((s, g) => s + g.orders, 0) + UNGROUPED_ORDERS)) * 100
  );

  return (
    <div style={{ background: "var(--bg)", color: "var(--text-primary)", minHeight: "100%" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 16px 80px" }} className="md:px-8 md:py-6">

        {/* ── Top operation bar ── */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center",
          marginBottom: 20,
          background: "var(--surface)", border: "1px solid #1e1e1e", borderRadius: 8,
          padding: "12px 16px",
        }}>
          {/* Date range */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "var(--text-faint)" }}>统计区间</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); setQuickRange(0 as QuickRange); }}
              style={{
                padding: "5px 8px", borderRadius: 4, border: "1px solid #2a2a2a",
                background: "var(--bg)", color: "var(--text-muted)", fontSize: 12, outline: "none",
                fontFamily: "inherit",
              }}
            />
            <span style={{ fontSize: 13, color: "var(--border-strong)" }}>—</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); setQuickRange(0 as QuickRange); }}
              style={{
                padding: "5px 8px", borderRadius: 4, border: "1px solid #2a2a2a",
                background: "var(--bg)", color: "var(--text-muted)", fontSize: 12, outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Quick buttons */}
          <div style={{ display: "flex", gap: 4 }}>
            {([7, 30, 90] as QuickRange[]).map((d) => (
              <button
                key={d}
                onClick={() => handleQuick(d)}
                style={{
                  padding: "5px 12px", borderRadius: 4, fontSize: 12, fontWeight: 600,
                  border: "1px solid #2a2a2a",
                  background: quickRange === d ? "var(--text-primary)" : "transparent",
                  color: quickRange === d ? "var(--bg)" : "var(--text-muted)",
                  cursor: "pointer", transition: "all 0.12s",
                }}
              >近{d}天</button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Manage groups button */}
          <button
            onClick={() => setPanelOpen(true)}
            style={{
              padding: "6px 14px", borderRadius: 5, fontSize: 12, fontWeight: 600,
              background: "transparent", border: "1px solid #333",
              color: "var(--text-muted)", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            管理分组
          </button>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            style={{
              padding: "6px 14px", borderRadius: 5, fontSize: 12, fontWeight: 600,
              background: "transparent", border: "1px solid #2a2a2a",
              color: "var(--text-muted)", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              transition: "color 0.15s",
            }}
          >
            <svg
              width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              style={{ transition: "transform 0.6s", transform: refreshing ? "rotate(360deg)" : "none" }}
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            {refreshing ? "刷新中…" : "刷新"}
          </button>
        </div>

        {/* ── 4 stat cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          marginBottom: 24,
        }} className="md:grid-cols-4">
          <StatCard
            label="直播销售总额"
            value={`¥${(totalSales / 10000).toFixed(1)}万`}
            sub={`¥${totalSales.toLocaleString()} · ${dateFrom} ~ ${dateTo}`}
          />
          <StatCard
            label="主播分组数"
            value={String(STREAMER_GROUPS.length)}
            sub={`含 ${STREAMER_GROUPS.reduce((s, g) => s + g.details.length, 0)} 个达人号`}
          />
          <StatCard
            label="已分组订单占比"
            value={`${groupedOrdersRatio}%`}
            sub={`¥${groupedSales.toLocaleString()} 已归因`}
          />
          <StatCard
            label="未分组销售额"
            value={`¥${UNGROUPED_SALES.toLocaleString()}`}
            sub={`${UNGROUPED_ORDERS} 单待归因`}
            accent
            note="影响归因准确度，请及时处理"
          />
        </div>

        {/* ── Main ranking table ── */}
        <SectionLabel
          label="主播排行"
          sub={`按${sortKey === "sales" ? "销售金额" : sortKey === "orders" ? "订单数" : "退款率"}排序 · 点击行展开明细`}
        />
        <StreamerTable groups={sorted} sortKey={sortKey} onSortKey={setSortKey} />

        {/* ── Bottom note ── */}
        <div style={{
          marginTop: 24, padding: "10px 14px",
          borderTop: "1px solid #1a1a1a",
          fontSize: 12, color: "var(--border-strong)", lineHeight: 1.8,
        }}>
          数据口径：含已配送、已签收状态订单；退款率 = 退款订单数 ÷ 总订单数；销售额为实付金额（已扣优惠券/运费）；主播归因依据达人号关联规则匹配，未匹配订单计入「未分组」；统计时区 UTC+8；数据延迟约 15 分钟。
        </div>
      </div>

      {/* Group management panel */}
      {panelOpen && <GroupPanel onClose={() => setPanelOpen(false)} />}
    </div>
  );
}
