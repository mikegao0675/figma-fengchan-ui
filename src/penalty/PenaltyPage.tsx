import { useState } from "react";
import PenaltySummary from "./PenaltySummary";
import PenaltyCards from "./PenaltyCards";
import PenaltyBuckets from "./PenaltyBuckets";
import PenaltyTable from "./PenaltyTable";

export type DrillOrder = { orderId: string; product: string; platform: string; overdue: string; penalty: number } | null;

export default function PenaltyPage() {
  const [drillOrder, setDrillOrder] = useState<DrillOrder>(null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 16px 80px" }} className="md:px-8 md:py-6">

        {/* Hero summary strip */}
        <PenaltySummary />

        {/* 3 Penalty type cards */}
        <SectionLabel label="处罚类型概览" sub="本月累计" />
        <PenaltyCards />

        {/* Time-bucket penalty ladder */}
        <SectionLabel label="延迟发货处罚预估" sub="按剩余超时时长分桶 · 点击查看明细" />
        <PenaltyBuckets onDrill={setDrillOrder} />

        {/* Detail table */}
        <SectionLabel label="明细分析" sub="可切换维度 · 点击下钻到待发货订单" />
        <PenaltyTable onDrill={setDrillOrder} />
      </div>

      {/* Order drill-down drawer */}
      {drillOrder && (
        <div
          onClick={() => setDrillOrder(null)}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          className="md:items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 480,
              background: "var(--surface-raised)", border: "1px solid #2a2a2a",
              borderRadius: "14px 14px 0 0", padding: "20px 20px 32px",
            }}
            className="md:rounded-xl md:mb-0"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>订单下钻</p>
                <p className="mono" style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{drillOrder.orderId}</p>
              </div>
              <button onClick={() => setDrillOrder(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 22, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid #222", borderRadius: 8, overflow: "hidden" }}>
              {[
                ["商品", drillOrder.product],
                ["平台", drillOrder.platform],
                ["超时时长", drillOrder.overdue],
                ["处罚规则", "平台延迟发货 · 阶梯扣款"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", borderBottom: "1px solid #1a1a1a" }}>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{k}</span>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", background: "var(--danger-sub)" }}>
                <span style={{ fontSize: 12, color: "var(--danger)", fontWeight: 600 }}>预估处罚金额</span>
                <span className="mono" style={{ fontSize: 22, fontWeight: 800, color: "var(--danger)" }}>¥{drillOrder.penalty.toFixed(0)}</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
              <button onClick={() => setDrillOrder(null)} style={{ padding: "10px", background: "var(--surface-raised)", border: "1px solid #2a2a2a", borderRadius: 6, color: "var(--text-muted)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>关闭</button>
              <button style={{ padding: "10px", background: "var(--danger)", border: "none", borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>立即处理 →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 32, marginBottom: 12 }}>
      <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", color: "var(--text-muted)", textTransform: "uppercase" }}>{label}</h2>
      {sub && <span style={{ fontSize: 13, color: "var(--border-strong)" }}>{sub}</span>}
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}
