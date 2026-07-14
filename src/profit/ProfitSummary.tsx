/* ── Pending placeholder value ── */
export function PendingVal({ label }: { label?: string }) {
  return (
    <div>
      <span className="mono" style={{ fontSize: 26, fontWeight: 800, color: "var(--border-strong)", letterSpacing: "-0.02em" }}>—</span>
      <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--border-strong)", display: "flex", alignItems: "center", gap: 4 }}>
        <span>🔒</span> {label ?? "待成本价接入"}
      </p>
    </div>
  );
}

/* ── Metric card ── */
function MetCard({
  label, value, unit, sub, change, pending, pendingLabel, accent, wide,
}: {
  label: string; value?: string; unit?: string; sub?: string;
  change?: number; pending?: boolean; pendingLabel?: string;
  accent?: string; wide?: boolean;
}) {
  const isUp = (change ?? 0) > 0;
  return (
    <div style={{
      background: "var(--surface)",
      border: `1px solid ${pending ? "var(--surface-raised)" : "var(--border)"}`,
      borderStyle: pending ? "dashed" : "solid",
      borderRadius: 10, padding: "18px",
      gridColumn: wide ? "span 2" : undefined,
      opacity: pending ? 0.75 : 1,
      position: "relative", overflow: "hidden",
    }}>
      {/* Pending watermark */}
      {pending && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.012) 12px, rgba(255,255,255,0.012) 14px)",
          pointerEvents: "none",
        }} />
      )}

      <p style={{ margin: "0 0 10px", fontSize: 13, color: pending ? "var(--text-faint)" : "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em" }}>
        {label}
      </p>

      {pending ? (
        <PendingVal label={pendingLabel} />
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span className="mono" style={{ fontSize: 30, fontWeight: 800, color: accent ?? "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              {value}
            </span>
            {unit && <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{unit}</span>}
          </div>
          {sub && <p style={{ margin: "5px 0 0", fontSize: 13, color: "var(--text-faint)" }}>{sub}</p>}
          {change !== undefined && (
            <div style={{ display: "flex", gap: 5, marginTop: 6, alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: isUp ? "var(--success)" : "var(--danger)" }}>
                {isUp ? "▲" : "▼"} {Math.abs(change)}%
              </span>
              <span style={{ fontSize: 12, color: "var(--border-strong)" }}>同比昨日</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Cost breakdown card ── */
function CostBreakCard() {
  return (
    <div style={{
      background: "var(--surface)", border: "1px dashed #1e1e1e",
      borderRadius: 10, padding: "18px", opacity: 0.75,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.012) 12px, rgba(255,255,255,0.012) 14px)",
        pointerEvents: "none",
      }} />
      <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--text-faint)", fontWeight: 600, letterSpacing: "0.08em" }}>净销售成本拆解</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { label: "商品净成本", pending: true, note: "采购/生产成本待录入" },
          { label: "运费支出", pending: false, value: "¥6,240", note: "已从ERP同步" },
          { label: "平台佣金", pending: true, note: "待对接平台结算API" },
          { label: "退货成本", pending: false, value: "¥890", note: "按退款单计算" },
        ].map((item) => (
          <div key={item.label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 10px",
            background: "var(--surface)", borderRadius: 6,
            border: "1px solid #1a1a1a",
          }}>
            <span style={{ fontSize: 12, color: item.pending ? "var(--text-faint)" : "var(--text-muted)" }}>{item.label}</span>
            <div style={{ textAlign: "right" }}>
              {item.pending ? (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 12 }}>🔒</span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--border-strong)" }}>—</span>
                </div>
              ) : (
                <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)" }}>{item.value}</span>
              )}
              <p style={{ margin: 0, fontSize: 12, color: "var(--border-strong)", marginTop: 1 }}>{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfitSummary() {
  return (
    <div style={{ marginBottom: 32 }}>
      {/* Top row: 5 key metrics */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10, marginBottom: 10,
      }} className="md:grid-cols-5">
        {/* Real data */}
        <MetCard label="净销售金额" value="112,830" unit="元" change={8.7} accent="var(--text-primary)" />
        <MetCard label="净销售单数" value="327" unit="单" change={5.1} />
        {/* Pending */}
        <MetCard label="净销售成本" pending pendingLabel="待成本价接入" />
        <MetCard label="今日总利润" pending pendingLabel="待成本价接入" />
        <MetCard label="今日利润率" pending pendingLabel="待成本价接入" />
      </div>

      {/* Second row: cost breakdown + progress towards yesterday */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="md:grid-cols-3">
        <CostBreakCard />

        {/* Revenue known panel */}
        <div style={{ background: "var(--surface)", border: "1px solid #222", borderRadius: 10, padding: "18px" }}>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em" }}>已知收入拆解</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "抖音直播", val: "¥58,600", pct: 52, color: "#a78bfa" },
              { label: "淘宝/天猫", val: "¥34,200", pct: 30, color: "var(--warn)" },
              { label: "批发渠道", val: "¥21,400", pct: 19, color: "var(--success)" },
              { label: "达人供货", val: "¥14,260",  pct: 13, color: "var(--info)" },
            ].map((r) => (
              <div key={r.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{r.label}</span>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)" }}>{r.val}</span>
                </div>
                <div style={{ height: 3, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${r.pct}%`, background: r.color, borderRadius: 2, transition: "width 0.5s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profit projection hint */}
        <div style={{ background: "var(--surface)", border: "1px solid #222", borderRadius: 10, padding: "18px" }}>
          <p style={{ margin: "0 0 6px", fontSize: 13, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em" }}>利润预测（参考）</p>
          <p style={{ margin: "0 0 14px", fontSize: 12, color: "var(--border-strong)" }}>基于行业均值估算，接入实际成本后替换</p>
          {[
            { label: "行业均值利润率", val: "~22%", note: "丝绸女装参考值" },
            { label: "预估利润（乐观）", val: "~¥24,800", note: "按 22% 估算" },
            { label: "预估利润（保守）", val: "~¥16,900", note: "按 15% 估算" },
          ].map((r) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1a1a1a" }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>{r.label}</p>
                <p style={{ margin: 0, fontSize: 12, color: "var(--border-strong)" }}>{r.note}</p>
              </div>
              <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-faint)", fontStyle: "italic" }}>{r.val}</span>
            </div>
          ))}
          <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--border-strong)", fontStyle: "italic" }}>
            ⚠ 以上为估算值，不作为经营依据，接入成本后自动失效
          </p>
        </div>
      </div>
    </div>
  );
}
