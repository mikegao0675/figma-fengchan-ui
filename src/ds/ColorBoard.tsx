import { useState } from "react";
import { colors } from "./tokens";

export default function ColorBoard() {
  return (
    <div>
      <BoardTitle label="色板" sub="Color Palette" />

      <SubTitle label="主色系 · 黑白灰" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: 8, marginBottom: 32 }}>
        {colors.primary.map((c) => (
          <Swatch key={c.hex} {...c} />
        ))}
      </div>

      <SubTitle label="状态色 · Status" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
        {colors.status.map((c) => (
          <StatusSwatch key={c.hex} {...c} />
        ))}
      </div>
    </div>
  );
}

function Swatch({ name, hex, usage }: { name: string; hex: string; usage: string }) {
  const [copied, setCopied] = useState(false);
  const isLight = parseInt(hex.slice(1), 16) > 0xaaaaaa;

  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={copy}
      title={usage}
      style={{
        background: hex, border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 8, padding: 0, cursor: "pointer",
        overflow: "hidden", textAlign: "left",
        transition: "transform 0.1s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
    >
      <div style={{ height: 56 }} />
      <div style={{ background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)", padding: "8px 10px" }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: isLight ? "#333" : "#fff" }}>{name}</p>
        <p className="mono" style={{ margin: 0, fontSize: 10, color: isLight ? "#888" : "rgba(255,255,255,0.5)", marginTop: 2 }}>
          {copied ? "✓ 已复制" : hex}
        </p>
      </div>
    </button>
  );
}

function StatusSwatch({ name, hex, light, usage }: { name: string; hex: string; light: string; usage: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 8, overflow: "hidden", display: "flex" }}>
      <div style={{ width: 8, background: hex, flexShrink: 0 }} />
      <div style={{ display: "flex", gap: 12, padding: "12px 14px", alignItems: "center", flex: 1 }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: light, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: hex }} />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#111" }}>{name}</p>
          <p className="mono" style={{ margin: 0, fontSize: 11, color: "#8a8a8a" }}>{hex}</p>
          <p style={{ margin: 0, fontSize: 11, color: "#8a8a8a", marginTop: 1 }}>{usage}</p>
        </div>
      </div>
    </div>
  );
}

export function BoardTitle({ label, sub }: { label: string; sub?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24, paddingBottom: 12, borderBottom: "1px solid #e8e8e6" }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{label}</h2>
      {sub && <span style={{ fontSize: 12, color: "#bbb", fontStyle: "italic" }}>{sub}</span>}
    </div>
  );
}

export function SubTitle({ label }: { label: string }) {
  return <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#aaa", textTransform: "uppercase", marginBottom: 10, marginTop: 4 }}>{label}</p>;
}
