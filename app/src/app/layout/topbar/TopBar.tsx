import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

function TopBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <>
      <div className="bg-[#d9d9d9] h-15 items-center justify-center flex sticky top-0">
        {!isHome && (
          <button
            onClick={() => navigate(-1)}
            type="button"
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
        )}

        <h1 className="text-5xl justify-center items-center font-['Abel']">
          utils
        </h1>
      </div>
    </>
  );
}

export default TopBar;
