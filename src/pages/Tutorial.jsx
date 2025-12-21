export default function Tutorial() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Tutorial</h1>

      <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
        Welcome! This site is a pixel-RPG themed portfolio.
      </p>

      <div style={{ border: "2px solid #f5f5f5", padding: 12, marginTop: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>How to explore</div>
        <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.9, lineHeight: 1.7 }}>
          <li>Use the menu on the left to switch panels normally.</li>
          <li>Or choose <b>Play</b> to explore the forest hub and interact with landmarks.</li>
        </ul>
      </div>

      <div style={{ border: "2px solid #f5f5f5", padding: 12, marginTop: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Controls (Play mode)</div>
        <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.9, lineHeight: 1.7 }}>
          <li>Move: <b>WASD</b> or <b>Arrow keys</b></li>
          <li>Interact: <b>E</b> or <b>Enter</b></li>
          <li>Mouse: click landmarks to open panels</li>
        </ul>
      </div>

      <p style={{ opacity: 0.75, marginTop: 14 }}>
        Tip: Play mode is optional — the menu tabs are always the fastest way.
      </p>
    </div>
  );
}
