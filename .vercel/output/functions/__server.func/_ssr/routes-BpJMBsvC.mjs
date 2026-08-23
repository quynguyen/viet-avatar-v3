import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronRight, c as BookOpen, i as Pause, n as RotateCcw, o as ChevronLeft, r as Play, s as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as SERIES, i as LEVELS, n as APP_NAME, o as audioPath, r as ARCHIVED } from "./router-BtKcQdK7.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BpJMBsvC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium select-none transition-[transform,opacity,background-color,color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-sm hover:opacity-90",
			accent: "bg-accent text-accent-foreground shadow-sm hover:opacity-90",
			secondary: "bg-surface text-ink border border-border hover:bg-surface-2",
			ghost: "text-ink hover:bg-surface-2/80",
			outline: "border border-border bg-transparent text-ink hover:bg-surface"
		},
		size: {
			default: "h-11 px-5 text-sm",
			sm: "h-9 px-3 text-sm",
			lg: "h-14 px-7 text-base",
			icon: "size-11",
			xl: "h-16 px-8 text-lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function HighlightedText({ text, progress, active, className }) {
	const tokens = text.split(/(\s+)/);
	const wordCount = tokens.filter((t) => t.trim().length > 0).length || 1;
	const current = active ? Math.min(wordCount - 1, Math.floor(progress * wordCount)) : -1;
	let wordIndex = -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-pretty text-base leading-relaxed sm:text-lg", className),
		children: tokens.map((token, i) => {
			if (!token.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: token }, i);
			wordIndex += 1;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("rounded-sm transition-colors duration-150", wordIndex === current && "bg-primary/20 text-primary", wordIndex < current && "text-ink/80"),
				children: token
			}, i);
		})
	});
}
function PillToggle({ label, value, options, onChange, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-11 min-w-0 items-center rounded-full border border-border bg-surface p-1", className),
		role: "group",
		"aria-label": label,
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-pressed": value === option.id,
			onClick: () => onChange(option.id),
			className: cn("h-9 min-w-0 flex-1 rounded-full px-3 text-sm font-medium transition-[background-color,color] duration-150", value === option.id ? "bg-primary text-primary-foreground" : "text-muted hover:text-ink"),
			children: option.label
		}, option.id))
	});
}
function RoundSelect({ id, label, value, onChange, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative min-w-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			id,
			"aria-label": label,
			value,
			onChange: (event) => onChange(event.target.value),
			className: "h-11 w-full appearance-none rounded-full border border-border bg-surface py-0 pl-3 pr-9 text-sm font-medium text-ink",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
			className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted",
			"aria-hidden": "true"
		})]
	});
}
function Storybook() {
	const [seriesId, setSeriesId] = (0, import_react.useState)("sonic");
	const [seasonId, setSeasonId] = (0, import_react.useState)("so2");
	const [page, setPage] = (0, import_react.useState)(0);
	const [lang, setLang] = (0, import_react.useState)("vi");
	const [mode, setMode] = (0, import_react.useState)("normal");
	const [level, setLevel] = (0, import_react.useState)("preschool");
	const [phase, setPhase] = (0, import_react.useState)("en");
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [imageReady, setImageReady] = (0, import_react.useState)(false);
	const [lexOpen, setLexOpen] = (0, import_react.useState)(false);
	const [shelfOpen, setShelfOpen] = (0, import_react.useState)(false);
	const audioRef = (0, import_react.useRef)(null);
	const keepPlayingRef = (0, import_react.useRef)(false);
	const touchXRef = (0, import_react.useRef)(null);
	const pageRef = (0, import_react.useRef)(0);
	const phaseRef = (0, import_react.useRef)("en");
	const modeRef = (0, import_react.useRef)("normal");
	const lastPageRef = (0, import_react.useRef)(0);
	const series = (0, import_react.useMemo)(() => SERIES.find((item) => item.id === seriesId) ?? SERIES[0], [seriesId]);
	const seasons = series.seasons;
	const season = (0, import_react.useMemo)(() => seasons.find((item) => item.id === seasonId) ?? seasons[0], [seasons, seasonId]);
	const pages = season.pages;
	const lastPage = pages.length - 1;
	const current = pages[Math.min(page, lastPage)];
	pageRef.current = page;
	phaseRef.current = phase;
	modeRef.current = mode;
	lastPageRef.current = lastPage;
	const isCover = page === 0;
	const speaking = mode === "learn" ? phase : lang;
	const audioSrc = audioPath(level, speaking, current.file);
	const title = current.title[mode === "learn" ? "vi" : lang];
	const uiLang = mode === "learn" ? "vi" : lang;
	const tagline = season.tagline;
	const coverTitle = series.coverTitle[uiLang];
	const lexicon = current.lexicon[level] ?? [];
	const levelName = LEVELS.find((item) => item.id === level);
	const levelShortVi = levelName?.vi.split(" (")[0] ?? "";
	const levelShortEn = levelName?.en ?? "";
	const lexiconLabel = uiLang === "vi" ? `Từ điển · ${levelShortVi}` : `Lexicon · ${levelShortEn}`;
	const goTo = (0, import_react.useCallback)((next) => {
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
			setLexOpen(false);
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
	const play = (0, import_react.useCallback)(() => {
		keepPlayingRef.current = true;
		const el = audioRef.current;
		if (!el) return;
		el.play().then(() => setPlaying(true), () => {
			setPlaying(false);
			keepPlayingRef.current = false;
		});
	}, []);
	const pause = (0, import_react.useCallback)(() => {
		keepPlayingRef.current = false;
		audioRef.current?.pause();
		setPlaying(false);
	}, []);
	const toggle = (0, import_react.useCallback)(() => {
		if (playing) pause();
		else play();
	}, [
		playing,
		pause,
		play
	]);
	(0, import_react.useEffect)(() => {
		const el = audioRef.current;
		if (!el) return;
		el.src = audioSrc;
		el.load();
		setProgress(0);
		const onCanPlay = () => {
			if (keepPlayingRef.current) el.play().then(() => setPlaying(true), () => {
				setPlaying(false);
				keepPlayingRef.current = false;
			});
		};
		el.addEventListener("canplay", onCanPlay, { once: true });
		return () => {
			el.removeEventListener("canplay", onCanPlay);
			el.pause();
		};
	}, [page, audioSrc]);
	(0, import_react.useEffect)(() => {
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
			} else keepPlayingRef.current = false;
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
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
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
	}, [
		goTo,
		page,
		toggle
	]);
	const onTouchStart = (event) => {
		if (event.target instanceof HTMLElement && event.target.closest("button, select, [data-lexicon]")) return;
		touchXRef.current = event.changedTouches[0]?.clientX ?? null;
	};
	const onTouchEnd = (event) => {
		const start = touchXRef.current;
		touchXRef.current = null;
		if (start == null) return;
		const delta = event.changedTouches[0].clientX - start;
		if (delta < -56) goTo(page + 1);
		if (delta > 56) goTo(page - 1);
	};
	const playText = playing ? uiLang === "vi" ? "Dừng" : "Pause" : isCover ? uiLang === "vi" ? "Nghe chuyện" : "Listen" : uiLang === "vi" ? "Đọc" : "Play";
	const viText = current.text[level].vi;
	const enText = current.text[level].en;
	const singleText = current.text[level][lang];
	if (ARCHIVED && !shelfOpen) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh flex-col bg-paper text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-2 shadow-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/illustrations/s1-00.jpg",
						alt: "",
						className: "h-full w-full object-cover opacity-50"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 bg-surface/92 px-4 py-3 text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs font-semibold uppercase tracking-wide text-accent",
							children: "Đã lưu trữ · Archived"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-bold leading-tight",
							children: APP_NAME
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-pretty text-base leading-relaxed",
					children: "Bộ truyện được cất lại đây. Tạm dừng — không thêm tranh hay mùa mới."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-pretty text-sm leading-relaxed text-muted",
					children: "The collection is stored. Paused — no new pictures or seasons for now."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "accent",
					size: "lg",
					className: "mt-6 min-w-[12rem] self-start font-display",
					onClick: () => setShelfOpen(true),
					children: "Mở bản lưu"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh flex-col bg-paper text-ink",
		onTouchStart,
		onTouchEnd,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				ref: audioRef,
				preload: "auto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 z-20 h-1 bg-border/80",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent transition-[width] duration-300 ease-out",
					style: { width: `${(page + progress) / pages.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-30 flex flex-col gap-2 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold tracking-tight text-ink",
							children: APP_NAME
						}), ARCHIVED && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 shrink-0 px-2 text-sm font-medium text-muted",
							onClick: () => {
								keepPlayingRef.current = false;
								audioRef.current?.pause();
								setPlaying(false);
								setShelfOpen(false);
							},
							children: uiLang === "vi" ? "Cất lại" : "Shelve"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundSelect, {
						id: "series",
						label: uiLang === "vi" ? "Bộ truyện" : "Series",
						value: seriesId,
						onChange: (value) => {
							keepPlayingRef.current = false;
							audioRef.current?.pause();
							setPlaying(false);
							const next = SERIES.find((item) => item.id === value) ?? SERIES[0];
							setSeriesId(next.id);
							setSeasonId(next.seasons[0].id);
							setPage(0);
							setImageReady(false);
							setLexOpen(false);
							resetPair();
						},
						children: SERIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item[uiLang]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundSelect, {
							id: "season",
							label: uiLang === "vi" ? "Mùa" : "Season",
							value: season.id,
							className: "min-w-0 flex-1",
							onChange: (value) => {
								keepPlayingRef.current = false;
								audioRef.current?.pause();
								setPlaying(false);
								setSeasonId(value);
								setPage(0);
								setImageReady(false);
								setLexOpen(false);
								resetPair();
							},
							children: seasons.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item[uiLang]
							}, item.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundSelect, {
							id: "vocab-level",
							label: "Từ vựng",
							value: level,
							className: "min-w-0 flex-1",
							onChange: (value) => {
								setLevel(value);
								resetPair();
							},
							children: LEVELS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.vi
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillToggle, {
							label: uiLang === "vi" ? "Chế độ" : "Mode",
							value: mode,
							className: "min-w-[13rem] flex-1",
							options: [{
								id: "normal",
								label: "Thường"
							}, {
								id: "learn",
								label: "Học 2 ngôn ngữ"
							}],
							onChange: (next) => {
								setMode(next);
								resetPair();
							}
						}), mode === "normal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PillToggle, {
							label: lang === "vi" ? "Chọn tiếng" : "Language",
							value: lang,
							options: [{
								id: "vi",
								label: "Việt"
							}, {
								id: "en",
								label: "EN"
							}],
							onChange: (next) => {
								setLang(next);
								setProgress(0);
							}
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "relative aspect-[4/3] max-h-[36vh] w-full overflow-hidden rounded-xl bg-surface-2 shadow-lg lg:max-h-[28rem]",
					children: [
						!imageReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 animate-pulse bg-surface-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: current.image,
							alt: title,
							className: cn("h-full w-full object-cover transition-opacity duration-500", imageReady ? "opacity-100" : "opacity-0"),
							onLoad: () => setImageReady(true)
						}, current.image),
						isCover && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 bg-surface/92 px-4 py-2 sm:px-5 sm:py-3 text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold leading-tight text-balance sm:text-4xl",
								children: coverTitle
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted sm:text-sm",
								children: mode === "learn" ? `${tagline.en} · ${tagline.vi}` : tagline[lang]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-1 flex-col pt-3",
					children: [
						!isCover && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-sm font-semibold uppercase tracking-wide text-accent",
							children: [
								page,
								"/",
								lastPage,
								" · ",
								title
							]
						}),
						mode === "learn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-col gap-3 text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-xl border px-3 py-2.5 transition-colors duration-150", speaking === "en" && playing ? "border-primary/40 bg-surface" : "border-border/80 bg-surface/60"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xs font-semibold tracking-wide text-primary",
									children: "EN"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedText, {
									text: enText,
									progress,
									active: playing && speaking === "en",
									className: cn(speaking !== "en" && "text-muted")
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-xl border px-3 py-2.5 transition-colors duration-150", speaking === "vi" && playing ? "border-accent/50 bg-surface" : "border-border/80 bg-surface/60"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xs font-semibold tracking-wide text-accent",
									children: "VI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedText, {
									text: viText,
									progress,
									active: playing && speaking === "vi",
									className: cn(speaking !== "vi" && "text-muted")
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedText, {
								text: singleText,
								progress,
								active: playing
							})
						}),
						lexicon.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("mt-3", lexOpen && "pb-28"),
							"data-lexicon": true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-expanded": lexOpen,
								"aria-controls": "page-lexicon",
								onClick: () => setLexOpen((open) => !open),
								className: "flex h-11 w-full items-center justify-between rounded-full border border-border bg-surface px-4 text-sm font-medium text-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex min-w-0 items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
										className: "size-4 shrink-0 text-accent",
										"aria-hidden": "true"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: lexiconLabel
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
									className: cn("size-4 shrink-0 text-muted transition-transform duration-200", lexOpen && "rotate-180"),
									"aria-hidden": "true"
								})]
							}), lexOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								id: "page-lexicon",
								className: "mt-2 overflow-hidden rounded-xl border border-border bg-surface",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full table-fixed text-left text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
											className: "sr-only",
											children: uiLang === "vi" ? "Từ và thành ngữ: English — Nam Bộ" : "Words and phrases: English — Southern Vietnamese"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-border bg-surface-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "w-1/2 px-3 py-2 font-display text-xs font-semibold tracking-wide text-primary",
												children: "English"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "w-1/2 px-3 py-2 font-display text-xs font-semibold tracking-wide text-accent",
												children: "Nam Bộ"
											})]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: lexicon.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-border/70 last:border-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 align-top text-pretty text-ink",
												children: row.en
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-3 py-2 align-top text-pretty text-ink",
												children: row.vi
											})]
										}, `${row.en}-${row.vi}`)) })
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky bottom-0 z-10 mt-auto bg-paper/95 pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "accent",
									size: isCover ? "xl" : "lg",
									className: cn("font-display", isCover ? "min-w-[12rem]" : "min-w-[8.5rem]"),
									onClick: toggle,
									"aria-label": playText,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative inline-flex size-5 items-center justify-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
											className: cn("absolute size-5 fill-current transition-[opacity,transform,filter] duration-300", playing ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"),
											"aria-hidden": "true"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
											className: cn("absolute size-5 fill-current transition-[opacity,transform,filter] duration-300", playing ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"),
											"aria-hidden": "true"
										})]
									}), playText]
								}), page === lastPage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "secondary",
									size: "lg",
									onClick: () => {
										keepPlayingRef.current = false;
										goTo(0);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										className: "size-4",
										"aria-hidden": "true"
									}), uiLang === "vi" ? "Đọc lại" : "Start over"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "mt-3 flex items-center justify-between gap-3",
								"aria-label": uiLang === "vi" ? "Chuyển trang" : "Page",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "icon",
										className: "size-12",
										onClick: () => goTo(page - 1),
										disabled: page === 0,
										"aria-label": uiLang === "vi" ? "Trang trước" : "Previous page",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
											className: "size-6",
											"aria-hidden": "true"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "flex min-w-0 flex-1 items-center justify-center",
										children: pages.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": item.title[uiLang],
											"aria-current": index === page ? "page" : void 0,
											onClick: () => goTo(index),
											className: "flex h-11 w-5 items-center justify-center sm:w-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full transition-[transform,background-color] duration-200 sm:size-2.5", index === page ? "scale-125 bg-accent" : "bg-border hover:bg-muted") })
										}) }, item.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "secondary",
										size: "icon",
										className: "size-12",
										onClick: () => goTo(page + 1),
										disabled: page === lastPage,
										"aria-label": uiLang === "vi" ? "Trang sau" : "Next page",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
											className: "size-6",
											"aria-hidden": "true"
										})
									})
								]
							})]
						})
					]
				})]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Storybook, {});
}
//#endregion
export { Home as component };
