import SubHeadline from "@/shared/ui/SubHeadline";

function TodoHead({
  subHeadlineText,
  buttonMode,
  category,
  onPressLeft,
  onPressRight,
}: {
  subHeadlineText?: string;
  buttonMode?: boolean;
  category?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}) {
  return (
    <div className="grid grid-cols-[5rem_1fr_5rem] items-center gap-2 px-4">
      {buttonMode && category !== "done" ? (
        <button
          className="w-full rounded bg-[#d9d9d9] py-2 text-black border-3"
          onClick={onPressLeft}
        >
          Weiter
        </button>
      ) : (
        <span />
      )}
      <SubHeadline
        text={`To-Do's${subHeadlineText ? ` - ${subHeadlineText}` : ""}`}
      />
      {buttonMode && category !== "backlog" ? (
        <button
          className="w-full rounded bg-[#d9d9d9] py-2 text-black border-3"
          onClick={onPressRight}
        >
          Zurück
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

export default TodoHead;
