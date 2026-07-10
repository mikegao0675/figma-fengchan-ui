export const colors = {
  // Primary scale
  primary: [
    { name: "Black 900", hex: "#111111", usage: "主色·正文·最重强调" },
    { name: "Dark 800", hex: "#1f1f1f", usage: "次级强调·深色标题" },
    { name: "Gray 700", hex: "#3a3a3a", usage: "副标题·次要文字" },
    { name: "Gray 500", hex: "#5a5a5a", usage: "三级文字·标签" },
    { name: "Gray 400", hex: "#8a8a8a", usage: "禁用文字·占位符" },
    { name: "Gray 200", hex: "#d5d5d3", usage: "分割线·边框" },
    { name: "Gray 100", hex: "#e8e8e6", usage: "悬浮背景·输入边框" },
    { name: "Gray 50", hex: "#f0f0ee", usage: "次要背景·标签底色" },
    { name: "White", hex: "#ffffff", usage: "卡片·对话框" },
    { name: "Canvas", hex: "#f7f7f5", usage: "页面底色" },
  ],
  status: [
    { name: "Success", hex: "#16a34a", light: "#dcfce7", usage: "成功·涨" },
    { name: "Warning", hex: "#ea580c", light: "#ffedd5", usage: "预警·待处理" },
    { name: "Danger", hex: "#dc2626", light: "#fee2e2", usage: "危险·跌·错误" },
    { name: "Info", hex: "#2563eb", light: "#dbeafe", usage: "信息·链接·选中" },
  ],
};

export const typography = [
  { name: "大数字强调", size: "36px", weight: "700", line: "1.1", tracking: "-0.03em", usage: "核心指标数字", sample: "128,460" },
  { name: "页面标题 H1", size: "24px", weight: "700", line: "1.25", tracking: "-0.02em", usage: "页面主标题", sample: "数据智能仪表盘" },
  { name: "区块标题 H2", size: "16px", weight: "600", line: "1.4", tracking: "-0.01em", usage: "卡片/区块标题", sample: "销售趋势" },
  { name: "正文 Body", size: "14px", weight: "400", line: "1.6", tracking: "0", usage: "普通正文内容", sample: "香云纱真丝旗袍·月白 M" },
  { name: "小字说明 Caption", size: "12px", weight: "400", line: "1.5", tracking: "0.01em", usage: "辅助说明·时间戳", sample: "同比上周 +12.3%" },
  { name: "微标签 Label", size: "11px", weight: "600", line: "1.3", tracking: "0.08em", usage: "状态标签·上方小标", sample: "今日销售额" },
  { name: "数据单行 Mono", size: "13px", weight: "500", line: "1.4", tracking: "0", usage: "订单号·SKU·数值", sample: "HYS-001 · #20240709" },
];

export const spacing = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64];

export const radii = [
  { name: "xs", value: "2px", usage: "标签·小徽章" },
  { name: "sm", value: "4px", usage: "按钮·输入框" },
  { name: "md", value: "6px", usage: "卡片·下拉菜单" },
  { name: "lg", value: "10px", usage: "弹窗·抽屉·大卡片" },
  { name: "xl", value: "16px", usage: "手机底部弹层" },
  { name: "full", value: "9999px", usage: "Chip·开关" },
];

export const shadows = [
  { name: "sm", value: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)", usage: "普通卡片" },
  { name: "md", value: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)", usage: "悬浮卡片·下拉" },
  { name: "lg", value: "0 12px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04)", usage: "弹窗·抽屉" },
  { name: "focus", value: "0 0 0 3px rgba(17,17,17,0.12)", usage: "焦点环" },
];
