import { useEffect, useMemo, useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FLAG_REASONS,
  flagKey,
  formatFlagsForGrok,
  loadFlags,
  reasonLabel,
  saveFlags,
  type FlagReasonId,
  type LexiconFlag,
} from "@/lib/lexicon-flags";
import { cn } from "@/lib/utils";

type Row = { en: string; vi: string };

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
  const [open, setOpen] = useState(false);
  const [flags, setFlags] = useState<LexiconFlag[]>([]);
  const [picking, setPicking] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFlags(loadFlags());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveFlags(flags);
  }, [flags, ready]);

  const flagMap = useMemo(() => {
    const map = new Map<string, LexiconFlag>();
    for (const flag of flags) map.set(flagKey(flag), flag);
    return map;
  }, [flags]);

  const pageFlags = flags.filter(
    (flag) =>
      flag.seriesId === seriesId &&
      flag.seasonId === seasonId &&
      flag.pageId === pageId &&
      flag.level === level,
  );

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
    setFlags((prev) => {
      const without = prev.filter((item) => flagKey(item) !== key);
      return [...without, next];
    });
    setPicking(null);
  };

  const clearRow = (row: Row) => {
    const key = flagKey({ seriesId, seasonId, pageId, level, en: row.en, vi: row.vi });
    setFlags((prev) => prev.filter((item) => flagKey(item) !== key));
    setPicking(null);
  };

  const copyReport = async () => {
    const text = formatFlagsForGrok(flags);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  if (rows.length === 0) return null;

  return (
    <div className={cn("mt-3", open && "pb-28")} data-lexicon>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="page-lexicon"
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-full items-center justify-between rounded-full border border-border bg-surface px-4 text-sm font-medium text-ink"
      >
        <span className="truncate">{lexiconLabel}</span>
        {flags.length > 0 && (
          <span className="ml-2 shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
            {flags.length}
          </span>
        )}
      </button>

      {open && (
        <div id="page-lexicon" className="mt-2 overflow-hidden rounded-xl border border-border bg-surface">
          {flags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface-2 px-3 py-2">
              <p className="text-xs font-semibold text-accent">
                {uiLang === "vi" ? `Đã gắn cờ (${flags.length})` : `Flagged (${flags.length})`}
              </p>
              <Button type="button" variant="secondary" size="sm" className="h-9" onClick={copyReport}>
                {copied
                  ? uiLang === "vi"
                    ? "Đã chép"
                    : "Copied"
                  : uiLang === "vi"
                    ? "Chép cho Grok"
                    : "Copy for Grok"}
              </Button>
              <Button type="button" variant="secondary" size="sm" className="h-9" onClick={() => setFlags([])}>
                {uiLang === "vi" ? "Xóa hết" : "Clear all"}
              </Button>
            </div>
          )}

          <table className="w-full table-fixed text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="w-12 px-1 py-2" />
                <th className="w-[44%] px-2 py-2 font-display text-xs font-semibold tracking-wide text-primary">
                  {uiLang === "vi" ? "Tiếng Anh" : "English"}
                </th>
                <th className="w-[44%] px-2 py-2 font-display text-xs font-semibold tracking-wide text-accent">
                  Nam Bộ
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const key = flagKey({ seriesId, seasonId, pageId, level, en: row.en, vi: row.vi });
                const flagged = flagMap.get(key);
                const showChips = picking === key;
                return (
                  <tr key={key} className={cn("border-b border-border/70 last:border-0", flagged && "bg-accent/10")}>
                    <td className="px-1 py-1 align-top" colSpan={showChips ? 3 : 1}>
                      {!showChips ? (
                        <button
                          type="button"
                          aria-pressed={Boolean(flagged)}
                          aria-label={uiLang === "vi" ? "Gắn cờ bản dịch" : "Flag translation"}
                          onClick={() => {
                            if (flagged) clearRow(row);
                            else setPicking(key);
                          }}
                          className="flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-accent"
                        >
                          <Flag className={cn("size-5", flagged && "fill-accent text-accent")} aria-hidden="true" />
                        </button>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 px-1 py-1">
                          {FLAG_REASONS.map((reason) => (
                            <button
                              key={reason.id}
                              type="button"
                              onClick={() => upsert(row, reason.id)}
                              className="h-9 rounded-full border border-border bg-paper px-3 text-xs font-medium text-ink"
                            >
                              {uiLang === "vi" ? reason.vi : reason.en}
                            </button>
                          ))}
                          <button type="button" onClick={() => setPicking(null)} className="h-9 rounded-full px-3 text-xs text-muted">
                            {uiLang === "vi" ? "Hủy" : "Cancel"}
                          </button>
                        </div>
                      )}
                    </td>
                    {!showChips && (
                      <>
                        <td className="px-2 py-2 align-top text-pretty text-ink">{row.en}</td>
                        <td className="px-2 py-2 align-top text-pretty text-ink">
                          {row.vi}
                          {flagged && (
                            <span className="mt-1 block text-[11px] font-medium text-accent">
                              {reasonLabel(flagged.reason, uiLang)}
                            </span>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {pageFlags.length > 0 && (
            <p className="px-3 py-2 text-[11px] text-muted">
              {uiLang === "vi"
                ? "Cờ được lưu trên máy này. Bấm Chép cho Grok rồi dán vào đoạn chat."
                : "Flags stay on this device. Copy for Grok, then paste in chat."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
