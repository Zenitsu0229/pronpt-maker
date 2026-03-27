import { useMemo } from "react";
import { negativePresets } from "../data/categories";
import type { Checkpoint } from "../data/checkpoints";

/**
 * ネガティブプロンプトを組み立てるカスタムフック。
 *
 * 結合順序:
 *   1. チェックポイント推奨ネガティブ
 *   2. ユーザー選択のネガティブプリセット
 *   3. ユーザー入力のカスタムテキスト
 */
export function useNegativePrompt(
  checkpoint: Checkpoint | null,
  selectedPresets: string[],
  customText: string,
): string {
  return useMemo(() => {
    const parts: string[] = [];

    if (checkpoint?.recommendedNegative) {
      parts.push(checkpoint.recommendedNegative);
    }

    negativePresets
      .filter((p) => selectedPresets.includes(p.value))
      .forEach((p) => parts.push(p.value));

    if (customText.trim()) {
      parts.push(customText.trim());
    }

    return parts.join(", ");
  }, [checkpoint, selectedPresets, customText]);
}
