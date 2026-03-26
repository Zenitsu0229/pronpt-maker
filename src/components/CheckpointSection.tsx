import type { Checkpoint } from "../data/checkpoints";
import "./CheckpointSection.css";

interface Props {
  checkpoints: Checkpoint[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const BASE_MODEL_COLORS: Record<string, string> = {
  Pony: "#f59e0b",
  Illustrious: "#8b5cf6",
  SDXL: "#3b82f6",
  "SD1.5": "#10b981",
  NAI: "#ec4899",
};

export function CheckpointSection({ checkpoints, selectedId, onSelect }: Props) {
  const selected = checkpoints.find((c) => c.id === selectedId) ?? null;
  const color = selected ? (BASE_MODEL_COLORS[selected.baseModel] ?? "#6366f1") : null;

  return (
    <div className="checkpoint-section">
      <div className="checkpoint-select-wrapper">
        <select
          className="checkpoint-select"
          value={selectedId ?? ""}
          onChange={(e) => onSelect(e.target.value || null)}
        >
          <option value="">-- チェックポイントを選択 --</option>
          {checkpoints.map((cp) => (
            <option key={cp.id} value={cp.id}>
              {cp.name} ({cp.baseModel})
            </option>
          ))}
        </select>
      </div>

      {selected && color && (
        <div className="checkpoint-info">
          <div className="checkpoint-info-top">
            <span
              className="base-model-badge"
              style={{ background: color + "22", color }}
            >
              {selected.baseModel}
            </span>
            <span className="checkpoint-desc">{selected.description}</span>
          </div>
          <div className="checkpoint-quality">
            <span className="quality-label">品質タグ（カテゴリ選択時に自動付与）</span>
            <code className="quality-code" style={{ color }}>
              {selected.qualityPrompt}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
