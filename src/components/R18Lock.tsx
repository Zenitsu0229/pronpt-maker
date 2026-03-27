import { useState } from "react";
import "./R18Lock.css";

interface Props {
  onUnlock: () => void;
}

export function R18Lock({ onUnlock }: Props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === "1234") {
      onUnlock();
    } else {
      setError(true);
      setInput("");
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className={`r18-lock ${error ? "shake" : ""}`}>
      <span className="r18-lock-icon">🔒</span>
      <span className="r18-lock-label">R18 コンテンツはロックされています</span>
      <form className="r18-lock-form" onSubmit={handleSubmit}>
        <input
          className={`r18-lock-input ${error ? "error" : ""}`}
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="パスワードを入力"
          maxLength={8}
          autoComplete="off"
        />
        <button className="r18-lock-btn" type="submit">解除</button>
      </form>
      {error && <span className="r18-lock-error">パスワードが違います</span>}
    </div>
  );
}
