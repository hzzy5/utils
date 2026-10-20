import { Link } from "react-router";

export default function Tile({ title, path }: { title: string; path: string }) {
  return (
    <Link
      className="block border-4 border-black bg-[#d9d9d9] py-4 font-light text-center text-4xl text-black active:brightness-90"
      to={path}
    >
      {title}
    </Link>
  );
}
