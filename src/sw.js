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
  if (event.tag === "labubu-morning") {
    event.waitUntil(showMorningReminder());
  }
  if (event.tag === "labubu-evening") {
    event.waitUntil(showEveningReminder());
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
  
  const messages = [
    "🌸 Time for today's KCET session!",
    "📚 Your KCET assistant is ready to study with you!",
    "💕 Small steps to your doctor dream!",
    "🌙 Hey! Let's tackle today's study block together!",
    "⭐ Your assistant is cheering for you! You've got this!",
    "🦴 Time to make progress with your KCET prep!",
    "💖 Your study companion is waiting for you!",
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  await self.registration.showNotification("KCET Assistant", {
    body: soft
      ? "🌸 Your assistant is thinking of you! Open when you have a calm moment today."
      : randomMessage,
    icon: "/labubu-icon.svg",
    badge: "/pwa-192.png",
    tag: "kcet-daily-reminder",
    renotify: true,
    vibrate: [80, 40, 80, 40, 80],
    requireInteraction: false,
    silent: false,
  });
}

async function showMorningReminder() {
  const h = new Date().getHours();
  if (h < 7 || h >= 11) return;
  
  await self.registration.showNotification("🌅 Good Morning from KCET Assistant!", {
    body: "Rise and shine! Your KCET assistant is excited to study with you today! Let's make it count!",
    icon: "/labubu-icon.svg",
    badge: "/pwa-192.png",
    tag: "kcet-morning-reminder",
    renotify: true,
    vibrate: [100, 50, 100],
    requireInteraction: false,
  });
}

async function showEveningReminder() {
  const h = new Date().getHours();
  if (h < 16 || h >= 20) return;
  
  await self.registration.showNotification("🌙 Evening Check-in from KCET Assistant", {
    body: "How was your study day? Your assistant is proud of your effort! Let's finish strong!",
    icon: "/labubu-icon.svg",
    badge: "/pwa-192.png",
    tag: "kcet-evening-reminder",
    renotify: true,
    vibrate: [80, 40, 80],
    requireInteraction: false,
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
