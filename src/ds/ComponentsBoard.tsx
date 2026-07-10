import { useState } from "react";
import { BoardTitle, SubTitle } from "./ColorBoard";

/* ─── Shared primitive styles ─── */
const card = {
  background: "#fff", border: "1px solid #e8e8e6",
  borderRadius: 8, padding: "20px",
};

const Row = ({ children, gap = 10 }: { children: React.ReactNode; gap?: number }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap, alignItems: "center", marginBottom: 8 }}>
    {children}
  </div>
);

/* ─── Buttons ─── */
function Buttons() {
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>按钮 · Button</p>
      <Row>
        <Btn variant="primary">主按钮</Btn>
        <Btn variant="secondary">次级按钮</Btn>
        <Btn variant="ghost">文字按钮</Btn>
        <Btn variant="danger">危险操作</Btn>
        <Btn variant="primary" size="sm">小按钮</Btn>
        <Btn variant="secondary" size="sm">小次级</Btn>
      </Row>
      <Row>
        <Btn variant="primary" disabled>禁用主</Btn>
        <Btn variant="secondary" disabled>禁用次</Btn>
        <Btn variant="primary" loading>加载中…</Btn>
        <Btn variant="outline">描边按钮</Btn>
        <Btn variant="primary" icon="↗">带图标</Btn>
      </Row>
    </div>
  );
}

function Btn({
  children, variant = "primary", size = "md", disabled = false, loading = false, icon, onClick,
}: {
  children: React.ReactNode; variant?: string; size?: "sm" | "md";
  disabled?: boolean; loading?: boolean; icon?: string; onClick?: () => void;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    borderRadius: 4, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
    border: "none", transition: "all 0.12s", opacity: disabled ? 0.45 : 1,
    fontSize: size === "sm" ? 12 : 13,
    padding: size === "sm" ? "5px 12px" : "8px 16px",
    letterSpacing: "0.01em",
  };
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: "#111", color: "#fff" },
    secondary: { background: "#f0f0ee", color: "#111" },
    ghost: { background: "transparent", color: "#5a5a5a" },
    danger: { background: "#dc2626", color: "#fff" },
    outline: { background: "transparent", color: "#111", border: "1.5px solid #ddd" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...styles[variant] }}>
      {loading && <span style={{ fontSize: 12 }}>⟳</span>}
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

/* ─── Inputs ─── */
function Inputs() {
  const [val, setVal] = useState("香云纱真丝旗袍");
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>输入框 · Input</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <InputField label="商品名称" value={val} onChange={setVal} placeholder="请输入" />
        <InputField label="SKU 编号" value="" onChange={() => {}} placeholder="HYS-001" mono />
        <InputField label="状态·错误" value="错误示例" onChange={() => {}} error="SKU 格式不正确" />
        <InputField label="状态·成功" value="正确填写" onChange={() => {}} success />
      </div>
      <div style={{ marginTop: 10 }}>
        <p style={{ margin: "0 0 6px", fontSize: 11, color: "#8a8a8a" }}>下拉选择 · Select</p>
        <SelectField />
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, mono, error, success }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; mono?: boolean; error?: string; success?: boolean;
}) {
  const borderColor = error ? "#dc2626" : success ? "#16a34a" : "#ddd";
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#5a5a5a", display: "block", marginBottom: 4 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", padding: "8px 10px",
            border: `1.5px solid ${borderColor}`,
            borderRadius: 4, fontSize: 13,
            fontFamily: mono ? "'JetBrains Mono',monospace" : undefined,
            background: "#fff", color: "#111", outline: "none",
          }}
        />
        {success && <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#16a34a", fontSize: 14 }}>✓</span>}
      </div>
      {error && <p style={{ margin: "3px 0 0", fontSize: 11, color: "#dc2626" }}>{error}</p>}
    </div>
  );
}

function SelectField() {
  const [v, setV] = useState("淘宝");
  return (
    <div style={{ position: "relative", display: "inline-block", width: 180 }}>
      <select
        value={v}
        onChange={(e) => setV(e.target.value)}
        style={{
          appearance: "none", width: "100%",
          padding: "8px 32px 8px 10px", borderRadius: 4,
          border: "1.5px solid #ddd", background: "#fff",
          fontSize: 13, color: "#111", cursor: "pointer",
        }}
      >
        {["淘宝", "抖音", "拼多多", "1688"].map((o) => <option key={o}>{o}</option>)}
      </select>
      <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#8a8a8a", pointerEvents: "none" }}>▾</span>
    </div>
  );
}

