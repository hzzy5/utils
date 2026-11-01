import { ItemForm } from "./ItemForm";
import ShoppingHead from "./ShoppingHead";
import { actions } from "../application/itemActions";
import { isCategoryId, type CategoryId } from "../domain/categories";
import { useNavigate, useSearchParams } from "react-router";
import type { ItemInput } from "../domain/item";

export function ItemCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");
  const initialCategory: CategoryId =
    categoryParam !== null && isCategoryId(categoryParam)
      ? categoryParam
      : "grocerie";

  async function handleSubmit(values: ItemInput) {
    const result = await actions.addItem(values);
    if (result.ok) {
      navigate(-1);
    }
    return result;
  }

  return (
    <>
      <ShoppingHead subHeadlineText="Neues erstellen" />
      <ItemForm
        initialValues={{
          title: "",
          description: "",
          category: initialCategory,
        }}
        submitLabel="Erstellen"
        onSubmit={handleSubmit}
        onDelete={undefined}
      />
    </>
  );
}
