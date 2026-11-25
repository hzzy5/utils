import { useNavigate, useParams } from "react-router";
import { actions } from "../application/habitActions";
import type { HabitInput } from "../domain/habit";
import { useHabit } from "../hooks/useHabits";
import { HabitForm } from "./HabitForm";
import HabitHead from "./HabitHead";

export function HabitDetail() {
  const { id } = useParams();
  const habit = useHabit(id ?? "");
  const navigate = useNavigate();

  async function handleSubmit(values: HabitInput) {
    const result = await actions.updateHabit(habit!.id, values);
    if (result.ok) {
      navigate(-1);
    }
    return result;
  }

  if (!id || habit === null) {
    return (
      <p className="pt-5 text-center text-gray-400">Habit nicht gefunden</p>
    );
  }
  if (habit === undefined) {
    return <p className="pt-5 text-center text-gray-400">Lädt …</p>;
  }

  return (
    <>
      <HabitHead subHeadlineText="Detail" />
      <HabitForm
        initialValues={{
          title: habit.title,
          description: habit.description,
          mode: habit.mode,
          weekdays: habit.weekdays,
          intervalDays: habit.intervalDays,
          startTime: habit.startTime,
          durationHours: habit.durationHours,
        }}
        submitLabel="Speichern"
        onSubmit={handleSubmit}
        onDelete={async () => {
          await actions.deleteHabit(habit.id);
          navigate(-1);
        }}
      />
    </>
  );
}
