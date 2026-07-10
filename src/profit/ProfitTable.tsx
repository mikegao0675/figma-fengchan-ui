import { useState } from "react";

/* ── Tier config ── */
type Tier = "all" | "high" | "normal" | "low" | "negative";
const TIERS: { key: Tier; label: string; sub: string; color: string; range: string }[] = [
  { key: "all",      label: "全部",   sub: "",           color: "#888",   range: "" },
  { key: "high",     label: "高利润款", sub: "≥20%",     color: "#34d399",range: "利润率 ≥20%" },
  { key: "normal",   label: "普通款",  sub: "5–20%",     color: "#60a5fa",range: "利润率 5–20%" },
  { key: "low",      label: "低利润款",sub: "0–5%",      color: "#fbbf24",range: "利润率 0–5%" },
  { key: "negative", label: "负利润款",sub: "<0%",        color: "#f87171",range: "利润率 <0%" },
];

/* ── View dimension ── */
type Dim = "sku" | "link" | "style";
const DIMS: { key: Dim; label: string }[] = [
  { key: "sku",   label: "按 SKU" },
  { key: "link",  label: "按链接" },
  { key: "style", label: "按款" },
];

/* ── Data ── */
interface Row {
  img: string;
  name: string;
  sku: string;
  platform: string;
  netSales: number;
  netQty: number;
  tier: Tier;
}

const ROWS: Row[] = [
  { img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=56&h=56&fit=crop&auto=format", name: "香云纱真丝旗袍·月白", sku: "HYS-001-M", platform: "抖音", netSales: 68400, netQty: 98,  tier: "high" },
  { img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=56&h=56&fit=crop&auto=format", name: "香云纱真丝旗袍·月白", sku: "HYS-001-L", platform: "淘宝", netSales: 41600, netQty: 61,  tier: "high" },
  { img: "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?w=56&h=56&fit=crop&auto=format", name: "莨绸阔腿裤·烟灰",   sku: "LZC-023-M", platform: "抖音", netSales: 32800, netQty: 78,  tier: "normal" },
  { img: "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?w=56&h=56&fit=crop&auto=format", name: "莨绸阔腿裤·烟灰",   sku: "LZC-023-L", platform: "批发", netSales: 18200, netQty: 43,  tier: "normal" },
  { img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4cd9?w=56&h=56&fit=crop&auto=format", name: "真丝衬衫·杏粉",     sku: "ZS-087-S",  platform: "淘宝", netSales: 22400, netQty: 62,  tier: "normal" },
  { img: "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=56&h=56&fit=crop&auto=format", name: "香云纱半裙·墨绿",   sku: "HYS-032-M", platform: "抖音", netSales: 14300, netQty: 26,  tier: "low" },
  { img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=56&h=56&fit=crop&auto=format", name: "莨绸外套·藏蓝",     sku: "LZC-044-L", platform: "批发", netSales: 9800,  netQty: 14,  tier: "low" },
  { img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=56&h=56&fit=crop&auto=format", name: "真丝睡衣套装·米白", sku: "ZS-112-S",  platform: "淘宝", netSales: 3200,  netQty: 9,   tier: "negative" },
  { img: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=56&h=56&fit=crop&auto=format", name: "香云纱围巾·水蓝",   sku: "HYS-056",   platform: "达人", netSales: 1840,  netQty: 7,   tier: "negative" },
];

/* ── Pending cell ── */
function PCell({ hint }: { hint?: string }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <span style={{ fontSize: 9, opacity: 0.3 }}>🔒</span>
        <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "#272727" }}>—</span>
      </div>
      {hint && <span style={{ fontSize: 9, color: "#252525", marginTop: 1 }}>{hint}</span>}
    </div>
  );
}

/* ── Tier badge ── */
function TierBadge({ tier }: { tier: Tier }) {
  const t = TIERS.find((x) => x.key === tier)!;
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 9999,
      color: t.color, background: `${t.color}18`, border: `1px solid ${t.color}30`,
    }}>
      {t.label}
    </span>
  );
}

