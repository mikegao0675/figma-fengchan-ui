interface ShortageItem {
  sku: string;
  color: string;
  size: string;
  shortage: number;
}

interface Supplier {
  name: string;
  items: ShortageItem[];
}

const suppliers: Supplier[] = [
  {
    name: "广州华美丝织厂",
    items: [
      { sku: "HYS-001", color: "月白", size: "M", shortage: 24 },
      { sku: "HYS-001", color: "月白", size: "L", shortage: 18 },
      { sku: "HYS-032", color: "墨绿", size: "XL", shortage: 6 },
    ],
  },
  {
    name: "苏州锦绣坊",
    items: [
      { sku: "ZS-087", color: "杏粉", size: "S", shortage: 31 },
      { sku: "ZS-087", color: "杏粉", size: "M", shortage: 14 },
    ],
  },
  {
    name: "佛山南海丝绸",
    items: [
      { sku: "LZC-023", color: "烟灰", size: "M", shortage: 42 },
      { sku: "LZC-023", color: "烟灰", size: "L", shortage: 37 },
      { sku: "LZC-044", color: "藏蓝", size: "S", shortage: 9 },
    ],
  },
];

export default function StockShortage() {
  return (
    <div
      style={{ background: "var(--surface)", border: "1px solid #1e1e1e", borderRadius: 8, overflow: "hidden" }}
    >
      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 48px 48px 56px", padding: "8px 16px", borderBottom: "1px solid #1e1e1e" }}>
        {["供应商", "款号", "颜色", "尺码", "欠货"].map((h) => (
          <span key={h} style={{ fontSize: 12, color: "var(--text-faint)" }}>{h}</span>
        ))}
      </div>

      {suppliers.map((sup, si) => (
        <div key={sup.name}>
          {/* Supplier group header */}
          <div style={{
            padding: "6px 16px",
            background: "var(--surface)",
            borderBottom: "1px solid #1a1a1a",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{sup.name}</span>
            <span style={{
              fontSize: 12, color: "var(--warn)",
              background: "rgba(251,146,60,0.1)",
              border: "1px solid rgba(251,146,60,0.2)",
              borderRadius: 3, padding: "1px 5px",
            }}>
              {sup.items.reduce((s, i) => s + i.shortage, 0)} 件欠货
            </span>
          </div>

          {sup.items.map((item, ii) => (
            <div
              key={`${item.sku}-${item.color}-${item.size}`}
              style={{
                display: "grid", gridTemplateColumns: "80px 1fr 48px 48px 56px",
                padding: "9px 16px",
                borderBottom: ii < sup.items.length - 1 ? "1px solid #191919" : si < suppliers.length - 1 ? "1px solid #1e1e1e" : "none",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 12, color: "var(--border-strong)" }}></span>
              <span className="mono" style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.sku}</span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.color}</span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{item.size}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span className="mono" style={{
                  fontSize: 13, fontWeight: 700,
                  color: item.shortage >= 30 ? "var(--danger)" : item.shortage >= 15 ? "var(--warn)" : "var(--text-primary)",
                }}>
                  {item.shortage}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div style={{ padding: "8px 16px", borderTop: "1px solid #1e1e1e", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
          共 {suppliers.reduce((s, sup) => s + sup.items.length, 0)} 条欠货记录
        </span>
        <span style={{ fontSize: 12, color: "var(--text-faint)" }}>
          合计欠货 {suppliers.reduce((s, sup) => s + sup.items.reduce((ss, i) => ss + i.shortage, 0), 0)} 件
        </span>
      </div>
    </div>
  );
}
