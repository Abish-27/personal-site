import { useMemo, useState} from "react";
import Character from "./Character";
import Inventory from "./Inventory";
import QuestLog from "./QuestLog";
import Arcade from "./Arcade";
import Tutorial from "./Tutorial";
import PlayHub from "./PlayHub";
import GuildHall from "./GuildHall";

export default function MainMenu() {
  const menu = useMemo(
    () => [
      { key: "tutorial", label: "Tutorial" },
      { key: "character", label: "Character" },
      { key: "quests", label: "Quest Log" },
      { key: "inventory", label: "Inventory" },
      { key: "arcade", label: "Arcade" },
      { key: "guild", label: "Guild Hall" },
      { key: "play", label: "Play" },
    ],
    []
  );

  const [selected, setSelected] = useState("tutorial");
  const [lastNonPlay, setLastNonPlay] = useState("tutorial");

  const [isFading, setIsFading] = useState(false);

  // Safer fadeTo: ignore invalid keys + avoid double-trigger
  const fadeTo = (key) => {
  if (!key) return;
  if (isFading) return;

  setIsFading(true);

  // Switch panel at peak fade
  setTimeout(() => {
    setSelected(key);
  }, 220);

  // Fade back in
  setTimeout(() => {
    setIsFading(false);
  }, 320);
};


  const handleMenuClick = (key) => {
    if (key === "play") {
      // remember where we came from (only if we are not already in play)
      if (selected !== "play") setLastNonPlay(selected);
      setSelected("play");
    } else {
      setSelected(key);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "#f5f5f5", padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
        {/* Left menu */}
        <div style={{ border: "7px solid #f5f5f5", padding: 16 }}>
          <div style={{ fontSize: 20, marginBottom: 12 }}>MAIN MENU</div>

          <div style={{ display: "grid", gap: 8 }}>
            {menu.map((item) => (
              <button
                key={item.key}
                onClick={() => handleMenuClick(item.key)}
                style={{
                  background: "transparent",
                  color: "#f5f5f5",
                  border: "2px solid #f5f5f5",
                  padding: "10px 12px",
                  textAlign: "left",
                  cursor: "pointer",
                  outline: selected === item.key ? "3px solid #7CFF6B" : "none",
                }}
              >
                {selected === item.key ? "▶ " : "  "}
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>
            ↑ ↓ soon • Enter soon • Esc soon
          </div>
        </div>

        {/* Right panel */}
        <div style={{ border: "4px solid #f5f5f5", padding: 16, minHeight: 420 }}>
          {selected === "tutorial" ? (
            <Tutorial />
          ) : selected === "character" ? (
            <Character />
          ) : selected === "inventory" ? (
            <Inventory />
          ) : selected === "quests" ? (
            <QuestLog />
          ) : selected === "arcade" ? (
            <Arcade />
          ) : selected === "guild" ? (
            <GuildHall />
          ) : selected === "play" ? (
            <PlayHub
              onExit={() => fadeTo(lastNonPlay)}
              onNavigate={(key) => fadeTo(key)}
            />
          ) : (
            <div style={{ opacity: 0.85 }}>
              <h2 style={{ marginTop: 0 }}>
                {menu.find((m) => m.key === selected)?.label}
              </h2>
              <p>Placeholder screen. We’ll fill this next.</p>
            </div>
          )}
        </div>
      </div>

      {/* Fade overlay (hard-guarded so it can’t "white-screen" you) */}
      <div
        className={`fade-overlay ${isFading ? "on" : ""}`}
        style={{
          background: "#000", // force black even if CSS missing
        }}
      />
    </div>
  );
}
