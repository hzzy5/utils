export const CATEGORIES = [
  { id: "grocerie", label: "Supermarkt" },
  { id: "other", label: "Andere" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function isCategoryId(value: string): value is CategoryId {
  return CATEGORIES.some((category) => category.id === value);
}

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORIES.find((category) => category.id === id)!.label;
}
