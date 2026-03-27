import type { Selections } from "../types";

export interface Preset {
  id: string;
  label: string;
  labelSub: string;
  icon: string;
  color: string;
  selections: Selections;
}

export const presets: Preset[] = [
  // ── 女子系 ──────────────────────────────────────
  {
    id: "jk",
    label: "女子高生",
    labelSub: "High School Girl",
    icon: "🎒",
    color: "#e06a9a",
    selections: {
      count: ["1girl, solo"],
      subject_female_age: ["high school girl, teenage girl, 16-18 years old"],
      hairstyle: ["long hair"],
      hair_color: ["black hair"],
    },
  },
  {
    id: "loli",
    label: "少女",
    labelSub: "Young Girl",
    icon: "🌸",
    color: "#f0a0c0",
    selections: {
      count: ["1girl, solo"],
      subject_female_age: ["young girl, elementary school girl, child"],
      hairstyle: ["twin tails, pigtails"],
      hair_color: ["brown hair"],
    },
  },
  {
    id: "onesan",
    label: "お姉さん",
    labelSub: "Young Woman",
    icon: "👩",
    color: "#c084fc",
    selections: {
      count: ["1girl, solo"],
      subject_female_age: ["woman in her 20s, young adult woman"],
      subject_female_body: ["slender, slim body, lean figure"],
      hairstyle: ["long hair"],
      hair_color: ["brown hair"],
    },
  },
  {
    id: "maid",
    label: "メイド",
    labelSub: "Maid",
    icon: "🫧",
    color: "#a78bfa",
    selections: {
      count: ["1girl, solo"],
      subject_female_age: ["woman in her 20s, young adult woman"],
      job_class: ["maid, maid outfit, apron"],
    },
  },
  {
    id: "neko_girl",
    label: "猫耳娘",
    labelSub: "Cat Girl",
    icon: "🐾",
    color: "#fb923c",
    selections: {
      count: ["1girl, solo"],
      character_type: ["cat girl, cat ears, nekomimi, cat tail"],
      subject_female_age: ["woman in her 20s, young adult woman"],
      hairstyle: ["short hair"],
    },
  },
  {
    id: "warrior_girl",
    label: "戦士少女",
    labelSub: "Warrior Girl",
    icon: "⚔️",
    color: "#f97316",
    selections: {
      count: ["1girl, solo"],
      subject_female_age: ["woman in her 20s, young adult woman"],
      subject_female_body: ["toned, fit, defined muscles, athletic figure"],
      job_class: ["warrior, sword and shield, heavy armor, fighter"],
    },
  },
  {
    id: "mage_girl",
    label: "魔法使い少女",
    labelSub: "Mage Girl",
    icon: "✨",
    color: "#818cf8",
    selections: {
      count: ["1girl, solo"],
      subject_female_age: ["woman in her 20s, young adult woman"],
      job_class: ["mage, wizard, staff, spellcasting, robe"],
    },
  },
  {
    id: "succubus",
    label: "サキュバス",
    labelSub: "Succubus",
    icon: "😈",
    color: "#e879a0",
    selections: {
      count: ["1girl, solo"],
      character_type: ["succubus, demon wings, horns, tail"],
      subject_female_age: ["woman in her 20s, young adult woman"],
      subject_female_body: ["voluptuous, curvy, large breasts and hips"],
    },
  },

  // ── 男子系 ──────────────────────────────────────
  {
    id: "slim_boy",
    label: "少年・細身",
    labelSub: "Slim Boy",
    icon: "🏃",
    color: "#38bdf8",
    selections: {
      count: ["1boy, solo"],
      subject_male_age: ["high school boy, teenage boy, 16-18 years old"],
      subject_male_body: ["slim, slender male, lean, light build"],
      hairstyle: ["short hair"],
      hair_color: ["black hair"],
    },
  },
  {
    id: "muscular_slim_boy",
    label: "少年・細マッチョ",
    labelSub: "Lean Muscle Boy",
    icon: "💪",
    color: "#34d399",
    selections: {
      count: ["1boy, solo"],
      subject_male_age: ["high school boy, teenage boy, 16-18 years old"],
      subject_male_body: [
        "slim muscular, lean muscle, athletic slim build, defined abs, low body fat",
        "six pack abs, defined abs, washboard abs",
      ],
      hairstyle: ["short hair"],
    },
  },
  {
    id: "macho_adult",
    label: "マッチョ男性",
    labelSub: "Muscular Man",
    icon: "🏋️",
    color: "#f59e0b",
    selections: {
      count: ["1boy, solo"],
      subject_male_age: ["man in his 20s, young adult man, youth"],
      subject_male_body: [
        "muscular, well-built, strong muscles, broad shoulders",
        "six pack abs, defined abs, washboard abs",
        "broad shoulders, wide shoulders, V-taper",
      ],
    },
  },
  {
    id: "ikemen",
    label: "イケメン",
    labelSub: "Handsome Guy",
    icon: "😎",
    color: "#64748b",
    selections: {
      count: ["1boy, solo"],
      subject_male_age: ["man in his 20s, young adult man, youth"],
      subject_male_body: ["slim muscular, lean muscle, athletic slim build, defined abs, low body fat"],
      hairstyle: ["medium length hair, shoulder length"],
    },
  },
  {
    id: "knight",
    label: "騎士",
    labelSub: "Knight",
    icon: "🛡️",
    color: "#94a3b8",
    selections: {
      count: ["1boy, solo"],
      subject_male_age: ["man in his 20s, young adult man, youth"],
      subject_male_body: ["muscular, well-built, strong muscles, broad shoulders"],
      job_class: ["knight, full plate armor, lance, noble"],
    },
  },
];
