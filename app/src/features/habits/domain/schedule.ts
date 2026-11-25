import type {
  Habit,
  HabitOccurrence,
  HabitSchedule,
  TimeString,
  Weekday,
} from "./habit";

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;

export type OccurrenceWindow = Pick<HabitOccurrence, "key" | "start" | "deadline">;

export interface ReconcileResult {
  habit: Habit;
  changed: boolean;
  spawnOccurrence: OccurrenceWindow | null;
}

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey: string): {
  year: number;
  month: number;
  day: number;
} {
  const [yearStr, monthStr, dayStr] = dateKey.split("-");
  return {
    year: Number(yearStr),
    month: Number(monthStr),
    day: Number(dayStr),
  };
}

export function addCalendarDays(dateKey: string, deltaDays: number): string {
  const { year, month, day } = parseDateKey(dateKey);
  const date = new Date(year, month - 1, day + deltaDays, 12, 0, 0, 0);
  return formatDateKey(date);
}

export function daysBetweenDateKeys(fromKey: string, toKey: string): number {
  const from = parseDateKey(fromKey);
  const to = parseDateKey(toKey);
  const fromUtc = Date.UTC(from.year, from.month - 1, from.day);
  const toUtc = Date.UTC(to.year, to.month - 1, to.day);
  return Math.round((toUtc - fromUtc) / MS_PER_DAY);
}

function getWeekdayOfDateKey(dateKey: string): Weekday {
  const { year, month, day } = parseDateKey(dateKey);
  return new Date(year, month - 1, day, 12, 0, 0, 0).getDay() as Weekday;
}

export function buildOccurrenceWindow(
  dateKey: string,
  startTime: TimeString,
  durationHours: number,
): OccurrenceWindow {
  const { year, month, day } = parseDateKey(dateKey);
  const [hourStr, minuteStr] = startTime.split(":");
  const start = new Date(
    year,
    month - 1,
    day,
    Number(hourStr),
    Number(minuteStr),
    0,
    0,
  );
  const deadline = new Date(start.getTime() + durationHours * MS_PER_HOUR);
  return {
    key: `${dateKey}T${startTime}`,
    start,
    deadline,
  };
}

export function isScheduledDate(
  schedule: HabitSchedule,
  dateKey: string,
): boolean {
  switch (schedule.mode) {
    case "daily":
      return true;
    case "weekly":
      return schedule.weekdays.includes(getWeekdayOfDateKey(dateKey));
    case "custom": {
      const interval = Math.max(1, Math.floor(schedule.intervalDays));
      const diff = daysBetweenDateKeys(schedule.anchorDate, dateKey);
      return diff >= 0 && diff % interval === 0;
    }
  }
}

export function findActiveOccurrenceAt(
  schedule: HabitSchedule,
  now: Date,
): OccurrenceWindow | null {
  const todayKey = formatDateKey(now);
  const lookbackDays = Math.ceil(schedule.durationHours / 24) + 1;
  const nowMs = now.getTime();

  for (let offset = 0; offset <= lookbackDays; offset++) {
    const candidateKey =
      offset === 0 ? todayKey : addCalendarDays(todayKey, -offset);
    if (!isScheduledDate(schedule, candidateKey)) continue;

    const window = buildOccurrenceWindow(
      candidateKey,
      schedule.startTime,
      schedule.durationHours,
    );
    if (window.start.getTime() <= nowMs && nowMs < window.deadline.getTime()) {
      return window;
    }
  }

  return null;
}

export function findNextOccurrenceAfter(
  schedule: HabitSchedule,
  after: Date,
): OccurrenceWindow {
  const baseKey = formatDateKey(after);
  const afterMs = after.getTime();

  if (schedule.mode === "daily") {
    const todayWindow = buildOccurrenceWindow(
      baseKey,
      schedule.startTime,
      schedule.durationHours,
    );
    if (todayWindow.start.getTime() > afterMs) {
      return todayWindow;
    }
    return buildOccurrenceWindow(
      addCalendarDays(baseKey, 1),
      schedule.startTime,
      schedule.durationHours,
    );
  }

  if (schedule.mode === "weekly") {
    const validWeekdays =
      schedule.weekdays.length > 0 ? schedule.weekdays : ([1] as Weekday[]);

    for (let offset = 0; offset <= 14; offset++) {
      const candidateKey =
        offset === 0 ? baseKey : addCalendarDays(baseKey, offset);
      if (!validWeekdays.includes(getWeekdayOfDateKey(candidateKey))) continue;

      const window = buildOccurrenceWindow(
        candidateKey,
        schedule.startTime,
        schedule.durationHours,
      );
      if (window.start.getTime() > afterMs) {
        return window;
      }
    }
  }

  // Custom interval (O(1) jump)
  const interval = Math.max(1, Math.floor(schedule.intervalDays));
  const diff = daysBetweenDateKeys(schedule.anchorDate, baseKey);

  let candidateKey: string;
  if (diff < 0) {
    candidateKey = schedule.anchorDate;
  } else {
    const remainder = diff % interval;
    candidateKey =
      remainder === 0
        ? baseKey
        : addCalendarDays(baseKey, interval - remainder);
  }

  const candidateWindow = buildOccurrenceWindow(
    candidateKey,
    schedule.startTime,
    schedule.durationHours,
  );
  if (candidateWindow.start.getTime() > afterMs) {
    return candidateWindow;
  }

  return buildOccurrenceWindow(
    addCalendarDays(candidateKey, interval),
    schedule.startTime,
    schedule.durationHours,
  );
}

