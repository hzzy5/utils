import SubHeadline from "@/shared/ui/SubHeadline";

function ShoppingHead({ subHeadlineText }: { subHeadlineText?: string }) {
  return (
    <div className="items-center">
      <SubHeadline
        text={`Einkaufsliste${subHeadlineText ? ` - ${subHeadlineText}` : ""}`}
      />
    </div>
  );
}

export default ShoppingHead;
