import { useState } from "react";
import { SLIDER_ITEMS } from "../data/sliderItems";
import type { WeightMap } from "../types";
import "./WeightSliders.css";

interface Props {
  weights: WeightMap;
  onChange: (id: string, weight: number) => void;
}

export function WeightSliders({ weights, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const activeCount = Object.values(weights).filter((v) => v > 0).length;

  return (
    <div className={`weight-sliders-section ${activeCount > 0 ? "has-active" : ""}`}>
      <button
        className={`weight-header ${open ? "expanded" : ""}`}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <div className="weight-header-left">
          <span className="weight-title-ja">表情・状態スライダー</span>
          <span className="weight-title-en">Expression Weights</span>
        </div>
        <div className="weight-header-right">
          {activeCount > 0 && <span className="weight-badge">{activeCount}</span>}
          <span className="chevron">{open ? "▾" : "▸"}</span>
        </div>
      </button>

      {open && (
        <div className="weight-body">
          {SLIDER_ITEMS.map((item) => {
            const w = weights[item.id] ?? 0;
            return (
              <div key={item.id} className={`slider-row ${w > 0 ? "active" : ""}`}>
                <div className="slider-label">
                  <span className="slider-label-ja">{item.label}</span>
                  <span className="slider-label-en">{item.labelEn}</span>
                </div>
                <input
                  type="range"
                  className="slider-input"
                  min={0}
                  max={1.5}
                  step={0.05}
                  value={w}
                  onChange={(e) => onChange(item.id, parseFloat(e.target.value))}
                />
                <div className="slider-value-wrap">
                  {w > 0 ? (
                    <span className="slider-value active">
                      ({item.value}:{w.toFixed(2)})
                    </span>
                  ) : (
                    <span className="slider-value off">OFF</span>
                  )}
                </div>
                {w > 0 && (
                  <button
                    className="slider-reset-btn"
                    onClick={() => onChange(item.id, 0)}
                    title="リセット"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
          <div className="weight-footer">
            <button
              className="weight-clear-btn"
              onClick={() => SLIDER_ITEMS.forEach((i) => onChange(i.id, 0))}
              disabled={activeCount === 0}
            >
              全リセット
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
