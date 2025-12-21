import { useEffect, useMemo, useRef, useState } from "react";

const GRID_W = 20;
const GRID_H = 14;

// Tile size in pixels (v1). You can make it responsive later.
const TILE = 24;

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export default function PlayHub({ onNavigate, onExit }) {
  const worldRef = useRef(null);

  const objects = useMemo(
    () => [
      { id: "sign", name: "Signpost", key: "tutorial", x: 10, y: 9, color: "#caa46a", prompt: "Read Guide" },
      { id: "cabin", name: "Cabin", key: "character", x: 4, y: 4, color: "#8b5a2b", prompt: "Enter Cabin (Character)" },
      { id: "shrine", name: "Shrine", key: "quests", x: 16, y: 4, color: "#9aa0a6", prompt: "Inspect Shrine (Quest Log)" },
      { id: "chest", name: "Chest", key: "inventory", x: 4, y: 12, color: "#b58b2a", prompt: "Open Chest (Inventory)" },
      { id: "portal", name: "Portal", key: "arcade", x: 16, y: 12, color: "#6d5bd0", prompt: "Enter Portal (Arcade)" },
      { id: "mail", name: "Mailbox", key: "guild", x: 10, y: 3, color: "#d34b4b", prompt: "Send Message (Guild Hall)" },
    ],
    []
  );

  // Obstacles: outer wall of trees + a few extra blocks.
  const obstacles = useMemo(() => {
    const set = new Set();
    const add = (x, y) => set.add(`${x},${y}`);

    // Border
    for (let x = 0; x < GRID_W; x++) { add(x, 0); add(x, GRID_H - 1); }
    for (let y = 0; y < GRID_H; y++) { add(0, y); add(GRID_W - 1, y); }

    // A few trees for vibe (keep paths open)
    const extras = [
      [7, 5], [8, 5], [12, 5], [13, 5],
      [7, 11], [8, 11], [12, 11], [13, 11],
      [10, 6], [10, 7], // little vertical tree pair above spawn-ish
    ];
    extras.forEach(([x, y]) => add(x, y));

    // Make objects “solid” too (prevents standing on top)
    objects.forEach((o) => add(o.x, o.y));

    return set;
  }, [objects]);

  const [player, setPlayer] = useState({ x: 10, y: 10, facing: "down" });
  const [keysDown, setKeysDown] = useState(() => new Set());

  // Find nearest interactable within 1 tile (Manhattan distance).
  const activeObject = useMemo(() => {
    let best = null;
    let bestD = Infinity;
    for (const o of objects) {
      const d = manhattan(player, o);
      if (d <= 1 && d < bestD) {
        best = o;
        bestD = d;
      }
    }
    return best;
  }, [objects, player]);

  // Keyboard listeners
  useEffect(() => {
    const down = (e) => {
      // prevent page scroll with arrow keys when focused
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      setKeysDown((prev) => {
        const next = new Set(prev);
        next.add(e.key);
        return next;
      });
    };
    const up = (e) => {
      setKeysDown((prev) => {
        const next = new Set(prev);
        next.delete(e.key);
        return next;
      });
    };

    window.addEventListener("keydown", down, { passive: false });
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Movement loop: move every 120ms while key held (grid-style).
  useEffect(() => {
    const interval = setInterval(() => {
      let dx = 0;
      let dy = 0;
      let facing = player.facing;

      const has = (k) => keysDown.has(k);

      if (has("w") || has("W") || has("ArrowUp")) { dy = -1; facing = "up"; }
      else if (has("s") || has("S") || has("ArrowDown")) { dy = 1; facing = "down"; }
      else if (has("a") || has("A") || has("ArrowLeft")) { dx = -1; facing = "left"; }
      else if (has("d") || has("D") || has("ArrowRight")) { dx = 1; facing = "right"; }

      // Interact
      const interactPressed = has("e") || has("E") || has("Enter");
      if (interactPressed && activeObject) {
        // Clear keys to avoid repeating
        setKeysDown(new Set());
        onNavigate(activeObject.key);
        return;
      }

      if (dx === 0 && dy === 0) {
        // still update facing if needed
        if (facing !== player.facing) setPlayer((p) => ({ ...p, facing }));
        return;
      }

      const nx = clamp(player.x + dx, 0, GRID_W - 1);
      const ny = clamp(player.y + dy, 0, GRID_H - 1);

      if (!obstacles.has(`${nx},${ny}`)) {
        setPlayer({ x: nx, y: ny, facing });
      } else {
        // blocked, still update facing
        if (facing !== player.facing) setPlayer((p) => ({ ...p, facing }));
      }
    }, 120);

    return () => clearInterval(interval);
  }, [keysDown, player, obstacles, activeObject, onNavigate]);

  // Click-to-interact fallback
  const handleObjectClick = (obj) => {
    onNavigate(obj.key);
  };

  const worldW = GRID_W * TILE;
  const worldH = GRID_H * TILE;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>Play</h1>
        <button
          onClick={onExit}
          style={{
            background: "transparent",
            color: "#f5f5f5",
            border: "2px solid #f5f5f5",
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          Exit
        </button>
      </div>

      <div
        ref={worldRef}
        style={{
          width: worldW,
          height: worldH,
          border: "3px solid #f5f5f5",
          position: "relative",
          background: "#0f2a12",
          boxShadow: "0 0 0 3px rgba(0,0,0,0.6) inset",
          userSelect: "none",
        }}
      >
        {/* Clearing */}
        <div
          style={{
            position: "absolute",
            left: 6 * TILE,
            top: 5 * TILE,
            width: 8 * TILE,
            height: 6 * TILE,
            background: "#1c3b1f",
            opacity: 0.9,
          }}
        />

        {/* Trees border + obstacles as blocks */}
        {Array.from(obstacles).map((s) => {
          const [xStr, yStr] = s.split(",");
          const x = Number(xStr);
          const y = Number(yStr);

          // Skip object tiles (we render them differently below)
          const isObjectTile = objects.some((o) => o.x === x && o.y === y);
          if (isObjectTile) return null;

          // Render border + extra trees
          return (
            <div
              key={`tree-${s}`}
              style={{
                position: "absolute",
                left: x * TILE,
                top: y * TILE,
                width: TILE,
                height: TILE,
                background: "#0a1c0c",
                border: "1px solid rgba(245,245,245,0.25)",
              }}
            />
          );
        })}

        {/* Interactable objects */}
        {objects.map((o) => {
          const isActive = activeObject?.id === o.id;
          return (
            <div
              key={o.id}
              onClick={() => handleObjectClick(o)}
              title={`${o.name} → ${o.key}`}
              style={{
                position: "absolute",
                left: o.x * TILE,
                top: o.y * TILE,
                width: TILE,
                height: TILE,
                background: o.color,
                border: isActive ? "2px solid #7cff6b" : "1px solid rgba(245,245,245,0.65)",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            />
          );
        })}

        {/* Player */}
        <div
          style={{
            position: "absolute",
            left: player.x * TILE,
            top: player.y * TILE,
            width: TILE,
            height: TILE,
            background: "#2a7cff", // tunic colour for v1
            border: "1px solid rgba(245,245,245,0.85)",
            boxSizing: "border-box",
          }}
        >
          {/* Tiny “face” indicator based on facing */}
          <div
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              background: "#f5f5f5",
              opacity: 0.9,
              left: player.facing === "left" ? 4 : player.facing === "right" ? TILE - 10 : (TILE - 6) / 2,
              top: player.facing === "up" ? 4 : player.facing === "down" ? TILE - 10 : (TILE - 6) / 2,
            }}
          />
        </div>
      </div>

      {/* Prompt bar */}
      <div style={{ marginTop: 10, border: "2px solid #f5f5f5", padding: 10, opacity: 0.9 }}>
        {activeObject ? (
          <div>
            <b>E / Enter:</b> {activeObject.prompt}
          </div>
        ) : (
          <div>
            Move: <b>WASD</b> / <b>Arrows</b> • Interact: <b>E</b> / <b>Enter</b> • Or click landmarks
          </div>
        )}
      </div>
    </div>
  );
}
