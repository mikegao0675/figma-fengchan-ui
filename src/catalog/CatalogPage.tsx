import { useState, useMemo } from "react";
import { PRODUCTS } from "./data";
import type { Product } from "./data";
import CatalogHeader from "./CatalogHeader";
import ProductGrid from "./ProductGrid";
import ProductDetail from "./ProductDetail";
import MobileNav from "./MobileNav";

export default function CatalogPage() {
  const [category, setCategory] = useState("全部");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = category === "全部" || p.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.material.includes(q) ||
        p.tags.some((t) => t.includes(q));
      return matchCat && matchSearch;
    });
  }, [category, search]);

  const addToCart = (p: Product) => {
    setCart((prev) => prev.find((x) => x.id === p.id) ? prev : [...prev, p]);
  };

  if (selected) {
    return (
      <div style={{ background: "#fafaf8", minHeight: "100vh" }}>
        <ProductDetail
          product={selected}
          onBack={() => setSelected(null)}
          onAddToCart={(p) => { addToCart(p); setSelected(null); }}
        />
        <MobileNav cartCount={cart.length} />
      </div>
    );
  }

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh" }}>
      <CatalogHeader
        activeCategory={category}
        onCategory={setCategory}
        search={search}
        onSearch={setSearch}
        cartCount={cart.length}
      />

      {/* Result count */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 16px 0" }} className="md:px-6 lg:px-8">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "#b0a898" }}>
            {filtered.length} 款商品
            {search && <span> · 搜索"{search}"</span>}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ fontSize: 11, color: "#b0a898" }}>排序：</span>
            <button style={{ background: "none", border: "none", fontSize: 11, color: "#6a6056", cursor: "pointer", padding: 0, fontWeight: 600 }}>默认</button>
            <span style={{ fontSize: 11, color: "#d0c8be" }}>|</span>
            <button style={{ background: "none", border: "none", fontSize: 11, color: "#b0a898", cursor: "pointer", padding: 0 }}>价格↑</button>
            <span style={{ fontSize: 11, color: "#d0c8be" }}>|</span>
            <button style={{ background: "none", border: "none", fontSize: 11, color: "#b0a898", cursor: "pointer", padding: 0 }}>新品</button>
          </div>
        </div>
      </div>

      <ProductGrid
        products={filtered}
        onSelect={setSelected}
        onAddToCart={addToCart}
      />

      <MobileNav cartCount={cart.length} />

      {/* Cart toast */}
      {cart.length > 0 && (
        <div
          className="hidden md:flex"
          style={{
            position: "fixed", bottom: 32, right: 32,
            background: "#1a1706", color: "#fafaf8",
            padding: "14px 20px",
            borderRadius: 8,
            boxShadow: "0 8px 32px rgba(26,23,6,0.25)",
            display: "flex", alignItems: "center", gap: 12,
            zIndex: 40,
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600 }}>选款车 · {cart.length} 款</span>
          <button style={{
            padding: "6px 14px", borderRadius: 4,
            background: "#9b7b52", color: "#fff",
            border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>查看 →</button>
        </div>
      )}
    </div>
  );
}
