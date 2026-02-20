import { useState, useEffect } from "react";

const LOGS: string[] = [];

interface TerminalLoaderProps {
  open: boolean;
  onComplete: () => void;
}

const TerminalLoader = ({ open, onComplete }: TerminalLoaderProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentChar, setCurrentChar] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (!open) {
      setLines([]);
      setCurrentChar(0);
      setCurrentLine(0);
      return;
    }

    if (currentLine >= LOGS.length) {
      const timeout = setTimeout(onComplete, 600);
      return () => clearTimeout(timeout);
    }

    const fullLine = LOGS[currentLine];
    if (currentChar < fullLine.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = fullLine.slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, 18);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setLines((prev) => [...prev, ""]);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [open, currentLine, currentChar, onComplete]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border border-emerald-500/20 bg-black p-6 shadow-[0_0_60px_hsl(152_69%_50%/0.1)]">
        {/* Title bar */}
        <div className="mb-4 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 font-mono text-xs text-emerald-500/60">readmegen — terminal</span>
        </div>

        {/* Terminal content */}
        <div className="min-h-[200px] font-mono text-sm leading-7 text-emerald-400">
          {lines.map((line, i) => (
            <div key={i} className={i === currentLine ? "opacity-100" : "opacity-70"}>
              {line}
              {i === currentLine && currentChar < (LOGS[currentLine]?.length ?? 0) && (
                <span className="animate-pulse">▊</span>
              )}
            </div>
          ))}
          {currentLine >= LOGS.length && (
            <div className="mt-2 animate-pulse text-emerald-300">▊</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;
