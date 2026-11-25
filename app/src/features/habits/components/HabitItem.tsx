import { Link } from "react-router";
import { GripVerticalIcon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Habit } from "../domain/habit";
import { habitPaths } from "../routes";

export default function HabitItem({ habit }: { habit: Habit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: habit.id });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="grid grid-cols-[3.5rem_1fr_2.75rem] items-center border-4 border-black bg-[#d9d9d9] py-1 text-center text-xl font-light text-black font-[Abel]"
    >
      <span
        className="px-1 text-center tabular-nums"
        title={`Aktueller Streak: ${habit.streak}`}
      >
        {habit.streak}
      </span>
      <Link
        to={habitPaths.detail(habit.id)}
        className="wrap-break-word px-2 text-black"
      >
        {habit.title}
      </Link>
      <button
        ref={setActivatorNodeRef}
        type="button"
        aria-label="Habit verschieben"
        {...attributes}
        {...listeners}
        className="flex items-center justify-center touch-none"
      >
        <GripVerticalIcon className="h-5 w-5 text-black" />
      </button>
    </li>
  );
}
