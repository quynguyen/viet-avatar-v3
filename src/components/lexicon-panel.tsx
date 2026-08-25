import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flag, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FLAG_REASONS,
  flagKey,
  formatFlagsForGrok,
  loadFlags,
  reasonLabelBoth,
  saveFlags,
  type FlagReasonId,
  type LexiconFlag,
} from "@/lib/lexicon-flags";
import { cn } from "@/lib/utils";

type Row = { en: string; vi: string };

function pickVoice(langPrefix: string, preferFemale = true): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const matched = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
  if (matched.length === 0) return null;
  if (preferFemale) {
    const female = matched.find(
      (v) =>
        /female|woman|zira|samantha|karen|moira|tessa|veena|google.*female|linh|my\s*linh|female/i.test(
          v.name,
        ) || /female/i.test(v.voiceURI),
    );
    if (female) return female;
  }
  return matched[0] ?? null;
}

function speakText(text: string, lang: "en" | "vi", onEnd: () => void): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined" || !window.speechSynthesis || !text.trim()) {
    onEnd();
    return null;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "vi" ? "vi-VN" : "en-US";
  u.rate = lang === "vi" ? 0.92 : 0.95;
  const voice = pickVoice(lang === "vi" ? "vi" : "en");
  if (voice) u.voice = voice;
  u.onend = () => onEnd();
  u.onerror = () => onEnd();
  window.speechSynthesis.speak(u);
  return u;
}

