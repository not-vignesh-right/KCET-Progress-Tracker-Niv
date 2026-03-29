# KCET-Progress-Tracker-Niv

Personal KCET 2026 study companion (Vite + React + PWAProgressive Web App). Track daily sessions, catch-ups, streaks, and chapter confidence.

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com), import the repository.
3. Use defaults: **Framework Preset: Vite**, **Build Command:** `npm run build`, **Output Directory:** `dist`.

`vercel.json` is included for SPA routing.

## Install on her phone (PWA)

1. Open the **deployed HTTPS** site in **Chrome** (Android) or **Safari** (iPhone).
2. **Android:** use the install prompt or menu **Install app** / **Add to Home screen**.  
   **iPhone:** **Share** then **Add to Home Screen**.
3. In the app, use **PHONE APP & REMINDERS** and enable **gentle day-time reminders** (only **8:00–21:00** local time; not at night).
4. Grant **notifications** when the browser asks. Background reminders work best on **Android Chrome**; iOS is more limited.

Output includes `manifest.webmanifest`, `sw.js`, and icons under `public/`.

## Install on phone (PWA)

- Deploy must use **HTTPS** (Vercel does).
- Android Chrome: Install app / Add to Home screen. iPhone: Share → Add to Home Screen.
- In-app: **PHONE APP & REMINDERS** — day-time notifications only **8am–9pm** local time.
