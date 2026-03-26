export type LoraCategory =
  | "クオリティ"
  | "スタイル"
  | "キャラクター"
  | "衣装・装飾"
  | "ポーズ・構図"
  | "エフェクト";

export interface LoraPreset {
  id: string;
  name: string;
  filename: string;
  category: LoraCategory;
  description: string;
  defaultWeight: number;
  triggerWords: string;
  compatibleWith: Array<"SD1.5" | "SDXL" | "Pony" | "Illustrious" | "NAI" | "all">;
}

export const loraPresets: LoraPreset[] = [
  // クオリティ
  {
    id: "add_detail",
    name: "Add Detail",
    filename: "add_detail",
    category: "クオリティ",
    description: "ディテールを大幅に強化する汎用LoRA",
    defaultWeight: 0.7,
    triggerWords: "add_detail",
    compatibleWith: ["all"],
  },
  {
    id: "good_hands",
    name: "GoodHands-beta2",
    filename: "GoodHands-beta2",
    category: "クオリティ",
    description: "手の描写を改善する",
    defaultWeight: 0.8,
    triggerWords: "",
    compatibleWith: ["SD1.5"],
  },
  {
    id: "film_grain",
    name: "FilmVelvia",
    filename: "FilmVelvia",
    category: "エフェクト",
    description: "フィルムグレイン・ベルビア風の発色",
    defaultWeight: 0.6,
    triggerWords: "film grain, FilmVelvia",
    compatibleWith: ["SD1.5", "SDXL"],
  },
  // スタイル
  {
    id: "flat_color",
    name: "Flat Color",
    filename: "flat2",
    category: "スタイル",
    description: "フラットカラーのイラスト風スタイル",
    defaultWeight: 0.8,
    triggerWords: "flat color, flat shading",
    compatibleWith: ["SD1.5", "Pony", "Illustrious"],
  },
  {
    id: "watercolor",
    name: "Watercolor Style",
    filename: "watercolor_v1",
    category: "スタイル",
    description: "水彩画風の柔らかいタッチ",
    defaultWeight: 0.75,
    triggerWords: "watercolor, watercolor painting, soft wash",
    compatibleWith: ["all"],
  },
  {
    id: "anime_lineart",
    name: "Anime Lineart",
    filename: "anime_lineart_style",
    category: "スタイル",
    description: "クリーンなアニメ風線画スタイル",
    defaultWeight: 0.8,
    triggerWords: "lineart, anime lineart",
    compatibleWith: ["SD1.5", "Pony", "Illustrious"],
  },
  {
    id: "pixel_art",
    name: "Pixel Art",
    filename: "pixelart_xl_v1.1",
    category: "スタイル",
    description: "レトロなピクセルアートスタイル",
    defaultWeight: 0.9,
    triggerWords: "pixel art, pixel, 16bit",
    compatibleWith: ["SDXL", "Pony"],
  },
  // 衣装・装飾
  {
    id: "school_uniform",
    name: "School Uniform",
    filename: "school_uniform_v2",
    category: "衣装・装飾",
    description: "日本の学校制服スタイル",
    defaultWeight: 0.8,
    triggerWords: "school uniform, serafuku",
    compatibleWith: ["SD1.5", "Pony", "Illustrious"],
  },
  {
    id: "maid",
    name: "Maid Outfit",
    filename: "maid_v2",
    category: "衣装・装飾",
    description: "メイド服スタイル",
    defaultWeight: 0.8,
    triggerWords: "maid, maid outfit, maid headdress",
    compatibleWith: ["SD1.5", "Pony", "Illustrious"],
  },
  {
    id: "fantasy_armor",
    name: "Fantasy Armor",
    filename: "fantasy_armor_v1",
    category: "衣装・装飾",
    description: "ファンタジー風の鎧・装備",
    defaultWeight: 0.85,
    triggerWords: "fantasy armor, plate armor, knight",
    compatibleWith: ["all"],
  },
  // ポーズ・構図
  {
    id: "dynamic_pose",
    name: "Dynamic Pose",
    filename: "dynamic_pose_v1",
    category: "ポーズ・構図",
    description: "ダイナミックなアクションポーズ",
    defaultWeight: 0.7,
    triggerWords: "dynamic pose, action pose",
    compatibleWith: ["all"],
  },
  {
    id: "sitting",
    name: "Sitting Pose",
    filename: "sitting_v1",
    category: "ポーズ・構図",
    description: "自然な座りポーズバリエーション",
    defaultWeight: 0.7,
    triggerWords: "sitting, sitting pose",
    compatibleWith: ["SD1.5", "Pony", "Illustrious"],
  },
  // エフェクト
  {
    id: "glowing",
    name: "Glowing Effect",
    filename: "glow_effect_v1",
    category: "エフェクト",
    description: "発光エフェクト・ライトブルーム",
    defaultWeight: 0.65,
    triggerWords: "glowing, bloom, light particles",
    compatibleWith: ["all"],
  },
  {
    id: "depth_of_field",
    name: "Depth of Field",
    filename: "depth_of_field_v2",
    category: "エフェクト",
    description: "被写界深度ボケ効果",
    defaultWeight: 0.6,
    triggerWords: "depth of field, bokeh, blurry background",
    compatibleWith: ["all"],
  },
];

export const LORA_CATEGORIES: LoraCategory[] = [
  "クオリティ",
  "スタイル",
  "キャラクター",
  "衣装・装飾",
  "ポーズ・構図",
  "エフェクト",
];

// アクティブなLoRAの状態型
export interface ActiveLora {
  id: string; // uniqueId (custom loraは "custom_" prefix)
  presetId?: string; // loraPresets の id (カスタムは undefined)
  name: string;
  filename: string;
  weight: number;
  triggerWords: string;
}
