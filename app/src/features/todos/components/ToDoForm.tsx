import { useState } from "react";
import type { ToDoInput } from "../domain/todo";
import type { SubmitResult, TitleError } from "../domain/validation";
import { MAX_LENGTH } from "../domain/validation";
import { CATEGORIES, isCategoryId } from "../domain/categories";

interface TodoFormProps {
  initialValues: ToDoInput;
  submitLabel: string;
  onSubmit: (values: ToDoInput) => Promise<SubmitResult>;
}

export function ToDoForm({
  initialValues,
  submitLabel,
  onSubmit,
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titel</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={MAX_LENGTH}
        />
        <label htmlFor="description">Beschreibung</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="category">Kategorie</label>
        <select
          id="category"
          value={category}
          onChange={(e) =>
            setCategory(
              isCategoryId(e.target.value) ? e.target.value : CATEGORIES[0].id,
            )
          }
        >
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        {error && <p>{error}</p>}
        <button type="submit">{submitLabel}</button>
      </form>
    </>
  );
}
