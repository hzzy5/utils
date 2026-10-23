import { useState } from "react";
import type { ToDoInput } from "../domain/todo";
import type { SubmitResult, TitleError } from "../domain/validation";
import { MAX_LENGTH } from "../domain/validation";
import { CATEGORIES, isCategoryId } from "../domain/categories";

interface TodoFormProps {
  initialValues: ToDoInput;
  submitLabel: string;
  onSubmit: (values: ToDoInput) => Promise<SubmitResult>;
  onDelete?: () => void;
}

export function ToDoForm({
  initialValues,
  submitLabel,
  onSubmit,
  onDelete,
}: TodoFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [category, setCategory] = useState(initialValues.category);
  const [error, setError] = useState<TitleError | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const result = await onSubmit({ title, description, category });
    result.ok ? setError(null) : setError(result.error);
  }

  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-md px-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border-2 border-black bg-[#d9d9d9] p-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm">
              Titel
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={MAX_LENGTH}
              className="w-full rounded bg-white px-2 py-1 text-base"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm">
              Beschreibung
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded bg-white px-2 py-1 text-base"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-sm">
              Kategorie
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(
                  isCategoryId(e.target.value)
                    ? e.target.value
                    : CATEGORIES[0].id,
                )
              }
              className="w-full rounded bg-white px-2 py-1 text-base"
            >
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          {error && <p>{error}</p>}
          <button
            type="submit"
            className="w-full rounded bg-neutral-800 py-2 text-white disabled:opacity-50"
          >
            {submitLabel}
          </button>
          {onDelete && (
            <button
              type="button"
              className="w-full rounded bg-red-500 py-2 text-white disabled:opacity-50"
              onClick={onDelete}
            >
              Löschen
            </button>
          )}
        </form>
      </div>
    </>
  );
}
