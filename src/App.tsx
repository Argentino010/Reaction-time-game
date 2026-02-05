import { useEffect, useState } from "react";

type GameState = "idle" | "waiting" | "ready" | "result" | "tooEarly";

export default function App() {
  const [state, setState] = useState<GameState>("idle");
  const [start, setStart] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    if (state !== "waiting") return;
    const delay = Math.floor(Math.random() * 3000) + 1000;
    const id = setTimeout(() => {
      setStart(Date.now());
      setState("ready");
    }, delay);
    return () => clearTimeout(id);
  }, [state]);

  function onClick() {
    if (state === "idle") {
      setTime(null);
      setStart(null);
      setState("waiting");
      return;
    }
    if (state === "waiting") {
      setState("tooEarly");
      return;
    }
    if (state === "ready") {
      if (start === null) return;
      const ms = Date.now() - start;
      setTime(ms);
      setBest((b) => (b === null || ms < b ? ms : b));
      setState("result");
      return;
    }
    setState("idle");
  }

  const bg =
    state === "idle"
      ? "#9ca3af"
      : state === "waiting"
      ? "#ef4444"
      : state === "ready"
      ? "#22c55e"
      : state === "tooEarly"
      ? "#f59e0b"
      : "#3b82f6";

  const text =
    state === "idle"
      ? "Klicka för att starta"
      : state === "waiting"
      ? "Vänta..."
      : state === "ready"
      ? "KLICKA!"
      : state === "tooEarly"
      ? "För tidigt! Klicka för omstart"
      : `Tid: ${time} ms | Highscore: ${best} ms`;

  return (
    <div
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0f172a",
      }}
    >
      <div
        onClick={onClick}
        style={{
          width: 340,
          height: 340,
          borderRadius: 18,
          display: "grid",
          placeItems: "center",
          padding: 18,
          textAlign: "center",
          color: "white",
          fontSize: 22,
          fontWeight: 600,
          background: bg,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {text}
      </div>
    </div>
  );
}
