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
          className="p-2 bg-white/90 dark:bg-black/80 text-sm rounded-md shadow-md hover:shadow-lg border flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
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
