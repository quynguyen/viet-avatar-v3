import story from "./story.json";
import lexiconOverrides from "./lexicon-overrides.json";

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
function applyLexiconOverrides(series: Series[]): Series[] {
  const overrides = lexiconOverrides as Record<string, Partial<Record<LevelId, LexiconEntry[]>>>;
  return series.map((item) => ({
    ...item,
    seasons: item.seasons.map((season) => ({
      ...season,
      pages: season.pages.map((page) => {
        const pageOverrides = overrides[page.id];
        if (!pageOverrides) return page;
        return {
          ...page,
          lexicon: {
            ...page.lexicon,
            ...Object.fromEntries(
              (Object.keys(pageOverrides) as LevelId[]).map((level) => [
                level,
                pageOverrides[level] ?? page.lexicon[level],
              ]),
            ),
          },
        };
      }),
    })),
  }));
}

export const SERIES = applyLexiconOverrides(
  (story.series as Series[]).filter((item) => !item.archived),
);

export function audioPath(level: LevelId, lang: Lang, file: string) {
  return `/audio/${level}/${lang}/${file}.mp3`;
}
