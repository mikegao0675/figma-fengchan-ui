import { useState } from "react";
import type { DrillDownTarget } from "../types";

interface Product {
  id: string;
  name: string;
  sku: string;
  sales7d: number;
  amount7d: number;
  trend: number[];
  img: string;
}

const hot: Product[] = [
  { id: "1", name: "香云纱真丝旗袍·月白", sku: "HYS-001", sales7d: 342, amount7d: 187300, trend: [38,52,47,68,72,84,92], img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=64&h=64&fit=crop&auto=format" },
  { id: "2", name: "莨绸阔腿裤·烟灰", sku: "LZC-023", sales7d: 287, amount7d: 124800, trend: [28,36,42,51,58,63,70], img: "https://images.unsplash.com/photo-1571513800374-df1bbe650e56?w=64&h=64&fit=crop&auto=format" },
  { id: "3", name: "真丝衬衫·杏粉", sku: "ZS-087", sales7d: 231, amount7d: 89700, trend: [24,29,35,44,49,56,64], img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4cd9?w=64&h=64&fit=crop&auto=format" },
];

const mid: Product[] = [
  { id: "4", name: "香云纱半裙·墨绿", sku: "HYS-032", sales7d: 84, amount7d: 42100, trend: [10,12,14,11,13,12,14], img: "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=64&h=64&fit=crop&auto=format" },
  { id: "5", name: "莨绸外套·藏蓝", sku: "LZC-044", sales7d: 67, amount7d: 38800, trend: [8,10,9,11,10,9,10], img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=64&h=64&fit=crop&auto=format" },
];

const low: Product[] = [
  { id: "6", name: "真丝睡衣套装·米白", sku: "ZS-112", sales7d: 12, amount7d: 7200, trend: [2,1,3,2,1,2,1], img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=64&h=64&fit=crop&auto=format" },
  { id: "7", name: "香云纱围巾·水蓝", sku: "HYS-056", sales7d: 8, amount7d: 2400, trend: [1,2,1,1,0,2,1], img: "https://images.unsplash.com/photo-1602810316693-3667c854239a?w=64&h=64&fit=crop&auto=format" },
];

const tiers = [
  { key: "hot", label: "爆款", sub: "近7天销量 TOP", color: "#f87171", products: hot },
  { key: "mid", label: "平销", sub: "正常动销", color: "#fb923c", products: mid },
  { key: "low", label: "低销", sub: "需关注", color: "#444", products: low },
];

function Sparkline({ vals, color }: { vals: number[]; color: string }) {
  const max = Math.max(...vals, 1);
  const w = 56, h = 24;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function ProductTiers({ onDrill }: { onDrill: (t: DrillDownTarget) => void }) {
  const [active, setActive] = useState<string>("hot");
  const tier = tiers.find((t) => t.key === active)!;

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Tier tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {tiers.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 14px",
              borderRadius: 6,
              border: active === t.key ? `1px solid ${t.color}` : "1px solid #222",
              background: active === t.key ? "#1a1a1a" : "transparent",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.color }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: active === t.key ? "#f0f0f0" : "#555" }}>{t.label}</span>
            <span style={{ fontSize: 10, color: "#444" }}>{t.products.length}</span>
          </button>
        ))}
      </div>

      {/* Product list */}
      <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 8, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 12, padding: "8px 16px", borderBottom: "1px solid #1e1e1e" }}>
          <span style={{ fontSize: 10, color: "#444" }}>商品</span>
          <span style={{ fontSize: 10, color: "#444", width: 56, textAlign: "right" }}>近7天</span>
          <span style={{ fontSize: 10, color: "#444", width: 64, textAlign: "right" }}>金额</span>
          <span style={{ fontSize: 10, color: "#444", width: 56 }}>趋势</span>
        </div>

        {tier.products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onDrill({ type: "商品", label: p.name })}
            style={{
              display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 12,
              padding: "12px 16px",
              borderBottom: i < tier.products.length - 1 ? "1px solid #1a1a1a" : "none",
              background: "transparent", border: "none", cursor: "pointer", textAlign: "left", width: "100%",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#181818"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: 4, overflow: "hidden", flexShrink: 0, background: "#222" }}>
                <img src={p.img} alt={p.name} width={28} height={28} style={{ objectFit: "cover" }} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 12, color: "#ddd", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
                <p style={{ fontSize: 10, color: "#444", margin: 0, marginTop: 2 }}>{p.sku}</p>
              </div>
            </div>
            <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "#f0f0f0", width: 56, textAlign: "right", alignSelf: "center" }}>{p.sales7d}</span>
            <span className="mono" style={{ fontSize: 11, color: "#888", width: 64, textAlign: "right", alignSelf: "center" }}>¥{(p.amount7d / 10000).toFixed(1)}万</span>
            <div style={{ width: 56, alignSelf: "center" }}>
              <Sparkline vals={p.trend} color={tier.color} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
