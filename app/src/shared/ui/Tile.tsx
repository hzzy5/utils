import { Link } from "react-router";

export default function Tile({
  title,
  path,
  className = "",
  paddingY = "py-4",
  textSize = "text-4xl",
}: {
  title: string;
  path: string;
  className?: string;
  textSize?:
    | "text-xl"
    | "text-2xl"
    | "text-3xl"
    | "text-4xl"
    | "text-5xl"
    | "text-6xl";
  paddingY?: "py-2" | "py-3" | "py-4" | "py-5" | "py-6" | "py-1";
}) {
  return (
    <Link
      className={`block border-4 border-black bg-[#d9d9d9] font-light text-center ${textSize} text-black active:brightness-90 ${className} ${paddingY}`}
      to={path}
    >
      {title}
    </Link>
  );
}
