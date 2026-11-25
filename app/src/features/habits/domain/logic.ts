import type { Habit, HabitInput, Weekday } from "./habit";
import {
  computeInitialScheduleState,
  findActiveOccurrenceAt,
  findNextOccurrenceAfter,
  formatDateKey,
} from "./schedule";

function normalizeWeekdays(weekdays: Weekday[]): Weekday[] {
  return [...new Set(weekdays)].sort((a, b) => a - b);
}

export function createHabit(
  input: HabitInput,
  position: number,
  now: Date = new Date(),
): Habit {
  const normalizedWeekdays = normalizeWeekdays(input.weekdays);
  const normalizedInterval = Math.max(1, Math.floor(input.intervalDays));
  const { anchorDate, nextScheduledStart } = computeInitialScheduleState(
    {
      mode: input.mode,
      weekdays: normalizedWeekdays,
      intervalDays: normalizedInterval,
      startTime: input.startTime,
      durationHours: input.durationHours,
    },
    now,
  );

  return {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description,
    position,
    mode: input.mode,
    weekdays: normalizedWeekdays,
    intervalDays: normalizedInterval,
    startTime: input.startTime,
    durationHours: input.durationHours,
    anchorDate,
    streak: 0,
    activeOccurrence: undefined,
    nextScheduledStart,
    lastCompletedAt: undefined,
  };
}

export function hasScheduleChanged(habit: Habit, updates: HabitInput): boolean {
  if (habit.mode !== updates.mode) return true;
  if (habit.startTime !== updates.startTime) return true;
  if (habit.durationHours !== updates.durationHours) return true;

  if (updates.mode === "weekly") {
    const prev = normalizeWeekdays(habit.weekdays);
    const next = normalizeWeekdays(updates.weekdays);
    if (prev.length !== next.length) return true;
    return prev.some((day, index) => day !== next[index]);
  }

  if (updates.mode === "custom") {
    return (
      Math.max(1, Math.floor(habit.intervalDays)) !==
      Math.max(1, Math.floor(updates.intervalDays))
    );
  }

  return false;
}

export function updateHabit(
  habit: Habit,
  updates: HabitInput,
  now: Date = new Date(),
): Habit {
  const normalizedWeekdays = normalizeWeekdays(updates.weekdays);
  const normalizedInterval = Math.max(1, Math.floor(updates.intervalDays));
  const scheduleChanged = hasScheduleChanged(habit, updates);

  const baseUpdated: Habit = {
    ...habit,
    title: updates.title,
    description: updates.description,
    mode: updates.mode,
    weekdays: normalizedWeekdays,
    intervalDays: normalizedInterval,
    startTime: updates.startTime,
    durationHours: updates.durationHours,
  };

  if (!scheduleChanged) {
    return baseUpdated;
  }

  const todayKey = formatDateKey(now);
  const nextAnchorDate =
    updates.mode === "custom" ? todayKey : habit.anchorDate;
  const scheduleCandidate: Habit = {
    ...baseUpdated,
    anchorDate: nextAnchorDate,
  };

  // If an occurrence is currently active and unexpired, keep it intact and schedule at/after its deadline
  if (
    habit.activeOccurrence &&
    now.getTime() < habit.activeOccurrence.deadline.getTime()
  ) {
    const next = findNextOccurrenceAfter(
      scheduleCandidate,
      new Date(habit.activeOccurrence.deadline.getTime() - 1),
    );
    return {
      ...scheduleCandidate,
      nextScheduledStart: next.start,
    };
  }

  // Otherwise check whether the new schedule has an active window right now
  const activeNow = findActiveOccurrenceAt(scheduleCandidate, now);
  if (activeNow) {
    return {
      ...scheduleCandidate,
      nextScheduledStart: activeNow.start,
    };
  }

  const initial = computeInitialScheduleState(
    {
      mode: scheduleCandidate.mode,
      weekdays: scheduleCandidate.weekdays,
      intervalDays: scheduleCandidate.intervalDays,
      startTime: scheduleCandidate.startTime,
      durationHours: scheduleCandidate.durationHours,
    },
    now,
  );

  return {
    ...scheduleCandidate,
    anchorDate: initial.anchorDate,
    nextScheduledStart: initial.nextScheduledStart,
  };
}

export function getNextPosition(habits: Habit[]): number {
  return habits.length > 0
    ? Math.max(...habits.map((habit) => habit.position)) + 1
    : 0;
}

export function sortHabitsByPosition(habits: Habit[]): Habit[] {
  return [...habits].sort((a, b) => a.position - b.position);
}
