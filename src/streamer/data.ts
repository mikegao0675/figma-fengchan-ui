export interface KolDetail {
  kolId: string;
  platform: string;
  store: string;
  sales: number;
  orders: number;
  qty: number;
  refundRate: number;
}

export interface StreamerGroup {
  id: string;
  name: string;
  rank: number;
  sales: number;
  orders: number;
  qty: number;
  refundRate: number;
  storeCount: number;
  details: KolDetail[];
}

export interface UnclaimedKol {
  kolId: string;
  platform: string;
  lastSeen: string;
  sales: number;
}

export interface UnclaimedStore {
  storeId: string;
  storeName: string;
  platform: string;
  sales: number;
}

export interface GroupDef {
  id: string;
  name: string;
  ruleCount: number;
  kols: string[];
  stores: string[];
}

export const STREAMER_GROUPS: StreamerGroup[] = [
  {
    id: "g1", name: "苏苏工作室", rank: 1,
    sales: 128640, orders: 342, qty: 890, refundRate: 8.5, storeCount: 3,
    details: [
      { kolId: "@苏苏_直播", platform: "抖音", store: "凤婵旗舰店", sales: 68420, orders: 181, qty: 472, refundRate: 7.2 },
      { kolId: "@苏苏_副号", platform: "抖音", store: "凤婵旗舰店", sales: 32180, orders: 89, qty: 231, refundRate: 9.4 },
      { kolId: "@苏苏搭配日记", platform: "快手", store: "凤婵快手旗舰", sales: 28040, orders: 72, qty: 187, refundRate: 10.1 },
    ],
  },
  {
    id: "g2", name: "凤姐甄选", rank: 2,
    sales: 96380, orders: 258, qty: 672, refundRate: 12.3, storeCount: 2,
    details: [
      { kolId: "@凤姐生活馆", platform: "抖音", store: "凤婵旗舰店", sales: 61240, orders: 164, qty: 427, refundRate: 11.8 },
      { kolId: "@凤姐甄选官方", platform: "小红书", store: "凤婵小红书店", sales: 35140, orders: 94, qty: 245, refundRate: 13.2 },
    ],
  },
  {
    id: "g3", name: "玉兰直播间", rank: 3,
    sales: 74290, orders: 201, qty: 521, refundRate: 6.8, storeCount: 4,
    details: [
      { kolId: "@玉兰主播", platform: "抖音", store: "凤婵旗舰店", sales: 31680, orders: 86, qty: 221, refundRate: 5.8 },
      { kolId: "@玉兰甄品", platform: "抖音", store: "凤婵直播2号", sales: 20480, orders: 54, qty: 142, refundRate: 7.4 },
      { kolId: "@玉兰生活", platform: "快手", store: "凤婵快手旗舰", sales: 14260, orders: 38, qty: 98, refundRate: 6.9 },
      { kolId: "@玉兰时尚号", platform: "微博", store: "凤婵微博店", sales: 7870, orders: 23, qty: 60, refundRate: 8.2 },
    ],
  },
  {
    id: "g4", name: "云舒服饰", rank: 4,
    sales: 52180, orders: 138, qty: 362, refundRate: 22.4, storeCount: 2,
    details: [
      { kolId: "@云舒主播A", platform: "抖音", store: "凤婵旗舰店", sales: 34920, orders: 91, qty: 241, refundRate: 24.1 },
      { kolId: "@云舒主播B", platform: "抖音", store: "凤婵直播2号", sales: 17260, orders: 47, qty: 121, refundRate: 19.2 },
    ],
  },
  {
    id: "g5", name: "小美推荐", rank: 5,
    sales: 41620, orders: 112, qty: 289, refundRate: 18.9, storeCount: 1,
    details: [
      { kolId: "@小美daily", platform: "小红书", store: "凤婵小红书店", sales: 25380, orders: 68, qty: 176, refundRate: 17.6 },
      { kolId: "@小美穿搭", platform: "小红书", store: "凤婵小红书店", sales: 16240, orders: 44, qty: 113, refundRate: 20.8 },
    ],
  },
  {
    id: "g6", name: "晴晴工作室", rank: 6,
    sales: 28940, orders: 76, qty: 197, refundRate: 14.6, storeCount: 2,
    details: [
      { kolId: "@晴晴看服装", platform: "抖音", store: "凤婵旗舰店", sales: 19240, orders: 51, qty: 132, refundRate: 13.8 },
      { kolId: "@晴晴副播", platform: "抖音", store: "凤婵直播2号", sales: 9700, orders: 25, qty: 65, refundRate: 16.0 },
    ],
  },
];

export const UNGROUPED_SALES = 18420;
export const UNGROUPED_ORDERS = 48;

export const UNGROUPED_KOLS: UnclaimedKol[] = [
  { kolId: "@达人2341号", platform: "抖音", lastSeen: "2026-07-12", sales: 8640 },
  { kolId: "@时尚博主CC", platform: "小红书", lastSeen: "2026-07-10", sales: 6280 },
  { kolId: "@丽姐生活vlog", platform: "快手", lastSeen: "2026-07-08", sales: 3500 },
];

export const UNGROUPED_STORES: UnclaimedStore[] = [
  { storeId: "s-ext1", storeName: "某某旗舰店(代播)", platform: "抖音", sales: 12800 },
  { storeId: "s-ext2", storeName: "凤婵直播间3号", platform: "抖音", sales: 5620 },
];

export const EXISTING_GROUPS: GroupDef[] = [
  { id: "g1", name: "苏苏工作室", ruleCount: 3, kols: ["@苏苏_直播", "@苏苏_副号", "@苏苏搭配日记"], stores: ["凤婵旗舰店", "凤婵快手旗舰"] },
  { id: "g2", name: "凤姐甄选", ruleCount: 2, kols: ["@凤姐生活馆", "@凤姐甄选官方"], stores: ["凤婵旗舰店", "凤婵小红书店"] },
  { id: "g3", name: "玉兰直播间", ruleCount: 4, kols: ["@玉兰主播", "@玉兰甄品", "@玉兰生活", "@玉兰时尚号"], stores: ["凤婵旗舰店", "凤婵直播2号", "凤婵快手旗舰", "凤婵微博店"] },
  { id: "g4", name: "云舒服饰", ruleCount: 2, kols: ["@云舒主播A", "@云舒主播B"], stores: ["凤婵旗舰店", "凤婵直播2号"] },
  { id: "g5", name: "小美推荐", ruleCount: 2, kols: ["@小美daily", "@小美穿搭"], stores: ["凤婵小红书店"] },
  { id: "g6", name: "晴晴工作室", ruleCount: 2, kols: ["@晴晴看服装", "@晴晴副播"], stores: ["凤婵旗舰店", "凤婵直播2号"] },
];

export const ALL_KOLS = [
  "@苏苏_直播", "@苏苏_副号", "@苏苏搭配日记",
  "@凤姐生活馆", "@凤姐甄选官方",
  "@玉兰主播", "@玉兰甄品", "@玉兰生活", "@玉兰时尚号",
  "@云舒主播A", "@云舒主播B",
  "@小美daily", "@小美穿搭",
  "@晴晴看服装", "@晴晴副播",
  "@达人2341号", "@时尚博主CC", "@丽姐生活vlog",
];

export const ALL_STORES = [
  "凤婵旗舰店", "凤婵直播2号", "凤婵快手旗舰",
  "凤婵小红书店", "凤婵微博店",
  "某某旗舰店(代播)", "凤婵直播间3号",
];