/* ── Profit tier summary cards ── */
function TierSummaryCards({ activeTier, onSelect }: { activeTier: Tier; onSelect: (t: Tier) => void }) {
  const tierCounts = Object.fromEntries(TIERS.map((t) => [t.key, ROWS.filter((r) => t.key === "all" || r.tier === t.key).length]));
  const tierSales  = Object.fromEntries(TIERS.map((t) => [t.key, ROWS.filter((r) => t.key === "all" || r.tier === t.key).reduce((s, r) => s + r.netSales, 0)]));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 16 }} className="grid-cols-2 md:grid-cols-5">
      {TIERS.map((t) => {
        const isActive = activeTier === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onSelect(t.key)}
            style={{
              background: "#141414",
              border: `1px solid ${isActive ? t.color + "60" : "#1e1e1e"}`,
              borderRadius: 8, padding: "12px 14px", textAlign: "left",
              cursor: "pointer", transition: "border-color 0.15s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: isActive ? t.color : "#888" }}>{t.label}</span>
              {t.sub && (
                <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 3, color: t.color, background: `${t.color}15`, fontWeight: 600 }}>
                  {t.sub}
                </span>
              )}
            </div>

            {/* SKU count — real */}
            <div style={{ marginBottom: 6 }}>
              <span className="mono" style={{ fontSize: 20, fontWeight: 800, color: "#ccc" }}>{tierCounts[t.key]}</span>
              <span style={{ fontSize: 10, color: "#555", marginLeft: 3 }}>款</span>
            </div>

            {/* Net sales — real */}
            <div style={{ marginBottom: 4 }}>
              <p style={{ margin: 0, fontSize: 9, color: "#3a3a3a" }}>净销售</p>
              <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: "#666" }}>
                ¥{(tierSales[t.key] / 10000).toFixed(1)}万
              </span>
            </div>

            {/* Profit — pending */}
            <div>
              <p style={{ margin: 0, fontSize: 9, color: "#2a2a2a" }}>预估利润</p>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{ fontSize: 8, opacity: 0.3 }}>🔒</span>
                <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: "#252525" }}>—</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ── Main table ── */
