import { useState } from "react";
import type { Product } from "./data";
import { STOCK_COLOR } from "./data";

interface ProductCardProps {
  product: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductCard({ product: p, onSelect, onAddToCart }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const sc = STOCK_COLOR[p.stock];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s",
        boxShadow: hovered ? "0 8px 32px rgba(26,23,6,0.10)" : "0 1px 4px rgba(26,23,6,0.06)",
        transform: hovered ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image area */}
      <div
        onClick={() => onSelect(p)}
        style={{ position: "relative", paddingBottom: "130%", background: "#f5f2ec", overflow: "hidden" }}
      >
        <img
          src={p.image}
          alt={p.name}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Badges */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 4 }}>
          {p.isNew && (
            <span style={{
              background: "#1a1706", color: "#fafaf8",
              fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
              padding: "3px 7px", borderRadius: 2,
            }}>NEW</span>
          )}
          {p.isFeatured && !p.isNew && (
            <span style={{
              background: "#9b7b52", color: "#fff",
              fontSize: 9, fontWeight: 700, letterSpacing: "0.1em",
              padding: "3px 7px", borderRadius: 2,
            }}>精选</span>
          )}
        </div>

        {/* Stock tag */}
        <div style={{ position: "absolute", bottom: 10, right: 10 }}>
          <span style={{
            background: sc.bg, color: sc.text,
            fontSize: 10, fontWeight: 600,
            padding: "3px 8px", borderRadius: 3,
          }}>{p.stock}</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div onClick={() => onSelect(p)}>
          <div style={{ fontSize: 10, color: "#b0a898", letterSpacing: "0.08em", marginBottom: 3, fontFamily: "monospace" }}>
            {p.code}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1706", lineHeight: 1.4 }}>
            {p.name}
          </div>
          <div style={{ fontSize: 11, color: "#9b8e7a", marginTop: 2 }}>
            {p.subtitle}
          </div>
        </div>

        {/* Color dots */}
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {p.colors.map((c) => (
            <div
              key={c.name}
              title={c.name}
              style={{
                width: 14, height: 14, borderRadius: "50%",
                background: c.hex,
                border: "1.5px solid rgba(0,0,0,0.08)",
              }}
            />
          ))}
          <span style={{ fontSize: 10, color: "#b0a898", marginLeft: 2 }}>
            {p.colors.length} 色
          </span>
        </div>

        {/* Prices */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <div>
            <div style={{ fontSize: 9, color: "#b0a898", marginBottom: 1 }}>批发价</div>
            <div style={{
              fontSize: 18, fontWeight: 700, color: "#9b7b52",
              fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1,
            }}>
              ¥{p.wholesalePrice.toLocaleString()}
            </div>
          </div>
          <div style={{ width: 1, height: 24, background: "#ede9e0" }} />
          <div>
            <div style={{ fontSize: 9, color: "#b0a898", marginBottom: 1 }}>零售价</div>
            <div style={{ fontSize: 13, color: "#c0b8a8" }}>¥{p.retailPrice.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ fontSize: 10, color: "#b0a898" }}>起订 {p.minOrder} 件</div>

        {/* Add button */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
          style={{
            marginTop: 4,
            width: "100%",
            padding: "9px 0",
            borderRadius: 5,
            background: p.stock === "售罄" ? "#f0ede6" : "#1a1706",
            color: p.stock === "售罄" ? "#b0a898" : "#fafaf8",
            border: "none",
            fontSize: 12,
            fontWeight: 600,
            cursor: p.stock === "售罄" ? "not-allowed" : "pointer",
            transition: "background 0.15s",
            letterSpacing: "0.04em",
          }}
          disabled={p.stock === "售罄"}
        >
          {p.stock === "售罄" ? "暂时售罄" : "+ 加入选款"}
        </button>
      </div>
    </div>
  );
}
