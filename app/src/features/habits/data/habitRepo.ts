import { db } from "@/shared/db/db";
import type { Habit, HabitInput } from "../domain/habit";
import {
  createHabit,
  getNextPosition,
  sortHabitsByPosition,
  updateHabit as applyUpdate,
} from "../domain/logic";

export async function getAllHabits(): Promise<Habit[]> {
  const habits = await db.habits.toArray();
  return sortHabitsByPosition(habits);
}

export async function getHabit(id: string): Promise<Habit | null> {
  return (await db.habits.get(id)) ?? null;
}

export async function addHabit(
  input: HabitInput,
  now: Date = new Date(),
): Promise<Habit> {
  return db.transaction("rw", db.habits, async () => {
    const existing = await db.habits.toArray();
    const habit = createHabit(input, getNextPosition(existing), now);
    await db.habits.add(habit);
    return habit;
  });
}

export async function updateHabit(
  id: string,
  updates: HabitInput,
  now: Date = new Date(),
): Promise<void> {
  await db.transaction("rw", db.habits, async () => {
    const existing = await db.habits.get(id);
    if (!existing) return;
    await db.habits.put(applyUpdate(existing, updates, now));
  });
}

export async function deleteHabit(id: string): Promise<void> {
  await db.habits.delete(id);
}

export async function reorderHabits(orderedIds: string[]): Promise<void> {
  await db.transaction("rw", db.habits, async () => {
    const allHabits = await db.habits.toArray();
    const habitsById = new Map(allHabits.map((habit) => [habit.id, habit]));

    const requestedOrder = orderedIds.flatMap((id) => {
      const habit = habitsById.get(id);
      if (!habit) return [];

      habitsById.delete(id);
      return [habit];
    });

    const remainingHabits = [...habitsById.values()].sort(
      (a, b) => a.position - b.position,
    );

    const reorderedHabits = [...requestedOrder, ...remainingHabits].map(
      (habit, position) => ({ ...habit, position }),
    );

    await db.habits.bulkPut(reorderedHabits);
  });
}
