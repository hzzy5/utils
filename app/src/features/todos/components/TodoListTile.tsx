import Tile from "@/shared/ui/Tile";

export default function ToDoListTile({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return <Tile title={label} path={to} />;
}
