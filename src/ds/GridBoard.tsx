import { BoardTitle, SubTitle } from "./ColorBoard";

export default function GridBoard() {
  return (
    <div>
      <BoardTitle label="响应式栅格" sub="Responsive Grid" />

      <SubTitle label="手机竖屏 · 375px · 4栏" />
      <MobileGrid />

      <div style={{ marginTop: 32 }} />
      <SubTitle label="电脑宽屏 · 1280px+ · 12栏" />
      <DesktopGrid />

      <div style={{ marginTop: 32 }} />
      <SubTitle label="常用布局模板" />
      <LayoutTemplates />
    </div>
  );
}

function MobileGrid() {
  return (
    <div style={{ maxWidth: 375, border: "1px solid #e8e8e6", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
      {/* Phone frame top */}
      <div style={{ background: "#111", padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#fff", fontWeight: 700, letterSpacing: "0.1em" }}>FENGCHAN</span>
        <span style={{ fontSize: 12, color: "#888" }}>09:41</span>
      </div>

      {/* 4-col grid demo */}
      <div style={{ padding: "12px", background: "#f7f7f5" }}>
        <p style={{ margin: "0 0 8px", fontSize: 10, color: "#bbb", letterSpacing: "0.1em" }}>4-COLUMN GRID · 8px GUTTER · 12px MARGIN</p>

        {/* 2-col metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
          {["今日销售额\n¥128,460", "待发货\n56 单", "今日退款\n¥4,320", "订单总数\n347 单"].map((txt) => {
            const [label, val] = txt.split("\n");
            return (
              <div key={label} style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 8, padding: "12px" }}>
                <p style={{ margin: 0, fontSize: 10, color: "#8a8a8a" }}>{label}</p>
                <p className="mono" style={{ margin: "4px 0 0", fontSize: 15, fontWeight: 700 }}>{val}</p>
              </div>
            );
          })}
        </div>

        {/* Full-width chart area */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 8, padding: "12px", marginBottom: 8 }}>
          <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 600 }}>销售趋势</p>
          <div style={{ height: 80, background: "#f8f8f6", borderRadius: 4, display: "flex", alignItems: "flex-end", padding: "8px", gap: 3 }}>
            {[40,55,45,70,65,80,90,75,85,95,88,100].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 11 ? "#111" : "#e0e0de", borderRadius: "2px 2px 0 0" }} />
            ))}
          </div>
        </div>

        {/* Full-width list */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 8, overflow: "hidden" }}>
          {["香云纱旗袍·月白 M", "莨绸阔腿裤·烟灰 L", "真丝衬衫·杏粉 S"].map((name, i) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderBottom: i < 2 ? "1px solid #f5f5f5" : "none" }}>
              <div style={{ width: 28, height: 28, background: "#f0f0ee", borderRadius: 4, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 12, color: "#111" }}>{name}</span>
              <span style={{ fontSize: 10, color: "#bbb" }}>›</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom tab bar */}
      <div style={{ display: "flex", borderTop: "1px solid #e8e8e6", padding: "6px 0 2px", background: "#fff" }}>
        {[["📊", "数据"], ["📦", "订单"], ["🛍", "商品"], ["⚙️", "设置"]].map(([icon, label], i) => (
          <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 18, opacity: i === 0 ? 1 : 0.4 }}>{icon}</span>
            <span style={{ fontSize: 10, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? "#111" : "#8a8a8a" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopGrid() {
  return (
    <div style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 10, overflow: "hidden" }}>
      {/* Top nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e6", padding: "0 20px", height: 44, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em" }}>FENGCHAN</span>
        <div style={{ width: 1, height: 16, background: "#e0e0de" }} />
        {["数据总览", "订单", "商品", "库存"].map((n, i) => (
          <span key={n} style={{ fontSize: 11, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "#111" : "#8a8a8a" }}>{n}</span>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ width: 22, height: 22, background: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", fontWeight: 700 }}>凤</div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Sidebar: ~200px = ~2.5/12 */}
        <div style={{ width: 160, flexShrink: 0, background: "#fafafa", borderRight: "1px solid #e8e8e6", padding: "12px 8px" }}>
          <p style={{ margin: "0 0 4px", padding: "2px 8px", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#bbb", textTransform: "uppercase" }}>概览</p>
          {["数据总览"].map((n) => (
            <div key={n} style={{ padding: "6px 8px", borderRadius: 4, background: "#eee", fontSize: 11, fontWeight: 600, marginBottom: 2 }}>{n}</div>
          ))}
          <p style={{ margin: "8px 0 4px", padding: "2px 8px", fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#bbb", textTransform: "uppercase" }}>运营</p>
          {["订单管理", "商品管理", "库存看板"].map((n) => (
            <div key={n} style={{ padding: "6px 8px", borderRadius: 4, fontSize: 11, color: "#5a5a5a", marginBottom: 2 }}>{n}</div>
          ))}
        </div>

        {/* Main: 12-col */}
        <div style={{ flex: 1, padding: "16px", background: "#f7f7f5", minWidth: 0 }}>
          <p style={{ margin: "0 0 10px", fontSize: 9, color: "#bbb", letterSpacing: "0.1em" }}>12-COLUMN GRID · 16px GUTTER · 24px MARGIN</p>

          {/* 6 metric cards (each 2/12) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 10 }}>
            {["销售额", "净销售额", "发货单数", "待发货", "退款", "毛利(待接)"].map((n, i) => (
              <div key={n} style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 6, padding: "10px", opacity: i === 5 ? 0.5 : 1 }}>
                <p style={{ margin: 0, fontSize: 9, color: "#8a8a8a" }}>{n}</p>
                <p className="mono" style={{ margin: "4px 0 0", fontSize: 14, fontWeight: 700 }}>{i === 5 ? "—" : (Math.round(Math.random() * 999 + 100)).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Trend (8/12) + Channel (4/12) */}
          <div style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: 8, marginBottom: 10 }}>
            <div style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 6, padding: "10px" }}>
              <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 600 }}>销售趋势 · 8/12 栏</p>
              <div style={{ height: 60, background: "#f8f8f6", borderRadius: 4, display: "flex", alignItems: "flex-end", padding: "6px", gap: 2 }}>
                {[30,45,40,60,55,75,80,70,82,92,85,100,95,88].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 13 ? "#111" : "#e0e0de", borderRadius: "2px 2px 0 0" }} />
                ))}
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 6, padding: "10px" }}>
              <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 600 }}>渠道分析 · 4/12 栏</p>
              {["抖音直播 46%", "淘宝 27%", "批发 17%", "达人 10%"].map((l) => (
                <div key={l} style={{ fontSize: 9, color: "#5a5a5a", marginBottom: 4, display: "flex", gap: 4, alignItems: "center" }}>
                  <div style={{ height: 4, width: `${parseInt(l.match(/\d+/)![0])}%`, background: "#111", borderRadius: 2, transition: "width 0.3s" }} />
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full-width table */}
          <div style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 6, padding: "10px" }}>
            <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 600 }}>订单列表 · 12/12 栏</p>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 2fr 1fr 0.8fr 1fr", gap: 4 }}>
              {["订单号", "商品", "渠道", "金额", "状态"].map((h) => (
                <span key={h} style={{ fontSize: 9, color: "#bbb", fontWeight: 700, letterSpacing: "0.06em" }}>{h}</span>
              ))}
              {[
                ["#1823", "香云纱旗袍·月白", "抖音", "¥680", "待发货"],
                ["#1812", "莨绸阔腿裤·灰", "淘宝", "¥420", "已完成"],
              ].flatMap((row) => row.map((cell, ci) => (
                <span key={cell + ci} style={{ fontSize: 10, color: "#3a3a3a", paddingTop: 4, borderTop: "1px solid #f5f5f5" }}>{cell}</span>
              )))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LayoutTemplates() {
  const templates = [
    {
      name: "仪表盘布局",
      desc: "侧边导航 200px + 主内容区，顶部指标卡满栏，下方趋势图+侧栏 7:5",
      cols: [{ w: "200px", label: "侧边栏\n200px", fixed: true }, { w: "1fr", label: "主内容\n7:5 grid / 12-col", fixed: false }],
    },
    {
      name: "订单列表布局",
      desc: "顶部导航 + 全宽表格区，左侧筛选器 240px，右侧结果列表",
      cols: [{ w: "240px", label: "筛选器\n240px", fixed: true }, { w: "1fr", label: "订单表格\n可横向滚动", fixed: false }],
    },
    {
      name: "手机单列布局",
      desc: "375px 单列，顶部搜索栏，2列指标卡，全宽图表，全宽列表，底部Tab",
      cols: [{ w: "1fr", label: "375px 单列\n2-col grid 内部", fixed: false }],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {templates.map((t) => (
        <div key={t.name} style={{ background: "#fff", border: "1px solid #e8e8e6", borderRadius: 8, padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{t.name}</p>
              <p style={{ margin: "3px 0 0", fontSize: 11, color: "#8a8a8a" }}>{t.desc}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, height: 64 }}>
            {t.cols.map((c) => (
              <div key={c.label} style={{
                background: c.fixed ? "#f0f0ee" : "#e8e8e6",
                borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                flex: c.fixed ? "none" : 1, width: c.fixed ? c.w : undefined,
                border: `1px ${c.fixed ? "dashed" : "solid"} #d5d5d3`,
              }}>
                <span style={{ fontSize: 10, color: "#5a5a5a", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.4 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
