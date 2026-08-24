import { Fragment, useEffect, useMemo, useState } from "react";
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

  if (rows.length === 0) return null;

  return (
    <div className={cn("mt-3", open && "pb-4")} data-lexicon>
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
          <table className="w-full table-fixed text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="w-[42%] px-3 py-2 font-display text-xs font-semibold tracking-wide text-primary">
                  Tiếng Anh / English
                </th>
                <th className="w-[42%] px-3 py-2 font-display text-xs font-semibold tracking-wide text-accent">
                  Nam Bộ
                </th>
                <th className="w-12 px-1 py-2" aria-label="Flag" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const key = flagKey({ seriesId, seasonId, pageId, level, en: row.en, vi: row.vi });
                const flagged = flagMap.get(key);
                const showChips = picking === key;
                return (
                  <Fragment key={key}>
                    <tr
                      className={cn(
                        "border-b border-border/70",
                        flagged && "bg-accent/10",
                        showChips && "bg-surface-2",
                      )}
                    >
                      <td className="px-3 py-2.5 align-middle text-pretty text-ink">{row.en}</td>
                      <td className="px-3 py-2.5 align-middle text-pretty text-ink">
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
                            className={cn(
                              "size-5",
                              (flagged || showChips) && "fill-accent text-accent",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </td>
                    </tr>
                    {showChips && (
                      <tr className="border-b border-border/70 bg-surface-2">
                        <td colSpan={3} className="px-3 py-3">
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
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-9"
                  onClick={() => setFlags([])}
                >
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
