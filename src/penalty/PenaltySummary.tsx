export default function PenaltySummary() {
  const total = 18640;
  const confirmed = 4320;
  const estimated = 14320;

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid #1e1e1e",
      borderRadius: 10,
      padding: "20px 24px",
      marginBottom: 4,
      display: "flex",
      flexWrap: "wrap",
      gap: "16px 40px",
      alignItems: "center",
    }}>
      {/* Hero: total estimated */}
      <div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
          本月预估总赔付
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span className="mono" style={{ fontSize: 42, fontWeight: 800, color: "var(--danger)", letterSpacing: "-0.04em", lineHeight: 1 }}>
            ¥{total.toLocaleString()}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 13, color: "var(--danger)", fontWeight: 600 }}>▲ 23.4%</span>
            <span style={{ fontSize: 12, color: "var(--text-faint)" }}>同比上月</span>
          </div>
        </div>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text-faint)" }}>
          若不及时处理，预计本月实际扣款超过此金额
        </p>
      </div>

      <div style={{ width: 1, height: 56, background: "var(--surface-raised)", flexShrink: 0 }} className="hidden md:block" />

      {/* Confirmed vs Estimated split */}
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
        <StatPill label="已确认扣款" value={confirmed} color="var(--danger)" desc="平台已扣，不可挽回" />
        <StatPill label="可挽救金额" value={estimated} color="var(--warn)" desc="立即发货可降低处罚" />
        <StatPill label="涉及订单数" value={63} unit="单" color="var(--text-primary)" desc="含已超时 8 单" />
        <StatPill label="涉及 SKU 数" value={34} unit="款" color="var(--text-primary)" desc="跨 3 大平台" />
      </div>
    </div>
  );
}

function StatPill({ label, value, unit = "元", color, desc }: { label: string; value: number; unit?: string; color: string; desc: string }) {
  return (
    <div>
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{label}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        {unit === "元" && <span style={{ fontSize: 12, color, opacity: 0.7 }}>¥</span>}
        <span className="mono" style={{ fontSize: 20, fontWeight: 700, color, letterSpacing: "-0.02em" }}>
          {value.toLocaleString()}
        </span>
        {unit !== "元" && <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{unit}</span>}
      </div>
      <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--text-faint)" }}>{desc}</p>
    </div>
  );
}
