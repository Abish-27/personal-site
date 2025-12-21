import { useMemo, useState } from "react";
import { skills } from "../data/skills";

export default function Inventory() {
  const categories = useMemo(() => skills.map((s) => s.category), []);
  const [active, setActive] = useState(categories[0] ?? "Languages");

  const activeBlock = skills.find((s) => s.category === active) ?? skills[0];
  const items = activeBlock?.items ?? [];

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Inventory</h1>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            style={{
              background: "transparent",
              color: "#f5f5f5",
              border: "2px solid #f5f5f5",
              padding: "6px 10px",
              cursor: "pointer",
              outline: active === c ? "3px solid #7CFF6B" : "none",
            }}
          >
            {active === c ? "▶ " : "  "}
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 10,
        }}
      >
        {items.map((name) => (
          <div
            key={name}
            style={{
              border: "2px solid #f5f5f5",
              padding: 10,
              minHeight: 54,
              display: "flex",
              alignItems: "center",
            }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
