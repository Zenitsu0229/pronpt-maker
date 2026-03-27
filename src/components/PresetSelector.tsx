import type { Preset } from "../data/presets";
import "./PresetSelector.css";

interface Props {
  presets: Preset[];
  onApply: (preset: Preset) => void;
}

export function PresetSelector({ presets, onApply }: Props) {
  return (
    <div className="preset-bar">
      <span className="preset-bar-label">クイック設定</span>
      <div className="preset-list">
        {presets.map((p) => (
          <button
            key={p.id}
            className="preset-card"
            style={{ "--preset-color": p.color } as React.CSSProperties}
            onClick={() => onApply(p)}
            title={p.labelSub}
          >
            <span className="preset-icon">{p.icon}</span>
            <span className="preset-label">{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
