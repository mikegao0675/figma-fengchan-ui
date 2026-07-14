import ProfitSummary from "./ProfitSummary";
import ProfitTable from "./ProfitTable";

export default function ProfitPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 16px 80px" }} className="md:px-8 md:py-6">
        <CostSourceBanner />
        <SectionLabel label="今日实时利润概览" sub="净销售数据实时更新 · 成本数据待接入后计算" />
        <ProfitSummary />
        <SectionLabel label="商品利润明细" sub="按 SKU / 链接 / 款 切换 · 成本接入后自动激活" />
        <ProfitTable />
      </div>
    </div>
  );
}

function CostSourceBanner() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 16px", marginBottom: 20,
      background: "var(--info-sub)",
      border: "1px solid rgba(96,165,250,0.15)",
      borderRadius: 8, flexWrap: "wrap", gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 14 }}>💰</span>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--info)" }}>成本价尚未接入</span>
          <span style={{ fontSize: 13, color: "var(--text-faint)", marginLeft: 8 }}>
            商品净成本需录入采购/生产成本后才能计算利润；净销售金额实时可查
          </span>
        </div>
      </div>
      <button style={{
        padding: "5px 14px", borderRadius: 4,
        background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.25)",
        color: "var(--info)", fontSize: 13, fontWeight: 700, cursor: "pointer",
      }}>
        去录入成本价 →
      </button>
    </div>
  );
}

export function SectionLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", color: "var(--text-muted)", textTransform: "uppercase" }}>{label}</h2>
      {sub && <span style={{ fontSize: 13, color: "var(--border-strong)" }}>{sub}</span>}
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}
