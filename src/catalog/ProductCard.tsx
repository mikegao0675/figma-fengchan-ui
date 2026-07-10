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
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const sc = STOCK_COLOR[p.stock];

  /* Main image follows the active color swatch */
  const displayImage = p.images[activeColorIdx] ?? p.image;
  const activeColor = p.colors[activeColorIdx];

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
        boxShadow: hovered
          ? "0 8px 32px rgba(26,23,6,0.10)"
          : "0 1px 4px rgba(26,23,6,0.06)",
        transform: hovered ? "translateY(-2px)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Main image ── */}
      <div
        onClick={() => onSelect(p)}
        style={{ position: "relative", paddingBottom: "130%", background: "#f5f2ec", overflow: "hidden" }}
      >
        <img
          src={displayImage}
          alt={p.name}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s, opacity 0.2s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* New / Featured badge */}
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

        {/* Stock + qty pill */}
        <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 5, alignItems: "center" }}>
          <span style={{
            background: sc.bg, color: sc.text,
            fontSize: 10, fontWeight: 600,
            padding: "3px 8px", borderRadius: 3,
          }}>{p.stock}</span>
          {p.stockQty > 0 && (
            <span style={{
              background: "rgba(255,255,255,0.92)",
              color: "#6a6056",
              fontSize: 10, fontWeight: 600,
              padding: "3px 8px", borderRadius: 3,
            }}>库存 {p.stockQty}</span>
          )}
        </div>

        {/* Color thumbnail strip — appears at bottom on hover */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(transparent, rgba(250,250,248,0.97))",
          padding: "28px 10px 10px",
          display: "flex", gap: 6, alignItems: "flex-end",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.2s, transform 0.2s",
          pointerEvents: hovered ? "auto" : "none",
        }}>
          {p.colors.map((c, i) => (
            <button
              key={c.name}
              title={c.name}
              onClick={(e) => { e.stopPropagation(); setActiveColorIdx(i); }}
              style={{
                width: i === activeColorIdx ? 44 : 38,
                height: i === activeColorIdx ? 58 : 50,
                flexShrink: 0,
                borderRadius: 4,
                overflow: "hidden",
                border: `2px solid ${i === activeColorIdx ? "#1a1706" : "rgba(255,255,255,0.6)"}`,
                padding: 0, cursor: "pointer",
                background: "#f0ede6",
                transition: "all 0.15s",
                boxShadow: i === activeColorIdx
                  ? "0 2px 8px rgba(26,23,6,0.18)"
                  : "0 1px 3px rgba(26,23,6,0.10)",
              }}
            >
              <img
                src={c.thumb}
                alt={c.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>

        {/* Name + code */}
        <div onClick={() => onSelect(p)}>
          <div style={{ fontSize: 10, color: "#c0b8a8", letterSpacing: "0.08em", marginBottom: 2, fontFamily: "monospace" }}>
            {p.code}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1706", lineHeight: 1.35 }}>
            {p.name}
          </div>
          <div style={{ fontSize: 11, color: "#9b8e7a", marginTop: 2 }}>
            {p.subtitle}
          </div>
        </div>

        {/* Active color label + swatch row (always visible, compact) */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: activeColor.hex,
            border: "1.5px solid rgba(0,0,0,0.1)",
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 11, color: "#9b8e7a" }}>{activeColor.name}</span>
          <span style={{ fontSize: 10, color: "#d0c8be" }}>·</span>
          <span style={{ fontSize: 11, color: "#c0b8a8" }}>{p.colors.length} 色可选</span>
        </div>

        {/* Prices row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <div>
            <div style={{ fontSize: 9, color: "#c0b8a8", marginBottom: 1 }}>批发价</div>
            <div style={{
              fontSize: 18, fontWeight: 700, color: "#9b7b52",
              fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1,
            }}>
              ¥{p.wholesalePrice.toLocaleString()}
            </div>
          </div>
          <div style={{ width: 1, height: 24, background: "#ede9e0" }} />
          <div>
            <div style={{ fontSize: 9, color: "#c0b8a8", marginBottom: 1 }}>零售价</div>
            <div style={{ fontSize: 13, color: "#c0b8a8" }}>¥{p.retailPrice.toLocaleString()}</div>
          </div>
        </div>

        {/* Stock count + min order */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: sc.text,
          }}>
            {p.stockQty > 0 ? `库存 ${p.stockQty} 件` : "暂无库存"}
          </span>
          <span style={{ fontSize: 10, color: "#d0c8be" }}>·</span>
          <span style={{ fontSize: 10, color: "#c0b8a8" }}>起订 {p.minOrder} 件</span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
          style={{
            marginTop: 2,
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
