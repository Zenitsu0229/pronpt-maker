import { useState, useMemo } from "react";
import { categories, negativePresets } from "./data/categories";
import type { Category } from "./data/categories";
import { checkpoints } from "./data/checkpoints";
import { CategorySection } from "./components/CategorySection";
import { CheckpointSection } from "./components/CheckpointSection";
import { PromptOutput } from "./components/PromptOutput";
import "./App.css";

type Selections = Record<string, string[]>;

function App() {
  const [selectedCheckpointId, setSelectedCheckpointId] = useState<string | null>(null);
  const [selections, setSelections] = useState<Selections>({});
  const [negativePrompt, setNegativePrompt] = useState("");
  const [selectedNegPresets, setSelectedNegPresets] = useState<string[]>([]);

  const selectedCheckpoint = checkpoints.find((c) => c.id === selectedCheckpointId) ?? null;

  const handleToggleTag = (categoryId: string, value: string, multiSelect: boolean) => {
    setSelections((prev) => {
      const current = prev[categoryId] ?? [];
      if (multiSelect) {
        return {
          ...prev,
          [categoryId]: current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value],
        };
      } else {
        return {
          ...prev,
          [categoryId]: current.includes(value) ? [] : [value],
        };
      }
    });
  };

  const handleToggleNegPreset = (value: string) => {
    setSelectedNegPresets((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const hasCategorySelection = Object.values(selections).some((tags) => tags.length > 0);

  const generatedPrompt = useMemo(() => {
    const parts: string[] = [];

    // チェックポイントの品質タグはカテゴリ選択済みのときのみ付与
    if (hasCategorySelection && selectedCheckpoint?.qualityPrompt) {
      parts.push(selectedCheckpoint.qualityPrompt);
    }

    categories.forEach((cat: Category) => {
      const tags = selections[cat.id] ?? [];
      parts.push(...tags);
    });

    return parts.join(", ");
  }, [selectedCheckpoint, selections, hasCategorySelection]);

  const fullNegativePrompt = useMemo(() => {
    const parts: string[] = [];

    if (selectedCheckpoint?.recommendedNegative) {
      parts.push(selectedCheckpoint.recommendedNegative);
    }

    negativePresets
      .filter((p) => selectedNegPresets.includes(p.value))
      .forEach((p) => parts.push(p.value));

    if (negativePrompt.trim()) parts.push(negativePrompt.trim());

    return parts.join(", ");
  }, [selectedCheckpoint, selectedNegPresets, negativePrompt]);

  const handleReset = () => {
    setSelectedCheckpointId(null);
    setSelections({});
    setNegativePrompt("");
    setSelectedNegPresets([]);
  };

  const totalSelected = Object.values(selections).reduce(
    (sum, tags) => sum + tags.length,
    0
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">✦</span>
            <span className="logo-text">Prompt Maker</span>
          </div>
          <p className="header-desc">AI画像生成プロンプト作成ツール</p>
        </div>
      </header>

      <main className="main">
        <div className="layout">
          <div className="left-panel">
            <div className="panel-header">
              <h2 className="panel-title">チェックポイント</h2>
              <button className="btn-ghost" onClick={handleReset}>
                リセット
              </button>
            </div>
            <CheckpointSection
              checkpoints={checkpoints}
              selectedId={selectedCheckpointId}
              onSelect={setSelectedCheckpointId}
            />

            <div className="panel-header" style={{ marginTop: 8 }}>
              <h2 className="panel-title">カテゴリ選択</h2>
            </div>
            {categories.map((cat: Category) => (
              <CategorySection
                key={cat.id}
                category={cat}
                selectedTags={selections[cat.id] ?? []}
                onToggleTag={handleToggleTag}
              />
            ))}

            <div className="custom-section negative-section">
              <label className="custom-label negative">ネガティブプロンプト</label>
              {selectedCheckpoint && (
                <div className="neg-checkpoint-hint">
                  <span className="field-label">チェックポイント推奨ネガティブを自動追加済み</span>
                </div>
              )}
              <div className="neg-presets">
                {negativePresets.map((preset) => {
                  const len = preset.label.length;
                  const span = len >= 11 ? 3 : len >= 6 ? 2 : 1;
                  return (
                  <button
                    key={preset.value}
                    className={`tag-btn-neg ${selectedNegPresets.includes(preset.value) ? "selected" : ""}`}
                    style={{ gridColumn: `span ${span}` }}
                    onClick={() => handleToggleNegPreset(preset.value)}
                  >
                    {preset.label}
                  </button>
                  );
                })}
              </div>
              <textarea
                className="custom-textarea"
                placeholder="除外したい要素を入力..."
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <div className="right-panel">
            <div className="output-sticky">
              <div className="panel-header">
                <h2 className="panel-title">生成プロンプト</h2>
                {totalSelected > 0 && (
                  <span className="total-badge">{totalSelected} 個選択中</span>
                )}
              </div>

              {selectedCheckpoint && (
                <div className="checkpoint-summary">
                  <span className="checkpoint-summary-label">モデル</span>
                  <span className="checkpoint-summary-name">{selectedCheckpoint.name}</span>
                </div>
              )}

              <PromptOutput
                prompt={generatedPrompt}
                negativePrompt={fullNegativePrompt}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
