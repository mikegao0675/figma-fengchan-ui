export type StockStatus = "现货" | "预售" | "补货中" | "售罄";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  category: string;
  retailPrice: number;
  wholesalePrice: number;
  minOrder: number;
  stock: StockStatus;
  stockQty: number;
  image: string;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  material: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

const IMGS = {
  dress1: "https://images.unsplash.com/photo-1563780352462-b04a1154f434?w=600&h=800&fit=crop&auto=format",
  dress2: "https://images.unsplash.com/photo-1602629339830-b7848e2ff629?w=600&h=800&fit=crop&auto=format",
  dress3: "https://images.unsplash.com/photo-1615262239202-b8baf40fe5cf?w=600&h=800&fit=crop&auto=format",
  dress4: "https://images.unsplash.com/photo-1777274151754-928ee653275d?w=600&h=800&fit=crop&auto=format",
  shirt1: "https://images.unsplash.com/photo-1777462985111-9da64fb2e6e6?w=600&h=800&fit=crop&auto=format",
  shirt2: "https://images.unsplash.com/photo-1612889002991-fbfaf775d231?w=600&h=800&fit=crop&auto=format",
  model1: "https://images.unsplash.com/photo-1590515675566-587084683363?w=600&h=800&fit=crop&auto=format",
  model2: "https://images.unsplash.com/photo-1781834962175-eafa584cd450?w=600&h=800&fit=crop&auto=format",
};

