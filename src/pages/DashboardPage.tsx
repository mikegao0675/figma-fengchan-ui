import { useState } from "react";
import MetricCards from "../components/MetricCards";
import SalesTrend from "../components/SalesTrend";
import ChannelAnalysis from "../components/ChannelAnalysis";
import ProductTiers from "../components/ProductTiers";
import StockShortage from "../components/StockShortage";
import AlertEntries from "../components/AlertEntries";
import type { DrillDownTarget } from "../types";

function SectionHeader({ label, sub }: { label: string; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: "#555", textTransform: "uppercase", margin: 0, whiteSpace: "nowrap" }}>
        {label}
      </h2>
      {sub && <span style={{ fontSize: 11, color: "#333" }}>{sub}</span>}
      <div style={{ flex: 1, height: 1, background: "#1e1e1e" }} />
    </div>
  );
}

export default function DashboardPage() {
  const [drillDown, setDrillDown] = useState<DrillDownTarget>(null);

  return (
    <div style={{ background: "#0c0c0c", color: "#f0f0f0", minHeight: "100%" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "20px 16px 80px" }} className="md:px-8 md:py-6">

        <SectionHeader label="核心指标" />
        <MetricCards onDrill={setDrillDown} />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-8">
          <div className="xl:col-span-3">
            <SectionHeader label="销售趋势" sub="逐小时累计金额" />
            <SalesTrend />
          </div>
          <div className="xl:col-span-2">
            <SectionHeader label="渠道分析" sub="平台 / 店铺" />
            <ChannelAnalysis onDrill={setDrillDown} />
          </div>
        </div>

        <SectionHeader label="商品分层" sub="爆款 / 平销 / 低销" />
        <ProductTiers onDrill={setDrillDown} />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 mb-8">
          <div className="xl:col-span-3">
            <SectionHeader label="欠货看板" sub="按供应商分组 · 仅真欠货款" />
            <StockShortage />
          </div>
          <div className="xl:col-span-2">
            <SectionHeader label="预警中心" sub="需立即处理" />
            <AlertEntries />
          </div>
        </div>
      </div>

      {/* Drill-down overlay */}
      {drillDown && (
        <div
          onClick={() => setDrillDown(null)}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          className="md:items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 480, background: "#181818", border: "1px solid #2a2a2a", borderRadius: "16px 16px 0 0", padding: 24 }}
            className="md:rounded-xl"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <p style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>明细下钻</p>
                <p style={{ fontSize: 18, fontWeight: 600 }}>{drillDown.label}</p>
              </div>
              <button onClick={() => setDrillDown(null)} style={{ fontSize: 24, color: "#555", background: "none", border: "none", cursor: "pointer" }}>×</button>
            </div>
            <div style={{ background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 8, padding: 20, textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "#555" }}>{drillDown.type} 明细数据接入后展示</p>
            </div>
            <button onClick={() => setDrillDown(null)} style={{ width: "100%", marginTop: 12, padding: 10, borderRadius: 8, background: "#f0f0f0", color: "#0c0c0c", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>关闭</button>
          </div>
        </div>
      )}
    </div>
  );
}
