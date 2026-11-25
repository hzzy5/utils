import * as repo from "../data/habitRepo";
import type { HabitInput } from "../domain/habit";
import { validateHabitInput, type SubmitResult } from "../domain/validation";
import { syncHabits } from "./habitSync";

async function addHabit(input: HabitInput): Promise<SubmitResult> {
  const validated = validateHabitInput(input);
  if (!validated.ok) {
    return { ok: false, error: validated.error };
  }

  const now = new Date();
  await repo.addHabit(validated.value, now);
  await syncHabits(now);
  return { ok: true };
}

async function updateHabit(
  id: string,
  updates: HabitInput,
): Promise<SubmitResult> {
  const validated = validateHabitInput(updates);
  if (!validated.ok) {
    return { ok: false, error: validated.error };
  }

  const now = new Date();
  await repo.updateHabit(id, validated.value, now);
  await syncHabits(now);
  return { ok: true };
}

export const actions = {
  addHabit,
  updateHabit,
  deleteHabit: repo.deleteHabit,
  reorderHabits: repo.reorderHabits,
};
