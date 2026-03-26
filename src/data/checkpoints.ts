export interface Checkpoint {
  id: string;
  name: string;
  shortName: string;
  baseModel: "SD1.5" | "SDXL" | "Pony" | "Illustrious" | "NAI";
  description: string;
  qualityPrompt: string;
  recommendedNegative: string;
}

export const checkpoints: Checkpoint[] = [
  {
    id: "pony",
    name: "Pony Diffusion V6 XL",
    shortName: "Pony XL",
    baseModel: "Pony",
    description: "アニメ・イラスト特化。スコアタグ使用",
    qualityPrompt: "score_9, score_8_up, score_7_up, score_6_up",
    recommendedNegative: "score_1, score_2, score_3, score_4, worst quality, bad quality",
  },
  {
    id: "illustrious",
    name: "Illustrious XL",
    shortName: "Illustrious",
    baseModel: "Illustrious",
    description: "高品質アニメ特化XLモデル",
    qualityPrompt: "masterpiece, best quality, very aesthetic, absurdres",
    recommendedNegative: "worst quality, low quality, bad anatomy, bad hands",
  },
  {
    id: "noob",
    name: "NoobAI XL (epsilon)",
    shortName: "NoobAI",
    baseModel: "Illustrious",
    description: "Illustrious系。アニメ・ゲーム風イラスト向け",
    qualityPrompt: "masterpiece, best quality, newest, absurdres, highres",
    recommendedNegative: "worst quality, low quality, normal quality, bad anatomy",
  },
  {
    id: "sdxl",
    name: "Stable Diffusion XL 1.0",
    shortName: "SDXL",
    baseModel: "SDXL",
    description: "汎用ベースモデル。写実・イラスト両対応",
    qualityPrompt: "high quality, detailed, 8k uhd, sharp focus",
    recommendedNegative: "lowres, blurry, bad anatomy, watermark, text",
  },
  {
    id: "realistic",
    name: "Realistic Vision V6",
    shortName: "Realistic V6",
    baseModel: "SD1.5",
    description: "フォトリアル特化。人物・風景写真向け",
    qualityPrompt: "RAW photo, masterpiece, best quality, realistic, photorealistic, 8k",
    recommendedNegative: "CGI, 3d render, anime, cartoon, drawing, (deformed, distorted, disfigured:1.3), bad anatomy, wrong anatomy",
  },
  {
    id: "anything",
    name: "Anything V5",
    shortName: "Anything V5",
    baseModel: "SD1.5",
    description: "アニメ特化SD1.5モデル。汎用性が高い",
    qualityPrompt: "masterpiece, best quality, ultra-detailed, illustration",
    recommendedNegative: "lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
  },
];
