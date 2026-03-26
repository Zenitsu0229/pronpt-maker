import { useState } from "react";
import "./PromptOutput.css";

interface PromptLine {
  name: string;
  tags: string[];
}

interface Props {
  prompt: string;
  negativePrompt: string;
  promptLines?: PromptLine[];
  checkpointName?: string;
}

export function PromptOutput({ prompt, negativePrompt, promptLines, checkpointName }: Props) {
  const [copied, setCopied] = useState<"positive" | "negative" | null>(null);

  const copyText = async (text: string, type: "positive" | "negative") => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const saveText = () => {
    if (!prompt && !negativePrompt) return;

    const lines: string[] = [];
    lines.push("=== Prompt Maker ===");
    if (checkpointName) {
      lines.push(`チェックポイント: ${checkpointName}`);
    }
    lines.push("");

    if (promptLines && promptLines.length > 0) {
      lines.push("--- プロンプト ---");
      for (const line of promptLines) {
        lines.push(`[${line.name}]`);
        lines.push(line.tags.join(", "));
        lines.push("");
      }
    }

    if (negativePrompt) {
      lines.push("--- ネガティブプロンプト ---");
      lines.push(negativePrompt);
      lines.push("");
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const now = new Date();
    const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
    a.download = `prompt_${ts}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="prompt-output">
      <div className="output-section">
        <div className="output-header">
          <span className="output-label">プロンプト</span>
          <div className="output-actions">
            <button
              className="save-btn"
              onClick={saveText}
              disabled={!prompt && !negativePrompt}
            >
              テキスト保存
            </button>
            <button
              className={`copy-btn ${copied === "positive" ? "copied" : ""}`}
              onClick={() => copyText(prompt, "positive")}
              disabled={!prompt}
            >
              {copied === "positive" ? "✓ コピー済み" : "コピー"}
            </button>
          </div>
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
