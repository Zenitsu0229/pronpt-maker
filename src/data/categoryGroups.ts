export type CategoryGroup =
  | "subject"     // 被写体
  | "appearance"  // 外見
  | "expression"  // 表情・状態
  | "action"      // 動作・シーン
  | "r18"         // R18
  | "visual";     // 構図・画風

export interface GroupMeta {
  label: string;
  color: string;
}

export const CATEGORY_GROUPS: Record<CategoryGroup, GroupMeta> = {
  subject:    { label: "被写体",     color: "#4f8ef7" },
  appearance: { label: "外見",       color: "#9b72f5" },
  expression: { label: "表情・状態", color: "#fb923c" },
  action:     { label: "動作・シーン", color: "#34d399" },
  r18:        { label: "R18",        color: "#f472b6" },
  visual:     { label: "構図・画風", color: "#22d3ee" },
};

/** カテゴリ ID → グループ のマッピング */
export const CATEGORY_GROUP_MAP: Record<string, CategoryGroup> = {
  // 被写体
  quality:             "subject",
  count:               "subject",
  character_type:      "subject",
  subject_female_age:  "subject",
  subject_female_body: "subject",
  subject_male_age:    "subject",
  subject_male_body:   "subject",
  subject_other:       "subject",
  // 外見
  outfit:              "appearance",
  hairstyle:           "appearance",
  hair_color:          "appearance",
  eye_features:        "appearance",
  accessories:         "appearance",
  job_class:           "appearance",
  // 表情・状態
  expression:          "expression",
  state_effects:       "expression",
  // 動作・シーン
  action:              "action",
  situation:           "action",
  summoning:           "action",
  // R18
  r18_general:         "r18",
  r18_male:            "r18",
  r18_fetish:          "r18",
  // 構図・画風
  composition:         "visual",
  focus:               "visual",
  background:          "visual",
  lighting:            "visual",
  style:               "visual",
  color:               "visual",
};

/**
 * UI 表示順（グループ単位で並んでいる）
 * プロンプト出力順は promptOrder.ts を参照
 */
export const UI_CATEGORY_ORDER: readonly string[] = [
  // 被写体
  "quality",
  "count",
  "character_type",
  "subject_female_age",
  "subject_female_body",
  "subject_male_age",
  "subject_male_body",
  "subject_other",
  // 外見
  "outfit",
  "hairstyle",
  "hair_color",
  "eye_features",
  "accessories",
  "job_class",
  // 表情・状態
  "expression",
  "state_effects",
  // 動作・シーン
  "action",
  "situation",
  "summoning",
  // R18
  "r18_general",
  "r18_male",
  "r18_fetish",
  // 構図・画風
  "composition",
  "focus",
  "background",
  "lighting",
  "style",
  "color",
] as const;
