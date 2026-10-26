import { useParams } from "react-router";
import {
  getCategoryLabel,
  isCategoryId,
  type CategoryId,
} from "../domain/categories";
import TodoHead from "./TodoHead";
import { useToDosByCategory } from "../hooks/useToDos";
import ToDoItem from "./ToDoItem";
import FloatingActionButton from "@/shared/ui/FloatingActionButton";
import { todoPaths } from "../routes";
import {
  moveCheckedToNext,
  moveCheckedToPrevious,
  actions,
} from "../hooks/useToDosActions";
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
  const todos = useToDosByCategory(category);

  async function handleDragEnd({ active, over }: DragEndEvent) {
    if (!todos || !over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedTodos = arrayMove(todos, oldIndex, newIndex);

    await actions.reorderToDos(
      category,
      reorderedTodos.map((todo) => todo.id),
    );
  }
  return (
    <>
      <TodoHead
        subHeadlineText={getCategoryLabel(category)}
        buttonMode={true}
        category={category}
        onPressLeft={() => moveCheckedToNext(category)}
        onPressRight={() => moveCheckedToPrevious(category)}
      />
      <FloatingActionButton to={todoPaths.create(category)} />
      {todos === undefined ? (
        <p>Lädt …</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500">
          Keine To-Do's in dieser Kategorie
        </p>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={todos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="mx-auto flex w-full max-w-[25rem] flex-col gap-4 px-4 py-5">
              {todos.map((todo) => (
                <ToDoItem key={todo.id} todo={todo} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </>
  );
  // todos === undefined → "Lädt …", leer → Hinweis, sonst Titel als einfache Liste
}
