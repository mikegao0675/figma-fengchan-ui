import { typography } from "./tokens";
import { BoardTitle } from "./ColorBoard";

export default function TypographyBoard() {
  return (
    <div>
      <BoardTitle label="字体层级" sub="Typography Scale — min 12px · large screen ≥1600px scales up" />
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {typography.map((t, i) => (
          <div
            key={t.name}
            style={{
              display: "grid", gridTemplateColumns: "200px 1fr auto",
              gap: 24, padding: "20px 20px",
              background: i % 2 === 0 ? "#fff" : "transparent",
              borderRadius: 8, alignItems: "center",
            }}
          >
            {/* Meta */}
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#111" }}>{t.name}</p>
              <div className="mono" style={{ marginTop: 4, display: "flex", flexWrap: "wrap", gap: "4px 8px" }}>
                {[
                  t.cssPx,
                  `wt ${t.weight}`,
                  `lh ${t.lineHeight}`,
                  t.tracking ? `ls ${t.tracking}` : null,
                ].filter(Boolean).map((tag) => (
                  <span key={tag!} style={{ fontSize: 12, color: "#888", background: "#f0f0ee", borderRadius: 3, padding: "1px 5px" }}>{tag}</span>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#888", marginTop: 4 }}>{t.usage}</p>
              <p style={{ margin: 0, fontSize: 12, color: "#aaa", marginTop: 2 }}>大屏: {t.largePx}</p>
            </div>

            {/* Sample */}
            <div
              style={{
                fontSize: t.cssPx,
                fontWeight: t.weight as React.CSSProperties["fontWeight"],
                lineHeight: t.lineHeight,
                letterSpacing: t.tracking,
                color: "#111",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}
            >
              {t.sample}
            </div>

            <span style={{ fontSize: 12, color: "#aaa", whiteSpace: "nowrap" }}>中 / EN</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: "16px 20px", background: "#fff", border: "1px solid #e8e8e6", borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#111", marginBottom: 6 }}>字体族</p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { name: "界面正文", family: "Inter, system-ui, PingFang SC", note: "所有中英文UI文字" },
            { name: "等宽数据", family: "JetBrains Mono", note: "数字·SKU·订单号" },
            { name: "品牌展示", family: "Playfair Display", note: "货盘价格·品牌名" },
          ].map((f) => (
            <div key={f.name}>
              <p style={{ margin: 0, fontSize: 12, color: "#888" }}>{f.name}</p>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, marginTop: 2 }}>{f.family}</p>
              <p style={{ margin: 0, fontSize: 12, color: "#aaa", marginTop: 1 }}>{f.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
