export default function MenuButton({ label }) {
  return (
    <button
      className="
        w-64
        py-3
        border-2 border-white
        text-lg
        hover:bg-white hover:text-black
        transition
      "
    >
      {label}
    </button>
  );
}
