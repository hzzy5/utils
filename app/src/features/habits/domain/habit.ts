type Hour0To23 =
  | "00"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23";

type Minute0To59 =
  | "00"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "48"
  | "49"
  | "50"
  | "51"
  | "52"
  | "53"
  | "54"
  | "55"
  | "56"
  | "57"
  | "58"
  | "59";

export type TimeString = `${Hour0To23}:${Minute0To59}`;

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type HabitMode = "daily" | "weekly" | "custom";

export const HABIT_MODES = [
  { id: "daily", label: "Täglich" },
  { id: "weekly", label: "Wöchentlich" },
  { id: "custom", label: "Benutzerdefiniert" },
] as const;

export const WEEKDAYS: ReadonlyArray<{
  id: Weekday;
  shortLabel: string;
  label: string;
}> = [
  { id: 1, shortLabel: "Mo", label: "Montag" },
  { id: 2, shortLabel: "Di", label: "Dienstag" },
  { id: 3, shortLabel: "Mi", label: "Mittwoch" },
  { id: 4, shortLabel: "Do", label: "Donnerstag" },
  { id: 5, shortLabel: "Fr", label: "Freitag" },
  { id: 6, shortLabel: "Sa", label: "Samstag" },
  { id: 0, shortLabel: "So", label: "Sonntag" },
];

export function isHabitMode(value: string): value is HabitMode {
  return HABIT_MODES.some((mode) => mode.id === value);
}

export function isTimeString(value: string): value is TimeString {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export interface HabitOccurrence {
  key: string;
  start: Date;
  deadline: Date;
  completed: boolean;
  todoId?: string;
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  position: number;
  mode: HabitMode;
  weekdays: Weekday[];
  intervalDays: number;
  startTime: TimeString;
  durationHours: number;
  anchorDate: string;
  streak: number;
  activeOccurrence?: HabitOccurrence;
  nextScheduledStart: Date;
  lastCompletedAt?: Date;
}

export type HabitSchedule = Pick<
  Habit,
  "mode" | "weekdays" | "intervalDays" | "startTime" | "durationHours" | "anchorDate"
>;

export type HabitInput = Pick<
  Habit,
  | "title"
  | "description"
  | "mode"
  | "weekdays"
  | "intervalDays"
  | "startTime"
  | "durationHours"
>;
