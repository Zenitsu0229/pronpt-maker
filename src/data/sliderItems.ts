export interface SliderItem {
  id: string;
  label: string;
  labelEn: string;
  value: string;
}

export const SLIDER_ITEMS: SliderItem[] = [
  { id: "tears",        label: "涙",       labelEn: "tears",           value: "tears" },
  { id: "sweat",        label: "汗",       labelEn: "sweat",           value: "sweat" },
  { id: "drooling",     label: "よだれ",   labelEn: "drooling",        value: "drooling" },
  { id: "blush",        label: "赤面",     labelEn: "blush",           value: "blush" },
  { id: "ahegao",       label: "アヘ顔",   labelEn: "ahegao",          value: "ahegao" },
  { id: "heart_eyes",   label: "ハート目", labelEn: "heart eyes",      value: "heart-shaped pupils" },
  { id: "trembling",    label: "震え",     labelEn: "trembling",       value: "trembling" },
  { id: "heavy_breath", label: "荒い息",   labelEn: "heavy breathing", value: "heavy breathing" },
  { id: "fucked_silly", label: "放心",     labelEn: "fucked silly",    value: "fucked silly" },
  { id: "slut",         label: "淫乱",     labelEn: "slut",            value: "slut" },
  { id: "vulgarity",    label: "下品",     labelEn: "vulgarity",       value: "vulgarity" },
  { id: "orgasm",       label: "絶頂",     labelEn: "orgasm",          value: "orgasm" },
  { id: "naughty_face", label: "淫靡な表情", labelEn: "naughty face", value: "naughty face" },
  { id: "panting",      label: "喘ぎ",     labelEn: "panting",         value: "panting, open mouth" },
];
