import ShoppingHead from "./ShoppingHead";
import { shoppingPaths } from "../routes";
import { CATEGORIES } from "../domain/categories";
import FloatingActionButton from "@/shared/ui/FloatingActionButton";
import Tile from "@/shared/ui/Tile";

export function ShoppingHub() {
  return (
    <>
      <ShoppingHead />
      <div className=" mx-auto flex w-full max-w-md flex-col gap-5 px-4 py-5">
        {CATEGORIES.map((category) => (
          <Tile
            key={category.id}
            path={shoppingPaths.list(category.id)}
            title={category.label}
          />
        ))}
      </div>
      <FloatingActionButton to={shoppingPaths.create("grocerie")} />
    </>
  );
}
