import { useParams } from "react-router";
import {
  getCategoryLabel,
  isCategoryId,
  type CategoryId,
} from "../domain/categories";
import ShoppingHead from "./ShoppingHead";
import { useItemsByCategory } from "../hooks/useItems";
import Item from "./Item";
import FloatingActionButton from "@/shared/ui/FloatingActionButton";
import { shoppingPaths } from "../routes";
import { actions } from "../application/itemActions";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

export default function TodoListPage() {
  const { category } = useParams();

  if (!category || !isCategoryId(category)) {
    return <p>Kategorie nicht gefunden</p>;
  }
  return <CategoryList category={category} />;
}

function CategoryList({ category }: { category: CategoryId }) {
  const items = useItemsByCategory(category);

  async function handleDragEnd({ active, over }: DragEndEvent) {
    if (!items || !over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedItems = arrayMove(items, oldIndex, newIndex);

    await actions.reorderItems(
      category,
      reorderedItems.map((todo) => todo.id),
    );
  }
  return (
    <>
      <ShoppingHead subHeadlineText={getCategoryLabel(category)} />
      <FloatingActionButton to={shoppingPaths.create(category)} />
      {items === undefined ? (
        <p>Lädt …</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">
          Keine Artikel in dieser Kategorie
        </p>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="mx-auto flex w-full max-w-[25rem] flex-col gap-4 px-4 pt-5 pb-28">
              {items.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </>
  );
  // todos === undefined → "Lädt …", leer → Hinweis, sonst Titel als einfache Liste
}
