export const HABIT_BASE = "/habits";

export const habitPaths = {
  list: HABIT_BASE,
  create: `${HABIT_BASE}/new`,
  detail: (id: string) => `${HABIT_BASE}/${id}`,
};
