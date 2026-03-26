import { useState } from "react";
import { loraPresets, LORA_CATEGORIES } from "../data/loras";
import type { ActiveLora, LoraCategory } from "../data/loras";
import "./LoraSection.css";

interface Props {
  activeLoras: ActiveLora[];
  compatibleBaseModel: string | null;
  onAdd: (lora: ActiveLora) => void;
  onRemove: (id: string) => void;
  onUpdateWeight: (id: string, weight: number) => void;
  onUpdateTrigger: (id: string, triggerWords: string) => void;
  onUpdateFilename: (id: string, filename: string) => void;
}

let customCounter = 0;

export function LoraSection({
  activeLoras,
  compatibleBaseModel,
  onAdd,
  onRemove,
  onUpdateWeight,
  onUpdateTrigger,
  onUpdateFilename,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<LoraCategory>("クオリティ");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customFilename, setCustomFilename] = useState("");
  const [customWeight, setCustomWeight] = useState(0.8);
  const [customTrigger, setCustomTrigger] = useState("");

  const activePresetIds = new Set(activeLoras.map((l) => l.presetId).filter(Boolean));

  const filteredPresets = loraPresets.filter((p) => {
    if (p.category !== activeCategory) return false;
    if (!compatibleBaseModel) return true;
    return p.compatibleWith.includes("all") || p.compatibleWith.includes(compatibleBaseModel as never);
  });

  const handleAddPreset = (presetId: string) => {
    const preset = loraPresets.find((p) => p.id === presetId);
    if (!preset) return;
    if (activePresetIds.has(presetId)) {
      const existing = activeLoras.find((l) => l.presetId === presetId);
      if (existing) onRemove(existing.id);
      return;
    }
    onAdd({
      id: `preset_${presetId}`,
      presetId,
      name: preset.name,
      filename: preset.filename,
      weight: preset.defaultWeight,
      triggerWords: preset.triggerWords,
    });
  };

  const handleAddCustom = () => {
    if (!customFilename.trim()) return;
    customCounter++;
    onAdd({
      id: `custom_${customCounter}`,
      name: customName || customFilename,
      filename: customFilename.trim(),
      weight: customWeight,
      triggerWords: customTrigger,
    });
    setCustomName("");
    setCustomFilename("");
    setCustomWeight(0.8);
    setCustomTrigger("");
    setShowCustomForm(false);
  };

  return (
    <div className="lora-section">
      {/* Category tabs */}
      <div className="lora-tabs">
        {LORA_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`lora-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Preset list */}
      <div className="lora-preset-grid">
        {filteredPresets.length === 0 ? (
          <p className="lora-empty">このカテゴリには対応するLoRAがありません</p>
        ) : (
          filteredPresets.map((preset) => {
            const isActive = activePresetIds.has(preset.id);
            return (
              <button
                key={preset.id}
                className={`lora-preset-card ${isActive ? "active" : ""}`}
                onClick={() => handleAddPreset(preset.id)}
              >
                <div className="lora-preset-top">
                  <span className="lora-preset-name">{preset.name}</span>
                  {isActive && <span className="lora-active-dot">✓</span>}
                </div>
                <p className="lora-preset-desc">{preset.description}</p>
                {preset.triggerWords && (
                  <span className="lora-trigger-preview">{preset.triggerWords}</span>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Active LoRAs */}
      {activeLoras.length > 0 && (
        <div className="active-loras">
          <p className="active-loras-title">選択中のLoRA ({activeLoras.length})</p>
          <div className="active-lora-list">
            {activeLoras.map((lora) => (
              <div key={lora.id} className="active-lora-card">
                <div className="active-lora-header">
                  <span className="active-lora-name">{lora.name}</span>
                  <button
                    className="lora-remove-btn"
                    onClick={() => onRemove(lora.id)}
                    title="削除"
                  >
                    ×
                  </button>
                </div>

                <div className="active-lora-filename">
                  <span className="field-label">ファイル名</span>
                  <input
                    className="lora-input"
                    value={lora.filename}
                    onChange={(e) => onUpdateFilename(lora.id, e.target.value)}
                    placeholder="lora_filename"
                  />
                </div>

                <div className="active-lora-weight">
                  <span className="field-label">
                    ウェイト: <strong>{lora.weight.toFixed(2)}</strong>
                  </span>
                  <input
                    type="range"
                    min={0.1}
                    max={1.5}
                    step={0.05}
                    value={lora.weight}
                    onChange={(e) => onUpdateWeight(lora.id, parseFloat(e.target.value))}
                    className="weight-slider"
                  />
                  <div className="weight-scale">
                    <span>0.1</span><span>0.8</span><span>1.5</span>
                  </div>
                </div>

                <div className="active-lora-trigger">
                  <span className="field-label">トリガーワード</span>
                  <input
                    className="lora-input"
                    value={lora.triggerWords}
                    onChange={(e) => onUpdateTrigger(lora.id, e.target.value)}
                    placeholder="trigger words (任意)"
                  />
                </div>

                <code className="lora-preview-tag">
                  {`<lora:${lora.filename || "filename"}:${lora.weight.toFixed(2)}>`}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom LoRA */}
      <div className="custom-lora-area">
        {!showCustomForm ? (
          <button className="add-custom-btn" onClick={() => setShowCustomForm(true)}>
            + カスタムLoRAを追加
          </button>
        ) : (
          <div className="custom-lora-form">
            <p className="custom-form-title">カスタムLoRA</p>
            <div className="form-row">
              <label className="field-label">表示名</label>
              <input
                className="lora-input"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="My LoRA"
              />
            </div>
            <div className="form-row">
              <label className="field-label">ファイル名 *</label>
              <input
                className="lora-input"
                value={customFilename}
                onChange={(e) => setCustomFilename(e.target.value)}
                placeholder="lora_filename (拡張子なし)"
              />
            </div>
            <div className="form-row">
              <label className="field-label">ウェイト: {customWeight.toFixed(2)}</label>
              <input
                type="range"
                min={0.1}
                max={1.5}
                step={0.05}
                value={customWeight}
                onChange={(e) => setCustomWeight(parseFloat(e.target.value))}
                className="weight-slider"
              />
            </div>
            <div className="form-row">
              <label className="field-label">トリガーワード</label>
              <input
                className="lora-input"
                value={customTrigger}
                onChange={(e) => setCustomTrigger(e.target.value)}
                placeholder="trigger words (任意)"
              />
            </div>
            <div className="form-actions">
              <button
                className="btn-add"
                onClick={handleAddCustom}
                disabled={!customFilename.trim()}
              >
                追加
              </button>
              <button className="btn-cancel" onClick={() => setShowCustomForm(false)}>
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
