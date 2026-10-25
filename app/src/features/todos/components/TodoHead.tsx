import SubHeadline from "@/shared/ui/SubHeadline";

function TodoHead({
  subHeadlineText,
  buttonMode,
  category,
}: {
  subHeadlineText?: string;
  buttonMode?: boolean;
  category?: string;
}) {
  return (
    <div className="grid grid-cols-[5rem_1fr_5rem] items-center gap-2">
      {buttonMode && category !== "done" ? <button>Weiter</button> : <span />}
      <SubHeadline
        text={`To-Do's${subHeadlineText ? ` - ${subHeadlineText}` : ""}`}
      />
      {buttonMode && category !== "backlog" ? (
        <button>Zurück</button>
      ) : (
        <span />
      )}
    </div>
  );
}

export default TodoHead;