export function LexiconPanel({
  rows,
  seriesId,
  seriesEn,
  seasonId,
  seasonEn,
  pageId,
  pageEn,
  level,
  uiLang,
  lexiconLabel,
}: {
  rows: Row[];
  seriesId: string;
  seriesEn: string;
  seasonId: string;
  seasonEn: string;
  pageId: string;
  pageEn: string;
  level: string;
  uiLang: "en" | "vi";
  lexiconLabel: string;
}) {
  const [open, setOpen] = useState(true);
  const [flags, setFlags] = useState<LexiconFlag[]>([]);
  const [picking, setPicking] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  const [repeats, setRepeats] = useState(3);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [readingAll, setReadingAll] = useState(false);

  const stopRef = useRef(false);
  const playGenRef = useRef(0);

  useEffect(() => {
    setFlags(loadFlags());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveFlags(flags);
  }, [flags, ready]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.getVoices();
    const load = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  useEffect(() => {
    return () => {
      stopRef.current = true;
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    stopRef.current = true;
    playGenRef.current += 1;
    setPlayingIdx(null);
    setReadingAll(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [pageId, level, rows]);

  const flagMap = useMemo(() => {
    const map = new Map<string, LexiconFlag>();
    for (const flag of flags) map.set(flagKey(flag), flag);
    return map;
  }, [flags]);

  const reportText = useMemo(() => formatFlagsForGrok(flags), [flags]);

  const upsert = (row: Row, reason: FlagReasonId) => {
    const next: LexiconFlag = {
      seriesId,
      seriesEn,
      seasonId,
      seasonEn,
      pageId,
      pageEn,
      level,
      en: row.en,
      vi: row.vi,
      reason,
      flaggedAt: new Date().toISOString(),
    };
    const key = flagKey(next);
    setFlags((prev) => [...prev.filter((item) => flagKey(item) !== key), next]);
    setPicking(null);
  };

  const clearRow = (row: Row) => {
    const key = flagKey({ seriesId, seasonId, pageId, level, en: row.en, vi: row.vi });
    setFlags((prev) => prev.filter((item) => flagKey(item) !== key));
    setPicking(null);
  };

  const togglePick = (row: Row) => {
    const key = flagKey({ seriesId, seasonId, pageId, level, en: row.en, vi: row.vi });
    setPicking((current) => (current === key ? null : key));
  };

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(reportText);
    } catch {
      const area = document.createElement("textarea");
      area.value = reportText;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const stopAll = useCallback(() => {
    stopRef.current = true;
    playGenRef.current += 1;
    setPlayingIdx(null);
    setReadingAll(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speakPair = useCallback((row: Row, gen: number): Promise<void> => {
    return new Promise((resolve) => {
      if (stopRef.current || gen !== playGenRef.current) {
        resolve();
        return;
      }
      speakText(row.en, "en", () => {
        if (stopRef.current || gen !== playGenRef.current) {
          resolve();
          return;
        }
        window.setTimeout(() => {
          if (stopRef.current || gen !== playGenRef.current) {
            resolve();
            return;
          }
          speakText(row.vi, "vi", () => resolve());
        }, 280);
      });
    });
  }, []);

  const playRow = useCallback(
    async (idx: number) => {
      if (playingIdx === idx && !readingAll) {
        stopAll();
        return;
      }
      stopRef.current = false;
      const gen = ++playGenRef.current;
      setReadingAll(false);
      setPlayingIdx(idx);
      const row = rows[idx];
      if (!row) {
        setPlayingIdx(null);
        return;
      }
      await speakPair(row, gen);
      if (gen === playGenRef.current && !stopRef.current) {
        setPlayingIdx(null);
      }
    },
    [playingIdx, readingAll, rows, speakPair, stopAll],
  );

  const playAll = useCallback(async () => {
    if (readingAll) {
      stopAll();
      return;
    }
    if (rows.length === 0) return;
    stopRef.current = false;
    const gen = ++playGenRef.current;
    setReadingAll(true);

    for (let pass = 0; pass < repeats; pass++) {
      for (let i = 0; i < rows.length; i++) {
        if (stopRef.current || gen !== playGenRef.current) break;
        setPlayingIdx(i);
        await speakPair(rows[i], gen);
        await new Promise((r) => setTimeout(r, 200));
      }
      if (stopRef.current || gen !== playGenRef.current) break;
    }

    if (gen === playGenRef.current) {
      setPlayingIdx(null);
      setReadingAll(false);
    }
  }, [readingAll, rows, repeats, speakPair, stopAll]);

  if (rows.length === 0) return null;

  return (
    <div className={cn("mt-3", open && "pb-4")} data-lexicon>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="page-lexicon"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 min-w-0 flex-1 items-center justify-between rounded-full border border-border bg-surface px-4 text-sm font-medium text-ink"
        >
          <span className="truncate">{lexiconLabel}</span>
          {flags.length > 0 && (
            <span className="ml-2 shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
              {flags.length}
            </span>
          )}
        </button>

        {open && (
          <>
            <button
              type="button"
              onClick={() => void playAll()}
              className={cn(
                "flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors",
                readingAll
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-surface text-ink hover:bg-surface-2",
              )}
              title="Đọc hết / Read all"
            >
              {readingAll ? (
                <Square className="size-3.5 fill-current" aria-hidden="true" />
              ) : (
                <Play className="size-3.5 fill-current" aria-hidden="true" />
              )}
              <span>Đọc hết</span>
            </button>
            <label className="flex h-11 shrink-0 items-center gap-1 rounded-full border border-border bg-surface px-2.5 text-sm text-ink">
              <select
                value={repeats}
                onChange={(e) => setRepeats(Number(e.target.value))}
                aria-label="Repeats / Số lần"
                className="border-none bg-transparent pr-1 font-medium text-ink outline-none"
              >
                <option value={1}>1 lần</option>
                <option value={2}>2 lần</option>
                <option value={3}>3 lần</option>
                <option value={5}>5 lần</option>
              </select>
            </label>
          </>
        )}
      </div>

      {open && (
        <div id="page-lexicon" className="mt-2 overflow-hidden rounded-xl border border-border bg-surface">
          <table className="w-full table-fixed text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="w-11 px-1 py-2" aria-label="Play" />
                <th className="w-[40%] px-2 py-2 font-display text-xs font-semibold tracking-wide text-primary">
                  Tiếng Anh / English
                </th>
                <th className="w-[40%] px-2 py-2 font-display text-xs font-semibold tracking-wide text-accent">
                  Nam Bộ
                </th>
                <th className="w-12 px-1 py-2" aria-label="Flag" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const key = flagKey({ seriesId, seasonId, pageId, level, en: row.en, vi: row.vi });
                const flagged = flagMap.get(key);
                const showChips = picking === key;
                const isPlaying = playingIdx === idx;
                return (
                  <Fragment key={key}>
                    <tr
                      className={cn(
                        "border-b border-border/70",
                        flagged && "bg-accent/10",
                        showChips && "bg-surface-2",
                        isPlaying && "bg-primary/10",
                      )}
                    >
                      <td className="px-1 py-1 align-middle">
                        <button
                          type="button"
                          aria-label={uiLang === "vi" ? "Phát" : "Play"}
                          aria-pressed={isPlaying}
                          onClick={() => void playRow(idx)}
                          className={cn(
                            "flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-primary",
                            isPlaying && "text-primary",
                          )}
                        >
                          {isPlaying ? (
                            <Square className="size-4 fill-current" aria-hidden="true" />
                          ) : (
                            <Play className="size-4 fill-current" aria-hidden="true" />
                          )}
                        </button>
                      </td>
                      <td className="px-2 py-2.5 align-middle text-pretty text-ink">{row.en}</td>
                      <td className="px-2 py-2.5 align-middle text-pretty text-ink">
                        {row.vi}
                        {flagged && (
                          <span className="mt-1 block text-[11px] font-medium leading-snug text-accent">
                            {reasonLabelBoth(flagged.reason)}
                          </span>
                        )}
                      </td>
                      <td className="px-1 py-1 align-middle">
                        <button
                          type="button"
                          aria-pressed={Boolean(flagged) || showChips}
                          aria-label="Flag translation / Gắn cờ bản dịch"
                          onClick={() => togglePick(row)}
                          className="flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-accent"
                        >
                          <Flag
                            className={cn("size-5", (flagged || showChips) && "fill-accent text-accent")}
                            aria-hidden="true"
                          />
                        </button>
                      </td>
                    </tr>
                    {showChips && (
                      <tr className="border-b border-border/70 bg-surface-2">
                        <td colSpan={4} className="px-3 py-3">
                          <p className="mb-2 text-[11px] font-medium text-muted">
                            Why is this wrong? / Vì sao sai?
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {FLAG_REASONS.map((reason) => (
                              <button
                                key={reason.id}
                                type="button"
                                onClick={() => upsert(row, reason.id)}
                                className={cn(
                                  "min-h-11 rounded-full border px-3 text-left text-xs font-medium",
                                  flagged?.reason === reason.id
                                    ? "border-accent bg-accent/15 text-accent"
                                    : "border-border bg-paper text-ink",
                                )}
                              >
                                {reason.en} / {reason.vi}
                              </button>
                            ))}
                            {flagged && (
                              <button
                                type="button"
                                onClick={() => clearRow(row)}
                                className="min-h-11 rounded-full px-3 text-xs font-medium text-muted"
                              >
                                Remove flag / Bỏ cờ
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => setPicking(null)}
                              className="min-h-11 rounded-full px-3 text-xs text-muted"
                            >
                              Cancel / Hủy
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>

          {flags.length > 0 && (
            <div className="border-t border-border bg-surface-2 px-3 py-3">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold text-accent">
                  Issues for Grok / Vấn đề gửi Grok ({flags.length})
                </p>
                <Button type="button" variant="secondary" size="sm" className="h-9" onClick={copyReport}>
                  {copied ? "Copied / Đã chép" : "Copy / Chép"}
                </Button>
                <Button type="button" variant="secondary" size="sm" className="h-9" onClick={() => setFlags([])}>
                  Clear all / Xóa hết
                </Button>
              </div>
              <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-paper p-3 font-mono text-[11px] leading-relaxed text-ink">
                {reportText}
              </pre>
              <p className="mt-2 text-[11px] text-muted">
                Copy this block and paste it in chat so Grok can fix the rows. / Chép khối này và dán vào chat để Grok sửa.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
