export function ToDoForm({ type }: { type: "create" | "detail" }) {
  return (
    <>
      <form>
        <input></input>
        <input></input>
        <input></input>
      </form>
      {type === "create" && <button>Erstelle ein neues To-Do</button>}
      {type === "detail" && <button>Speichere Änderungen</button>}
      {type === "detail" && <button>Lösche To-Do</button>}
    </>
  );
}
