import { projects } from "../data/projects";
import { hackathons } from "../data/hackathons";

function Box({ title, children }) {
  return (
    <div style={{ border: "2px solid #f5f5f5", padding: 12 }}>
      <h2 style={{ marginTop: 0, marginBottom: 10 }}>{title}</h2>
      {children}
    </div>
  );
}

function QuestCard({ name, oneLiner, tech }) {
  return (
    <div style={{ border: "2px solid #f5f5f5", padding: 10 }}>
      <div style={{ fontWeight: 700 }}>{name}</div>
      {oneLiner ? <div style={{ opacity: 0.85, marginTop: 4 }}>{oneLiner}</div> : null}
      {tech?.length ? (
        <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tech.map((t) => (
            <span key={t} style={{ border: "1px solid #f5f5f5", padding: "2px 6px", fontSize: 12 }}>
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function QuestLog() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Quest Log</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Box title="Quests (Projects)">
          <div style={{ display: "grid", gap: 10 }}>
            {projects.map((p) => (
              <QuestCard key={p.name} name={p.name} oneLiner={p.oneLiner} tech={p.tech} />
            ))}
          </div>
        </Box>

        <Box title="Tournaments (Hackathons)">
          <div style={{ display: "grid", gap: 8 }}>
            {hackathons.map((h) => (
              <div key={`${h.name}-${h.result}`} style={{ border: "2px solid #f5f5f5", padding: 10 }}>
                <div style={{ fontWeight: 700 }}>
                  {h.name} {h.year ? `(${h.year})` : ""}
                </div>
                <div style={{ opacity: 0.85 }}>{h.result}</div>
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );
}
