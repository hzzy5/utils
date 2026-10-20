const max_length = 40;

export function validateTodoTitle(title: string): string | null {
  title.trim();
  if (title.length === 0) {
    return "empty";
  }
  if (title.length > max_length) {
    return `too_long`;
  }
  return null;
}
