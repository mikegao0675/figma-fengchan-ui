import { useState } from "react";
import type { Product } from "./data";
import { STOCK_COLOR } from "./data";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductDetail({ product: p, onBack, onAddToCart }: ProductDetailProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(p.colors[0].name);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sc = STOCK_COLOR[p.stock];

  return (
    <div style={{ background: "#fafaf8", minHeight: "100%", paddingBottom: 100 }}>
      {/* Back bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 30,
        background: "rgba(250,250,248,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #ede9e0",
        padding: "0 20px",
        height: 50,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button
          onClick={onBack}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
            color: "#6a6056", fontSize: 13,
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          返回货盘
        </button>
        <div style={{ flex: 1 }} />
        <button style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#6a6056", fontSize: 13,
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          分享
        </button>
      </div>

      {/* Main layout */}
      <div
        className="detail-layout"
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        {/* Image column */}
        <div className="detail-images">
          {/* Main image */}
          <div style={{
            position: "relative",
            background: "#f0ede6",
            overflow: "hidden",
            aspectRatio: "3/4",
            borderRadius: 0,
          }}>
            <img
              src={p.images[imgIdx]}
              alt={p.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />

            {/* Nav arrows */}
            {p.images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + p.images.length) % p.images.length)}
                  style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.85)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="#1a1706" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % p.images.length)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.85)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="#1a1706" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </>
            )}

            {/* Dot indicator */}
            <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
              {p.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  style={{
                    width: i === imgIdx ? 20 : 6, height: 6, borderRadius: 3,
                    background: i === imgIdx ? "#1a1706" : "rgba(26,23,6,0.25)",
                    border: "none", cursor: "pointer",
                    transition: "width 0.2s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div style={{ display: "flex", gap: 8, padding: "10px 16px" }} className="detail-thumbs">
            {p.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: 60, height: 80, flexShrink: 0,
                  background: "#f0ede6",
                  border: `2px solid ${i === imgIdx ? "#1a1706" : "transparent"}`,
                  borderRadius: 4, overflow: "hidden", padding: 0, cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
              >
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Info column */}
        <div className="detail-info" style={{ padding: "24px 20px" }}>
          {/* Code + status */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#b0a898", letterSpacing: "0.1em", fontFamily: "monospace" }}>{p.code}</span>
            <span style={{
              fontSize: 11, fontWeight: 600,
              color: sc.text, background: sc.bg,
              padding: "3px 10px", borderRadius: 3,
            }}>{p.stock}</span>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 22, fontWeight: 700,
            color: "#1a1706", margin: "0 0 4px",
            lineHeight: 1.3,
          }}>{p.name}</h1>
          <p style={{ fontSize: 13, color: "#9b8e7a", margin: "0 0 20px" }}>{p.subtitle}</p>

          {/* Price block */}
          <div style={{
            background: "#fff",
            border: "1px solid #ede9e0",
            borderRadius: 8,
            padding: "16px 18px",
            marginBottom: 20,
          }}>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
              <div>
                <div style={{ fontSize: 10, color: "#b0a898", marginBottom: 4, letterSpacing: "0.06em" }}>批发价 · 起订 {p.minOrder} 件</div>
                <div style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 30, fontWeight: 700, color: "#9b7b52", lineHeight: 1,
                }}>¥{p.wholesalePrice.toLocaleString()}</div>
              </div>
              <div style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 10, color: "#b0a898", marginBottom: 4 }}>零售建议价</div>
                <div style={{ fontSize: 16, color: "#c0b8a8", textDecoration: "line-through" }}>¥{p.retailPrice.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#9b8e7a" }}>
              利润空间 ¥{(p.retailPrice - p.wholesalePrice).toLocaleString()} · 毛利率 {Math.round((p.retailPrice - p.wholesalePrice) / p.retailPrice * 100)}%
            </div>
          </div>

          {/* Material */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#b0a898", textTransform: "uppercase", marginBottom: 8 }}>材质</div>
            <div style={{ fontSize: 13, color: "#4a4440", background: "#f8f4ee", padding: "8px 12px", borderRadius: 5 }}>
              {p.material}
            </div>
          </div>

          {/* Color selector */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#b0a898", textTransform: "uppercase", marginBottom: 10 }}>
              颜色 · <span style={{ color: "#6a6056", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>{selectedColor}</span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {p.colors.map((c) => {
                const active = c.name === selectedColor;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "6px 12px 6px 8px",
                      borderRadius: 5,
                      border: `1.5px solid ${active ? "#1a1706" : "#ede9e0"}`,
                      background: active ? "#fafaf8" : "#fff",
                      cursor: "pointer",
                      transition: "border-color 0.15s",
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%",
                      background: c.hex,
                      border: "1.5px solid rgba(0,0,0,0.1)",
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 12, color: "#4a4440" }}>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#b0a898", textTransform: "uppercase", marginBottom: 10 }}>
              尺码
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.sizes.map((s) => {
                const active = s === selectedSize;
                return (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(active ? null : s)}
                    style={{
                      minWidth: 48, height: 40,
                      borderRadius: 5,
                      border: `1.5px solid ${active ? "#1a1706" : "#ede9e0"}`,
                      background: active ? "#1a1706" : "#fff",
                      color: active ? "#fafaf8" : "#4a4440",
                      fontSize: 13, fontWeight: active ? 600 : 400,
                      cursor: "pointer",
                      transition: "all 0.12s",
                    }}
                  >{s}</button>
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: "#b0a898", marginTop: 8 }}>
              {p.stockQty > 0 ? `库存 ${p.stockQty} 件` : "预售商品，下单后 7-14 天发货"}
            </div>
          </div>

          {/* Color × Size matrix label */}
          <div style={{
            background: "#f8f4ee",
            border: "1px solid #ede9e0",
            borderRadius: 6,
            padding: "12px 14px",
            marginBottom: 20,
            overflowX: "auto",
          }}>
            <div style={{ fontSize: 10, color: "#9b8e7a", marginBottom: 10, fontWeight: 600, letterSpacing: "0.06em" }}>
              颜色 × 尺码 库存矩阵
            </div>
            <table style={{ borderCollapse: "collapse", fontSize: 11, width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ padding: "4px 10px 4px 0", color: "#b0a898", fontWeight: 500, textAlign: "left" }}>颜色</th>
                  {p.sizes.map((s) => (
                    <th key={s} style={{ padding: "4px 10px", color: "#b0a898", fontWeight: 500, textAlign: "center" }}>{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.colors.map((c, ci) => (
                  <tr key={c.name}>
                    <td style={{ padding: "5px 10px 5px 0", display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.hex, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
                      <span style={{ color: "#4a4440" }}>{c.name}</span>
                    </td>
                    {p.sizes.map((_, si) => {
                      const qty = Math.max(0, 8 - (ci * 3 + si) % 9);
                      return (
                        <td key={si} style={{ padding: "5px 10px", textAlign: "center" }}>
                          <span style={{
                            fontSize: 11,
                            color: qty === 0 ? "#d0c8be" : qty < 3 ? "#c0622a" : "#4a7a5a",
                            fontFamily: "monospace",
                          }}>
                            {qty === 0 ? "—" : qty}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
            {p.tags.map((t) => (
              <span key={t} style={{
                padding: "3px 10px", borderRadius: 999,
                background: "#f0ede6", color: "#7a6e60",
                fontSize: 11,
              }}>{t}</span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{
              flex: 1,
              padding: "14px 0",
              borderRadius: 6,
              background: "#1a1706",
              color: "#fafaf8",
              border: "none",
              fontSize: 14, fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
              onClick={() => onAddToCart(p)}
            >
              + 加入选款车
            </button>
            <button style={{
              padding: "14px 20px",
              borderRadius: 6,
              background: "#fff",
              color: "#6a6056",
              border: "1.5px solid #ede9e0",
              fontSize: 14,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              申请样衣
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .detail-layout {
          display: flex;
          flex-direction: column;
        }
        .detail-thumbs {
          display: flex;
        }
        @media (min-width: 768px) {
          .detail-layout {
            flex-direction: row;
            align-items: flex-start;
            gap: 48px;
            padding: 32px 32px 0;
          }
          .detail-images {
            width: 50%;
            flex-shrink: 0;
            position: sticky;
            top: 50px;
          }
          .detail-info {
            flex: 1;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