export default function ProfitTable() {
  const [activeTier, setActiveTier] = useState<Tier>("all");
  const [activeDim, setActiveDim] = useState<Dim>("sku");
  const [sortBy, setSortBy] = useState<"netSales" | "netQty">("netSales");
  const [search, setSearch] = useState("");

  const filtered = ROWS
    .filter((r) => (activeTier === "all" || r.tier === activeTier))
    .filter((r) => !search || r.name.includes(search) || r.sku.includes(search))
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const totalNetSales = filtered.reduce((s, r) => s + r.netSales, 0);

  return (
    <div>
      <TierSummaryCards activeTier={activeTier} onSelect={setActiveTier} />

      <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid #1a1a1a", flexWrap: "wrap" }}>
          {/* Dimension switcher */}
          <div style={{ display: "flex", gap: 2, background: "#0e0e0e", borderRadius: 5, padding: 2 }}>
            {DIMS.map((d) => (
              <button
                key={d.key}
                onClick={() => setActiveDim(d.key)}
                style={{
                  padding: "4px 12px", borderRadius: 4,
                  background: activeDim === d.key ? "#1e1e1e" : "transparent",
                  border: "none", fontSize: 11, fontWeight: activeDim === d.key ? 700 : 400,
                  color: activeDim === d.key ? "#d0d0d0" : "#444",
                  cursor: "pointer",
                }}
              >{d.label}</button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#444", fontSize: 11 }}>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索商品 / SKU"
              style={{
                paddingLeft: 24, padding: "5px 10px 5px 24px",
                background: "#0e0e0e", border: "1px solid #222",
                borderRadius: 4, color: "#ccc", fontSize: 11, outline: "none", width: 180,
              }}
            />
          </div>

          <div style={{ flex: 1 }} />

          {/* Cost pending notice */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: "#111", border: "1px solid #1a1a1a", borderRadius: 4 }}>
            <span style={{ fontSize: 9 }}>🔒</span>
            <span style={{ fontSize: 10, color: "#2e2e2e", fontWeight: 600 }}>利润/成本列待接入</span>
          </div>

          <span style={{ fontSize: 11, color: "#3a3a3a" }}>{filtered.length} 条</span>
        </div>

        {/* Column header */}
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 80px 1fr 1fr 1fr 1fr 1fr", padding: "9px 16px", borderBottom: "1px solid #181818", minWidth: 760 }}>
          {[
            { label: "商品", sortKey: null },
            { label: "平台", sortKey: null },
            { label: "净销售额", sortKey: "netSales" as const },
            { label: "净销售量", sortKey: "netQty" as const },
            { label: "净成本", sortKey: null },
            { label: "利润", sortKey: null },
            { label: "利润率", sortKey: null },
          ].map(({ label, sortKey }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                onClick={() => sortKey && setSortBy(sortKey)}
                style={{
                  fontSize: 10, color: sortBy === sortKey ? "#888" : "#3a3a3a",
                  fontWeight: 700, letterSpacing: "0.06em",
                  cursor: sortKey ? "pointer" : "default",
                }}
              >
                {label}
              </span>
              {sortKey && <span style={{ fontSize: 9, color: "#333" }}>{sortBy === sortKey ? "↓" : "↕"}</span>}
              {/* Pending indicator for cost columns */}
              {(label === "净成本" || label === "利润" || label === "利润率") && (
                <span style={{ fontSize: 8, opacity: 0.35 }}>🔒</span>
              )}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div style={{ overflowX: "auto", minWidth: 760 }}>
          {filtered.map((row, ri) => {
            const salesPct = Math.round((row.netSales / (totalNetSales || 1)) * 100);
            const tierConf = TIERS.find((t) => t.key === row.tier)!;

            return (
              <div
                key={row.sku}
                style={{
                  display: "grid", gridTemplateColumns: "2.5fr 80px 1fr 1fr 1fr 1fr 1fr",
                  padding: "11px 16px",
                  borderBottom: ri < filtered.length - 1 ? "1px solid #181818" : "none",
                  alignItems: "center",
                  cursor: "pointer", transition: "background 0.1s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#181818"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {/* Product */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "#222" }}>
                    <img src={row.img} alt={row.name} width={36} height={36} style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#d0d0d0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {row.name}
                    </p>
                    <div style={{ display: "flex", gap: 6, marginTop: 3, alignItems: "center" }}>
                      <span className="mono" style={{ fontSize: 10, color: "#444" }}>{row.sku}</span>
                      <TierBadge tier={row.tier} />
                    </div>
                  </div>
                </div>

                {/* Platform */}
                <span style={{ fontSize: 11, color: "#666" }}>{row.platform}</span>

                {/* Net sales — real */}
                <div>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 800, color: "#f0f0f0" }}>
                    ¥{(row.netSales / 10000).toFixed(1)}万
                  </span>
                  <div style={{ marginTop: 4, height: 3, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${salesPct}%`, background: "#444", borderRadius: 2 }} />
                  </div>
                  <p style={{ margin: "2px 0 0", fontSize: 9, color: "#2e2e2e" }}>{salesPct}% 占比</p>
                </div>

                {/* Net qty — real */}
                <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "#888" }}>
                  {row.netQty}
                </span>

                {/* Net cost — pending */}
                <PCell hint="待成本" />

                {/* Profit — pending */}
                <PCell hint="待利润" />

                {/* Profit rate — pending (with tier-color ghost bar) */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, opacity: 0.25 }}>🔒</span>
                    <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>—%</span>
                  </div>
                  {/* Ghost bar showing predicted tier */}
                  <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: "60%", background: tierConf.color, opacity: 0.15, borderRadius: 2 }} />
                  </div>
                  <p style={{ margin: "2px 0 0", fontSize: 9, color: "#252525", fontStyle: "italic" }}>
                    预测区间 {tierConf.range}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 16px", borderTop: "1px solid #181818", background: "#0e0e0e",
          flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontSize: 11, color: "#555" }}>净销售合计</span>
            <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "#888" }}>
              ¥{(totalNetSales / 10000).toFixed(1)}万
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 9 }}>🔒</span>
            <span style={{ fontSize: 11, color: "#2e2e2e" }}>利润合计、利润率均待成本价接入后计算</span>
          </div>
        </div>
      </div>
    </div>
  );
}
