import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LexiconPanel } from "@/components/lexicon-panel";
import {
  APP_NAME,
  ARCHIVED,
  LEVELS,
  SERIES,
  audioPath,
  type Lang,
  type LevelId,
  type Mode,
  type SeriesId,
} from "@/lib/pages";
import { cn } from "@/lib/utils";

function HighlightedText({
  text,
  progress,
  active,
  className,
}: {
  text: string;
  progress: number;
  active: boolean;
  className?: string;
}) {
  const tokens = text.split(/(\s+)/);
  const wordCount = tokens.filter((t) => t.trim().length > 0).length || 1;
  const current = active ? Math.min(wordCount - 1, Math.floor(progress * wordCount)) : -1;
  let wordIndex = -1;

  return (
    <p className={cn("text-pretty text-base leading-relaxed sm:text-lg", className)}>
      {tokens.map((token, i) => {
        if (!token.trim()) {
          return <span key={i}>{token}</span>;
        }
        wordIndex += 1;
        return (
          <span
            key={i}
            className={cn(
              "rounded-sm transition-colors duration-150",
              wordIndex === current && "bg-primary/20 text-primary",
              wordIndex < current && "text-ink/80",
            )}
          >
            {token}
          </span>
        );
      })}
    </p>
  );
}

function PillToggle<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (id: T) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-11 min-w-0 items-center rounded-full border border-border bg-surface p-1",
        className,
      )}
      role="group"
      aria-label={label}
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "h-9 min-w-0 flex-1 rounded-full px-3 text-sm font-medium transition-[background-color,color] duration-150",
            value === option.id
              ? "bg-primary text-primary-foreground"
              : "text-muted hover:text-ink",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function RoundSelect({
  id,
  label,
  value,
  onChange,
  children,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative min-w-0", className)}>
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-full border border-border bg-surface py-0 pl-3 pr-9 text-sm font-medium text-ink"
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}

export function Storybook() {
  const [seriesId, setSeriesId] = useState<SeriesId>("sonic");
  const [seasonId, setSeasonId] = useState("so2");
  const [page, setPage] = useState(0);
  const [lang, setLang] = useState<Lang>("vi");
  const [mode, setMode] = useState<Mode>("normal");
  const [level, setLevel] = useState<LevelId>("preschool");
  const [phase, setPhase] = useState<Lang>("en");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageReady, setImageReady] = useState(false);
  const [shelfOpen, setShelfOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const keepPlayingRef = useRef(false);
  const touchXRef = useRef<number | null>(null);
  const pageRef = useRef(0);
  const phaseRef = useRef<Lang>("en");
  const modeRef = useRef<Mode>("normal");
  const lastPageRef = useRef(0);

  const series = useMemo(
    () => SERIES.find((item) => item.id === seriesId) ?? SERIES[0],
    [seriesId],
  );
  const seasons = series.seasons;
  const season = useMemo(
    () => seasons.find((item) => item.id === seasonId) ?? seasons[0],
    [seasons, seasonId],
  );
  const pages = season.pages;
  const lastPage = pages.length - 1;
  const current = pages[Math.min(page, lastPage)];

  pageRef.current = page;
  phaseRef.current = phase;
  modeRef.current = mode;
  lastPageRef.current = lastPage;

  const isCover = page === 0;
  const speaking: Lang = mode === "learn" ? phase : lang;
  const audioSrc = audioPath(level, speaking, current.file);
  const title = current.title[mode === "learn" ? "vi" : lang];
  const uiLang: Lang = mode === "learn" ? "vi" : lang;
  const tagline = season.tagline;
  const coverTitle = series.coverTitle[uiLang];
  const lexicon = current.lexicon[level] ?? [];
  const levelName = LEVELS.find((item) => item.id === level);
  const levelShortVi = levelName?.vi.split(" (")[0] ?? "";
  const levelShortEn = levelName?.en ?? "";
  const lexiconLabel =
    uiLang === "vi" ? `Từ điển · ${levelShortVi}` : `Lexicon · ${levelShortEn}`;

  const goTo = useCallback((next: number) => {
    setPage((prev) => {
      const clamped = Math.max(0, Math.min(lastPageRef.current, next));
      if (clamped === prev) {
        if (modeRef.current === "learn") {
          setPhase("en");
          phaseRef.current = "en";
        }
        return prev;
      }
      setProgress(0);
      setImageReady(false);
      setPhase("en");
      phaseRef.current = "en";
      return clamped;
    });
  }, []);

  const resetPair = () => {
    setPhase("en");
    phaseRef.current = "en";
    setProgress(0);
  };

  const play = useCallback(() => {
    keepPlayingRef.current = true;
    const el = audioRef.current;
    if (!el) return;
    void el.play().then(
      () => setPlaying(true),
      () => {
        setPlaying(false);
        keepPlayingRef.current = false;
      },
    );
  }, []);

  const pause = useCallback(() => {
    keepPlayingRef.current = false;
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, pause, play]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.src = audioSrc;
    el.load();
    setProgress(0);
    const onCanPlay = () => {
      if (keepPlayingRef.current) {
        void el.play().then(
          () => setPlaying(true),
          () => {
            setPlaying(false);
            keepPlayingRef.current = false;
          },
        );
      }
    };
    el.addEventListener("canplay", onCanPlay, { once: true });
    return () => {
      el.removeEventListener("canplay", onCanPlay);
      el.pause();
    };
  }, [page, audioSrc]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => {
      const duration = el.duration;
      setProgress(duration && Number.isFinite(duration) ? el.currentTime / duration : 0);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(1);
      const currentPage = pageRef.current;
      if (modeRef.current === "learn" && phaseRef.current === "en") {
        setPhase("vi");
        phaseRef.current = "vi";
        return;
      }
      if (currentPage < lastPageRef.current) {
        setPhase("en");
        phaseRef.current = "en";
        goTo(currentPage + 1);
      } else {
        keepPlayingRef.current = false;
      }
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => {
      if (!el.ended) setPlaying(false);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [goTo]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLSelectElement) return;
      if (event.key === "ArrowRight") goTo(page + 1);
      if (event.key === "ArrowLeft") goTo(page - 1);
      if (event.key === " ") {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, page, toggle]);

  const onTouchStart = (event: TouchEvent) => {
    if (event.target instanceof HTMLElement && event.target.closest("button, select, [data-lexicon]")) return;
    touchXRef.current = event.changedTouches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchXRef.current;
    touchXRef.current = null;
    if (start == null) return;
    const delta = event.changedTouches[0].clientX - start;
    if (delta < -56) goTo(page + 1);
    if (delta > 56) goTo(page - 1);
  };

  const playText = playing
    ? uiLang === "vi"
      ? "Dừng"
      : "Pause"
    : isCover
      ? uiLang === "vi"
        ? "Nghe chuyện"
        : "Listen"
      : uiLang === "vi"
        ? "Đọc"
        : "Play";

  const viText = current.text[level].vi;
  const enText = current.text[level].en;
  const singleText = current.text[level][lang];

  if (ARCHIVED && !shelfOpen) {
    return (
      <div className="flex min-h-dvh flex-col bg-paper text-ink">
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-2 shadow-lg">
            <img src="/illustrations/s1-00.jpg" alt="" className="h-full w-full object-cover opacity-50" />
            <div className="absolute inset-x-0 bottom-0 bg-surface/92 px-4 py-3 text-ink">
              <p className="font-display text-xs font-semibold uppercase tracking-wide text-accent">
                Đã lưu trữ · Archived
              </p>
              <h1 className="font-display text-3xl font-bold leading-tight">{APP_NAME}</h1>
            </div>
          </figure>
          <p className="mt-5 text-pretty text-base leading-relaxed">
            Bộ truyện được cất lại đây. Tạm dừng — không thêm tranh hay mùa mới.
          </p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
            The collection is stored. Paused — no new pictures or seasons for now.
          </p>
          <Button type="button" variant="accent" size="lg" className="mt-6 min-w-[12rem] self-start font-display" onClick={() => setShelfOpen(true)}>
            Mở bản lưu
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-paper text-ink" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <audio ref={audioRef} preload="auto" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1 bg-border/80" aria-hidden="true">
        <div className="h-full bg-accent transition-[width] duration-300 ease-out" style={{ width: `${((page + progress) / pages.length) * 100}%` }} />
      </div>
      <header className="relative z-30 flex flex-col gap-2 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-lg font-semibold tracking-tight text-ink">{APP_NAME}</p>
          {ARCHIVED && (
            <button
              type="button"
              className="h-11 shrink-0 px-2 text-sm font-medium text-muted"
              onClick={() => {
                keepPlayingRef.current = false;
                audioRef.current?.pause();
                setPlaying(false);
                setShelfOpen(false);
              }}
            >
              {uiLang === "vi" ? "Cất lại" : "Shelve"}
            </button>
          )}
        </div>
        <RoundSelect
          id="series"
          label={uiLang === "vi" ? "Bộ truyện" : "Series"}
          value={seriesId}
          onChange={(value) => {
            keepPlayingRef.current = false;
            audioRef.current?.pause();
            setPlaying(false);
            const next = SERIES.find((item) => item.id === value) ?? SERIES[0];
            setSeriesId(next.id);
            setSeasonId(next.seasons[0].id);
            setPage(0);
            setImageReady(false);
            resetPair();
          }}
        >
          {SERIES.map((item) => (
            <option key={item.id} value={item.id}>
              {item[uiLang]}
            </option>
          ))}
        </RoundSelect>
        <div className="flex items-center gap-2">
          <RoundSelect
            id="season"
            label={uiLang === "vi" ? "Mùa" : "Season"}
            value={season.id}
            className="min-w-0 flex-1"
            onChange={(value) => {
              keepPlayingRef.current = false;
              audioRef.current?.pause();
              setPlaying(false);
              setSeasonId(value);
              setPage(0);
              setImageReady(false);
              resetPair();
            }}
          >
            {seasons.map((item) => (
              <option key={item.id} value={item.id}>
                {item[uiLang]}
              </option>
            ))}
          </RoundSelect>
          <RoundSelect
            id="vocab-level"
            label="Từ vựng"
            value={level}
            className="min-w-0 flex-1"
            onChange={(value) => {
              setLevel(value as LevelId);
              resetPair();
            }}
          >
            {LEVELS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.vi}
              </option>
            ))}
          </RoundSelect>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <PillToggle
            label={uiLang === "vi" ? "Chế độ" : "Mode"}
            value={mode}
            className="min-w-[13rem] flex-1"
            options={[
              { id: "normal", label: "Thường" },
              { id: "learn", label: "Học 2 ngôn ngữ" },
            ]}
            onChange={(next) => {
              setMode(next);
              resetPair();
            }}
          />
          {mode === "normal" && (
            <PillToggle
              label={lang === "vi" ? "Chọn tiếng" : "Language"}
              value={lang}
              options={[
                { id: "vi", label: "Việt" },
                { id: "en", label: "EN" },
              ]}
              onChange={(next) => {
                setLang(next);
                setProgress(0);
              }}
            />
          )}
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        <figure className="relative aspect-[4/3] max-h-[36vh] w-full overflow-hidden rounded-xl bg-surface-2 shadow-lg lg:max-h-[28rem]">
          {!imageReady && <div className="absolute inset-0 animate-pulse bg-surface-2" />}
          <img
            key={current.image}
            src={current.image}
            alt={title}
            className={cn("h-full w-full object-cover transition-opacity duration-500", imageReady ? "opacity-100" : "opacity-0")}
            onLoad={() => setImageReady(true)}
          />
          {isCover && (
            <div className="absolute inset-x-0 bottom-0 bg-surface/92 px-4 py-2 sm:px-5 sm:py-3 text-ink">
              <h1 className="font-display text-2xl font-bold leading-tight text-balance sm:text-4xl">{coverTitle}</h1>
              <p className="mt-0.5 text-xs text-muted sm:text-sm">
                {mode === "learn" ? `${tagline.en} · ${tagline.vi}` : tagline[lang]}
              </p>
            </div>
          )}
        </figure>
        <section className="flex flex-1 flex-col pt-3">
          {!isCover && (
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-accent">
              {page}/{lastPage} · {title}
            </p>
          )}
          {mode === "learn" ? (
            <div className="mt-2 flex flex-col gap-3 text-ink">
              <div className={cn("rounded-xl border px-3 py-2.5 transition-colors duration-150", speaking === "en" && playing ? "border-primary/40 bg-surface" : "border-border/80 bg-surface/60")}>
                <span className="font-display text-xs font-semibold tracking-wide text-primary">EN</span>
                <HighlightedText text={enText} progress={progress} active={playing && speaking === "en"} className={cn(speaking !== "en" && "text-muted")} />
              </div>
              <div className={cn("rounded-xl border px-3 py-2.5 transition-colors duration-150", speaking === "vi" && playing ? "border-accent/50 bg-surface" : "border-border/80 bg-surface/60")}>
                <span className="font-display text-xs font-semibold tracking-wide text-accent">VI</span>
                <HighlightedText text={viText} progress={progress} active={playing && speaking === "vi"} className={cn(speaking !== "vi" && "text-muted")} />
              </div>
            </div>
          ) : (
            <div className="mt-2 text-ink">
              <HighlightedText text={singleText} progress={progress} active={playing} />
            </div>
          )}
          <LexiconPanel
            rows={lexicon}
            seriesId={series.id}
            seriesEn={series.en}
            seasonId={season.id}
            seasonEn={season.en}
            pageId={current.id}
            pageEn={current.title.en}
            level={level}
            uiLang={uiLang}
            lexiconLabel={lexiconLabel}
          />
          <div className="sticky bottom-0 z-10 mt-auto bg-paper/95 pt-3">
            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="accent" size={isCover ? "xl" : "lg"} className={cn("font-display", isCover ? "min-w-[12rem]" : "min-w-[8.5rem]")} onClick={toggle} aria-label={playText}>
                <span className="relative inline-flex size-5 items-center justify-center">
                  <Play className={cn("absolute size-5 fill-current transition-[opacity,transform,filter] duration-300", playing ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none")} aria-hidden="true" />
                  <Pause className={cn("absolute size-5 fill-current transition-[opacity,transform,filter] duration-300", playing ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]")} aria-hidden="true" />
                </span>
                {playText}
              </Button>
              {page === lastPage && (
                <Button type="button" variant="secondary" size="lg" onClick={() => { keepPlayingRef.current = false; goTo(0); }}>
                  <RotateCcw className="size-4" aria-hidden="true" />
                  {uiLang === "vi" ? "Đọc lại" : "Start over"}
                </Button>
              )}
            </div>
            <nav className="mt-3 flex items-center justify-between gap-3" aria-label={uiLang === "vi" ? "Chuyển trang" : "Page"}>
              <Button type="button" variant="secondary" size="icon" className="size-12" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label={uiLang === "vi" ? "Trang trước" : "Previous page"}>
                <ChevronLeft className="size-6" aria-hidden="true" />
              </Button>
              <ol className="flex min-w-0 flex-1 items-center justify-center">
                {pages.map((item, index) => (
                  <li key={item.id}>
                    <button type="button" aria-label={item.title[uiLang]} aria-current={index === page ? "page" : undefined} onClick={() => goTo(index)} className="flex h-11 w-5 items-center justify-center sm:w-6">
                      <span className={cn("size-2 rounded-full transition-[transform,background-color] duration-200 sm:size-2.5", index === page ? "scale-125 bg-accent" : "bg-border hover:bg-muted")} />
                    </button>
                  </li>
                ))}
              </ol>
              <Button type="button" variant="secondary" size="icon" className="size-12" onClick={() => goTo(page + 1)} disabled={page === lastPage} aria-label={uiLang === "vi" ? "Trang sau" : "Next page"}>
                <ChevronRight className="size-6" aria-hidden="true" />
              </Button>
            </nav>
          </div>
        </section>
      </main>
    </div>
  );
}
