import WarningCards from "./WarningCards";
import LogisticsTable from "./LogisticsTable";

export default function LogisticsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 16px 80px" }} className="md:px-8 md:py-6">
        {/* Data source banner */}
        <DataSourceBanner />

        {/* 5 Warning cards */}
        <SectionLabel label="实时预警" sub="按剩余时长分桶 · 快递轨迹数据部分待接入" />
        <WarningCards />

        {/* Logistics status table */}
        <SectionLabel label="物流明细" sub="点击行查看轨迹详情" />
        <LogisticsTable />
      </div>
    </div>
  );
}

function DataSourceBanner() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 16px",
      background: "var(--warn-sub)",
      border: "1px solid rgba(251,146,60,0.18)",
      borderRadius: 8, marginBottom: 20,
      flexWrap: "wrap", gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 14 }}>🔌</span>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--warn)" }}>快递轨迹数据源未接入</span>
          <span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 8 }}>
            揽收未更新、运输未更新、重点关注 三项预警依赖快递100/菜鸟轨迹API，接入后自动激活
          </span>
        </div>
      </div>
      <button style={{
        padding: "5px 14px", borderRadius: 4,
        background: "var(--warn-sub)", border: "1px solid rgba(251,146,60,0.3)",
        color: "var(--warn)", fontSize: 13, fontWeight: 700, cursor: "pointer",
      }}>
        去配置数据源 →
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
