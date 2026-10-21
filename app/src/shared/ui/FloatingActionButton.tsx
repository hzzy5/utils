import { SquarePlus } from "lucide-react";
import { Link } from "react-router";

export default function FloatingActionButton({ to }: { to: string }) {
  return (
    <Link
      to={to}
      className="fixed right-5 bottom-5 z-40 flex size-28 items-center justify-center rounded-full bg-[#d9d9d9] text-[#303030] shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-transform active:scale-95"
    >
      <SquarePlus size={64} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}
