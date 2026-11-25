import { useNavigate } from "react-router";
import { actions } from "../application/habitActions";
import type { HabitInput, Weekday } from "../domain/habit";
import { HabitForm } from "./HabitForm";
import HabitHead from "./HabitHead";

export function HabitCreate() {
  const navigate = useNavigate();
  const todayWeekday = new Date().getDay() as Weekday;

  async function handleSubmit(values: HabitInput) {
    const result = await actions.addHabit(values);
    if (result.ok) {
      navigate(-1);
    }
    return result;
  }

  return (
    <>
      <HabitHead subHeadlineText="Neu" />
      <HabitForm
        initialValues={{
          title: "",
          description: "",
          mode: "daily",
          weekdays: [todayWeekday],
          intervalDays: 3,
          startTime: "00:00",
          durationHours: 24,
        }}
        submitLabel="Speichern"
        onSubmit={handleSubmit}
      />
    </>
  );
}