export function computeInitialScheduleState(
  schedule: Omit<HabitSchedule, "anchorDate">,
  now: Date,
): { anchorDate: string; nextScheduledStart: Date } {
  const todayKey = formatDateKey(now);
  const fullSchedule: HabitSchedule = { ...schedule, anchorDate: todayKey };

  const active = findActiveOccurrenceAt(fullSchedule, now);
  if (active) {
    return {
      anchorDate: todayKey,
      nextScheduledStart: active.start,
    };
  }

  if (schedule.mode === "custom") {
    const todayWindow = buildOccurrenceWindow(
      todayKey,
      schedule.startTime,
      schedule.durationHours,
    );
    if (todayWindow.start.getTime() > now.getTime()) {
      return {
        anchorDate: todayKey,
        nextScheduledStart: todayWindow.start,
      };
    }
    const tomorrowKey = addCalendarDays(todayKey, 1);
    const tomorrowWindow = buildOccurrenceWindow(
      tomorrowKey,
      schedule.startTime,
      schedule.durationHours,
    );
    return {
      anchorDate: tomorrowKey,
      nextScheduledStart: tomorrowWindow.start,
    };
  }

  const next = findNextOccurrenceAfter(fullSchedule, now);
  return {
    anchorDate: todayKey,
    nextScheduledStart: next.start,
  };
}

export function reconcileHabit(habit: Habit, now: Date): ReconcileResult {
  const nowMs = now.getTime();
  let streak = habit.streak;
  let activeOccurrence = habit.activeOccurrence;
  let nextScheduledStart = habit.nextScheduledStart;
  let changed = false;
  let spawnOccurrence: OccurrenceWindow | null = null;

  // 1. Check whether the currently active occurrence has expired
  if (activeOccurrence && nowMs >= activeOccurrence.deadline.getTime()) {
    if (!activeOccurrence.completed) {
      streak = 0;
    }
    activeOccurrence = undefined;
    changed = true;
  }

  // 2. Process any pending scheduled occurrences up to `now`
  const canAdvanceToNext = !activeOccurrence || activeOccurrence.completed;
  if (canAdvanceToNext && nextScheduledStart.getTime() <= nowMs) {
    const firstDateKey = formatDateKey(nextScheduledStart);
    const firstWindow = buildOccurrenceWindow(
      firstDateKey,
      habit.startTime,
      habit.durationHours,
    );

    if (firstWindow.deadline.getTime() <= nowMs) {
      // At least one occurrence expired while the app was closed -> reset streak
      streak = 0;
      const activeNow = findActiveOccurrenceAt(habit, now);

      if (
        activeNow &&
        activeNow.start.getTime() >= nextScheduledStart.getTime()
      ) {
        spawnOccurrence = activeNow;
        activeOccurrence = { ...activeNow, completed: false };
        nextScheduledStart = findNextOccurrenceAfter(habit, activeNow.start).start;
      } else {
        activeOccurrence = undefined;
        nextScheduledStart = findNextOccurrenceAfter(habit, now).start;
      }
      changed = true;
    } else if (firstWindow.start.getTime() <= nowMs) {
      // The scheduled occurrence is currently active
      spawnOccurrence = firstWindow;
      activeOccurrence = { ...firstWindow, completed: false };
      nextScheduledStart = findNextOccurrenceAfter(habit, firstWindow.start).start;
      changed = true;
    }
  }

  if (!changed) {
    return { habit, changed: false, spawnOccurrence: null };
  }

  return {
    habit: {
      ...habit,
      streak,
      activeOccurrence,
      nextScheduledStart,
    },
    changed: true,
    spawnOccurrence,
  };
}
