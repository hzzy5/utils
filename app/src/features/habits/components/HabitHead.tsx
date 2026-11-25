import SubHeadline from "@/shared/ui/SubHeadline";

export default function HabitHead({
  subHeadlineText,
}: {
  subHeadlineText?: string;
}) {
  return (
    <div className="px-4 pt-2">
      <SubHeadline
        text={`Habitbuilder${subHeadlineText ? ` - ${subHeadlineText}` : ""}`}
      />
    </div>
  );
}
