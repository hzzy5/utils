export const MAX_LENGTH = 40;
export type TitleError = "empty" | "too_long";
export type SubmitResult = { ok: true } | { ok: false; error: TitleError };

export function validateTodoTitle(
  title: string,
): { ok: true; value: string } | { ok: false; error: TitleError } {
  const value = title.trim();
  if (value.length === 0) {
    return { ok: false, error: "empty" };
  }
  if (value.length > MAX_LENGTH) {
    return { ok: false, error: "too_long" };
  }
  return { ok: true, value };
}
