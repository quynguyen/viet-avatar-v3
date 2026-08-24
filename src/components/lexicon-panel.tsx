import { useEffect, useMemo, useState } from "react";
import { Flag } from "lucide-react";
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

  const onRowTap = (row: Row) => {
    const key = flagKey({ seriesId, seasonId, pageId, level, en: row.en, vi: row.vi });
    setPicking((current) => (current === key ? null : key));
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
                Flagged / Đã gắn cờ ({flags.length})
              </p>
              <Button type="button" variant="secondary" size="sm" className="h-9" onClick={copyReport}>
                {copied ? "Copied / Đã chép" : "Copy for Grok / Chép cho Grok"}
              </Button>
              <Button type="button" variant="secondary" size="sm" className="h-9" onClick={() => setFlags([])}>
                Clear all / Xóa hết
              </Button>
            </div>
          )}

          <ul className="divide-y divide-border/70">
            {rows.map((row) => {
              const key = flagKey({ seriesId, seasonId, pageId, level, en: row.en, vi: row.vi });
              const flagged = flagMap.get(key);
              const showChips = picking === key;
              return (
                <li key={key} className={cn(flagged && "bg-accent/10", showChips && "bg-surface-2")}>
                  <button
                    type="button"
                    aria-pressed={Boolean(flagged) || showChips}
                    onClick={() => onRowTap(row)}
                    className="flex min-h-14 w-full items-start gap-2 px-3 py-3 text-left"
                  >
                    <Flag
                      className={cn("mt-0.5 size-5 shrink-0", flagged || showChips ? "fill-accent text-accent" : "text-muted")}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-pretty text-sm text-ink">{row.en}</span>
                      <span className="mt-0.5 block text-pretty text-sm text-ink">{row.vi}</span>
                      {flagged && (
                        <span className="mt-1 block text-[11px] font-medium text-accent">
                          {reasonLabelBoth(flagged.reason)}
                        </span>
                      )}
                    </span>
                  </button>
                  {showChips && (
                    <div className="flex flex-wrap gap-2 px-3 pb-3">
                      {FLAG_REASONS.map((reason) => (
                        <button
                          key={reason.id}
                          type="button"
                          onClick={() => upsert(row, reason.id)}
                          className="min-h-11 rounded-full border border-border bg-paper px-3 text-left text-xs font-medium text-ink"
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
                      <button type="button" onClick={() => setPicking(null)} className="min-h-11 rounded-full px-3 text-xs text-muted">
                        Cancel / Hủy
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="px-3 py-2 text-[11px] text-muted">
            Tap a row to flag it. / Chạm một dòng để gắn cờ.
          </p>
        </div>
      )}
    </div>
  );
}
