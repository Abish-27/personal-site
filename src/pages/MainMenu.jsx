import { useMemo, useState } from "react";
import Character from "./Character";
import Inventory from "./Inventory";
import QuestLog from "./QuestLog";
import Arcade from "./Arcade";
import Tutorial from "./Tutorial";
import PlayHub from "./PlayHub";




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


  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "#f5f5f5", padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
        {/* Left menu */}
        <div style={{ border: "4px solid #f5f5f5", padding: 16 }}>
          <div style={{ fontSize: 20, marginBottom: 12 }}>MAIN MENU</div>

          <div style={{ display: "grid", gap: 8 }}>
            {menu.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                    if (item.key === "play") {
                        setLastNonPlay(selected === "play" ? lastNonPlay : selected);
                        setSelected("play");
                    } else {
                        setSelected(item.key);
                    }
                    }}
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
    onExit={() => setSelected(lastNonPlay)}
    onNavigate={(key) => setSelected(key)}
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
    </div>
  );
}
