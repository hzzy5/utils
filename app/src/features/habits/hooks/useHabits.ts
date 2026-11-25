import { useLiveQuery } from "dexie-react-hooks";
import { getAllHabits, getHabit } from "../data/habitRepo";

export function useHabits() {
  return useLiveQuery(() => getAllHabits(), []);
}

export function useHabit(id: string) {
  return useLiveQuery(() => getHabit(id), [id]);
}
