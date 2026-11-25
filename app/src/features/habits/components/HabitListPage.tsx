import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import FloatingActionButton from "@/shared/ui/FloatingActionButton";
import { actions } from "../application/habitActions";
import { useHabits } from "../hooks/useHabits";
import { habitPaths } from "../routes";
import HabitHead from "./HabitHead";
import HabitItem from "./HabitItem";

export default function HabitListPage() {
  const habits = useHabits();

  async function handleDragEnd({ active, over }: DragEndEvent) {
    if (!habits || !over || active.id === over.id) return;

    const oldIndex = habits.findIndex((habit) => habit.id === active.id);
    const newIndex = habits.findIndex((habit) => habit.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedHabits = arrayMove(habits, oldIndex, newIndex);
    await actions.reorderHabits(reorderedHabits.map((habit) => habit.id));
  }

  return (
    <>
      <HabitHead />
      <FloatingActionButton to={habitPaths.create} />
      {habits === undefined ? (
        <p className="pt-5 text-center text-gray-400">Lädt …</p>
      ) : habits.length === 0 ? (
        <p className="pt-5 text-center text-gray-400">
          Noch keine Habits angelegt
        </p>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={habits.map((habit) => habit.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="mx-auto flex w-full max-w-100 flex-col gap-4 px-4 pt-5 pb-28">
              {habits.map((habit) => (
                <HabitItem key={habit.id} habit={habit} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </>
  );
}
