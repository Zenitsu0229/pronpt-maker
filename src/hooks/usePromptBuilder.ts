import { useMemo } from "react";
import { categories } from "../data/categories";
import { PROMPT_CATEGORY_ORDER } from "../data/promptOrder";
import { SLIDER_ITEMS } from "../data/sliderItems";
import type { Checkpoint } from "../data/checkpoints";
import type { Selections, WeightMap, PromptLine } from "../types";

// カテゴリ ID → カテゴリオブジェクトのルックアップ（モジュール初期化時に一度だけ生成）
const CATEGORY_MAP = Object.fromEntries(categories.map((c) => [c.id, c]));

// プロンプト出力順に並べたカテゴリ配列（モジュール初期化時に一度だけ生成）
const ORDERED_CATEGORIES = PROMPT_CATEGORY_ORDER
  .map((id) => CATEGORY_MAP[id])
  .filter(Boolean);

interface UsePromptBuilderResult {
  generatedPrompt: string;
  promptLines: PromptLine[];
}

/**
 * SD ベストプラクティス順でプロンプトを組み立てるカスタムフック。
 *
 * 出力順序: checkpoint qualityPrompt → PROMPT_CATEGORY_ORDER → weightTags
 */
export function usePromptBuilder(
  selections: Selections,
  weights: WeightMap,
  checkpoint: Checkpoint | null,
): UsePromptBuilderResult {
  const hasCategorySelection = useMemo(
    () => Object.values(selections).some((tags) => tags.length > 0),
    [selections],
  );

  const weightTags = useMemo(
    () =>
      SLIDER_ITEMS
        .filter((item) => (weights[item.id] ?? 0) > 0)
        .map((item) => `(${item.value}:${weights[item.id].toFixed(2)})`),
    [weights],
  );

  const promptLines = useMemo((): PromptLine[] => {
    const lines: PromptLine[] = [];

    // チェックポイント品質タグ — カテゴリ選択があるときのみ先頭に付与
    if (hasCategorySelection && checkpoint?.qualityPrompt) {
      lines.push({
        name: `品質（${checkpoint.name}）`,
        tags: [checkpoint.qualityPrompt],
      });
    }

    // カテゴリ選択タグ（SD ベストプラクティス順）
    for (const cat of ORDERED_CATEGORIES) {
      const tags = selections[cat.id] ?? [];
      if (tags.length > 0) {
        lines.push({ name: cat.name, tags });
      }
    }

    // 強度スライダータグ
    if (weightTags.length > 0) {
      lines.push({ name: "表情・状態ウェイト", tags: weightTags });
    }

    return lines;
  }, [checkpoint, selections, hasCategorySelection, weightTags]);

  const generatedPrompt = useMemo(
    () => promptLines.flatMap((l) => l.tags).join(", "),
    [promptLines],
  );

  return { generatedPrompt, promptLines };
}
