import MenuButton from "../components/MenuButton";

export default function MainMenu() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="space-y-4 text-white">
        <MenuButton label="Start Game" />
        <MenuButton label="Profile" />
        <MenuButton label="Projects" />
        <MenuButton label="Settings" />
      </div>
    </div>
  );
}
