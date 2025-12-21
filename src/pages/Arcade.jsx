import { gamedev } from "../data/gamedev";

function Frame({ title, children }) {
  return (
    <div style={{ border: "2px solid #f5f5f5", padding: 12 }}>
      <h2 style={{ marginTop: 0, marginBottom: 10 }}>{title}</h2>
      {children}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span
      style={{
        border: "1px solid #f5f5f5",
        padding: "2px 6px",
        fontSize: 12,
        opacity: 0.9,
      }}
    >
      {children}
    </span>
  );
}

function GalleryCard({ title, subtitle, image, link }) {
  return (
    <div style={{ border: "2px solid #f5f5f5", padding: 10 }}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ opacity: 0.85, marginTop: 4 }}>{subtitle}</div>

      <div
  style={{
    marginTop: 10,
    border: "2px solid #f5f5f5",
    height: 110,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}
>
  {image ? (
    <img
      src={image}
      alt={title}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  ) : (
    <div style={{ opacity: 0.6 }}>Screenshot placeholder</div>
  )}
</div>


      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-block", marginTop: 10, color: "#7cff6b" }}
        >
          View
        </a>
      ) : (
        <div style={{ marginTop: 10, opacity: 0.6, fontSize: 12 }}>
          (Add link later)
        </div>
      )}
    </div>
  );
}

export default function Arcade() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Arcade</h1>

      {/* Top: highlights + current game */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Frame title="Game Dev Highlights">
          <div style={{ display: "grid", gap: 8 }}>
            {gamedev.highlights.map((h) => (
              <div key={h} style={{ border: "1px solid #f5f5f5", padding: 8 }}>
                {h}
              </div>
            ))}
          </div>
        </Frame>

        <Frame title="Current Project">
          <div style={{ fontWeight: 700, fontSize: 16 }}>{gamedev.current.name}</div>
          <div style={{ opacity: 0.85, marginTop: 6 }}>{gamedev.current.status}</div>
          {gamedev.current.oneLiner ? (
            <div style={{ marginTop: 10, opacity: 0.9 }}>{gamedev.current.oneLiner}</div>
          ) : null}

          <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Pill>Godot</Pill>
            <Pill>Physics</Pill>
            <Pill>In Progress</Pill>
          </div>
        </Frame>
      </div>

      {/* Middle: gallery */}
      <div style={{ marginTop: 12 }}>
        <Frame title="Gallery">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 10,
            }}
          >
            {gamedev.gallery.map((g) => (
              <GalleryCard
                key={g.title}
                title={g.title}
                subtitle={g.subtitle}
                image={g.image}
                link={g.link}
              />
            ))}
          </div>
        </Frame>
      </div>

      {/* Bottom: jams */}
      <div style={{ marginTop: 12 }}>
        <Frame title="Jams">
          {gamedev.jams.length === 0 ? (
            <div style={{ opacity: 0.75 }}>
              No jam entries yet — add them in <code>src/data/gamedev.js</code>.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {gamedev.jams.map((j) => (
                <div key={j.name} style={{ border: "2px solid #f5f5f5", padding: 10 }}>
                  <div style={{ fontWeight: 700 }}>{j.name}</div>
                  <div style={{ opacity: 0.85 }}>{j.result}</div>
                  {j.link ? (
                    <a href={j.link} target="_blank" rel="noreferrer" style={{ color: "#7cff6b" }}>
                      Link
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </Frame>
      </div>
    </div>
  );
}
