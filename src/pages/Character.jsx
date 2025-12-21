import { education } from "../data/education";
import { experience } from "../data/experience";

export default function Character() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Character</h1>

      <h2>Education</h2>
      <ul>{education.map((e) => <li key={e.school}>{e.school}</li>)}</ul>

      <h2>Experience</h2>
      <ul>{experience.map((x) => <li key={x.title}>{x.title} — {x.org || "—"}</li>)}</ul>
    </div>
  );
}
