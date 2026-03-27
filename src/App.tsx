import { useState, useCallback, Fragment } from "react";
import { categories, negativePresets } from "./data/categories";
import { checkpoints } from "./data/checkpoints";
import { presets } from "./data/presets";
import type { Preset } from "./data/presets";
import {
  CATEGORY_GROUPS,
  CATEGORY_GROUP_MAP,
  UI_CATEGORY_ORDER,
} from "./data/categoryGroups";
import { usePromptBuilder } from "./hooks/usePromptBuilder";
import { useNegativePrompt } from "./hooks/useNegativePrompt";
import { CategorySection } from "./components/CategorySection";
import { CheckpointSection } from "./components/CheckpointSection";
import { PromptOutput } from "./components/PromptOutput";
import { WeightSliders } from "./components/WeightSliders";
import { PresetSelector } from "./components/PresetSelector";
import { R18Lock } from "./components/R18Lock";
import type { Selections, WeightMap } from "./types";
import "./App.css";

// カテゴリ ID → カテゴリオブジェクト
const CATEGORY_MAP = Object.fromEntries(categories.map((c) => [c.id, c]));

// UI 表示順に並べたカテゴリ（グループ単位でまとまっている）
const UI_CATEGORIES = UI_CATEGORY_ORDER.map((id) => CATEGORY_MAP[id]).filter(Boolean);

