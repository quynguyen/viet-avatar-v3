export const FLAG_REASONS = [
  { id: "wrong-gloss", en: "Wrong gloss", vi: "Dịch sai" },
  { id: "bad-phrase", en: "Bad phrase", vi: "Cụm sai" },
  { id: "missing-word", en: "Missing word", vi: "Thiếu từ" },
  { id: "should-not-exist", en: "Shouldn't exist", vi: "Không nên có" },
  { id: "audio-missing-en", en: "The audio is missing English", vi: "Thiếu âm thanh tiếng Anh" },
  { id: "audio-missing-vi", en: "The audio is missing Vietnamese", vi: "Thiếu âm thanh tiếng Việt" },
  { id: "audio-vi-male", en: "The Vietnamese audio is a man, instead of a woman", vi: "Âm thanh tiếng Việt là nam, không phải nữ" },
  { id: "audio-en-male", en: "The English audio is a man, instead of a woman", vi: "Âm thanh tiếng Anh là nam, không phải nữ" },
  { id: "audio-overlap", en: "The audio is overlapping with the previous or next row", vi: "Âm thanh chồng lên dòng trước hoặc dòng sau" },
  { id: "other", en: "Other", vi: "Khác" },
] as const;

export type FlagReasonId = (typeof FLAG_REASONS)[number]["id"];

export type LexiconFlag = {
  seriesId: string;
  seriesEn: string;
  seasonId: string;
  seasonEn: string;
  pageId: string;
  pageEn: string;
  level: string;
  en: string;
  vi: string;
  reason: FlagReasonId;
  flaggedAt: string;
};

const STORAGE_KEY = "viet-avatar.lexicon-flags.v1";

export function flagKey(flag: Pick<LexiconFlag, "seriesId" | "seasonId" | "pageId" | "level" | "en" | "vi">): string {
  return [flag.seriesId, flag.seasonId, flag.pageId, flag.level, flag.en, flag.vi].join("\t");
}

export function loadFlags(): LexiconFlag[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LexiconFlag[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFlags(flags: LexiconFlag[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
}

export function reasonLabel(id: FlagReasonId, lang: "en" | "vi"): string {
  const row = FLAG_REASONS.find((item) => item.id === id);
  if (!row) return id;
  return lang === "vi" ? row.vi : row.en;
}

export function reasonLabelBoth(id: FlagReasonId): string {
  const row = FLAG_REASONS.find((item) => item.id === id);
  if (!row) return id;
  return `${row.en} / ${row.vi}`;
}

export function formatFlagsForGrok(flags: LexiconFlag[]): string {
  if (flags.length === 0) return "No flagged lexicon rows.";
  const lines = [
    "FLAGGED LEXICON ROWS",
    `Count: ${flags.length}`,
    "Please fix these translations first.",
    "",
  ];
  flags.forEach((flag, i) => {
    lines.push(
      `${i + 1}. [${flag.reason}] ${reasonLabelBoth(flag.reason)}`,
      `   ${flag.seriesEn} / ${flag.seasonEn} / ${flag.pageEn} / ${flag.level}`,
      `   EN: ${flag.en}`,
      `   VI: ${flag.vi}`,
      "",
    );
  });
  return lines.join("\n");
}
