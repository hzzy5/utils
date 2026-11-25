import { useEffect, useRef, useState } from "react";
import {
  HABIT_MODES,
  WEEKDAYS,
  isHabitMode,
  isTimeString,
  type HabitInput,
  type HabitMode,
  type TimeString,
  type Weekday,
} from "../domain/habit";
import {
  MAX_DURATION_HOURS,
  MAX_INTERVAL_DAYS,
  MAX_TITLE_LENGTH,
  VALIDATION_ERROR_MESSAGES,
  type HabitValidationError,
  type SubmitResult,
} from "../domain/validation";

interface HabitFormProps {
  initialValues: HabitInput;
  submitLabel: string;
  onSubmit: (values: HabitInput) => Promise<SubmitResult>;
  onDelete?: () => void;
}

export function HabitForm({
  initialValues,
  submitLabel,
  onSubmit,
  onDelete,
}: HabitFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [mode, setMode] = useState<HabitMode>(initialValues.mode);
  const [weekdays, setWeekdays] = useState<Weekday[]>(initialValues.weekdays);
  const [intervalDays, setIntervalDays] = useState(
    String(initialValues.intervalDays),
  );
  const [startTime, setStartTime] = useState<string>(initialValues.startTime);
  const [durationHours, setDurationHours] = useState(
    String(initialValues.durationHours),
  );
  const [error, setError] = useState<HabitValidationError | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = descriptionRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [description]);

  function toggleWeekday(day: Weekday) {
    setWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const parsedInterval = Number(intervalDays);
    const parsedDuration = Number(durationHours);

    const result = await onSubmit({
      title,
      description,
      mode,
      weekdays,
      intervalDays: parsedInterval,
      startTime: (isTimeString(startTime) ? startTime : "") as TimeString,
      durationHours: parsedDuration,
    });

    if (result.ok) {
      setError(null);
    } else {
      setError(result.error);
    }
  }

  const parsedIntervalNum = Number(intervalDays);
  const parsedDurationNum = Number(durationHours);

  return (
    <div className="mx-auto mt-8 mb-10 w-full max-w-md px-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-lg border-2 border-black bg-[#d9d9d9] p-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="habit-title" className="text-sm">
            Name
          </label>
          <input
            id="habit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={MAX_TITLE_LENGTH}
            className="w-full rounded bg-white px-2 py-1 text-base"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="habit-description" className="text-sm">
            Beschreibung (optional)
          </label>
          <textarea
            id="habit-description"
            ref={descriptionRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="min-h-28 w-full resize-none rounded bg-white px-2 py-1 text-base"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="habit-mode" className="text-sm">
            Modus
          </label>
          <select
            id="habit-mode"
            value={mode}
            onChange={(e) =>
              setMode(isHabitMode(e.target.value) ? e.target.value : "daily")
            }
            className="w-full rounded bg-white px-2 py-1 text-base"
          >
            {HABIT_MODES.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {mode === "weekly" && (
          <div className="flex flex-col gap-1">
            <span className="text-sm">Wochentage</span>
            <div className="grid grid-cols-7 gap-1.5">
              {WEEKDAYS.map((day) => {
                const active = weekdays.includes(day.id);
                return (
                  <button
                    key={day.id}
                    type="button"
                    aria-pressed={active}
                    aria-label={day.label}
                    onClick={() => toggleWeekday(day.id)}
                    className={`rounded border py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "border-neutral-800 bg-neutral-800 text-white"
                        : "border-neutral-400 bg-white text-black"
                    }`}
                  >
                    {day.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {mode === "custom" && (
          <div className="flex flex-col gap-1">
            <label htmlFor="habit-interval" className="text-sm">
              Wiederholungsrate
            </label>
            <div className="flex items-center gap-2 rounded bg-white px-2 py-1">
              <span className="text-base text-neutral-700">Alle</span>
              <input
                id="habit-interval"
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_INTERVAL_DAYS}
                step={1}
                value={intervalDays}
                onChange={(e) => setIntervalDays(e.target.value)}
                className="w-16 rounded border border-neutral-300 px-2 py-0.5 text-center text-base"
              />
              <span className="text-base text-neutral-700">
                {parsedIntervalNum === 1 ? "Tag" : "Tage"}
              </span>
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="habit-start-time" className="text-sm">
            Startzeit
          </label>
          <input
            id="habit-start-time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="box-border block w-full min-w-0 max-w-full appearance-none rounded bg-white px-2 py-1 text-base"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="habit-duration" className="text-sm">
            Erledigungszeit
          </label>
          <div className="flex items-center gap-2 rounded bg-white px-2 py-1">
            <input
              id="habit-duration"
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_DURATION_HOURS}
              step={1}
              value={durationHours}
              onChange={(e) => setDurationHours(e.target.value)}
              className="w-20 rounded border border-neutral-300 px-2 py-0.5 text-center text-base"
            />
            <span className="text-base text-neutral-700">
              {parsedDurationNum === 1 ? "Stunde" : "Stunden"}
            </span>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">
            {VALIDATION_ERROR_MESSAGES[error]}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-neutral-800 py-2 text-white disabled:opacity-50"
        >
          {submitLabel}
        </button>

        {onDelete && (
          <button
            type="button"
            className="w-full rounded bg-red-500 py-2 text-white disabled:opacity-50"
            onClick={onDelete}
          >
            Löschen
          </button>
        )}
      </form>
    </div>
  );
}
