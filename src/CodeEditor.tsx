import React, { JSX } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onKeyDown }) => {
  // Highlight keywords and syntax
  const highlightCode = (text: string): JSX.Element[] => {
    const lines = text.split("\n");
    const keywords = [
      "Algorithme", "Variables", "Constantes", "Debut", "Fin",
      "Si", "Alors", "Sinon", "FinSi",
      "Pour", "De", "A", "Faire", "FinPour",
      "TantQue", "FinTantQue", "Repeter", "Jusqua",
      "Lire", "Ecrire",
      "ET", "OU", "NON",
      "Vrai", "Faux"
    ];

    const types = ["Entier", "Reel", "Chaine", "Caractere", "Booleen", "Tableau"];

    return lines.map((line, lineIndex) => {
      const elements: JSX.Element[] = [];

      // Process strings first
      const stringRegex = /"([^"]*)"/g;
      let stringMatch;
      const stringPositions: { start: number; end: number; value: string }[] = [];

      while ((stringMatch = stringRegex.exec(line)) !== null) {
        stringPositions.push({
          start: stringMatch.index,
          end: stringMatch.index + stringMatch[0].length,
          value: stringMatch[0]
        });
      }

      // Helper to check if position is in a string
      const isInString = (pos: number) => {
        return stringPositions.some(s => pos >= s.start && pos < s.end);
      };

      // Process assignment operator (convert <- to ←)
      const parts = line.split(/(<-|\s+|[(),;:\[\]])/);
      let charPosition = 0;

      parts.forEach((part, partIndex) => {
        const partStart = charPosition;
        charPosition += part.length;

        if (!part) return;

        // Assignment operator
        if (part === "<-") {
          elements.push(
            <span key={`${lineIndex}-${partIndex}`} className="token operator assignment">
              ←
            </span>
          );
          return;
        }

        // Whitespace
        if (part.match(/^\s+$/)) {
          elements.push(<span key={`${lineIndex}-${partIndex}`}>{part}</span>);
          return;
        }

        // Delimiters
        if (["(", ")", ",", ";", ":", "[", "]"].includes(part)) {
          elements.push(
            <span key={`${lineIndex}-${partIndex}`} className="token punctuation">
              {part}
            </span>
          );
          return;
        }

        // Check if this part is in a string
        if (isInString(partStart)) {
          const stringObj = stringPositions.find(s => partStart >= s.start && partStart < s.end);
          if (stringObj && partStart === stringObj.start) {
            elements.push(
              <span key={`${lineIndex}-${partIndex}`} className="token string">
                {stringObj.value}
              </span>
            );
          }
          return;
        }

        // Keywords
        if (keywords.includes(part)) {
          elements.push(
            <span key={`${lineIndex}-${partIndex}`} className="token keyword">
              {part}
            </span>
          );
          return;
        }

        // Types
        if (types.includes(part)) {
          elements.push(
            <span key={`${lineIndex}-${partIndex}`} className="token type">
              {part}
            </span>
          );
          return;
        }

        // Numbers
        if (part.match(/^\d+(\.\d+)?$/)) {
          elements.push(
            <span key={`${lineIndex}-${partIndex}`} className="token number">
              {part}
            </span>
          );
          return;
        }

        // Operators
        if (part.match(/^[+\-*/%=<>!]+$/)) {
          elements.push(
            <span key={`${lineIndex}-${partIndex}`} className="token operator">
              {part}
            </span>
          );
          return;
        }

        // Default text
        elements.push(<span key={`${lineIndex}-${partIndex}`}>{part}</span>);
      });

      return (
        <div key={lineIndex} className="code-line">
          {elements}
        </div>
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Create display version with <- converted to ←
  const displayCode = code.replace(/<-/g, "←");

  return (
    <div className="editor-wrapper">
      <pre className="line-numbers">
        {code.split("\n").map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </pre>

      <div className="code-display">
        <pre className="highlighted-code">
          {highlightCode(displayCode)}
        </pre>
      </div>

      <textarea
        className="code-editor"
        value={code}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder="Écrivez votre algorithme ici..."
        spellCheck={false}
      />
    </div>
  );
};

export default CodeEditor;
