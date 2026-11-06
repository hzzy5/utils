export function formatDeadline(deadline: Date, now: Date): string {
  let result = "Deadline";
  const deadlineMilli = deadline.getTime();
  const nowMilli = now.getTime();

  const overdue = deadline < now;
  if (overdue) {
    result += " vor";
  } else {
    result += " in";
  }

  const difference = deadlineMilli - nowMilli;
  const days = Math.abs(difference) >= 24 * 60 * 60 * 1000;
  const mins = Math.abs(difference) >= 60 * 1000;
  const dayDiff = Math.floor(Math.abs(difference) / (24 * 60 * 60 * 1000));
  const hourDiff = Math.floor(Math.abs(difference) / (60 * 60 * 1000));
  const minDiff = Math.floor(Math.abs(difference) / (60 * 1000));
  const dayWord = dayDiff === 1 ? "Tag" : "Tagen";
  const hourWord = hourDiff === 1 ? "Stunde" : "Stunden";
  const minWord = minDiff === 1 ? "Minute" : "Minuten";

  if (days) {
    result += ` ${dayDiff} ${dayWord}`;
  } else if (mins) {
    result += ` ${minDiff} ${minWord}`;
  } else {
    result += ` ${hourDiff} ${hourWord} & ${minDiff} ${minWord}`;
  }
  return result;
}
