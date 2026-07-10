import { spacing, radii, shadows } from "./tokens";
import { BoardTitle, SubTitle } from "./ColorBoard";

export default function SpecsBoard() {
  return (
    <div>
      <BoardTitle label="间距 · 圆角 · 阴影" sub="Spacing · Radius · Shadow" />

      <SubTitle label="间距系统 · Spacing Scale" />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 32, padding: "20px", background: "#fff", borderRadius: 8, border: "1px solid #e8e8e6" }}>
        {spacing.map((s) => (
          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: s, height: s, background: "#111", borderRadius: 2, minWidth: 2 }} />
            <span className="mono" style={{ fontSize: 10, color: "#8a8a8a" }}>{s}</span>
          </div>
        ))}
      </div>

      <SubTitle label="圆角 · Border Radius" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, marginBottom: 32 }}>
        {radii.map((r) => (
          <div key={r.name} style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 8, padding: "14px" }}>
            <div style={{
              width: 48, height: 48, background: "#f0f0ee", border: "2px solid #e0e0de",
              borderRadius: r.value, marginBottom: 10,
            }} />
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600 }}>radius-{r.name}</p>
            <p className="mono" style={{ margin: 0, fontSize: 11, color: "#8a8a8a", marginTop: 2 }}>{r.value}</p>
            <p style={{ margin: 0, fontSize: 11, color: "#bbb", marginTop: 3 }}>{r.usage}</p>
          </div>
        ))}
      </div>

      <SubTitle label="阴影 · Shadow" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {shadows.map((sh) => (
          <div key={sh.name} style={{
            background: "#fff", borderRadius: 8,
            padding: "20px",
            boxShadow: sh.value,
          }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>shadow-{sh.name}</p>
            <p style={{ margin: 0, fontSize: 11, color: "#8a8a8a", marginBottom: 8 }}>{sh.usage}</p>
            <p className="mono" style={{ margin: 0, fontSize: 9, color: "#bbb", lineHeight: 1.5, wordBreak: "break-all" }}>{sh.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
