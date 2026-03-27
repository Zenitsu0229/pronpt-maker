import { useState } from "react";
import type { Category, Tag } from "../data/categories";
import "./CategorySection.css";

interface Props {
  category: Category;
  selectedTags: string[];
  groupColor?: string;
  onToggleTag: (categoryId: string, value: string, multiSelect: boolean) => void;
}

function getSpan(label: string): number {
  const len = label.length;
  if (len >= 11) return 3;
  if (len >= 6)  return 2;
  return 1;
}

export function CategorySection({ category, selectedTags, groupColor, onToggleTag }: Props) {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isOpen = isPinned || isHovered || selectedTags.length > 0;
  const color = groupColor ?? "var(--accent)";

  return (
    <div
      className="category-section"
      style={{ "--group-color": color } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`category-header ${isPinned ? "pinned" : ""}`}
        onClick={() => setIsPinned((v) => !v)}
        aria-expanded={isOpen}
      >
        <span className="category-name">
          <span className="category-name-ja">{category.name}</span>
          <span className="category-name-en">{category.nameEn}</span>
        </span>
        <span className="category-count">
          {selectedTags.length > 0 && (
            <span className="selected-badge">{selectedTags.length}</span>
          )}
          <span className="chevron" data-open={isOpen}>▾</span>
        </span>
      </button>

      <div className={`tag-grid-wrapper ${isOpen ? "open" : ""}`}>
        <div className="tag-grid-inner">
          <div className="tag-grid">
            {category.tags.map((tag: Tag) => {
              const isSelected = selectedTags.includes(tag.value);
              return (
                <button
                  key={tag.value}
                  className={`tag-btn ${isSelected ? "selected" : ""}`}
                  style={{ gridColumn: `span ${getSpan(tag.label)}` }}
                  onClick={() => onToggleTag(category.id, tag.value, category.multiSelect ?? false)}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
