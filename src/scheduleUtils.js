import { ALL_SESSIONS } from "./data.js";

const LAST_DAY_INDEX = 15;

/** Pending catch-up = not done/mastered and not re-skipped. */
export function isPendingCatchUp(c, status, isSessionComplete) {
  return !isSessionComplete(status[c.id]) && status[c.id] !== "skipped";
}

/**
 * Place skipped work on the **least loaded** future day (spreads backlog across Apr 1–13).
 * Falls back to tomorrow if tied.
 */
export function pickCatchUpDay(todayIdx, catchUps, status, isSessionComplete) {
  const load = {};
  for (let d = 0; d <= LAST_DAY_INDEX; d++) {
    load[d] = ALL_SESSIONS.filter((s) => s.day === d).length;
  }
  catchUps.forEach((c) => {
    if (c.catchUpDay == null) return;
    if (!isPendingCatchUp(c, status, isSessionComplete)) return;
    const d = c.catchUpDay;
    load[d] = (load[d] || 0) + 1;
  });

  const start = Math.min(Math.max(todayIdx + 1, 0), LAST_DAY_INDEX);
  let bestDay = start;
  let minLoad = Infinity;
  for (let d = start; d <= LAST_DAY_INDEX; d++) {
    const L = load[d] ?? 0;
    if (L < minLoad) {
      minLoad = L;
      bestDay = d;
    }
  }
  return bestDay;
}
