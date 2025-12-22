function Card({ title, children }) {
  return (
    <div style={{ border: "2px solid #f5f5f5", padding: 12 }}>
      <h2 style={{ marginTop: 0, marginBottom: 10 }}>{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value, href }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: 10,
        padding: "8px 0",
        borderTop: "1px solid rgba(245,245,245,0.25)",
      }}
    >
      <div style={{ opacity: 0.85 }}>{label}</div>
      <div style={{ opacity: 0.95 }}>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" style={{ color: "#7cff6b" }}>
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

export default function GuildHall() {
  // TODO: Replace these with your real links
  const contact = {
    email: "abishkulkarni@gmail.com",
    github: "https://github.com/Abish-27",
    linkedin: "https://linkedin.com/in/abish-kulkarni-83b666231/",
    resume: "/resume.pdf", // e.g. "/resume.pdf" if you put it in /public
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Guild Hall</h1>
      <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
        Leave a message at the guild board. If you’ve got an opportunity, I’m down to chat.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Card title="Guild Board">
          <div style={{ border: "1px solid rgba(245,245,245,0.35)", padding: 10, opacity: 0.95 }}>
            <div style={{ opacity: 0.85, marginBottom: 8 }}>
              Status: <span style={{ color: "#7cff6b" }}>Available for collabs & internships</span>
            </div>
            <div style={{ opacity: 0.85 }}>
              Preferred message format:
              <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 18, lineHeight: 1.7 }}>
                <li>What you’re building</li>
                <li>Role + timeline</li>
                <li>Link to spec/repo (if any)</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 12, border: "2px solid #f5f5f5", padding: 10 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Quick Send</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href={`mailto:${contact.email}`}
                style={{ border: "2px solid #f5f5f5", padding: "8px 10px", color: "#f5f5f5", textDecoration: "none" }}
              >
                ✉️ Email
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                style={{ border: "2px solid #f5f5f5", padding: "8px 10px", color: "#f5f5f5", textDecoration: "none" }}
              >
                🧩 GitHub
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{ border: "2px solid #f5f5f5", padding: "8px 10px", color: "#f5f5f5", textDecoration: "none" }}
              >
                🏷️ LinkedIn
              </a>
              {contact.resume ? (
                <a
                  href={contact.resume}
                  target="_blank"
                  rel="noreferrer"
                  style={{ border: "2px solid #f5f5f5", padding: "8px 10px", color: "#f5f5f5", textDecoration: "none" }}
                >
                  📜 Resume
                </a>
              ) : null}
            </div>
          </div>
        </Card>

        <Card title="Contact Info">
          <div style={{ border: "1px solid rgba(245,245,245,0.35)", padding: 10 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Player Profile</div>
            <div style={{ opacity: 0.85 }}>Class: Full-stack builder • Game dev enjoyer • Hackathon menace</div>
          </div>

          <div style={{ marginTop: 12 }}>
            <Row label="Email" value={contact.email} href={`mailto:${contact.email}`} />
            <Row label="GitHub" value={contact.github.replace("https://", "")} href={contact.github} />
            <Row label="LinkedIn" value={contact.linkedin.replace("https://", "")} href={contact.linkedin} />
            <Row
              label="Resume"
              value={contact.resume ? "Open resume" : "(Add /public/resume.pdf later)"}
              href={contact.resume || null}
            />
          </div>

          <div style={{ marginTop: 12, opacity: 0.75, lineHeight: 1.6 }}>
            Tip: Put your resume file in <code>public/</code> as <code>resume.pdf</code> and set{" "}
            <code>resume: "/resume.pdf"</code>.
          </div>
        </Card>
      </div>
    </div>
  );
}
