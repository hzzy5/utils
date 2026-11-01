import { useNavigate, useParams } from "react-router";
import { ItemForm } from "./ItemForm";
import ShoppingHead from "./ShoppingHead";
import { useItem } from "../hooks/useItems";
import { actions } from "../application/itemActions";
import type { ItemInput } from "../domain/item";

export function ItemDetail() {
  const { id } = useParams();
  const item = useItem(id ?? "");
  const navigate = useNavigate();

  async function handleSubmit(values: ItemInput) {
    const result = await actions.updateItem(item!, values);
    if (result.ok) {
      navigate(-1);
    }
    return result;
  }

  if (!id || item === null) {
    return <p>Item nicht gefunden</p>;
  }
  if (item === undefined) {
    return <p>Lädt …</p>;
  }

  return (
    <>
      <ShoppingHead subHeadlineText="Detail" />
      <ItemForm
        initialValues={{
          title: item.title,
          description: item.description,
          category: item.category,
        }}
        submitLabel="Speichern"
        onSubmit={handleSubmit}
        onDelete={() => {
          actions.deleteItem(item!.id);
          navigate(-1);
        }}
      />
    </>
  );
}
