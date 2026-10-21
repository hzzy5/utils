import { Link } from "react-router";

export default function Tile({
  title,
  path,
  className = "",
  textSize = "text-4xl",
}: {
  title: string;
  path: string;
  className?: string;
  textSize?: "text-2xl" | "text-3xl" | "text-4xl" | "text-5xl" | "text-6xl";
}) {
  return (
    <Link
      className={`block border-4 border-black bg-[#d9d9d9] py-4 font-light text-center ${textSize} text-black active:brightness-90 ${className}`}
      to={path}
    >
      {title}
    </Link>
  );
}
