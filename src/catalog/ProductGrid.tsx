import type { Product } from "./data";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductGrid({ products, onSelect, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px", color: "#b0a898" }}>
        <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>◎</div>
        <div style={{ fontSize: 15, fontWeight: 500 }}>暂无符合条件的商品</div>
        <div style={{ fontSize: 12, marginTop: 6 }}>试试调整分类或搜索词</div>
      </div>
    );
  }

  return (
    <div
      className="catalog-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 12,
        padding: "20px 16px 120px",
      }}
    >
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onSelect={onSelect}
          onAddToCart={onAddToCart}
        />
      ))}
      <style>{`
        @media (min-width: 768px) {
          .catalog-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            padding: 24px 24px 100px;
          }
        }
        @media (min-width: 1024px) {
          .catalog-grid {
            grid-template-columns: repeat(4, 1fr);
            padding: 28px 32px 100px;
          }
        }
        @media (min-width: 1280px) {
          .catalog-grid {
            max-width: 1280px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
