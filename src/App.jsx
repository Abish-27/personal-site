import MainMenu from "./pages/MainMenu";

export default function App() {
  return (
    <div
      style={{
        transform: "scale(1.1)",   // try 1.1 or 1.15
        transformOrigin: "top center",
      }}
    >
      <MainMenu />
      <div className="noise" />
      <div className="scanlines" />
    </div>
  );
}
