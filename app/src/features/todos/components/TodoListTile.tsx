import Tile from "@/shared/ui/Tile";

export default function ToDoListTile({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  return (
    <div className="">
      <Tile title={label} path={to} />
    </div>
  );
}
