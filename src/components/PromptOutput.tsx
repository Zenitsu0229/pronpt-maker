import { useState } from "react";
import "./PromptOutput.css";

interface Props {
  prompt: string;
  negativePrompt: string;
}

export function PromptOutput({ prompt, negativePrompt }: Props) {
  const [copied, setCopied] = useState<"positive" | "negative" | null>(null);

  const copyText = async (text: string, type: "positive" | "negative") => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="prompt-output">
      <div className="output-section">
        <div className="output-header">
          <span className="output-label">プロンプト</span>
          <button
            className={`copy-btn ${copied === "positive" ? "copied" : ""}`}
            onClick={() => copyText(prompt, "positive")}
            disabled={!prompt}
          >
            {copied === "positive" ? "✓ コピー済み" : "コピー"}
          </button>
        </div>
        <div className={`output-box ${!prompt ? "empty" : ""}`}>
          {prompt || "タグを選択するとプロンプトが生成されます"}
        </div>
      </div>

      {negativePrompt && (
        <div className="output-section">
          <div className="output-header">
            <span className="output-label negative">ネガティブプロンプト</span>
            <button
              className={`copy-btn ${copied === "negative" ? "copied" : ""}`}
              onClick={() => copyText(negativePrompt, "negative")}
            >
              {copied === "negative" ? "✓ コピー済み" : "コピー"}
            </button>
          </div>
          <div className="output-box negative-box">{negativePrompt}</div>
        </div>
      )}
    </div>
  );
}
