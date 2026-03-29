import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { BUDDY_LINES, USER } from "./config.js";
import {
  ALL_SESSIONS,
  CHAPTER_CHECKLIST,
  DAYS,
  QUOTES,
  S,
  TOTAL_PLAN_DAYS,
  getDayIndex,
  getDaysToExam,
} from "./data.js";
import { pickCatchUpDay } from "./scheduleUtils.js";
import { T } from "./theme.js";

const STORAGE_KEY = "kcet_coach_v3";

function loadStored() {
  if (typeof window === "undefined") return null;
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem("kcet_coach_v2");
      if (raw) {
        localStorage.setItem(STORAGE_KEY, raw);
        localStorage.removeItem("kcet_coach_v2");
      }
    }
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isSessionComplete(st) {
  return st === "done" || st === "mastered";
}

function StudyBuddy() {
  const gid = useId();
  const furId = `buddy-fur-${gid}`;
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" aria-hidden="true" style={{ flexShrink: 0, filter: "drop-shadow(0 2px 8px rgba(232,93,117,0.2))" }}>
      <defs>
        <linearGradient id={furId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD6E0" />
          <stop offset="100%" stopColor="#F5A8B8" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="38" rx="24" ry="22" fill={`url(#${furId})`} />
      <ellipse cx="14" cy="24" rx="11" ry="13" fill={`url(#${furId})`} />
      <ellipse cx="50" cy="22" rx="9" ry="14" fill={`url(#${furId})`} />
      <ellipse cx="25" cy="36" rx="5" ry="6" fill="#3D2E35" />
      <ellipse cx="39" cy="36" rx="5" ry="6" fill="#3D2E35" />
      <ellipse cx="26" cy="37" rx="1.8" ry="2.2" fill="#fff" />
      <ellipse cx="40" cy="37" rx="1.8" ry="2.2" fill="#fff" />
      <ellipse cx="32" cy="46" rx="4" ry="2.5" fill="#E85D75" opacity="0.35" />
      <path d="M28 50 Q32 53 36 50" stroke="#C44A62" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  const todayIdx = getDayIndex();
  const daysToExam = getDaysToExam();
  const hour = new Date().getHours();

  const initial = loadStored() || {};

  const [status, setStatus] = useState(() => initial.status || {});
  const [catchUps, setCatchUps] = useState(() => initial.catchUps || []);
  const [streak, setStreak] = useState(() => initial.streak ?? 0);
  const [lastDay, setLastDay] = useState(() => (initial.lastDay !== undefined ? initial.lastDay : null));
  const [chapterDone, setChapterDone] = useState(() => initial.chapterDone || {});
  const [view, setView] = useState("today");
  const [expanded, setExpanded] = useState(null);
  const [flash, setFlash] = useState(null);
  const [phoneBanner, setPhoneBanner] = useState(initial.phoneBanner !== false);
  const [copyHint, setCopyHint] = useState(null);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  const persist = useCallback(() => {
    const payload = {
      status,
      catchUps,
      streak,
      lastDay,
      chapterDone,
      phoneBanner,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota */
    }
  }, [status, catchUps, streak, lastDay, chapterDone, phoneBanner]);

  useEffect(() => {
    persist();
  }, [persist]);

  const markDone = useCallback(
    (s) => {
      setStatus((prev) => ({ ...prev, [s.id]: "done" }));
      setLastDay((ld) => {
        if (ld === todayIdx) return ld;
        setStreak((prev) => (ld === todayIdx - 1 ? prev + 1 : 1));
        return todayIdx;
      });
      setFlash(s.id);
      setTimeout(() => setFlash(null), 1200);
    },
    [todayIdx]
  );

  const markMastered = useCallback((s) => {
    setStatus((prev) => ({ ...prev, [s.id]: "mastered" }));
    setFlash(s.id);
    setTimeout(() => setFlash(null), 800);
  }, []);

  const markSkipped = useCallback(
    (s) => {
      setStatus((prev) => ({ ...prev, [s.id]: "skipped" }));
      setCatchUps((prev) => {
        const nextStatus = { ...status, [s.id]: "skipped" };
        const day = pickCatchUpDay(todayIdx, prev, nextStatus, isSessionComplete);
        const queueId = `cu-${s.id}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        return [...prev, { ...s, catchUpDay: day, queueId }];
      });
    },
    [todayIdx, status]
  );

  const toggleChapter = useCallback((id) => {
    setChapterDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const doneCount = useMemo(
    () => Object.values(status).filter((v) => isSessionComplete(v)).length,
    [status]
  );

  const chapterCheckedCount = useMemo(
    () => CHAPTER_CHECKLIST.filter((c) => chapterDone[c.id]).length,
    [chapterDone]
  );

  const pendingCU = useMemo(
    () =>
      catchUps.filter(
        (c) => !isSessionComplete(status[c.id]) && status[c.id] !== "skipped"
      ),
    [catchUps, status]
  );

  const pct = Math.round((doneCount / (ALL_SESSIONS.length + catchUps.length)) * 100) || 0;

  const todaySess = ALL_SESSIONS.filter((s) => s.day === todayIdx);
  const todayCU = pendingCU.filter((c) => c.catchUpDay === todayIdx);
  const todayAll = [...todaySess, ...todayCU];
  const todayDone = todayAll.filter((s) => isSessionComplete(status[s.id])).length;

  const subStats = useMemo(() => {
    return Object.keys(S).reduce((acc, sub) => {
      const mine = ALL_SESSIONS.filter((s) => s.sub === sub);
      acc[sub] = {
        total: mine.length,
        done: mine.filter((s) => isSessionComplete(status[s.id])).length,
      };
      return acc;
    }, {});
  }, [status]);

  const coachMsg = useCallback(() => {
    if (daysToExam <= 1)
      return { txt: "🎯 KCET 2026 exam day. Trust your prep. Notes only. Sleep by 10 PM.", clr: T.rose };
    if (daysToExam <= 3)
      return {
        txt: "🔥 Final 3 days! No new topics — revision, past papers, and 8 hrs sleep only.",
        clr: "#ffb86b",
      };
    if (chapterCheckedCount >= 8 && doneCount < 20)
      return {
        txt: `✨ ${USER.name}, you marked ${chapterCheckedCount} chapters as strong — lean into what’s still shaky.`,
        clr: T.lilac,
      };
    if (pendingCU.length > 4)
      return {
        txt: `😤 ${pendingCU.length} catch-up sessions pending. Stop everything. Do ONE right now.`,
        clr: "#fb7185",
      };
    if (Object.values(status).filter((v) => v === "skipped").length > 6)
      return {
        txt: "⚠️ Too many skips. Block 1 hour NOW and clear at least 2 catch-up sessions.",
        clr: "#fbbf24",
      };
    if (hour < 7)
      return { txt: "🌅 Early morning hits different. Do this before the world wakes up.", clr: "#5ee9b5" };
    if (hour < 12)
      return {
        txt:
          pct > 40
            ? "💪 Great start! Morning brain is peak — hit the hardest topic first."
            : "☀️ Morning session time. Start strong — everything else can wait.",
        clr: "#7cb9ff",
      };
    if (hour < 17)
      return {
        txt: "⚡ Afternoon grind. Don't nap. Start one session — the slump disappears instantly.",
        clr: "#ffb86b",
      };
    if (hour < 21)
      return {
        txt: "🌙 Evening mode. Revision + questions now. No heavy new topics after 9 PM.",
        clr: T.lilac,
      };
    return { txt: "😴 After 9 PM — review notes only. Close session, sleep by 11.", clr: T.muted };
  }, [daysToExam, chapterCheckedCount, doneCount, pendingCU.length, status, hour, pct, USER.name]);

  const coach = coachMsg();
  const buddyExtra =
    daysToExam > 3 && pendingCU.length < 4 ? BUDDY_LINES[todayIdx % BUDDY_LINES.length] : null;

  const shareText = useCallback(() => {
    const lines = [
      `KCET 2026 Coach — Hi ${USER.name}`,
      `${DAYS[todayIdx]} · Day ${todayIdx + 1}/${TOTAL_PLAN_DAYS}`,
      `Days to KCET 2026 exam: ${daysToExam}`,
      "",
      `Sessions done (studied + already knew): ${doneCount} / ${ALL_SESSIONS.length}`,
      `Today's block: ${todayDone} / ${todayAll.length} complete`,
      `Streak: ${streak} day(s)`,
      `Catch-ups waiting: ${pendingCU.length}`,
      `Overall plan: ${pct}%`,
      "",
      `Chapters marked "already strong": ${chapterCheckedCount} / ${CHAPTER_CHECKLIST.length}`,
      "",
      "By subject (sessions):",
      ...Object.keys(S).map(
        (sub) => `  ${S[sub].label}: ${subStats[sub].done}/${subStats[sub].total}`
      ),
      "",
      `— ${USER.name}'s companion · KCET 2026`,
    ];
    return lines.join("\n");
  }, [
    todayIdx,
    daysToExam,
    doneCount,
    todayDone,
    todayAll.length,
    streak,
    pendingCU.length,
    pct,
    chapterCheckedCount,
    subStats,
  ]);

  const copyProgress = useCallback(async () => {
    const text = shareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopyHint("Copied summary to clipboard.");
    } catch {
      setCopyHint("Copy failed — select text manually.");
    }
    setTimeout(() => setCopyHint(null), 2500);
  }, [shareText]);

  const exportBackup = useCallback(() => {
    const payload = {
      exportedAt: new Date().toISOString(),
      user: USER.name,
      status,
      catchUps,
      streak,
      lastDay,
      chapterDone,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `kcet-${USER.name.toLowerCase()}-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [status, catchUps, streak, lastDay, chapterDone]);

  return (
    <div
      style={{
        background: T.bgGradient,
        minHeight: "100vh",
        fontFamily: "'Nunito',sans-serif",
        color: T.text,
        paddingBottom: 88,
        maxWidth: 480,
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {phoneBanner && (
        <div
          style={{
            background: `linear-gradient(90deg, ${T.roseLight}, ${T.lilac})`,
            padding: "10px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
            Hi {USER.name} — plan seen? Books open, phone face-down.
          </span>
          <button
            type="button"
            onClick={() => setPhoneBanner(false)}
            style={{
              background: "rgba(255,255,255,0.35)",
              border: "none",
              color: "#fff",
              borderRadius: 10,
              padding: "4px 12px",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            OK
          </button>
        </div>
      )}

      <div
        style={{
          background: T.surface,
          margin: "0 12px",
          marginTop: 12,
          padding: "16px 14px 14px",
          borderRadius: T.radiusLg,
          border: `1px solid ${T.border}`,
          boxShadow: T.shadowSm,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 0 }}>
            <StudyBuddy />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'Fredoka',sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.rose,
                  letterSpacing: 0.2,
                }}
              >
                Hi {USER.name} 💕
              </div>
              <div
                style={{
                  fontFamily: "'Fredoka',sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: T.cream,
                  letterSpacing: -0.3,
                  marginTop: 2,
                }}
              >
                KCET 2026 buddy
              </div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 4, lineHeight: 1.35 }}>
                {DAYS[todayIdx]} · Day {todayIdx + 1}/{TOTAL_PLAN_DAYS}
                <br />
                <span style={{ fontSize: 11 }}>{USER.dreamLine}</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                fontFamily: "'Fredoka',sans-serif",
                color: daysToExam <= 5 ? T.rose : T.roseText,
                lineHeight: 1,
              }}
            >
              {daysToExam}
            </div>
            <div style={{ fontSize: 10, color: T.muted, fontWeight: 700 }}>to KCET</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {[
            ["✓", doneCount, "Done", T.mint],
            ["🔥", streak, "Streak", T.roseLight],
            ["⏭", pendingCU.length, "Catch-up", "#E8A598"],
            ["◎", `${pct}%`, "Plan", T.lilac],
          ].map(([ic, val, lbl, clr]) => (
            <div
              key={lbl}
              style={{
                flex: 1,
                background: T.cardBlush,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "8px 4px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: clr }}>
                {ic} {val}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: T.faint,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                }}
              >
                {lbl}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 12,
            background: T.cardBlush,
            borderRadius: 999,
            height: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${T.roseLight}, ${T.lilac})`,
              borderRadius: 999,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      <div
        style={{
          margin: "12px 12px 4px",
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: T.radiusLg,
          padding: "14px 16px",
          boxShadow: T.shadowSm,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: T.faint,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Today with you
        </div>
        <div style={{ fontSize: 14, color: T.cream, lineHeight: 1.55, fontWeight: 700 }}>{coach.txt}</div>
        {buddyExtra && (
          <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.5, marginTop: 10, fontWeight: 600 }}>
            {buddyExtra}
          </div>
        )}
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: T.faint,
            fontStyle: "italic",
            borderTop: `1px solid ${T.border}`,
            paddingTop: 10,
            lineHeight: 1.45,
          }}
        >
          “{QUOTES[todayIdx % QUOTES.length]}”
        </div>
      </div>

      {copyHint && (
        <div
          style={{
            margin: "0 12px 8px",
            fontSize: 12,
            fontWeight: 700,
            color: T.mint,
            textAlign: "center",
          }}
        >
          {copyHint}
        </div>
      )}

      <div style={{ display: "flex", padding: "10px 12px 6px", gap: 8 }}>
        {[
          ["today", "📅 Today"],
          ["schedule", "🗓 Plan"],
          ["progress", "📊 Progress"],
        ].map(([v, l]) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            style={{
              flex: 1,
              padding: "11px 0",
              borderRadius: T.radiusMd,
              border: `1px solid ${view === v ? T.roseLight : T.border}`,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 800,
              transition: "all 0.15s",
              background: view === v ? T.roseDim : T.surface,
              color: view === v ? T.roseText : T.muted,
              boxShadow: view === v ? T.shadowSm : "none",
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {view === "today" && (
        <div style={{ padding: "4px 12px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0 4px" }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: T.faint,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Today&apos;s sessions
            </span>
            <span
              style={{
                fontSize: 12,
                color:
                  todayDone === todayAll.length && todayAll.length > 0 ? T.mint : T.muted,
                fontWeight: 700,
              }}
            >
              {todayDone}/{todayAll.length} done
            </span>
          </div>
          {todaySess.map((s) => (
            <Card
              key={s.id}
              s={s}
              st={status[s.id]}
              onDone={markDone}
              onSkip={markSkipped}
              onMastered={markMastered}
              flash={flash === s.id}
            />
          ))}
          {todayCU.length > 0 && (
            <>
              <div
                style={{
                  margin: "10px 0 6px",
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.28)",
                  borderRadius: 12,
                  padding: "8px 12px",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fbbf24" }}>
                  ⏭ {todayCU.length} catch-up session{todayCU.length > 1 ? "s" : ""} — tackle these today!
                </div>
              </div>
              {todayCU.map((s, i) => (
                <Card
                  key={s.queueId ?? s.id + "cu" + i}
                  s={s}
                  st={status[s.id]}
                  onDone={markDone}
                  onSkip={markSkipped}
                  onMastered={markMastered}
                  catchUp
                  flash={flash === s.id}
                />
              ))}
            </>
          )}
          {todayAll.length > 0 && todayDone === todayAll.length && (
            <div
              style={{
                margin: "12px 0",
                background: T.mintDim,
                border: `1px solid ${T.mint}44`,
                borderRadius: T.radiusLg,
                padding: "14px 14px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 22 }}>🎉</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: T.mint, marginTop: 4 }}>
                Day {todayIdx + 1} complete, {USER.name}!
              </div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>
                Streak: {streak} day{streak !== 1 ? "s" : ""}. Rest well — tomorrow is a new block.
              </div>
            </div>
          )}
          {todayIdx === 15 && (
            <div
              style={{
                margin: "12px 0",
                background: "rgba(232,121,249,0.08)",
                border: "1px solid rgba(232,121,249,0.35)",
                borderRadius: 14,
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: "#e78dfb" }}>🎉 Last coverage day!</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>
                Apr 14–16, 2026: subject papers → Apr 17–22: full mocks → Apr 23: KCET 2026 exam day.
              </div>
            </div>
          )}
          <div style={{ height: 16 }} />
        </div>
      )}

      {view === "schedule" && (
        <div style={{ padding: "4px 12px 0" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: T.faint,
              textTransform: "uppercase",
              letterSpacing: 1,
              padding: "8px 0 6px",
            }}
          >
            All {TOTAL_PLAN_DAYS} days (2026) — tap a row
          </div>
          {DAYS.map((label, i) => {
            const ds = ALL_SESSIONS.filter((s) => s.day === i);
            const done = ds.filter((s) => isSessionComplete(status[s.id])).length;
            const skip = ds.filter((s) => status[s.id] === "skipped").length;
            const cu = pendingCU.filter((c) => c.catchUpDay === i).length;
            const isT = i === todayIdx;
            const isPast = i < todayIdx;
            const allD = done === ds.length && ds.length > 0;
            const isO = expanded === i;
            return (
              <div
                key={i}
                style={{
                  marginBottom: 6,
                  background: isT ? T.roseDim : T.surface,
                  border: `1px solid ${
                    isT ? T.roseLight : allD ? `${T.mint}55` : T.border
                  }`,
                  borderRadius: T.radiusMd,
                  overflow: "hidden",
                  boxShadow: isT ? T.shadowSm : "none",
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpanded(isO ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpanded(isO ? null : i);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 12px",
                    cursor: "pointer",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 15 }}>{allD ? "✅" : isPast && done > 0 ? "🟡" : isPast ? "❌" : isT ? "📍" : "○"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: isT ? T.roseText : T.cream }}>
                      {label}{" "}
                      {isT && (
                        <span
                          style={{
                            fontSize: 9,
                            background: T.roseText,
                            color: "#fff",
                            borderRadius: 6,
                            padding: "2px 7px",
                            marginLeft: 4,
                            fontWeight: 800,
                          }}
                        >
                          TODAY
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: T.muted }}>
                      {done}/{ds.length} done
                      {skip > 0 ? ` · ${skip} skipped` : ""}
                      {cu > 0 ? ` · ${cu} catch-up` : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    {[...new Set(ds.map((s) => s.sub))].map((sub) => (
                      <span key={sub} style={{ fontSize: 12 }}>
                        {S[sub].emoji}
                      </span>
                    ))}
                  </div>
                  <span style={{ color: T.faint, fontSize: 11 }}>{isO ? "▲" : "▼"}</span>
                </div>
                {isO && (
                  <div style={{ padding: "2px 12px 10px", borderTop: `1px solid ${T.border}` }}>
                    {ds.map((s) => (
                      <Card
                        key={s.id}
                        s={s}
                        st={status[s.id]}
                        onDone={markDone}
                        onSkip={markSkipped}
                        onMastered={markMastered}
                        compact
                        flash={flash === s.id}
                      />
                    ))}
                    {pendingCU
                      .filter((c) => c.catchUpDay === i)
                      .map((s, j) => (
                        <Card
                          key={s.queueId ?? s.id + "s" + j}
                          s={s}
                          st={status[s.id]}
                          onDone={markDone}
                          onSkip={markSkipped}
                          onMastered={markMastered}
                          compact
                          catchUp
                          flash={flash === s.id}
                        />
                      ))}
                  </div>
                )}
              </div>
            );
          })}
          {[
            {
              clr: "#fbbf24",
              t: "📋 Apr 14–16, 2026: Subject-wise past papers",
              d: "Bio → Chem → Phys → Maths. Time yourself. Review every wrong answer.",
            },
            {
              clr: "#fb7185",
              t: "📝 Apr 17–22, 2026: Full mock papers (2/day)",
              d: "180 Q, 3 hrs strict. Analyse mistakes. Sleep 8 hrs nightly.",
            },
            {
              clr: "#e78dfb",
              t: "🎯 Apr 23–24, 2026: KCET exam",
              d: "Bio+Chem (day 1) · Phys+Maths (day 2). Light review only the night before.",
            },
          ].map(({ clr, t, d }) => (
            <div
              key={t}
              style={{
                marginTop: 6,
                background: `${clr}10`,
                border: `1px solid ${clr}35`,
                borderRadius: 12,
                padding: "11px 13px",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: clr }}>{t}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>{d}</div>
            </div>
          ))}
          <div style={{ height: 16 }} />
        </div>
      )}

      {view === "progress" && (
        <div style={{ padding: "6px 12px 0" }}>
          <p style={{ fontSize: 14, color: T.cream, fontWeight: 700, margin: "0 0 4px" }}>Hi {USER.name}</p>
          <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.45, margin: "0 0 14px" }}>
            Here’s a calm snapshot — no clutter. Skipped sessions auto-spread onto lighter days as catch-ups.
          </p>

          <div
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: T.radiusLg,
              padding: "14px 16px",
              marginBottom: 12,
              boxShadow: T.shadowSm,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: T.faint, letterSpacing: 0.8, marginBottom: 10 }}>
              QUICK SNAPSHOT
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <div style={{ flex: "1 1 40%", minWidth: 120 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: T.roseText }}>{pct}%</div>
                <div style={{ fontSize: 11, color: T.muted }}>plan done</div>
              </div>
              <div style={{ flex: "1 1 40%", minWidth: 120 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: T.mint }}>{doneCount}</div>
                <div style={{ fontSize: 11, color: T.muted }}>sessions cleared</div>
              </div>
              <div style={{ flex: "1 1 40%", minWidth: 120 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: T.roseLight }}>{streak}</div>
                <div style={{ fontSize: 11, color: T.muted }}>day streak</div>
              </div>
              <div style={{ flex: "1 1 40%", minWidth: 120 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#E8A598" }}>{pendingCU.length}</div>
                <div style={{ fontSize: 11, color: T.muted }}>catch-ups left</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 800, color: T.faint, letterSpacing: 0.8, marginBottom: 8 }}>
            SUBJECTS (scheduled sessions)
          </div>
          {Object.keys(S).map((sub) => {
            const { total, done } = subStats[sub];
            const p = Math.round((done / total) * 100);
            return (
              <div
                key={sub}
                style={{
                  marginBottom: 10,
                  background: T.cardBlush,
                  border: `1px solid ${T.border}`,
                  borderRadius: T.radiusMd,
                  padding: "12px 14px",
                  borderLeft: `4px solid ${S[sub].color}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: T.cream }}>
                    {S[sub].emoji} {S[sub].label}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.muted }}>
                    {done}/{total}
                  </span>
                </div>
                <div style={{ background: "#fff", borderRadius: 999, height: 8, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${p}%`,
                      background: S[sub].color,
                      borderRadius: 999,
                      transition: "width 0.4s ease",
                      opacity: 0.85,
                    }}
                  />
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => setChaptersOpen((o) => !o)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 14px",
              marginBottom: chaptersOpen ? 8 : 12,
              borderRadius: T.radiusMd,
              border: `1px dashed ${T.border}`,
              background: T.surface,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 800,
              color: T.roseText,
            }}
          >
            <span>Concepts I already know well ({chapterCheckedCount}/{CHAPTER_CHECKLIST.length})</span>
            <span style={{ color: T.faint }}>{chaptersOpen ? "▲" : "▼"}</span>
          </button>
          {chaptersOpen && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.45, margin: "0 0 10px" }}>
                Tick big topics you&apos;ve <strong style={{ color: T.cream }}>already mastered</strong> (school /
                coaching). This only labels your strengths — daily cards stay on the Plan tab.
              </p>
              {Object.keys(S).map((sub) => {
                const items = CHAPTER_CHECKLIST.filter((c) => c.sub === sub);
                return (
                  <div
                    key={sub}
                    style={{
                      marginBottom: 10,
                      background: T.card,
                      border: `1px solid ${T.border}`,
                      borderRadius: T.radiusMd,
                      padding: "10px 12px",
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 800, color: S[sub].color, marginBottom: 6 }}>
                      {S[sub].emoji} {S[sub].label}
                    </div>
                    {items.map((c) => (
                      <label
                        key={c.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: 12,
                          color: chapterDone[c.id] ? T.mint : T.muted,
                          padding: "5px 0",
                          borderBottom: `1px solid ${T.border}`,
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={!!chapterDone[c.id]}
                          onChange={() => toggleChapter(c.id)}
                          style={{ marginTop: 3, accentColor: T.rose, width: 16, height: 16, flexShrink: 0 }}
                        />
                        <span style={{ flex: 1 }}>
                          {c.label}{" "}
                          <span style={{ color: T.faint, fontSize: 10 }}>
                            {"★".repeat(c.stars) + "☆".repeat(3 - c.stars)}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ fontSize: 11, fontWeight: 800, color: T.faint, letterSpacing: 0.8, marginBottom: 8 }}>
            SHARE & BACKUP
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            <button
              type="button"
              onClick={copyProgress}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: T.radiusMd,
                border: "none",
                cursor: "pointer",
                fontWeight: 800,
                fontSize: 14,
                background: `linear-gradient(90deg, ${T.lilac}, ${T.roseLight})`,
                color: "#fff",
                boxShadow: T.shadowSm,
              }}
            >
              Copy progress summary
            </button>
            <button
              type="button"
              onClick={exportBackup}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: T.radiusMd,
                border: `1px solid ${T.border}`,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 13,
                background: T.surface,
                color: T.muted,
              }}
            >
              Download JSON backup
            </button>
          </div>
          <p style={{ fontSize: 11, color: T.faint, lineHeight: 1.4, margin: "0 0 20px" }}>
            Star priorities for each chapter live under <strong>Plan</strong> when you expand a day — so Progress
            stays simple.
          </p>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 480,
          background: "rgba(255,251,249,0.92)",
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          padding: "8px 12px max(10px, env(safe-area-inset-bottom))",
          gap: 6,
          boxSizing: "border-box",
        }}
      >
        {[
          ["today", "📅", "Today"],
          ["schedule", "🗓", "Plan"],
          ["progress", "📊", "Stats"],
        ].map(([v, ic, l]) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: T.radiusMd,
              border: view === v ? `1px solid ${T.roseLight}` : "1px solid transparent",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 800,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              transition: "all 0.15s",
              background: view === v ? T.roseDim : "transparent",
              color: view === v ? T.roseText : T.muted,
            }}
          >
            <span style={{ fontSize: 18 }}>{ic}</span>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

function Card({ s, st, onDone, onSkip, onMastered, compact, catchUp, flash }) {
  const done = st === "done";
  const mastered = st === "mastered";
  const skipped = st === "skipped";
  const complete = done || mastered;

  return (
    <div
      style={{
        marginBottom: compact ? 4 : 7,
        background: done
          ? T.mintDim
          : mastered
            ? T.lilacDim
            : skipped
              ? T.cardBlush
              : "#fff",
        border: `1px solid ${
          done
            ? `${T.mint}55`
            : mastered
              ? `${T.lilac}50`
              : skipped
                ? T.border
                : `${S[s.sub].color}40`
        }`,
        borderRadius: T.radiusMd,
        padding: compact ? "7px 10px" : "11px 12px",
        opacity: skipped ? 0.45 : 1,
        transition: "all 0.2s ease",
        boxShadow: flash ? `0 0 0 3px ${S[s.sub].color}22` : T.shadowSm,
      }}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap", marginBottom: 3 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: S[s.sub].color,
                background: `${S[s.sub].color}20`,
                padding: "2px 8px",
                borderRadius: 20,
              }}
            >
              {S[s.sub].emoji} {S[s.sub].label}
            </span>
            <span style={{ fontSize: 10, color: T.muted }}>{s.slot}</span>
            {catchUp && (
              <span
                style={{
                  fontSize: 9,
                  color: "#fbbf24",
                  background: "rgba(251,191,36,0.12)",
                  padding: "2px 7px",
                  borderRadius: 6,
                  fontWeight: 800,
                }}
              >
                CATCH-UP
              </span>
            )}
            {"p" in s && (
              <span
                style={{
                  fontSize: 10,
                  color: s.p === 3 ? "#fbbf24" : s.p === 2 ? "#7a6572" : "#4a3d45",
                }}
              >
                {"★".repeat(s.p) + "☆".repeat(3 - s.p)}
              </span>
            )}
            {mastered && (
              <span
                style={{
                  fontSize: 9,
                  color: T.lilac,
                  background: "rgba(167,139,250,0.15)",
                  padding: "2px 7px",
                  borderRadius: 6,
                  fontWeight: 800,
                }}
              >
                KNEW IT
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: compact ? 12 : 13,
              color: complete ? T.faint : T.cream,
              lineHeight: 1.45,
              textDecoration: complete ? "line-through" : "none",
            }}
          >
            {s.ch}
          </div>
        </div>
        {!complete && !skipped && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
            <button
              type="button"
              title="Finished this session"
              onClick={() => onDone(s)}
              style={{
                background: "rgba(52,211,153,0.18)",
                border: "1px solid rgba(52,211,153,0.45)",
                color: "#5ee9b5",
                borderRadius: 8,
                padding: "5px 8px",
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              ✓
            </button>
            <button
              type="button"
              title="Already knew this — counts as done, no streak"
              onClick={() => onMastered(s)}
              style={{
                background: "rgba(167,139,250,0.15)",
                border: "1px solid rgba(167,139,250,0.4)",
                color: "#c9b8ff",
                borderRadius: 8,
                padding: "4px 6px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 800,
              }}
              >
              ★
            </button>
            <button
              type="button"
              title="Skip — moves to catch-up"
              onClick={() => onSkip(s)}
              style={{
                background: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.35)",
                color: "#fbbf24",
                borderRadius: 8,
                padding: "4px 7px",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              ⏭
            </button>
          </div>
        )}
        {done && <span style={{ fontSize: 18, flexShrink: 0 }}>✅</span>}
        {mastered && <span style={{ fontSize: 18, flexShrink: 0 }}>✨</span>}
        {skipped && <span style={{ fontSize: 14, flexShrink: 0 }}>↩️</span>}
      </div>
    </div>
  );
}
