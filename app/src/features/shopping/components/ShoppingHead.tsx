import SubHeadline from "@/shared/ui/SubHeadline";
import { deleteSelected } from "../data/itemRepo";
import type { CategoryId } from "../domain/categories";

function ShoppingHead({
  subHeadlineText,
  category,
}: {
  subHeadlineText?: string;
  category: CategoryId;
}) {
  return (
    <div className="grid grid-cols-[5rem_1fr_5rem] items-center gap-2 px-4">
      <button
        className="w-full rounded bg-[#d9d9d9] py-2 text-black border-3"
        onClick={() => deleteSelected(category)}
      >
        Löschen
      </button>
      <SubHeadline
        text={`Einkaufsliste${subHeadlineText ? ` - ${subHeadlineText}` : ""}`}
      />
      <span />
    </div>
  );
}

export default ShoppingHead;
