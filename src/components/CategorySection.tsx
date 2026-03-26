import { useState } from "react";
import type { Category, Tag } from "../data/categories";
import "./CategorySection.css";

interface Props {
  category: Category;
  selectedTags: string[];
  onToggleTag: (categoryId: string, value: string, multiSelect: boolean) => void;
}

export function CategorySection({ category, selectedTags, onToggleTag }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="category-section">
      <button
        className="category-header"
        onClick={() => setIsOpen((v) => !v)}
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

      {isOpen && (
        <div className="tag-grid">
          {category.tags.map((tag: Tag) => {
            const isSelected = selectedTags.includes(tag.value);
            return (
              <button
                key={tag.value}
                className={`tag-btn ${isSelected ? "selected" : ""}`}
                onClick={() =>
                  onToggleTag(category.id, tag.value, category.multiSelect ?? false)
                }
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
