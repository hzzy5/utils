import { useState } from "react";

export function ToDoForm({ type }: { type: "create" | "detail" }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kategorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </form>
    </>
  );
}