function App() {
  // ── State ──────────────────────────────────────────────────────────────
  const [selectedCheckpointId, setSelectedCheckpointId] = useState<string | null>(null);
  const [selections, setSelections] = useState<Selections>({});
  const [weights, setWeights] = useState<WeightMap>({});
  const [selectedNegPresets, setSelectedNegPresets] = useState<string[]>([]);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [r18Unlocked, setR18Unlocked] = useState(false);

  // ── Derived ────────────────────────────────────────────────────────────
  const checkpoint = checkpoints.find((c) => c.id === selectedCheckpointId) ?? null;

  // ── Prompt ─────────────────────────────────────────────────────────────
  const { generatedPrompt, promptLines } = usePromptBuilder(selections, weights, checkpoint);
  const fullNegativePrompt = useNegativePrompt(checkpoint, selectedNegPresets, negativePrompt);

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleToggleTag = useCallback(
    (categoryId: string, value: string, multiSelect: boolean) => {
      setSelections((prev) => {
        const current = prev[categoryId] ?? [];
        const next = multiSelect
          ? current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value]
          : current.includes(value)
            ? []
            : [value];
        return { ...prev, [categoryId]: next };
      });
    },
    [],
  );

  const handleToggleNegPreset = useCallback((value: string) => {
    setSelectedNegPresets((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }, []);

  const handleWeightChange = useCallback((id: string, weight: number) => {
    setWeights((prev) => ({ ...prev, [id]: weight }));
  }, []);

  const handleApplyPreset = useCallback((preset: Preset) => {
    setSelections((prev) => ({ ...prev, ...preset.selections }));
  }, []);

  const handleReset = useCallback(() => {
    setSelectedCheckpointId(null);
    setSelections({});
    setWeights({});
    setSelectedNegPresets([]);
    setNegativePrompt("");
  }, []);

  const handleR18Unlock = useCallback(() => setR18Unlocked(true), []);
  const handleR18Lock   = useCallback(() => {
    setR18Unlocked(false);
    setSelections((prev) => {
      const next = { ...prev };
      delete next["r18_general"];
      delete next["r18_male"];
      return next;
    });
  }, []);

  const totalSelected = Object.values(selections).reduce(
    (sum, tags) => sum + tags.length,
    0,
  );

  // ── Render ─────────────────────────────────────────────────────────────
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
          {/* ── 左パネル：入力 ─────────────────────────────────── */}
          <div className="left-panel">
            <div className="panel-header">
              <h2 className="panel-title">チェックポイント</h2>
              <button className="btn-ghost" onClick={handleReset}>リセット</button>
            </div>

            <CheckpointSection
              checkpoints={checkpoints}
              selectedId={selectedCheckpointId}
              onSelect={setSelectedCheckpointId}
            />

            <PresetSelector presets={presets} onApply={handleApplyPreset} />

            <div className="panel-header" style={{ marginTop: 8 }}>
              <h2 className="panel-title">カテゴリ選択</h2>
            </div>

            {/* グループ区切り付きカテゴリ一覧 */}
            {(() => {
              let lastGroup: string | undefined;
              let r18DividerShown = false;
              return UI_CATEGORIES.map((cat) => {
                const groupKey = CATEGORY_GROUP_MAP[cat.id];
                const group = groupKey ? CATEGORY_GROUPS[groupKey] : undefined;
                const isR18 = groupKey === "r18";
                const showDivider = groupKey !== lastGroup;
                lastGroup = groupKey;

                // R18 グループの区切りとロック UI（最初の R18 カテゴリのみ）
                if (isR18 && !r18DividerShown) {
                  r18DividerShown = true;
                  return (
                    <Fragment key={cat.id}>
                      <div
                        className="group-divider"
                        style={{ "--group-color": group!.color } as React.CSSProperties}
                      >
                        <span className="group-divider-label">{group!.label}</span>
                        {r18Unlocked && (
                          <button className="r18-relock-btn" onClick={handleR18Lock} title="再ロック">
                            🔓 ロック
                          </button>
                        )}
                      </div>
                      {r18Unlocked ? (
                        <>
                          {UI_CATEGORIES.filter((c) => CATEGORY_GROUP_MAP[c.id] === "r18").map((r18cat) => (
                            <CategorySection
                              key={r18cat.id}
                              category={r18cat}
                              selectedTags={selections[r18cat.id] ?? []}
                              groupColor={group?.color}
                              onToggleTag={handleToggleTag}
                            />
                          ))}
                        </>
                      ) : (
                        <R18Lock onUnlock={handleR18Unlock} />
                      )}
                    </Fragment>
                  );
                }

                // R18 カテゴリは上で一括レンダリングするためスキップ
                if (isR18) return null;

                return (
                  <Fragment key={cat.id}>
                    {showDivider && group && (
                      <div
                        className="group-divider"
                        style={{ "--group-color": group.color } as React.CSSProperties}
                      >
                        <span className="group-divider-label">{group.label}</span>
                      </div>
                    )}
                    <CategorySection
                      category={cat}
                      selectedTags={selections[cat.id] ?? []}
                      groupColor={group?.color}
                      onToggleTag={handleToggleTag}
                    />
                  </Fragment>
                );
              });
            })()}

            <WeightSliders weights={weights} onChange={handleWeightChange} />

            {/* ── ネガティブプロンプト ── */}
            <div className="custom-section negative-section">
              <label className="custom-label negative">ネガティブプロンプト</label>

              {checkpoint && (
                <div className="neg-checkpoint-hint">
                  <span className="field-label">チェックポイント推奨ネガティブを自動追加済み</span>
                </div>
              )}

              <div className="neg-presets">
                {negativePresets.map((preset) => {
                  const span = preset.label.length >= 11 ? 3 : preset.label.length >= 6 ? 2 : 1;
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

          {/* ── 右パネル：出力 ─────────────────────────────────── */}
          <div className="right-panel">
            <div className="output-sticky">
              <div className="panel-header">
                <h2 className="panel-title">生成プロンプト</h2>
                {totalSelected > 0 && (
                  <span className="total-badge">{totalSelected} 個選択中</span>
                )}
              </div>

              {checkpoint && (
                <div className="checkpoint-summary">
                  <span className="checkpoint-summary-label">モデル</span>
                  <span className="checkpoint-summary-name">{checkpoint.name}</span>
                </div>
              )}

              <PromptOutput
                prompt={generatedPrompt}
                negativePrompt={fullNegativePrompt}
                promptLines={promptLines}
                checkpointName={checkpoint?.name}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
