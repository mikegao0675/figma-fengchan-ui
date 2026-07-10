import { useState } from "react";
import type { DrillOrder } from "./PenaltyPage";

type Tab = "warehouse" | "platform" | "product";

/* ── Data ── */
const warehouseData = [
  { name: "广州华美仓", orders: 22, skus: 14, confirmed: 1800, estimated: 5200, rate: 5.1, top: "香云纱旗袍·月白" },
  { name: "苏州锦绣仓", orders: 18, skus: 11, confirmed: 1400, estimated: 4100, rate: 4.3, top: "真丝衬衫·杏粉" },
  { name: "佛山南海仓", orders: 14, skus: 9,  confirmed: 820,  estimated: 3200, rate: 3.8, top: "莨绸阔腿裤·烟灰" },
  { name: "自发货·北京", orders: 9,  skus: 6,  confirmed: 300,  estimated: 1820, rate: 2.2, top: "香云纱半裙·墨绿" },
];

const platformData = [
  { name: "抖音直播", orders: 28, skus: 16, confirmed: 2400, estimated: 7200, rate: 6.2, sub: "凤婵旗舰直播间 · 香云纱专场" },
  { name: "淘宝/天猫", orders: 21, skus: 13, confirmed: 1600, estimated: 5100, rate: 4.8, sub: "凤婵官方旗舰 · 香云纱专馆" },
  { name: "批发渠道", orders: 9,  skus: 7,  confirmed: 220,  estimated: 1800, rate: 2.1, sub: "广州档口 · 1688" },
  { name: "达人供货", orders: 5,  skus: 4,  confirmed: 100,  estimated: 220,  rate: 1.2, sub: "达人分销" },
];

const productData = [
  { name: "香云纱真丝旗袍·月白 M", sku: "HYS-001", orders: 14, confirmed: 1200, estimated: 3400, trend: "持续高发" },
  { name: "莨绸阔腿裤·烟灰 L",     sku: "LZC-023", orders: 11, confirmed: 800,  estimated: 2800, trend: "本周激增" },
  { name: "真丝衬衫·杏粉 S",       sku: "ZS-087",  orders: 9,  confirmed: 600,  estimated: 2200, trend: "稳定" },
  { name: "香云纱半裙·墨绿 M",     sku: "HYS-032", orders: 7,  confirmed: 420,  estimated: 1600, trend: "稳定" },
  { name: "莨绸外套·藏蓝 L",       sku: "LZC-044", orders: 5,  confirmed: 300,  estimated: 1000, trend: "偶发" },
  { name: "真丝睡衣·米白 S",       sku: "ZS-112",  orders: 3,  confirmed: 100,  estimated: 320,  trend: "偶发" },
];

/* Sample drill orders by tab */
const drillSamples: Record<string, DrillOrder[]> = {
  "广州华美仓": [
    { orderId: "#1823", product: "香云纱旗袍·月白 M", platform: "抖音直播", overdue: "超时 72h", penalty: 400 },
    { orderId: "#1791", product: "莨绸阔腿裤·烟灰 L", platform: "淘宝旗舰", overdue: "剩余 8h", penalty: 200 },
  ],
  "抖音直播": [
    { orderId: "#1823", product: "香云纱旗袍·月白 M", platform: "抖音直播", overdue: "超时 72h", penalty: 400 },
    { orderId: "#1867", product: "真丝衬衫·杏粉 S", platform: "抖音直播", overdue: "剩余 8h", penalty: 300 },
  ],
  "HYS-001": [
    { orderId: "#1823", product: "香云纱旗袍·月白 M", platform: "抖音直播", overdue: "超时 72h", penalty: 400 },
    { orderId: "#1834", product: "香云纱旗袍·月白 L", platform: "淘宝旗舰", overdue: "剩余 18h", penalty: 200 },
  ],
};

const maxAmount = (data: { estimated: number }[]) => Math.max(...data.map((d) => d.estimated), 1);

