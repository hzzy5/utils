import { ArrowLeft } from "lucide-react";

function TopBar() {
  return (
    <>
      <div className="bg-[#d9d9d9] h-15 items-center justify-center flex sticky top-0">
        <button
          type="button"
          aria-label="Zurück"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2"
        >
          <ArrowLeft
            aria-hidden="true"
            size={35}
            strokeWidth={1.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </button>
        <h1 className="text-5xl justify-center items-center [font-family:'Abel']">
          utils
        </h1>
      </div>
    </>
  );
}

export default TopBar;