export const PRODUCTS: Product[] = [
  {
    id: "p01",
    code: "FC-2401",
    name: "云烟香云纱真丝连衣裙",
    subtitle: "流云暗纹 · 手工镶边",
    category: "香云纱",
    retailPrice: 2980,
    wholesalePrice: 1680,
    minOrder: 3,
    stock: "现货",
    stockQty: 24,
    image: IMGS.dress1,
    images: [IMGS.dress1, IMGS.model2, IMGS.dress2],
    colors: [
      { name: "墨色", hex: "#2c2826" },
      { name: "藕粉", hex: "#d9b8b0" },
      { name: "烟青", hex: "#8fa89a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "香云纱 · 100% 桑蚕丝",
    tags: ["新中式", "香云纱", "真丝"],
    isNew: true,
    isFeatured: true,
  },
  {
    id: "p02",
    code: "FC-2402",
    name: "新中式盘扣真丝衬衫",
    subtitle: "立领盘扣 · 素雅克制",
    category: "新中式",
    retailPrice: 1680,
    wholesalePrice: 880,
    minOrder: 5,
    stock: "现货",
    stockQty: 48,
    image: IMGS.shirt1,
    images: [IMGS.shirt1, IMGS.shirt2, IMGS.model1],
    colors: [
      { name: "象牙白", hex: "#f5f0e8" },
      { name: "月灰", hex: "#c8c4bc" },
      { name: "深靛", hex: "#2d3a5a" },
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "19mm 桑蚕丝素缎",
    tags: ["新中式", "真丝"],
    isFeatured: true,
  },
  {
    id: "p03",
    code: "FC-2403",
    name: "改良真丝旗袍",
    subtitle: "鱼骨撑型 · 手绣领口",
    category: "真丝旗袍",
    retailPrice: 3680,
    wholesalePrice: 2080,
    minOrder: 2,
    stock: "预售",
    stockQty: 0,
    image: IMGS.dress4,
    images: [IMGS.dress4, IMGS.dress3, IMGS.model2],
    colors: [
      { name: "胭脂红", hex: "#c0392b" },
      { name: "祖母绿", hex: "#1a6b4a" },
      { name: "墨黑", hex: "#1a1a1a" },
    ],
    sizes: ["XS", "S", "M", "L"],
    material: "22mm 重磅真丝素绉缎",
    tags: ["真丝旗袍", "礼服"],
  },
  {
    id: "p04",
    code: "FC-2404",
    name: "香云纱半身裙",
    subtitle: "A字廓形 · 自然垂感",
    category: "香云纱",
    retailPrice: 1980,
    wholesalePrice: 1080,
    minOrder: 3,
    stock: "现货",
    stockQty: 32,
    image: IMGS.dress3,
    images: [IMGS.dress3, IMGS.dress1, IMGS.model1],
    colors: [
      { name: "黑棕", hex: "#3a2e28" },
      { name: "米驼", hex: "#c9b99a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "香云纱 · 纯手工整理",
    tags: ["香云纱", "下装"],
    isNew: true,
  },
  {
    id: "p05",
    code: "FC-2405",
    name: "真丝阔腿裤",
    subtitle: "高腰剪裁 · 飘逸垂坠",
    category: "真丝休闲",
    retailPrice: 1480,
    wholesalePrice: 780,
    minOrder: 5,
    stock: "现货",
    stockQty: 60,
    image: IMGS.shirt2,
    images: [IMGS.shirt2, IMGS.shirt1, IMGS.model2],
    colors: [
      { name: "象牙", hex: "#f0ead8" },
      { name: "烟灰", hex: "#9a9590" },
      { name: "藏青", hex: "#1c2d44" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    material: "16mm 桑蚕丝双绉",
    tags: ["真丝", "休闲"],
  },
  {
    id: "p06",
    code: "FC-2406",
    name: "新中式真丝外套",
    subtitle: "对襟立领 · 轻奢质感",
    category: "新中式",
    retailPrice: 2480,
    wholesalePrice: 1380,
    minOrder: 3,
    stock: "补货中",
    stockQty: 6,
    image: IMGS.model1,
    images: [IMGS.model1, IMGS.dress2, IMGS.shirt2],
    colors: [
      { name: "烟紫", hex: "#7a6b8a" },
      { name: "水绿", hex: "#7aada8" },
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "香云纱外层 · 桑蚕丝里衬",
    tags: ["新中式", "外套", "香云纱"],
  },
  {
    id: "p07",
    code: "FC-2407",
    name: "香云纱吊带连衣裙",
    subtitle: "细肩带 · 斜裁设计",
    category: "香云纱",
    retailPrice: 2280,
    wholesalePrice: 1280,
    minOrder: 3,
    stock: "现货",
    stockQty: 18,
    image: IMGS.dress2,
    images: [IMGS.dress2, IMGS.dress1, IMGS.model1],
    colors: [
      { name: "杏色", hex: "#e8c99a" },
      { name: "黑棕", hex: "#2a2320" },
    ],
    sizes: ["XS", "S", "M", "L"],
    material: "香云纱 · 手工珠边",
    tags: ["香云纱", "吊带"],
    isFeatured: true,
  },
  {
    id: "p08",
    code: "FC-2408",
    name: "真丝家居睡袍",
    subtitle: "宽松廓形 · 居家轻奢",
    category: "真丝休闲",
    retailPrice: 1280,
    wholesalePrice: 680,
    minOrder: 5,
    stock: "现货",
    stockQty: 42,
    image: IMGS.model2,
    images: [IMGS.model2, IMGS.shirt1, IMGS.dress3],
    colors: [
      { name: "藕粉", hex: "#e0c4bc" },
      { name: "象牙", hex: "#f2ede0" },
      { name: "深蓝", hex: "#1e3050" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    material: "22mm 桑蚕丝素绉缎",
    tags: ["真丝", "家居"],
  },
];

export const CATEGORIES = ["全部", "香云纱", "新中式", "真丝旗袍", "真丝休闲"];

export const STOCK_COLOR: Record<StockStatus, { text: string; bg: string }> = {
  "现货": { text: "#2d7a4a", bg: "#e8f5ee" },
  "预售": { text: "#7a5a2d", bg: "#f5ede0" },
  "补货中": { text: "#5a6a7a", bg: "#e8edf2" },
  "售罄": { text: "#9a4040", bg: "#f5e8e8" },
};
