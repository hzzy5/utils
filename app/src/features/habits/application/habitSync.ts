import { db } from "@/shared/db/db";
import type { ToDo } from "@/features/todos/domain/todo";
import { getNextPosition as getNextTodoPosition } from "@/features/todos/domain/logic";
import type { Habit } from "../domain/habit";
import { sortHabitsByPosition } from "../domain/logic";
import { reconcileHabit } from "../domain/schedule";

let syncChain: Promise<void> = Promise.resolve();

export function syncHabits(now: Date = new Date()): Promise<void> {
  const run = syncChain.then(() => runHabitSync(now));
  syncChain = run.catch(() => {});
  return run;
}

async function runHabitSync(now: Date): Promise<void> {
  await db.transaction("rw", db.habits, db.todos, async () => {
    const habits = sortHabitsByPosition(await db.habits.toArray());
    if (habits.length === 0) return;

    const tagesplanTodos = await db.todos
      .where("category")
      .equals("tagesplan")
      .toArray();
    let nextTodoPos = getNextTodoPosition(tagesplanTodos, "tagesplan");

    const habitsToPut: Habit[] = [];
    const todosToAdd: ToDo[] = [];

    for (const habit of habits) {
      const result = reconcileHabit(habit, now);
      if (!result.changed) continue;

      let updatedHabit = result.habit;

      if (result.spawnOccurrence && updatedHabit.activeOccurrence) {
        const existingHabitTodos = await db.todos
          .where("habitId")
          .equals(habit.id)
          .toArray();
        const existingForKey = existingHabitTodos.find(
          (todo) => todo.occurenceDate === result.spawnOccurrence!.key,
        );

        if (existingForKey) {
          updatedHabit = {
            ...updatedHabit,
            activeOccurrence: {
              ...updatedHabit.activeOccurrence,
              todoId: existingForKey.id,
            },
          };
        } else {
          const newTodo: ToDo = {
            id: crypto.randomUUID(),
            title: habit.title,
            description: habit.description,
            category: "tagesplan",
            position: nextTodoPos++,
            selected: false,
            deadline: result.spawnOccurrence.deadline,
            habitId: habit.id,
            occurenceDate: result.spawnOccurrence.key,
          };
          todosToAdd.push(newTodo);
          updatedHabit = {
            ...updatedHabit,
            activeOccurrence: {
              ...updatedHabit.activeOccurrence,
              todoId: newTodo.id,
            },
          };
        }
      }

      habitsToPut.push(updatedHabit);
    }

    if (todosToAdd.length > 0) {
      await db.todos.bulkAdd(todosToAdd);
    }
    if (habitsToPut.length > 0) {
      await db.habits.bulkPut(habitsToPut);
    }
  });
}

export async function applyHabitCompletionForTodo(
  todo: ToDo,
  now: Date = new Date(),
): Promise<void> {
  if (!todo.habitId || !todo.occurenceDate) return;

  const habit = await db.habits.get(todo.habitId);
  if (!habit?.activeOccurrence) return;
  if (habit.activeOccurrence.key !== todo.occurenceDate) return;
  if (now.getTime() > habit.activeOccurrence.deadline.getTime()) return;
  if (habit.activeOccurrence.completed) return;

  await db.habits.put({
    ...habit,
    streak: habit.streak + 1,
    lastCompletedAt: now,
    activeOccurrence: {
      ...habit.activeOccurrence,
      completed: true,
    },
  });
}

export async function applyHabitUncompletionForTodo(
  todo: ToDo,
  now: Date = new Date(),
): Promise<void> {
  if (!todo.habitId || !todo.occurenceDate) return;

  const habit = await db.habits.get(todo.habitId);
  if (!habit?.activeOccurrence) return;
  if (habit.activeOccurrence.key !== todo.occurenceDate) return;
  if (now.getTime() > habit.activeOccurrence.deadline.getTime()) return;
  if (!habit.activeOccurrence.completed) return;

  await db.habits.put({
    ...habit,
    streak: Math.max(0, habit.streak - 1),
    activeOccurrence: {
      ...habit.activeOccurrence,
      completed: false,
    },
  });
}
