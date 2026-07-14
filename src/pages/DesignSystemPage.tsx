import { useState, useEffect, useRef } from "react";
import ColorBoard from "../ds/ColorBoard";
import TypographyBoard from "../ds/TypographyBoard";
import SpecsBoard from "../ds/SpecsBoard";
import ComponentsBoard from "../ds/ComponentsBoard";
import GridBoard from "../ds/GridBoard";

const sections = [
  { id: "ds-colors",     label: "色板" },
  { id: "ds-typography", label: "字体层级" },
  { id: "ds-specs",      label: "间距·圆角·阴影" },
  { id: "ds-components", label: "基础组件" },
  { id: "ds-grid",       label: "响应式栅格" },
];

export default function DesignSystemPage() {
  const [active, setActive] = useState("ds-colors");
  const obsRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    obsRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obsRef.current?.observe(el);
    });
    return () => obsRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    /* Light-themed island inside the dark shell */
    <div style={{ background: "#f7f7f5", color: "var(--surface)", minHeight: "100%" }}>
      {/* DS sub-nav */}
      <div style={{ background: "rgba(247,247,245,0.95)", borderBottom: "1px solid #e5e5e3", padding: "0 24px", height: 44, display: "flex", alignItems: "center", gap: 4, position: "sticky", top: 50, zIndex: 30 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginRight: 8 }}>设计规范</span>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              padding: "3px 10px", borderRadius: 4, fontSize: 12,
              fontWeight: active === s.id ? 600 : 400,
              background: active === s.id ? "var(--surface)" : "transparent",
              color: active === s.id ? "#fff" : "var(--text-muted)",
              border: "none", cursor: "pointer", transition: "all 0.15s",
            }}
          >{s.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>设计规范</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 6px" }}>FENGCHAN Design System</h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>电商管理系统 · 组件库 · v1.0 · 黑白灰高级极简</p>
        </div>

        {[
          { id: "ds-colors",     el: <ColorBoard /> },
          { id: "ds-typography", el: <TypographyBoard /> },
          { id: "ds-specs",      el: <SpecsBoard /> },
          { id: "ds-components", el: <ComponentsBoard /> },
          { id: "ds-grid",       el: <GridBoard /> },
        ].map(({ id, el }) => (
          <section key={id} id={id} style={{ scrollMarginTop: 100, marginBottom: 64 }}>
            {el}
          </section>
        ))}
      </div>
    </div>
  );
}
