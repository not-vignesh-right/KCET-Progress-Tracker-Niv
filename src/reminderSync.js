export const REMINDER_QUIET_BEFORE = 8;
export const REMINDER_QUIET_FROM = 21;

export function isReminderQuietHour(d = new Date()) {
  const h = d.getHours();
  return h < REMINDER_QUIET_BEFORE || h >= REMINDER_QUIET_FROM;
}

export async function setPeriodicReminder(enabled) {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const reg = await navigator.serviceWorker.ready;
  if (!("periodicSync" in reg)) return;
  try {
    if (enabled) {
      await reg.periodicSync.register("kcet-daily", {
        minInterval: 12 * 60 * 60 * 1000,
      });
    } else {
      await reg.periodicSync.unregister("kcet-daily");
    }
  } catch (e) {
    void e;
  }
}
