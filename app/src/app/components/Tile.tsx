import { Link } from "react-router";

export default function Tile({ title, path }: { title: string; path: string }) {
  return <Link to={path}>{title}</Link>;
}
