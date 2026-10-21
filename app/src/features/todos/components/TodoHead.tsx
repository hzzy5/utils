import SubHeadline from "@/shared/ui/SubHeadline";

function TodoHead({ subHeadlineText }: { subHeadlineText?: string }) {
  return (
    <SubHeadline
      text={`To-Do's${subHeadlineText ? ` - ${subHeadlineText}` : ""}`}
    />
  );
}

export default TodoHead;
