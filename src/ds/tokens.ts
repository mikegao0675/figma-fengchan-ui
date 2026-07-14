/* ─────────────────────────────────────────────────────────────
   FENGCHAN Design System — Semantic Token Reference
   Actual runtime values live in src/index.css as CSS custom
   properties.  This file is the single source of truth for docs
   and the Design-System page.
   ───────────────────────────────────────────────────────────── */

export interface TokenSwatch {
  token: string;
  dark: string;
  light: string;
  usage: string;
}

export const colorTokens: TokenSwatch[] = [
  { token: "--bg",            dark: "#0c0c0c", light: "#fafafa", usage: "页面底色" },
  { token: "--surface",       dark: "#141414", light: "#ffffff", usage: "卡片 / 面板" },
  { token: "--surface-raised",dark: "#1e1e1e", light: "#f3f3f3", usage: "悬浮层 / hover / 弹出" },
  { token: "--border",        dark: "#222222", light: "#e2e2e2", usage: "默认边框 / 分割线" },
  { token: "--border-strong", dark: "#333333", light: "#c0c0c0", usage: "强调边框 / 输入框聚焦" },
  { token: "--text-primary",  dark: "#f0f0f0", light: "#1a1a1a", usage: "主文字 · ≥4.5:1 contrast" },
  { token: "--text-secondary",dark: "#a0a0a0", light: "#4b4b4b", usage: "次要文字 · 说明 · ≥4.5:1" },
  { token: "--text-muted",    dark: "#888888", light: "#666666", usage: "辅助小字 · 标签 · ≥4.5:1" },
  { token: "--text-faint",    dark: "#505050", light: "#999999", usage: "装饰性文字 / 分隔符" },
  { token: "--accent",        dark: "#f0f0f0", light: "#1a1a1a", usage: "品牌强调 / 主按钮底色" },
  { token: "--danger",        dark: "#f87171", light: "#dc2626", usage: "错误 / 退款 / 处罚" },
  { token: "--warn",          dark: "#fb923c", light: "#ea580c", usage: "预警 / 待处理" },
  { token: "--success",       dark: "#34d399", light: "#16a34a", usage: "涨幅 / 正常 / 完成" },
  { token: "--info",          dark: "#60a5fa", light: "#2563eb", usage: "信息 / 链接 / 接入中" },
];

/* ── Typography scale ── */
export interface TypoLevel {
  name: string;
  cssPx: string;
  largePx: string;
  weight: string;
  lineHeight: string;
  tracking?: string;
  usage: string;
  sample: string;
}

export const typography: TypoLevel[] = [
  {
    name: "Display",
    cssPx: "30px",
    largePx: "34px (≥1600px)",
    weight: "700",
    lineHeight: "1.1",
    tracking: "-0.03em",
    usage: "核心指标大数字",
    sample: "¥128,460",
  },
  {
    name: "Heading",
    cssPx: "20px",
    largePx: "24px (≥1600px)",
    weight: "700",
    lineHeight: "1.3",
    tracking: "-0.02em",
    usage: "卡片标题 / 模态标题",
    sample: "主播分析",
  },
  {
    name: "Title",
    cssPx: "16px",
    largePx: "18px (≥1600px)",
    weight: "600",
    lineHeight: "1.4",
    usage: "区块标题 / 表格标题行",
    sample: "渠道分析",
  },
  {
    name: "Body",
    cssPx: "14px",
    largePx: "15px (≥1600px)",
    weight: "400",
    lineHeight: "1.6",
    usage: "正文 / 表格行 / 普通标签",
    sample: "香云纱真丝旗袍·月白 M",
  },
  {
    name: "Caption",
    cssPx: "12px",
    largePx: "13px (≥1600px)",
    weight: "400",
    lineHeight: "1.5",
    tracking: "0.01em",
    usage: "口径说明 / 时间戳 / 徽章",
    sample: "数据口径：实付金额，延迟约15分钟",
  },
];

/* ── Legacy palette (for Design System page swatches) ── */
export const colors = {
  primary: [
    { name: "Black 900", hex: "#111111", usage: "主色·正文·最重强调" },
    { name: "Dark 800",  hex: "#1f1f1f", usage: "次级强调·深色标题" },
    { name: "Gray 700",  hex: "#3a3a3a", usage: "副标题·次要文字" },
    { name: "Gray 500",  hex: "#5a5a5a", usage: "三级文字·标签" },
    { name: "Gray 400",  hex: "#8a8a8a", usage: "禁用文字·占位符" },
    { name: "Gray 200",  hex: "#d5d5d3", usage: "分割线·边框" },
    { name: "Gray 100",  hex: "#e8e8e6", usage: "悬浮背景·输入边框" },
    { name: "Gray 50",   hex: "#f0f0ee", usage: "次要背景·标签底色" },
    { name: "White",     hex: "#ffffff", usage: "卡片·对话框" },
    { name: "Canvas",    hex: "#f7f7f5", usage: "页面底色" },
  ],
  status: [
    { name: "Success", hex: "#16a34a", light: "#dcfce7", usage: "成功·涨" },
    { name: "Warning", hex: "#ea580c", light: "#ffedd5", usage: "预警·待处理" },
    { name: "Danger",  hex: "#dc2626", light: "#fee2e2", usage: "危险·跌·错误" },
    { name: "Info",    hex: "#2563eb", light: "#dbeafe", usage: "信息·链接·选中" },
  ],
};

export const spacing = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64];

export const radii = [
  { name: "xs",   value: "2px",    usage: "标签·小徽章" },
  { name: "sm",   value: "4px",    usage: "按钮·输入框" },
  { name: "md",   value: "6px",    usage: "卡片·下拉菜单" },
  { name: "lg",   value: "8px",    usage: "标准卡片圆角" },
  { name: "xl",   value: "12px",   usage: "弹窗·抽屉" },
  { name: "full", value: "9999px", usage: "Chip·开关" },
];

export const shadows = [
  { name: "sm",    value: "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",  usage: "普通卡片" },
  { name: "md",    value: "0 4px 12px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)", usage: "悬浮卡片·下拉" },
  { name: "lg",    value: "0 12px 32px rgba(0,0,0,0.16), 0 4px 8px rgba(0,0,0,0.06)",usage: "弹窗·抽屉" },
  { name: "focus", value: "0 0 0 3px rgba(240,240,240,0.15)",                          usage: "焦点环·深色" },
];