/* ─── Toggle ─── */
function ToggleDemo() {
  const [on, setOn] = useState(true);
  const [on2, setOn2] = useState(false);
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>开关 · Toggle</p>
      <Row gap={20}>
        <Toggle on={on} onChange={setOn} label="自动发货" />
        <Toggle on={on2} onChange={setOn2} label="库存预警" />
        <Toggle on={true} onChange={() => {}} label="禁用开关" disabled />
      </Row>
    </div>
  );
}

function Toggle({ on, onChange, label, disabled }: { on: boolean; onChange: (v: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <div
        onClick={() => !disabled && onChange(!on)}
        style={{
          width: 36, height: 20, borderRadius: 9999,
          background: on ? "#111" : "#ddd",
          position: "relative", transition: "background 0.2s",
          cursor: disabled ? "default" : "pointer",
        }}
      >
        <div style={{
          position: "absolute", top: 3, left: on ? 19 : 3,
          width: 14, height: 14, borderRadius: "50%", background: "#fff",
          transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </div>
      <span style={{ fontSize: 13, color: "#3a3a3a" }}>{label}</span>
    </label>
  );
}

/* ─── Chips ─── */
function Chips() {
  const [sel, setSel] = useState(new Set(["香云纱"]));
  const tags = ["香云纱", "莨绸", "真丝", "棉麻", "雪纺"];
  const statusChips = [
    { label: "待付款", color: "#5a5a5a", bg: "#f0f0ee" },
    { label: "待发货", color: "#ea580c", bg: "#ffedd5" },
    { label: "已发货", color: "#2563eb", bg: "#dbeafe" },
    { label: "已完成", color: "#16a34a", bg: "#dcfce7" },
    { label: "退款中", color: "#dc2626", bg: "#fee2e2" },
  ];

  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>标签 · Chip</p>
      <p style={{ margin: "0 0 6px", fontSize: 11, color: "#8a8a8a" }}>可选 Chip</p>
      <Row>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setSel((s) => { const n = new Set(s); n.has(t) ? n.delete(t) : n.add(t); return n; })}
            style={{
              padding: "4px 12px", borderRadius: 9999, fontSize: 12, fontWeight: 500,
              border: `1.5px solid ${sel.has(t) ? "#111" : "#e0e0de"}`,
              background: sel.has(t) ? "#111" : "#fff",
              color: sel.has(t) ? "#fff" : "#3a3a3a",
              cursor: "pointer", transition: "all 0.12s",
            }}
          >{t}</button>
        ))}
      </Row>
      <p style={{ margin: "8px 0 6px", fontSize: 11, color: "#8a8a8a" }}>状态标签</p>
      <Row>
        {statusChips.map((c) => (
          <span key={c.label} style={{ padding: "3px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 600, color: c.color, background: c.bg }}>
            {c.label}
          </span>
        ))}
      </Row>
    </div>
  );
}

