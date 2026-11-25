import { useEffect } from "react";
import { syncHabits } from "../application/habitSync";

const SYNC_INTERVAL_MS = 60_000;

export function useHabitSync() {
  useEffect(() => {
    const runSync = () => {
      void syncHabits();
    };

    runSync();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        runSync();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", runSync);
    const intervalId = window.setInterval(runSync, SYNC_INTERVAL_MS);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", runSync);
      window.clearInterval(intervalId);
    };
  }, []);
}
