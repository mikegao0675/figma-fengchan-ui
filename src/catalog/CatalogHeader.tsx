import { useState } from "react";
import { CATEGORIES } from "./data";

interface CatalogHeaderProps {
  activeCategory: string;
  onCategory: (c: string) => void;
  search: string;
  onSearch: (s: string) => void;
  cartCount: number;
}

export default function CatalogHeader({
  activeCategory,
  onCategory,
  search,
  onSearch,
  cartCount,
}: CatalogHeaderProps) {
  const [focused, setFocused] = useState(false);

  return (
    <header style={{ background: "#fafaf8", borderBottom: "1px solid #ede9e0", position: "sticky", top: 0, zIndex: 40 }}>
      {/* Top bar */}
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}>
        {/* Brand */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.08em", color: "#1a1706", lineHeight: 1 }}>
            FENGCHAN
          </div>
          <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#9b8e7a", marginTop: 2, textTransform: "uppercase" }}>
            凤婵丝绸
          </div>
        </div>

        <div style={{ width: 1, height: 28, background: "#e0dbd2", flexShrink: 0 }} className="hidden md:block" />

        {/* Search */}
        <div style={{
          flex: 1,
          maxWidth: 440,
          position: "relative",
        }} className="hidden md:block">
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
            height: 38,
            background: focused ? "#fff" : "#f2ede4",
            border: `1px solid ${focused ? "#c8b898" : "transparent"}`,
            borderRadius: 6,
            transition: "all 0.2s",
          }}>
            <svg width="14" height="14" fill="none" stroke="#9b8e7a" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="搜索款号、品名、材质…"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 13,
                color: "#1a1706",
                fontFamily: "inherit",
              }}
            />
            {search && (
              <button
                onClick={() => onSearch("")}
                style={{ background: "none", border: "none", color: "#9b8e7a", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }}
              >×</button>
            )}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: "#6a6056", fontSize: 11,
          }} className="hidden md:flex">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            我的
          </button>

          {/* Cart */}
          <button style={{
            position: "relative",
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: "#1a1706", fontSize: 11,
          }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <div style={{
                position: "absolute", top: -4, right: -6,
                minWidth: 16, height: 16, borderRadius: 8,
                background: "#9b7b52", color: "#fff",
                fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 4px",
              }}>{cartCount}</div>
            )}
            选款车
          </button>
        </div>
      </div>

      {/* Mobile search row */}
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", gap: 10 }} className="md:hidden">
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 12px",
          height: 36,
          background: "#f2ede4",
          borderRadius: 6,
        }}>
          <svg width="13" height="13" fill="none" stroke="#9b8e7a" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="搜索款号、品名…"
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              fontSize: 13, color: "#1a1706", fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* Category chips */}
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "10px 24px 12px",
        display: "flex",
        gap: 8,
        overflowX: "auto",
      }}
        className="md:px-6"
      >
        {CATEGORIES.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => onCategory(cat)}
              style={{
                flexShrink: 0,
                padding: "5px 14px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: active ? 600 : 400,
                background: active ? "#1a1706" : "#f0ede6",
                color: active ? "#fafaf8" : "#6a6056",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s",
                letterSpacing: "0.02em",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </header>
  );
}
