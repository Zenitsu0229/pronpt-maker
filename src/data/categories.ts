export interface Tag {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  tags: Tag[];
  multiSelect?: boolean;
}

export const categories: Category[] = [
  // ① クオリティ — 最初に置くことで全体の品質底上げに最も効く
  {
    id: "quality",
    name: "クオリティ",
    nameEn: "Quality",
    multiSelect: true,
    tags: [
      { label: "最高品質", value: "masterpiece, best quality" },
      { label: "超高詳細", value: "ultra-detailed" },
      { label: "高解像度", value: "highres" },
      { label: "4K", value: "4k" },
      { label: "8K", value: "8k" },
      { label: "RAW写真", value: "RAW photo" },
      { label: "フォトリアル", value: "photorealistic" },
      { label: "シャープ", value: "sharp focus" },
    ],
  },

  // ② 人数・性別 — 被写体の基本情報を早期に確定させる
  {
    id: "count",
    name: "人数・性別",
    nameEn: "Count / Gender",
    tags: [
      { label: "女性・1人", value: "1girl" },
      { label: "女性・2人", value: "2girls" },
      { label: "女性・3人", value: "3girls" },
      { label: "女性・4人", value: "4girls" },
      { label: "男性・1人", value: "1boy" },
      { label: "男性・2人", value: "2boys" },
      { label: "男性・3人", value: "3boys" },
      { label: "男性・4人", value: "4boys" },
      { label: "男女・1人ずつ", value: "1boy, 1girl" },
      { label: "男女・2人ずつ", value: "2boys, 2girls" },
      { label: "女性グループ", value: "multiple girls" },
      { label: "男性グループ", value: "multiple boys" },
      { label: "大人数", value: "crowd, many people" },
      { label: "人物なし", value: "no humans" },
    ],
  },

  // ③ 被写体の特徴（女性）— 人数の直後に外見・年齢を詳細化
  {
    id: "subject_female",
    name: "被写体・女性（特徴）",
    nameEn: "Subject / Female",
    tags: [
      { label: "幼女", value: "little girl, child, very young girl" },
      { label: "少女", value: "young girl, preteen" },
      { label: "女子高生", value: "teenage girl, high school girl" },
      { label: "女子大生", value: "college girl, young adult woman" },
      { label: "お姉さん", value: "young woman, 20s" },
      { label: "大人の女性", value: "adult woman, mature woman" },
      { label: "中年女性", value: "middle-aged woman, 40s" },
      { label: "おばあさん", value: "elderly woman, old woman, grandmother, wrinkled" },
      { label: "太った女性", value: "chubby woman, overweight, plump" },
      { label: "スレンダー", value: "slender woman, slim, thin body" },
      { label: "グラマー", value: "curvy woman, voluptuous, large breasts" },
    ],
  },

  // ④ 被写体の特徴（男性）
  {
    id: "subject_male",
    name: "被写体・男性（特徴）",
    nameEn: "Subject / Male",
    tags: [
      { label: "幼児", value: "little boy, child, very young boy, toddler" },
      { label: "少年", value: "young boy, preteen boy" },
      { label: "中学生", value: "teenage boy, junior high school boy" },
      { label: "高校生", value: "high school boy, teen male" },
      { label: "青年", value: "young man, youth, 20s" },
      { label: "男性", value: "adult male, man" },
      { label: "おじさん", value: "middle-aged man, 40s, mature man" },
      { label: "太ったおじさん", value: "fat man, chubby, overweight, middle-aged, pot belly, obese" },
      { label: "おじいさん", value: "elderly man, old man, grandfather, wrinkled, grey hair" },
      { label: "マッチョ", value: "muscular man, athletic, bodybuilder, huge muscles, buff" },
      { label: "細身", value: "slim man, slender male, thin body" },
      { label: "ひげ", value: "beard, bearded man, facial hair" },
      { label: "眼鏡", value: "glasses, spectacles" },
      { label: "スーツ姿", value: "business suit, formal wear, office worker" },
    ],
  },

  // ⑤ 被写体（その他）
  {
    id: "subject_other",
    name: "被写体・その他",
    nameEn: "Subject / Other",
    tags: [
      { label: "カップル", value: "couple, lovers" },
      { label: "家族", value: "family, parents and child" },
      { label: "猫", value: "cat, feline" },
      { label: "犬", value: "dog, canine" },
      { label: "ドラゴン", value: "dragon, fantasy creature" },
      { label: "ロボット", value: "robot, mecha, android" },
      { label: "モンスター", value: "monster, creature" },
      { label: "風景", value: "landscape, scenery, no humans" },
      { label: "建物", value: "architecture, building, no humans" },
      { label: "食べ物", value: "food, meal, dish" },
    ],
  },

  // ⑥ 服装 — 被写体の外見描写はアクションより前に確定させる
  {
    id: "outfit",
    name: "服装",
    nameEn: "Outfit / Clothing",
    tags: [
      // 水着・スポーツ
      { label: "水着（ビキニ）", value: "bikini, swimsuit, beach wear" },
      { label: "水着（ワンピース）", value: "one-piece swimsuit, swimwear" },
      { label: "スクール水着", value: "school swimsuit, competition swimsuit" },
      { label: "スポーツウェア", value: "sportswear, athletic wear, gym clothes" },
      { label: "ジャージ", value: "jersey, tracksuit, athletic jacket" },
      // フォーマル・仕事
      { label: "スーツ（男性）", value: "business suit, dress shirt, tie, formal wear" },
      { label: "スーツ（女性）", value: "women's suit, blazer, office wear" },
      { label: "ドレス", value: "dress, elegant dress" },
      { label: "ウェディングドレス", value: "wedding dress, bridal gown, white dress" },
      { label: "イブニングドレス", value: "evening gown, formal dress, ball gown" },
      { label: "タキシード", value: "tuxedo, formal black suit, bow tie" },
      // 制服・学校
      { label: "女子制服（セーラー）", value: "sailor uniform, serafuku, school uniform" },
      { label: "女子制服（ブレザー）", value: "blazer uniform, school blazer, skirt" },
      { label: "男子制服（学ラン）", value: "gakuran, male school uniform, black uniform" },
      { label: "男子制服（ブレザー）", value: "male blazer uniform, school uniform" },
      // カジュアル
      { label: "Tシャツ・ジーンズ", value: "t-shirt, jeans, casual wear" },
      { label: "パーカー", value: "hoodie, hooded sweatshirt, casual" },
      { label: "ワンピース（カジュアル）", value: "casual dress, sundress, everyday wear" },
      { label: "浴衣", value: "yukata, summer kimono, japanese traditional" },
      { label: "着物", value: "kimono, traditional japanese clothing, obi" },
      { label: "チャイナドレス", value: "cheongsam, qipao, chinese dress" },
      // コスチューム・ファンタジー
      { label: "メイド服", value: "maid outfit, maid dress, maid headdress, apron" },
      { label: "巫女服", value: "miko outfit, shrine maiden, hakama, haori" },
      { label: "魔女服", value: "witch outfit, witch hat, dark robe, cape" },
      { label: "ナース服", value: "nurse outfit, nurse uniform, nurse cap" },
      { label: "警察・制服", value: "police uniform, officer uniform, badge" },
      { label: "軍服", value: "military uniform, army uniform, camouflage" },
      { label: "鎧・甲冑", value: "armor, plate armor, knight armor, gauntlets" },
      { label: "ローブ・マント", value: "robe, cloak, wizard robe, fantasy outfit" },
      // 下着・ナイトウェア
      { label: "パジャマ", value: "pajamas, sleepwear, nightwear" },
      { label: "下着", value: "underwear, lingerie, bra, panties" },
      { label: "ランジェリー", value: "lingerie, lace lingerie, sexy lingerie" },
      // 裸・露出
      { label: "裸（全裸）", value: "nude, naked, bare body, no clothes" },
      { label: "上半身裸", value: "topless, bare chest, shirtless" },
      { label: "タオル一枚", value: "wrapped in towel, bath towel" },
    ],
  },

  // ⑦ 表情 — 服装の次、動作の前に外見としての表情を確定させる
  {
    id: "expression",
    name: "表情",
    nameEn: "Expression",
    tags: [
      // 笑い・喜び
      { label: "微笑み", value: "slight smile, gentle smile" },
      { label: "笑顔", value: "smile, smiling, happy" },
      { label: "満面の笑み", value: "big smile, beaming, overjoyed" },
      { label: "歯を見せて笑う", value: "toothy grin, showing teeth, laughing" },
      { label: "照れ笑い", value: "embarrassed smile, shy smile, blushing smile" },
      { label: "ニヤリ", value: "smirk, smug smile, sly grin" },
      { label: "得意顔", value: "smug face, proud expression, triumphant" },
      // 悲しみ・泣き
      { label: "悲しい顔", value: "sad expression, frowning, downcast eyes" },
      { label: "泣いている", value: "crying, tears streaming, teary eyes" },
      { label: "今にも泣きそう", value: "about to cry, watery eyes, trembling lip" },
      { label: "泣き笑い", value: "crying while smiling, bitter smile, tearful smile" },
      // 怒り・不満
      { label: "怒っている", value: "angry expression, frowning, glaring" },
      { label: "ぷりぷり怒り", value: "pouting, sulking, puffed cheeks" },
      { label: "睨みつける", value: "glaring, sharp eyes, intense stare" },
      { label: "不満そう", value: "displeased, dissatisfied expression, grumpy" },
      // 驚き・恐怖
      { label: "驚いている", value: "surprised, wide eyes, shocked expression" },
      { label: "目を見開く", value: "wide-eyed, eyes wide open, astonished" },
      { label: "恐怖", value: "scared, fearful expression, trembling" },
      { label: "パニック", value: "panicking, distressed, frantic expression" },
      // 照れ・恥ずかしい
      { label: "照れている", value: "embarrassed, blushing, shy" },
      { label: "赤面", value: "blushing, flushed cheeks, red face" },
      { label: "恥ずかしそう", value: "bashful, timid expression, looking away" },
      // 冷静・クール
      { label: "無表情", value: "expressionless, blank face, deadpan" },
      { label: "真剣", value: "serious expression, determined, focused" },
      { label: "クール", value: "cool expression, aloof, cold stare" },
      { label: "考えている", value: "thinking, contemplating, pensive, hand on chin" },
      { label: "自信満々", value: "confident expression, bold, self-assured" },
      // 色気・官能
      { label: "うっとり", value: "dreamy expression, enchanted, blissful" },
      { label: "流し目", value: "seductive eyes, sidelong glance, alluring" },
      { label: "挑発的", value: "provocative expression, teasing, sultry" },
      { label: "恍惚", value: "ecstatic expression, euphoric, lost in pleasure" },
      // 口の動き
      { label: "口を開けている", value: "open mouth, parted lips" },
      { label: "舌を出す", value: "tongue out, sticking out tongue" },
      { label: "歌っている", value: "singing, open mouth wide, performing" },
      { label: "叫んでいる", value: "screaming, yelling, mouth wide open" },
      // 眠さ・だるさ
      { label: "眠そう", value: "sleepy, drowsy, half-closed eyes, yawning" },
      { label: "ぼんやり", value: "vacant expression, spaced out, daydreaming" },
    ],
  },

  // ⑧ 動作 — シンプルな主要動作のみ
  {
    id: "action",
    name: "動作",
    nameEn: "Action / Pose",
    multiSelect: true,
    tags: [
      { label: "立っている", value: "standing" },
      { label: "座っている", value: "sitting, seated" },
      { label: "寝ている", value: "lying down, sleeping" },
      { label: "歩いている", value: "walking" },
      { label: "走っている", value: "running, sprinting" },
      { label: "ジャンプ", value: "jumping, leaping, airborne" },
      { label: "ダンス", value: "dancing, dynamic movement" },
      { label: "戦闘ポーズ", value: "battle stance, action pose" },
      { label: "魔法を使っている", value: "casting magic, spell casting, glowing hands" },
      { label: "剣を振る", value: "swinging sword, warrior pose" },
      { label: "ヨガ・ストレッチ", value: "yoga pose, stretching" },
      { label: "水泳", value: "swimming, in water" },
      { label: "食事している", value: "eating, holding food" },
      { label: "飲んでいる", value: "drinking, holding cup" },
      { label: "読書している", value: "reading, holding book" },
      { label: "勉強している", value: "studying, writing, notebook" },
      { label: "料理している", value: "cooking, holding pan" },
      { label: "スマホを見ている", value: "looking at phone, smartphone" },
      { label: "手を振っている", value: "waving hand, greeting" },
      { label: "抱きついている", value: "hugging, embracing" },
      { label: "指差している", value: "pointing finger" },
      { label: "ポーズを決めている", value: "posing, cool pose" },
    ],
  },

  // ⑧ 構図・カメラ — 動作が確定した後にフレーミングを指定
  {
    id: "composition",
    name: "構図・カメラ",
    nameEn: "Composition / Camera",
    tags: [
      { label: "全身", value: "full body" },
      { label: "上半身", value: "upper body" },
      { label: "下半身", value: "lower body" },
      { label: "クローズアップ", value: "close-up" },
      { label: "ワイドショット", value: "wide shot" },
      { label: "バードアイ", value: "bird's eye view" },
      { label: "ローアングル", value: "low angle shot" },
      { label: "俯瞰", value: "from above, overhead view" },
      { label: "ポートレート", value: "portrait" },
      { label: "後ろ姿", value: "from behind, back view" },
      { label: "横顔", value: "from side, profile view" },
      { label: "対称構図", value: "symmetrical composition" },
    ],
  },

  // ⑨ フォーカス部位 — 構図の補足として特定部位を強調
  {
    id: "focus",
    name: "フォーカス部位",
    nameEn: "Focus / Body Part",
    tags: [
      { label: "顔", value: "focus on face, face focus" },
      { label: "目", value: "focus on eyes, eye focus, close-up eyes" },
      { label: "唇・口", value: "focus on lips, mouth focus, close-up lips" },
      { label: "耳", value: "focus on ear, ear focus" },
      { label: "首", value: "focus on neck, neck focus" },
      { label: "胸", value: "focus on chest, breast focus, cleavage focus" },
      { label: "お腹", value: "focus on stomach, belly focus, navel focus" },
      { label: "背中", value: "focus on back, back focus" },
      { label: "肩", value: "focus on shoulder, shoulder focus" },
      { label: "脇", value: "focus on armpit, armpit focus" },
      { label: "腕", value: "focus on arms, arm focus" },
      { label: "手", value: "focus on hands, hand focus, close-up hands" },
      { label: "指", value: "focus on fingers, finger focus" },
      { label: "腰・ヒップ", value: "focus on hips, hip focus, waist focus" },
      { label: "お尻", value: "focus on ass, butt focus, buttocks focus" },
      { label: "太もも", value: "focus on thighs, thigh focus" },
      { label: "膝", value: "focus on knees, knee focus" },
      { label: "ふくらはぎ", value: "focus on legs, calf focus" },
      { label: "足首", value: "focus on ankles, ankle focus" },
      { label: "足裏", value: "focus on soles, sole focus, foot sole, plantar view" },
      { label: "つま先", value: "focus on toes, toe focus, close-up toes" },
      { label: "足（全体）", value: "focus on feet, feet focus" },
    ],
  },

  // ⑩ スタイル — 被写体・構図が固まってから画風を指定
  {
    id: "style",
    name: "スタイル",
    nameEn: "Style",
    tags: [
      { label: "アニメ", value: "anime style" },
      { label: "マンガ", value: "manga style" },
      { label: "水彩画", value: "watercolor painting" },
      { label: "油絵", value: "oil painting" },
      { label: "デジタルアート", value: "digital art" },
      { label: "写実的", value: "realistic" },
      { label: "ファンタジー", value: "fantasy art" },
      { label: "サイバーパンク", value: "cyberpunk" },
      { label: "スチームパンク", value: "steampunk" },
      { label: "ピクセルアート", value: "pixel art" },
      { label: "スケッチ", value: "pencil sketch" },
      { label: "概念アート", value: "concept art" },
    ],
  },

  // ⑪ 背景・場所 — 環境情報はスタイルの後
  {
    id: "background",
    name: "背景・場所",
    nameEn: "Background / Location",
    tags: [
      { label: "森", value: "forest" },
      { label: "海", value: "ocean" },
      { label: "山", value: "mountain" },
      { label: "砂漠", value: "desert" },
      { label: "都市", value: "city" },
      { label: "夜の街", value: "night city" },
      { label: "城", value: "castle" },
      { label: "神社", value: "shrine" },
      { label: "宇宙", value: "outer space" },
      { label: "銀河", value: "galaxy" },
      { label: "図書館", value: "library" },
      { label: "カフェ", value: "cafe" },
      { label: "廃墟", value: "ruins" },
      { label: "雪原", value: "snowy field" },
      { label: "桜", value: "cherry blossoms" },
    ],
  },

  // ⑫ ライティング — 背景と合わせて雰囲気を調整
  {
    id: "lighting",
    name: "ライティング",
    nameEn: "Lighting",
    tags: [
      { label: "自然光", value: "natural light" },
      { label: "夕日", value: "sunset light" },
      { label: "ゴールデンアワー", value: "golden hour" },
      { label: "月光", value: "moonlight" },
      { label: "スタジオライト", value: "studio lighting" },
      { label: "ネオン", value: "neon lights" },
      { label: "ドラマチック", value: "dramatic lighting" },
      { label: "逆光", value: "backlight" },
      { label: "柔らかい光", value: "soft lighting" },
      { label: "スポットライト", value: "spotlight" },
    ],
  },

  // ⑬ カラー・トーン — 最後に全体の色調を上書き
  {
    id: "color",
    name: "カラー・トーン",
    nameEn: "Color / Tone",
    tags: [
      { label: "鮮やか", value: "vibrant colors" },
      { label: "パステル", value: "pastel colors" },
      { label: "モノクロ", value: "monochrome" },
      { label: "セピア", value: "sepia" },
      { label: "暖色系", value: "warm tones" },
      { label: "寒色系", value: "cool tones" },
      { label: "ダーク", value: "dark atmosphere" },
      { label: "明るい", value: "bright and cheerful" },
      { label: "レトロ", value: "retro color palette" },
      { label: "ローファイ", value: "lo-fi aesthetic" },
    ],
  },
];

export const negativePresets: Tag[] = [
  { label: "低品質除外", value: "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry" },
  { label: "変形除外", value: "deformed, ugly, mutilated, disfigured, out of frame" },
  { label: "NSFW除外", value: "nsfw, nude, explicit" },
];