export default function PenaltyTable({ onDrill }: { onDrill: (o: DrillOrder) => void }) {
  const [tab, setTab] = useState<Tab>("warehouse");
  const [expanded, setExpanded] = useState<string | null>(null);

  const tabs: { key: Tab; label: string }[] = [
    { key: "warehouse", label: "按仓库/供应商" },
    { key: "platform",  label: "按平台店铺" },
    { key: "product",   label: "按商品" },
  ];

  return (
    <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 10, overflow: "hidden" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1a1a1a", padding: "0 18px" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setExpanded(null); }}
            style={{
              padding: "12px 14px", background: "transparent", border: "none",
              borderBottom: `2px solid ${tab === t.key ? "#f87171" : "transparent"}`,
              fontSize: 12, fontWeight: tab === t.key ? 700 : 400,
              color: tab === t.key ? "#f0f0f0" : "#555",
              cursor: "pointer", whiteSpace: "nowrap",
              marginBottom: -1, transition: "color 0.12s",
            }}
          >{t.label}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 4px" }}>
          <span style={{ fontSize: 10, color: "#3a3a3a" }}>点击行查看待发货订单</span>
        </div>
      </div>

      {/* Table body */}
      {tab === "warehouse" && <WarehouseTable data={warehouseData} expanded={expanded} setExpanded={setExpanded} onDrill={onDrill} />}
      {tab === "platform"  && <PlatformTable  data={platformData}  expanded={expanded} setExpanded={setExpanded} onDrill={onDrill} />}
      {tab === "product"   && <ProductTable   data={productData}   expanded={expanded} setExpanded={setExpanded} onDrill={onDrill} />}
    </div>
  );
}

/* ── Column header helper ── */
function THead({ cols }: { cols: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols.map(() => "1fr").join(" "), padding: "8px 18px", borderBottom: "1px solid #181818" }}>
      {cols.map((c) => <span key={c} style={{ fontSize: 10, color: "#3a3a3a", fontWeight: 700, letterSpacing: "0.06em" }}>{c}</span>)}
    </div>
  );
}

/* ── Amount bar ── */
function AmountBar({ confirmed, estimated, max }: { confirmed: number; estimated: number; max: number }) {
  const confPct = (confirmed / max) * 100;
  const estPct  = ((estimated - confirmed) / max) * 100;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span className="mono" style={{ fontSize: 14, fontWeight: 800, color: "#f87171" }}>¥{estimated.toLocaleString()}</span>
        <span style={{ fontSize: 10, color: "#555" }}>预估</span>
      </div>
      <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", display: "flex" }}>
          <div style={{ width: `${confPct}%`, background: "#f87171", opacity: 0.9 }} />
          <div style={{ width: `${estPct}%`, background: "#fb923c", opacity: 0.6 }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
        <span style={{ fontSize: 9, color: "#f87171" }}>■ 已确认 ¥{confirmed.toLocaleString()}</span>
        <span style={{ fontSize: 9, color: "#fb923c" }}>■ 预估 ¥{(estimated - confirmed).toLocaleString()}</span>
      </div>
    </div>
  );
}

/* ── Warehouse table ── */
function WarehouseTable({ data, expanded, setExpanded, onDrill }: {
  data: typeof warehouseData; expanded: string | null; setExpanded: (s: string | null) => void; onDrill: (o: DrillOrder) => void;
}) {
  const mx = maxAmount(data);
  return (
    <div>
      <THead cols={["仓库/供应商", "预估处罚金额", "处罚单数", "SKU数", "超时率", "高发SKU"]} />
      {data.map((row, i) => {
        const isOpen = expanded === row.name;
        const samples = drillSamples[row.name] ?? [];
        return (
          <div key={row.name} style={{ borderBottom: i < data.length - 1 ? "1px solid #181818" : "none" }}>
            <div
              onClick={() => setExpanded(isOpen ? null : row.name)}
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                padding: "12px 18px", cursor: "pointer",
                background: isOpen ? "rgba(248,113,113,0.05)" : "transparent",
                alignItems: "center", transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "#181818"; }}
              onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 3, height: 28, background: i === 0 ? "#f87171" : i === 1 ? "#fb923c" : i === 2 ? "#fbbf24" : "#555", borderRadius: 2 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#ccc" }}>{row.name}</span>
              </div>
              <AmountBar confirmed={row.confirmed} estimated={row.estimated} max={mx} />
              <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "#ddd" }}>{row.orders}</span>
              <span className="mono" style={{ fontSize: 13, color: "#888" }}>{row.skus}</span>
              <div>
                <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: row.rate > 4 ? "#f87171" : row.rate > 3 ? "#fb923c" : "#888" }}>{row.rate}%</span>
              </div>
              <span style={{ fontSize: 11, color: "#555" }}>{row.top}</span>
            </div>
            <DrillRows isOpen={isOpen} samples={samples} onDrill={onDrill} />
          </div>
        );
      })}
    </div>
  );
}

