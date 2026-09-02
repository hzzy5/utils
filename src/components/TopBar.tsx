import { useNavigate, useLocation } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const showBack = location.pathname !== "/";

  return (
    <div className="fixed top-4 right-4 z-50">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          aria-label="Zurück"
          title="Zurück"
          className=" text-sm rounded-md flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
