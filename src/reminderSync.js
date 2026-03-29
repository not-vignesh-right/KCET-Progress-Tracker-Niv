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
      // Main daily reminder
      await reg.periodicSync.register("kcet-daily", {
        minInterval: 12 * 60 * 60 * 1000,
      });
      // Morning reminder (7-11 AM)
      await reg.periodicSync.register("labubu-morning", {
        minInterval: 24 * 60 * 60 * 1000,
      });
      // Evening reminder (4-8 PM)
      await reg.periodicSync.register("labubu-evening", {
        minInterval: 24 * 60 * 60 * 1000,
      });
    } else {
      await reg.periodicSync.unregister("kcet-daily");
      await reg.periodicSync.unregister("labubu-morning");
      await reg.periodicSync.unregister("labubu-evening");
    }
  } catch (e) {
    void e;
  }
}