/* ── Platform table ── */
function PlatformTable({ data, expanded, setExpanded, onDrill }: {
  data: typeof platformData; expanded: string | null; setExpanded: (s: string | null) => void; onDrill: (o: DrillOrder) => void;
}) {
  const mx = maxAmount(data);
  return (
    <div>
      <THead cols={["平台店铺", "预估处罚金额", "处罚单数", "SKU数", "超时率", "下级店铺"]} />
      {data.map((row, i) => {
        const isOpen = expanded === row.name;
        const samples = drillSamples[row.name] ?? [];
        return (
          <div key={row.name} style={{ borderBottom: i < data.length - 1 ? "1px solid #181818" : "none" }}>
            <div
              onClick={() => setExpanded(isOpen ? null : row.name)}
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                padding: "12px 18px", cursor: "pointer",
                background: isOpen ? "rgba(248,113,113,0.05)" : "transparent",
                alignItems: "center", transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "#181818"; }}
              onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#ccc" }}>{row.name}</span>
              <AmountBar confirmed={row.confirmed} estimated={row.estimated} max={mx} />
              <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "#ddd" }}>{row.orders}</span>
              <span className="mono" style={{ fontSize: 13, color: "#888" }}>{row.skus}</span>
              <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: row.rate > 5 ? "#f87171" : row.rate > 3 ? "#fb923c" : "#888" }}>{row.rate}%</span>
              <span style={{ fontSize: 10, color: "#444", lineHeight: 1.4 }}>{row.sub}</span>
            </div>
            <DrillRows isOpen={isOpen} samples={samples} onDrill={onDrill} />
          </div>
        );
      })}
    </div>
  );
}

/* ── Product table ── */
function ProductTable({ data, expanded, setExpanded, onDrill }: {
  data: typeof productData; expanded: string | null; setExpanded: (s: string | null) => void; onDrill: (o: DrillOrder) => void;
}) {
  const mx = maxAmount(data);
  return (
    <div>
      <THead cols={["商品", "预估处罚金额", "处罚单数", "趋势", ""]} />
      {data.map((row, i) => {
        const isOpen = expanded === row.sku;
        const samples = drillSamples[row.sku] ?? [];
        return (
          <div key={row.sku} style={{ borderBottom: i < data.length - 1 ? "1px solid #181818" : "none" }}>
            <div
              onClick={() => setExpanded(isOpen ? null : row.sku)}
              style={{
                display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 0.4fr",
                padding: "12px 18px", cursor: "pointer",
                background: isOpen ? "rgba(248,113,113,0.05)" : "transparent",
                alignItems: "center", transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "#181818"; }}
              onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#ccc" }}>{row.name}</p>
                <p className="mono" style={{ margin: 0, fontSize: 10, color: "#444", marginTop: 2 }}>{row.sku}</p>
              </div>
              <AmountBar confirmed={row.confirmed} estimated={row.estimated} max={mx} />
              <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "#ddd" }}>{row.orders}</span>
              <span style={{
                fontSize: 10, padding: "2px 7px", borderRadius: 9999,
                color: row.trend === "持续高发" ? "#f87171" : row.trend === "本周激增" ? "#fb923c" : "#555",
                background: row.trend === "持续高发" ? "rgba(248,113,113,0.1)" : row.trend === "本周激增" ? "rgba(251,146,60,0.1)" : "#1a1a1a",
                fontWeight: 600,
              }}>{row.trend}</span>
              <span style={{ fontSize: 12, color: "#333" }}>›</span>
            </div>
            <DrillRows isOpen={isOpen} samples={samples} onDrill={onDrill} />
          </div>
        );
      })}
    </div>
  );
}

/* ── Shared drill row component ── */
function DrillRows({ isOpen, samples, onDrill }: { isOpen: boolean; samples: DrillOrder[]; onDrill: (o: DrillOrder) => void }) {
  if (!isOpen) return null;
  return (
    <div style={{ background: "rgba(248,113,113,0.04)", borderTop: "1px solid rgba(248,113,113,0.1)", padding: "8px 18px 12px 32px" }}>
      {samples.length === 0 ? (
        <p style={{ fontSize: 11, color: "#444", margin: "4px 0" }}>暂无代表性订单</p>
      ) : (
        <>
          <p style={{ fontSize: 10, color: "#444", marginBottom: 6, fontWeight: 600, letterSpacing: "0.06em" }}>待处理订单 →</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {samples.map((o) => o && (
              <button
                key={o.orderId}
                onClick={() => onDrill(o)}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 12px", background: "#111",
                  border: "1px solid #222", borderRadius: 6, cursor: "pointer",
                  transition: "border-color 0.1s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#f87171"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#222"; }}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span className="mono" style={{ fontSize: 11, color: "#555" }}>{o.orderId}</span>
                  <span style={{ fontSize: 12, color: "#aaa" }}>{o.product}</span>
                  <span style={{ fontSize: 11, color: "#444" }}>{o.overdue}</span>
                </div>
                <span className="mono" style={{ fontSize: 14, fontWeight: 800, color: "#f87171" }}>¥{o.penalty}</span>
              </button>
            ))}
            <button style={{ fontSize: 11, color: "#f87171", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", padding: "2px 0" }}>
              查看全部关联订单 →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
