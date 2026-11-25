import { isTimeString, type HabitInput } from "./habit";

export const MAX_TITLE_LENGTH = 40;
export const MAX_INTERVAL_DAYS = 365;
export const MAX_DURATION_HOURS = 168;

export type HabitValidationError =
  | "title_empty"
  | "title_too_long"
  | "weekdays_empty"
  | "interval_invalid"
  | "start_time_invalid"
  | "duration_invalid";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: HabitValidationError };

export const VALIDATION_ERROR_MESSAGES: Record<HabitValidationError, string> = {
  title_empty: "Bitte gib einen Namen ein.",
  title_too_long: `Der Name darf maximal ${MAX_TITLE_LENGTH} Zeichen lang sein.`,
  weekdays_empty: "Bitte wähle mindestens einen Wochentag aus.",
  interval_invalid: `Die Wiederholungsrate muss zwischen 1 und ${MAX_INTERVAL_DAYS} Tagen liegen.`,
  start_time_invalid: "Bitte gib eine gültige Startzeit ein.",
  duration_invalid: `Die Erledigungszeit muss zwischen 1 und ${MAX_DURATION_HOURS} Stunden liegen.`,
};

export function validateHabitInput(
  input: HabitInput,
): { ok: true; value: HabitInput } | { ok: false; error: HabitValidationError } {
  const title = input.title.trim();
  if (title.length === 0) {
    return { ok: false, error: "title_empty" };
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return { ok: false, error: "title_too_long" };
  }
  if (input.mode === "weekly" && input.weekdays.length === 0) {
    return { ok: false, error: "weekdays_empty" };
  }
  if (
    input.mode === "custom" &&
    (!Number.isInteger(input.intervalDays) ||
      input.intervalDays < 1 ||
      input.intervalDays > MAX_INTERVAL_DAYS)
  ) {
    return { ok: false, error: "interval_invalid" };
  }
  if (!isTimeString(input.startTime)) {
    return { ok: false, error: "start_time_invalid" };
  }
  if (
    !Number.isFinite(input.durationHours) ||
    input.durationHours <= 0 ||
    input.durationHours > MAX_DURATION_HOURS
  ) {
    return { ok: false, error: "duration_invalid" };
  }

  return {
    ok: true,
    value: {
      ...input,
      title,
      description: input.description.trim(),
    },
  };
}
