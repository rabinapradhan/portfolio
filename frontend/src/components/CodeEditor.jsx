import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { services } from "@/lib/services";
const KEYWORDS =
  /\b(import|from|export|const|let|async|await|return|function|if|else|new|true|false|null|type|interface|SELECT|FROM|WHERE|JOIN|ON)\b/;

function highlight(line) {
  if (line.trim().startsWith("//")) {
    return <span className="text-syn-com">{line}</span>;
  }

  const parts = line.split(
    /("[^"]*"|'[^']*'|`[^`]*`|\b\d+\b|\b[A-Za-z_]\w*(?=\()|\b[A-Za-z_]\w*\b)/g,
  );

  return parts.map((part, i) => {
    if (!part) return null;

    if (/^["'`]/.test(part)) {
      return (
        <span key={i} className="text-syn-str">
          {part}
        </span>
      );
    }

    if (/^\d+$/.test(part)) {
      return (
        <span key={i} className="text-syn-num">
          {part}
        </span>
      );
    }

    if (KEYWORDS.test(part) && part.match(KEYWORDS)?.[0] === part) {
      return (
        <span key={i} className="text-syn-key">
          {part}
        </span>
      );
    }

    if (/^[A-Za-z_]\w*$/.test(part) && parts[i + 1]?.startsWith("(")) {
      return (
        <span key={i} className="text-syn-fn">
          {part}
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

const CodeEditor = () => {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(0);
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const runId = useRef(0);

  const svc = services[active] ?? services[0];
  const code = svc.code;

  // Typing animation
  useEffect(() => {
    setTyped(0);
    setOutput(null);
    setRunning(false);

    runId.current += 1;

    const interval = setInterval(() => {
      setTyped((current) => {
        if (current >= code.length) {
          clearInterval(interval);
          return current;
        }

        return Math.min(current + 3, code.length);
      });
    }, 12);

    return () => clearInterval(interval);
  }, [code, active, replayKey]);

  const visible = code.slice(0, typed);
  const lines = visible.split("\n");
  const done = typed >= code.length;

  // Run simulated output
  const run = () => {
    if (running) return;

    const currentRun = ++runId.current;

    setTyped(code.length);
    setRunning(true);
    setOutput([]);

    svc.output.forEach((line, index) => {
      setTimeout(
        () => {
          if (runId.current !== currentRun) return;

          setOutput((current) => [...(current ?? []), line]);

          if (index === svc.output.length - 1) {
            setRunning(false);
          }
        },
        250 * (index + 1),
      );
    });
  };

  // Replay animation
  const replay = () => {
    runId.current += 1;
    setRunning(false);
    setOutput(null);
    setTyped(0);
    setReplayKey((key) => key + 1);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-editor font-mono text-[13px] text-editor-fg shadow-editor">
      {/* Editor header */}
      <div className="flex items-center gap-2 bg-editor-bar px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-dot-red" />
        <span className="h-3 w-3 rounded-full bg-dot-yellow" />
        <span className="h-3 w-3 rounded-full bg-dot-green" />

        <span className="ml-3 text-xs text-editor-dim">
          rabina.dev — services
        </span>
      </div>

      {/* Service tabs */}
      <div className="flex overflow-x-auto border-b border-editor-line bg-editor-bar">
        {services.map((service, index) => (
          <button
            key={service.file}
            onClick={() => setActive(index)}
            className={`whitespace-nowrap border-r border-editor-line px-4 py-2 text-xs transition-colors ${
              index === active
                ? "bg-editor text-editor-fg"
                : "text-editor-dim hover:text-editor-fg"
            }`}
          >
            {service.file}
          </button>
        ))}
      </div>

      {/* Code area */}
      <div className="h-[280px] overflow-auto py-4">
        {lines.map((line, index) => (
          <div key={index} className="flex leading-6">
            <span className="w-12 shrink-0 select-none pr-4 text-right text-editor-dim">
              {index + 1}
            </span>

            <span className="whitespace-pre">
              {highlight(line)}

              {index === lines.length - 1 && (
                <span className="caret-blink ml-px inline-block h-4 w-[2px] translate-y-0.5 bg-syn-key" />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Editor controls */}
      <div className="border-t border-editor-line">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-xs text-editor-dim">
            {done ? "● ready" : "○ typing…"} · {svc.title}
          </span>

          <div className="flex gap-2">
            <button
              onClick={replay}
              aria-label="Replay"
              className="rounded-md p-1.5 text-editor-dim hover:text-editor-fg"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={run}
              disabled={running}
              className="flex items-center gap-1.5 rounded-md bg-syn-key px-3 py-1 text-xs font-semibold text-editor disabled:opacity-60"
            >
              <Play className="h-3 w-3" />
              Run
            </button>
          </div>
        </div>

        {/* Terminal */}
        <div className="h-[92px] overflow-auto bg-editor-bar px-4 py-2 text-xs leading-5">
          {output === null ? (
            <span className="text-editor-dim">
              $ press Run to execute {svc.file}
            </span>
          ) : (
            output.map((line, index) => (
              <div key={index} className="text-syn-str">
                {line}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
