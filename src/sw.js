/* global self */
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

/** Only nudge during day — never late night (worker uses device local time). */
const QUIET_BEFORE_HOUR = 8;
const QUIET_FROM_HOUR = 21;

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "kcet-daily") {
    event.waitUntil(showReminderIfAllowed());
  }
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "REMIND_NOW") {
    event.waitUntil(showReminderIfAllowed(event.data.soft));
  }
});

async function showReminderIfAllowed(soft) {
  const h = new Date().getHours();
  if (h < QUIET_BEFORE_HOUR || h >= QUIET_FROM_HOUR) {
    return;
  }
  await self.registration.showNotification("KCET Buddy \u2014 Nivedha", {
    body: soft
      ? "Open your study buddy when you have a calm moment today."
      : "Time to check today\u2019s KCET block — small steps to your doctor dream.",
    icon: "/pwa-192.png",
    badge: "/pwa-192.png",
    tag: "kcet-daily-reminder",
    renotify: true,
    vibrate: [80, 40, 80],
  });
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const url = new URL("/", self.location.origin).href;
      for (const c of list) {
        if (c.url.startsWith(url) && "focus" in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("/");
    })
  );
});
