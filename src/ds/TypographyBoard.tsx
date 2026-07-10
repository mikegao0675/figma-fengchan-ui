import { typography } from "./tokens";
import { BoardTitle } from "./ColorBoard";

export default function TypographyBoard() {
  return (
    <div>
      <BoardTitle label="字体层级" sub="Typography Scale" />
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {typography.map((t, i) => (
          <div
            key={t.name}
            style={{
              display: "grid", gridTemplateColumns: "180px 1fr auto",
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
                  `${t.size}`, `wt ${t.weight}`, `lh ${t.line}`,
                  t.tracking !== "0" ? `ls ${t.tracking}` : null,
                ].filter(Boolean).map((tag) => (
                  <span key={tag!} style={{ fontSize: 10, color: "#bbb", background: "#f0f0ee", borderRadius: 3, padding: "1px 5px" }}>{tag}</span>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 10, color: "#bbb", marginTop: 4 }}>{t.usage}</p>
            </div>

            {/* Sample */}
            <div
              style={{
                fontSize: t.size,
                fontWeight: t.weight as React.CSSProperties["fontWeight"],
                lineHeight: t.line,
                letterSpacing: t.tracking,
                color: "#111",
                fontFamily: t.name.includes("Mono") ? "'JetBrains Mono','Fira Code',monospace" : undefined,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}
            >
              {t.sample}
            </div>

            {/* Tag */}
            <span style={{ fontSize: 10, color: "#bbb", whiteSpace: "nowrap" }}>中文 / EN</span>
          </div>
        ))}
      </div>

      {/* Font family note */}
      <div style={{ marginTop: 24, padding: "16px 20px", background: "#fff", border: "1px solid #e8e8e6", borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#111", marginBottom: 6 }}>字体族</p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { name: "界面正文", family: "Inter, system-ui", note: "所有中英文UI文字" },
            { name: "等宽数据", family: "JetBrains Mono", note: "数字·SKU·订单号" },
          ].map((f) => (
            <div key={f.name}>
              <p style={{ margin: 0, fontSize: 11, color: "#8a8a8a" }}>{f.name}</p>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, marginTop: 2 }}>{f.family}</p>
              <p style={{ margin: 0, fontSize: 11, color: "#bbb", marginTop: 1 }}>{f.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
