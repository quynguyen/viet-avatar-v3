import story from "./story.json";

export type Lang = "vi" | "en";
export type Mode = "normal" | "learn";
export type LevelId = "preschool" | "primary" | "intermediate" | "senior";
export type SeriesId = "atla" | "korra" | "zelda" | "transformers" | "sonic";

export type LexiconEntry = {
  en: string;
  vi: string;
};

export type StoryPage = {
  id: string;
  image: string;
  file: string;
  title: Record<Lang, string>;
  text: Record<LevelId, Record<Lang, string>>;
  lexicon: Record<LevelId, LexiconEntry[]>;
};

export type Season = {
  id: string;
  vi: string;
  en: string;
  tagline: Record<Lang, string>;
  pages: StoryPage[];
};

export type Series = {
  id: SeriesId;
  vi: string;
  en: string;
  coverTitle: Record<Lang, string>;
  archived?: boolean;
  seasons: Season[];
};

export const APP_NAME = story.appName;
export const ARCHIVED = Boolean((story as { archived?: boolean }).archived);
export const LEVELS = story.levels as ReadonlyArray<{
  id: LevelId;
  vi: string;
  en: string;
}>;
export const SERIES = (story.series as Series[]).filter((item) => !item.archived);

export function audioPath(level: LevelId, lang: Lang, file: string) {
  return `/audio/${level}/${lang}/${file}.mp3`;
}