/* ─── Metric Card ─── */
function MetricCardDemo() {
  const cards = [
    { label: "今日销售额", val: "128,460", unit: "元", change: 12.3, sub: "同比昨日" },
    { label: "待发货", val: "56", unit: "单", change: -8.2, sub: "较昨日" },
    { label: "今日退款", val: "4,320", unit: "元", change: -18.4, sub: "同比昨日" },
    { label: "毛利率", val: "—", unit: "", change: undefined, sub: "待接入", pending: true },
  ];
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>指标卡 · Metric Card</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
        {cards.map((c) => (
          <div key={c.label} style={{
            background: c.pending ? "#fafafa" : "#fff",
            border: `1px solid ${c.pending ? "#e8e8e6" : "#e5e5e3"}`,
            borderRadius: 8, padding: "14px",
            opacity: c.pending ? 0.6 : 1,
            borderStyle: c.pending ? "dashed" : "solid",
          }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#8a8a8a", letterSpacing: "0.06em" }}>{c.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, margin: "8px 0 4px" }}>
              <span className="mono" style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "#111" }}>{c.val}</span>
              <span style={{ fontSize: 12, color: "#8a8a8a" }}>{c.unit}</span>
            </div>
            {c.change !== undefined && (
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 11, color: c.change > 0 ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                  {c.change > 0 ? "▲" : "▼"} {Math.abs(c.change)}%
                </span>
                <span style={{ fontSize: 11, color: "#bbb" }}>{c.sub}</span>
              </div>
            )}
            {c.pending && <p style={{ margin: 0, fontSize: 11, color: "#bbb" }}>{c.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Data Table ─── */
const tableData = [
  { order: "#20240709-1823", product: "香云纱旗袍·月白 M", channel: "抖音直播", amount: "¥680", status: "待发货", time: "09:42" },
  { order: "#20240709-1812", product: "莨绸阔腿裤·烟灰 L", channel: "淘宝旗舰", amount: "¥420", status: "已发货", time: "09:21" },
  { order: "#20240709-1801", product: "真丝衬衫·杏粉 S", channel: "达人供货", amount: "¥360", status: "已完成", time: "08:55" },
  { order: "#20240709-1798", product: "香云纱半裙·墨绿 M", channel: "抖音直播", amount: "¥550", status: "退款中", time: "08:33" },
];

const statusColor: Record<string, { c: string; bg: string }> = {
  "待发货": { c: "#ea580c", bg: "#ffedd5" },
  "已发货": { c: "#2563eb", bg: "#dbeafe" },
  "已完成": { c: "#16a34a", bg: "#dcfce7" },
  "退款中": { c: "#dc2626", bg: "#fee2e2" },
};

function DataTable() {
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>数据表格 · Table（可横向滚动）</p>
      <div style={{ overflowX: "auto", borderRadius: 6, border: "1px solid #e8e8e6" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr style={{ background: "#f8f8f6", borderBottom: "1px solid #e8e8e6" }}>
              {["订单号", "商品", "渠道", "金额", "状态", "下单时间"].map((h) => (
                <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#8a8a8a", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr
                key={row.order}
                style={{ borderBottom: i < tableData.length - 1 ? "1px solid #f0f0ee" : "none", transition: "background 0.1s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
              >
                <td className="mono" style={{ padding: "10px 14px", fontSize: 12, color: "#2563eb", whiteSpace: "nowrap" }}>{row.order}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#111", whiteSpace: "nowrap" }}>{row.product}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#5a5a5a", whiteSpace: "nowrap" }}>{row.channel}</td>
                <td className="mono" style={{ padding: "10px 14px", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>{row.amount}</td>
                <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 9999, color: statusColor[row.status]?.c, background: statusColor[row.status]?.bg }}>{row.status}</span>
                </td>
                <td className="mono" style={{ padding: "10px 14px", fontSize: 12, color: "#8a8a8a", whiteSpace: "nowrap" }}>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── List Item ─── */
function ListItems() {
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>列表项 · List Item</p>
      <div style={{ border: "1px solid #e8e8e6", borderRadius: 6, overflow: "hidden" }}>
        {[
          { title: "香云纱旗袍·月白 M", sub: "HYS-001 · 库存 82 件", badge: "爆款", badgeColor: "#dc2626", badgeBg: "#fee2e2", val: "¥680" },
          { title: "莨绸阔腿裤·烟灰 L", sub: "LZC-023 · 库存 34 件", badge: "平销", badgeColor: "#8a8a8a", badgeBg: "#f0f0ee", val: "¥420" },
          { title: "真丝衬衫·杏粉 S", sub: "ZS-087 · 库存 3 件", badge: "预警", badgeColor: "#ea580c", badgeBg: "#ffedd5", val: "¥360" },
        ].map((item, i, arr) => (
          <div
            key={item.title}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 14px",
              borderBottom: i < arr.length - 1 ? "1px solid #f0f0ee" : "none",
              cursor: "pointer", transition: "background 0.1s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
          >
            <div style={{ width: 36, height: 36, background: "#f0f0ee", borderRadius: 6, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
              <p className="mono" style={{ margin: 0, fontSize: 11, color: "#8a8a8a", marginTop: 2 }}>{item.sub}</p>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 9999, color: item.badgeColor, background: item.badgeBg, flexShrink: 0 }}>{item.badge}</span>
            <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "#111", flexShrink: 0 }}>{item.val}</span>
            <span style={{ color: "#bbb", fontSize: 14, flexShrink: 0 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Tabs ─── */
function TabsDemo() {
  const [active, setActive] = useState(0);
  const tabs = ["全部", "待付款", "待发货", "运输中", "已完成", "退款"];
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>标签页 · Tab</p>
      {/* Line tabs */}
      <div style={{ borderBottom: "1px solid #e8e8e6", display: "flex", gap: 0, marginBottom: 12, overflowX: "auto" }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px", background: "transparent", border: "none",
              borderBottom: `2px solid ${active === i ? "#111" : "transparent"}`,
              fontSize: 13, fontWeight: active === i ? 600 : 400,
              color: active === i ? "#111" : "#8a8a8a",
              cursor: "pointer", whiteSpace: "nowrap", marginBottom: -1,
              transition: "color 0.12s",
            }}
          >{t}</button>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 12, color: "#bbb" }}>当前选中：{tabs[active]}</p>
    </div>
  );
}

/* ─── Top Nav ─── */
function TopNavDemo() {
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>顶部导航 · Top Nav（电脑版）</p>
      <div style={{
        background: "#fff", borderRadius: 6, border: "1px solid #e8e8e6",
        display: "flex", alignItems: "center", padding: "0 16px", height: 48,
      }}>
        <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", color: "#111", marginRight: 24 }}>FENGCHAN</span>
        {["数据总览", "订单管理", "商品", "库存", "供应商"].map((n, i) => (
          <button key={n} style={{
            padding: "6px 12px", background: i === 0 ? "#f0f0ee" : "transparent",
            border: "none", borderRadius: 4, fontSize: 13,
            fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "#111" : "#5a5a5a",
            cursor: "pointer", marginRight: 2,
          }}>{n}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 28, height: 28, background: "#f0f0ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🔔</div>
          <div style={{ width: 28, height: 28, background: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700 }}>凤</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Bottom Tab Bar ─── */
function MobileTabBar() {
  const [active, setActive] = useState(0);
  const items = [
    { icon: "📊", label: "数据" },
    { icon: "📦", label: "订单" },
    { icon: "🛍", label: "商品" },
    { icon: "⚙️", label: "设置" },
  ];
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>手机底部标签栏 · Mobile Tab Bar</p>
      <div style={{ maxWidth: 375, background: "#fff", border: "1px solid #e8e8e6", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ height: 80, background: "#f8f8f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: "#bbb" }}>页面内容区域</span>
        </div>
        <div style={{
          display: "flex", borderTop: "1px solid #e8e8e6",
          padding: "6px 0 2px",
        }}>
          {items.map((item, i) => (
            <button
              key={item.label}
              onClick={() => setActive(i)}
              style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "4px 0", background: "transparent", border: "none", cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 20, opacity: active === i ? 1 : 0.4 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: active === i ? 700 : 400, color: active === i ? "#111" : "#8a8a8a" }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar Nav ─── */
function SidebarDemo() {
  const [active, setActive] = useState("数据总览");
  const groups = [
    { label: "概览", items: ["数据总览"] },
    { label: "运营", items: ["订单管理", "商品管理", "库存看板"] },
    { label: "供应链", items: ["供应商", "欠货看板", "采购单"] },
    { label: "系统", items: ["账号设置"] },
  ];
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>侧边导航 · Sidebar（电脑版）</p>
      <div style={{ display: "flex", border: "1px solid #e8e8e6", borderRadius: 8, overflow: "hidden", height: 280 }}>
        <div style={{ width: 180, background: "#fafafa", borderRight: "1px solid #e8e8e6", padding: "12px 8px", overflowY: "auto", flexShrink: 0 }}>
          <div style={{ padding: "4px 10px 10px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.08em" }}>FENGCHAN</span>
          </div>
          {groups.map((g) => (
            <div key={g.label} style={{ marginBottom: 8 }}>
              <p style={{ margin: "0 0 2px", padding: "2px 10px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#bbb", textTransform: "uppercase" }}>{g.label}</p>
              {g.items.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "7px 10px", borderRadius: 5,
                    fontSize: 12, fontWeight: active === item ? 600 : 400,
                    background: active === item ? "#eee" : "transparent",
                    color: active === item ? "#111" : "#5a5a5a",
                    border: "none", cursor: "pointer", marginBottom: 1,
                  }}
                >{item}</button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: "#bbb" }}>{active} · 内容区</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>空态 · Empty State</p>
      <div style={{ border: "1px solid #e8e8e6", borderRadius: 8, padding: "40px 20px", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, background: "#f0f0ee", borderRadius: "50%", margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📭</div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#3a3a3a" }}>暂无订单数据</p>
        <p style={{ margin: "6px 0 16px", fontSize: 13, color: "#8a8a8a" }}>当前筛选条件下没有匹配的订单，试试调整筛选条件</p>
        <button style={{ padding: "7px 18px", background: "#111", color: "#fff", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>清除筛选</button>
      </div>
    </div>
  );
}

/* ─── Skeleton ─── */
function SkeletonDemo() {
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>加载骨架 · Skeleton</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[0, 1].map((k) => (
          <div key={k} style={{ background: "#fafafa", border: "1px solid #e8e8e6", borderRadius: 8, padding: 14 }}>
            <Skel w="40%" h={10} mb={8} />
            <Skel w="70%" h={28} mb={6} />
            <Skel w="50%" h={10} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, border: "1px solid #e8e8e6", borderRadius: 8, overflow: "hidden" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", borderBottom: i < 2 ? "1px solid #f0f0ee" : "none", alignItems: "center" }}>
            <div style={{ width: 32, height: 32, background: "#ebebeb", borderRadius: 6, flexShrink: 0, animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ flex: 1 }}>
              <Skel w="60%" h={10} mb={6} />
              <Skel w="40%" h={8} />
            </div>
            <Skel w="50px" h={10} />
          </div>
        ))}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}

function Skel({ w, h, mb = 0 }: { w: string; h: number; mb?: number }) {
  return (
    <div style={{
      width: w, height: h, background: "#ebebeb", borderRadius: 4, marginBottom: mb,
      animation: "pulse 1.5s ease-in-out infinite",
    }} />
  );
}

/* ─── Modal ─── */
function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>弹窗 · Modal</p>
      <button onClick={() => setOpen(true)} style={{ padding: "7px 16px", background: "#111", color: "#fff", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
        打开弹窗
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(0,0,0,0.4)", display: "flex",
          alignItems: "center", justifyContent: "center", padding: 16,
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#fff", borderRadius: 10, padding: "24px", width: "100%", maxWidth: 400,
            boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>确认取消订单</h3>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", fontSize: 20, color: "#aaa", cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <p style={{ fontSize: 13, color: "#5a5a5a", margin: "0 0 20px", lineHeight: 1.6 }}>
              取消后该订单将无法恢复，确认取消订单 <strong>#20240709-1823</strong> 吗？
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setOpen(false)} style={{ padding: "7px 16px", background: "#f0f0ee", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>取消</button>
              <button onClick={() => setOpen(false)} style={{ padding: "7px 16px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>确认取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Drawer ─── */
function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={card}>
      <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600 }}>抽屉 · Drawer</p>
      <button onClick={() => setOpen(true)} style={{ padding: "7px 16px", background: "#f0f0ee", border: "1px solid #e0e0de", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
        打开抽屉
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.3)", display: "flex", justifyContent: "flex-end" }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: "min(360px, 90vw)", background: "#fff", height: "100%",
            boxShadow: "0 0 32px rgba(0,0,0,0.12)",
            display: "flex", flexDirection: "column",
            animation: "slideIn 0.2s ease-out",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #e8e8e6" }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>订单详情</h3>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", fontSize: 20, color: "#aaa", cursor: "pointer" }}>×</button>
            </div>
            <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
              {[["订单号", "#20240709-1823"], ["商品", "香云纱旗袍·月白 M"], ["渠道", "抖音直播"], ["金额", "¥680"], ["状态", "待发货"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0ee" }}>
                  <span style={{ fontSize: 12, color: "#8a8a8a" }}>{k}</span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: 16, borderTop: "1px solid #e8e8e6" }}>
              <button style={{ width: "100%", padding: "10px", background: "#111", color: "#fff", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                确认发货
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>
    </div>
  );
}

/* ─── Main export ─── */
export default function ComponentsBoard() {
  return (
    <div>
      <BoardTitle label="基础组件" sub="UI Components" />

      <SubTitle label="动作 · Actions" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 24 }}>
        <Buttons />
      </div>

      <SubTitle label="表单 · Form" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12, marginBottom: 24 }}>
        <Inputs />
        <ToggleDemo />
        <Chips />
      </div>

      <SubTitle label="数据展示 · Data Display" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 24 }}>
        <MetricCardDemo />
        <DataTable />
        <ListItems />
      </div>

      <SubTitle label="导航 · Navigation" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 24 }}>
        <TabsDemo />
        <TopNavDemo />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <MobileTabBar />
          <SidebarDemo />
        </div>
      </div>

      <SubTitle label="反馈 · Feedback" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
        <EmptyState />
        <SkeletonDemo />
        <ModalDemo />
        <DrawerDemo />
      </div>
    </div>
  );
}
