import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BtKcQdK7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var story_default = {
	appName: "Truyện Avatar",
	archived: false,
	tagline: {
		"vi": "Nhiều bộ truyện",
		"en": "Many stories"
	},
	levels: [
		{
			"id": "preschool",
			"vi": "Mẫu giáo (< 5)",
			"en": "Preschool"
		},
		{
			"id": "primary",
			"vi": "Tiểu học (5–9)",
			"en": "Primary"
		},
		{
			"id": "intermediate",
			"vi": "Trung học (9–13)",
			"en": "Intermediate"
		},
		{
			"id": "senior",
			"vi": "Cao cấp (13+)",
			"en": "Senior"
		}
	],
	series: [
		{
			"id": "atla",
			"vi": "Avatar Aang",
			"en": "Avatar Aang",
			"coverTitle": {
				"vi": "Truyện Aang",
				"en": "Aang's Story"
			},
			"seasons": [
				{
					"id": "s1",
					"vi": "Mùa 1 · Nước",
					"en": "Season 1 · Water",
					"tagline": {
						"vi": "Aang học nước",
						"en": "Aang learns water"
					},
					"pages": [
						{
							"id": "s1-cover",
							"image": "/illustrations/s1-00.jpg",
							"file": "s1-page-00",
							"title": {
								"vi": "Mùa nước",
								"en": "Water Season"
							},
							"text": {
								"preschool": {
									"vi": "Đây là chuyện Aang. Mùa một. Mùa nước. Aang học làm nước.",
									"en": "This is Aang. Season one. The water season. Aang learns to move water."
								},
								"primary": {
									"vi": "Đây là mùa một của Aang. Aang phải học điều khiển nước. Bạn bè đi cùng cậu.",
									"en": "This is Aang's first season. Aang must learn to move water. His friends go with him."
								},
								"intermediate": {
									"vi": "Mùa nước bắt đầu ở cực Nam. Aang, Katara và Sokka lên đường. Cậu phải học thủy thuật trước khi sao chổi tới.",
									"en": "The Water season begins at the South Pole. Aang, Katara, and Sokka set out. He must learn waterbending before the comet comes."
								},
								"senior": {
									"vi": "Mùa nước mở ra trên băng trắng. Aang — đứa trẻ vừa tỉnh sau trăm năm ngủ — phải học sóng, như gió đã từng là hơi thở của cậu.",
									"en": "The Water season opens on white ice. Aang — a child just waking from a hundred-year sleep — must learn the wave, as the wind had once been his breath."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Aang",
										"vi": "Đây là chuyện Aang"
									},
									{
										"en": "Season one",
										"vi": "Mùa một"
									},
									{
										"en": "The water season",
										"vi": "Mùa nước"
									},
									{
										"en": "Aang learns to move water",
										"vi": "Aang học làm nước"
									},
									{
										"en": "to move water",
										"vi": "làm nước"
									},
									{
										"en": "move water",
										"vi": "làm nước"
									},
									{
										"en": "learns to move water",
										"vi": "học làm nước"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "This is Aang's first season",
										"vi": "Đây là mùa một của Aang"
									},
									{
										"en": "Aang must learn to move water",
										"vi": "Aang phải học điều khiển nước"
									},
									{
										"en": "His friends go with him",
										"vi": "Bạn bè đi cùng cậu"
									},
									{
										"en": "to move water",
										"vi": "làm nước"
									},
									{
										"en": "move water",
										"vi": "làm nước"
									},
									{
										"en": "first season",
										"vi": "mùa một"
									},
									{
										"en": "must learn",
										"vi": "phải học"
									},
									{
										"en": "go with him",
										"vi": "đi cùng cậu"
									}
								],
								"intermediate": [
									{
										"en": "waterbending",
										"vi": "thủy thuật"
									},
									{
										"en": "The Water season begins at the South Pole",
										"vi": "Mùa nước bắt đầu ở cực Nam"
									},
									{
										"en": "Aang, Katara, and Sokka set out",
										"vi": "Aang, Katara và Sokka lên đường"
									},
									{
										"en": "He must learn waterbending before the comet comes",
										"vi": "Cậu phải học thủy thuật trước khi sao chổi tới"
									},
									{
										"en": "the water season",
										"vi": "mùa nước"
									},
									{
										"en": "must learn",
										"vi": "phải học"
									},
									{
										"en": "South Pole",
										"vi": "cực Nam"
									},
									{
										"en": "set out",
										"vi": "lên đường"
									},
									{
										"en": "before the comet comes",
										"vi": "trước khi sao chổi tới"
									},
									{
										"en": "the comet",
										"vi": "sao chổi"
									}
								],
								"senior": [
									{
										"en": "The Water season opens on white ice",
										"vi": "Mùa nước mở ra trên băng trắng"
									},
									{
										"en": "Aang — a child just waking from a hundred-year sleep — must learn the wave, as the wind had once been his breath",
										"vi": "Aang — đứa trẻ vừa tỉnh sau trăm năm ngủ — phải học sóng, như gió đã từng là hơi thở của cậu"
									},
									{
										"en": "the water season",
										"vi": "mùa nước"
									},
									{
										"en": "must learn",
										"vi": "phải học"
									},
									{
										"en": "white ice",
										"vi": "băng trắng"
									},
									{
										"en": "a hundred-year sleep",
										"vi": "trăm năm ngủ"
									},
									{
										"en": "must learn the wave",
										"vi": "phải học sóng"
									},
									{
										"en": "his breath",
										"vi": "hơi thở"
									}
								]
							}
						},
						{
							"id": "s1-ice",
							"image": "/illustrations/s1-01.jpg",
							"file": "s1-page-01",
							"title": {
								"vi": "Ngủ trong băng",
								"en": "Sleep in Ice"
							},
							"text": {
								"preschool": {
									"vi": "Aang sợ. Aang chạy với Appa. Hai bạn rớt xuống nước. Nước lạnh lắm. Hai bạn ngủ trong đá lạnh. Ngủ lâu lắm.",
									"en": "Aang was scared. Aang ran with Appa. They fell in the water. The water was so cold. They slept in the ice. They slept a long, long time."
								},
								"primary": {
									"vi": "Aang sợ hãi và chạy đi cùng Appa. Họ rơi xuống biển lạnh. Họ ngủ trong tảng băng rất, rất lâu.",
									"en": "Aang was afraid and ran away with Appa. They fell into the cold sea. They slept inside the ice for a very, very long time."
								},
								"intermediate": {
									"vi": "Khi chiến tranh ập đến, Aang trốn cùng Appa. Cả hai rơi xuống biển và bị phong trong tảng băng. Họ ngủ trong đó một trăm năm.",
									"en": "When war came, Aang fled with Appa. Both fell into the sea and were sealed in an iceberg. They slept inside it for a hundred years."
								},
								"senior": {
									"vi": "Nỗi sợ đẩy Aang và Appa ra khơi. Biển nuốt lấy họ. Họ ngủ trong lòng băng một trăm năm — hai linh hồn mà thế giới tưởng đã mất.",
									"en": "Fear drove Aang and Appa out to sea. The ocean swallowed them. They slept within the ice for a hundred years — two souls the world thought it had lost."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "Aang was scared",
										"vi": "Aang sợ"
									},
									{
										"en": "Aang ran with Appa",
										"vi": "Aang chạy với Appa"
									},
									{
										"en": "They fell in the water",
										"vi": "Hai bạn rớt xuống nước"
									},
									{
										"en": "The water was so cold",
										"vi": "Nước lạnh lắm"
									},
									{
										"en": "They slept in the ice",
										"vi": "Hai bạn ngủ trong đá lạnh"
									},
									{
										"en": "They slept a long, long time",
										"vi": "Ngủ lâu lắm"
									},
									{
										"en": "was scared",
										"vi": "sợ"
									},
									{
										"en": "so cold",
										"vi": "lạnh lắm"
									},
									{
										"en": "a long, long time",
										"vi": "lâu lắm"
									},
									{
										"en": "slept in the ice",
										"vi": "ngủ trong đá lạnh"
									}
								],
								"primary": [
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "Aang was afraid and ran away with Appa",
										"vi": "Aang sợ hãi và chạy đi cùng Appa"
									},
									{
										"en": "They fell into the cold sea",
										"vi": "Họ rơi xuống biển lạnh"
									},
									{
										"en": "They slept inside the ice for a very, very long time",
										"vi": "Họ ngủ trong tảng băng rất, rất lâu"
									},
									{
										"en": "was afraid",
										"vi": "sợ hãi"
									},
									{
										"en": "cold sea",
										"vi": "biển lạnh"
									},
									{
										"en": "a very, very long time",
										"vi": "rất, rất lâu"
									}
								],
								"intermediate": [
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "When war came, Aang fled with Appa",
										"vi": "Khi chiến tranh ập đến, Aang trốn cùng Appa"
									},
									{
										"en": "Both fell into the sea and were sealed in an iceberg",
										"vi": "Cả hai rơi xuống biển và bị phong trong tảng băng"
									},
									{
										"en": "They slept inside it for a hundred years",
										"vi": "Họ ngủ trong đó một trăm năm"
									},
									{
										"en": "when war came",
										"vi": "khi chiến tranh ập đến"
									},
									{
										"en": "sealed in an iceberg",
										"vi": "phong trong tảng băng"
									},
									{
										"en": "an iceberg",
										"vi": "tảng băng"
									},
									{
										"en": "a hundred years",
										"vi": "một trăm năm"
									}
								],
								"senior": [
									{
										"en": "Fear drove Aang and Appa out to sea",
										"vi": "Nỗi sợ đẩy Aang và Appa ra khơi"
									},
									{
										"en": "The ocean swallowed them",
										"vi": "Biển nuốt lấy họ"
									},
									{
										"en": "They slept within the ice for a hundred years — two souls the world thought it had lost",
										"vi": "Họ ngủ trong lòng băng một trăm năm — hai linh hồn mà thế giới tưởng đã mất"
									},
									{
										"en": "a hundred years",
										"vi": "một trăm năm"
									},
									{
										"en": "two souls",
										"vi": "hai linh hồn"
									}
								]
							}
						},
						{
							"id": "s1-found",
							"image": "/illustrations/s1-02.jpg",
							"file": "s1-page-02",
							"title": {
								"vi": "Bạn mới",
								"en": "New Friends"
							},
							"text": {
								"preschool": {
									"vi": "Katara câu cá. Sokka đi theo. Họ thấy ánh sáng trong đá. Katara làm nước. Đá lạnh bể. Aang nhảy ra. Aang cười.",
									"en": "Katara was fishing. Sokka came too. They saw a light in the ice. Katara moved the water. The ice broke. Aang jumped out. Aang smiled."
								},
								"primary": {
									"vi": "Katara và Sokka thấy ánh sáng trong tảng băng. Katara điều khiển nước. Băng vỡ. Aang nhảy ra, cười, và ba người thành bạn.",
									"en": "Katara and Sokka saw a light in the ice. Katara moved the water. The ice broke. Aang jumped out, smiling, and the three became friends."
								},
								"intermediate": {
									"vi": "Ở cực Nam, Katara câu cá thì gặp tảng băng phát sáng. Sokka đứng cạnh. Katara dùng thủy thuật làm vỡ băng. Aang bước ra như vừa tỉnh một giấc mơ.",
									"en": "At the South Pole, Katara was fishing when she found a glowing iceberg. Sokka stood beside her. Katara used waterbending to crack the ice. Aang stepped out as if waking from a dream."
								},
								"senior": {
									"vi": "Katara, thủy nhân trẻ của Thủy tộc phương Nam, nhìn thấy ánh sáng ngủ trong băng. Sokka — anh trai hay lo — đứng đó. Cô gọi nước lên. Băng vỡ. Aang cười, và thế giới, sau trăm năm, thở lại.",
									"en": "Katara, a young waterbender of the Southern Water Tribe, saw a light sleeping in the ice. Sokka — her watchful brother — stood there. She called the water. The iceberg gave way. Aang smiled, and after a hundred years, the world breathed again."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "Katara was fishing",
										"vi": "Katara câu cá"
									},
									{
										"en": "Sokka came too",
										"vi": "Sokka đi theo"
									},
									{
										"en": "They saw a light in the ice",
										"vi": "Họ thấy ánh sáng trong đá"
									},
									{
										"en": "Katara moved the water",
										"vi": "Katara làm nước"
									},
									{
										"en": "The ice broke",
										"vi": "Đá lạnh bể"
									},
									{
										"en": "Aang jumped out",
										"vi": "Aang nhảy ra"
									},
									{
										"en": "Aang smiled",
										"vi": "Aang cười"
									},
									{
										"en": "jumped out",
										"vi": "nhảy ra"
									},
									{
										"en": "moved the water",
										"vi": "làm nước"
									},
									{
										"en": "came too",
										"vi": "tới nữa"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Katara and Sokka saw a light in the ice",
										"vi": "Katara và Sokka thấy ánh sáng trong tảng băng"
									},
									{
										"en": "Katara moved the water",
										"vi": "Katara điều khiển nước"
									},
									{
										"en": "The ice broke",
										"vi": "Băng vỡ"
									},
									{
										"en": "Aang jumped out, smiling, and the three became friends",
										"vi": "Aang nhảy ra, cười, và ba người thành bạn"
									},
									{
										"en": "jumped out",
										"vi": "nhảy ra"
									},
									{
										"en": "moved the water",
										"vi": "làm nước"
									}
								],
								"intermediate": [
									{
										"en": "waterbending",
										"vi": "thủy thuật"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "At the South Pole, Katara was fishing when she found a glowing iceberg",
										"vi": "Ở cực Nam, Katara câu cá thì gặp tảng băng phát sáng"
									},
									{
										"en": "Sokka stood beside her",
										"vi": "Sokka đứng cạnh"
									},
									{
										"en": "Katara used waterbending to crack the ice",
										"vi": "Katara dùng thủy thuật làm vỡ băng"
									},
									{
										"en": "Aang stepped out as if waking from a dream",
										"vi": "Aang bước ra như vừa tỉnh một giấc mơ"
									},
									{
										"en": "South Pole",
										"vi": "cực Nam"
									},
									{
										"en": "glowing iceberg",
										"vi": "tảng băng phát sáng"
									},
									{
										"en": "used waterbending",
										"vi": "dùng thủy thuật"
									}
								],
								"senior": [
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Katara, a young waterbender of the Southern Water Tribe, saw a light sleeping in the ice",
										"vi": "Katara, thủy nhân trẻ của Thủy tộc phương Nam, nhìn thấy ánh sáng ngủ trong băng"
									},
									{
										"en": "Sokka — her watchful brother — stood there",
										"vi": "Sokka — anh trai hay lo — đứng đó"
									},
									{
										"en": "She called the water",
										"vi": "Cô gọi nước lên"
									},
									{
										"en": "The iceberg gave way",
										"vi": "Băng vỡ"
									},
									{
										"en": "Aang smiled, and after a hundred years, the world breathed again",
										"vi": "Aang cười, và thế giới, sau trăm năm, thở lại"
									},
									{
										"en": "a hundred years",
										"vi": "một trăm năm"
									},
									{
										"en": "Southern Water Tribe",
										"vi": "Thủy tộc phương Nam"
									},
									{
										"en": "young waterbender",
										"vi": "thủy nhân trẻ"
									}
								]
							}
						},
						{
							"id": "s1-village",
							"image": "/illustrations/s1-03.jpg",
							"file": "s1-page-03",
							"title": {
								"vi": "Làng tuyết",
								"en": "Snow Village"
							},
							"text": {
								"preschool": {
									"vi": "Có làng tuyết. Có bà nội. Có nhiều bạn. Aang chơi. Appa ăn tuyết. Mọi người vui.",
									"en": "There is a snow village. There is a grandma. There are friends. Aang played. Appa ate snow. Everyone was happy."
								},
								"primary": {
									"vi": "Aang tới làng Thủy tộc phương Nam. Bà nội rất hiền. Trẻ con chơi với Aang. Appa nằm trên tuyết.",
									"en": "Aang came to the Southern Water Tribe village. Grandma was very kind. The children played with Aang. Appa lay down on the snow."
								},
								"intermediate": {
									"vi": "Làng nhỏ trên băng chào đón Aang. Bà nội kể chuyện xưa. Aang chưa biết mình đã ngủ một trăm năm. Sokka vẫn chưa tin cậu bé bay được.",
									"en": "A small village on the ice welcomed Aang. Grandma told old stories. Aang did not yet know he had slept a hundred years. Sokka still did not believe the boy could fly."
								},
								"senior": {
									"vi": "Làng tuyết phương Nam — ít người, nhiều gió. Họ giữ Aang như giữ một ngọn lửa nhỏ. Cậu chưa hiểu thời gian đã đi xa. Appa thở hơi ấm lên tuyết, và trẻ con cười.",
									"en": "The Southern snow village — few people, much wind. They kept Aang the way one keeps a small flame. He did not yet understand how far time had gone. Appa breathed warmth onto the snow, and the children laughed."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "grandma",
										"vi": "bà nội"
									},
									{
										"en": "There is a snow village",
										"vi": "Có làng tuyết"
									},
									{
										"en": "There is a grandma",
										"vi": "Có bà nội"
									},
									{
										"en": "There are friends",
										"vi": "Có nhiều bạn"
									},
									{
										"en": "Aang played",
										"vi": "Aang chơi"
									},
									{
										"en": "Appa ate snow",
										"vi": "Appa ăn tuyết"
									},
									{
										"en": "Everyone was happy",
										"vi": "Mọi người vui"
									},
									{
										"en": "snow village",
										"vi": "làng tuyết"
									}
								],
								"primary": [
									{
										"en": "grandma",
										"vi": "bà nội"
									},
									{
										"en": "Aang came to the Southern Water Tribe village",
										"vi": "Aang tới làng Thủy tộc phương Nam"
									},
									{
										"en": "Grandma was very kind",
										"vi": "Bà nội rất hiền"
									},
									{
										"en": "The children played with Aang",
										"vi": "Trẻ con chơi với Aang"
									},
									{
										"en": "Appa lay down on the snow",
										"vi": "Appa nằm trên tuyết"
									},
									{
										"en": "lay down",
										"vi": "nằm"
									},
									{
										"en": "Southern Water Tribe",
										"vi": "Thủy tộc phương Nam"
									}
								],
								"intermediate": [
									{
										"en": "grandma",
										"vi": "bà nội"
									},
									{
										"en": "A small village on the ice welcomed Aang",
										"vi": "Làng nhỏ trên băng chào đón Aang"
									},
									{
										"en": "Grandma told old stories",
										"vi": "Bà nội kể chuyện xưa"
									},
									{
										"en": "Aang did not yet know he had slept a hundred years",
										"vi": "Aang chưa biết mình đã ngủ một trăm năm"
									},
									{
										"en": "Sokka still did not believe the boy could fly",
										"vi": "Sokka vẫn chưa tin cậu bé bay được"
									},
									{
										"en": "a hundred years",
										"vi": "một trăm năm"
									}
								],
								"senior": [
									{
										"en": "The Southern snow village — few people, much wind",
										"vi": "Làng tuyết phương Nam — ít người, nhiều gió"
									},
									{
										"en": "They kept Aang the way one keeps a small flame",
										"vi": "Họ giữ Aang như giữ một ngọn lửa nhỏ"
									},
									{
										"en": "He did not yet understand how far time had gone",
										"vi": "Cậu chưa hiểu thời gian đã đi xa"
									},
									{
										"en": "Appa breathed warmth onto the snow, and the children laughed",
										"vi": "Appa thở hơi ấm lên tuyết, và trẻ con cười"
									},
									{
										"en": "snow village",
										"vi": "làng tuyết"
									}
								]
							}
						},
						{
							"id": "s1-zuko",
							"image": "/illustrations/s1-04.jpg",
							"file": "s1-page-04",
							"title": {
								"vi": "Zuko tới",
								"en": "Zuko Comes"
							},
							"text": {
								"preschool": {
									"vi": "Có tàu lửa. Zuko muốn bắt Aang. Các bạn sợ. Appa bay lên. Đi thôi.",
									"en": "There is a fire ship. Zuko wants Aang. The friends were scared. Appa flew up. Time to go."
								},
								"primary": {
									"vi": "Tàu của Zuko tới làng. Zuko muốn bắt Aang. Katara, Sokka và Aang leo lên Appa. Appa bay đi.",
									"en": "Zuko's ship came to the village. Zuko wanted to catch Aang. Katara, Sokka, and Aang climbed onto Appa. Appa flew away."
								},
								"intermediate": {
									"vi": "Hoàng tử Zuko đưa tàu Hỏa quốc tới cực Nam. Cậu muốn bắt Avatar. Làng không đủ sức. Appa cất cánh, đưa ba bạn rời tuyết.",
									"en": "Prince Zuko brought a Fire Nation ship to the South Pole. He wanted to catch the Avatar. The village could not fight the ship. Appa lifted off, carrying the three friends from the snow."
								},
								"senior": {
									"vi": "Tàu đỏ cắt mặt băng. Zuko — vết sẹo còn mới — tìm đứa trẻ trong truyền thuyết. Làng nhỏ không thể giữ Aang. Appa cất cánh. Cực Nam khuất sau mây, và cuộc đi bắt đầu.",
									"en": "A red ship cut the ice. Zuko — the scar still new — hunted the child of legend. The little village could not keep Aang. Appa rose. The South Pole slipped behind cloud, and the journey began."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "There is a fire ship",
										"vi": "Có tàu lửa"
									},
									{
										"en": "Zuko wants Aang",
										"vi": "Zuko muốn bắt Aang"
									},
									{
										"en": "The friends were scared",
										"vi": "Các bạn sợ"
									},
									{
										"en": "Appa flew up",
										"vi": "Appa bay lên"
									},
									{
										"en": "Time to go",
										"vi": "Đi thôi"
									},
									{
										"en": "fire ship",
										"vi": "tàu lửa"
									}
								],
								"primary": [
									{
										"en": "Zuko's ship came to the village",
										"vi": "Tàu của Zuko tới làng"
									},
									{
										"en": "Zuko wanted to catch Aang",
										"vi": "Zuko muốn bắt Aang"
									},
									{
										"en": "Katara, Sokka, and Aang climbed onto Appa",
										"vi": "Katara, Sokka và Aang leo lên Appa"
									},
									{
										"en": "Appa flew away",
										"vi": "Appa bay đi"
									}
								],
								"intermediate": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Prince Zuko brought a Fire Nation ship to the South Pole",
										"vi": "Hoàng tử Zuko đưa tàu Hỏa quốc tới cực Nam"
									},
									{
										"en": "He wanted to catch the Avatar",
										"vi": "Cậu muốn bắt Avatar"
									},
									{
										"en": "The village could not fight the ship",
										"vi": "Làng không đủ sức"
									},
									{
										"en": "Appa lifted off, carrying the three friends from the snow",
										"vi": "Appa cất cánh, đưa ba bạn rời tuyết"
									},
									{
										"en": "South Pole",
										"vi": "cực Nam"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									},
									{
										"en": "Prince Zuko",
										"vi": "Hoàng tử Zuko"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								],
								"senior": [
									{
										"en": "A red ship cut the ice",
										"vi": "Tàu đỏ cắt mặt băng"
									},
									{
										"en": "Zuko — the scar still new — hunted the child of legend",
										"vi": "Zuko — vết sẹo còn mới — tìm đứa trẻ trong truyền thuyết"
									},
									{
										"en": "The little village could not keep Aang",
										"vi": "Làng nhỏ không thể giữ Aang"
									},
									{
										"en": "The South Pole slipped behind cloud, and the journey began",
										"vi": "Cực Nam khuất sau mây, và cuộc đi bắt đầu"
									},
									{
										"en": "South Pole",
										"vi": "cực Nam"
									}
								]
							}
						},
						{
							"id": "s1-fly",
							"image": "/illustrations/s1-05.jpg",
							"file": "s1-page-05",
							"title": {
								"vi": "Bay",
								"en": "Fly"
							},
							"text": {
								"preschool": {
									"vi": "Appa bay trên mây. Momo tới nữa. Momo nhỏ xíu. Ba bạn nhìn xuống. Thế giới to lắm.",
									"en": "Appa flew over the clouds. Momo came too. Momo is very little. The three friends looked down. The world is so big."
								},
								"primary": {
									"vi": "Appa bay cao. Momo, chú cáo bay nhỏ, theo luôn. Aang, Katara và Sokka nhìn thế giới từ trên mây.",
									"en": "Appa flew high. Momo, a little flying lemur, came along. Aang, Katara, and Sokka looked at the world from the clouds."
								},
								"intermediate": {
									"vi": "Trên lưng Appa, ba bạn lần đầu thấy thế giới rộng. Momo bám vai Aang. Bên dưới là rừng, sông, và bóng tàu Hỏa quốc còn theo sau.",
									"en": "On Appa's back, the three friends saw how wide the world was. Momo clung to Aang's shoulder. Below them: forests, rivers, and the shadow of Fire Nation ships still following."
								},
								"senior": {
									"vi": "Gió nâng Appa như nâng một hòn đảo. Momo — cái bóng nhỏ — theo họ. Aang cười trên mây, chưa biết phía trước dài đến đâu. Katara nhìn về Bắc. Sokka nắm chặt gậy.",
									"en": "The wind lifted Appa as if he were an island. Momo — a little shadow — followed them. Aang laughed in the clouds, not yet knowing how long the road was. Katara looked north. Sokka held his staff tight."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Appa flew over the clouds",
										"vi": "Appa bay trên mây"
									},
									{
										"en": "Momo came too",
										"vi": "Momo tới nữa"
									},
									{
										"en": "Momo is very little",
										"vi": "Momo nhỏ xíu"
									},
									{
										"en": "The three friends looked down",
										"vi": "Ba bạn nhìn xuống"
									},
									{
										"en": "The world is so big",
										"vi": "Thế giới to lắm"
									},
									{
										"en": "very little",
										"vi": "nhỏ xíu"
									},
									{
										"en": "so big",
										"vi": "to lắm"
									},
									{
										"en": "came too",
										"vi": "tới nữa"
									}
								],
								"primary": [
									{
										"en": "Appa flew high",
										"vi": "Appa bay cao"
									},
									{
										"en": "Momo, a little flying lemur, came along",
										"vi": "Momo, chú cáo bay nhỏ, theo luôn"
									},
									{
										"en": "Aang, Katara, and Sokka looked at the world from the clouds",
										"vi": "Aang, Katara và Sokka nhìn thế giới từ trên mây"
									},
									{
										"en": "flying lemur",
										"vi": "cáo bay"
									}
								],
								"intermediate": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "On Appa's back, the three friends saw how wide the world was",
										"vi": "Trên lưng Appa, ba bạn lần đầu thấy thế giới rộng"
									},
									{
										"en": "Momo clung to Aang's shoulder",
										"vi": "Momo bám vai Aang"
									},
									{
										"en": "Below them: forests, rivers, and the shadow of Fire Nation ships still following",
										"vi": "Bên dưới là rừng, sông, và bóng tàu Hỏa quốc còn theo sau"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									}
								],
								"senior": [
									{
										"en": "The wind lifted Appa as if he were an island",
										"vi": "Gió nâng Appa như nâng một hòn đảo"
									},
									{
										"en": "Momo — a little shadow — followed them",
										"vi": "Momo — cái bóng nhỏ — theo họ"
									},
									{
										"en": "Aang laughed in the clouds, not yet knowing how long the road was",
										"vi": "Aang cười trên mây, chưa biết phía trước dài đến đâu"
									},
									{
										"en": "Katara looked north",
										"vi": "Katara nhìn về Bắc"
									},
									{
										"en": "Sokka held his staff tight",
										"vi": "Sokka nắm chặt gậy"
									}
								]
							}
						},
						{
							"id": "s1-temple",
							"image": "/illustrations/s1-06.jpg",
							"file": "s1-page-06",
							"title": {
								"vi": "Đền gió",
								"en": "The Temple"
							},
							"text": {
								"preschool": {
									"vi": "Aang về nhà cũ. Nhà vắng. Aang buồn. Katara ôm Aang. Sokka ở đó. Có Momo nữa.",
									"en": "Aang went to his old home. The home was empty. Aang was sad. Katara hugged Aang. Sokka stayed. Momo was there too."
								},
								"primary": {
									"vi": "Aang tới ngôi đền trên núi. Không còn ai. Aang buồn lắm. Bạn bè không rời cậu. Momo trở thành bạn mới.",
									"en": "Aang came to the temple in the mountains. Nobody was there. Aang was very sad. His friends did not leave him. Momo became a new friend."
								},
								"intermediate": {
									"vi": "Đền Phong tộc phương Nam im lặng. Aang hiểu mình đã ngủ quá lâu. Katara và Sokka đứng cạnh. Momo, chú cáo bay trong đền, theo cậu về.",
									"en": "The Southern Air Temple was silent. Aang understood he had slept too long. Katara and Sokka stood beside him. Momo, a winged lemur in the temple, came home with him."
								},
								"senior": {
									"vi": "Núi còn đó. Người thì không. Aang bước trong hành lang trống, như đứa trẻ tìm giọng nói cũ. Bạn mới không làm đầy quá khứ — họ chỉ đứng đó, để cậu không phải đứng một mình.",
									"en": "The mountains remained. The people did not. Aang walked the empty halls like a child hunting an old voice. New friends could not fill the past — they only stood there, so he would not have to stand alone."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "hugged",
										"vi": "ôm"
									},
									{
										"en": "empty",
										"vi": "vắng"
									},
									{
										"en": "Aang went to his old home",
										"vi": "Aang về nhà cũ"
									},
									{
										"en": "The home was empty",
										"vi": "Nhà vắng"
									},
									{
										"en": "Aang was sad",
										"vi": "Aang buồn"
									},
									{
										"en": "Katara hugged Aang",
										"vi": "Katara ôm Aang"
									},
									{
										"en": "Sokka stayed",
										"vi": "Sokka ở đó"
									},
									{
										"en": "Momo was there too",
										"vi": "Có Momo nữa"
									},
									{
										"en": "old home",
										"vi": "nhà cũ"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Aang came to the temple in the mountains",
										"vi": "Aang tới ngôi đền trên núi"
									},
									{
										"en": "Nobody was there",
										"vi": "Hông còn ai"
									},
									{
										"en": "Aang was very sad",
										"vi": "Aang buồn lắm"
									},
									{
										"en": "His friends did not leave him",
										"vi": "Bạn bè hông rời cậu"
									},
									{
										"en": "Momo became a new friend",
										"vi": "Momo trở thành bạn mới"
									}
								],
								"intermediate": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "The Southern Air Temple was silent",
										"vi": "Đền Phong tộc phương Nam im lặng"
									},
									{
										"en": "Aang understood he had slept too long",
										"vi": "Aang hiểu mình đã ngủ quá lâu"
									},
									{
										"en": "Katara and Sokka stood beside him",
										"vi": "Katara và Sokka đứng cạnh"
									},
									{
										"en": "Momo, a winged lemur in the temple, came home with him",
										"vi": "Momo, chú cáo bay trong đền, theo cậu về"
									}
								],
								"senior": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "empty",
										"vi": "vắng"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "The mountains remained",
										"vi": "Núi còn đó"
									},
									{
										"en": "The people did not",
										"vi": "Người thì không"
									},
									{
										"en": "Aang walked the empty halls like a child hunting an old voice",
										"vi": "Aang bước trong hành lang trống, như đứa trẻ tìm giọng nói cũ"
									},
									{
										"en": "New friends could not fill the past — they only stood there, so he would not have to stand alone",
										"vi": "Bạn mới không làm đầy quá khứ — họ chỉ đứng đó, để cậu không phải đứng một mình"
									},
									{
										"en": "new friends",
										"vi": "bạn mới"
									}
								]
							}
						},
						{
							"id": "s1-water",
							"image": "/illustrations/s1-07.jpg",
							"file": "s1-page-07",
							"title": {
								"vi": "Học nước",
								"en": "Learn Water"
							},
							"text": {
								"preschool": {
									"vi": "Katara dạy Aang. Aang học làm nước. Nước xoay xoay. Aang vui lắm. Aang chơi với nước.",
									"en": "Katara taught Aang. Aang moved the water. The water went round and round. Aang was so happy. Aang played with the water."
								},
								"primary": {
									"vi": "Dọc đường, Katara dạy Aang thủy thuật. Nước xoay quanh cậu. Aang học chậm, rồi nước nghe lời.",
									"en": "Along the way, Katara taught Aang waterbending. The water spun around him. Aang learned slowly, then the water listened."
								},
								"intermediate": {
									"vi": "Bên sông, Katara truyền dạy những gì làng còn nhớ. Aang là Avatar, nên nước nhanh theo cậu. Hai bạn cười, ướt hết áo.",
									"en": "By a river, Katara taught what her village still remembered. Aang is the Avatar, so the water followed him quickly. Both friends laughed, soaked to the skin."
								},
								"senior": {
									"vi": "Thủy thuật phương Nam đã thưa. Katara giữ nó như giữ một bài hát. Bên dòng nước, cô hát cho Aang nghe. Sóng trả lời cậu trước — nhưng cô mới là người dạy cậu lắng.",
									"en": "Southern waterbending had grown thin. Katara kept it like a song. Beside the river she sang it for Aang. The wave answered him first — but she was the one who taught him to listen."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Katara taught Aang",
										"vi": "Katara dạy Aang"
									},
									{
										"en": "Aang moved the water",
										"vi": "Aang học làm nước"
									},
									{
										"en": "The water went round and round",
										"vi": "Nước xoay xoay"
									},
									{
										"en": "Aang was so happy",
										"vi": "Aang vui lắm"
									},
									{
										"en": "Aang played with the water",
										"vi": "Aang chơi với nước"
									},
									{
										"en": "moved the water",
										"vi": "làm nước"
									},
									{
										"en": "so happy",
										"vi": "vui lắm"
									}
								],
								"primary": [
									{
										"en": "waterbending",
										"vi": "thủy thuật"
									},
									{
										"en": "listened",
										"vi": "nghe"
									},
									{
										"en": "Along the way, Katara taught Aang waterbending",
										"vi": "Dọc đường, Katara dạy Aang thủy thuật"
									},
									{
										"en": "The water spun around him",
										"vi": "Nước xoay quanh cậu"
									},
									{
										"en": "Aang learned slowly, then the water listened",
										"vi": "Aang học chậm, rồi nước nghe lời"
									}
								],
								"intermediate": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "By a river, Katara taught what her village still remembered",
										"vi": "Bên sông, Katara truyền dạy những gì làng còn nhớ"
									},
									{
										"en": "Aang is the Avatar, so the water followed him quickly",
										"vi": "Aang là Avatar, nên nước nhanh theo cậu"
									},
									{
										"en": "Both friends laughed, soaked to the skin",
										"vi": "Hai bạn cười, ướt hết áo"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								],
								"senior": [
									{
										"en": "waterbending",
										"vi": "thủy thuật"
									},
									{
										"en": "Southern waterbending had grown thin",
										"vi": "Thủy thuật phương Nam đã thưa"
									},
									{
										"en": "Katara kept it like a song",
										"vi": "Katara giữ nó như giữ một bài hát"
									},
									{
										"en": "Beside the river she sang it for Aang",
										"vi": "Bên dòng nước, cô hát cho Aang nghe"
									},
									{
										"en": "The wave answered him first — but she was the one who taught him to listen",
										"vi": "Sóng trả lời cậu trước — nhưng cô mới là người dạy cậu lắng"
									}
								]
							}
						},
						{
							"id": "s1-north",
							"image": "/illustrations/s1-08.jpg",
							"file": "s1-page-08",
							"title": {
								"vi": "Ra Bắc",
								"en": "To the North"
							},
							"text": {
								"preschool": {
									"vi": "Phải tới chỗ nước to. Chỗ Bắc. Appa bay. Trời lạnh. Các bạn ủ. Đi tiếp nha.",
									"en": "They must go to the big water place. The North. Appa flew. The sky was cold. The friends wrapped up. Keep going."
								},
								"primary": {
									"vi": "Họ phải tới Thủy tộc phương Bắc. Ở đó có thầy dạy nước. Appa bay qua biển lạnh.",
									"en": "They had to reach the Northern Water Tribe. A water teacher lived there. Appa flew over the cold sea."
								},
								"intermediate": {
									"vi": "Thủy thuật của Katara chưa đủ. Đội Avatar bay ra Bắc, nơi thành phố băng còn nguyên thầy. Zuko vẫn theo sau, nhưng Appa nhanh hơn tuyết.",
									"en": "Katara's waterbending was not enough yet. Team Avatar flew north, where the ice city still had masters. Zuko still followed, but Appa was faster than snow."
								},
								"senior": {
									"vi": "Phương Nam đã dạy cậu khởi đầu. Phương Bắc phải dạy cậu phần còn lại. Họ cắt biển như một mũi tên. Phía trước, thành phố nước đội tường băng lên trời.",
									"en": "The South had taught him the beginning. The North would have to teach him the rest. They cut the sea like an arrow. Ahead, the water city lifted ice walls into the sky."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "They must go to the big water place",
										"vi": "Phải tới chỗ nước to"
									},
									{
										"en": "The North",
										"vi": "Chỗ Bắc"
									},
									{
										"en": "Appa flew",
										"vi": "Appa bay"
									},
									{
										"en": "The sky was cold",
										"vi": "Trời lạnh"
									},
									{
										"en": "The friends wrapped up",
										"vi": "Các bạn ủ"
									},
									{
										"en": "Keep going",
										"vi": "Đi tiếp nha"
									}
								],
								"primary": [
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "They had to reach the Northern Water Tribe",
										"vi": "Họ phải tới Thủy tộc phương Bắc"
									},
									{
										"en": "A water teacher lived there",
										"vi": "Ở đó có thầy dạy nước"
									},
									{
										"en": "Appa flew over the cold sea",
										"vi": "Appa bay qua biển lạnh"
									},
									{
										"en": "water teacher",
										"vi": "thầy nước"
									},
									{
										"en": "cold sea",
										"vi": "biển lạnh"
									}
								],
								"intermediate": [
									{
										"en": "waterbending",
										"vi": "thủy thuật"
									},
									{
										"en": "Katara's waterbending was not enough yet",
										"vi": "Thủy thuật của Katara chưa đủ"
									},
									{
										"en": "Team Avatar flew north, where the ice city still had masters",
										"vi": "Đội Avatar bay ra Bắc, nơi thành phố băng còn nguyên thầy"
									},
									{
										"en": "Zuko still followed, but Appa was faster than snow",
										"vi": "Zuko vẫn theo sau, nhưng Appa nhanh hơn tuyết"
									}
								],
								"senior": [
									{
										"en": "The South had taught him the beginning",
										"vi": "Phương Nam đã dạy cậu khởi đầu"
									},
									{
										"en": "The North would have to teach him the rest",
										"vi": "Phương Bắc phải dạy cậu phần còn lại"
									},
									{
										"en": "They cut the sea like an arrow",
										"vi": "Họ cắt biển như một mũi tên"
									},
									{
										"en": "Ahead, the water city lifted ice walls into the sky",
										"vi": "Phía trước, thành phố nước đội tường băng lên trời"
									},
									{
										"en": "the north",
										"vi": "chỗ Bắc"
									}
								]
							}
						},
						{
							"id": "s1-city",
							"image": "/illustrations/s1-09.jpg",
							"file": "s1-page-09",
							"title": {
								"vi": "Thành băng",
								"en": "Ice City"
							},
							"text": {
								"preschool": {
									"vi": "Thành phố to. Nhà bằng băng. Có thầy nước. Katara học. Aang học. Nước đẹp lắm.",
									"en": "A big city. Houses made of ice. There is a water teacher. Katara learned. Aang learned. The water was so pretty."
								},
								"primary": {
									"vi": "Họ tới thành phố băng rất lớn. Thầy dạy thủy thuật. Katara và Aang học mỗi ngày. Sokka canh cửa.",
									"en": "They came to a very big ice city. A master taught waterbending. Katara and Aang learned every day. Sokka watched the gate."
								},
								"intermediate": {
									"vi": "Bắc Thủy Triều — thành phố kênh băng và cung trắng. Thầy Pakku dạy nghiêm. Katara mạnh hơn người ta nghĩ. Aang học sóng, rồi học đứng yên trong sóng.",
									"en": "The Northern Water Tribe — a city of ice canals and white palaces. Master Pakku taught strictly. Katara was stronger than people expected. Aang learned the wave, then learned to stand still inside it."
								},
								"senior": {
									"vi": "Thành băng không chỉ đẹp. Nó là trường học cuối cùng của nước. Katara giành chỗ học của mình. Aang, vốn quen gió, phải học cách nước chờ — chậm hơn, sâu hơn, không kém mạnh.",
									"en": "The ice city was not only beautiful. It was water's last school. Katara claimed her place as a student. Aang, used to wind, had to learn how water waits — slower, deeper, no less strong."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "A big city",
										"vi": "Thành phố to"
									},
									{
										"en": "Houses made of ice",
										"vi": "Nhà bằng băng"
									},
									{
										"en": "There is a water teacher",
										"vi": "Có thầy nước"
									},
									{
										"en": "Katara learned",
										"vi": "Katara học"
									},
									{
										"en": "Aang learned",
										"vi": "Aang học"
									},
									{
										"en": "The water was so pretty",
										"vi": "Nước đẹp lắm"
									},
									{
										"en": "so pretty",
										"vi": "đẹp lắm"
									},
									{
										"en": "water teacher",
										"vi": "thầy nước"
									}
								],
								"primary": [
									{
										"en": "waterbending",
										"vi": "thủy thuật"
									},
									{
										"en": "They came to a very big ice city",
										"vi": "Họ tới thành phố băng rất lớn"
									},
									{
										"en": "A master taught waterbending",
										"vi": "Thầy dạy thủy thuật"
									},
									{
										"en": "Katara and Aang learned every day",
										"vi": "Katara và Aang học mỗi ngày"
									},
									{
										"en": "Sokka watched the gate",
										"vi": "Sokka canh cửa"
									}
								],
								"intermediate": [
									{
										"en": "The Northern Water Tribe — a city of ice canals and white palaces",
										"vi": "Bắc Thủy Triều — thành phố kênh băng và cung trắng"
									},
									{
										"en": "Master Pakku taught strictly",
										"vi": "Thầy Pakku dạy nghiêm"
									},
									{
										"en": "Katara was stronger than people expected",
										"vi": "Katara mạnh hơn người ta nghĩ"
									},
									{
										"en": "Aang learned the wave, then learned to stand still inside it",
										"vi": "Aang học sóng, rồi học đứng yên trong sóng"
									}
								],
								"senior": [
									{
										"en": "The ice city was not only beautiful",
										"vi": "Thành băng không chỉ đẹp"
									},
									{
										"en": "It was water's last school",
										"vi": "Nó là trường học cuối cùng của nước"
									},
									{
										"en": "Katara claimed her place as a student",
										"vi": "Katara giành chỗ học của mình"
									},
									{
										"en": "Aang, used to wind, had to learn how water waits — slower, deeper, no less strong",
										"vi": "Aang, vốn quen gió, phải học cách nước chờ — chậm hơn, sâu hơn, không kém mạnh"
									}
								]
							}
						},
						{
							"id": "s1-moon",
							"image": "/illustrations/s1-10.jpg",
							"file": "s1-page-10",
							"title": {
								"vi": "Mặt trăng",
								"en": "The Moon"
							},
							"text": {
								"preschool": {
									"vi": "Trời tối. Trăng yếu. Có bạn Yue. Yue giúp trăng. Aang giúp nước. Thành phố xong. Ngủ ngon nha. Mùa hai tới.",
									"en": "The sky was dark. The moon was weak. There is a friend named Yue. Yue helped the moon. Aang helped the water. The city was safe. Night night. Season two will come."
								},
								"primary": {
									"vi": "Một đêm trăng yếu đi. Công chúa Yue giúp mặt trăng. Aang gọi nước lên giữ thành. Mọi người bình yên. Mùa một hết. Mùa hai sẽ tới.",
									"en": "One night the moon grew weak. Princess Yue helped the moon. Aang called the water to guard the city. Everyone was safe. Season one ends. Season two will come."
								},
								"intermediate": {
									"vi": "Đô đốc Zhao lấy đi ánh trăng. Yue, con gái của nước, trả ánh sáng cho trời. Aang nhập với biển, đẩy tàu lửa đi. Thành băng đứng vững. Mùa nước khép lại.",
									"en": "Admiral Zhao took the moonlight. Yue, a daughter of the water, gave the light back to the sky. Aang joined with the ocean and sent the fire ships away. The ice city stood. The Water season closes."
								},
								"senior": {
									"vi": "Đêm ấy, trăng suýt tắt. Yue không đánh — cô cho đi. Ánh sáng về trời, và Aang, nhỏ giữa sóng, giữ thành như giữ một lời hứa. Mùa nước lặng lại. Phía trước còn đất, còn lửa — nhưng đêm này, họ được ngủ.",
									"en": "That night the moon nearly went out. Yue did not fight — she gave. Light returned to the sky, and Aang, small in the waves, kept the city like a promise. The Water season grows quiet. Earth and fire still wait — but tonight, they may sleep."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "The sky was dark",
										"vi": "Trời tối"
									},
									{
										"en": "The moon was weak",
										"vi": "Trăng yếu"
									},
									{
										"en": "There is a friend named Yue",
										"vi": "Có bạn Yue"
									},
									{
										"en": "Yue helped the moon",
										"vi": "Yue giúp trăng"
									},
									{
										"en": "Aang helped the water",
										"vi": "Aang giúp nước"
									},
									{
										"en": "The city was safe",
										"vi": "Thành phố xong"
									},
									{
										"en": "Night night",
										"vi": "Ngủ ngon nha"
									},
									{
										"en": "Season two will come",
										"vi": "Mùa hai tới"
									},
									{
										"en": "season two",
										"vi": "mùa hai"
									},
									{
										"en": "helped the moon",
										"vi": "giúp trăng"
									},
									{
										"en": "city was safe",
										"vi": "thành phố xong"
									}
								],
								"primary": [
									{
										"en": "One night the moon grew weak",
										"vi": "Một đêm trăng yếu đi"
									},
									{
										"en": "Princess Yue helped the moon",
										"vi": "Công chúa Yue giúp mặt trăng"
									},
									{
										"en": "Aang called the water to guard the city",
										"vi": "Aang gọi nước lên giữ thành"
									},
									{
										"en": "Everyone was safe",
										"vi": "Mọi người bình yên"
									},
									{
										"en": "Season one ends",
										"vi": "Mùa một hết"
									},
									{
										"en": "Season two will come",
										"vi": "Mùa hai sẽ tới"
									},
									{
										"en": "season one",
										"vi": "mùa một"
									},
									{
										"en": "season two",
										"vi": "mùa hai"
									},
									{
										"en": "helped the moon",
										"vi": "giúp trăng"
									}
								],
								"intermediate": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Admiral Zhao took the moonlight",
										"vi": "Đô đốc Zhao lấy đi ánh trăng"
									},
									{
										"en": "Yue, a daughter of the water, gave the light back to the sky",
										"vi": "Yue, con gái của nước, trả ánh sáng cho trời"
									},
									{
										"en": "Aang joined with the ocean and sent the fire ships away",
										"vi": "Aang nhập với biển, đẩy tàu lửa đi"
									},
									{
										"en": "The ice city stood",
										"vi": "Thành băng đứng vững"
									},
									{
										"en": "The Water season closes",
										"vi": "Mùa nước khép lại"
									},
									{
										"en": "the water season",
										"vi": "mùa nước"
									}
								],
								"senior": [
									{
										"en": "That night the moon nearly went out",
										"vi": "Đêm ấy, trăng suýt tắt"
									},
									{
										"en": "Yue did not fight — she gave",
										"vi": "Yue không đánh — cô cho đi"
									},
									{
										"en": "Light returned to the sky, and Aang, small in the waves, kept the city like a promise",
										"vi": "Ánh sáng về trời, và Aang, nhỏ giữa sóng, giữ thành như giữ một lời hứa"
									},
									{
										"en": "The Water season grows quiet",
										"vi": "Mùa nước lặng lại"
									},
									{
										"en": "Earth and fire still wait — but tonight, they may sleep",
										"vi": "Phía trước còn đất, còn lửa — nhưng đêm này, họ được ngủ"
									},
									{
										"en": "the water season",
										"vi": "mùa nước"
									}
								]
							}
						}
					]
				},
				{
					"id": "s2",
					"vi": "Mùa 2 · Đất",
					"en": "Season 2 · Earth",
					"tagline": {
						"vi": "Aang học đất",
						"en": "Aang learns earth"
					},
					"pages": [
						{
							"id": "s2-cover",
							"image": "/illustrations/s2-00.jpg",
							"file": "s2-page-00",
							"title": {
								"vi": "Mùa đất",
								"en": "Earth Season"
							},
							"text": {
								"preschool": {
									"vi": "Đây là chuyện Aang. Mùa hai. Aang tìm thầy đất.",
									"en": "This is Aang. Season two. Aang looks for an earth teacher."
								},
								"primary": {
									"vi": "Đây là mùa hai của Aang. Aang cần một người dạy điều khiển đất.",
									"en": "This is Aang's second season. Aang needs someone to teach him to move the earth."
								},
								"intermediate": {
									"vi": "Mùa đất bắt đầu. Aang, Katara và Sokka bay qua Thổ quốc để tìm một thổ nhân dạy thổ thuật.",
									"en": "The Earth season begins. Aang, Katara, and Sokka fly through the Earth Kingdom to find an earthbender who can teach him."
								},
								"senior": {
									"vi": "Mùa đất mở ra trên những triền núi xanh. Aang phải tìm một thổ nhân — người sẽ dạy cậu đứng vững trên mặt đất, như gió đã dạy cậu bay.",
									"en": "The Earth season opens over green mountains. Aang must find an earthbender — someone who will teach him to stand as firmly as the wind once taught him to fly."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "This is Aang",
										"vi": "Đây là chuyện Aang"
									},
									{
										"en": "Season two",
										"vi": "Mùa hai"
									},
									{
										"en": "Aang looks for an earth teacher",
										"vi": "Aang tìm thầy đất"
									},
									{
										"en": "earth teacher",
										"vi": "thầy đất"
									}
								],
								"primary": [{
									"en": "This is Aang's second season",
									"vi": "Đây là mùa hai của Aang"
								}, {
									"en": "Aang needs someone to teach him to move the earth",
									"vi": "Aang cần một người dạy điều khiển đất"
								}],
								"intermediate": [
									{
										"en": "The Earth season begins",
										"vi": "Mùa đất bắt đầu"
									},
									{
										"en": "Aang, Katara, and Sokka fly through the Earth Kingdom to find an earthbender who can teach him",
										"vi": "Aang, Katara và Sokka bay qua Thổ quốc để tìm một thổ nhân dạy thổ thuật"
									},
									{
										"en": "the earth season",
										"vi": "mùa đất"
									},
									{
										"en": "Earth Kingdom",
										"vi": "Thổ quốc"
									}
								],
								"senior": [
									{
										"en": "The Earth season opens over green mountains",
										"vi": "Mùa đất mở ra trên những triền núi xanh"
									},
									{
										"en": "Aang must find an earthbender — someone who will teach him to stand as firmly as the wind once taught him to fly",
										"vi": "Aang phải tìm một thổ nhân — người sẽ dạy cậu đứng vững trên mặt đất, như gió đã dạy cậu bay"
									},
									{
										"en": "the earth season",
										"vi": "mùa đất"
									}
								]
							}
						},
						{
							"id": "s2-travel",
							"image": "/illustrations/s2-01.jpg",
							"file": "s2-page-01",
							"title": {
								"vi": "Bay đất",
								"en": "Over Earth"
							},
							"text": {
								"preschool": {
									"vi": "Các bạn bay với Appa. Chỗ đất rộng lắm. Tìm thầy nha.",
									"en": "The friends fly with Appa. The earth place is so big. They look for a teacher."
								},
								"primary": {
									"vi": "Các bạn bay trên Appa qua đồi xanh. Họ hỏi mọi người: ai dạy được đất?",
									"en": "The friends fly on Appa over green hills. They ask people: who can teach earth?"
								},
								"intermediate": {
									"vi": "Đội Avatar đi xuyên Thổ quốc. Đường dài, núi cao, và Aang vẫn chưa gặp thầy thổ thuật của mình.",
									"en": "Team Avatar crosses the Earth Kingdom. The road is long, the mountains high, and Aang still has not met his earthbending teacher."
								},
								"senior": {
									"vi": "Họ lướt trên lưng Appa, cắt những dải đất rộng. Mỗi ngôi làng là một câu hỏi. Thầy ở đâu, khi cả một quốc gia đang run dưới gót Hỏa quốc?",
									"en": "They glide on Appa's back across wide lands. Every village is a question. Where is the teacher, when a whole nation trembles under the Fire Nation's step?"
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "The friends fly with Appa",
										"vi": "Các bạn bay với Appa"
									},
									{
										"en": "The earth place is so big",
										"vi": "Chỗ đất rộng lắm"
									},
									{
										"en": "They look for a teacher",
										"vi": "Tìm thầy nha"
									},
									{
										"en": "so big",
										"vi": "to lắm"
									},
									{
										"en": "look for",
										"vi": "tìm"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "The friends fly on Appa over green hills",
										"vi": "Các bạn bay trên Appa qua đồi xanh"
									},
									{
										"en": "They ask people: who can teach earth",
										"vi": "Họ hỏi mọi người: ai dạy được đất"
									}
								],
								"intermediate": [
									{
										"en": "earthbending",
										"vi": "thổ thuật"
									},
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "Team Avatar crosses the Earth Kingdom",
										"vi": "Đội Avatar đi xuyên Thổ quốc"
									},
									{
										"en": "The road is long, the mountains high, and Aang still has not met his earthbending teacher",
										"vi": "Đường dài, núi cao, và Aang vẫn chưa gặp thầy thổ thuật của mình"
									},
									{
										"en": "Earth Kingdom",
										"vi": "Thổ quốc"
									}
								],
								"senior": [
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "They glide on Appa's back across wide lands",
										"vi": "Họ lướt trên lưng Appa, cắt những dải đất rộng"
									},
									{
										"en": "Every village is a question",
										"vi": "Mỗi ngôi làng là một câu hỏi"
									},
									{
										"en": "Where is the teacher, when a whole nation trembles under the Fire Nation's step",
										"vi": "Thầy ở đâu, khi cả một quốc gia đang run dưới gót Hỏa quốc"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									}
								]
							}
						},
						{
							"id": "s2-toph",
							"image": "/illustrations/s2-02.jpg",
							"file": "s2-page-02",
							"title": {
								"vi": "Toph",
								"en": "Toph"
							},
							"text": {
								"preschool": {
									"vi": "Có bé Toph. Toph nhỏ xíu. Toph hông thấy. Toph đá khỏe lắm.",
									"en": "This is Toph. Toph is little. Toph cannot see. Toph is so strong with rocks."
								},
								"primary": {
									"vi": "Họ gặp Toph. Toph nhỏ và không nhìn thấy. Nhưng Toph đá bể đá to.",
									"en": "They met Toph. Toph is small and cannot see. But Toph can break big rocks."
								},
								"intermediate": {
									"vi": "Toph Bé bước ra từ đấu trường. Cô mù, nhưng cô đọc đất như chữ. Không ai mạnh bằng cô.",
									"en": "Little Toph stepped out of the arena. She is blind, but she reads the ground like a page. No one is stronger than she is."
								},
								"senior": {
									"vi": "Toph Bé — thổ nhân mù, chân trần trên đá — làm cả đấu trường im. Cô không cần mắt. Trái đất nói với cô trước.",
									"en": "Little Toph — a blind earthbender, barefoot on stone — silenced the arena. She did not need eyes. The earth spoke to her first."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Toph",
										"vi": "Có bé Toph"
									},
									{
										"en": "Toph is little",
										"vi": "Toph nhỏ xíu"
									},
									{
										"en": "Toph cannot see",
										"vi": "Toph hông thấy"
									},
									{
										"en": "Toph is so strong with rocks",
										"vi": "Toph đá khỏe lắm"
									},
									{
										"en": "so strong",
										"vi": "khỏe lắm"
									},
									{
										"en": "cannot see",
										"vi": "hông thấy"
									}
								],
								"primary": [
									{
										"en": "They met Toph",
										"vi": "Họ gặp Toph"
									},
									{
										"en": "Toph is small and cannot see",
										"vi": "Toph nhỏ và hông nhìn thấy"
									},
									{
										"en": "But Toph can break big rocks",
										"vi": "Nhưng Toph đá bể đá to"
									},
									{
										"en": "cannot see",
										"vi": "hông thấy"
									}
								],
								"intermediate": [
									{
										"en": "Little Toph stepped out of the arena",
										"vi": "Toph Bé bước ra từ đấu trường"
									},
									{
										"en": "She is blind, but she reads the ground like a page",
										"vi": "Cô mù, nhưng cô đọc đất như chữ"
									},
									{
										"en": "No one is stronger than she is",
										"vi": "Không ai mạnh bằng cô"
									}
								],
								"senior": [
									{
										"en": "Little Toph — a blind earthbender, barefoot on stone — silenced the arena",
										"vi": "Toph Bé — thổ nhân mù, chân trần trên đá — làm cả đấu trường im"
									},
									{
										"en": "She did not need eyes",
										"vi": "Cô không cần mắt"
									},
									{
										"en": "The earth spoke to her first",
										"vi": "Trái đất nói với cô trước"
									}
								]
							}
						},
						{
							"id": "s2-teach",
							"image": "/illustrations/s2-03.jpg",
							"file": "s2-page-03",
							"title": {
								"vi": "Học đá",
								"en": "Learn Earth"
							},
							"text": {
								"preschool": {
									"vi": "Toph dạy Aang. Aang giậm chân. Đá nhảy lên. Aang vui lắm.",
									"en": "Toph taught Aang. Aang stamped his foot. The rocks jumped. Aang was so happy."
								},
								"primary": {
									"vi": "Toph dạy Aang đứng vững và đẩy đá. Aang học chậm, rồi đá nghe lời.",
									"en": "Toph taught Aang to stand firm and push the rocks. Aang learned slowly, then the rocks listened."
								},
								"intermediate": {
									"vi": "Trong hẻm núi, Toph dạy Aang thổ thuật: chân bám đất, ý chí đẩy núi. Lần đầu cậu cảm thấy mặt đất trả lời.",
									"en": "In a canyon, Toph taught Aang earthbending: feet rooted, will against the mountain. For the first time the ground answered him."
								},
								"senior": {
									"vi": "Bài học không dịu dàng. Toph bắt Aang ngã, rồi đứng. Đá chỉ nhường người không sợ. Cậu học được điều đó.",
									"en": "The lesson was not gentle. Toph let Aang fall, then stand. Stone yields only to those who do not flinch. He learned that."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Toph taught Aang",
										"vi": "Toph dạy Aang"
									},
									{
										"en": "Aang stamped his foot",
										"vi": "Aang giậm chân"
									},
									{
										"en": "The rocks jumped",
										"vi": "Đá nhảy lên"
									},
									{
										"en": "Aang was so happy",
										"vi": "Aang vui lắm"
									},
									{
										"en": "so happy",
										"vi": "vui lắm"
									},
									{
										"en": "stamped his foot",
										"vi": "giậm chân"
									}
								],
								"primary": [
									{
										"en": "listened",
										"vi": "nghe"
									},
									{
										"en": "Toph taught Aang to stand firm and push the rocks",
										"vi": "Toph dạy Aang đứng vững và đẩy đá"
									},
									{
										"en": "Aang learned slowly, then the rocks listened",
										"vi": "Aang học chậm, rồi đá nghe lời"
									}
								],
								"intermediate": [
									{
										"en": "earthbending",
										"vi": "thổ thuật"
									},
									{
										"en": "In a canyon, Toph taught Aang earthbending: feet rooted, will against the mountain",
										"vi": "Trong hẻm núi, Toph dạy Aang thổ thuật: chân bám đất, ý chí đẩy núi"
									},
									{
										"en": "For the first time the ground answered him",
										"vi": "Lần đầu cậu cảm thấy mặt đất trả lời"
									}
								],
								"senior": [
									{
										"en": "The lesson was not gentle",
										"vi": "Bài học không dịu dàng"
									},
									{
										"en": "Toph let Aang fall, then stand",
										"vi": "Toph bắt Aang ngã, rồi đứng"
									},
									{
										"en": "Stone yields only to those who do not flinch",
										"vi": "Đá chỉ nhường người không sợ"
									},
									{
										"en": "He learned that",
										"vi": "Cậu học được điều đó"
									}
								]
							}
						},
						{
							"id": "s2-azula",
							"image": "/illustrations/s2-04.jpg",
							"file": "s2-page-04",
							"title": {
								"vi": "Azula",
								"en": "Azula"
							},
							"text": {
								"preschool": {
									"vi": "Có cô Azula. Azula theo sau. Azula thổi lửa xanh. Các bạn chạy.",
									"en": "This is Azula. Azula follows them. Azula blows blue fire. The friends run."
								},
								"primary": {
									"vi": "Azula là em Zuko. Cô ấy đuổi theo trên đường. Các bạn phải chạy nhanh.",
									"en": "Azula is Zuko's sister. She chased them on the road. The friends had to run fast."
								},
								"intermediate": {
									"vi": "Công chúa Azula săn Đội Avatar với lửa xanh. Cô nhanh, khôn, và không bỏ cuộc. Appa phải bay.",
									"en": "Princess Azula hunted Team Avatar with blue fire. She was fast, clever, and would not stop. Appa had to fly."
								},
								"senior": {
									"vi": "Azula hiện như một vệt lửa lạnh. Không phải sức mạnh làm mọi người sợ — mà sự chắc chắn. Cô luôn tin mình sẽ tới trước.",
									"en": "Azula arrived like a cold streak of flame. It was not her power that frightened them — it was her certainty. She always believed she would arrive first."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "This is Azula",
										"vi": "Có cô Azula"
									},
									{
										"en": "Azula follows them",
										"vi": "Azula theo sau"
									},
									{
										"en": "Azula blows blue fire",
										"vi": "Azula thổi lửa xanh"
									},
									{
										"en": "The friends run",
										"vi": "Các bạn chạy"
									},
									{
										"en": "blue fire",
										"vi": "lửa xanh"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Azula is Zuko's sister",
										"vi": "Azula là em Zuko"
									},
									{
										"en": "She chased them on the road",
										"vi": "Cô ấy đuổi theo trên đường"
									},
									{
										"en": "The friends had to run fast",
										"vi": "Các bạn phải chạy nhanh"
									}
								],
								"intermediate": [
									{
										"en": "Princess Azula hunted Team Avatar with blue fire",
										"vi": "Công chúa Azula săn Đội Avatar với lửa xanh"
									},
									{
										"en": "She was fast, clever, and would not stop",
										"vi": "Cô nhanh, khôn, và không bỏ cuộc"
									},
									{
										"en": "Appa had to fly",
										"vi": "Appa phải bay"
									},
									{
										"en": "blue fire",
										"vi": "lửa xanh"
									}
								],
								"senior": [
									{
										"en": "Azula arrived like a cold streak of flame",
										"vi": "Azula hiện như một vệt lửa lạnh"
									},
									{
										"en": "It was not her power that frightened them — it was her certainty",
										"vi": "Không phải sức mạnh làm mọi người sợ — mà sự chắc chắn"
									},
									{
										"en": "She always believed she would arrive first",
										"vi": "Cô luôn tin mình sẽ tới trước"
									}
								]
							}
						},
						{
							"id": "s2-appa-gone",
							"image": "/illustrations/s2-05.jpg",
							"file": "s2-page-05",
							"title": {
								"vi": "Appa mất",
								"en": "Appa Lost"
							},
							"text": {
								"preschool": {
									"vi": "Appa mất rồi. Aang buồn lắm. Aang ngồi. Bạn bè ở đó.",
									"en": "Appa is gone. Aang is so sad. Aang sat down. His friends stayed with him."
								},
								"primary": {
									"vi": "Một ngày Appa biến mất. Aang khóc. Katara, Sokka và Toph ở bên cậu.",
									"en": "One day Appa disappeared. Aang cried. Katara, Sokka, and Toph stayed beside him."
								},
								"intermediate": {
									"vi": "Appa bị bắt. Aang gục trên đồi. Nỗi nhớ con bò bay lớn hơn cả gió. Bạn bè không để cậu một mình.",
									"en": "Appa was taken. Aang sank on a hillside. Missing the flying bison hurt more than the wind. His friends would not leave him alone."
								},
								"senior": {
									"vi": "Mất Appa là mất một nửa bầu trời. Aang ngồi im, như đứa trẻ bị lấy đi giấc mơ. Những người bạn đứng sau lưng — một vòng tay không nói.",
									"en": "Losing Appa was losing half the sky. Aang sat still, a child with a dream stolen. His friends stood behind him — a circle of arms that did not need words."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Appa is gone",
										"vi": "Appa mất rồi"
									},
									{
										"en": "Aang is so sad",
										"vi": "Aang buồn lắm"
									},
									{
										"en": "Aang sat down",
										"vi": "Aang ngồi"
									},
									{
										"en": "His friends stayed with him",
										"vi": "Bạn bè ở đó"
									},
									{
										"en": "so sad",
										"vi": "buồn lắm"
									},
									{
										"en": "friends stayed",
										"vi": "bạn bè ở đó"
									}
								],
								"primary": [
									{
										"en": "One day Appa disappeared",
										"vi": "Một ngày Appa biến mất"
									},
									{
										"en": "Aang cried",
										"vi": "Aang khóc"
									},
									{
										"en": "Katara, Sokka, and Toph stayed beside him",
										"vi": "Katara, Sokka và Toph ở bên cậu"
									}
								],
								"intermediate": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Appa was taken",
										"vi": "Appa bị bắt"
									},
									{
										"en": "Aang sank on a hillside",
										"vi": "Aang gục trên đồi"
									},
									{
										"en": "Missing the flying bison hurt more than the wind",
										"vi": "Nỗi nhớ con bò bay lớn hơn cả gió"
									},
									{
										"en": "His friends would not leave him alone",
										"vi": "Bạn bè không để cậu một mình"
									},
									{
										"en": "flying bison",
										"vi": "bò bay"
									}
								],
								"senior": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Losing Appa was losing half the sky",
										"vi": "Mất Appa là mất một nửa bầu trời"
									},
									{
										"en": "Aang sat still, a child with a dream stolen",
										"vi": "Aang ngồi im, như đứa trẻ bị lấy đi giấc mơ"
									},
									{
										"en": "His friends stood behind him — a circle of arms that did not need words",
										"vi": "Những người bạn đứng sau lưng — một vòng tay không nói"
									},
									{
										"en": "sat still",
										"vi": "ngồi im"
									}
								]
							}
						},
						{
							"id": "s2-search",
							"image": "/illustrations/s2-06.jpg",
							"file": "s2-page-06",
							"title": {
								"vi": "Tìm",
								"en": "Search"
							},
							"text": {
								"preschool": {
									"vi": "Mấy bạn tìm Appa. Hỏi người ta. Bay tiếp. Tìm mãi.",
									"en": "The friends look for Appa. They ask people. They fly on. They keep looking."
								},
								"primary": {
									"vi": "Họ đi khắp nơi để tìm Appa. Có người thấy, có người không. Họ không bỏ cuộc.",
									"en": "They went everywhere to find Appa. Some people had seen him. Some had not. They did not give up."
								},
								"intermediate": {
									"vi": "Đội Avatar lùng khắp Thổ quốc. Từng tin đồn, từng dấu chân. Toph lắng nghe đất, Aang lắng nghe gió.",
									"en": "Team Avatar searched the Earth Kingdom. Every rumor, every track. Toph listened to the ground. Aang listened to the wind."
								},
								"senior": {
									"vi": "Họ lần theo bóng Appa như lần theo một bài hát cũ. Đất rộng, tin đồn mỏng, nhưng tình bạn là sợi chỉ không đứt.",
									"en": "They followed Appa's shadow like an old song. The land was wide, the rumors thin, but friendship was a thread that would not break."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "The friends look for Appa",
										"vi": "Mấy bạn tìm Appa"
									},
									{
										"en": "They ask people",
										"vi": "Hỏi người ta"
									},
									{
										"en": "They fly on",
										"vi": "Bay tiếp"
									},
									{
										"en": "They keep looking",
										"vi": "Tìm mãi"
									},
									{
										"en": "look for",
										"vi": "tìm"
									}
								],
								"primary": [
									{
										"en": "They went everywhere to find Appa",
										"vi": "Họ đi khắp nơi để tìm Appa"
									},
									{
										"en": "Some people had seen him",
										"vi": "Có người thấy, có người hông"
									},
									{
										"en": "Some had not",
										"vi": "Họ hông bỏ cuộc"
									}
								],
								"intermediate": [
									{
										"en": "listened",
										"vi": "nghe"
									},
									{
										"en": "Team Avatar searched the Earth Kingdom",
										"vi": "Đội Avatar lùng khắp Thổ quốc"
									},
									{
										"en": "Every rumor, every track",
										"vi": "Từng tin đồn, từng dấu chân"
									},
									{
										"en": "Toph listened to the ground",
										"vi": "Toph lắng nghe đất, Aang lắng nghe gió"
									},
									{
										"en": "Earth Kingdom",
										"vi": "Thổ quốc"
									}
								],
								"senior": [{
									"en": "They followed Appa's shadow like an old song",
									"vi": "Họ lần theo bóng Appa như lần theo một bài hát cũ"
								}, {
									"en": "The land was wide, the rumors thin, but friendship was a thread that would not break",
									"vi": "Đất rộng, tin đồn mỏng, nhưng tình bạn là sợi chỉ không đứt"
								}]
							}
						},
						{
							"id": "s2-city",
							"image": "/illustrations/s2-07.jpg",
							"file": "s2-page-07",
							"title": {
								"vi": "Thành to",
								"en": "The City"
							},
							"text": {
								"preschool": {
									"vi": "Có thành phố to. Tường cao lắm. Các bạn vào trong.",
									"en": "There is a big city. The wall is so tall. The friends go inside."
								},
								"primary": {
									"vi": "Họ tới một thành phố rất lớn. Tường thành cao như núi. Bên trong có nhiều người.",
									"en": "They came to a very big city. The walls were as high as mountains. Many people lived inside."
								},
								"intermediate": {
									"vi": "Ba Sinh Thế — thành phố có tường lớn nhất thế giới. Đội Avatar hy vọng Appa ở đây, và hy vọng được yên.",
									"en": "Ba Sing Se — the city with the greatest walls in the world. Team Avatar hoped Appa was here, and hoped for rest."
								},
								"senior": {
									"vi": "Ba Sinh Thế đội tường lên trời, như muốn giấu cả một quốc gia. Họ bước vào, nhỏ như hạt bụi, mang theo một cái tên: Appa.",
									"en": "Ba Sing Se lifted its walls to the sky, as if to hide a nation. They entered, small as dust, carrying one name: Appa."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "There is a big city",
										"vi": "Có thành phố to"
									},
									{
										"en": "The wall is so tall",
										"vi": "Tường cao lắm"
									},
									{
										"en": "The friends go inside",
										"vi": "Các bạn vào trong"
									}
								],
								"primary": [
									{
										"en": "They came to a very big city",
										"vi": "Họ tới một thành phố rất lớn"
									},
									{
										"en": "The walls were as high as mountains",
										"vi": "Tường thành cao như núi"
									},
									{
										"en": "Many people lived inside",
										"vi": "Bên trong có nhiều người"
									}
								],
								"intermediate": [{
									"en": "Ba Sing Se — the city with the greatest walls in the world",
									"vi": "Ba Sinh Thế — thành phố có tường lớn nhất thế giới"
								}, {
									"en": "Team Avatar hoped Appa was here, and hoped for rest",
									"vi": "Đội Avatar hy vọng Appa ở đây, và hy vọng được yên"
								}],
								"senior": [{
									"en": "Ba Sing Se lifted its walls to the sky, as if to hide a nation",
									"vi": "Ba Sinh Thế đội tường lên trời, như muốn giấu cả một quốc gia"
								}, {
									"en": "They entered, small as dust, carrying one name: Appa",
									"vi": "Họ bước vào, nhỏ như hạt bụi, mang theo một cái tên: Appa"
								}]
							}
						},
						{
							"id": "s2-found",
							"image": "/illustrations/s2-08.jpg",
							"file": "s2-page-08",
							"title": {
								"vi": "Appa về",
								"en": "Appa Home"
							},
							"text": {
								"preschool": {
									"vi": "Appa về rồi. Aang ôm Appa. Appa liếm Aang. Vui lắm.",
									"en": "Appa is back. Aang hugged Appa. Appa licked Aang. So happy."
								},
								"primary": {
									"vi": "Họ tìm thấy Appa trong hang. Aang ôm chặt. Mọi người khóc vui.",
									"en": "They found Appa in a cave. Aang hugged him tight. Everyone cried happy tears."
								},
								"intermediate": {
									"vi": "Dưới lòng đất, Appa đang chờ. Aang lao tới, mặt ướt. Con bò bay thở ra một hơi dài, như cả mùa đông vừa tan.",
									"en": "Under the earth, Appa was waiting. Aang ran to him, face wet. The flying bison breathed out a long breath, as if a whole winter had melted."
								},
								"senior": {
									"vi": "Cuộc hội ngộ không cần lời. Lông Appa, nước mắt Aang, ánh tinh thể xanh. Thế giới, trong một phút, đúng chỗ trở lại.",
									"en": "The reunion needed no speech. Appa's fur, Aang's tears, the green crystal light. For a minute the world sat back in its right place."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "hugged",
										"vi": "ôm"
									},
									{
										"en": "licked",
										"vi": "liếm"
									},
									{
										"en": "Appa is back",
										"vi": "Appa về rồi"
									},
									{
										"en": "Aang hugged Appa",
										"vi": "Aang ôm Appa"
									},
									{
										"en": "Appa licked Aang",
										"vi": "Appa liếm Aang"
									},
									{
										"en": "So happy",
										"vi": "Vui lắm"
									}
								],
								"primary": [
									{
										"en": "hugged",
										"vi": "ôm"
									},
									{
										"en": "They found Appa in a cave",
										"vi": "Họ tìm thấy Appa trong hang"
									},
									{
										"en": "Aang hugged him tight",
										"vi": "Aang ôm chặt"
									},
									{
										"en": "Everyone cried happy tears",
										"vi": "Mọi người khóc vui"
									}
								],
								"intermediate": [
									{
										"en": "Under the earth, Appa was waiting",
										"vi": "Dưới lòng đất, Appa đang chờ"
									},
									{
										"en": "Aang ran to him, face wet",
										"vi": "Aang lao tới, mặt ướt"
									},
									{
										"en": "The flying bison breathed out a long breath, as if a whole winter had melted",
										"vi": "Con bò bay thở ra một hơi dài, như cả mùa đông vừa tan"
									},
									{
										"en": "flying bison",
										"vi": "bò bay"
									}
								],
								"senior": [
									{
										"en": "The reunion needed no speech",
										"vi": "Cuộc hội ngộ không cần lời"
									},
									{
										"en": "Appa's fur, Aang's tears, the green crystal light",
										"vi": "Lông Appa, nước mắt Aang, ánh tinh thể xanh"
									},
									{
										"en": "For a minute the world sat back in its right place",
										"vi": "Thế giới, trong một phút, đúng chỗ trở lại"
									}
								]
							}
						},
						{
							"id": "s2-palace",
							"image": "/illustrations/s2-09.jpg",
							"file": "s2-page-09",
							"title": {
								"vi": "Trong thành",
								"en": "In the City"
							},
							"text": {
								"preschool": {
									"vi": "Azula vào thành. Azula hông hiền. Mọi người lo.",
									"en": "Azula came into the city. Azula is not kind. People worried."
								},
								"primary": {
									"vi": "Azula cũng vào thành phố lớn. Cô ấy muốn bắt Aang. Các bạn phải cẩn thận.",
									"en": "Azula also entered the great city. She wanted to catch Aang. The friends had to be careful."
								},
								"intermediate": {
									"vi": "Azula lọt vào cung điện Ba Sinh Thế. Thành phố tưởng mình an toàn. Đội Avatar biết chuyện sẽ khó.",
									"en": "Azula slipped into the palace of Ba Sing Se. The city thought it was safe. Team Avatar knew trouble was coming."
								},
								"senior": {
									"vi": "Lửa xanh đứng trên bậc cung. Thành phố lớn nhất thế giới vẫn có thể bị đánh lừa. Aang và bạn bè đứng quá nhỏ trước sân ấy.",
									"en": "Blue fire stood on the palace steps. The greatest city in the world could still be fooled. Aang and his friends looked very small in that courtyard."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Azula came into the city",
										"vi": "Azula vào thành"
									},
									{
										"en": "Azula is not kind",
										"vi": "Azula hông hiền"
									},
									{
										"en": "People worried",
										"vi": "Mọi người lo"
									},
									{
										"en": "is not kind",
										"vi": "hông hiền"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Azula also entered the great city",
										"vi": "Azula cũng vào thành phố lớn"
									},
									{
										"en": "She wanted to catch Aang",
										"vi": "Cô ấy muốn bắt Aang"
									},
									{
										"en": "The friends had to be careful",
										"vi": "Các bạn phải cẩn thận"
									}
								],
								"intermediate": [
									{
										"en": "Azula slipped into the palace of Ba Sing Se",
										"vi": "Azula lọt vào cung điện Ba Sinh Thế"
									},
									{
										"en": "The city thought it was safe",
										"vi": "Thành phố tưởng mình an toàn"
									},
									{
										"en": "Team Avatar knew trouble was coming",
										"vi": "Đội Avatar biết chuyện sẽ khó"
									}
								],
								"senior": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Blue fire stood on the palace steps",
										"vi": "Lửa xanh đứng trên bậc cung"
									},
									{
										"en": "The greatest city in the world could still be fooled",
										"vi": "Thành phố lớn nhất thế giới vẫn có thể bị đánh lừa"
									},
									{
										"en": "Aang and his friends looked very small in that courtyard",
										"vi": "Aang và bạn bè đứng quá nhỏ trước sân ấy"
									},
									{
										"en": "blue fire",
										"vi": "lửa xanh"
									}
								]
							}
						},
						{
							"id": "s2-sleep",
							"image": "/illustrations/s2-10.jpg",
							"file": "s2-page-10",
							"title": {
								"vi": "Aang ngủ",
								"en": "Aang Sleeps"
							},
							"text": {
								"preschool": {
									"vi": "Aang mệt lắm. Aang ngủ. Bạn bè ẵm Aang. Chuyện còn nữa. Ngủ ngon nha.",
									"en": "Aang was so tired. Aang slept. Friends carried Aang. The story goes on. Night night."
								},
								"primary": {
									"vi": "Aang bị thương và ngủ một giấc dài. Bạn bè đưa cậu đi. Mùa hai kết thúc. Mùa ba sẽ tới.",
									"en": "Aang was hurt and slept a long sleep. His friends carried him away. Season two ends. Season three will come."
								},
								"intermediate": {
									"vi": "Aang ngã xuống, kiệt sức. Katara giữ cậu. Đội Avatar rời thành phố trong đêm. Mùa đất khép lại — chưa phải hết.",
									"en": "Aang fell, exhausted. Katara held him. Team Avatar left the city in the night. The Earth season closes — but it is not the end."
								},
								"senior": {
									"vi": "Cậu ngủ trên lưng Appa như một lời hứa chưa xong. Bạn bè chèo lấy gió. Mùa đất lặng đi, để mùa lửa còn phải nói.",
									"en": "He slept on Appa's back like an unfinished promise. His friends took the wind. The Earth season grew quiet, so the Fire season would still have something to say."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Aang was so tired",
										"vi": "Aang mệt lắm"
									},
									{
										"en": "Aang slept",
										"vi": "Aang ngủ"
									},
									{
										"en": "Friends carried Aang",
										"vi": "Bạn bè ẵm Aang"
									},
									{
										"en": "The story goes on",
										"vi": "Chuyện còn nữa"
									},
									{
										"en": "Night night",
										"vi": "Ngủ ngon nha"
									},
									{
										"en": "so tired",
										"vi": "mệt lắm"
									},
									{
										"en": "story goes on",
										"vi": "chuyện còn nữa"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Aang was hurt and slept a long sleep",
										"vi": "Aang bị thương và ngủ một giấc dài"
									},
									{
										"en": "His friends carried him away",
										"vi": "Bạn bè đưa cậu đi"
									},
									{
										"en": "Season two ends",
										"vi": "Mùa hai kết thúc"
									},
									{
										"en": "Season three will come",
										"vi": "Mùa ba sẽ tới"
									},
									{
										"en": "season two",
										"vi": "mùa hai"
									},
									{
										"en": "season three",
										"vi": "mùa ba"
									},
									{
										"en": "a long sleep",
										"vi": "ngủ lâu"
									}
								],
								"intermediate": [
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "Aang fell, exhausted",
										"vi": "Aang ngã xuống, kiệt sức"
									},
									{
										"en": "Katara held him",
										"vi": "Katara giữ cậu"
									},
									{
										"en": "Team Avatar left the city in the night",
										"vi": "Đội Avatar rời thành phố trong đêm"
									},
									{
										"en": "The Earth season closes — but it is not the end",
										"vi": "Mùa đất khép lại — chưa phải hết"
									},
									{
										"en": "the earth season",
										"vi": "mùa đất"
									},
									{
										"en": "the end",
										"vi": "hết chuyện rồi"
									}
								],
								"senior": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "He slept on Appa's back like an unfinished promise",
										"vi": "Cậu ngủ trên lưng Appa như một lời hứa chưa xong"
									},
									{
										"en": "His friends took the wind",
										"vi": "Bạn bè chèo lấy gió"
									},
									{
										"en": "The Earth season grew quiet, so the Fire season would still have something to say",
										"vi": "Mùa đất lặng đi, để mùa lửa còn phải nói"
									},
									{
										"en": "the earth season",
										"vi": "mùa đất"
									},
									{
										"en": "the fire season",
										"vi": "mùa lửa"
									}
								]
							}
						}
					]
				},
				{
					"id": "s3",
					"vi": "Mùa 3 · Lửa",
					"en": "Season 3 · Fire",
					"tagline": {
						"vi": "Aang gặp lửa",
						"en": "Aang meets fire"
					},
					"pages": [
						{
							"id": "s3-cover",
							"image": "/illustrations/s3-00.jpg",
							"file": "s3-page-00",
							"title": {
								"vi": "Mùa lửa",
								"en": "Fire Season"
							},
							"text": {
								"preschool": {
									"vi": "Đây là chuyện Aang. Mùa ba. Aang thức dậy. Aang còn việc.",
									"en": "This is Aang. Season three. Aang wakes up. Aang still has work to do."
								},
								"primary": {
									"vi": "Đây là mùa ba. Aang mở mắt. Trời đỏ. Cậu phải gặp ông Ozai.",
									"en": "This is season three. Aang opens his eyes. The sky is red. He still has to face Ozai."
								},
								"intermediate": {
									"vi": "Mùa lửa mở ra trên vách đá. Aang tỉnh, nhỏ bé trước biển Hỏa quốc. Sao chổi đang tới.",
									"en": "The Fire season opens on a cliff. Aang wakes, small before the Fire Nation sea. A comet is coming."
								},
								"senior": {
									"vi": "Mùa lửa không dịu. Trời cháy ở chân trời, và đứa trẻ từng thổi gió phải học cách đứng trước một ông vua.",
									"en": "The Fire season is not gentle. The sky burns at the horizon, and the child who once blew the wind must learn to stand before a king."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Aang",
										"vi": "Đây là chuyện Aang"
									},
									{
										"en": "Season three",
										"vi": "Mùa ba"
									},
									{
										"en": "Aang wakes up",
										"vi": "Aang thức dậy"
									},
									{
										"en": "Aang still has work to do",
										"vi": "Aang còn việc"
									},
									{
										"en": "wakes up",
										"vi": "thức dậy"
									}
								],
								"primary": [
									{
										"en": "This is season three",
										"vi": "Đây là mùa ba"
									},
									{
										"en": "Aang opens his eyes",
										"vi": "Aang mở mắt"
									},
									{
										"en": "The sky is red",
										"vi": "Trời đỏ"
									},
									{
										"en": "He still has to face Ozai",
										"vi": "Cậu phải gặp ông Ozai"
									},
									{
										"en": "season three",
										"vi": "mùa ba"
									}
								],
								"intermediate": [
									{
										"en": "The Fire season opens on a cliff",
										"vi": "Mùa lửa mở ra trên vách đá"
									},
									{
										"en": "Aang wakes, small before the Fire Nation sea",
										"vi": "Aang tỉnh, nhỏ bé trước biển Hỏa quốc"
									},
									{
										"en": "A comet is coming",
										"vi": "Sao chổi đang tới"
									},
									{
										"en": "the fire season",
										"vi": "mùa lửa"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									}
								],
								"senior": [
									{
										"en": "The Fire season is not gentle",
										"vi": "Mùa lửa không dịu"
									},
									{
										"en": "The sky burns at the horizon, and the child who once blew the wind must learn to stand before a king",
										"vi": "Trời cháy ở chân trời, và đứa trẻ từng thổi gió phải học cách đứng trước một ông vua"
									},
									{
										"en": "the fire season",
										"vi": "mùa lửa"
									},
									{
										"en": "blew the wind",
										"vi": "thổi gió"
									},
									{
										"en": "must learn",
										"vi": "phải học"
									}
								]
							}
						},
						{
							"id": "s3-wake",
							"image": "/illustrations/s3-01.jpg",
							"file": "s3-page-01",
							"title": {
								"vi": "Thức dậy",
								"en": "Wake Up"
							},
							"text": {
								"preschool": {
									"vi": "Aang mở mắt. Katara ở đó. Sokka ở đó. Toph ở đó. Aang cười.",
									"en": "Aang opened his eyes. Katara was there. Sokka was there. Toph was there. Aang smiled."
								},
								"primary": {
									"vi": "Aang tỉnh dậy trong ngôi đền cũ. Bạn bè ngồi quanh. Cậu yếu, nhưng vui.",
									"en": "Aang woke in an old temple. His friends sat around him. He was weak, but glad."
								},
								"intermediate": {
									"vi": "Ánh nắng chạm mặt Aang. Đội Avatar đã giữ cậu suốt những ngày cậu ngủ. Cậu trở về với họ.",
									"en": "Sunlight touched Aang's face. Team Avatar had kept him through the days he slept. He came back to them."
								},
								"senior": {
									"vi": "Giấc ngủ dài khép lại. Những khuôn mặt quen — nước, đất, gió — chờ sẵn. Cậu chưa mạnh, nhưng cậu không còn một mình.",
									"en": "The long sleep closed. Familiar faces — water, earth, wind — were waiting. He was not strong yet, but he was not alone."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "Aang opened his eyes",
										"vi": "Aang mở mắt"
									},
									{
										"en": "Katara was there",
										"vi": "Katara ở đó"
									},
									{
										"en": "Sokka was there",
										"vi": "Sokka ở đó"
									},
									{
										"en": "Toph was there",
										"vi": "Toph ở đó"
									},
									{
										"en": "Aang smiled",
										"vi": "Aang cười"
									},
									{
										"en": "opened his eyes",
										"vi": "mở mắt"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Aang woke in an old temple",
										"vi": "Aang tỉnh dậy trong ngôi đền cũ"
									},
									{
										"en": "His friends sat around him",
										"vi": "Bạn bè ngồi quanh"
									},
									{
										"en": "He was weak, but glad",
										"vi": "Cậu yếu, nhưng vui"
									}
								],
								"intermediate": [
									{
										"en": "Sunlight touched Aang's face",
										"vi": "Ánh nắng chạm mặt Aang"
									},
									{
										"en": "Team Avatar had kept him through the days he slept",
										"vi": "Đội Avatar đã giữ cậu suốt những ngày cậu ngủ"
									},
									{
										"en": "He came back to them",
										"vi": "Cậu trở về với họ"
									},
									{
										"en": "came back",
										"vi": "về"
									}
								],
								"senior": [
									{
										"en": "The long sleep closed",
										"vi": "Giấc ngủ dài khép lại"
									},
									{
										"en": "Familiar faces — water, earth, wind — were waiting",
										"vi": "Những khuôn mặt quen — nước, đất, gió — chờ sẵn"
									},
									{
										"en": "He was not strong yet, but he was not alone",
										"vi": "Cậu chưa mạnh, nhưng cậu không còn một mình"
									}
								]
							}
						},
						{
							"id": "s3-zuko",
							"image": "/illustrations/s3-02.jpg",
							"file": "s3-page-02",
							"title": {
								"vi": "Zuko giúp",
								"en": "Zuko Helps"
							},
							"text": {
								"preschool": {
									"vi": "Zuko tới. Zuko muốn làm bạn. Zuko dạy Aang lửa. Aang tin.",
									"en": "Zuko came. Zuko wants to be a friend. Zuko teaches Aang fire. Aang trusts him."
								},
								"primary": {
									"vi": "Zuko tìm Aang và xin lỗi. Cậu muốn giúp. Aang suy nghĩ, rồi gật đầu.",
									"en": "Zuko found Aang and said sorry. He wanted to help. Aang thought, then nodded."
								},
								"intermediate": {
									"vi": "Hoàng tử Zuko đến Tây Phong Đền, không phải để bắt, mà để dạy. Lòng cậu đã đổi. Aang cho cậu một cơ hội.",
									"en": "Prince Zuko came to the Western Air Temple not to hunt, but to teach. His heart had turned. Aang gave him a chance."
								},
								"senior": {
									"vi": "Kẻ từng đuổi theo giờ đứng xin được đứng cùng. Zuko đưa ra lửa như một lời chuộc. Aang, vốn tha thứ như thở, nhận lấy.",
									"en": "The hunter now asked to stand with them. Zuko offered fire like a repayment. Aang, who forgave the way he breathed, took it."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "teaches",
										"vi": "dạy"
									},
									{
										"en": "Zuko came",
										"vi": "Zuko tới"
									},
									{
										"en": "Zuko wants to be a friend",
										"vi": "Zuko muốn làm bạn"
									},
									{
										"en": "Zuko teaches Aang fire",
										"vi": "Zuko dạy Aang lửa"
									},
									{
										"en": "Aang trusts him",
										"vi": "Aang tin"
									},
									{
										"en": "to be a friend",
										"vi": "làm bạn"
									}
								],
								"primary": [
									{
										"en": "Zuko found Aang and said sorry",
										"vi": "Zuko tìm Aang và xin lỗi"
									},
									{
										"en": "He wanted to help",
										"vi": "Cậu muốn giúp"
									},
									{
										"en": "Aang thought, then nodded",
										"vi": "Aang suy nghĩ, rồi gật đầu"
									}
								],
								"intermediate": [
									{
										"en": "Prince Zuko came to the Western Air Temple not to hunt, but to teach",
										"vi": "Hoàng tử Zuko đến Tây Phong Đền, không phải để bắt, mà để dạy"
									},
									{
										"en": "His heart had turned",
										"vi": "Lòng cậu đã đổi"
									},
									{
										"en": "Aang gave him a chance",
										"vi": "Aang cho cậu một cơ hội"
									},
									{
										"en": "Prince Zuko",
										"vi": "Hoàng tử Zuko"
									}
								],
								"senior": [
									{
										"en": "The hunter now asked to stand with them",
										"vi": "Kẻ từng đuổi theo giờ đứng xin được đứng cùng"
									},
									{
										"en": "Zuko offered fire like a repayment",
										"vi": "Zuko đưa ra lửa như một lời chuộc"
									},
									{
										"en": "Aang, who forgave the way he breathed, took it",
										"vi": "Aang, vốn tha thứ như thở, nhận lấy"
									}
								]
							}
						},
						{
							"id": "s3-dragons",
							"image": "/illustrations/s3-03.jpg",
							"file": "s3-page-03",
							"title": {
								"vi": "Rồng",
								"en": "Dragons"
							},
							"text": {
								"preschool": {
									"vi": "Có hai con rồng. Rồng đẹp lắm. Rồng dạy lửa ấm. Hông phải giận.",
									"en": "There are two dragons. The dragons are so pretty. They teach warm fire. Not angry fire."
								},
								"primary": {
									"vi": "Aang và Zuko gặp rồng. Rồng dạy rằng lửa thật là sự sống, không phải sự giận.",
									"en": "Aang and Zuko met dragons. The dragons taught that true fire is life, not anger."
								},
								"intermediate": {
									"vi": "Hai rồng cổ múa trên đỉnh núi, trao lại hỏa thuật nguyên bản: hơi ấm của mặt trời, không phải ngọn lửa của căm thù.",
									"en": "Two ancient dragons danced on a mountain peak and gave back the original firebending: the warmth of the sun, not the flame of hate."
								},
								"senior": {
									"vi": "Rồng không dạy đốt. Chúng dạy sống. Aang hiểu: lửa cũng có thể giữ người ta ấm, như gió giữ người ta bay.",
									"en": "The dragons did not teach burning. They taught living. Aang understood: fire can keep people warm, the way wind keeps people flying."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "There are two dragons",
										"vi": "Có hai con rồng"
									},
									{
										"en": "The dragons are so pretty",
										"vi": "Rồng đẹp lắm"
									},
									{
										"en": "They teach warm fire",
										"vi": "Rồng dạy lửa ấm"
									},
									{
										"en": "Not angry fire",
										"vi": "Hông phải giận"
									},
									{
										"en": "so pretty",
										"vi": "đẹp lắm"
									},
									{
										"en": "warm fire",
										"vi": "lửa ấm"
									},
									{
										"en": "angry fire",
										"vi": "lửa giận"
									}
								],
								"primary": [{
									"en": "Aang and Zuko met dragons",
									"vi": "Aang và Zuko gặp rồng"
								}, {
									"en": "The dragons taught that true fire is life, not anger",
									"vi": "Rồng dạy rằng lửa thật là sự sống, hông phải sự giận"
								}],
								"intermediate": [{
									"en": "firebending",
									"vi": "hỏa thuật"
								}, {
									"en": "Two ancient dragons danced on a mountain peak and gave back the original firebending: the warmth of the sun, not the flame of hate",
									"vi": "Hai rồng cổ múa trên đỉnh núi, trao lại hỏa thuật nguyên bản: hơi ấm của mặt trời, không phải ngọn lửa của căm thù"
								}],
								"senior": [
									{
										"en": "The dragons did not teach burning",
										"vi": "Rồng không dạy đốt"
									},
									{
										"en": "They taught living",
										"vi": "Chúng dạy sống"
									},
									{
										"en": "Aang understood: fire can keep people warm, the way wind keeps people flying",
										"vi": "Aang hiểu: lửa cũng có thể giữ người ta ấm, như gió giữ người ta bay"
									}
								]
							}
						},
						{
							"id": "s3-eclipse",
							"image": "/illustrations/s3-04.jpg",
							"file": "s3-page-04",
							"title": {
								"vi": "Trời tối",
								"en": "Dark Day"
							},
							"text": {
								"preschool": {
									"vi": "Trời tối giữa ngày. Các bạn thử. Hông được. Các bạn về.",
									"en": "The sky went dark in the day. The friends tried. It did not work. The friends went home."
								},
								"primary": {
									"vi": "Có ngày mặt trời bị che. Lửa yếu. Các bạn tấn công, nhưng phải rút.",
									"en": "There was a day the sun was covered. Fire grew weak. The friends attacked, but they had to leave."
								},
								"intermediate": {
									"vi": "Nhật thực đến. Hỏa thuật tắt. Đội Avatar và quân xâm lược không thắng. Họ rút về, còn việc chưa xong.",
									"en": "The eclipse came. Firebending died. Team Avatar and the invasion did not win. They pulled back, the work unfinished."
								},
								"senior": {
									"vi": "Ngày đen — mặt trời nuốt chính nó. Cơ hội mỏng như lưỡi dao. Họ không đủ. Im lặng sau nhật thực nặng hơn tiếng trống.",
									"en": "The dark day — the sun swallowed itself. The chance was thin as a blade. They were not enough. The quiet after the eclipse weighed more than drums."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "The sky went dark in the day",
										"vi": "Trời tối giữa ngày"
									},
									{
										"en": "The friends tried",
										"vi": "Các bạn thử"
									},
									{
										"en": "It did not work",
										"vi": "Hông được"
									},
									{
										"en": "The friends went home",
										"vi": "Các bạn về"
									},
									{
										"en": "did not work",
										"vi": "hông được"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "There was a day the sun was covered",
										"vi": "Có ngày mặt trời bị che"
									},
									{
										"en": "Fire grew weak",
										"vi": "Lửa yếu"
									},
									{
										"en": "The friends attacked, but they had to leave",
										"vi": "Các bạn tấn công, nhưng phải rút"
									}
								],
								"intermediate": [
									{
										"en": "firebending",
										"vi": "hỏa thuật"
									},
									{
										"en": "The eclipse came",
										"vi": "Nhật thực đến"
									},
									{
										"en": "Firebending died",
										"vi": "Hỏa thuật tắt"
									},
									{
										"en": "Team Avatar and the invasion did not win",
										"vi": "Đội Avatar và quân xâm lược không thắng"
									},
									{
										"en": "They pulled back, the work unfinished",
										"vi": "Họ rút về, còn việc chưa xong"
									}
								],
								"senior": [
									{
										"en": "The dark day — the sun swallowed itself",
										"vi": "Ngày đen — mặt trời nuốt chính nó"
									},
									{
										"en": "The chance was thin as a blade",
										"vi": "Cơ hội mỏng như lưỡi dao"
									},
									{
										"en": "They were not enough",
										"vi": "Họ không đủ"
									},
									{
										"en": "The quiet after the eclipse weighed more than drums",
										"vi": "Im lặng sau nhật thực nặng hơn tiếng trống"
									}
								]
							}
						},
						{
							"id": "s3-comet",
							"image": "/illustrations/s3-05.jpg",
							"file": "s3-page-05",
							"title": {
								"vi": "Sao chổi",
								"en": "The Comet"
							},
							"text": {
								"preschool": {
									"vi": "Có sao chổi đỏ. Sao to lắm. Phải lo. Aang nhìn trời.",
									"en": "There is a red comet. The star is so big. They must be careful. Aang looked at the sky."
								},
								"primary": {
									"vi": "Một sao chổi lớn đang tới. Ozai sẽ mạnh hơn. Các bạn phải sẵn sàng.",
									"en": "A great comet is coming. Ozai will be stronger. The friends must get ready."
								},
								"intermediate": {
									"vi": "Sao chổi Sozin kéo lửa đỏ qua đêm. Hỏa vương sẽ thừa cơ. Thời gian của Aang còn rất ít.",
									"en": "Sozin's comet dragged red fire across the night. The Fire Lord would use it. Aang had very little time."
								},
								"senior": {
									"vi": "Sao chổi không phải điềm lành. Nó là đồng hồ. Mỗi tia đỏ nhắc Aang: thế giới đang chờ một đứa trẻ chọn cách không đốt.",
									"en": "The comet was not a blessing. It was a clock. Every red spark reminded Aang: the world was waiting for a child to choose a way that would not burn."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "There is a red comet",
										"vi": "Có sao chổi đỏ"
									},
									{
										"en": "The star is so big",
										"vi": "Sao to lắm"
									},
									{
										"en": "They must be careful",
										"vi": "Phải lo"
									},
									{
										"en": "Aang looked at the sky",
										"vi": "Aang nhìn trời"
									},
									{
										"en": "so big",
										"vi": "to lắm"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "A great comet is coming",
										"vi": "Một sao chổi lớn đang tới"
									},
									{
										"en": "Ozai will be stronger",
										"vi": "Ozai sẽ mạnh hơn"
									},
									{
										"en": "The friends must get ready",
										"vi": "Các bạn phải sẵn sàng"
									}
								],
								"intermediate": [
									{
										"en": "Sozin's comet dragged red fire across the night",
										"vi": "Sao chổi Sozin kéo lửa đỏ qua đêm"
									},
									{
										"en": "The Fire Lord would use it",
										"vi": "Hỏa vương sẽ thừa cơ"
									},
									{
										"en": "Aang had very little time",
										"vi": "Thời gian của Aang còn rất ít"
									},
									{
										"en": "very little",
										"vi": "nhỏ xíu"
									}
								],
								"senior": [
									{
										"en": "The comet was not a blessing",
										"vi": "Sao chổi không phải điềm lành"
									},
									{
										"en": "It was a clock",
										"vi": "Nó là đồng hồ"
									},
									{
										"en": "Every red spark reminded Aang: the world was waiting for a child to choose a way that would not burn",
										"vi": "Mỗi tia đỏ nhắc Aang: thế giới đang chờ một đứa trẻ chọn cách không đốt"
									},
									{
										"en": "the comet",
										"vi": "sao chổi"
									}
								]
							}
						},
						{
							"id": "s3-ready",
							"image": "/illustrations/s3-06.jpg",
							"file": "s3-page-06",
							"title": {
								"vi": "Sẵn sàng",
								"en": "Ready"
							},
							"text": {
								"preschool": {
									"vi": "Mấy bạn đứng chung. Aang. Katara. Sokka. Toph. Zuko. Appa. Momo. Sẵn sàng.",
									"en": "The friends stood together. Aang. Katara. Sokka. Toph. Zuko. Appa. Momo. Ready."
								},
								"primary": {
									"vi": "Cả đội đứng trên đồi. Họ tin nhau. Họ sẽ làm phần của mình.",
									"en": "The whole team stood on a hill. They trusted one another. Each would do their part."
								},
								"intermediate": {
									"vi": "Đội Avatar chia việc: ai giữ Azula, ai giữ thành, ai đi với Aang. Hoàng hôn ấy, họ là một.",
									"en": "Team Avatar split the work: who would hold Azula, who the city, who would go with Aang. That sunset, they were one."
								},
								"senior": {
									"vi": "Không bài diễn văn. Chỉ một hàng người trên gió chiều. Họ đã đi quá xa để quay lại. Họ bước tới.",
									"en": "No speech. Only a line of people in the evening wind. They had come too far to turn back. They stepped forward."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "The friends stood together",
										"vi": "Mấy bạn đứng chung"
									},
									{
										"en": "stood together",
										"vi": "đứng chung"
									}
								],
								"primary": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "The whole team stood on a hill",
										"vi": "Cả đội đứng trên đồi"
									},
									{
										"en": "They trusted one another",
										"vi": "Họ tin nhau"
									},
									{
										"en": "Each would do their part",
										"vi": "Họ sẽ làm phần của mình"
									}
								],
								"intermediate": [{
									"en": "Team Avatar split the work: who would hold Azula, who the city, who would go with Aang",
									"vi": "Đội Avatar chia việc: ai giữ Azula, ai giữ thành, ai đi với Aang"
								}, {
									"en": "That sunset, they were one",
									"vi": "Hoàng hôn ấy, họ là một"
								}],
								"senior": [
									{
										"en": "Only a line of people in the evening wind",
										"vi": "Chỉ một hàng người trên gió chiều"
									},
									{
										"en": "They had come too far to turn back",
										"vi": "Họ đã đi quá xa để quay lại"
									},
									{
										"en": "They stepped forward",
										"vi": "Họ bước tới"
									}
								]
							}
						},
						{
							"id": "s3-ozai",
							"image": "/illustrations/s3-07.jpg",
							"file": "s3-page-07",
							"title": {
								"vi": "Ông Ozai",
								"en": "Ozai"
							},
							"text": {
								"preschool": {
									"vi": "Ông Ozai hông hiền. Ozai muốn đốt. Aang đứng đó. Aang hông muốn đánh.",
									"en": "Ozai is not kind. Ozai wants to burn. Aang stood there. Aang did not want to hit him."
								},
								"primary": {
									"vi": "Aang đối diện Hỏa vương. Ozai rất mạnh. Aang vẫn không muốn làm đau ông ta.",
									"en": "Aang faced the Fire Lord. Ozai was very strong. Aang still did not want to hurt him."
								},
								"intermediate": {
									"vi": "Dưới sao chổi, Aang và Ozai gặp nhau. Một đứa trẻ, một ông vua. Aang tìm đường không giết.",
									"en": "Under the comet, Aang and Ozai met. A child, a king. Aang looked for a path that would not kill."
								},
								"senior": {
									"vi": "Ozai là lửa không có mặt trời — chỉ thiêu. Aang nhớ rồng, nhớ gió, nhớ lời hứa không nhuốm máu. Cậu đứng yên trước cơn bão.",
									"en": "Ozai was fire without a sun — only burning. Aang remembered the dragons, the wind, the promise not to stain his hands. He stood still in the storm."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Ozai is not kind",
										"vi": "Ông Ozai hông hiền"
									},
									{
										"en": "Ozai wants to burn",
										"vi": "Ozai muốn đốt"
									},
									{
										"en": "Aang stood there",
										"vi": "Aang đứng đó"
									},
									{
										"en": "Aang did not want to hit him",
										"vi": "Aang hông muốn đánh"
									},
									{
										"en": "did not want",
										"vi": "hông muốn"
									},
									{
										"en": "is not kind",
										"vi": "hông hiền"
									}
								],
								"primary": [
									{
										"en": "Aang faced the Fire Lord",
										"vi": "Aang đối diện Hỏa vương"
									},
									{
										"en": "Ozai was very strong",
										"vi": "Ozai rất mạnh"
									},
									{
										"en": "Aang still did not want to hurt him",
										"vi": "Aang vẫn hông muốn làm đau ông ta"
									},
									{
										"en": "did not want",
										"vi": "hông muốn"
									}
								],
								"intermediate": [
									{
										"en": "Under the comet, Aang and Ozai met",
										"vi": "Dưới sao chổi, Aang và Ozai gặp nhau"
									},
									{
										"en": "A child, a king",
										"vi": "Một đứa trẻ, một ông vua"
									},
									{
										"en": "Aang looked for a path that would not kill",
										"vi": "Aang tìm đường không giết"
									},
									{
										"en": "the comet",
										"vi": "sao chổi"
									}
								],
								"senior": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Ozai was fire without a sun — only burning",
										"vi": "Ozai là lửa không có mặt trời — chỉ thiêu"
									},
									{
										"en": "Aang remembered the dragons, the wind, the promise not to stain his hands",
										"vi": "Aang nhớ rồng, nhớ gió, nhớ lời hứa không nhuốm máu"
									},
									{
										"en": "He stood still in the storm",
										"vi": "Cậu đứng yên trước cơn bão"
									}
								]
							}
						},
						{
							"id": "s3-take",
							"image": "/illustrations/s3-08.jpg",
							"file": "s3-page-08",
							"title": {
								"vi": "Cách hay",
								"en": "A Good Way"
							},
							"text": {
								"preschool": {
									"vi": "Aang lấy lửa của Ozai. Ozai hông đốt nữa. Aang giỏi lắm.",
									"en": "Aang took Ozai's fire away. Ozai could not burn things. Aang did so well."
								},
								"primary": {
									"vi": "Aang lấy đi sức lửa của Ozai. Ông ta không đốt được nữa. Không ai phải chết.",
									"en": "Aang took Ozai's fire power away. He could not burn things anymore. Nobody had to die."
								},
								"intermediate": {
									"vi": "Aang dùng năng lực Avatar tước hỏa thuật của Ozai. Hòa bình không cần một mạng người.",
									"en": "Aang used the Avatar's gift to take Ozai's firebending. Peace did not need a life."
								},
								"senior": {
									"vi": "Cậu lấy đi ngọn lửa, không lấy đi hơi thở. Đó là cách của Phong tộc, cách của một đứa trẻ vẫn tin người ta có thể đổi.",
									"en": "He took the flame and left the breath. That was the Air Nomad way, the way of a child who still believed people could change."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Aang took Ozai's fire away",
										"vi": "Aang lấy lửa của Ozai"
									},
									{
										"en": "Ozai could not burn things",
										"vi": "Ozai hông đốt nữa"
									},
									{
										"en": "Aang did so well",
										"vi": "Aang giỏi lắm"
									},
									{
										"en": "could not burn",
										"vi": "hông đốt nữa"
									},
									{
										"en": "did so well",
										"vi": "giỏi lắm"
									}
								],
								"primary": [
									{
										"en": "Aang took Ozai's fire power away",
										"vi": "Aang lấy đi sức lửa của Ozai"
									},
									{
										"en": "He could not burn things anymore",
										"vi": "Ông ta hông đốt được nữa"
									},
									{
										"en": "Nobody had to die",
										"vi": "Hông ai phải chết"
									},
									{
										"en": "could not burn",
										"vi": "hông đốt nữa"
									}
								],
								"intermediate": [
									{
										"en": "firebending",
										"vi": "hỏa thuật"
									},
									{
										"en": "Aang used the Avatar's gift to take Ozai's firebending",
										"vi": "Aang dùng năng lực Avatar tước hỏa thuật của Ozai"
									},
									{
										"en": "Peace did not need a life",
										"vi": "Hòa bình không cần một mạng người"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								],
								"senior": [{
									"en": "He took the flame and left the breath",
									"vi": "Cậu lấy đi ngọn lửa, không lấy đi hơi thở"
								}, {
									"en": "That was the Air Nomad way, the way of a child who still believed people could change",
									"vi": "Đó là cách của Phong tộc, cách của một đứa trẻ vẫn tin người ta có thể đổi"
								}]
							}
						},
						{
							"id": "s3-king",
							"image": "/illustrations/s3-09.jpg",
							"file": "s3-page-09",
							"title": {
								"vi": "Vua mới",
								"en": "New Lord"
							},
							"text": {
								"preschool": {
									"vi": "Zuko làm vua mới. Zuko cười. Người ta vui. Hông đốt nữa.",
									"en": "Zuko is the new lord. Zuko smiled. People were happy. No more burning."
								},
								"primary": {
									"vi": "Zuko trở thành Hỏa vương mới. Cậu hứa giữ hòa bình. Mọi người vỗ tay.",
									"en": "Zuko became the new Fire Lord. He promised to keep the peace. Everyone clapped."
								},
								"intermediate": {
									"vi": "Zuko bước ra bậc cung, không phải kẻ săn, mà người gìn giữ. Hỏa quốc thở ra.",
									"en": "Zuko stepped onto the palace stairs, not a hunter, but a keeper. The Fire Nation exhaled."
								},
								"senior": {
									"vi": "Vết sẹo vẫn đó. Ngai thì mới. Zuko cúi đầu trước dân mình như người đã nợ một thế giới, và bắt đầu trả.",
									"en": "The scar remained. The throne was new. Zuko bowed to his people like someone who owed a world, and began to pay."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "Zuko is the new lord",
										"vi": "Zuko làm vua mới"
									},
									{
										"en": "Zuko smiled",
										"vi": "Zuko cười"
									},
									{
										"en": "People were happy",
										"vi": "Người ta vui"
									},
									{
										"en": "No more burning",
										"vi": "Hông đốt nữa"
									}
								],
								"primary": [
									{
										"en": "Zuko became the new Fire Lord",
										"vi": "Zuko trở thành Hỏa vương mới"
									},
									{
										"en": "He promised to keep the peace",
										"vi": "Cậu hứa giữ hòa bình"
									},
									{
										"en": "Everyone clapped",
										"vi": "Mọi người vỗ tay"
									}
								],
								"intermediate": [
									{
										"en": "Zuko stepped onto the palace stairs, not a hunter, but a keeper",
										"vi": "Zuko bước ra bậc cung, không phải kẻ săn, mà người gìn giữ"
									},
									{
										"en": "The Fire Nation exhaled",
										"vi": "Hỏa quốc thở ra"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									}
								],
								"senior": [
									{
										"en": "The scar remained",
										"vi": "Vết sẹo vẫn đó"
									},
									{
										"en": "The throne was new",
										"vi": "Ngai thì mới"
									},
									{
										"en": "Zuko bowed to his people like someone who owed a world, and began to pay",
										"vi": "Zuko cúi đầu trước dân mình như người đã nợ một thế giới, và bắt đầu trả"
									}
								]
							}
						},
						{
							"id": "s3-peace",
							"image": "/illustrations/s3-10.jpg",
							"file": "s3-page-10",
							"title": {
								"vi": "Hòa bình",
								"en": "Peace"
							},
							"text": {
								"preschool": {
									"vi": "Mọi người vui. Trời nắng đẹp. Aang cười. Hết chuyện rồi. Ngủ ngon nha.",
									"en": "Everyone was happy. The sun was warm. Aang smiled. The end. Night night."
								},
								"primary": {
									"vi": "Hòa bình trở lại. Bạn bè ngồi với nhau. Câu chuyện kết thúc. Ngủ ngon nhé.",
									"en": "Peace came back. The friends sat together. The story is over. Good night."
								},
								"intermediate": {
									"vi": "Nắng phủ bốn quốc gia. Đội Avatar còn đó — nước, đất, lửa, gió. Chuyện khép lại. Chúc ngủ ngon.",
									"en": "Sunlight covered the four nations. Team Avatar remained — water, earth, fire, wind. The tale closes. Good night."
								},
								"senior": {
									"vi": "Thế giới thở ra. Aang, vẫn là đứa trẻ thổi gió, được phép chỉ còn là bạn. Chuyện đến đây là hết. Ngủ ngon, và mơ những giấc êm.",
									"en": "The world exhaled. Aang, still the child who blew the wind, was allowed to be only a friend. Here the tale is done. Sleep well, and dream gently."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "Everyone was happy",
										"vi": "Mọi người vui"
									},
									{
										"en": "The sun was warm",
										"vi": "Trời nắng đẹp"
									},
									{
										"en": "Aang smiled",
										"vi": "Aang cười"
									},
									{
										"en": "Night night",
										"vi": "Ngủ ngon nha"
									},
									{
										"en": "the end",
										"vi": "hết chuyện rồi"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Peace came back",
										"vi": "Hòa bình trở lại"
									},
									{
										"en": "The friends sat together",
										"vi": "Bạn bè ngồi với nhau"
									},
									{
										"en": "The story is over",
										"vi": "Câu chuyện kết thúc"
									},
									{
										"en": "Good night",
										"vi": "Ngủ ngon nha"
									},
									{
										"en": "came back",
										"vi": "về"
									}
								],
								"intermediate": [
									{
										"en": "Sunlight covered the four nations",
										"vi": "Nắng phủ bốn quốc gia"
									},
									{
										"en": "Team Avatar remained — water, earth, fire, wind",
										"vi": "Đội Avatar còn đó — nước, đất, lửa, gió"
									},
									{
										"en": "The tale closes",
										"vi": "Chuyện khép lại"
									}
								],
								"senior": [
									{
										"en": "The world exhaled",
										"vi": "Thế giới thở ra"
									},
									{
										"en": "Aang, still the child who blew the wind, was allowed to be only a friend",
										"vi": "Aang, vẫn là đứa trẻ thổi gió, được phép chỉ còn là bạn"
									},
									{
										"en": "Here the tale is done",
										"vi": "Chuyện đến đây là hết"
									},
									{
										"en": "Sleep well, and dream gently",
										"vi": "Ngủ ngon, và mơ những giấc êm"
									},
									{
										"en": "blew the wind",
										"vi": "thổi gió"
									}
								]
							}
						}
					]
				},
				{
					"id": "summary",
					"vi": "Tóm tắt",
					"en": "Summary",
					"tagline": {
						"vi": "Cả câu chuyện",
						"en": "The whole story"
					},
					"pages": [
						{
							"id": "cover",
							"image": "/illustrations/page-00.jpg",
							"file": "page-00",
							"title": {
								"vi": "Truyện Aang",
								"en": "Aang's Story"
							},
							"text": {
								"preschool": {
									"vi": "Đây là chuyện Aang. Aang thổi gió giỏi lắm.",
									"en": "This is Aang. Aang can blow the wind."
								},
								"primary": {
									"vi": "Đây là câu chuyện về Aang. Aang là cậu bé thổi gió rất giỏi.",
									"en": "This is the story of Aang. Aang is a boy who is very good at blowing the wind."
								},
								"intermediate": {
									"vi": "Đây là chuyện Aang, cậu bé cuối cùng còn điều khiển được gió. Aang thổi gió rất tài.",
									"en": "This is the tale of Aang, the last boy who could still command the wind. Aang is a gifted airbender."
								},
								"senior": {
									"vi": "Đây là chuyện Aang, vị Avatar cuối cùng của Phong Nhân tộc — đứa trẻ điều khiển gió như hơi thở của chính mình.",
									"en": "This is the story of Aang, last Avatar of the Air Nomads — a child who moved the wind as easily as he drew breath."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Aang",
										"vi": "Đây là chuyện Aang"
									},
									{
										"en": "Aang can blow the wind",
										"vi": "Aang thổi gió giỏi lắm"
									},
									{
										"en": "blow the wind",
										"vi": "thổi gió"
									}
								],
								"primary": [{
									"en": "This is the story of Aang",
									"vi": "Đây là câu chuyện về Aang"
								}, {
									"en": "Aang is a boy who is very good at blowing the wind",
									"vi": "Aang là cậu bé thổi gió rất giỏi"
								}],
								"intermediate": [{
									"en": "This is the tale of Aang, the last boy who could still command the wind",
									"vi": "Đây là chuyện Aang, cậu bé cuối cùng còn điều khiển được gió"
								}, {
									"en": "Aang is a gifted airbender",
									"vi": "Aang thổi gió rất tài"
								}],
								"senior": [{
									"en": "This is the story of Aang, last Avatar of the Air Nomads — a child who moved the wind as easily as he drew breath",
									"vi": "Đây là chuyện Aang, vị Avatar cuối cùng của Phong Nhân tộc — đứa trẻ điều khiển gió như hơi thở của chính mình"
								}, {
									"en": "Air Nomads",
									"vi": "Phong tộc"
								}]
							}
						},
						{
							"id": "four-lands",
							"image": "/illustrations/page-01.jpg",
							"file": "page-01",
							"title": {
								"vi": "Bốn chỗ",
								"en": "Four Places"
							},
							"text": {
								"preschool": {
									"vi": "Hồi xưa có bốn chỗ. Chỗ nước. Chỗ đất. Chỗ lửa. Chỗ gió. Aang là cậu bé. Aang làm được hết. Aang hay giúp người ta.",
									"en": "Long ago there were four places. Water. Earth. Fire. Wind. Aang is a little boy. Aang can use all four. Aang helps people."
								},
								"primary": {
									"vi": "Ngày xưa có bốn nơi trên thế giới. Nơi nước, nơi đất, nơi lửa, và nơi gió. Aang là một cậu bé đặc biệt. Cậu làm được cả bốn. Aang hay giúp người khác.",
									"en": "Long ago there were four places in the world. A water place, an earth place, a fire place, and a wind place. Aang is a special little boy. He can use all four. Aang likes to help people."
								},
								"intermediate": {
									"vi": "Ngày xưa thế giới chia thành bốn quốc gia: Thủy tộc, Thổ quốc, Hỏa quốc và Phong tộc. Aang là Avatar, người duy nhất học được cả bốn môn. Cậu dùng sức mạnh ấy để giúp người.",
									"en": "Long ago the world was divided into four nations: the Water Tribe, the Earth Kingdom, the Fire Nation, and the Air Nomads. Aang is the Avatar, the only one who can learn all four arts. He uses that gift to help people."
								},
								"senior": {
									"vi": "Thuở xưa, thế giới nương tựa vào bốn quốc gia: Thủy tộc của tuyết và sóng, Thổ quốc của núi đá, Hỏa quốc của ngọn lửa, và Phong tộc của những đám mây. Aang, đứa trẻ được chọn, mang trong mình cả bốn nguyên tố để giữ gìn sự cân bằng.",
									"en": "In an age long past, the world rested on four nations: the Water Tribe of snow and tide, the Earth Kingdom of stone, the Fire Nation of flame, and the Air Nomads of the clouds. Aang, the chosen child, carried all four elements so that balance might endure."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Long ago there were four places",
										"vi": "Hồi xưa có bốn chỗ"
									},
									{
										"en": "Aang is a little boy",
										"vi": "Aang là cậu bé"
									},
									{
										"en": "Aang can use all four",
										"vi": "Aang làm được hết"
									},
									{
										"en": "Aang helps people",
										"vi": "Aang hay giúp người ta"
									},
									{
										"en": "four places",
										"vi": "bốn chỗ"
									},
									{
										"en": "long ago",
										"vi": "hồi xưa"
									}
								],
								"primary": [
									{
										"en": "Long ago there were four places in the world",
										"vi": "Ngày xưa có bốn nơi trên thế giới"
									},
									{
										"en": "A water place, an earth place, a fire place, and a wind place",
										"vi": "Nơi nước, nơi đất, nơi lửa, và nơi gió"
									},
									{
										"en": "Aang is a special little boy",
										"vi": "Aang là một cậu bé đặc biệt"
									},
									{
										"en": "He can use all four",
										"vi": "Cậu làm được cả bốn"
									},
									{
										"en": "Aang likes to help people",
										"vi": "Aang hay giúp người khác"
									},
									{
										"en": "four places",
										"vi": "bốn chỗ"
									},
									{
										"en": "long ago",
										"vi": "hồi xưa"
									}
								],
								"intermediate": [
									{
										"en": "Long ago the world was divided into four nations: the Water Tribe, the Earth Kingdom, the Fire Nation, and the Air Nomads",
										"vi": "Ngày xưa thế giới chia thành bốn quốc gia: Thủy tộc, Thổ quốc, Hỏa quốc và Phong tộc"
									},
									{
										"en": "Aang is the Avatar, the only one who can learn all four arts",
										"vi": "Aang là Avatar, người duy nhất học được cả bốn môn"
									},
									{
										"en": "He uses that gift to help people",
										"vi": "Cậu dùng sức mạnh ấy để giúp người"
									},
									{
										"en": "long ago",
										"vi": "hồi xưa"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									},
									{
										"en": "Earth Kingdom",
										"vi": "Thổ quốc"
									},
									{
										"en": "Air Nomads",
										"vi": "Phong tộc"
									}
								],
								"senior": [
									{
										"en": "rested",
										"vi": "nghỉ"
									},
									{
										"en": "In an age long past, the world rested on four nations: the Water Tribe of snow and tide, the Earth Kingdom of stone, the Fire Nation of flame, and the Air Nomads of the clouds",
										"vi": "Thuở xưa, thế giới nương tựa vào bốn quốc gia: Thủy tộc của tuyết và sóng, Thổ quốc của núi đá, Hỏa quốc của ngọn lửa, và Phong tộc của những đám mây"
									},
									{
										"en": "Aang, the chosen child, carried all four elements so that balance might endure",
										"vi": "Aang, đứa trẻ được chọn, mang trong mình cả bốn nguyên tố để giữ gìn sự cân bằng"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									},
									{
										"en": "Earth Kingdom",
										"vi": "Thổ quốc"
									},
									{
										"en": "Air Nomads",
										"vi": "Phong tộc"
									}
								]
							}
						},
						{
							"id": "ice",
							"image": "/illustrations/page-02.jpg",
							"file": "page-02",
							"title": {
								"vi": "Đá lạnh",
								"en": "Cold Ice"
							},
							"text": {
								"preschool": {
									"vi": "Aang sợ. Aang chạy với Appa. Appa là bò to. Appa biết bay. Hai bạn rớt xuống nước. Nước lạnh lắm. Hai bạn ngủ trong đá lạnh. Ngủ lâu lắm.",
									"en": "Aang was scared. Aang ran with Appa. Appa is a big cow. Appa can fly. They fell in the water. The water was so cold. They slept in the ice. They slept a long, long time."
								},
								"primary": {
									"vi": "Aang sợ hãi và chạy đi cùng Appa. Appa là một con bò lớn biết bay. Hai bạn rơi xuống nước lạnh. Họ ngủ trong tảng đá lạnh rất lâu.",
									"en": "Aang was afraid and ran away with Appa. Appa is a big cow who can fly. The two friends fell into cold water. They slept inside the ice for a very long time."
								},
								"intermediate": {
									"vi": "Khi Hỏa quốc tấn công, Aang sợ hãi và chạy trốn cùng Appa, con bò bay trung thành. Cả hai rơi xuống biển và bị phong trong tảng băng. Họ ngủ trong đó hàng trăm năm.",
									"en": "When the Fire Nation attacked, Aang fled in fear with Appa, his loyal flying bison. The two fell into the sea and were sealed in an iceberg. They slept inside it for a hundred years."
								},
								"senior": {
									"vi": "Khi chiến tranh ập đến, nỗi sợ đẩy Aang và Appa — con bò bay trung thành — ra khơi. Biển cả nuốt lấy họ. Họ ngủ trong lòng băng hàng trăm năm, như hai linh hồn bị thời gian quên lãng.",
									"en": "When war arrived, fear drove Aang and Appa, his devoted flying bison, out to sea. The ocean swallowed them. They slept within the ice for a hundred years, two souls the world had nearly forgotten."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "Aang was scared",
										"vi": "Aang sợ"
									},
									{
										"en": "Aang ran with Appa",
										"vi": "Aang chạy với Appa"
									},
									{
										"en": "Appa is a big cow",
										"vi": "Appa là bò to"
									},
									{
										"en": "Appa can fly",
										"vi": "Appa biết bay"
									},
									{
										"en": "They fell in the water",
										"vi": "Hai bạn rớt xuống nước"
									},
									{
										"en": "The water was so cold",
										"vi": "Nước lạnh lắm"
									},
									{
										"en": "They slept in the ice",
										"vi": "Hai bạn ngủ trong đá lạnh"
									},
									{
										"en": "They slept a long, long time",
										"vi": "Ngủ lâu lắm"
									},
									{
										"en": "was scared",
										"vi": "sợ"
									},
									{
										"en": "so cold",
										"vi": "lạnh lắm"
									},
									{
										"en": "a long, long time",
										"vi": "lâu lắm"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "Aang was afraid and ran away with Appa",
										"vi": "Aang sợ hãi và chạy đi cùng Appa"
									},
									{
										"en": "Appa is a big cow who can fly",
										"vi": "Appa là một con bò lớn biết bay"
									},
									{
										"en": "The two friends fell into cold water",
										"vi": "Hai bạn rơi xuống nước lạnh"
									},
									{
										"en": "They slept inside the ice for a very long time",
										"vi": "Họ ngủ trong tảng đá lạnh rất lâu"
									},
									{
										"en": "was afraid",
										"vi": "sợ hãi"
									}
								],
								"intermediate": [
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "When the Fire Nation attacked, Aang fled in fear with Appa, his loyal flying bison",
										"vi": "Khi Hỏa quốc tấn công, Aang sợ hãi và chạy trốn cùng Appa, con bò bay trung thành"
									},
									{
										"en": "The two fell into the sea and were sealed in an iceberg",
										"vi": "Cả hai rơi xuống biển và bị phong trong tảng băng"
									},
									{
										"en": "They slept inside it for a hundred years",
										"vi": "Họ ngủ trong đó hàng trăm năm"
									},
									{
										"en": "flying bison",
										"vi": "bò bay"
									},
									{
										"en": "sealed in an iceberg",
										"vi": "phong trong tảng băng"
									},
									{
										"en": "an iceberg",
										"vi": "tảng băng"
									},
									{
										"en": "a hundred years",
										"vi": "một trăm năm"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									}
								],
								"senior": [
									{
										"en": "When war arrived, fear drove Aang and Appa, his devoted flying bison, out to sea",
										"vi": "Khi chiến tranh ập đến, nỗi sợ đẩy Aang và Appa — con bò bay trung thành — ra khơi"
									},
									{
										"en": "The ocean swallowed them",
										"vi": "Biển cả nuốt lấy họ"
									},
									{
										"en": "They slept within the ice for a hundred years, two souls the world had nearly forgotten",
										"vi": "Họ ngủ trong lòng băng hàng trăm năm, như hai linh hồn bị thời gian quên lãng"
									},
									{
										"en": "flying bison",
										"vi": "bò bay"
									},
									{
										"en": "a hundred years",
										"vi": "một trăm năm"
									},
									{
										"en": "two souls",
										"vi": "hai linh hồn"
									}
								]
							}
						},
						{
							"id": "friends",
							"image": "/illustrations/page-03.jpg",
							"file": "page-03",
							"title": {
								"vi": "Bạn mới",
								"en": "New Friends"
							},
							"text": {
								"preschool": {
									"vi": "Katara thấy đá lạnh. Sokka cũng thấy. Katara làm nước. Đá lạnh bể. Aang nhảy ra. Aang cười. Ba bạn chơi với nhau.",
									"en": "Katara saw the ice. Sokka saw it too. Katara moved the water. The ice broke. Aang jumped out. Aang smiled. The three friends played."
								},
								"primary": {
									"vi": "Katara thấy tảng đá lạnh. Sokka cũng thấy. Katara điều khiển nước làm đá bể ra. Aang nhảy ra ngoài và cười. Ba người bạn chơi với nhau.",
									"en": "Katara saw the ice. Sokka saw it too. Katara moved the water and the ice broke. Aang jumped out and smiled. The three friends played together."
								},
								"intermediate": {
									"vi": "Katara, một thủy nhân của Thủy tộc, phát hiện tảng băng. Sokka, anh trai cô, đứng bên cạnh. Katara dùng thủy thuật làm vỡ băng. Aang nhảy ra, mỉm cười, và ba người trở thành bạn.",
									"en": "Katara, a waterbender of the Water Tribe, found the iceberg. Her brother Sokka stood beside her. Katara used waterbending to crack the ice. Aang leapt out, smiling, and the three became friends."
								},
								"senior": {
									"vi": "Katara, thủy nhân trẻ của Thủy tộc phương Nam, nhìn thấy ánh sáng trong tảng băng. Sokka đứng cạnh em gái. Katara gọi nước lên, và băng vỡ tan. Aang bước ra với nụ cười, như vừa tỉnh một giấc mơ dài. Ba người, từ ấy, thành bạn.",
									"en": "Katara, a young waterbender of the Southern Water Tribe, saw a light inside the ice. Sokka stood beside his sister. Katara called the water, and the iceberg gave way. Aang stepped out smiling, as if waking from a long dream. From that hour, the three were friends."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "Katara saw the ice",
										"vi": "Katara thấy đá lạnh"
									},
									{
										"en": "Sokka saw it too",
										"vi": "Sokka cũng thấy"
									},
									{
										"en": "Katara moved the water",
										"vi": "Katara làm nước"
									},
									{
										"en": "The ice broke",
										"vi": "Đá lạnh bể"
									},
									{
										"en": "Aang jumped out",
										"vi": "Aang nhảy ra"
									},
									{
										"en": "Aang smiled",
										"vi": "Aang cười"
									},
									{
										"en": "The three friends played",
										"vi": "Ba bạn chơi với nhau"
									},
									{
										"en": "jumped out",
										"vi": "nhảy ra"
									},
									{
										"en": "moved the water",
										"vi": "làm nước"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "Katara saw the ice",
										"vi": "Katara thấy tảng đá lạnh"
									},
									{
										"en": "Sokka saw it too",
										"vi": "Sokka cũng thấy"
									},
									{
										"en": "Katara moved the water and the ice broke",
										"vi": "Katara điều khiển nước làm đá bể ra"
									},
									{
										"en": "Aang jumped out and smiled",
										"vi": "Aang nhảy ra ngoài và cười"
									},
									{
										"en": "The three friends played together",
										"vi": "Ba người bạn chơi với nhau"
									},
									{
										"en": "jumped out",
										"vi": "nhảy ra"
									},
									{
										"en": "the ice broke",
										"vi": "đá lạnh bể"
									},
									{
										"en": "moved the water",
										"vi": "làm nước"
									}
								],
								"intermediate": [
									{
										"en": "waterbending",
										"vi": "thủy thuật"
									},
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Katara, a waterbender of the Water Tribe, found the iceberg",
										"vi": "Katara, một thủy nhân của Thủy tộc, phát hiện tảng băng"
									},
									{
										"en": "Her brother Sokka stood beside her",
										"vi": "Sokka, anh trai cô, đứng bên cạnh"
									},
									{
										"en": "Katara used waterbending to crack the ice",
										"vi": "Katara dùng thủy thuật làm vỡ băng"
									},
									{
										"en": "Aang leapt out, smiling, and the three became friends",
										"vi": "Aang nhảy ra, mỉm cười, và ba người trở thành bạn"
									},
									{
										"en": "used waterbending",
										"vi": "dùng thủy thuật"
									}
								],
								"senior": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Katara, a young waterbender of the Southern Water Tribe, saw a light inside the ice",
										"vi": "Katara, thủy nhân trẻ của Thủy tộc phương Nam, nhìn thấy ánh sáng trong tảng băng"
									},
									{
										"en": "Sokka stood beside his sister",
										"vi": "Sokka đứng cạnh em gái"
									},
									{
										"en": "Katara called the water, and the iceberg gave way",
										"vi": "Katara gọi nước lên, và băng vỡ tan"
									},
									{
										"en": "Aang stepped out smiling, as if waking from a long dream",
										"vi": "Aang bước ra với nụ cười, như vừa tỉnh một giấc mơ dài"
									},
									{
										"en": "From that hour, the three were friends",
										"vi": "Ba người, từ ấy, thành bạn"
									},
									{
										"en": "Southern Water Tribe",
										"vi": "Thủy tộc phương Nam"
									},
									{
										"en": "young waterbender",
										"vi": "thủy nhân trẻ"
									}
								]
							}
						},
						{
							"id": "fly",
							"image": "/illustrations/page-04.jpg",
							"file": "page-04",
							"title": {
								"vi": "Bay",
								"en": "Fly"
							},
							"text": {
								"preschool": {
									"vi": "Momo tới nữa. Momo nhỏ xíu. Người lửa muốn bắt Aang. Các bạn lên Appa. Appa bay lên trời.",
									"en": "Momo came too. Momo is very little. Fire people wanted Aang. The friends got on Appa. Appa flew up, up, up."
								},
								"primary": {
									"vi": "Momo cũng tới. Momo là một con vật nhỏ xíu. Người lửa muốn bắt Aang. Các bạn leo lên Appa. Appa bay lên trời cao.",
									"en": "Momo came too. Momo is a tiny animal. The fire people wanted to catch Aang. The friends climbed onto Appa. Appa flew high into the sky."
								},
								"intermediate": {
									"vi": "Momo, chú cáo bay nhỏ, cũng theo chân họ. Lính Hỏa quốc muốn bắt Avatar. Cả nhóm leo lên Appa, và Appa bay vút lên trời.",
									"en": "Momo, a little winged lemur, joined them too. Fire Nation soldiers wanted to capture the Avatar. The group climbed onto Appa, and Appa soared into the sky."
								},
								"senior": {
									"vi": "Momo, chú cáo bay tinh nghịch, theo họ như một cái bóng nhỏ. Lính Hỏa quốc truy đuổi Avatar. Cả đoàn leo lên lưng Appa; con bò bay cất cánh, đưa họ lên những tầng mây.",
									"en": "Momo, a mischievous winged lemur, followed them like a little shadow. Fire Nation soldiers hunted the Avatar. The company climbed onto Appa's back; the flying bison lifted them into the clouds."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Momo came too",
										"vi": "Momo tới nữa"
									},
									{
										"en": "Momo is very little",
										"vi": "Momo nhỏ xíu"
									},
									{
										"en": "Fire people wanted Aang",
										"vi": "Người lửa muốn bắt Aang"
									},
									{
										"en": "The friends got on Appa",
										"vi": "Các bạn lên Appa"
									},
									{
										"en": "Appa flew up, up, up",
										"vi": "Appa bay lên trời"
									},
									{
										"en": "very little",
										"vi": "nhỏ xíu"
									},
									{
										"en": "came too",
										"vi": "tới nữa"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Momo came too",
										"vi": "Momo cũng tới"
									},
									{
										"en": "Momo is a tiny animal",
										"vi": "Momo là một con vật nhỏ xíu"
									},
									{
										"en": "The fire people wanted to catch Aang",
										"vi": "Người lửa muốn bắt Aang"
									},
									{
										"en": "The friends climbed onto Appa",
										"vi": "Các bạn leo lên Appa"
									},
									{
										"en": "Appa flew high into the sky",
										"vi": "Appa bay lên trời cao"
									},
									{
										"en": "came too",
										"vi": "tới nữa"
									}
								],
								"intermediate": [
									{
										"en": "Momo, a little winged lemur, joined them too",
										"vi": "Momo, chú cáo bay nhỏ, cũng theo chân họ"
									},
									{
										"en": "Fire Nation soldiers wanted to capture the Avatar",
										"vi": "Lính Hỏa quốc muốn bắt Avatar"
									},
									{
										"en": "The group climbed onto Appa, and Appa soared into the sky",
										"vi": "Cả nhóm leo lên Appa, và Appa bay vút lên trời"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								],
								"senior": [
									{
										"en": "Momo, a mischievous winged lemur, followed them like a little shadow",
										"vi": "Momo, chú cáo bay tinh nghịch, theo họ như một cái bóng nhỏ"
									},
									{
										"en": "Fire Nation soldiers hunted the Avatar",
										"vi": "Lính Hỏa quốc truy đuổi Avatar"
									},
									{
										"en": "The company climbed onto Appa's back; the flying bison lifted them into the clouds",
										"vi": "Cả đoàn leo lên lưng Appa; con bò bay cất cánh, đưa họ lên những tầng mây"
									},
									{
										"en": "flying bison",
										"vi": "bò bay"
									},
									{
										"en": "Fire Nation",
										"vi": "Hỏa quốc"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								]
							}
						},
						{
							"id": "water",
							"image": "/illustrations/page-05.jpg",
							"file": "page-05",
							"title": {
								"vi": "Nước",
								"en": "Water"
							},
							"text": {
								"preschool": {
									"vi": "Katara dạy Aang. Aang học làm nước. Nước xoay xoay. Aang vui lắm. Aang chơi với nước.",
									"en": "Katara taught Aang. Aang moved the water. The water went round and round. Aang was so happy. Aang played in the water."
								},
								"primary": {
									"vi": "Katara dạy Aang cách điều khiển nước. Nước xoay tròn quanh cậu. Aang rất vui. Cậu chơi với nước cả buổi.",
									"en": "Katara taught Aang how to move the water. The water spun around him. Aang was very happy. He played with the water all day."
								},
								"intermediate": {
									"vi": "Katara dạy Aang thủy thuật. Nước xoay thành vòng tròn theo ý cậu. Aang vui sướng vì lần đầu học được môn của Thủy tộc.",
									"en": "Katara taught Aang waterbending. The water spun in rings at his command. Aang was overjoyed to learn the art of the Water Tribe for the first time."
								},
								"senior": {
									"vi": "Bên dòng sông, Katara truyền dạy thủy thuật. Nước nghe lời Aang, xoay thành những vòng sáng. Niềm vui của cậu — lần đầu chạm tới nguyên tố thứ hai — trong trẻo như chính dòng sông ấy.",
									"en": "Beside the river, Katara taught him waterbending. The water answered Aang, turning in bright rings. His joy — touching a second element for the first time — was as clear as the river itself."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Katara taught Aang",
										"vi": "Katara dạy Aang"
									},
									{
										"en": "Aang moved the water",
										"vi": "Aang học làm nước"
									},
									{
										"en": "The water went round and round",
										"vi": "Nước xoay xoay"
									},
									{
										"en": "Aang was so happy",
										"vi": "Aang vui lắm"
									},
									{
										"en": "Aang played in the water",
										"vi": "Aang chơi với nước"
									},
									{
										"en": "moved the water",
										"vi": "làm nước"
									},
									{
										"en": "so happy",
										"vi": "vui lắm"
									}
								],
								"primary": [
									{
										"en": "Katara taught Aang how to move the water",
										"vi": "Katara dạy Aang cách điều khiển nước"
									},
									{
										"en": "The water spun around him",
										"vi": "Nước xoay tròn quanh cậu"
									},
									{
										"en": "Aang was very happy",
										"vi": "Aang rất vui"
									},
									{
										"en": "He played with the water all day",
										"vi": "Cậu chơi với nước cả buổi"
									}
								],
								"intermediate": [
									{
										"en": "waterbending",
										"vi": "thủy thuật"
									},
									{
										"en": "Katara taught Aang waterbending",
										"vi": "Katara dạy Aang thủy thuật"
									},
									{
										"en": "The water spun in rings at his command",
										"vi": "Nước xoay thành vòng tròn theo ý cậu"
									},
									{
										"en": "Aang was overjoyed to learn the art of the Water Tribe for the first time",
										"vi": "Aang vui sướng vì lần đầu học được môn của Thủy tộc"
									}
								],
								"senior": [
									{
										"en": "waterbending",
										"vi": "thủy thuật"
									},
									{
										"en": "Beside the river, Katara taught him waterbending",
										"vi": "Bên dòng sông, Katara truyền dạy thủy thuật"
									},
									{
										"en": "The water answered Aang, turning in bright rings",
										"vi": "Nước nghe lời Aang, xoay thành những vòng sáng"
									},
									{
										"en": "His joy — touching a second element for the first time — was as clear as the river itself",
										"vi": "Niềm vui của cậu — lần đầu chạm tới nguyên tố thứ hai — trong trẻo như chính dòng sông ấy"
									}
								]
							}
						},
						{
							"id": "earth",
							"image": "/illustrations/page-06.jpg",
							"file": "page-06",
							"title": {
								"vi": "Đất",
								"en": "Earth"
							},
							"text": {
								"preschool": {
									"vi": "Có bé Toph. Toph nhỏ xíu. Toph hông thấy. Toph biết đất. Toph dạy Aang. Aang học làm đá. Toph khỏe lắm.",
									"en": "This is Toph. Toph is little. Toph cannot see. Toph can feel the ground. Toph taught Aang. Aang moved the rocks. Toph is so strong."
								},
								"primary": {
									"vi": "Có một cô bé tên Toph. Toph rất nhỏ và không nhìn thấy. Nhưng Toph cảm nhận được đất. Toph dạy Aang đẩy đá. Toph rất khỏe.",
									"en": "There was a little girl named Toph. Toph is small and cannot see. But Toph can feel the ground. Toph taught Aang to move the rocks. Toph is very strong."
								},
								"intermediate": {
									"vi": "Toph là một cô bé thổ nhân mù, nhưng cô cảm nhận đất còn rõ hơn người thường. Cô dạy Aang thổ thuật. Aang học cách đẩy đá, và Toph mạnh mẽ một cách đáng kinh ngạc.",
									"en": "Toph is a blind earthbender, yet she feels the ground more clearly than anyone. She taught Aang earthbending. Aang learned to move the rocks, and Toph was astonishingly strong."
								},
								"senior": {
									"vi": "Toph Bé, thổ nhân mù từ thuở lọt lòng, đọc mặt đất như người khác đọc chữ. Cô dạy Aang thổ thuật: chân bám đá, ý chí đẩy núi. Sức mạnh của Toph không nằm ở mắt, mà ở trái đất dưới chân.",
									"en": "Little Toph, an earthbender blind since birth, read the ground the way others read a page. She taught Aang earthbending: feet rooted in stone, will pressing against the mountain. Toph's strength lived not in her eyes, but in the earth beneath her."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Toph",
										"vi": "Có bé Toph"
									},
									{
										"en": "Toph is little",
										"vi": "Toph nhỏ xíu"
									},
									{
										"en": "Toph cannot see",
										"vi": "Toph hông thấy"
									},
									{
										"en": "Toph can feel the ground",
										"vi": "Toph biết đất"
									},
									{
										"en": "Toph taught Aang",
										"vi": "Toph dạy Aang"
									},
									{
										"en": "Aang moved the rocks",
										"vi": "Aang học làm đá"
									},
									{
										"en": "Toph is so strong",
										"vi": "Toph khỏe lắm"
									},
									{
										"en": "so strong",
										"vi": "khỏe lắm"
									},
									{
										"en": "cannot see",
										"vi": "hông thấy"
									}
								],
								"primary": [
									{
										"en": "There was a little girl named Toph",
										"vi": "Có một cô bé tên Toph"
									},
									{
										"en": "Toph is small and cannot see",
										"vi": "Toph rất nhỏ và hông nhìn thấy"
									},
									{
										"en": "But Toph can feel the ground",
										"vi": "Nhưng Toph cảm nhận được đất"
									},
									{
										"en": "Toph taught Aang to move the rocks",
										"vi": "Toph dạy Aang đẩy đá"
									},
									{
										"en": "Toph is very strong",
										"vi": "Toph rất khỏe"
									},
									{
										"en": "cannot see",
										"vi": "hông thấy"
									}
								],
								"intermediate": [
									{
										"en": "earthbending",
										"vi": "thổ thuật"
									},
									{
										"en": "Toph is a blind earthbender, yet she feels the ground more clearly than anyone",
										"vi": "Toph là một cô bé thổ nhân mù, nhưng cô cảm nhận đất còn rõ hơn người thường"
									},
									{
										"en": "She taught Aang earthbending",
										"vi": "Cô dạy Aang thổ thuật"
									},
									{
										"en": "Aang learned to move the rocks, and Toph was astonishingly strong",
										"vi": "Aang học cách đẩy đá, và Toph mạnh mẽ một cách đáng kinh ngạc"
									}
								],
								"senior": [
									{
										"en": "earthbending",
										"vi": "thổ thuật"
									},
									{
										"en": "Little Toph, an earthbender blind since birth, read the ground the way others read a page",
										"vi": "Toph Bé, thổ nhân mù từ thuở lọt lòng, đọc mặt đất như người khác đọc chữ"
									},
									{
										"en": "She taught Aang earthbending: feet rooted in stone, will pressing against the mountain",
										"vi": "Cô dạy Aang thổ thuật: chân bám đá, ý chí đẩy núi"
									},
									{
										"en": "Toph's strength lived not in her eyes, but in the earth beneath her",
										"vi": "Sức mạnh của Toph không nằm ở mắt, mà ở trái đất dưới chân"
									}
								]
							}
						},
						{
							"id": "fire",
							"image": "/illustrations/page-zuko.jpg",
							"file": "page-07",
							"title": {
								"vi": "Lửa",
								"en": "Fire"
							},
							"text": {
								"preschool": {
									"vi": "Zuko hay đuổi Aang. Zuko có vết trên mặt. Zuko buồn. Rồi Zuko thành bạn. Zuko dạy Aang làm lửa.",
									"en": "Zuko used to chase Aang. Zuko has a mark on his face. Zuko was sad. Then Zuko was a friend. Zuko taught Aang to move fire."
								},
								"primary": {
									"vi": "Zuko từng đuổi theo Aang. Zuko có một vết trên mặt. Zuko buồn lắm. Sau đó Zuko trở thành bạn. Zuko dạy Aang điều khiển lửa.",
									"en": "Zuko used to chase Aang. Zuko has a mark on his face. Zuko was very sad. Then Zuko became a friend. Zuko taught Aang to move fire."
								},
								"intermediate": {
									"vi": "Hoàng tử Zuko từng săn đuổi Aang khắp nơi. Vết sẹo trên mặt cậu là dấu của nỗi buồn. Rồi Zuko đổi ý, trở thành bạn, và dạy Aang hỏa thuật.",
									"en": "Prince Zuko once hunted Aang across the world. The scar on his face was a mark of sorrow. Then Zuko changed, became a friend, and taught Aang firebending."
								},
								"senior": {
									"vi": "Hoàng tử Zuko từng là kẻ săn đuổi không biết mệt. Vết sẹo trên mặt cậu là kỷ niệm của lửa và nỗi nhục. Rồi lòng cậu đổi thay. Zuko đứng về phía Aang, và lấy hỏa thuật — ngọn lửa từng làm cậu tổn thương — truyền lại như một món quà.",
									"en": "Prince Zuko had been a tireless hunter. The scar on his face was a memory of fire and shame. Then his heart turned. Zuko stood with Aang, and offered firebending — the flame that had once wounded him — as a gift."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Zuko used to chase Aang",
										"vi": "Zuko hay đuổi Aang"
									},
									{
										"en": "Zuko has a mark on his face",
										"vi": "Zuko có vết trên mặt"
									},
									{
										"en": "Zuko was sad",
										"vi": "Zuko buồn"
									},
									{
										"en": "Then Zuko was a friend",
										"vi": "Rồi Zuko thành bạn"
									},
									{
										"en": "Zuko taught Aang to move fire",
										"vi": "Zuko dạy Aang làm lửa"
									},
									{
										"en": "a mark on his face",
										"vi": "vết trên mặt"
									},
									{
										"en": "used to chase",
										"vi": "hay đuổi"
									}
								],
								"primary": [
									{
										"en": "Zuko used to chase Aang",
										"vi": "Zuko từng đuổi theo Aang"
									},
									{
										"en": "Zuko has a mark on his face",
										"vi": "Zuko có một vết trên mặt"
									},
									{
										"en": "Zuko was very sad",
										"vi": "Zuko buồn lắm"
									},
									{
										"en": "Then Zuko became a friend",
										"vi": "Sau đó Zuko trở thành bạn"
									},
									{
										"en": "Zuko taught Aang to move fire",
										"vi": "Zuko dạy Aang điều khiển lửa"
									},
									{
										"en": "became a friend",
										"vi": "thành bạn"
									},
									{
										"en": "a mark on his face",
										"vi": "vết trên mặt"
									},
									{
										"en": "used to chase",
										"vi": "hay đuổi"
									}
								],
								"intermediate": [
									{
										"en": "firebending",
										"vi": "hỏa thuật"
									},
									{
										"en": "Prince Zuko once hunted Aang across the world",
										"vi": "Hoàng tử Zuko từng săn đuổi Aang khắp nơi"
									},
									{
										"en": "The scar on his face was a mark of sorrow",
										"vi": "Vết sẹo trên mặt cậu là dấu của nỗi buồn"
									},
									{
										"en": "Then Zuko changed, became a friend, and taught Aang firebending",
										"vi": "Rồi Zuko đổi ý, trở thành bạn, và dạy Aang hỏa thuật"
									},
									{
										"en": "became a friend",
										"vi": "thành bạn"
									},
									{
										"en": "Prince Zuko",
										"vi": "Hoàng tử Zuko"
									}
								],
								"senior": [
									{
										"en": "firebending",
										"vi": "hỏa thuật"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Prince Zuko had been a tireless hunter",
										"vi": "Hoàng tử Zuko từng là kẻ săn đuổi không biết mệt"
									},
									{
										"en": "The scar on his face was a memory of fire and shame",
										"vi": "Vết sẹo trên mặt cậu là kỷ niệm của lửa và nỗi nhục"
									},
									{
										"en": "Then his heart turned",
										"vi": "Rồi lòng cậu đổi thay"
									},
									{
										"en": "Zuko stood with Aang, and offered firebending — the flame that had once wounded him — as a gift",
										"vi": "Zuko đứng về phía Aang, và lấy hỏa thuật — ngọn lửa từng làm cậu tổn thương — truyền lại như một món quà"
									},
									{
										"en": "Prince Zuko",
										"vi": "Hoàng tử Zuko"
									}
								]
							}
						},
						{
							"id": "team",
							"image": "/illustrations/page-07.jpg",
							"file": "page-08",
							"title": {
								"vi": "Đội bạn",
								"en": "The Team"
							},
							"text": {
								"preschool": {
									"vi": "Mấy bạn đứng chung. Aang. Katara. Sokka. Toph. Zuko. Appa. Momo. Tất cả là bạn.",
									"en": "The friends stood together. Aang. Katara. Sokka. Toph. Zuko. Appa. Momo. They are a team."
								},
								"primary": {
									"vi": "Các bạn đứng cạnh nhau. Aang, Katara, Sokka, Toph, Zuko, Appa và Momo. Họ là một đội. Họ tin tưởng nhau.",
									"en": "The friends stood side by side. Aang, Katara, Sokka, Toph, Zuko, Appa, and Momo. They are a team. They trust one another."
								},
								"intermediate": {
									"vi": "Đội Avatar đứng bên nhau trên đồi lúc hoàng hôn: Aang, Katara, Sokka, Toph, Zuko, Appa và Momo. Họ tin nhau. Họ sẵn sàng bảo vệ bốn quốc gia.",
									"en": "Team Avatar stood together on a hill at sunset: Aang, Katara, Sokka, Toph, Zuko, Appa, and Momo. They trusted one another. They were ready to protect the four nations."
								},
								"senior": {
									"vi": "Trên sườn đồi lúc chiều tàn, Đội Avatar đứng thành một hàng: Aang, Katara, Sokka, Toph, Zuko, bên Appa và Momo. Không lời thề nào cần nói. Họ đã là gia đình, và thế giới đang chờ họ giữ.",
									"en": "On a hillside in the last light, Team Avatar stood in a line: Aang, Katara, Sokka, Toph, Zuko, with Appa and Momo. No oath was needed. They were already a family, and the world was waiting for them to keep it."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "The friends stood together",
										"vi": "Mấy bạn đứng chung"
									},
									{
										"en": "They are a team",
										"vi": "Tất cả là bạn"
									},
									{
										"en": "stood together",
										"vi": "đứng chung"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "The friends stood side by side",
										"vi": "Các bạn đứng cạnh nhau"
									},
									{
										"en": "Aang, Katara, Sokka, Toph, Zuko, Appa, and Momo",
										"vi": "Aang, Katara, Sokka, Toph, Zuko, Appa và Momo"
									},
									{
										"en": "They are a team",
										"vi": "Họ là một đội"
									},
									{
										"en": "They trust one another",
										"vi": "Họ tin tưởng nhau"
									}
								],
								"intermediate": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Team Avatar stood together on a hill at sunset: Aang, Katara, Sokka, Toph, Zuko, Appa, and Momo",
										"vi": "Đội Avatar đứng bên nhau trên đồi lúc hoàng hôn: Aang, Katara, Sokka, Toph, Zuko, Appa và Momo"
									},
									{
										"en": "They trusted one another",
										"vi": "Họ tin nhau"
									},
									{
										"en": "They were ready to protect the four nations",
										"vi": "Họ sẵn sàng bảo vệ bốn quốc gia"
									},
									{
										"en": "stood together",
										"vi": "đứng chung"
									}
								],
								"senior": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "On a hillside in the last light, Team Avatar stood in a line: Aang, Katara, Sokka, Toph, Zuko, with Appa and Momo",
										"vi": "Trên sườn đồi lúc chiều tàn, Đội Avatar đứng thành một hàng: Aang, Katara, Sokka, Toph, Zuko, bên Appa và Momo"
									},
									{
										"en": "No oath was needed",
										"vi": "Không lời thề nào cần nói"
									},
									{
										"en": "They were already a family, and the world was waiting for them to keep it",
										"vi": "Họ đã là gia đình, và thế giới đang chờ họ giữ"
									}
								]
							}
						},
						{
							"id": "king",
							"image": "/illustrations/page-08.jpg",
							"file": "page-09",
							"title": {
								"vi": "Ông Ozai",
								"en": "Ozai"
							},
							"text": {
								"preschool": {
									"vi": "Ông Ozai hông hiền. Ozai muốn đốt nhà. Aang hông muốn đánh. Aang ngồi im. Aang nghĩ ra cách.",
									"en": "Ozai was not kind. Ozai wanted to burn homes. Aang did not want to hit him. Aang sat still. Aang found a good way."
								},
								"primary": {
									"vi": "Ông Ozai không tốt bụng. Ozai muốn đốt nhà của mọi người. Aang không muốn đánh ông ta. Aang ngồi yên và nghĩ ra một cách hay.",
									"en": "Ozai was not a kind man. Ozai wanted to burn people's homes. Aang did not want to fight him. Aang sat still and thought of a good way."
								},
								"intermediate": {
									"vi": "Hỏa vương Ozai không có lòng nhân. Ông muốn thiêu rụi các quốc gia khác. Aang không muốn giết ông. Cậu ngồi thiền, tìm một con đường khác.",
									"en": "Fire Lord Ozai had no kindness in him. He wanted to burn the other nations. Aang did not want to kill him. He sat in stillness and searched for another path."
								},
								"senior": {
									"vi": "Hỏa vương Ozai, người không biết thương xót, muốn lấy lửa nuốt trọn các quốc gia. Aang đối diện ông — một đứa trẻ trước một ông vua. Cậu không giơ nắm đấm. Cậu ngồi xuống, thở, và tìm một con đường không nhuốm máu.",
									"en": "Fire Lord Ozai, a man without mercy, meant to let fire swallow the nations. Aang faced him — a child before a king. He did not raise a fist. He sat, breathed, and looked for a path that would not be stained with blood."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Ozai was not kind",
										"vi": "Ông Ozai hông hiền"
									},
									{
										"en": "Ozai wanted to burn homes",
										"vi": "Ozai muốn đốt nhà"
									},
									{
										"en": "Aang did not want to hit him",
										"vi": "Aang hông muốn đánh"
									},
									{
										"en": "Aang sat still",
										"vi": "Aang ngồi im"
									},
									{
										"en": "Aang found a good way",
										"vi": "Aang nghĩ ra cách"
									},
									{
										"en": "did not want",
										"vi": "hông muốn"
									},
									{
										"en": "was not kind",
										"vi": "hông hiền"
									},
									{
										"en": "sat still",
										"vi": "ngồi im"
									},
									{
										"en": "a good way",
										"vi": "cách hay"
									}
								],
								"primary": [
									{
										"en": "Ozai was not a kind man",
										"vi": "Ông Ozai hông tốt bụng"
									},
									{
										"en": "Ozai wanted to burn people's homes",
										"vi": "Ozai muốn đốt nhà của mọi người"
									},
									{
										"en": "Aang did not want to fight him",
										"vi": "Aang hông muốn đánh ông ta"
									},
									{
										"en": "Aang sat still and thought of a good way",
										"vi": "Aang ngồi yên và nghĩ ra một cách hay"
									},
									{
										"en": "did not want",
										"vi": "hông muốn"
									},
									{
										"en": "sat still",
										"vi": "ngồi im"
									},
									{
										"en": "a good way",
										"vi": "cách hay"
									}
								],
								"intermediate": [
									{
										"en": "Fire Lord Ozai had no kindness in him",
										"vi": "Hỏa vương Ozai không có lòng nhân"
									},
									{
										"en": "He wanted to burn the other nations",
										"vi": "Ông muốn thiêu rụi các quốc gia khác"
									},
									{
										"en": "Aang did not want to kill him",
										"vi": "Aang không muốn giết ông"
									},
									{
										"en": "He sat in stillness and searched for another path",
										"vi": "Cậu ngồi thiền, tìm một con đường khác"
									},
									{
										"en": "did not want",
										"vi": "hông muốn"
									}
								],
								"senior": [
									{
										"en": "Fire Lord Ozai, a man without mercy, meant to let fire swallow the nations",
										"vi": "Hỏa vương Ozai, người không biết thương xót, muốn lấy lửa nuốt trọn các quốc gia"
									},
									{
										"en": "Aang faced him — a child before a king",
										"vi": "Aang đối diện ông — một đứa trẻ trước một ông vua"
									},
									{
										"en": "He did not raise a fist",
										"vi": "Cậu không giơ nắm đấm"
									},
									{
										"en": "He sat, breathed, and looked for a path that would not be stained with blood",
										"vi": "Cậu ngồi xuống, thở, và tìm một con đường không nhuốm máu"
									}
								]
							}
						},
						{
							"id": "peace",
							"image": "/illustrations/page-09.jpg",
							"file": "page-10",
							"title": {
								"vi": "Hòa bình",
								"en": "Peace"
							},
							"text": {
								"preschool": {
									"vi": "Aang lấy lửa của Ozai. Ozai hông đốt nữa. Mọi người vui. Trời nắng đẹp. Ngủ ngon nha.",
									"en": "Aang took Ozai's fire away. Ozai could not burn things. People were happy. The sun was warm. Night night."
								},
								"primary": {
									"vi": "Aang lấy đi lửa của Ozai. Ozai không đốt được nữa. Mọi người vui mừng. Trời nắng đẹp. Câu chuyện kết thúc. Ngủ ngon nhé.",
									"en": "Aang took Ozai's fire away. Ozai could not burn things anymore. Everyone was glad. The sun was warm. The story is over. Good night."
								},
								"intermediate": {
									"vi": "Aang lấy đi hỏa thuật của Ozai, để ông không còn đốt hại ai nữa. Hòa bình trở lại. Nắng ấm phủ khắp đất. Câu chuyện khép lại. Chúc ngủ ngon.",
									"en": "Aang took Ozai's firebending away, so he could harm no one again. Peace returned. Warm sunlight covered the land. The story comes to a close. Good night."
								},
								"senior": {
									"vi": "Aang lấy đi hỏa thuật của Ozai, dập tắt quyền năng hủy diệt mà không dập tắt một mạng người. Hòa bình trở về như nắng sau bão. Thế giới thở ra. Chuyện đến đây là hết. Ngủ ngon, và mơ những giấc mơ êm.",
									"en": "Aang took Ozai's firebending, ending the power to destroy without ending a life. Peace returned like sunlight after a storm. The world exhaled. Here the tale is done. Sleep well, and dream gently."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Aang took Ozai's fire away",
										"vi": "Aang lấy lửa của Ozai"
									},
									{
										"en": "Ozai could not burn things",
										"vi": "Ozai hông đốt nữa"
									},
									{
										"en": "People were happy",
										"vi": "Mọi người vui"
									},
									{
										"en": "The sun was warm",
										"vi": "Trời nắng đẹp"
									},
									{
										"en": "Night night",
										"vi": "Ngủ ngon nha"
									},
									{
										"en": "could not burn",
										"vi": "hông đốt nữa"
									}
								],
								"primary": [
									{
										"en": "Aang took Ozai's fire away",
										"vi": "Aang lấy đi lửa của Ozai"
									},
									{
										"en": "Ozai could not burn things anymore",
										"vi": "Ozai hông đốt được nữa"
									},
									{
										"en": "Everyone was glad",
										"vi": "Mọi người vui mừng"
									},
									{
										"en": "The sun was warm",
										"vi": "Trời nắng đẹp"
									},
									{
										"en": "The story is over",
										"vi": "Câu chuyện kết thúc"
									},
									{
										"en": "Good night",
										"vi": "Ngủ ngon nha"
									},
									{
										"en": "could not burn",
										"vi": "hông đốt nữa"
									}
								],
								"intermediate": [
									{
										"en": "firebending",
										"vi": "hỏa thuật"
									},
									{
										"en": "Aang took Ozai's firebending away, so he could harm no one again",
										"vi": "Aang lấy đi hỏa thuật của Ozai, để ông không còn đốt hại ai nữa"
									},
									{
										"en": "Peace returned",
										"vi": "Hòa bình trở lại"
									},
									{
										"en": "Warm sunlight covered the land",
										"vi": "Nắng ấm phủ khắp đất"
									},
									{
										"en": "The story comes to a close",
										"vi": "Câu chuyện khép lại"
									}
								],
								"senior": [
									{
										"en": "firebending",
										"vi": "hỏa thuật"
									},
									{
										"en": "Aang took Ozai's firebending, ending the power to destroy without ending a life",
										"vi": "Aang lấy đi hỏa thuật của Ozai, dập tắt quyền năng hủy diệt mà không dập tắt một mạng người"
									},
									{
										"en": "Peace returned like sunlight after a storm",
										"vi": "Hòa bình trở về như nắng sau bão"
									},
									{
										"en": "The world exhaled",
										"vi": "Thế giới thở ra"
									},
									{
										"en": "Here the tale is done",
										"vi": "Chuyện đến đây là hết"
									},
									{
										"en": "Sleep well, and dream gently",
										"vi": "Ngủ ngon, và mơ những giấc mơ êm"
									}
								]
							}
						}
					]
				}
			]
		},
		{
			"id": "korra",
			"vi": "Huyền thoại Korra",
			"en": "The Legend of Korra",
			"coverTitle": {
				"vi": "Truyện Korra",
				"en": "Korra's Story"
			},
			"seasons": [
				{
					"id": "k1",
					"vi": "Mùa 1 · Gió",
					"en": "Season 1 · Air",
					"tagline": {
						"vi": "Korra học gió",
						"en": "Korra learns air"
					},
					"pages": [
						{
							"id": "k1-cover",
							"image": "/illustrations/k1-00.jpg",
							"file": "k1-page-00",
							"title": {
								"vi": "Mùa gió",
								"en": "Air Season"
							},
							"text": {
								"preschool": {
									"vi": "Đây là chuyện Korra. Korra khỏe lắm. Korra học gió.",
									"en": "This is Korra. Korra is so strong. Korra learns air."
								},
								"primary": {
									"vi": "Đây là mùa một của Korra. Korra đã làm được nước, đất và lửa. Cô còn phải học gió.",
									"en": "This is Korra's first season. Korra can already move water, earth, and fire. She still has to learn air."
								},
								"intermediate": {
									"vi": "Mùa gió mở ra ở thành phố lớn. Korra, Avatar mới, đã thành thạo ba nguyên tố. Gió vẫn chưa nghe lời cô.",
									"en": "The Air season opens in a great city. Korra, the new Avatar, has mastered three elements. The wind still will not listen to her."
								},
								"senior": {
									"vi": "Korra bước vào thế giới như một ngọn sóng chưa biết chờ. Ba nguyên tố đã ở trong tay. Nguyên tố thứ tư — gió của Phong tộc — còn là một bài học về sự nhẹ.",
									"en": "Korra entered the world like a wave that had not yet learned to wait. Three elements already lived in her hands. The fourth — the air of the Nomads — was still a lesson in lightness."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Korra",
										"vi": "Đây là chuyện Korra"
									},
									{
										"en": "Korra is so strong",
										"vi": "Korra khỏe lắm"
									},
									{
										"en": "Korra learns air",
										"vi": "Korra học gió"
									},
									{
										"en": "so strong",
										"vi": "khỏe lắm"
									}
								],
								"primary": [
									{
										"en": "This is Korra's first season",
										"vi": "Đây là mùa một của Korra"
									},
									{
										"en": "Korra can already move water, earth, and fire",
										"vi": "Korra đã làm được nước, đất và lửa"
									},
									{
										"en": "She still has to learn air",
										"vi": "Cô còn phải học gió"
									},
									{
										"en": "move water",
										"vi": "làm nước"
									},
									{
										"en": "first season",
										"vi": "mùa một"
									}
								],
								"intermediate": [
									{
										"en": "The Air season opens in a great city",
										"vi": "Mùa gió mở ra ở thành phố lớn"
									},
									{
										"en": "Korra, the new Avatar, has mastered three elements",
										"vi": "Korra, Avatar mới, đã thành thạo ba nguyên tố"
									},
									{
										"en": "The wind still will not listen to her",
										"vi": "Gió vẫn chưa nghe lời cô"
									},
									{
										"en": "the air season",
										"vi": "mùa gió"
									}
								],
								"senior": [
									{
										"en": "Korra entered the world like a wave that had not yet learned to wait",
										"vi": "Korra bước vào thế giới như một ngọn sóng chưa biết chờ"
									},
									{
										"en": "Three elements already lived in her hands",
										"vi": "Ba nguyên tố đã ở trong tay"
									},
									{
										"en": "The fourth — the air of the Nomads — was still a lesson in lightness",
										"vi": "Nguyên tố thứ tư — gió của Phong tộc — còn là một bài học về sự nhẹ"
									}
								]
							}
						},
						{
							"id": "k1-south",
							"image": "/illustrations/k1-01.jpg",
							"file": "k1-page-01",
							"title": {
								"vi": "Ba phép",
								"en": "Three Gifts"
							},
							"text": {
								"preschool": {
									"vi": "Korra nhỏ. Korra làm nước. Korra làm đất. Korra làm lửa. Korra chưa làm gió.",
									"en": "Korra is little. Korra moves water. Korra moves earth. Korra moves fire. Korra cannot move air yet."
								},
								"primary": {
									"vi": "Từ nhỏ Korra đã điều khiển nước, đất và lửa. Thầy nói: còn gió. Gió khó hơn cô nghĩ.",
									"en": "From a young age Korra could move water, earth, and fire. Her teachers said: air is still left. Air was harder than she thought."
								},
								"intermediate": {
									"vi": "Ở cực Nam, các thầy Thủy tộc tập cho Korra ba môn. Cô mạnh, nóng lòng, và chưa hiểu vì sao gió lại trốn.",
									"en": "At the South Pole, Water Tribe masters trained Korra in three arts. She was strong, impatient, and did not yet understand why the wind hid from her."
								},
								"senior": {
									"vi": "Sức mạnh đến sớm với Korra — quá sớm để biết mềm. Nước, đất, lửa trả lời cô như bạn cũ. Gió thì đòi một thứ cô chưa có: chỗ trống bên trong.",
									"en": "Power came early to Korra — too early to know softness. Water, earth, and fire answered her like old friends. Air asked for something she did not yet have: a space inside."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Korra is little",
										"vi": "Korra nhỏ"
									},
									{
										"en": "Korra moves water",
										"vi": "Korra làm nước"
									},
									{
										"en": "Korra moves earth",
										"vi": "Korra làm đất"
									},
									{
										"en": "Korra moves fire",
										"vi": "Korra làm lửa"
									},
									{
										"en": "Korra cannot move air yet",
										"vi": "Korra chưa làm gió"
									},
									{
										"en": "cannot move air yet",
										"vi": "chưa làm gió"
									}
								],
								"primary": [
									{
										"en": "From a young age Korra could move water, earth, and fire",
										"vi": "Từ nhỏ Korra đã điều khiển nước, đất và lửa"
									},
									{
										"en": "Her teachers said: air is still left",
										"vi": "Thầy nói: còn gió"
									},
									{
										"en": "Air was harder than she thought",
										"vi": "Gió khó hơn cô nghĩ"
									},
									{
										"en": "move water",
										"vi": "làm nước"
									}
								],
								"intermediate": [
									{
										"en": "At the South Pole, Water Tribe masters trained Korra in three arts",
										"vi": "Ở cực Nam, các thầy Thủy tộc tập cho Korra ba môn"
									},
									{
										"en": "She was strong, impatient, and did not yet understand why the wind hid from her",
										"vi": "Cô mạnh, nóng lòng, và chưa hiểu vì sao gió lại trốn"
									},
									{
										"en": "South Pole",
										"vi": "cực Nam"
									}
								],
								"senior": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Power came early to Korra — too early to know softness",
										"vi": "Sức mạnh đến sớm với Korra — quá sớm để biết mềm"
									},
									{
										"en": "Water, earth, and fire answered her like old friends",
										"vi": "Nước, đất, lửa trả lời cô như bạn cũ"
									},
									{
										"en": "Air asked for something she did not yet have: a space inside",
										"vi": "Gió thì đòi một thứ cô chưa có: chỗ trống bên trong"
									}
								]
							}
						},
						{
							"id": "k1-city",
							"image": "/illustrations/k1-02.jpg",
							"file": "k1-page-02",
							"title": {
								"vi": "Thành phố",
								"en": "The City"
							},
							"text": {
								"preschool": {
									"vi": "Korra tới thành phố to. Có tàu. Có đèn. Korra mắt tròn. Naga đi theo.",
									"en": "Korra came to a big city. There are cars. There are lights. Korra's eyes went wide. Naga came too."
								},
								"primary": {
									"vi": "Korra tới Thành Cộng Hòa. Thành phố ồn và sáng. Naga, chó gấu của cô, đi bên cạnh.",
									"en": "Korra came to Republic City. The city was loud and bright. Naga, her polar bear-dog, walked beside her."
								},
								"intermediate": {
									"vi": "Korra trốn tới Thành Cộng Hòa tìm Tenzin — con trai Aang, thầy phong thuật cuối. Thành phố lớn hơn mọi tảng băng cô từng biết.",
									"en": "Korra ran to Republic City to find Tenzin — Aang's son, the last airbending master. The city was larger than any ice she had known."
								},
								"senior": {
									"vi": "Thành Cộng Hòa là lời hứa của thế hệ trước: bốn quốc gia chung một mái. Korra bước vào đó như bước vào một bài hát chưa thuộc lời.",
									"en": "Republic City was the last generation's promise: four nations under one roof. Korra walked into it as into a song whose words she did not yet know."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Korra came to a big city",
										"vi": "Korra tới thành phố to"
									},
									{
										"en": "There are cars",
										"vi": "Có tàu"
									},
									{
										"en": "There are lights",
										"vi": "Có đèn"
									},
									{
										"en": "Korra's eyes went wide",
										"vi": "Korra mắt tròn"
									},
									{
										"en": "Naga came too",
										"vi": "Naga đi theo"
									},
									{
										"en": "eyes went wide",
										"vi": "mắt tròn"
									},
									{
										"en": "came too",
										"vi": "tới nữa"
									}
								],
								"primary": [
									{
										"en": "Korra came to Republic City",
										"vi": "Korra tới Thành Cộng Hòa"
									},
									{
										"en": "The city was loud and bright",
										"vi": "Thành phố ồn và sáng"
									},
									{
										"en": "Naga, her polar bear-dog, walked beside her",
										"vi": "Naga, chó gấu của cô, đi bên cạnh"
									},
									{
										"en": "polar bear-dog",
										"vi": "chó gấu"
									},
									{
										"en": "Republic City",
										"vi": "Cộng hòa Thành"
									}
								],
								"intermediate": [
									{
										"en": "airbending",
										"vi": "phong thuật"
									},
									{
										"en": "Korra ran to Republic City to find Tenzin — Aang's son, the last airbending master",
										"vi": "Korra trốn tới Thành Cộng Hòa tìm Tenzin — con trai Aang, thầy phong thuật cuối"
									},
									{
										"en": "The city was larger than any ice she had known",
										"vi": "Thành phố lớn hơn mọi tảng băng cô từng biết"
									},
									{
										"en": "Republic City",
										"vi": "Cộng hòa Thành"
									}
								],
								"senior": [
									{
										"en": "Republic City was the last generation's promise: four nations under one roof",
										"vi": "Thành Cộng Hòa là lời hứa của thế hệ trước: bốn quốc gia chung một mái"
									},
									{
										"en": "Korra walked into it as into a song whose words she did not yet know",
										"vi": "Korra bước vào đó như bước vào một bài hát chưa thuộc lời"
									},
									{
										"en": "Republic City",
										"vi": "Cộng hòa Thành"
									}
								]
							}
						},
						{
							"id": "k1-tenzin",
							"image": "/illustrations/k1-03.jpg",
							"file": "k1-page-03",
							"title": {
								"vi": "Tenzin",
								"en": "Tenzin"
							},
							"text": {
								"preschool": {
									"vi": "Có chú Tenzin. Tenzin hói. Tenzin thổi gió. Tenzin dạy Korra.",
									"en": "This is Tenzin. Tenzin is bald. Tenzin blows the wind. Tenzin teaches Korra."
								},
								"primary": {
									"vi": "Tenzin là con trai Aang. Ông sống trên đảo đền gió. Ông đồng ý dạy Korra phong thuật.",
									"en": "Tenzin is Aang's son. He lives on an air temple island. He agreed to teach Korra airbending."
								},
								"intermediate": {
									"vi": "Trên đảo đền, Tenzin — người giữ gìn Phong tộc — nhận Korra làm học trò. Ông chậm. Cô nhanh. Bài học bắt đầu khó.",
									"en": "On temple island, Tenzin — keeper of the Air Nomads — took Korra as a student. He was slow. She was fast. The lessons began hard."
								},
								"senior": {
									"vi": "Tenzin mang trên da dấu tên cha, và trong hơi thở cả một dân tộc còn ít. Dạy Korra không chỉ là dạy gió — là dạy cô ngồi xuống.",
									"en": "Tenzin wore his father's mark on his skin, and in his breath a people grown few. Teaching Korra was not only teaching air — it was teaching her to sit down."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "teaches",
										"vi": "dạy"
									},
									{
										"en": "This is Tenzin",
										"vi": "Có chú Tenzin"
									},
									{
										"en": "Tenzin is bald",
										"vi": "Tenzin hói"
									},
									{
										"en": "Tenzin blows the wind",
										"vi": "Tenzin thổi gió"
									},
									{
										"en": "Tenzin teaches Korra",
										"vi": "Tenzin dạy Korra"
									},
									{
										"en": "blows the wind",
										"vi": "thổi gió"
									},
									{
										"en": "is bald",
										"vi": "hói"
									}
								],
								"primary": [
									{
										"en": "airbending",
										"vi": "phong thuật"
									},
									{
										"en": "Tenzin is Aang's son",
										"vi": "Tenzin là con trai Aang"
									},
									{
										"en": "He lives on an air temple island",
										"vi": "Ông sống trên đảo đền gió"
									},
									{
										"en": "He agreed to teach Korra airbending",
										"vi": "Ông đồng ý dạy Korra phong thuật"
									}
								],
								"intermediate": [
									{
										"en": "On temple island, Tenzin — keeper of the Air Nomads — took Korra as a student",
										"vi": "Trên đảo đền, Tenzin — người giữ gìn Phong tộc — nhận Korra làm học trò"
									},
									{
										"en": "She was fast",
										"vi": "Cô nhanh"
									},
									{
										"en": "The lessons began hard",
										"vi": "Bài học bắt đầu khó"
									},
									{
										"en": "Air Nomads",
										"vi": "Phong tộc"
									}
								],
								"senior": [
									{
										"en": "Tenzin wore his father's mark on his skin, and in his breath a people grown few",
										"vi": "Tenzin mang trên da dấu tên cha, và trong hơi thở cả một dân tộc còn ít"
									},
									{
										"en": "Teaching Korra was not only teaching air — it was teaching her to sit down",
										"vi": "Dạy Korra không chỉ là dạy gió — là dạy cô ngồi xuống"
									},
									{
										"en": "his breath",
										"vi": "hơi thở"
									}
								]
							}
						},
						{
							"id": "k1-friends",
							"image": "/illustrations/k1-04.jpg",
							"file": "k1-page-04",
							"title": {
								"vi": "Bạn mới",
								"en": "New Friends"
							},
							"text": {
								"preschool": {
									"vi": "Có Mako. Có Bolin. Họ chơi đá lửa. Korra chơi nữa. Vui lắm.",
									"en": "This is Mako. This is Bolin. They play a fire-and-rock game. Korra played too. So fun."
								},
								"primary": {
									"vi": "Korra gặp Mako và Bolin. Hai anh em chơi đấu trường. Korra vào đội. Họ thành bạn.",
									"en": "Korra met Mako and Bolin. The brothers played in an arena. Korra joined the team. They became friends."
								},
								"intermediate": {
									"vi": "Đấu trường pro-bending — nước, đất, lửa trên một sân. Mako lạnh, Bolin ấm. Korra tìm thấy đồng đội, không chỉ thầy.",
									"en": "The pro-bending arena — water, earth, and fire on one floor. Mako was cool, Bolin was warm. Korra found teammates, not only a teacher."
								},
								"senior": {
									"vi": "Trong tiếng reo của thành phố, Korra học một bài không có trong đền: bạn bè có thể là nhà. Mako và Bolin không cúi trước Avatar — họ đứng cạnh.",
									"en": "In the city's roar Korra learned a lesson the temple did not teach: friends can be a home. Mako and Bolin did not bow to the Avatar — they stood beside her."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Mako",
										"vi": "Có Mako"
									},
									{
										"en": "This is Bolin",
										"vi": "Có Bolin"
									},
									{
										"en": "They play a fire-and-rock game",
										"vi": "Họ chơi đá lửa"
									},
									{
										"en": "Korra played too",
										"vi": "Korra chơi nữa"
									},
									{
										"en": "so fun",
										"vi": "vui lắm"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Korra met Mako and Bolin",
										"vi": "Korra gặp Mako và Bolin"
									},
									{
										"en": "The brothers played in an arena",
										"vi": "Hai anh em chơi đấu trường"
									},
									{
										"en": "Korra joined the team",
										"vi": "Korra vào đội"
									},
									{
										"en": "They became friends",
										"vi": "Họ thành bạn"
									}
								],
								"intermediate": [
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "The pro-bending arena — water, earth, and fire on one floor",
										"vi": "Đấu trường pro-bending — nước, đất, lửa trên một sân"
									},
									{
										"en": "Mako was cool, Bolin was warm",
										"vi": "Mako lạnh, Bolin ấm"
									},
									{
										"en": "Korra found teammates, not only a teacher",
										"vi": "Korra tìm thấy đồng đội, không chỉ thầy"
									}
								],
								"senior": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "In the city's roar Korra learned a lesson the temple did not teach: friends can be a home",
										"vi": "Trong tiếng reo của thành phố, Korra học một bài không có trong đền: bạn bè có thể là nhà"
									},
									{
										"en": "Mako and Bolin did not bow to the Avatar — they stood beside her",
										"vi": "Mako và Bolin không cúi trước Avatar — họ đứng cạnh"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								]
							}
						},
						{
							"id": "k1-asami",
							"image": "/illustrations/k1-05.jpg",
							"file": "k1-page-05",
							"title": {
								"vi": "Asami",
								"en": "Asami"
							},
							"text": {
								"preschool": {
									"vi": "Có chị Asami. Asami xinh. Asami giỏi xe. Asami thành bạn.",
									"en": "This is Asami. Asami is pretty. Asami is good with cars. Asami became a friend."
								},
								"primary": {
									"vi": "Asami làm xe và máy. Cô ấy thông minh. Korra và Asami trở thành bạn tốt.",
									"en": "Asami makes cars and machines. She is very clever. Korra and Asami became good friends."
								},
								"intermediate": {
									"vi": "Asami Sato — kỹ sư, người lái, người không cần phép để mạnh. Cô đứng vào đội, và đội trở nên đủ.",
									"en": "Asami Sato — engineer, driver, someone strong without bending. She joined the team, and the team became enough."
								},
								"senior": {
									"vi": "Asami không thổi gió hay đẩy đá. Cô hiểu bánh xe, và hiểu người. Trong một thành phố của phép, cô nhắc Korra rằng trí khôn cũng là một nguyên tố.",
									"en": "Asami did not blow wind or push stone. She understood wheels, and people. In a city of bending she reminded Korra that wit is an element too."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Asami",
										"vi": "Có chị Asami"
									},
									{
										"en": "Asami is pretty",
										"vi": "Asami xinh"
									},
									{
										"en": "Asami is good with cars",
										"vi": "Asami giỏi xe"
									},
									{
										"en": "Asami became a friend",
										"vi": "Asami thành bạn"
									},
									{
										"en": "became a friend",
										"vi": "thành bạn"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Asami makes cars and machines",
										"vi": "Asami làm xe và máy"
									},
									{
										"en": "She is very clever",
										"vi": "Cô ấy thông minh"
									},
									{
										"en": "Korra and Asami became good friends",
										"vi": "Korra và Asami trở thành bạn tốt"
									}
								],
								"intermediate": [{
									"en": "Asami Sato — engineer, driver, someone strong without bending",
									"vi": "Asami Sato — kỹ sư, người lái, người không cần phép để mạnh"
								}, {
									"en": "She joined the team, and the team became enough",
									"vi": "Cô đứng vào đội, và đội trở nên đủ"
								}],
								"senior": [
									{
										"en": "Asami did not blow wind or push stone",
										"vi": "Asami không thổi gió hay đẩy đá"
									},
									{
										"en": "She understood wheels, and people",
										"vi": "Cô hiểu bánh xe, và hiểu người"
									},
									{
										"en": "In a city of bending she reminded Korra that wit is an element too",
										"vi": "Trong một thành phố của phép, cô nhắc Korra rằng trí khôn cũng là một nguyên tố"
									},
									{
										"en": "blow wind",
										"vi": "thổi gió"
									}
								]
							}
						},
						{
							"id": "k1-air",
							"image": "/illustrations/k1-06.jpg",
							"file": "k1-page-06",
							"title": {
								"vi": "Học gió",
								"en": "Learn Air"
							},
							"text": {
								"preschool": {
									"vi": "Tenzin dạy. Korra thử. Gió hông tới. Korra giận. Rồi Korra thở.",
									"en": "Tenzin taught. Korra tried. The wind did not come. Korra was mad. Then Korra breathed."
								},
								"primary": {
									"vi": "Korra tập phong thuật mỗi ngày. Cô ngã, đứng, ngã nữa. Tenzin bảo: đừng đánh gió. Hãy nghe gió.",
									"en": "Korra practiced airbending every day. She fell, stood, fell again. Tenzin said: do not hit the wind. Listen to it."
								},
								"intermediate": {
									"vi": "Trên sân đền, Korra đánh vào không khí như đánh vào tường. Gió không phải đất. Bài học là buông, không phải nắm.",
									"en": "On the temple court Korra struck the air as if it were a wall. Wind is not earth. The lesson was to let go, not to hold on."
								},
								"senior": {
									"vi": "Ba nguyên tố kia đã nuông cô. Gió thì không. Nó chỉ hiện khi Korra ngừng đòi. Trong một lần thở ra — không phải một cú đấm — không khí chịu nhúc nhích.",
									"en": "The other three elements had spoiled her. Air would not. It appeared only when Korra stopped demanding. In one exhale — not a punch — the air agreed to move."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Tenzin taught",
										"vi": "Tenzin dạy"
									},
									{
										"en": "Korra tried",
										"vi": "Korra thử"
									},
									{
										"en": "The wind did not come",
										"vi": "Gió hông tới"
									},
									{
										"en": "Korra was mad",
										"vi": "Korra giận"
									},
									{
										"en": "Then Korra breathed",
										"vi": "Rồi Korra thở"
									}
								],
								"primary": [
									{
										"en": "airbending",
										"vi": "phong thuật"
									},
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Korra practiced airbending every day",
										"vi": "Korra tập phong thuật mỗi ngày"
									},
									{
										"en": "She fell, stood, fell again",
										"vi": "Cô ngã, đứng, ngã nữa"
									},
									{
										"en": "Tenzin said: do not hit the wind",
										"vi": "Tenzin bảo: đừng đánh gió"
									},
									{
										"en": "Listen to it",
										"vi": "Hãy nghe gió"
									}
								],
								"intermediate": [
									{
										"en": "On the temple court Korra struck the air as if it were a wall",
										"vi": "Trên sân đền, Korra đánh vào không khí như đánh vào tường"
									},
									{
										"en": "Wind is not earth",
										"vi": "Gió không phải đất"
									},
									{
										"en": "The lesson was to let go, not to hold on",
										"vi": "Bài học là buông, không phải nắm"
									}
								],
								"senior": [
									{
										"en": "appeared",
										"vi": "hiện ra"
									},
									{
										"en": "stopped",
										"vi": "dừng"
									},
									{
										"en": "The other three elements had spoiled her",
										"vi": "Ba nguyên tố kia đã nuông cô"
									},
									{
										"en": "Air would not",
										"vi": "Gió thì không"
									},
									{
										"en": "It appeared only when Korra stopped demanding",
										"vi": "Nó chỉ hiện khi Korra ngừng đòi"
									},
									{
										"en": "In one exhale — not a punch — the air agreed to move",
										"vi": "Trong một lần thở ra — không phải một cú đấm — không khí chịu nhúc nhích"
									}
								]
							}
						},
						{
							"id": "k1-amon",
							"image": "/illustrations/k1-07.jpg",
							"file": "k1-page-07",
							"title": {
								"vi": "Amon",
								"en": "Amon"
							},
							"text": {
								"preschool": {
									"vi": "Có người đeo mặt nạ. Tên Amon. Amon lấy phép. Mọi người sợ.",
									"en": "There is a man in a mask. His name is Amon. Amon takes bending away. People were scared."
								},
								"primary": {
									"vi": "Amon là người đeo mặt nạ. Ông ta lấy đi phép của người khác. Thành phố lo lắng.",
									"en": "Amon is a man in a mask. He takes people's bending away. The city grew worried."
								},
								"intermediate": {
									"vi": "Amon lãnh đạo những người muốn một thành phố không phép. Ông lấy đi hỏa thuật, thổ thuật, thủy thuật. Korra phải đứng ra.",
									"en": "Amon led people who wanted a city with no bending. He took fire, earth, and water away. Korra had to stand up."
								},
								"senior": {
									"vi": "Mặt nạ không chỉ giấu mặt — nó giấu một nỗi đau cũ. Amon hứa bình đẳng bằng cách lấy đi. Korra, vốn là phép, lần đầu hiểu phép cũng có thể làm người ta sợ.",
									"en": "The mask did not only hide a face — it hid an old wound. Amon promised fairness by taking away. Korra, who was bending, understood for the first time that bending could make people afraid."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "There is a man in a mask",
										"vi": "Có người đeo mặt nạ"
									},
									{
										"en": "His name is Amon",
										"vi": "Tên Amon"
									},
									{
										"en": "Amon takes bending away",
										"vi": "Amon lấy phép"
									},
									{
										"en": "People were scared",
										"vi": "Mọi người sợ"
									},
									{
										"en": "a man in a mask",
										"vi": "người đeo mặt nạ"
									},
									{
										"en": "takes bending away",
										"vi": "lấy phép"
									}
								],
								"primary": [
									{
										"en": "Amon is a man in a mask",
										"vi": "Amon là người đeo mặt nạ"
									},
									{
										"en": "He takes people's bending away",
										"vi": "Ông ta lấy đi phép của người khác"
									},
									{
										"en": "The city grew worried",
										"vi": "Thành phố lo lắng"
									},
									{
										"en": "a man in a mask",
										"vi": "người đeo mặt nạ"
									}
								],
								"intermediate": [
									{
										"en": "Amon led people who wanted a city with no bending",
										"vi": "Amon lãnh đạo những người muốn một thành phố không phép"
									},
									{
										"en": "He took fire, earth, and water away",
										"vi": "Ông lấy đi hỏa thuật, thổ thuật, thủy thuật"
									},
									{
										"en": "Korra had to stand up",
										"vi": "Korra phải đứng ra"
									}
								],
								"senior": [
									{
										"en": "The mask did not only hide a face — it hid an old wound",
										"vi": "Mặt nạ không chỉ giấu mặt — nó giấu một nỗi đau cũ"
									},
									{
										"en": "Amon promised fairness by taking away",
										"vi": "Amon hứa bình đẳng bằng cách lấy đi"
									},
									{
										"en": "Korra, who was bending, understood for the first time that bending could make people afraid",
										"vi": "Korra, vốn là phép, lần đầu hiểu phép cũng có thể làm người ta sợ"
									}
								]
							}
						},
						{
							"id": "k1-lost",
							"image": "/illustrations/k1-08.jpg",
							"file": "k1-page-08",
							"title": {
								"vi": "Mất phép",
								"en": "Powers Gone"
							},
							"text": {
								"preschool": {
									"vi": "Korra hông làm nước nữa. Hông làm đất. Hông làm lửa. Korra buồn. Bạn bè ở đó.",
									"en": "Korra could not move water. Could not move earth. Could not move fire. Korra was sad. Friends stayed."
								},
								"primary": {
									"vi": "Amon lấy phép của Korra. Cô ngồi im. Mako, Bolin, Asami và Tenzin không bỏ cô.",
									"en": "Amon took Korra's bending. She sat still. Mako, Bolin, Asami, and Tenzin did not leave her."
								},
								"intermediate": {
									"vi": "Phép biến mất như thủy triều rút. Korra, lần đầu, chỉ còn là một cô gái. Bạn bè ngồi quanh — một vòng tay không cần sức mạnh.",
									"en": "The bending left like a tide going out. Korra, for the first time, was only a girl. Her friends sat around her — a circle of arms that did not need power."
								},
								"senior": {
									"vi": "Cô từng nghĩ Avatar là những gì cô làm được. Khi không làm được nữa, còn lại những người gọi tên cô. Đó là bài học gió — chỗ trống, và những gì đổ vào đó.",
									"en": "She had thought the Avatar was what she could do. When she could do nothing, what remained were the people who said her name. That was the air lesson — emptiness, and what fills it."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Korra could not move water",
										"vi": "Korra hông làm nước nữa"
									},
									{
										"en": "Could not move earth",
										"vi": "Hông làm đất"
									},
									{
										"en": "Could not move fire",
										"vi": "Hông làm lửa"
									},
									{
										"en": "Korra was sad",
										"vi": "Korra buồn"
									},
									{
										"en": "Friends stayed",
										"vi": "Bạn bè ở đó"
									},
									{
										"en": "move water",
										"vi": "làm nước"
									}
								],
								"primary": [
									{
										"en": "Amon took Korra's bending",
										"vi": "Amon lấy phép của Korra"
									},
									{
										"en": "She sat still",
										"vi": "Cô ngồi im"
									},
									{
										"en": "Mako, Bolin, Asami, and Tenzin did not leave her",
										"vi": "Mako, Bolin, Asami và Tenzin hông bỏ cô"
									},
									{
										"en": "sat still",
										"vi": "ngồi im"
									}
								],
								"intermediate": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "The bending left like a tide going out",
										"vi": "Phép biến mất như thủy triều rút"
									},
									{
										"en": "Korra, for the first time, was only a girl",
										"vi": "Korra, lần đầu, chỉ còn là một cô gái"
									},
									{
										"en": "Her friends sat around her — a circle of arms that did not need power",
										"vi": "Bạn bè ngồi quanh — một vòng tay không cần sức mạnh"
									}
								],
								"senior": [
									{
										"en": "She had thought the Avatar was what she could do",
										"vi": "Cô từng nghĩ Avatar là những gì cô làm được"
									},
									{
										"en": "When she could do nothing, what remained were the people who said her name",
										"vi": "Khi không làm được nữa, còn lại những người gọi tên cô"
									},
									{
										"en": "That was the air lesson — emptiness, and what fills it",
										"vi": "Đó là bài học gió — chỗ trống, và những gì đổ vào đó"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								]
							}
						},
						{
							"id": "k1-wind",
							"image": "/illustrations/k1-09.jpg",
							"file": "k1-page-09",
							"title": {
								"vi": "Gió tới",
								"en": "The Wind Comes"
							},
							"text": {
								"preschool": {
									"vi": "Aang hiện ra. Aang hiền. Aang giúp Korra. Korra thổi gió. Korra cười.",
									"en": "Aang appeared. Aang was kind. Aang helped Korra. Korra blew the wind. Korra smiled."
								},
								"primary": {
									"vi": "Linh hồn Aang tới. Ông trả lại phép và mở gió cho Korra. Cô thổi được. Cô khóc vui.",
									"en": "Aang's spirit came. He gave her bending back and opened the air. Korra could blow the wind. She cried happy tears."
								},
								"intermediate": {
									"vi": "Aang, Avatar trước, đứng trong ánh sáng. Ông trả ba nguyên tố và trao cái thứ tư. Korra thở — và gió, cuối cùng, ở lại.",
									"en": "Aang, the last Avatar, stood in the light. He returned three elements and offered the fourth. Korra breathed — and the wind, at last, stayed."
								},
								"senior": {
									"vi": "Người thầy cô chưa gặp mặt-đối-mặt đã để lại chỗ trống đúng lúc. Gió không phải phần thưởng cho sức. Nó là món quà cho sự mất. Korra đứng dậy, nhẹ hơn.",
									"en": "The teacher she had never met face-to-face had left a space at the right time. Air was not a prize for strength. It was a gift for loss. Korra stood up lighter."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "appeared",
										"vi": "hiện ra"
									},
									{
										"en": "Aang appeared",
										"vi": "Aang hiện ra"
									},
									{
										"en": "Aang was kind",
										"vi": "Aang hiền"
									},
									{
										"en": "Aang helped Korra",
										"vi": "Aang giúp Korra"
									},
									{
										"en": "Korra blew the wind",
										"vi": "Korra thổi gió"
									},
									{
										"en": "Korra smiled",
										"vi": "Korra cười"
									},
									{
										"en": "was kind",
										"vi": "hiền"
									},
									{
										"en": "blew the wind",
										"vi": "thổi gió"
									}
								],
								"primary": [
									{
										"en": "Aang's spirit came",
										"vi": "Linh hồn Aang tới"
									},
									{
										"en": "He gave her bending back and opened the air",
										"vi": "Ông trả lại phép và mở gió cho Korra"
									},
									{
										"en": "Korra could blow the wind",
										"vi": "Cô thổi được"
									},
									{
										"en": "She cried happy tears",
										"vi": "Cô khóc vui"
									},
									{
										"en": "blow the wind",
										"vi": "thổi gió"
									}
								],
								"intermediate": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Aang, the last Avatar, stood in the light",
										"vi": "Aang, Avatar trước, đứng trong ánh sáng"
									},
									{
										"en": "He returned three elements and offered the fourth",
										"vi": "Ông trả ba nguyên tố và trao cái thứ tư"
									},
									{
										"en": "Korra breathed — and the wind, at last, stayed",
										"vi": "Korra thở — và gió, cuối cùng, ở lại"
									}
								],
								"senior": [
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "The teacher she had never met face-to-face had left a space at the right time",
										"vi": "Người thầy cô chưa gặp mặt-đối-mặt đã để lại chỗ trống đúng lúc"
									},
									{
										"en": "Air was not a prize for strength",
										"vi": "Gió không phải phần thưởng cho sức"
									},
									{
										"en": "It was a gift for loss",
										"vi": "Nó là món quà cho sự mất"
									},
									{
										"en": "Korra stood up lighter",
										"vi": "Korra đứng dậy, nhẹ hơn"
									}
								]
							}
						},
						{
							"id": "k1-peace",
							"image": "/illustrations/k1-10.jpg",
							"file": "k1-page-10",
							"title": {
								"vi": "Thành yên",
								"en": "City Safe"
							},
							"text": {
								"preschool": {
									"vi": "Thành phố vui. Bạn bè ôm. Korra thổi gió. Mùa một xong. Mùa hai tới.",
									"en": "The city was happy. Friends hugged. Korra blew the wind. Season one ends. Season two will come."
								},
								"primary": {
									"vi": "Thành Cộng Hòa bình yên. Đội bạn đứng chung. Korra đã có gió. Mùa một khép lại.",
									"en": "Republic City was safe. The friends stood together. Korra had the air. Season one closes."
								},
								"intermediate": {
									"vi": "Amon không còn. Phép trở về với người bị lấy. Korra, lần đầu, biết mình không chỉ là sức — mà là gió. Mùa khí kết thúc.",
									"en": "Amon was gone. Bending returned to those who lost it. Korra, for the first time, knew she was not only force — she was air. The Air season ends."
								},
								"senior": {
									"vi": "Thành phố thở ra. Korra còn xanh, còn nóng, nhưng đã có một chỗ trống để thế giới đi vào. Mùa gió lặng. Phía trước còn linh hồn đang chờ.",
									"en": "The city exhaled. Korra was still young, still fierce, but she had a space now for the world to enter. The Air season grows quiet. Ahead, spirits are waiting."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "hugged",
										"vi": "ôm"
									},
									{
										"en": "The city was happy",
										"vi": "Thành phố vui"
									},
									{
										"en": "Friends hugged",
										"vi": "Bạn bè ôm"
									},
									{
										"en": "Korra blew the wind",
										"vi": "Korra thổi gió"
									},
									{
										"en": "Season one ends",
										"vi": "Mùa một xong"
									},
									{
										"en": "Season two will come",
										"vi": "Mùa hai tới"
									},
									{
										"en": "season one",
										"vi": "mùa một"
									},
									{
										"en": "season two",
										"vi": "mùa hai"
									},
									{
										"en": "blew the wind",
										"vi": "thổi gió"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "Republic City was safe",
										"vi": "Thành Cộng Hòa bình yên"
									},
									{
										"en": "The friends stood together",
										"vi": "Đội bạn đứng chung"
									},
									{
										"en": "Korra had the air",
										"vi": "Korra đã có gió"
									},
									{
										"en": "Season one closes",
										"vi": "Mùa một khép lại"
									},
									{
										"en": "season one",
										"vi": "mùa một"
									},
									{
										"en": "stood together",
										"vi": "đứng chung"
									},
									{
										"en": "city was safe",
										"vi": "thành phố xong"
									},
									{
										"en": "Republic City",
										"vi": "Cộng hòa Thành"
									}
								],
								"intermediate": [
									{
										"en": "Amon was gone",
										"vi": "Amon không còn"
									},
									{
										"en": "Bending returned to those who lost it",
										"vi": "Phép trở về với người bị lấy"
									},
									{
										"en": "Korra, for the first time, knew she was not only force — she was air",
										"vi": "Korra, lần đầu, biết mình không chỉ là sức — mà là gió"
									},
									{
										"en": "The Air season ends",
										"vi": "Mùa khí kết thúc"
									},
									{
										"en": "the air season",
										"vi": "mùa gió"
									}
								],
								"senior": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "The city exhaled",
										"vi": "Thành phố thở ra"
									},
									{
										"en": "Korra was still young, still fierce, but she had a space now for the world to enter",
										"vi": "Korra còn xanh, còn nóng, nhưng đã có một chỗ trống để thế giới đi vào"
									},
									{
										"en": "The Air season grows quiet",
										"vi": "Mùa gió lặng"
									},
									{
										"en": "Ahead, spirits are waiting",
										"vi": "Phía trước còn linh hồn đang chờ"
									},
									{
										"en": "the air season",
										"vi": "mùa gió"
									}
								]
							}
						}
					]
				},
				{
					"id": "k2",
					"vi": "Mùa 2 · Linh hồn",
					"en": "Season 2 · Spirits",
					"tagline": {
						"vi": "Korra gặp hồn",
						"en": "Korra meets spirits"
					},
					"pages": [
						{
							"id": "k2-cover",
							"image": "/illustrations/k2-00.jpg",
							"file": "k2-page-00",
							"title": {
								"vi": "Mùa hồn",
								"en": "Spirit Season"
							},
							"text": {
								"preschool": {
									"vi": "Đây là chuyện Korra. Mùa hai. Có hồn. Hồn ở rừng. Hồn ở trời.",
									"en": "This is Korra. Season two. There are spirits. Spirits in the woods. Spirits in the sky."
								},
								"primary": {
									"vi": "Đây là mùa hai. Korra phải hiểu thế giới linh hồn. Ánh sáng lạ hiện trên trời.",
									"en": "This is season two. Korra must understand the spirit world. Strange lights appear in the sky."
								},
								"intermediate": {
									"vi": "Mùa linh hồn mở ra giữa hai cực. Cổng xưa sắp mở. Korra, còn mang gió mới, phải học nói với những gì không phải người.",
									"en": "The Spirit season opens between two poles. Old gates are about to open. Korra, still carrying new air, must learn to speak with what is not human."
								},
								"senior": {
									"vi": "Có những phần thế giới không đi trên đất. Mùa này, Korra bước qua lớp sương ấy — không phải để thắng, mà để nghe.",
									"en": "Some parts of the world do not walk on ground. This season Korra stepped through that mist — not to win, but to listen."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "This is Korra",
										"vi": "Đây là chuyện Korra"
									},
									{
										"en": "Season two",
										"vi": "Mùa hai"
									},
									{
										"en": "There are spirits",
										"vi": "Có hồn"
									},
									{
										"en": "Spirits in the woods",
										"vi": "Hồn ở rừng"
									},
									{
										"en": "Spirits in the sky",
										"vi": "Hồn ở trời"
									}
								],
								"primary": [
									{
										"en": "This is season two",
										"vi": "Đây là mùa hai"
									},
									{
										"en": "Korra must understand the spirit world",
										"vi": "Korra phải hiểu thế giới linh hồn"
									},
									{
										"en": "Strange lights appear in the sky",
										"vi": "Ánh sáng lạ hiện trên trời"
									},
									{
										"en": "season two",
										"vi": "mùa hai"
									},
									{
										"en": "spirit world",
										"vi": "cõi hồn"
									}
								],
								"intermediate": [
									{
										"en": "The Spirit season opens between two poles",
										"vi": "Mùa linh hồn mở ra giữa hai cực"
									},
									{
										"en": "Old gates are about to open",
										"vi": "Cổng xưa sắp mở"
									},
									{
										"en": "Korra, still carrying new air, must learn to speak with what is not human",
										"vi": "Korra, còn mang gió mới, phải học nói với những gì không phải người"
									},
									{
										"en": "must learn",
										"vi": "phải học"
									}
								],
								"senior": [{
									"en": "Some parts of the world do not walk on ground",
									"vi": "Có những phần thế giới không đi trên đất"
								}, {
									"en": "This season Korra stepped through that mist — not to win, but to listen",
									"vi": "Mùa này, Korra bước qua lớp sương ấy — không phải để thắng, mà để nghe"
								}]
							}
						},
						{
							"id": "k2-uncle",
							"image": "/illustrations/k2-01.jpg",
							"file": "k2-page-01",
							"title": {
								"vi": "Chú Unalaq",
								"en": "Uncle Unalaq"
							},
							"text": {
								"preschool": {
									"vi": "Có chú Unalaq. Chú ở Bắc. Chú nói chuyện hồn. Korra nghe.",
									"en": "This is Uncle Unalaq. He lives in the North. He talks to spirits. Korra listened."
								},
								"primary": {
									"vi": "Chú Unalaq từ Thủy tộc phương Bắc. Ông muốn Korra học chuyện linh hồn. Cô tin chú.",
									"en": "Uncle Unalaq came from the Northern Water Tribe. He wanted Korra to learn about spirits. She trusted him."
								},
								"intermediate": {
									"vi": "Unalaq, chú của Korra, đến cực Nam với lời êm: thế giới người và hồn đang lệch. Ông xin làm thầy. Cô gật.",
									"en": "Unalaq, Korra's uncle, came to the South Pole with a soft voice: the human world and the spirit world were out of line. He asked to teach. She nodded."
								},
								"senior": {
									"vi": "Lời êm không phải lúc nào cũng hiền. Unalaq mang theo một cái cổng và một tham vọng. Korra, vốn đói thầy, mở cửa trước khi hỏi vì sao cửa bị khóa.",
									"en": "A soft voice is not always a kind one. Unalaq brought a gate and an ambition. Korra, hungry for teachers, opened the door before asking why it had been locked."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "listened",
										"vi": "nghe"
									},
									{
										"en": "This is Uncle Unalaq",
										"vi": "Có chú Unalaq"
									},
									{
										"en": "He lives in the North",
										"vi": "Chú ở Bắc"
									},
									{
										"en": "He talks to spirits",
										"vi": "Chú nói chuyện hồn"
									},
									{
										"en": "Korra listened",
										"vi": "Korra nghe"
									},
									{
										"en": "the north",
										"vi": "chỗ Bắc"
									}
								],
								"primary": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "Uncle Unalaq came from the Northern Water Tribe",
										"vi": "Chú Unalaq từ Thủy tộc phương Bắc"
									},
									{
										"en": "He wanted Korra to learn about spirits",
										"vi": "Ông muốn Korra học chuyện linh hồn"
									},
									{
										"en": "She trusted him",
										"vi": "Cô tin chú"
									}
								],
								"intermediate": [
									{
										"en": "Unalaq, Korra's uncle, came to the South Pole with a soft voice: the human world and the spirit world were out of line",
										"vi": "Unalaq, chú của Korra, đến cực Nam với lời êm: thế giới người và hồn đang lệch"
									},
									{
										"en": "He asked to teach",
										"vi": "Ông xin làm thầy"
									},
									{
										"en": "spirit world",
										"vi": "cõi hồn"
									},
									{
										"en": "South Pole",
										"vi": "cực Nam"
									}
								],
								"senior": [
									{
										"en": "A soft voice is not always a kind one",
										"vi": "Lời êm không phải lúc nào cũng hiền"
									},
									{
										"en": "Unalaq brought a gate and an ambition",
										"vi": "Unalaq mang theo một cái cổng và một tham vọng"
									},
									{
										"en": "Korra, hungry for teachers, opened the door before asking why it had been locked",
										"vi": "Korra, vốn đói thầy, mở cửa trước khi hỏi vì sao cửa bị khóa"
									}
								]
							}
						},
						{
							"id": "k2-portal",
							"image": "/illustrations/k2-02.jpg",
							"file": "k2-page-02",
							"title": {
								"vi": "Cổng hồn",
								"en": "The Gate"
							},
							"text": {
								"preschool": {
									"vi": "Có cổng sáng. Korra mở. Bên trong lạ lắm. Cây phát sáng.",
									"en": "There is a glowing gate. Korra opened it. Inside is so strange. The trees glow."
								},
								"primary": {
									"vi": "Korra mở cổng linh hồn ở cực Nam. Một thế giới cây sáng hiện ra. Cô bước vào.",
									"en": "Korra opened a spirit portal at the South Pole. A world of glowing trees appeared. She stepped in."
								},
								"intermediate": {
									"vi": "Cổng Nam mở như một bông hoa ánh sáng. Korra đi qua, và luật của đất không còn giữ cô.",
									"en": "The southern gate opened like a flower of light. Korra walked through, and the laws of earth no longer held her."
								},
								"senior": {
									"vi": "Bước qua cổng là bước ra khỏi tên mình một lúc. Cây nhớ, nước nói, và Korra — vốn quen nắm — phải học cách được dẫn.",
									"en": "To step through the gate was to step out of her name for a while. Trees remembered, water spoke, and Korra — used to holding — had to learn to be led."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "There is a glowing gate",
										"vi": "Có cổng sáng"
									},
									{
										"en": "Korra opened it",
										"vi": "Korra mở"
									},
									{
										"en": "Inside is so strange",
										"vi": "Bên trong lạ lắm"
									},
									{
										"en": "The trees glow",
										"vi": "Cây phát sáng"
									},
									{
										"en": "so strange",
										"vi": "lạ lắm"
									},
									{
										"en": "glowing gate",
										"vi": "cổng sáng"
									}
								],
								"primary": [
									{
										"en": "appeared",
										"vi": "hiện ra"
									},
									{
										"en": "Korra opened a spirit portal at the South Pole",
										"vi": "Korra mở cổng linh hồn ở cực Nam"
									},
									{
										"en": "A world of glowing trees appeared",
										"vi": "Một thế giới cây sáng hiện ra"
									},
									{
										"en": "She stepped in",
										"vi": "Cô bước vào"
									},
									{
										"en": "South Pole",
										"vi": "cực Nam"
									}
								],
								"intermediate": [{
									"en": "The southern gate opened like a flower of light",
									"vi": "Cổng Nam mở như một bông hoa ánh sáng"
								}, {
									"en": "Korra walked through, and the laws of earth no longer held her",
									"vi": "Korra đi qua, và luật của đất không còn giữ cô"
								}],
								"senior": [{
									"en": "To step through the gate was to step out of her name for a while",
									"vi": "Bước qua cổng là bước ra khỏi tên mình một lúc"
								}, {
									"en": "Trees remembered, water spoke, and Korra — used to holding — had to learn to be led",
									"vi": "Cây nhớ, nước nói, và Korra — vốn quen nắm — phải học cách được dẫn"
								}]
							}
						},
						{
							"id": "k2-world",
							"image": "/illustrations/k2-03.jpg",
							"file": "k2-page-03",
							"title": {
								"vi": "Cõi hồn",
								"en": "Spirit World"
							},
							"text": {
								"preschool": {
									"vi": "Cõi hồn đẹp. Có thú lạ. Có cầu sáng. Korra đi. Korra hông sợ.",
									"en": "The spirit world is pretty. There are strange animals. There are bright bridges. Korra walked. Korra was not scared."
								},
								"primary": {
									"vi": "Thế giới linh hồn đầy màu. Thú bay. Cầu ánh sáng. Korra đi xuyên sương, vừa lạ vừa vui.",
									"en": "The spirit world was full of color. Animals flew. Bridges of light. Korra walked through mist, both strange and glad."
								},
								"intermediate": {
									"vi": "Cõi hồn không có bản đồ. Korra gặp những sinh vật cũ hơn quốc gia. Một số hiền. Một số đói. Cô phải chọn lời nói.",
									"en": "The spirit world has no map. Korra met beings older than nations. Some were kind. Some were hungry. She had to choose her words."
								},
								"senior": {
									"vi": "Đây không phải rừng để chặt. Đây là một trí nhớ. Korra đi như khách, và lần đầu cảm thấy nhỏ — không phải vì yếu, mà vì xung quanh lớn hơn sức.",
									"en": "This was not a forest to cut. It was a memory. Korra walked as a guest, and for the first time felt small — not from weakness, but because the around was larger than strength."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "The spirit world is pretty",
										"vi": "Cõi hồn đẹp"
									},
									{
										"en": "There are strange animals",
										"vi": "Có thú lạ"
									},
									{
										"en": "There are bright bridges",
										"vi": "Có cầu sáng"
									},
									{
										"en": "Korra walked",
										"vi": "Korra đi"
									},
									{
										"en": "Korra was not scared",
										"vi": "Korra hông sợ"
									},
									{
										"en": "was not scared",
										"vi": "hông sợ"
									},
									{
										"en": "spirit world",
										"vi": "cõi hồn"
									},
									{
										"en": "strange animals",
										"vi": "thú lạ"
									},
									{
										"en": "bright bridges",
										"vi": "cầu sáng"
									}
								],
								"primary": [
									{
										"en": "The spirit world was full of color",
										"vi": "Thế giới linh hồn đầy màu"
									},
									{
										"en": "Animals flew",
										"vi": "Thú bay"
									},
									{
										"en": "Bridges of light",
										"vi": "Cầu ánh sáng"
									},
									{
										"en": "Korra walked through mist, both strange and glad",
										"vi": "Korra đi xuyên sương, vừa lạ vừa vui"
									},
									{
										"en": "spirit world",
										"vi": "cõi hồn"
									}
								],
								"intermediate": [
									{
										"en": "The spirit world has no map",
										"vi": "Cõi hồn không có bản đồ"
									},
									{
										"en": "Korra met beings older than nations",
										"vi": "Korra gặp những sinh vật cũ hơn quốc gia"
									},
									{
										"en": "Some were kind",
										"vi": "Một số hiền"
									},
									{
										"en": "Some were hungry",
										"vi": "Một số đói"
									},
									{
										"en": "She had to choose her words",
										"vi": "Cô phải chọn lời nói"
									},
									{
										"en": "spirit world",
										"vi": "cõi hồn"
									}
								],
								"senior": [
									{
										"en": "This was not a forest to cut",
										"vi": "Đây không phải rừng để chặt"
									},
									{
										"en": "It was a memory",
										"vi": "Đây là một trí nhớ"
									},
									{
										"en": "Korra walked as a guest, and for the first time felt small — not from weakness, but because the around was larger than strength",
										"vi": "Korra đi như khách, và lần đầu cảm thấy nhỏ — không phải vì yếu, mà vì xung quanh lớn hơn sức"
									}
								]
							}
						},
						{
							"id": "k2-jinora",
							"image": "/illustrations/k2-04.jpg",
							"file": "k2-page-04",
							"title": {
								"vi": "Jinora",
								"en": "Jinora"
							},
							"text": {
								"preschool": {
									"vi": "Có bé Jinora. Jinora nhỏ. Jinora con Tenzin. Jinora giỏi hồn. Jinora giúp.",
									"en": "This is little Jinora. Jinora is small. Jinora is Tenzin's child. Jinora is good with spirits. Jinora helped."
								},
								"primary": {
									"vi": "Jinora, con gái Tenzin, nghe được linh hồn. Cô bé dẫn Korra khi đường mờ.",
									"en": "Jinora, Tenzin's daughter, can hear spirits. The little girl led Korra when the path grew dim."
								},
								"intermediate": {
									"vi": "Jinora bước trong cõi hồn như về nhà. Phong thuật của cô không ồn. Nó là sự chú ý. Korra đi theo ánh đó.",
									"en": "Jinora walked the spirit world as if it were home. Her airbending was not loud. It was attention. Korra followed that light."
								},
								"senior": {
									"vi": "Đứa trẻ của gió đọc cõi hồn rõ hơn Avatar. Đó không phải sự sỉ nhục — đó là sự cứu. Jinora cầm đèn. Korra cầm cửa.",
									"en": "The child of air read the spirit world more clearly than the Avatar. That was not a shame — it was a rescue. Jinora held the lamp. Korra held the door."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "This is little Jinora",
										"vi": "Có bé Jinora"
									},
									{
										"en": "Jinora is small",
										"vi": "Jinora nhỏ"
									},
									{
										"en": "Jinora is Tenzin's child",
										"vi": "Jinora con Tenzin"
									},
									{
										"en": "Jinora is good with spirits",
										"vi": "Jinora giỏi hồn"
									},
									{
										"en": "Jinora helped",
										"vi": "Jinora giúp"
									}
								],
								"primary": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "Jinora, Tenzin's daughter, can hear spirits",
										"vi": "Jinora, con gái Tenzin, nghe được linh hồn"
									},
									{
										"en": "The little girl led Korra when the path grew dim",
										"vi": "Cô bé dẫn Korra khi đường mờ"
									}
								],
								"intermediate": [
									{
										"en": "airbending",
										"vi": "phong thuật"
									},
									{
										"en": "Jinora walked the spirit world as if it were home",
										"vi": "Jinora bước trong cõi hồn như về nhà"
									},
									{
										"en": "Her airbending was not loud",
										"vi": "Phong thuật của cô không ồn"
									},
									{
										"en": "It was attention",
										"vi": "Nó là sự chú ý"
									},
									{
										"en": "Korra followed that light",
										"vi": "Korra đi theo ánh đó"
									},
									{
										"en": "spirit world",
										"vi": "cõi hồn"
									}
								],
								"senior": [
									{
										"en": "The child of air read the spirit world more clearly than the Avatar",
										"vi": "Đứa trẻ của gió đọc cõi hồn rõ hơn Avatar"
									},
									{
										"en": "That was not a shame — it was a rescue",
										"vi": "Đó không phải sự sỉ nhục — đó là sự cứu"
									},
									{
										"en": "Jinora held the lamp",
										"vi": "Jinora cầm đèn"
									},
									{
										"en": "Korra held the door",
										"vi": "Korra cầm cửa"
									},
									{
										"en": "spirit world",
										"vi": "cõi hồn"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								]
							}
						},
						{
							"id": "k2-light",
							"image": "/illustrations/k2-05.jpg",
							"file": "k2-page-05",
							"title": {
								"vi": "Sáng và tối",
								"en": "Light and Dark"
							},
							"text": {
								"preschool": {
									"vi": "Có hồn sáng. Có hồn tối. Hai hồn lớn lắm. Korra phải chọn sáng.",
									"en": "There is a light spirit. There is a dark spirit. Both spirits are so big. Korra must choose the light."
								},
								"primary": {
									"vi": "Hai linh hồn cổ: ánh sáng và bóng tối. Chúng cân bằng thế giới. Unalaq muốn bóng tối thắng.",
									"en": "Two ancient spirits: light and dark. They balance the world. Unalaq wanted the dark to win."
								},
								"intermediate": {
									"vi": "Raava và Vaatu — sáng và tối, già như trời. Unalaq định phá cân bằng. Korra phải đứng về phía ánh sáng, dù ánh sáng không phải nắm đấm.",
									"en": "Raava and Vaatu — light and dark, old as the sky. Unalaq meant to break the balance. Korra had to stand with the light, even though light is not a fist."
								},
								"senior": {
									"vi": "Thế giới không chọn một phía rồi xong. Sáng cần tối để có nghĩa. Nhưng tối nuốt tất cả thì không còn tên nào để gọi. Korra hiểu muộn, và vừa kịp.",
									"en": "The world does not pick one side and finish. Light needs dark to mean anything. But dark that swallows all leaves no names to call. Korra understood late, and just in time."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "There is a light spirit",
										"vi": "Có hồn sáng"
									},
									{
										"en": "There is a dark spirit",
										"vi": "Có hồn tối"
									},
									{
										"en": "Both spirits are so big",
										"vi": "Hai hồn lớn lắm"
									},
									{
										"en": "Korra must choose the light",
										"vi": "Korra phải chọn sáng"
									},
									{
										"en": "so big",
										"vi": "to lắm"
									},
									{
										"en": "light spirit",
										"vi": "hồn sáng"
									},
									{
										"en": "dark spirit",
										"vi": "hồn tối"
									},
									{
										"en": "choose the light",
										"vi": "chọn sáng"
									}
								],
								"primary": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "Two ancient spirits: light and dark",
										"vi": "Hai linh hồn cổ: ánh sáng và bóng tối"
									},
									{
										"en": "They balance the world",
										"vi": "Chúng cân bằng thế giới"
									},
									{
										"en": "Unalaq wanted the dark to win",
										"vi": "Unalaq muốn bóng tối thắng"
									}
								],
								"intermediate": [
									{
										"en": "Raava and Vaatu — light and dark, old as the sky",
										"vi": "Raava và Vaatu — sáng và tối, già như trời"
									},
									{
										"en": "Unalaq meant to break the balance",
										"vi": "Unalaq định phá cân bằng"
									},
									{
										"en": "Korra had to stand with the light, even though light is not a fist",
										"vi": "Korra phải đứng về phía ánh sáng, dù ánh sáng không phải nắm đấm"
									}
								],
								"senior": [
									{
										"en": "The world does not pick one side and finish",
										"vi": "Thế giới không chọn một phía rồi xong"
									},
									{
										"en": "Light needs dark to mean anything",
										"vi": "Sáng cần tối để có nghĩa"
									},
									{
										"en": "But dark that swallows all leaves no names to call",
										"vi": "Nhưng tối nuốt tất cả thì không còn tên nào để gọi"
									},
									{
										"en": "Korra understood late, and just in time",
										"vi": "Korra hiểu muộn, và vừa kịp"
									}
								]
							}
						},
						{
							"id": "k2-sky",
							"image": "/illustrations/k2-06.jpg",
							"file": "k2-page-06",
							"title": {
								"vi": "Trời đổi",
								"en": "The Sky Changes"
							},
							"text": {
								"preschool": {
									"vi": "Trời đổi màu. Có ánh lớn. Mọi người nhìn lên. Korra đứng đó.",
									"en": "The sky changed color. There was a big light. Everyone looked up. Korra stood there."
								},
								"primary": {
									"vi": "Một ngày trời sáng lạ. Hai thế giới chạm nhau. Korra đứng giữa ánh đó.",
									"en": "One day the sky glowed strangely. The two worlds touched. Korra stood in that light."
								},
								"intermediate": {
									"vi": "Hòa điểm — lúc hai thế giới sát gần. Trời mở như một con mắt. Thời gian của Korra mỏng như sợi tóc.",
									"en": "Harmonic Convergence — the hour the two worlds drew close. The sky opened like an eye. Korra's time was thin as a hair."
								},
								"senior": {
									"vi": "Trời không phải phông. Trời là một cánh cửa. Ngày ấy cửa kêu, và Korra — đứa trẻ của sóng — phải trở thành đứa trẻ của ánh.",
									"en": "The sky was not a backdrop. It was a door. That day the door cried out, and Korra — child of waves — had to become a child of light."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "The sky changed color",
										"vi": "Trời đổi màu"
									},
									{
										"en": "There was a big light",
										"vi": "Có ánh lớn"
									},
									{
										"en": "Everyone looked up",
										"vi": "Mọi người nhìn lên"
									},
									{
										"en": "Korra stood there",
										"vi": "Korra đứng đó"
									},
									{
										"en": "changed color",
										"vi": "đổi màu"
									}
								],
								"primary": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "One day the sky glowed strangely",
										"vi": "Một ngày trời sáng lạ"
									},
									{
										"en": "The two worlds touched",
										"vi": "Hai thế giới chạm nhau"
									},
									{
										"en": "Korra stood in that light",
										"vi": "Korra đứng giữa ánh đó"
									}
								],
								"intermediate": [
									{
										"en": "Harmonic Convergence — the hour the two worlds drew close",
										"vi": "Hòa điểm — lúc hai thế giới sát gần"
									},
									{
										"en": "The sky opened like an eye",
										"vi": "Trời mở như một con mắt"
									},
									{
										"en": "Korra's time was thin as a hair",
										"vi": "Thời gian của Korra mỏng như sợi tóc"
									},
									{
										"en": "harmonic convergence",
										"vi": "hòa hợp thiên địa"
									}
								],
								"senior": [
									{
										"en": "The sky was not a backdrop",
										"vi": "Trời không phải phông"
									},
									{
										"en": "It was a door",
										"vi": "Trời là một cánh cửa"
									},
									{
										"en": "That day the door cried out, and Korra — child of waves — had to become a child of light",
										"vi": "Ngày ấy cửa kêu, và Korra — đứa trẻ của sóng — phải trở thành đứa trẻ của ánh"
									}
								]
							}
						},
						{
							"id": "k2-giant",
							"image": "/illustrations/k2-07.jpg",
							"file": "k2-page-07",
							"title": {
								"vi": "Korra sáng",
								"en": "Korra of Light"
							},
							"text": {
								"preschool": {
									"vi": "Korra to lên. Korra sáng. Korra ôm trời. Hồn tối đi.",
									"en": "Korra grew very big. Korra glowed. Korra hugged the sky. The dark spirit went away."
								},
								"primary": {
									"vi": "Korra hóa thành ánh sáng lớn. Cô giữ lấy hồn tối cho đến khi trời yên.",
									"en": "Korra became a great light. She held the dark spirit until the sky grew calm."
								},
								"intermediate": {
									"vi": "Nhập với Raava, Korra hiện như một người khổng lồ bằng ánh. Cô không đập. Cô giữ. Bóng tối chịu lùi.",
									"en": "Joined with Raava, Korra appeared as a giant of light. She did not strike. She held. The dark consented to recede."
								},
								"senior": {
									"vi": "Sức mạnh lớn nhất cô từng có lại là một cái ôm. Ánh không hủy bóng — ánh bao lấy, cho đến khi bóng nhớ mình cũng từng là một phần của ngày.",
									"en": "The greatest power she had ever had was an embrace. Light did not destroy dark — it gathered it, until dark remembered it had once been part of day."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "hugged",
										"vi": "ôm"
									},
									{
										"en": "Korra grew very big",
										"vi": "Korra to lên"
									},
									{
										"en": "Korra glowed",
										"vi": "Korra sáng"
									},
									{
										"en": "Korra hugged the sky",
										"vi": "Korra ôm trời"
									},
									{
										"en": "The dark spirit went away",
										"vi": "Hồn tối đi"
									},
									{
										"en": "dark spirit",
										"vi": "hồn tối"
									},
									{
										"en": "grew very big",
										"vi": "to lên"
									},
									{
										"en": "went away",
										"vi": "đi"
									}
								],
								"primary": [
									{
										"en": "Korra became a great light",
										"vi": "Korra hóa thành ánh sáng lớn"
									},
									{
										"en": "She held the dark spirit until the sky grew calm",
										"vi": "Cô giữ lấy hồn tối cho đến khi trời yên"
									},
									{
										"en": "dark spirit",
										"vi": "hồn tối"
									}
								],
								"intermediate": [
									{
										"en": "appeared",
										"vi": "hiện ra"
									},
									{
										"en": "Joined with Raava, Korra appeared as a giant of light",
										"vi": "Nhập với Raava, Korra hiện như một người khổng lồ bằng ánh"
									},
									{
										"en": "She did not strike",
										"vi": "Cô không đập"
									},
									{
										"en": "The dark consented to recede",
										"vi": "Bóng tối chịu lùi"
									}
								],
								"senior": [{
									"en": "The greatest power she had ever had was an embrace",
									"vi": "Sức mạnh lớn nhất cô từng có lại là một cái ôm"
								}, {
									"en": "Light did not destroy dark — it gathered it, until dark remembered it had once been part of day",
									"vi": "Ánh không hủy bóng — ánh bao lấy, cho đến khi bóng nhớ mình cũng từng là một phần của ngày"
								}]
							}
						},
						{
							"id": "k2-newair",
							"image": "/illustrations/k2-08.jpg",
							"file": "k2-page-08",
							"title": {
								"vi": "Gió mới",
								"en": "New Wind"
							},
							"text": {
								"preschool": {
									"vi": "Có người thổi gió mới. Nhiều người. Tenzin vui. Jinora vui.",
									"en": "Some people started to blow wind. Many people. Tenzin was glad. Jinora was glad."
								},
								"primary": {
									"vi": "Sau ngày trời đổi, một số người bỗng thổi được gió. Tenzin có học trò mới.",
									"en": "After the day the sky changed, some people could suddenly blow the wind. Tenzin had new students."
								},
								"intermediate": {
									"vi": "Hòa điểm để lại một món quà: phong nhân mới trên khắp thế giới. Dân tộc mà Tenzin nghĩ đã gần tắt, bỗng thở lại.",
									"en": "Convergence left a gift: new airbenders across the world. The people Tenzin thought nearly gone suddenly breathed again."
								},
								"senior": {
									"vi": "Gió trở về không phải như di sản — như hạt. Tenzin khóc mà không giấu. Phong tộc, lần đầu sau trăm năm, không còn là một gia đình trên một đảo.",
									"en": "The air returned not as an heirloom — as seed. Tenzin wept and did not hide it. For the first time in a hundred years, the Air Nomads were not one family on one island."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Some people started to blow wind",
										"vi": "Có người thổi gió mới"
									},
									{
										"en": "Many people",
										"vi": "Nhiều người"
									},
									{
										"en": "Tenzin was glad",
										"vi": "Tenzin vui"
									},
									{
										"en": "Jinora was glad",
										"vi": "Jinora vui"
									},
									{
										"en": "blow wind",
										"vi": "thổi gió"
									}
								],
								"primary": [
									{
										"en": "After the day the sky changed, some people could suddenly blow the wind",
										"vi": "Sau ngày trời đổi, một số người bỗng thổi được gió"
									},
									{
										"en": "Tenzin had new students",
										"vi": "Tenzin có học trò mới"
									},
									{
										"en": "blow the wind",
										"vi": "thổi gió"
									}
								],
								"intermediate": [{
									"en": "Convergence left a gift: new airbenders across the world",
									"vi": "Hòa điểm để lại một món quà: phong nhân mới trên khắp thế giới"
								}, {
									"en": "The people Tenzin thought nearly gone suddenly breathed again",
									"vi": "Dân tộc mà Tenzin nghĩ đã gần tắt, bỗng thở lại"
								}],
								"senior": [
									{
										"en": "The air returned not as an heirloom — as seed",
										"vi": "Gió trở về không phải như di sản — như hạt"
									},
									{
										"en": "Tenzin wept and did not hide it",
										"vi": "Tenzin khóc mà không giấu"
									},
									{
										"en": "For the first time in a hundred years, the Air Nomads were not one family on one island",
										"vi": "Phong tộc, lần đầu sau trăm năm, không còn là một gia đình trên một đảo"
									},
									{
										"en": "a hundred years",
										"vi": "một trăm năm"
									},
									{
										"en": "Air Nomads",
										"vi": "Phong tộc"
									}
								]
							}
						},
						{
							"id": "k2-close",
							"image": "/illustrations/k2-09.jpg",
							"file": "k2-page-09",
							"title": {
								"vi": "Cổng mở",
								"en": "Gates Open"
							},
							"text": {
								"preschool": {
									"vi": "Cổng còn mở. Người và hồn gặp nhau. Korra nói: được. Mọi người tập sống chung.",
									"en": "The gates stayed open. People and spirits met. Korra said: it's okay. Everyone learned to live together."
								},
								"primary": {
									"vi": "Korra để cổng linh hồn mở. Người và hồn phải học chia thế giới. Khó, nhưng đúng.",
									"en": "Korra left the spirit portals open. People and spirits had to learn to share the world. It was hard, but right."
								},
								"intermediate": {
									"vi": "Cô không khóa lại. Cô tin hai thế giới có thể ở cạnh nhau. Dây leo linh hồn mọc trong thành — lạ, đẹp, và chưa ai thuộc hết luật.",
									"en": "She did not lock them. She believed the two worlds could live side by side. Spirit vines grew in the city — strange, beautiful, and not yet fully understood."
								},
								"senior": {
									"vi": "Khóa cổng thì dễ. Để mở là một lời hứa với những gì cô không điều khiển. Korra chọn lời hứa. Mùa hồn khép, thế giới thì không.",
									"en": "Closing the gates would have been easy. Leaving them open was a promise to what she could not control. Korra chose the promise. The Spirit season closes; the world does not."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "The gates stayed open",
										"vi": "Cổng còn mở"
									},
									{
										"en": "People and spirits met",
										"vi": "Người và hồn gặp nhau"
									},
									{
										"en": "Korra said: it's okay",
										"vi": "Korra nói: được"
									},
									{
										"en": "Everyone learned to live together",
										"vi": "Mọi người tập sống chung"
									},
									{
										"en": "it's okay",
										"vi": "được rồi"
									},
									{
										"en": "live together",
										"vi": "sống chung"
									}
								],
								"primary": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "Korra left the spirit portals open",
										"vi": "Korra để cổng linh hồn mở"
									},
									{
										"en": "People and spirits had to learn to share the world",
										"vi": "Người và hồn phải học chia thế giới"
									},
									{
										"en": "It was hard, but right",
										"vi": "Khó, nhưng đúng"
									}
								],
								"intermediate": [
									{
										"en": "She did not lock them",
										"vi": "Cô không khóa lại"
									},
									{
										"en": "She believed the two worlds could live side by side",
										"vi": "Cô tin hai thế giới có thể ở cạnh nhau"
									},
									{
										"en": "Spirit vines grew in the city — strange, beautiful, and not yet fully understood",
										"vi": "Dây leo linh hồn mọc trong thành — lạ, đẹp, và chưa ai thuộc hết luật"
									}
								],
								"senior": [
									{
										"en": "Closing the gates would have been easy",
										"vi": "Khóa cổng thì dễ"
									},
									{
										"en": "Leaving them open was a promise to what she could not control",
										"vi": "Để mở là một lời hứa với những gì cô không điều khiển"
									},
									{
										"en": "Korra chose the promise",
										"vi": "Korra chọn lời hứa"
									},
									{
										"en": "The Spirit season closes; the world does not",
										"vi": "Mùa hồn khép, thế giới thì không"
									}
								]
							}
						},
						{
							"id": "k2-next",
							"image": "/illustrations/k2-10.jpg",
							"file": "k2-page-10",
							"title": {
								"vi": "Đổi rồi",
								"en": "Changed"
							},
							"text": {
								"preschool": {
									"vi": "Thế giới khác rồi. Có gió mới. Có hồn. Mùa hai xong. Mùa ba tới.",
									"en": "The world is different now. There is new wind. There are spirits. Season two ends. Season three will come."
								},
								"primary": {
									"vi": "Mùa hai kết thúc. Korra đã đổi thế giới. Gió mới và hồn ở lại. Mùa ba sẽ tới.",
									"en": "Season two ends. Korra has changed the world. New air and spirits remain. Season three will come."
								},
								"intermediate": {
									"vi": "Cân bằng không trở về chỗ cũ — nó tìm chỗ mới. Korra nhìn thành phố, dây leo, và những người mới biết thổi gió. Mùa linh hồn lặng.",
									"en": "Balance did not return to its old seat — it found a new one. Korra looked at the city, the vines, and the people new to wind. The Spirit season grows quiet."
								},
								"senior": {
									"vi": "Cô không trả thế giới về hôm qua. Cô để nó trở thành ngày mai. Đó là sự dũng cảm khác sức mạnh. Phía trước, sự đổi sẽ đòi cô trả giá.",
									"en": "She did not give the world back to yesterday. She let it become tomorrow. That is a courage different from strength. Ahead, change will ask her to pay."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "The world is different now",
										"vi": "Thế giới khác rồi"
									},
									{
										"en": "There is new wind",
										"vi": "Có gió mới"
									},
									{
										"en": "There are spirits",
										"vi": "Có hồn"
									},
									{
										"en": "Season two ends",
										"vi": "Mùa hai xong"
									},
									{
										"en": "Season three will come",
										"vi": "Mùa ba tới"
									},
									{
										"en": "season two",
										"vi": "mùa hai"
									},
									{
										"en": "season three",
										"vi": "mùa ba"
									}
								],
								"primary": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "Season two ends",
										"vi": "Mùa hai kết thúc"
									},
									{
										"en": "Korra has changed the world",
										"vi": "Korra đã đổi thế giới"
									},
									{
										"en": "New air and spirits remain",
										"vi": "Gió mới và hồn ở lại"
									},
									{
										"en": "Season three will come",
										"vi": "Mùa ba sẽ tới"
									},
									{
										"en": "season two",
										"vi": "mùa hai"
									},
									{
										"en": "season three",
										"vi": "mùa ba"
									}
								],
								"intermediate": [
									{
										"en": "Balance did not return to its old seat — it found a new one",
										"vi": "Cân bằng không trở về chỗ cũ — nó tìm chỗ mới"
									},
									{
										"en": "Korra looked at the city, the vines, and the people new to wind",
										"vi": "Korra nhìn thành phố, dây leo, và những người mới biết thổi gió"
									},
									{
										"en": "The Spirit season grows quiet",
										"vi": "Mùa linh hồn lặng"
									}
								],
								"senior": [
									{
										"en": "She did not give the world back to yesterday",
										"vi": "Cô không trả thế giới về hôm qua"
									},
									{
										"en": "She let it become tomorrow",
										"vi": "Cô để nó trở thành ngày mai"
									},
									{
										"en": "That is a courage different from strength",
										"vi": "Đó là sự dũng cảm khác sức mạnh"
									},
									{
										"en": "Ahead, change will ask her to pay",
										"vi": "Phía trước, sự đổi sẽ đòi cô trả giá"
									}
								]
							}
						}
					]
				},
				{
					"id": "k3",
					"vi": "Mùa 3 · Đổi thay",
					"en": "Season 3 · Change",
					"tagline": {
						"vi": "Gió có nhà",
						"en": "Air finds a home"
					},
					"pages": [
						{
							"id": "k3-cover",
							"image": "/illustrations/k3-00.jpg",
							"file": "k3-page-00",
							"title": {
								"vi": "Mùa đổi",
								"en": "Change Season"
							},
							"text": {
								"preschool": {
									"vi": "Đây là chuyện Korra. Mùa ba. Có nhiều người gió. Tenzin vui lắm.",
									"en": "This is Korra. Season three. There are many air people. Tenzin is so glad."
								},
								"primary": {
									"vi": "Đây là mùa ba. Những người mới biết thổi gió cần một nhà. Tenzin đi tìm họ.",
									"en": "This is season three. The new airbenders need a home. Tenzin goes to find them."
								},
								"intermediate": {
									"vi": "Mùa đổi thay bắt đầu bằng một cuộc đi: tập hợp Phong tộc mới. Korra bay cùng, vì gió cô học được không phải của một mình.",
									"en": "The season of Change begins with a journey: gathering the new Air Nomads. Korra flies along, because the air she learned is not hers alone."
								},
								"senior": {
									"vi": "Một dân tộc không sống trong bảo tàng. Nó sống khi có người mới thở như họ. Mùa này, Korra giúp gió có nhà — và học rằng nhà cũng có thể bị lấy.",
									"en": "A people does not live in a museum. It lives when new people breathe as they do. This season Korra helped the air find a home — and learned that a home can also be taken."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Korra",
										"vi": "Đây là chuyện Korra"
									},
									{
										"en": "Season three",
										"vi": "Mùa ba"
									},
									{
										"en": "There are many air people",
										"vi": "Có nhiều người gió"
									},
									{
										"en": "Tenzin is so glad",
										"vi": "Tenzin vui lắm"
									},
									{
										"en": "air people",
										"vi": "người gió"
									}
								],
								"primary": [
									{
										"en": "This is season three",
										"vi": "Đây là mùa ba"
									},
									{
										"en": "The new airbenders need a home",
										"vi": "Những người mới biết thổi gió cần một nhà"
									},
									{
										"en": "Tenzin goes to find them",
										"vi": "Tenzin đi tìm họ"
									},
									{
										"en": "season three",
										"vi": "mùa ba"
									}
								],
								"intermediate": [
									{
										"en": "The season of Change begins with a journey: gathering the new Air Nomads",
										"vi": "Mùa đổi thay bắt đầu bằng một cuộc đi: tập hợp Phong tộc mới"
									},
									{
										"en": "Korra flies along, because the air she learned is not hers alone",
										"vi": "Korra bay cùng, vì gió cô học được không phải của một mình"
									},
									{
										"en": "Air Nomads",
										"vi": "Phong tộc"
									}
								],
								"senior": [
									{
										"en": "A people does not live in a museum",
										"vi": "Một dân tộc không sống trong bảo tàng"
									},
									{
										"en": "It lives when new people breathe as they do",
										"vi": "Nó sống khi có người mới thở như họ"
									},
									{
										"en": "This season Korra helped the air find a home — and learned that a home can also be taken",
										"vi": "Mùa này, Korra giúp gió có nhà — và học rằng nhà cũng có thể bị lấy"
									}
								]
							}
						},
						{
							"id": "k3-gather",
							"image": "/illustrations/k3-01.jpg",
							"file": "k3-page-01",
							"title": {
								"vi": "Gom gió",
								"en": "Gathering Air"
							},
							"text": {
								"preschool": {
									"vi": "Tenzin tìm người gió. Korra giúp. Appa bay. Mọi người lên đền.",
									"en": "Tenzin looked for air people. Korra helped. The bison flew. Everyone went to the temple."
								},
								"primary": {
									"vi": "Họ đi khắp nơi mời những người mới biết gió. Có người vui. Có người sợ. Đền mở cửa.",
									"en": "They traveled everywhere to invite the new airbenders. Some were glad. Some were afraid. The temple opened its doors."
								},
								"intermediate": {
									"vi": "Không phải ai cũng muốn rời nhà cũ. Phong thuật là món quà, cũng là một đời khác. Tenzin kiên nhẫn. Korra thì muốn nhanh.",
									"en": "Not everyone wanted to leave their old home. Airbending was a gift, and also another life. Tenzin was patient. Korra wanted speed."
								},
								"senior": {
									"vi": "Gom một dân tộc không phải gom lính. Tenzin cúi đầu từng cửa. Korra học rằng gió không kéo — gió mời.",
									"en": "Gathering a people is not gathering soldiers. Tenzin bowed at each door. Korra learned that air does not pull — it invites."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Tenzin looked for air people",
										"vi": "Tenzin tìm người gió"
									},
									{
										"en": "Korra helped",
										"vi": "Korra giúp"
									},
									{
										"en": "The bison flew",
										"vi": "Appa bay"
									},
									{
										"en": "Everyone went to the temple",
										"vi": "Mọi người lên đền"
									},
									{
										"en": "air people",
										"vi": "người gió"
									}
								],
								"primary": [
									{
										"en": "They traveled everywhere to invite the new airbenders",
										"vi": "Họ đi khắp nơi mời những người mới biết gió"
									},
									{
										"en": "Some were glad",
										"vi": "Có người vui"
									},
									{
										"en": "Some were afraid",
										"vi": "Có người sợ"
									},
									{
										"en": "The temple opened its doors",
										"vi": "Đền mở cửa"
									}
								],
								"intermediate": [
									{
										"en": "airbending",
										"vi": "phong thuật"
									},
									{
										"en": "Not everyone wanted to leave their old home",
										"vi": "Không phải ai cũng muốn rời nhà cũ"
									},
									{
										"en": "Airbending was a gift, and also another life",
										"vi": "Phong thuật là món quà, cũng là một đời khác"
									},
									{
										"en": "Tenzin was patient",
										"vi": "Tenzin kiên nhẫn"
									},
									{
										"en": "Korra wanted speed",
										"vi": "Korra thì muốn nhanh"
									},
									{
										"en": "old home",
										"vi": "nhà cũ"
									}
								],
								"senior": [
									{
										"en": "Gathering a people is not gathering soldiers",
										"vi": "Gom một dân tộc không phải gom lính"
									},
									{
										"en": "Tenzin bowed at each door",
										"vi": "Tenzin cúi đầu từng cửa"
									},
									{
										"en": "Korra learned that air does not pull — it invites",
										"vi": "Korra học rằng gió không kéo — gió mời"
									}
								]
							}
						},
						{
							"id": "k3-zaheer",
							"image": "/illustrations/k3-02.jpg",
							"file": "k3-page-02",
							"title": {
								"vi": "Zaheer",
								"en": "Zaheer"
							},
							"text": {
								"preschool": {
									"vi": "Có chú Zaheer. Zaheer bay được. Zaheer hông muốn vua. Các bạn lo.",
									"en": "This is Zaheer. Zaheer can fly. Zaheer does not want kings. The friends worried."
								},
								"primary": {
									"vi": "Zaheer là một người bay không cần bò. Ông không muốn có vua, không muốn có Avatar. Đội bạn phải cẩn thận.",
									"en": "Zaheer is a man who flies without a bison. He does not want kings, and does not want an Avatar. The friends had to be careful."
								},
								"intermediate": {
									"vi": "Hồng Liên — những người tin không nên có người cai. Zaheer nhận gió như một chìa khóa. Ông muốn Korra biến mất, để thế giới 'tự do'.",
									"en": "The Red Lotus — people who believe no one should rule. Zaheer received air like a key. He wanted Korra gone, so the world could be 'free'."
								},
								"senior": {
									"vi": "Tự do của ông là một bầu trời không có chim bị nhốt — cũng không có tổ. Korra, vốn là thăng bằng, trở thành thứ ông muốn tháo. Bay, với ông, là thoát. Bay, với cô, là ở lại.",
									"en": "His freedom was a sky with no caged birds — and no nests. Korra, who was balance, became what he wanted to unmake. Flight, for him, was escape. Flight, for her, was staying."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "This is Zaheer",
										"vi": "Có chú Zaheer"
									},
									{
										"en": "Zaheer can fly",
										"vi": "Zaheer bay được"
									},
									{
										"en": "Zaheer does not want kings",
										"vi": "Zaheer hông muốn vua"
									},
									{
										"en": "The friends worried",
										"vi": "Các bạn lo"
									},
									{
										"en": "does not want",
										"vi": "hông muốn"
									},
									{
										"en": "does not want kings",
										"vi": "hông muốn vua"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Zaheer is a man who flies without a bison",
										"vi": "Zaheer là một người bay hông cần bò"
									},
									{
										"en": "He does not want kings, and does not want an Avatar",
										"vi": "Ông hông muốn có vua, hông muốn có Avatar"
									},
									{
										"en": "The friends had to be careful",
										"vi": "Đội bạn phải cẩn thận"
									},
									{
										"en": "does not want",
										"vi": "hông muốn"
									},
									{
										"en": "does not want kings",
										"vi": "hông muốn vua"
									}
								],
								"intermediate": [
									{
										"en": "The Red Lotus — people who believe no one should rule",
										"vi": "Hồng Liên — những người tin không nên có người cai"
									},
									{
										"en": "Zaheer received air like a key",
										"vi": "Zaheer nhận gió như một chìa khóa"
									},
									{
										"en": "He wanted Korra gone, so the world could be 'free'",
										"vi": "Ông muốn Korra biến mất, để thế giới 'tự do'"
									}
								],
								"senior": [
									{
										"en": "His freedom was a sky with no caged birds — and no nests",
										"vi": "Tự do của ông là một bầu trời không có chim bị nhốt — cũng không có tổ"
									},
									{
										"en": "Korra, who was balance, became what he wanted to unmake",
										"vi": "Korra, vốn là thăng bằng, trở thành thứ ông muốn tháo"
									},
									{
										"en": "Flight, for him, was escape",
										"vi": "Bay, với ông, là thoát"
									},
									{
										"en": "Flight, for her, was staying",
										"vi": "Bay, với cô, là ở lại"
									}
								]
							}
						},
						{
							"id": "k3-run",
							"image": "/illustrations/k3-03.jpg",
							"file": "k3-page-03",
							"title": {
								"vi": "Chạy",
								"en": "Run"
							},
							"text": {
								"preschool": {
									"vi": "Các bạn chạy. Giữ Korra. Bay tiếp. Hông để Zaheer bắt.",
									"en": "The friends ran. They kept Korra safe. They flew on. Do not let Zaheer catch her."
								},
								"primary": {
									"vi": "Đội bạn đưa Korra đi ẩn. Zaheer theo sau. Họ tin nhau và không dừng.",
									"en": "The team hid Korra. Zaheer followed. They trusted one another and did not stop."
								},
								"intermediate": {
									"vi": "Cuộc chạy xuyên quốc gia. Mỗi đền, mỗi hang là một chỗ nấp mỏng. Bạn bè thành lá chắn.",
									"en": "A chase across nations. Every temple, every cave was a thin hiding place. Friends became a shield."
								},
								"senior": {
									"vi": "Họ không thắng bằng sức. Họ thắng từng giờ — một giờ Korra còn thở là một giờ thế giới còn có Avatar. Tình bạn, mùa này, là đường chạy.",
									"en": "They did not win by force. They won hour by hour — an hour Korra still breathed was an hour the world still had an Avatar. Friendship, this season, was a running path."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "The friends ran",
										"vi": "Các bạn chạy"
									},
									{
										"en": "They kept Korra safe",
										"vi": "Giữ Korra"
									},
									{
										"en": "They flew on",
										"vi": "Bay tiếp"
									},
									{
										"en": "Do not let Zaheer catch her",
										"vi": "Hông để Zaheer bắt"
									},
									{
										"en": "flew on",
										"vi": "bay tiếp"
									},
									{
										"en": "kept Korra safe",
										"vi": "giữ Korra"
									},
									{
										"en": "do not let",
										"vi": "hông để"
									}
								],
								"primary": [
									{
										"en": "The team hid Korra",
										"vi": "Đội bạn đưa Korra đi ẩn"
									},
									{
										"en": "Zaheer followed",
										"vi": "Zaheer theo sau"
									},
									{
										"en": "They trusted one another and did not stop",
										"vi": "Họ tin nhau và hông dừng"
									}
								],
								"intermediate": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "A chase across nations",
										"vi": "Cuộc chạy xuyên quốc gia"
									},
									{
										"en": "Every temple, every cave was a thin hiding place",
										"vi": "Mỗi đền, mỗi hang là một chỗ nấp mỏng"
									},
									{
										"en": "Friends became a shield",
										"vi": "Bạn bè thành lá chắn"
									}
								],
								"senior": [
									{
										"en": "They did not win by force",
										"vi": "Họ không thắng bằng sức"
									},
									{
										"en": "They won hour by hour — an hour Korra still breathed was an hour the world still had an Avatar",
										"vi": "Họ thắng từng giờ — một giờ Korra còn thở là một giờ thế giới còn có Avatar"
									},
									{
										"en": "Friendship, this season, was a running path",
										"vi": "Tình bạn, mùa này, là đường chạy"
									}
								]
							}
						},
						{
							"id": "k3-jinora-find",
							"image": "/illustrations/k3-04.jpg",
							"file": "k3-page-04",
							"title": {
								"vi": "Jinora tìm",
								"en": "Jinora Seeks"
							},
							"text": {
								"preschool": {
									"vi": "Jinora đi tìm. Jinora nhỏ mà mạnh. Jinora thấy đường. Mọi người theo.",
									"en": "Jinora went looking. Jinora is little but strong. Jinora found the way. Everyone followed."
								},
								"primary": {
									"vi": "Jinora dùng linh hồn để tìm người. Cô bé dẫn đường khi người lớn lạc.",
									"en": "Jinora used her spirit to find people. The little girl led the way when the grown-ups were lost."
								},
								"intermediate": {
									"vi": "Trong cõi hồn, Jinora nhìn xa hơn bản đồ. Cô tìm ra chỗ Zaheer giữ người. Ánh của cô là sợi chỉ.",
									"en": "In the spirit world Jinora saw farther than maps. She found where Zaheer kept people. Her light was the thread."
								},
								"senior": {
									"vi": "Một đứa trẻ cầm cả một cuộc cứu. Không phải vì người lớn yếu — vì cô nghe được tầng mà sức không tới. Tenzin, lần này, đi sau con gái.",
									"en": "A child held an entire rescue. Not because the grown were weak — because she could hear a layer strength does not reach. Tenzin, this time, walked behind his daughter."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Jinora went looking",
										"vi": "Jinora đi tìm"
									},
									{
										"en": "Jinora is little but strong",
										"vi": "Jinora nhỏ mà mạnh"
									},
									{
										"en": "Jinora found the way",
										"vi": "Jinora thấy đường"
									},
									{
										"en": "Everyone followed",
										"vi": "Mọi người theo"
									},
									{
										"en": "little but strong",
										"vi": "nhỏ mà mạnh"
									},
									{
										"en": "found the way",
										"vi": "thấy đường"
									}
								],
								"primary": [{
									"en": "Jinora used her spirit to find people",
									"vi": "Jinora dùng linh hồn để tìm người"
								}, {
									"en": "The little girl led the way when the grown-ups were lost",
									"vi": "Cô bé dẫn đường khi người lớn lạc"
								}],
								"intermediate": [
									{
										"en": "In the spirit world Jinora saw farther than maps",
										"vi": "Trong cõi hồn, Jinora nhìn xa hơn bản đồ"
									},
									{
										"en": "She found where Zaheer kept people",
										"vi": "Cô tìm ra chỗ Zaheer giữ người"
									},
									{
										"en": "Her light was the thread",
										"vi": "Ánh của cô là sợi chỉ"
									},
									{
										"en": "spirit world",
										"vi": "cõi hồn"
									}
								],
								"senior": [
									{
										"en": "A child held an entire rescue",
										"vi": "Một đứa trẻ cầm cả một cuộc cứu"
									},
									{
										"en": "Not because the grown were weak — because she could hear a layer strength does not reach",
										"vi": "Không phải vì người lớn yếu — vì cô nghe được tầng mà sức không tới"
									},
									{
										"en": "Tenzin, this time, walked behind his daughter",
										"vi": "Tenzin, lần này, đi sau con gái"
									}
								]
							}
						},
						{
							"id": "k3-family",
							"image": "/illustrations/k3-05.jpg",
							"file": "k3-page-05",
							"title": {
								"vi": "Nhà gió",
								"en": "Air Family"
							},
							"text": {
								"preschool": {
									"vi": "Nhiều người gió ở chung. Họ mặc áo vàng. Họ bay. Họ cười. Nhà mới.",
									"en": "Many air people lived together. They wore yellow clothes. They flew. They laughed. A new home."
								},
								"primary": {
									"vi": "Phong tộc có nhà trở lại. Áo vàng, bò bay, trẻ con trên mây. Tenzin nhìn và khóc vui.",
									"en": "The Air Nomads had a home again. Yellow clothes, flying bison, children in the clouds. Tenzin looked and cried happy tears."
								},
								"intermediate": {
									"vi": "Đền không còn im. Tiếng chân, tiếng chuông, tiếng gió có người thổi. Một dân tộc, mỏng như giấy, bỗng dày lên.",
									"en": "The temple was no longer silent. Footsteps, bells, wind with people in it. A people thin as paper suddenly grew thick."
								},
								"senior": {
									"vi": "Nhà không phải tường. Nhà là những người cùng một hơi thở. Tenzin, người từng là người cuối, được phép không còn là người cuối.",
									"en": "Home is not walls. Home is people sharing one breath. Tenzin, who had been the last, was allowed not to be the last anymore."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Many air people lived together",
										"vi": "Nhiều người gió ở chung"
									},
									{
										"en": "They wore yellow clothes",
										"vi": "Họ mặc áo vàng"
									},
									{
										"en": "They flew",
										"vi": "Họ bay"
									},
									{
										"en": "They laughed",
										"vi": "Họ cười"
									},
									{
										"en": "A new home",
										"vi": "Nhà mới"
									},
									{
										"en": "air people",
										"vi": "người gió"
									},
									{
										"en": "yellow clothes",
										"vi": "áo vàng"
									}
								],
								"primary": [
									{
										"en": "The Air Nomads had a home again",
										"vi": "Phong tộc có nhà trở lại"
									},
									{
										"en": "Yellow clothes, flying bison, children in the clouds",
										"vi": "Áo vàng, bò bay, trẻ con trên mây"
									},
									{
										"en": "Tenzin looked and cried happy tears",
										"vi": "Tenzin nhìn và khóc vui"
									},
									{
										"en": "flying bison",
										"vi": "bò bay"
									},
									{
										"en": "yellow clothes",
										"vi": "áo vàng"
									},
									{
										"en": "Air Nomads",
										"vi": "Phong tộc"
									}
								],
								"intermediate": [
									{
										"en": "The temple was no longer silent",
										"vi": "Đền không còn im"
									},
									{
										"en": "Footsteps, bells, wind with people in it",
										"vi": "Tiếng chân, tiếng chuông, tiếng gió có người thổi"
									},
									{
										"en": "A people thin as paper suddenly grew thick",
										"vi": "Một dân tộc, mỏng như giấy, bỗng dày lên"
									}
								],
								"senior": [
									{
										"en": "Home is not walls",
										"vi": "Nhà không phải tường"
									},
									{
										"en": "Home is people sharing one breath",
										"vi": "Nhà là những người cùng một hơi thở"
									},
									{
										"en": "Tenzin, who had been the last, was allowed not to be the last anymore",
										"vi": "Tenzin, người từng là người cuối, được phép không còn là người cuối"
									}
								]
							}
						},
						{
							"id": "k3-hurt",
							"image": "/illustrations/k3-06.jpg",
							"file": "k3-page-06",
							"title": {
								"vi": "Korra mệt",
								"en": "Korra Tired"
							},
							"text": {
								"preschool": {
									"vi": "Korra mệt lắm. Korra nằm. Bạn bè ẵm. Korra cần ngủ. Ngủ lâu.",
									"en": "Korra was so tired. Korra lay down. Friends held her. Korra needed sleep. A long sleep."
								},
								"primary": {
									"vi": "Korra bị thương và rất yếu. Bạn bè giữ cô. Cô cần thời gian để lành.",
									"en": "Korra was hurt and very weak. Her friends held her. She needed time to heal."
								},
								"intermediate": {
									"vi": "Trận cuối lấy đi sức của Korra. Cô sống, nhưng người không còn như cũ. Asami nắm tay. Tenzin cầu gió nhẹ.",
									"en": "The last fight took Korra's strength. She lived, but her body was not as before. Asami held her hand. Tenzin asked the wind to be gentle."
								},
								"senior": {
									"vi": "Avatar không phải bất tử. Cô học điều đó bằng chính xương mình. Những người yêu cô không đòi cô đứng ngay — họ dựng một chỗ để cô nằm mà không mất mặt.",
									"en": "The Avatar is not unbreakable. She learned that with her own bones. The people who loved her did not demand she stand at once — they made a place where she could lie without shame."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Korra was so tired",
										"vi": "Korra mệt lắm"
									},
									{
										"en": "Korra lay down",
										"vi": "Korra nằm"
									},
									{
										"en": "Friends held her",
										"vi": "Bạn bè ẵm"
									},
									{
										"en": "Korra needed sleep",
										"vi": "Korra cần ngủ"
									},
									{
										"en": "A long sleep",
										"vi": "Ngủ lâu"
									},
									{
										"en": "so tired",
										"vi": "mệt lắm"
									},
									{
										"en": "lay down",
										"vi": "nằm"
									},
									{
										"en": "needed sleep",
										"vi": "cần ngủ"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Korra was hurt and very weak",
										"vi": "Korra bị thương và rất yếu"
									},
									{
										"en": "Her friends held her",
										"vi": "Bạn bè giữ cô"
									},
									{
										"en": "She needed time to heal",
										"vi": "Cô cần thời gian để lành"
									}
								],
								"intermediate": [
									{
										"en": "The last fight took Korra's strength",
										"vi": "Trận cuối lấy đi sức của Korra"
									},
									{
										"en": "She lived, but her body was not as before",
										"vi": "Cô sống, nhưng người không còn như cũ"
									},
									{
										"en": "Asami held her hand",
										"vi": "Asami nắm tay"
									},
									{
										"en": "Tenzin asked the wind to be gentle",
										"vi": "Tenzin cầu gió nhẹ"
									}
								],
								"senior": [
									{
										"en": "The Avatar is not unbreakable",
										"vi": "Avatar không phải bất tử"
									},
									{
										"en": "She learned that with her own bones",
										"vi": "Cô học điều đó bằng chính xương mình"
									},
									{
										"en": "The people who loved her did not demand she stand at once — they made a place where she could lie without shame",
										"vi": "Những người yêu cô không đòi cô đứng ngay — họ dựng một chỗ để cô nằm mà không mất mặt"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								]
							}
						},
						{
							"id": "k3-master",
							"image": "/illustrations/k3-07.jpg",
							"file": "k3-page-07",
							"title": {
								"vi": "Thầy Jinora",
								"en": "Master Jinora"
							},
							"text": {
								"preschool": {
									"vi": "Jinora được xăm. Jinora thành thầy gió. Mọi người vỗ tay. Tenzin tự hào.",
									"en": "Jinora got her tattoos. Jinora became an air teacher. Everyone clapped. Tenzin was proud."
								},
								"primary": {
									"vi": "Jinora nhận dấu tên Phong tộc. Cô bé thành phong sư. Nhà gió có thầy mới.",
									"en": "Jinora received the Air Nomad marks. The little girl became an airbending master. The air family had a new teacher."
								},
								"intermediate": {
									"vi": "Trong lễ, mũi tên xanh lên trán Jinora. Tenzin không nói nhiều. Niềm tự hào đi qua mắt ông, nhẹ như chính môn ông dạy.",
									"en": "In the ceremony the blue arrow rose on Jinora's brow. Tenzin did not say much. Pride passed through his eyes, light as the art he taught."
								},
								"senior": {
									"vi": "Một thầy mới không xóa thầy cũ. Jinora mang gió của mình — tĩnh, xa, nhân từ. Dân tộc ấy, vừa được cứu, đã có người dẫn tiếp.",
									"en": "A new master does not erase the old. Jinora carried her own air — still, far-seeing, kind. That people, just rescued, already had someone to lead next."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "Jinora got her tattoos",
										"vi": "Jinora được xăm"
									},
									{
										"en": "Jinora became an air teacher",
										"vi": "Jinora thành thầy gió"
									},
									{
										"en": "Everyone clapped",
										"vi": "Mọi người vỗ tay"
									},
									{
										"en": "Tenzin was proud",
										"vi": "Tenzin tự hào"
									},
									{
										"en": "became an air teacher",
										"vi": "thành thầy gió"
									},
									{
										"en": "was proud",
										"vi": "tự hào"
									}
								],
								"primary": [
									{
										"en": "airbending",
										"vi": "phong thuật"
									},
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "Jinora received the Air Nomad marks",
										"vi": "Jinora nhận dấu tên Phong tộc"
									},
									{
										"en": "The little girl became an airbending master",
										"vi": "Cô bé thành phong sư"
									},
									{
										"en": "The air family had a new teacher",
										"vi": "Nhà gió có thầy mới"
									}
								],
								"intermediate": [
									{
										"en": "In the ceremony the blue arrow rose on Jinora's brow",
										"vi": "Trong lễ, mũi tên xanh lên trán Jinora"
									},
									{
										"en": "Tenzin did not say much",
										"vi": "Tenzin không nói nhiều"
									},
									{
										"en": "Pride passed through his eyes, light as the art he taught",
										"vi": "Niềm tự hào đi qua mắt ông, nhẹ như chính môn ông dạy"
									}
								],
								"senior": [
									{
										"en": "A new master does not erase the old",
										"vi": "Một thầy mới không xóa thầy cũ"
									},
									{
										"en": "Jinora carried her own air — still, far-seeing, kind",
										"vi": "Jinora mang gió của mình — tĩnh, xa, nhân từ"
									},
									{
										"en": "That people, just rescued, already had someone to lead next",
										"vi": "Dân tộc ấy, vừa được cứu, đã có người dẫn tiếp"
									}
								]
							}
						},
						{
							"id": "k3-rest",
							"image": "/illustrations/k3-08.jpg",
							"file": "k3-page-08",
							"title": {
								"vi": "Nghỉ",
								"en": "Rest"
							},
							"text": {
								"preschool": {
									"vi": "Korra về Nam. Korra nghỉ. Naga liếm Korra. Từ từ nha.",
									"en": "Korra went south. Korra rested. Naga licked Korra. Slowly now."
								},
								"primary": {
									"vi": "Korra trở về cực Nam để lành. Naga ở bên. Cô học ngồi yên — bài mà gió từng đòi.",
									"en": "Korra went back to the South Pole to heal. Naga stayed beside her. She learned to sit still — the lesson the air had once asked for."
								},
								"intermediate": {
									"vi": "Không có khán giả. Không có thành phố. Chỉ có tuyết, chó gấu, và một cơ thể đang nhớ cách đứng. Korra ghét chậm. Cô vẫn chậm.",
									"en": "No audience. No city. Only snow, a bear-dog, and a body remembering how to stand. Korra hated slow. She was slow anyway."
								},
								"senior": {
									"vi": "Lành không phải chiến thắng. Lành là ở lại với chỗ đau mà không chạy. Mùa đổi, với thế giới, là gió có nhà. Với Korra, là học làm người khi không bay được.",
									"en": "Healing is not a victory. Healing is staying with the sore place and not running. For the world, Change meant air had a home. For Korra, it meant learning to be a person when she could not fly."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "rested",
										"vi": "nghỉ"
									},
									{
										"en": "licked",
										"vi": "liếm"
									},
									{
										"en": "Korra went south",
										"vi": "Korra về Nam"
									},
									{
										"en": "Korra rested",
										"vi": "Korra nghỉ"
									},
									{
										"en": "Naga licked Korra",
										"vi": "Naga liếm Korra"
									},
									{
										"en": "Slowly now",
										"vi": "Từ từ nha"
									}
								],
								"primary": [
									{
										"en": "Korra went back to the South Pole to heal",
										"vi": "Korra trở về cực Nam để lành"
									},
									{
										"en": "Naga stayed beside her",
										"vi": "Naga ở bên"
									},
									{
										"en": "She learned to sit still — the lesson the air had once asked for",
										"vi": "Cô học ngồi yên — bài mà gió từng đòi"
									},
									{
										"en": "South Pole",
										"vi": "cực Nam"
									}
								],
								"intermediate": [
									{
										"en": "Only snow, a bear-dog, and a body remembering how to stand",
										"vi": "Chỉ có tuyết, chó gấu, và một cơ thể đang nhớ cách đứng"
									},
									{
										"en": "Korra hated slow",
										"vi": "Korra ghét chậm"
									},
									{
										"en": "She was slow anyway",
										"vi": "Cô vẫn chậm"
									}
								],
								"senior": [
									{
										"en": "Healing is not a victory",
										"vi": "Lành không phải chiến thắng"
									},
									{
										"en": "Healing is staying with the sore place and not running",
										"vi": "Lành là ở lại với chỗ đau mà không chạy"
									},
									{
										"en": "For the world, Change meant air had a home",
										"vi": "Mùa đổi, với thế giới, là gió có nhà"
									},
									{
										"en": "For Korra, it meant learning to be a person when she could not fly",
										"vi": "Với Korra, là học làm người khi không bay được"
									}
								]
							}
						},
						{
							"id": "k3-hope",
							"image": "/illustrations/k3-09.jpg",
							"file": "k3-page-09",
							"title": {
								"vi": "Còn hy vọng",
								"en": "Still Hope"
							},
							"text": {
								"preschool": {
									"vi": "Nhà gió còn. Bạn bè còn. Korra còn. Từ từ sẽ khỏe. Mùa ba gần xong.",
									"en": "The air home remains. Friends remain. Korra remains. Slowly she will be well. Season three is almost done."
								},
								"primary": {
									"vi": "Phong tộc sống. Bạn bè viết thư. Korra yếu, nhưng chưa mất. Hy vọng ở lại.",
									"en": "The Air Nomads live. Friends write letters. Korra is weak, but not gone. Hope stays."
								},
								"intermediate": {
									"vi": "Thế giới không dừng vì Avatar nằm. Đó vừa đau vừa đúng. Cô còn đường về — chỉ không phải hôm nay.",
									"en": "The world did not stop because the Avatar lay down. That was both a hurt and a truth. She still had a way back — just not today."
								},
								"senior": {
									"vi": "Hy vọng mùa này không rực. Nó là than hồng dưới tuyết. Ai yêu cô, giữ than ấy. Mùa đổi khép lại bằng một lời chưa nói hết: còn.",
									"en": "Hope this season did not blaze. It was an ember under snow. Those who loved her kept that coal. The season of Change closes on a word not finished: still."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "The air home remains",
										"vi": "Nhà gió còn"
									},
									{
										"en": "Friends remain",
										"vi": "Bạn bè còn"
									},
									{
										"en": "Korra remains",
										"vi": "Korra còn"
									},
									{
										"en": "Slowly she will be well",
										"vi": "Từ từ sẽ khỏe"
									},
									{
										"en": "Season three is almost done",
										"vi": "Mùa ba gần xong"
									},
									{
										"en": "season three",
										"vi": "mùa ba"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "The Air Nomads live",
										"vi": "Phong tộc sống"
									},
									{
										"en": "Friends write letters",
										"vi": "Bạn bè viết thư"
									},
									{
										"en": "Korra is weak, but not gone",
										"vi": "Korra yếu, nhưng chưa mất"
									},
									{
										"en": "Hope stays",
										"vi": "Hy vọng ở lại"
									},
									{
										"en": "Air Nomads",
										"vi": "Phong tộc"
									}
								],
								"intermediate": [
									{
										"en": "The world did not stop because the Avatar lay down",
										"vi": "Thế giới không dừng vì Avatar nằm"
									},
									{
										"en": "That was both a hurt and a truth",
										"vi": "Đó vừa đau vừa đúng"
									},
									{
										"en": "She still had a way back — just not today",
										"vi": "Cô còn đường về — chỉ không phải hôm nay"
									},
									{
										"en": "lay down",
										"vi": "nằm"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								],
								"senior": [
									{
										"en": "Hope this season did not blaze",
										"vi": "Hy vọng mùa này không rực"
									},
									{
										"en": "It was an ember under snow",
										"vi": "Nó là than hồng dưới tuyết"
									},
									{
										"en": "Those who loved her kept that coal",
										"vi": "Ai yêu cô, giữ than ấy"
									},
									{
										"en": "The season of Change closes on a word not finished: still",
										"vi": "Mùa đổi khép lại bằng một lời chưa nói hết: còn"
									}
								]
							}
						},
						{
							"id": "k3-end",
							"image": "/illustrations/k3-10.jpg",
							"file": "k3-page-10",
							"title": {
								"vi": "Chưa hết",
								"en": "Not the End"
							},
							"text": {
								"preschool": {
									"vi": "Korra ngủ. Naga ngủ. Trời lặng. Mùa ba xong. Mùa bốn tới. Ngủ ngon nha.",
									"en": "Korra slept. Naga slept. The sky was quiet. Season three ends. Season four will come. Night night."
								},
								"primary": {
									"vi": "Mùa ba kết thúc trên tuyết. Korra sẽ trở lại. Mùa bốn còn đó. Chúc ngủ ngon.",
									"en": "Season three ends on the snow. Korra will return. Season four is still there. Good night."
								},
								"intermediate": {
									"vi": "Họ tắt đèn. Phong tộc thở trên những hòn đảo. Korra thở ở phương Nam. Mùa đổi lặng — để mùa cân bằng còn việc.",
									"en": "They put out the lamps. The Air Nomads breathed on their islands. Korra breathed in the south. Change grows quiet — so Balance will still have work."
								},
								"senior": {
									"vi": "Một chương không cần tiếng vỗ tay. Nó cần một giấc ngủ được phép dài. Hẹn mùa sau, khi cô đứng, thế giới sẽ cần cô khác xưa — và cô cũng vậy.",
									"en": "A chapter does not need applause. It needs a sleep that is allowed to be long. Until next season, when she stands, the world will need her differently — and so will she."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Korra slept",
										"vi": "Korra ngủ"
									},
									{
										"en": "Naga slept",
										"vi": "Naga ngủ"
									},
									{
										"en": "The sky was quiet",
										"vi": "Trời lặng"
									},
									{
										"en": "Season three ends",
										"vi": "Mùa ba xong"
									},
									{
										"en": "Season four will come",
										"vi": "Mùa bốn tới"
									},
									{
										"en": "Night night",
										"vi": "Ngủ ngon nha"
									},
									{
										"en": "season three",
										"vi": "mùa ba"
									},
									{
										"en": "season four",
										"vi": "mùa bốn"
									}
								],
								"primary": [
									{
										"en": "Season three ends on the snow",
										"vi": "Mùa ba kết thúc trên tuyết"
									},
									{
										"en": "Korra will return",
										"vi": "Korra sẽ trở lại"
									},
									{
										"en": "Season four is still there",
										"vi": "Mùa bốn còn đó"
									},
									{
										"en": "Good night",
										"vi": "Chúc ngủ ngon"
									},
									{
										"en": "season three",
										"vi": "mùa ba"
									},
									{
										"en": "season four",
										"vi": "mùa bốn"
									}
								],
								"intermediate": [
									{
										"en": "They put out the lamps",
										"vi": "Họ tắt đèn"
									},
									{
										"en": "The Air Nomads breathed on their islands",
										"vi": "Phong tộc thở trên những hòn đảo"
									},
									{
										"en": "Korra breathed in the south",
										"vi": "Korra thở ở phương Nam"
									},
									{
										"en": "Change grows quiet — so Balance will still have work",
										"vi": "Mùa đổi lặng — để mùa cân bằng còn việc"
									},
									{
										"en": "Air Nomads",
										"vi": "Phong tộc"
									}
								],
								"senior": [
									{
										"en": "A chapter does not need applause",
										"vi": "Một chương không cần tiếng vỗ tay"
									},
									{
										"en": "It needs a sleep that is allowed to be long",
										"vi": "Nó cần một giấc ngủ được phép dài"
									},
									{
										"en": "Until next season, when she stands, the world will need her differently — and so will she",
										"vi": "Hẹn mùa sau, khi cô đứng, thế giới sẽ cần cô khác xưa — và cô cũng vậy"
									}
								]
							}
						}
					]
				},
				{
					"id": "k4",
					"vi": "Mùa 4 · Cân bằng",
					"en": "Season 4 · Balance",
					"tagline": {
						"vi": "Korra đứng lại",
						"en": "Korra stands again"
					},
					"pages": [
						{
							"id": "k4-cover",
							"image": "/illustrations/k4-00.jpg",
							"file": "k4-page-00",
							"title": {
								"vi": "Mùa cân",
								"en": "Balance Season"
							},
							"text": {
								"preschool": {
									"vi": "Đây là chuyện Korra. Mùa bốn. Korra khỏe lại. Korra đứng.",
									"en": "This is Korra. Season four. Korra gets well. Korra stands."
								},
								"primary": {
									"vi": "Đây là mùa bốn. Korra học đứng nữa. Thế giới đang cần cô.",
									"en": "This is season four. Korra learns to stand again. The world still needs her."
								},
								"intermediate": {
									"vi": "Mùa cân bằng không bắt đầu bằng trận. Nó bắt đầu bằng một bước. Korra, sau giấc dài, đặt chân xuống đất như lần đầu.",
									"en": "The Balance season does not begin with a battle. It begins with a step. Korra, after the long sleep, set her foot on the ground as if for the first time."
								},
								"senior": {
									"vi": "Cân bằng không phải bất động. Cân bằng là đi mà không đổ. Mùa cuối, Korra phải tìm lại mình — không phải Avatar cũ, mà người vừa đủ để giữ thế giới.",
									"en": "Balance is not stillness. Balance is walking without falling. In the last season Korra had to find herself again — not the old Avatar, but someone just enough to hold the world."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Korra",
										"vi": "Đây là chuyện Korra"
									},
									{
										"en": "Season four",
										"vi": "Mùa bốn"
									},
									{
										"en": "Korra gets well",
										"vi": "Korra khỏe lại"
									},
									{
										"en": "Korra stands",
										"vi": "Korra đứng"
									},
									{
										"en": "gets well",
										"vi": "khỏe lại"
									}
								],
								"primary": [
									{
										"en": "This is season four",
										"vi": "Đây là mùa bốn"
									},
									{
										"en": "Korra learns to stand again",
										"vi": "Korra học đứng nữa"
									},
									{
										"en": "The world still needs her",
										"vi": "Thế giới đang cần cô"
									},
									{
										"en": "season four",
										"vi": "mùa bốn"
									}
								],
								"intermediate": [
									{
										"en": "The Balance season does not begin with a battle",
										"vi": "Mùa cân bằng không bắt đầu bằng trận"
									},
									{
										"en": "It begins with a step",
										"vi": "Nó bắt đầu bằng một bước"
									},
									{
										"en": "Korra, after the long sleep, set her foot on the ground as if for the first time",
										"vi": "Korra, sau giấc dài, đặt chân xuống đất như lần đầu"
									}
								],
								"senior": [
									{
										"en": "Balance is not stillness",
										"vi": "Cân bằng không phải bất động"
									},
									{
										"en": "Balance is walking without falling",
										"vi": "Cân bằng là đi mà không đổ"
									},
									{
										"en": "In the last season Korra had to find herself again — not the old Avatar, but someone just enough to hold the world",
										"vi": "Mùa cuối, Korra phải tìm lại mình — không phải Avatar cũ, mà người vừa đủ để giữ thế giới"
									}
								]
							}
						},
						{
							"id": "k4-stand",
							"image": "/illustrations/k4-01.jpg",
							"file": "k4-page-01",
							"title": {
								"vi": "Đứng",
								"en": "Stand"
							},
							"text": {
								"preschool": {
									"vi": "Korra tập đứng. Korra ngã. Korra đứng. Naga đẩy. Korra cười.",
									"en": "Korra practiced standing. Korra fell. Korra stood. Naga nudged her. Korra smiled."
								},
								"primary": {
									"vi": "Mỗi ngày Korra tập đi. Có ngày được. Có ngày không. Naga không bỏ. Cô cũng không bỏ.",
									"en": "Every day Korra practiced walking. Some days it worked. Some days it did not. Naga did not give up. Neither did she."
								},
								"intermediate": {
									"vi": "Phục hồi là một thầy nghiêm. Korra gặp Toph — người dạy đất xưa, người không nương. 'Đứng đi,' Toph nói, như nói với đá.",
									"en": "Recovery is a strict teacher. Korra met Toph — the old earth teacher, who did not soften. 'Stand,' Toph said, as if speaking to stone."
								},
								"senior": {
									"vi": "Cô từng gọi sức từ trời. Giờ phải gọi từ bàn chân. Toph, già và không kiêng nể, trả Korra về đất. Bước đầu tiên không đẹp. Nó đủ.",
									"en": "She used to call power from the sky. Now she had to call it from the soles of her feet. Toph, old and unembarrassed, sent Korra back to earth. The first step was not pretty. It was enough."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "nudged",
										"vi": "đẩy"
									},
									{
										"en": "Korra practiced standing",
										"vi": "Korra tập đứng"
									},
									{
										"en": "Korra fell",
										"vi": "Korra ngã"
									},
									{
										"en": "Korra stood",
										"vi": "Korra đứng"
									},
									{
										"en": "Naga nudged her",
										"vi": "Naga đẩy"
									},
									{
										"en": "Korra smiled",
										"vi": "Korra cười"
									},
									{
										"en": "practiced standing",
										"vi": "tập đứng"
									}
								],
								"primary": [
									{
										"en": "Every day Korra practiced walking",
										"vi": "Mỗi ngày Korra tập đi"
									},
									{
										"en": "Some days it worked",
										"vi": "Có ngày được"
									},
									{
										"en": "Some days it did not",
										"vi": "Có ngày hông"
									},
									{
										"en": "Naga did not give up",
										"vi": "Naga hông bỏ"
									},
									{
										"en": "Neither did she",
										"vi": "Cô cũng hông bỏ"
									}
								],
								"intermediate": [
									{
										"en": "teacher",
										"vi": "thầy"
									},
									{
										"en": "Recovery is a strict teacher",
										"vi": "Phục hồi là một thầy nghiêm"
									},
									{
										"en": "Korra met Toph — the old earth teacher, who did not soften",
										"vi": "Korra gặp Toph — người dạy đất xưa, người không nương"
									},
									{
										"en": "'Stand,' Toph said, as if speaking to stone",
										"vi": "'Đứng đi,' Toph nói, như nói với đá"
									},
									{
										"en": "earth teacher",
										"vi": "thầy đất"
									}
								],
								"senior": [
									{
										"en": "She used to call power from the sky",
										"vi": "Cô từng gọi sức từ trời"
									},
									{
										"en": "Now she had to call it from the soles of her feet",
										"vi": "Giờ phải gọi từ bàn chân"
									},
									{
										"en": "Toph, old and unembarrassed, sent Korra back to earth",
										"vi": "Toph, già và không kiêng nể, trả Korra về đất"
									},
									{
										"en": "The first step was not pretty",
										"vi": "Bước đầu tiên không đẹp"
									},
									{
										"en": "It was enough",
										"vi": "Nó đủ"
									}
								]
							}
						},
						{
							"id": "k4-kuvira",
							"image": "/illustrations/k4-02.jpg",
							"file": "k4-page-02",
							"title": {
								"vi": "Kuvira",
								"en": "Kuvira"
							},
							"text": {
								"preschool": {
									"vi": "Có chị Kuvira. Kuvira làm quân. Kuvira muốn gom đất. Người ta sợ.",
									"en": "This is Kuvira. Kuvira makes an army. Kuvira wants to gather all the earth. People were scared."
								},
								"primary": {
									"vi": "Kuvira thống nhất Thổ quốc bằng quân kim loại. Cô ấy muốn trật tự. Nhiều người không muốn cách ấy.",
									"en": "Kuvira united the Earth Kingdom with a metal army. She wanted order. Many people did not want that kind of order."
								},
								"intermediate": {
									"vi": "Sau hỗn loạn, Kuvira dâng sự chắc. Tàu kim loại, hàng quân thẳng. Trật tự của cô không chừa chỗ cho người không khớp hàng.",
									"en": "After chaos, Kuvira offered certainty. Metal trains, straight ranks. Her order left no room for people who did not fit the line."
								},
								"senior": {
									"vi": "Có người yêu thế giới bằng cách nắm. Kuvira nắm đến trắng tay kẻ khác. Cô không phải bóng tối — cô là trật tự không còn nghe. Đó là thứ Avatar phải cân.",
									"en": "Some people love the world by gripping it. Kuvira gripped until others' hands went empty. She was not darkness — she was order that had stopped listening. That is what an Avatar must balance."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "This is Kuvira",
										"vi": "Có chị Kuvira"
									},
									{
										"en": "Kuvira makes an army",
										"vi": "Kuvira làm quân"
									},
									{
										"en": "Kuvira wants to gather all the earth",
										"vi": "Kuvira muốn gom đất"
									},
									{
										"en": "People were scared",
										"vi": "Người ta sợ"
									},
									{
										"en": "an army",
										"vi": "quân"
									},
									{
										"en": "gather all the earth",
										"vi": "gom đất"
									}
								],
								"primary": [
									{
										"en": "Kuvira united the Earth Kingdom with a metal army",
										"vi": "Kuvira thống nhất Thổ quốc bằng quân kim loại"
									},
									{
										"en": "She wanted order",
										"vi": "Cô ấy muốn trật tự"
									},
									{
										"en": "Many people did not want that kind of order",
										"vi": "Nhiều người hông muốn cách ấy"
									},
									{
										"en": "did not want",
										"vi": "hông muốn"
									},
									{
										"en": "Earth Kingdom",
										"vi": "Thổ quốc"
									}
								],
								"intermediate": [
									{
										"en": "After chaos, Kuvira offered certainty",
										"vi": "Sau hỗn loạn, Kuvira dâng sự chắc"
									},
									{
										"en": "Metal trains, straight ranks",
										"vi": "Tàu kim loại, hàng quân thẳng"
									},
									{
										"en": "Her order left no room for people who did not fit the line",
										"vi": "Trật tự của cô không chừa chỗ cho người không khớp hàng"
									}
								],
								"senior": [
									{
										"en": "empty",
										"vi": "vắng"
									},
									{
										"en": "stopped",
										"vi": "dừng"
									},
									{
										"en": "Some people love the world by gripping it",
										"vi": "Có người yêu thế giới bằng cách nắm"
									},
									{
										"en": "Kuvira gripped until others' hands went empty",
										"vi": "Kuvira nắm đến trắng tay kẻ khác"
									},
									{
										"en": "She was not darkness — she was order that had stopped listening",
										"vi": "Cô không phải bóng tối — cô là trật tự không còn nghe"
									},
									{
										"en": "That is what an Avatar must balance",
										"vi": "Đó là thứ Avatar phải cân"
									}
								]
							}
						},
						{
							"id": "k4-friends",
							"image": "/illustrations/k4-03.jpg",
							"file": "k4-page-03",
							"title": {
								"vi": "Bạn chờ",
								"en": "Friends Wait"
							},
							"text": {
								"preschool": {
									"vi": "Mako chờ. Bolin chờ. Asami chờ. Tenzin chờ. Korra về.",
									"en": "Mako waited. Bolin waited. Asami waited. Tenzin waited. Korra came back."
								},
								"primary": {
									"vi": "Bạn bè ở Thành Cộng Hòa viết, chờ, chuẩn bị. Khi Korra về, họ ôm cô như ôm nhà.",
									"en": "The friends in Republic City wrote, waited, got ready. When Korra returned, they hugged her as if hugging home."
								},
								"intermediate": {
									"vi": "Thời gian không làm họ thành người lạ. Mako vẫn lửa. Bolin vẫn đất. Asami vẫn trí. Họ già hơn một nỗi nhớ.",
									"en": "Time had not made them strangers. Mako was still fire. Bolin still earth. Asami still wit. They were older by one ache."
								},
								"senior": {
									"vi": "Chờ là một loại trung thành không có khán giả. Họ đã chờ. Korra, bước vào cửa, không phải anh hùng trở về — là bạn trở về. Điều đó đủ để bắt đầu mùa cuối.",
									"en": "Waiting is a loyalty with no audience. They had waited. Korra, stepping through the door, was not a hero returning — a friend returning. That was enough to begin the last season."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "waited",
										"vi": "chờ"
									},
									{
										"en": "Mako waited",
										"vi": "Mako chờ"
									},
									{
										"en": "Bolin waited",
										"vi": "Bolin chờ"
									},
									{
										"en": "Asami waited",
										"vi": "Asami chờ"
									},
									{
										"en": "Tenzin waited",
										"vi": "Tenzin chờ"
									},
									{
										"en": "Korra came back",
										"vi": "Korra về"
									},
									{
										"en": "came back",
										"vi": "về"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "hugged",
										"vi": "ôm"
									},
									{
										"en": "waited",
										"vi": "chờ"
									},
									{
										"en": "The friends in Republic City wrote, waited, got ready",
										"vi": "Bạn bè ở Thành Cộng Hòa viết, chờ, chuẩn bị"
									},
									{
										"en": "When Korra returned, they hugged her as if hugging home",
										"vi": "Khi Korra về, họ ôm cô như ôm nhà"
									},
									{
										"en": "Republic City",
										"vi": "Cộng hòa Thành"
									}
								],
								"intermediate": [
									{
										"en": "Time had not made them strangers",
										"vi": "Thời gian không làm họ thành người lạ"
									},
									{
										"en": "Mako was still fire",
										"vi": "Mako vẫn lửa"
									},
									{
										"en": "Bolin still earth",
										"vi": "Bolin vẫn đất"
									},
									{
										"en": "Asami still wit",
										"vi": "Asami vẫn trí"
									},
									{
										"en": "They were older by one ache",
										"vi": "Họ già hơn một nỗi nhớ"
									}
								],
								"senior": [
									{
										"en": "waited",
										"vi": "chờ"
									},
									{
										"en": "Waiting is a loyalty with no audience",
										"vi": "Chờ là một loại trung thành không có khán giả"
									},
									{
										"en": "They had waited",
										"vi": "Họ đã chờ"
									},
									{
										"en": "Korra, stepping through the door, was not a hero returning — a friend returning",
										"vi": "Korra, bước vào cửa, không phải anh hùng trở về — là bạn trở về"
									},
									{
										"en": "That was enough to begin the last season",
										"vi": "Điều đó đủ để bắt đầu mùa cuối"
									}
								]
							}
						},
						{
							"id": "k4-return",
							"image": "/illustrations/k4-04.jpg",
							"file": "k4-page-04",
							"title": {
								"vi": "Về thành",
								"en": "Back to the City"
							},
							"text": {
								"preschool": {
									"vi": "Korra về thành. Đèn sáng. Naga chạy. Korra nhìn bạn. Korra sẵn sàng.",
									"en": "Korra came back to the city. Lights were bright. Naga ran. Korra looked at her friends. Korra was ready."
								},
								"primary": {
									"vi": "Thành Cộng Hòa đón Korra. Cô chưa khỏe như xưa, nhưng cô có mặt. Việc lớn đang tới.",
									"en": "Republic City welcomed Korra. She was not as strong as before, but she was present. Big work was coming."
								},
								"intermediate": {
									"vi": "Cô đi trên phố như người khách của chính quá khứ. Dây leo linh hồn vẫn đó. Kuvira đang tới. Korra thở, và ở lại.",
									"en": "She walked the streets like a guest of her own past. The spirit vines were still there. Kuvira was coming. Korra breathed, and stayed."
								},
								"senior": {
									"vi": "Trở về không phải lặp lại. Cô mang theo chỗ trống mà gió đã dạy, chỗ đau mà đất đã dạy. Thành phố cần Avatar ấy — không phải cô gái ba năm trước.",
									"en": "Return is not repetition. She brought the emptiness air had taught, the ache earth had taught. The city needed that Avatar — not the girl of three years ago."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Korra came back to the city",
										"vi": "Korra về thành"
									},
									{
										"en": "Lights were bright",
										"vi": "Đèn sáng"
									},
									{
										"en": "Naga ran",
										"vi": "Naga chạy"
									},
									{
										"en": "Korra looked at her friends",
										"vi": "Korra nhìn bạn"
									},
									{
										"en": "Korra was ready",
										"vi": "Korra sẵn sàng"
									},
									{
										"en": "was ready",
										"vi": "sẵn sàng"
									},
									{
										"en": "came back",
										"vi": "về"
									}
								],
								"primary": [
									{
										"en": "Republic City welcomed Korra",
										"vi": "Thành Cộng Hòa đón Korra"
									},
									{
										"en": "She was not as strong as before, but she was present",
										"vi": "Cô chưa khỏe như xưa, nhưng cô có mặt"
									},
									{
										"en": "Big work was coming",
										"vi": "Việc lớn đang tới"
									},
									{
										"en": "Republic City",
										"vi": "Cộng hòa Thành"
									}
								],
								"intermediate": [
									{
										"en": "She walked the streets like a guest of her own past",
										"vi": "Cô đi trên phố như người khách của chính quá khứ"
									},
									{
										"en": "The spirit vines were still there",
										"vi": "Dây leo linh hồn vẫn đó"
									},
									{
										"en": "Kuvira was coming",
										"vi": "Kuvira đang tới"
									},
									{
										"en": "Korra breathed, and stayed",
										"vi": "Korra thở, và ở lại"
									}
								],
								"senior": [
									{
										"en": "Return is not repetition",
										"vi": "Trở về không phải lặp lại"
									},
									{
										"en": "She brought the emptiness air had taught, the ache earth had taught",
										"vi": "Cô mang theo chỗ trống mà gió đã dạy, chỗ đau mà đất đã dạy"
									},
									{
										"en": "The city needed that Avatar — not the girl of three years ago",
										"vi": "Thành phố cần Avatar ấy — không phải cô gái ba năm trước"
									}
								]
							}
						},
						{
							"id": "k4-giant",
							"image": "/illustrations/k4-05.jpg",
							"file": "k4-page-05",
							"title": {
								"vi": "Người sắt",
								"en": "Iron Person"
							},
							"text": {
								"preschool": {
									"vi": "Có người sắt to. To lắm. Thành phố lo. Korra đứng trước.",
									"en": "There is a giant iron person. So big. The city worried. Korra stood in front."
								},
								"primary": {
									"vi": "Kuvira mang một người máy kim loại khổng lồ. Nó bước vào thành. Korra và bạn bè phải chặn.",
									"en": "Kuvira brought a giant metal machine-person. It stepped into the city. Korra and her friends had to stop it."
								},
								"intermediate": {
									"vi": "Cỗ máy — đất, kim, dây leo — cao hơn tháp. Trật tự của Kuvira có hình một người không nghe. Đội Avatar nhỏ xíu dưới chân.",
									"en": "The machine — earth, metal, spirit vine — taller than towers. Kuvira's order had the shape of a person who does not listen. Team Avatar looked tiny at its feet."
								},
								"senior": {
									"vi": "Đôi khi cái ta sợ không phải quái vật. Là một ý tưởng lớn đến mức không còn mặt người. Korra nhìn cỗ máy và thấy một nỗi cô đơn bọc thép.",
									"en": "Sometimes what we fear is not a monster. It is an idea grown so large it no longer has a human face. Korra looked at the machine and saw a loneliness wrapped in steel."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "There is a giant iron person",
										"vi": "Có người sắt to"
									},
									{
										"en": "The city worried",
										"vi": "Thành phố lo"
									},
									{
										"en": "Korra stood in front",
										"vi": "Korra đứng trước"
									},
									{
										"en": "so big",
										"vi": "to lắm"
									},
									{
										"en": "giant iron person",
										"vi": "người sắt to"
									},
									{
										"en": "stood in front",
										"vi": "đứng trước"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Kuvira brought a giant metal machine-person",
										"vi": "Kuvira mang một người máy kim loại khổng lồ"
									},
									{
										"en": "It stepped into the city",
										"vi": "Nó bước vào thành"
									},
									{
										"en": "Korra and her friends had to stop it",
										"vi": "Korra và bạn bè phải chặn"
									}
								],
								"intermediate": [
									{
										"en": "The machine — earth, metal, spirit vine — taller than towers",
										"vi": "Cỗ máy — đất, kim, dây leo — cao hơn tháp"
									},
									{
										"en": "Kuvira's order had the shape of a person who does not listen",
										"vi": "Trật tự của Kuvira có hình một người không nghe"
									},
									{
										"en": "Team Avatar looked tiny at its feet",
										"vi": "Đội Avatar nhỏ xíu dưới chân"
									}
								],
								"senior": [
									{
										"en": "Sometimes what we fear is not a monster",
										"vi": "Đôi khi cái ta sợ không phải quái vật"
									},
									{
										"en": "It is an idea grown so large it no longer has a human face",
										"vi": "Là một ý tưởng lớn đến mức không còn mặt người"
									},
									{
										"en": "Korra looked at the machine and saw a loneliness wrapped in steel",
										"vi": "Korra nhìn cỗ máy và thấy một nỗi cô đơn bọc thép"
									}
								]
							}
						},
						{
							"id": "k4-spirit",
							"image": "/illustrations/k4-06.jpg",
							"file": "k4-page-06",
							"title": {
								"vi": "Dây leo",
								"en": "Vines"
							},
							"text": {
								"preschool": {
									"vi": "Dây leo sáng. Korra nắm. Korra khỏe. Bạn bè giúp. Cùng làm.",
									"en": "The vines glowed. Korra held them. Korra grew strong. Friends helped. They did it together."
								},
								"primary": {
									"vi": "Korra gọi dây leo linh hồn. Ánh sáng giúp cô. Mako, Bolin, Asami, Tenzin làm phần của mình.",
									"en": "Korra called the spirit vines. The light helped her. Mako, Bolin, Asami, and Tenzin did their parts."
								},
								"intermediate": {
									"vi": "Không một mình. Cô nối với cõi hồn, với bạn, với thành. Sức trở lại không như xưa — nó chia.",
									"en": "Not alone. She connected to the spirit world, to friends, to the city. Strength returned unlike before — it was shared."
								},
								"senior": {
									"vi": "Avatar từng là một người chứa bốn. Mùa này, bốn người chứa một. Dây leo không phải vũ khí. Chúng là sợi, và Korra chịu được dệt.",
									"en": "The Avatar had been one person holding four. This season, four people held one. The vines were not a weapon. They were thread, and Korra let herself be woven."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "The vines glowed",
										"vi": "Dây leo sáng"
									},
									{
										"en": "Korra held them",
										"vi": "Korra nắm"
									},
									{
										"en": "Korra grew strong",
										"vi": "Korra khỏe"
									},
									{
										"en": "Friends helped",
										"vi": "Bạn bè giúp"
									},
									{
										"en": "They did it together",
										"vi": "Cùng làm"
									}
								],
								"primary": [
									{
										"en": "Korra called the spirit vines",
										"vi": "Korra gọi dây leo linh hồn"
									},
									{
										"en": "The light helped her",
										"vi": "Ánh sáng giúp cô"
									},
									{
										"en": "Mako, Bolin, Asami, and Tenzin did their parts",
										"vi": "Mako, Bolin, Asami, Tenzin làm phần của mình"
									}
								],
								"intermediate": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "She connected to the spirit world, to friends, to the city",
										"vi": "Cô nối với cõi hồn, với bạn, với thành"
									},
									{
										"en": "Strength returned unlike before — it was shared",
										"vi": "Sức trở lại không như xưa — nó chia"
									},
									{
										"en": "spirit world",
										"vi": "cõi hồn"
									}
								],
								"senior": [
									{
										"en": "The Avatar had been one person holding four",
										"vi": "Avatar từng là một người chứa bốn"
									},
									{
										"en": "This season, four people held one",
										"vi": "Mùa này, bốn người chứa một"
									},
									{
										"en": "The vines were not a weapon",
										"vi": "Dây leo không phải vũ khí"
									},
									{
										"en": "They were thread, and Korra let herself be woven",
										"vi": "Chúng là sợi, và Korra chịu được dệt"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								]
							}
						},
						{
							"id": "k4-talk",
							"image": "/illustrations/k4-07.jpg",
							"file": "k4-page-07",
							"title": {
								"vi": "Nói",
								"en": "Talk"
							},
							"text": {
								"preschool": {
									"vi": "Korra nói với Kuvira. Korra hông chỉ đánh. Kuvira nghe. Kuvira dừng.",
									"en": "Korra talked to Kuvira. Korra did not only hit. Kuvira listened. Kuvira stopped."
								},
								"primary": {
									"vi": "Korra nhìn Kuvira và nói. Cô hiểu nỗi sợ muốn nắm. Kuvira buông.",
									"en": "Korra looked at Kuvira and spoke. She understood the fear that wants to grip. Kuvira let go."
								},
								"intermediate": {
									"vi": "Trong bụng cỗ máy, hai người phụ nữ. Một muốn giữ thế giới. Một đã học buông. Lời nói, lần này, nặng hơn kim loại.",
									"en": "Inside the machine, two women. One wanted to hold the world. One had learned to let go. Speech, this time, weighed more than metal."
								},
								"senior": {
									"vi": "Korra nhận ra Kuvira như nhận ra mình cũ: sức, sợ, và lòng tin rằng nếu không nắm thì đổ. Cô không thắng bằng mạnh hơn. Cô thắng bằng đã từng đổ.",
									"en": "Korra recognized Kuvira the way she recognized her old self: strength, fear, and the belief that if you do not grip you fall. She did not win by being stronger. She won by having already fallen."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "listened",
										"vi": "nghe"
									},
									{
										"en": "stopped",
										"vi": "dừng"
									},
									{
										"en": "Korra talked to Kuvira",
										"vi": "Korra nói với Kuvira"
									},
									{
										"en": "Korra did not only hit",
										"vi": "Korra hông chỉ đánh"
									},
									{
										"en": "Kuvira listened",
										"vi": "Kuvira nghe"
									},
									{
										"en": "Kuvira stopped",
										"vi": "Kuvira dừng"
									},
									{
										"en": "did not only hit",
										"vi": "hông chỉ đánh"
									},
									{
										"en": "talked to",
										"vi": "nói với"
									}
								],
								"primary": [
									{
										"en": "Korra looked at Kuvira and spoke",
										"vi": "Korra nhìn Kuvira và nói"
									},
									{
										"en": "She understood the fear that wants to grip",
										"vi": "Cô hiểu nỗi sợ muốn nắm"
									},
									{
										"en": "Kuvira let go",
										"vi": "Kuvira buông"
									}
								],
								"intermediate": [
									{
										"en": "Inside the machine, two women",
										"vi": "Trong bụng cỗ máy, hai người phụ nữ"
									},
									{
										"en": "One wanted to hold the world",
										"vi": "Một muốn giữ thế giới"
									},
									{
										"en": "One had learned to let go",
										"vi": "Một đã học buông"
									},
									{
										"en": "Speech, this time, weighed more than metal",
										"vi": "Lời nói, lần này, nặng hơn kim loại"
									}
								],
								"senior": [
									{
										"en": "Korra recognized Kuvira the way she recognized her old self: strength, fear, and the belief that if you do not grip you fall",
										"vi": "Korra nhận ra Kuvira như nhận ra mình cũ: sức, sợ, và lòng tin rằng nếu không nắm thì đổ"
									},
									{
										"en": "She did not win by being stronger",
										"vi": "Cô không thắng bằng mạnh hơn"
									},
									{
										"en": "She won by having already fallen",
										"vi": "Cô thắng bằng đã từng đổ"
									}
								]
							}
						},
						{
							"id": "k4-peace",
							"image": "/illustrations/k4-08.jpg",
							"file": "k4-page-08",
							"title": {
								"vi": "Yên",
								"en": "Peace"
							},
							"text": {
								"preschool": {
									"vi": "Người sắt đổ. Thành phố xong. Mọi người ôm. Korra cười.",
									"en": "The iron person fell. The city was safe. Everyone hugged. Korra smiled."
								},
								"primary": {
									"vi": "Cỗ máy dừng. Kuvira không gom nữa. Thành phố thở. Đội bạn đứng chung.",
									"en": "The machine stopped. Kuvira did not gather anymore. The city breathed. The team stood together."
								},
								"intermediate": {
									"vi": "Trật tự không đến từ hàng quân. Nó đến từ người ta được ở. Korra nhìn phố, dây leo, bạn bè — và gật.",
									"en": "Order did not come from ranks. It came from people being allowed to stay. Korra looked at the street, the vines, the friends — and nodded."
								},
								"senior": {
									"vi": "Cân bằng, cuối cùng, không phải một tư thế. Nó là một thành phố còn tên, một kẻ thù còn là người, một Avatar còn là bạn. Cô đã đủ.",
									"en": "Balance, at last, is not a pose. It is a city that still has names, an enemy who is still a person, an Avatar who is still a friend. She was enough."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "hugged",
										"vi": "ôm"
									},
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "fell",
										"vi": "ngã"
									},
									{
										"en": "The iron person fell",
										"vi": "Người sắt đổ"
									},
									{
										"en": "The city was safe",
										"vi": "Thành phố xong"
									},
									{
										"en": "Everyone hugged",
										"vi": "Mọi người ôm"
									},
									{
										"en": "Korra smiled",
										"vi": "Korra cười"
									},
									{
										"en": "city was safe",
										"vi": "thành phố xong"
									}
								],
								"primary": [
									{
										"en": "stood",
										"vi": "đứng"
									},
									{
										"en": "stopped",
										"vi": "dừng"
									},
									{
										"en": "The machine stopped",
										"vi": "Cỗ máy dừng"
									},
									{
										"en": "Kuvira did not gather anymore",
										"vi": "Kuvira hông gom nữa"
									},
									{
										"en": "The city breathed",
										"vi": "Thành phố thở"
									},
									{
										"en": "The team stood together",
										"vi": "Đội bạn đứng chung"
									},
									{
										"en": "stood together",
										"vi": "đứng chung"
									}
								],
								"intermediate": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Order did not come from ranks",
										"vi": "Trật tự không đến từ hàng quân"
									},
									{
										"en": "It came from people being allowed to stay",
										"vi": "Nó đến từ người ta được ở"
									},
									{
										"en": "Korra looked at the street, the vines, the friends — and nodded",
										"vi": "Korra nhìn phố, dây leo, bạn bè — và gật"
									}
								],
								"senior": [
									{
										"en": "Balance, at last, is not a pose",
										"vi": "Cân bằng, cuối cùng, không phải một tư thế"
									},
									{
										"en": "It is a city that still has names, an enemy who is still a person, an Avatar who is still a friend",
										"vi": "Nó là một thành phố còn tên, một kẻ thù còn là người, một Avatar còn là bạn"
									},
									{
										"en": "She was enough",
										"vi": "Cô đã đủ"
									}
								]
							}
						},
						{
							"id": "k4-world",
							"image": "/illustrations/k4-09.jpg",
							"file": "k4-page-09",
							"title": {
								"vi": "Bốn nơi",
								"en": "Four Places"
							},
							"text": {
								"preschool": {
									"vi": "Nước yên. Đất yên. Lửa yên. Gió yên. Korra nhìn. Đẹp lắm.",
									"en": "Water was calm. Earth was calm. Fire was calm. Wind was calm. Korra looked. So pretty."
								},
								"primary": {
									"vi": "Bốn quốc gia yên. Người và hồn sống chung. Korra không cần nắm. Cô chỉ ở.",
									"en": "The four nations were calm. People and spirits lived together. Korra did not need to grip. She only stayed."
								},
								"intermediate": {
									"vi": "Không có lễ lớn. Có nắng trên kênh, trên núi, trên mái đền, trên tàu. Thế giới, sau bao mùa, chịu được một ngày thường.",
									"en": "No great ceremony. There was sun on canals, on mountains, on temple roofs, on trains. The world, after so many seasons, could bear an ordinary day."
								},
								"senior": {
									"vi": "Avatar không phải mái nhà của thế giới. Cô là cái bản lề. Hôm nay bản lề không kêu. Đó là thành công ít ai hát, và đáng hát nhất.",
									"en": "The Avatar is not the world's roof. She is the hinge. Today the hinge did not creak. That is a success few people sing, and the one most worth singing."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Water was calm",
										"vi": "Nước yên"
									},
									{
										"en": "Earth was calm",
										"vi": "Đất yên"
									},
									{
										"en": "Fire was calm",
										"vi": "Lửa yên"
									},
									{
										"en": "Wind was calm",
										"vi": "Gió yên"
									},
									{
										"en": "Korra looked",
										"vi": "Korra nhìn"
									},
									{
										"en": "So pretty",
										"vi": "Đẹp lắm"
									},
									{
										"en": "was calm",
										"vi": "yên"
									}
								],
								"primary": [
									{
										"en": "spirits",
										"vi": "hồn"
									},
									{
										"en": "The four nations were calm",
										"vi": "Bốn quốc gia yên"
									},
									{
										"en": "People and spirits lived together",
										"vi": "Người và hồn sống chung"
									},
									{
										"en": "Korra did not need to grip",
										"vi": "Korra hông cần nắm"
									},
									{
										"en": "She only stayed",
										"vi": "Cô chỉ ở"
									}
								],
								"intermediate": [
									{
										"en": "No great ceremony",
										"vi": "Không có lễ lớn"
									},
									{
										"en": "There was sun on canals, on mountains, on temple roofs, on trains",
										"vi": "Có nắng trên kênh, trên núi, trên mái đền, trên tàu"
									},
									{
										"en": "The world, after so many seasons, could bear an ordinary day",
										"vi": "Thế giới, sau bao mùa, chịu được một ngày thường"
									}
								],
								"senior": [
									{
										"en": "The Avatar is not the world's roof",
										"vi": "Avatar không phải mái nhà của thế giới"
									},
									{
										"en": "She is the hinge",
										"vi": "Cô là cái bản lề"
									},
									{
										"en": "Today the hinge did not creak",
										"vi": "Hôm nay bản lề không kêu"
									},
									{
										"en": "That is a success few people sing, and the one most worth singing",
										"vi": "Đó là thành công ít ai hát, và đáng hát nhất"
									},
									{
										"en": "the Avatar",
										"vi": "Avatar"
									}
								]
							}
						},
						{
							"id": "k4-end",
							"image": "/illustrations/k4-10.jpg",
							"file": "k4-page-10",
							"title": {
								"vi": "Đi tiếp",
								"en": "Go On"
							},
							"text": {
								"preschool": {
									"vi": "Korra nắm tay bạn. Họ đi vào ánh sáng. Thế giới yên. Hết chuyện rồi. Ngủ ngon nha.",
									"en": "Korra held a friend's hand. They walked into the light. The world was calm. The end. Night night."
								},
								"primary": {
									"vi": "Korra và Asami đi về phía cổng hồn, tay trong tay. Bạn bè vẫy. Câu chuyện kết. Ngủ ngon nhé.",
									"en": "Korra and Asami walked toward the spirit gate, hand in hand. Friends waved. The story ends. Good night."
								},
								"intermediate": {
									"vi": "Họ không ở lại để được vỗ. Họ đi tiếp — vào chỗ thế giới còn mở. Huyền thoại Korra khép lại như một cánh cổng để ngỏ.",
									"en": "They did not stay to be clapped. They went on — into the place the world still left open. Korra's legend closes like a gate left ajar."
								},
								"senior": {
									"vi": "Hết không có nghĩa là dừng. Hết là được phép bước đi mà không mang cả trái đất trên vai. Korra cười, nắm một bàn tay, và thế giới — lần này — không gọi cô lại. Ngủ ngon, và mơ những giấc êm.",
									"en": "The end does not mean stopping. The end is being allowed to walk without carrying the earth on your shoulders. Korra smiled, took a hand, and the world — this time — did not call her back. Sleep well, and dream gently."
								}
							},
							"lexicon": {
								"preschool": [
									{
										"en": "Korra held a friend's hand",
										"vi": "Korra nắm tay bạn"
									},
									{
										"en": "They walked into the light",
										"vi": "Họ đi vào ánh sáng"
									},
									{
										"en": "The world was calm",
										"vi": "Thế giới yên"
									},
									{
										"en": "Night night",
										"vi": "Ngủ ngon nha"
									},
									{
										"en": "the end",
										"vi": "hết chuyện rồi"
									},
									{
										"en": "was calm",
										"vi": "yên"
									},
									{
										"en": "held a friend's hand",
										"vi": "nắm tay bạn"
									},
									{
										"en": "walked into the light",
										"vi": "đi vào ánh sáng"
									}
								],
								"primary": [
									{
										"en": "friends",
										"vi": "bạn bè"
									},
									{
										"en": "Korra and Asami walked toward the spirit gate, hand in hand",
										"vi": "Korra và Asami đi về phía cổng hồn, tay trong tay"
									},
									{
										"en": "Friends waved",
										"vi": "Bạn bè vẫy"
									},
									{
										"en": "The story ends",
										"vi": "Câu chuyện kết"
									},
									{
										"en": "Good night",
										"vi": "Ngủ ngon nha"
									}
								],
								"intermediate": [
									{
										"en": "They did not stay to be clapped",
										"vi": "Họ không ở lại để được vỗ"
									},
									{
										"en": "They went on — into the place the world still left open",
										"vi": "Họ đi tiếp — vào chỗ thế giới còn mở"
									},
									{
										"en": "Korra's legend closes like a gate left ajar",
										"vi": "Huyền thoại Korra khép lại như một cánh cổng để ngỏ"
									}
								],
								"senior": [
									{
										"en": "smiled",
										"vi": "cười"
									},
									{
										"en": "The end does not mean stopping",
										"vi": "Hết không có nghĩa là dừng"
									},
									{
										"en": "The end is being allowed to walk without carrying the earth on your shoulders",
										"vi": "Hết là được phép bước đi mà không mang cả trái đất trên vai"
									},
									{
										"en": "Korra smiled, took a hand, and the world — this time — did not call her back",
										"vi": "Korra cười, nắm một bàn tay, và thế giới — lần này — không gọi cô lại"
									},
									{
										"en": "Sleep well, and dream gently",
										"vi": "Ngủ ngon, và mơ những giấc êm"
									},
									{
										"en": "the end",
										"vi": "hết chuyện rồi"
									}
								]
							}
						}
					]
				}
			]
		},
		{
			"id": "zelda",
			"archived": true,
			"vi": "Huyền thoại Zelda",
			"en": "The Legend of Zelda",
			"coverTitle": {
				"vi": "Truyện Zelda",
				"en": "Zelda's Legend"
			},
			"seasons": [{
				"id": "botw",
				"vi": "Hơi thở hoang dã",
				"en": "Breath of the Wild",
				"tagline": {
					"vi": "Link thức dậy",
					"en": "Link wakes up"
				},
				"pages": [
					{
						"id": "z1-cover",
						"image": "/illustrations/z1-00.jpg",
						"file": "z1-page-00",
						"title": {
							"vi": "Hơi thở hoang dã",
							"en": "Breath of the Wild"
						},
						"text": {
							"preschool": {
								"vi": "Đây là chuyện Link. Link ngủ lâu lắm. Link thức dậy. Link giúp đất.",
								"en": "This is Link. Link slept a long time. Link wakes up. Link helps the land."
							},
							"primary": {
								"vi": "Đây là chuyện Link ở Hyrule. Link ngủ một trăm năm. Cậu thức dậy. Cậu phải giúp đất.",
								"en": "This is Link's story in Hyrule. Link slept a hundred years. He wakes up. He must help the land."
							},
							"intermediate": {
								"vi": "Link tỉnh trên cao nguyên sau một giấc ngủ trăm năm. Hyrule đang chờ. Cậu phải tìm Zelda và cứu đất.",
								"en": "Link wakes on a high plateau after a hundred-year sleep. Hyrule is waiting. He must find Zelda and save the land."
							},
							"senior": {
								"vi": "Trên gió sớm của Hyrule, một anh hùng mở mắt — người đã ngủ khi thế giới gãy. Link bước ra, và đất nhớ cậu.",
								"en": "On the early wind of Hyrule, a hero opens his eyes — one who slept while the world broke. Link steps out, and the land remembers him."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "This is Link",
									"vi": "Đây là chuyện Link"
								},
								{
									"en": "Link slept a long time",
									"vi": "Link ngủ lâu lắm"
								},
								{
									"en": "Link wakes up",
									"vi": "Link thức dậy"
								},
								{
									"en": "Link helps the land",
									"vi": "Link giúp đất"
								},
								{
									"en": "wakes up",
									"vi": "thức dậy"
								},
								{
									"en": "slept a long time",
									"vi": "ngủ lâu lắm"
								},
								{
									"en": "helps the land",
									"vi": "giúp đất"
								}
							],
							"primary": [
								{
									"en": "This is Link's story in Hyrule",
									"vi": "Đây là chuyện Link ở Hyrule"
								},
								{
									"en": "Link slept a hundred years",
									"vi": "Link ngủ một trăm năm"
								},
								{
									"en": "He wakes up",
									"vi": "Cậu thức dậy"
								},
								{
									"en": "He must help the land",
									"vi": "Cậu phải giúp đất"
								},
								{
									"en": "wakes up",
									"vi": "thức dậy"
								},
								{
									"en": "a hundred years",
									"vi": "một trăm năm"
								}
							],
							"intermediate": [
								{
									"en": "Link wakes on a high plateau after a hundred-year sleep",
									"vi": "Link tỉnh trên cao nguyên sau một giấc ngủ trăm năm"
								},
								{
									"en": "Hyrule is waiting",
									"vi": "Hyrule đang chờ"
								},
								{
									"en": "He must find Zelda and save the land",
									"vi": "Cậu phải tìm Zelda và cứu đất"
								},
								{
									"en": "a hundred-year sleep",
									"vi": "trăm năm ngủ"
								}
							],
							"senior": [{
								"en": "On the early wind of Hyrule, a hero opens his eyes — one who slept while the world broke",
								"vi": "Trên gió sớm của Hyrule, một anh hùng mở mắt — người đã ngủ khi thế giới gãy"
							}, {
								"en": "Link steps out, and the land remembers him",
								"vi": "Link bước ra, và đất nhớ cậu"
							}]
						}
					},
					{
						"id": "z1-wake",
						"image": "/illustrations/z1-01.jpg",
						"file": "z1-page-01",
						"title": {
							"vi": "Thức dậy",
							"en": "Wake Up"
						},
						"text": {
							"preschool": {
								"vi": "Link mở mắt. Phòng sáng. Link ngồi dậy. Link buồn ngủ lắm.",
								"en": "Link opened his eyes. The room was glowing. Link sat up. Link was so sleepy."
							},
							"primary": {
								"vi": "Link thức trong một đền sáng. Cậu ngồi dậy. Cơ thể còn yếu. Bên ngoài có trời.",
								"en": "Link woke in a glowing shrine. He sat up. His body was still weak. Outside there was sky."
							},
							"intermediate": {
								"vi": "Trong Đền Hồi Sinh, ánh cam của người Sheikah đánh thức Link. Cậu bước ra ánh nắng lần đầu sau trăm năm.",
								"en": "In the Shrine of Resurrection, orange Sheikah light woke Link. He stepped into sunlight for the first time in a hundred years."
							},
							"senior": {
								"vi": "Đá cổ thì thầm. Công nghệ cũ của Sheikah nâng một cơ thể đã ngủ quá lâu. Link ra khỏi lòng núi như một lời hứa được mở lại.",
								"en": "Old stone whispered. Ancient Sheikah craft lifted a body that had slept too long. Link left the mountain's heart like a promise opened again."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Link opened his eyes",
									"vi": "Link mở mắt"
								},
								{
									"en": "The room was glowing",
									"vi": "Phòng sáng"
								},
								{
									"en": "Link sat up",
									"vi": "Link ngồi dậy"
								},
								{
									"en": "Link was so sleepy",
									"vi": "Link buồn ngủ lắm"
								},
								{
									"en": "opened his eyes",
									"vi": "mở mắt"
								}
							],
							"primary": [
								{
									"en": "Link woke in a glowing shrine",
									"vi": "Link thức trong một đền sáng"
								},
								{
									"en": "He sat up",
									"vi": "Cậu ngồi dậy"
								},
								{
									"en": "His body was still weak",
									"vi": "Cơ thể còn yếu"
								},
								{
									"en": "Outside there was sky",
									"vi": "Bên ngoài có trời"
								},
								{
									"en": "glowing shrine",
									"vi": "đền sáng"
								}
							],
							"intermediate": [
								{
									"en": "Sheikah",
									"vi": "tộc Sheikah"
								},
								{
									"en": "In the Shrine of Resurrection, orange Sheikah light woke Link",
									"vi": "Trong Đền Hồi Sinh, ánh cam của người Sheikah đánh thức Link"
								},
								{
									"en": "He stepped into sunlight for the first time in a hundred years",
									"vi": "Cậu bước ra ánh nắng lần đầu sau trăm năm"
								},
								{
									"en": "a hundred years",
									"vi": "một trăm năm"
								}
							],
							"senior": [
								{
									"en": "Sheikah",
									"vi": "tộc Sheikah"
								},
								{
									"en": "Old stone whispered",
									"vi": "Đá cổ thì thầm"
								},
								{
									"en": "Ancient Sheikah craft lifted a body that had slept too long",
									"vi": "Công nghệ cũ của Sheikah nâng một cơ thể đã ngủ quá lâu"
								},
								{
									"en": "Link left the mountain's heart like a promise opened again",
									"vi": "Link ra khỏi lòng núi như một lời hứa được mở lại"
								}
							]
						}
					},
					{
						"id": "z1-oldman",
						"image": "/illustrations/z1-02.jpg",
						"file": "z1-page-02",
						"title": {
							"vi": "Ông già",
							"en": "The Old Man"
						},
						"text": {
							"preschool": {
								"vi": "Có ông già. Ông già hiền. Ông nấu ăn. Ông dạy Link. Link nghe.",
								"en": "There is an old man. The old man is kind. He cooks. He teaches Link. Link listens."
							},
							"primary": {
								"vi": "Trên cao nguyên có ông già. Ông cho Link đồ ăn. Ông chỉ đường. Link tập leo và tập bay.",
								"en": "On the plateau there is an old man. He gives Link food. He shows the way. Link practices climbing and flying."
							},
							"intermediate": {
								"vi": "Ông già trên Cao nguyên Lớn dạy Link sống: nấu, leo, bay bằng cánh vải. Ông chính là vua xưa, Rhoam.",
								"en": "The old man on the Great Plateau taught Link to live: cook, climb, fly with a cloth wing. He was the old king, Rhoam."
							},
							"senior": {
								"vi": "Một ông già bên nồi canh — vua đã khuất, còn lại để đưa người ngủ trăm năm về với gió. Rhoam trao cánh, rồi hóa sương.",
								"en": "An old man by a cooking pot — a lost king, staying long enough to return a hundred-year sleeper to the wind. Rhoam gave the wing, then became mist."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "teaches",
									"vi": "dạy"
								},
								{
									"en": "There is an old man",
									"vi": "Có ông già"
								},
								{
									"en": "The old man is kind",
									"vi": "Ông già hiền"
								},
								{
									"en": "He cooks",
									"vi": "Ông nấu ăn"
								},
								{
									"en": "He teaches Link",
									"vi": "Ông dạy Link"
								},
								{
									"en": "Link listens",
									"vi": "Link nghe"
								},
								{
									"en": "old man",
									"vi": "ông già"
								}
							],
							"primary": [
								{
									"en": "On the plateau there is an old man",
									"vi": "Trên cao nguyên có ông già"
								},
								{
									"en": "He gives Link food",
									"vi": "Ông cho Link đồ ăn"
								},
								{
									"en": "He shows the way",
									"vi": "Ông chỉ đường"
								},
								{
									"en": "Link practices climbing and flying",
									"vi": "Link tập leo và tập bay"
								},
								{
									"en": "old man",
									"vi": "ông già"
								}
							],
							"intermediate": [
								{
									"en": "The old man on the Great Plateau taught Link to live: cook, climb, fly with a cloth wing",
									"vi": "Ông già trên Cao nguyên Lớn dạy Link sống: nấu, leo, bay bằng cánh vải"
								},
								{
									"en": "He was the old king, Rhoam",
									"vi": "Ông chính là vua xưa, Rhoam"
								},
								{
									"en": "old man",
									"vi": "ông già"
								},
								{
									"en": "cloth wing",
									"vi": "cánh vải"
								},
								{
									"en": "Great Plateau",
									"vi": "Cao nguyên lớn"
								}
							],
							"senior": [
								{
									"en": "An old man by a cooking pot — a lost king, staying long enough to return a hundred-year sleeper to the wind",
									"vi": "Một ông già bên nồi canh — vua đã khuất, còn lại để đưa người ngủ trăm năm về với gió"
								},
								{
									"en": "Rhoam gave the wing, then became mist",
									"vi": "Rhoam trao cánh, rồi hóa sương"
								},
								{
									"en": "old man",
									"vi": "ông già"
								}
							]
						}
					},
					{
						"id": "z1-fly",
						"image": "/illustrations/z1-03.jpg",
						"file": "z1-page-03",
						"title": {
							"vi": "Bay",
							"en": "Fly"
						},
						"text": {
							"preschool": {
								"vi": "Link có cánh vải. Link nhảy. Link bay. Đất to lắm.",
								"en": "Link got a cloth wing. Link jumped. Link flew. The land is so big."
							},
							"primary": {
								"vi": "Link cầm cánh vải. Cậu nhảy khỏi cao nguyên. Gió nâng cậu. Hyrule rộng dưới chân.",
								"en": "Link held the cloth wing. He jumped off the plateau. The wind lifted him. Hyrule was wide below."
							},
							"intermediate": {
								"vi": "Với cánh dù, Link rời Cao nguyên Lớn. Thế giới mở ra: đồng, núi, sông, và lâu đài xa.",
								"en": "With the paraglider, Link left the Great Plateau. The world opened: fields, mountains, rivers, and a distant castle."
							},
							"senior": {
								"vi": "Vải căng trong gió. Link rơi như một hạt giống được thả. Hyrule đón cậu bằng cả một chân trời.",
								"en": "Cloth taut in the wind. Link fell like a seed let go. Hyrule received him with a whole horizon."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Link got a cloth wing",
									"vi": "Link có cánh vải"
								},
								{
									"en": "Link jumped",
									"vi": "Link nhảy"
								},
								{
									"en": "Link flew",
									"vi": "Link bay"
								},
								{
									"en": "The land is so big",
									"vi": "Đất to lắm"
								},
								{
									"en": "so big",
									"vi": "to lắm"
								},
								{
									"en": "cloth wing",
									"vi": "cánh vải"
								}
							],
							"primary": [
								{
									"en": "Link held the cloth wing",
									"vi": "Link cầm cánh vải"
								},
								{
									"en": "He jumped off the plateau",
									"vi": "Cậu nhảy khỏi cao nguyên"
								},
								{
									"en": "The wind lifted him",
									"vi": "Gió nâng cậu"
								},
								{
									"en": "Hyrule was wide below",
									"vi": "Hyrule rộng dưới chân"
								},
								{
									"en": "cloth wing",
									"vi": "cánh vải"
								}
							],
							"intermediate": [
								{
									"en": "paraglider",
									"vi": "dù lượn"
								},
								{
									"en": "With the paraglider, Link left the Great Plateau",
									"vi": "Với cánh dù, Link rời Cao nguyên Lớn"
								},
								{
									"en": "The world opened: fields, mountains, rivers, and a distant castle",
									"vi": "Thế giới mở ra: đồng, núi, sông, và lâu đài xa"
								},
								{
									"en": "Great Plateau",
									"vi": "Cao nguyên lớn"
								}
							],
							"senior": [
								{
									"en": "fell",
									"vi": "ngã"
								},
								{
									"en": "Cloth taut in the wind",
									"vi": "Vải căng trong gió"
								},
								{
									"en": "Link fell like a seed let go",
									"vi": "Link rơi như một hạt giống được thả"
								},
								{
									"en": "Hyrule received him with a whole horizon",
									"vi": "Hyrule đón cậu bằng cả một chân trời"
								}
							]
						}
					},
					{
						"id": "z1-world",
						"image": "/illustrations/z1-04.jpg",
						"file": "z1-page-04",
						"title": {
							"vi": "Đất rộng",
							"en": "The Wide Land"
						},
						"text": {
							"preschool": {
								"vi": "Có ngựa. Có cỏ. Có tháp. Link nhìn. Đẹp lắm.",
								"en": "There are horses. There is grass. There are towers. Link looked. So pretty."
							},
							"primary": {
								"vi": "Link cưỡi ngựa trên cỏ vàng. Có tháp cao. Có làng nhỏ. Cậu đi khắp nơi.",
								"en": "Link rode a horse over golden grass. There were tall towers. There were little villages. He went everywhere."
							},
							"intermediate": {
								"vi": "Hyrule rộng và tự do. Link thám tháp Sheikah, kết bạn với ngựa, và học cách nghe đất.",
								"en": "Hyrule was wide and free. Link climbed Sheikah towers, befriended horses, and learned to listen to the land."
							},
							"senior": {
								"vi": "Cỏ nghiêng như sóng. Ngựa thở hơi ấm. Những tháp cổ nhô lên như ngón tay của người xưa, chỉ đường cho kẻ vừa tỉnh.",
								"en": "Grass leaned like waves. Horses breathed warm air. Ancient towers rose like fingers of the old people, pointing the way for one just waking."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "There are horses",
									"vi": "Có ngựa"
								},
								{
									"en": "There is grass",
									"vi": "Có cỏ"
								},
								{
									"en": "There are towers",
									"vi": "Có tháp"
								},
								{
									"en": "Link looked",
									"vi": "Link nhìn"
								},
								{
									"en": "So pretty",
									"vi": "Đẹp lắm"
								}
							],
							"primary": [
								{
									"en": "Link rode a horse over golden grass",
									"vi": "Link cưỡi ngựa trên cỏ vàng"
								},
								{
									"en": "There were tall towers",
									"vi": "Có tháp cao"
								},
								{
									"en": "There were little villages",
									"vi": "Có làng nhỏ"
								},
								{
									"en": "He went everywhere",
									"vi": "Cậu đi khắp nơi"
								}
							],
							"intermediate": [
								{
									"en": "Sheikah",
									"vi": "tộc Sheikah"
								},
								{
									"en": "Hyrule was wide and free",
									"vi": "Hyrule rộng và tự do"
								},
								{
									"en": "Link climbed Sheikah towers, befriended horses, and learned to listen to the land",
									"vi": "Link thám tháp Sheikah, kết bạn với ngựa, và học cách nghe đất"
								}
							],
							"senior": [
								{
									"en": "Grass leaned like waves",
									"vi": "Cỏ nghiêng như sóng"
								},
								{
									"en": "Horses breathed warm air",
									"vi": "Ngựa thở hơi ấm"
								},
								{
									"en": "Ancient towers rose like fingers of the old people, pointing the way for one just waking",
									"vi": "Những tháp cổ nhô lên như ngón tay của người xưa, chỉ đường cho kẻ vừa tỉnh"
								}
							]
						}
					},
					{
						"id": "z1-village",
						"image": "/illustrations/z1-05.jpg",
						"file": "z1-page-05",
						"title": {
							"vi": "Làng yên",
							"en": "Quiet Village"
						},
						"text": {
							"preschool": {
								"vi": "Có làng yên. Có bà Impa. Impa biết chuyện xưa. Link nghe.",
								"en": "There is a quiet village. There is Grandma Impa. Impa knows old stories. Link listened."
							},
							"primary": {
								"vi": "Link tới làng Kakariko. Bà Impa kể về Zelda. Impa bảo Link phải giúp bốn thú lớn.",
								"en": "Link came to Kakariko village. Grandma Impa told him about Zelda. Impa said Link must help four great beasts."
							},
							"intermediate": {
								"vi": "Ở Kakariko, Impa của tộc Sheikah giữ trí nhớ của vương quốc. Bà giao Link nhiệm vụ giải phóng bốn Thú Thần.",
								"en": "In Kakariko, Impa of the Sheikah kept the kingdom's memory. She gave Link the task of freeing the four Divine Beasts."
							},
							"senior": {
								"vi": "Đèn làng đỏ như trái tim nhỏ. Impa ngồi đó — người giữ chuyện, người không để Hyrule quên tên Zelda.",
								"en": "Village lanterns glowed red like small hearts. Impa sat there — keeper of the story, the one who would not let Hyrule forget Zelda's name."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "grandma",
									"vi": "bà nội"
								},
								{
									"en": "listened",
									"vi": "nghe"
								},
								{
									"en": "There is a quiet village",
									"vi": "Có làng yên"
								},
								{
									"en": "There is Grandma Impa",
									"vi": "Có bà Impa"
								},
								{
									"en": "Impa knows old stories",
									"vi": "Impa biết chuyện xưa"
								},
								{
									"en": "Link listened",
									"vi": "Link nghe"
								}
							],
							"primary": [
								{
									"en": "grandma",
									"vi": "bà nội"
								},
								{
									"en": "Kakariko",
									"vi": "làng Kakariko"
								},
								{
									"en": "Link came to Kakariko village",
									"vi": "Link tới làng Kakariko"
								},
								{
									"en": "Grandma Impa told him about Zelda",
									"vi": "Bà Impa kể về Zelda"
								},
								{
									"en": "Impa said Link must help four great beasts",
									"vi": "Impa bảo Link phải giúp bốn thú lớn"
								}
							],
							"intermediate": [
								{
									"en": "Sheikah",
									"vi": "tộc Sheikah"
								},
								{
									"en": "Kakariko",
									"vi": "làng Kakariko"
								},
								{
									"en": "In Kakariko, Impa of the Sheikah kept the kingdom's memory",
									"vi": "Ở Kakariko, Impa của tộc Sheikah giữ trí nhớ của vương quốc"
								},
								{
									"en": "She gave Link the task of freeing the four Divine Beasts",
									"vi": "Bà giao Link nhiệm vụ giải phóng bốn Thú Thần"
								},
								{
									"en": "Divine Beasts",
									"vi": "Thú thần"
								}
							],
							"senior": [{
								"en": "Village lanterns glowed red like small hearts",
								"vi": "Đèn làng đỏ như trái tim nhỏ"
							}, {
								"en": "Impa sat there — keeper of the story, the one who would not let Hyrule forget Zelda's name",
								"vi": "Impa ngồi đó — người giữ chuyện, người không để Hyrule quên tên Zelda"
							}]
						}
					},
					{
						"id": "z1-beasts",
						"image": "/illustrations/z1-06.jpg",
						"file": "z1-page-06",
						"title": {
							"vi": "Bốn thú",
							"en": "Four Beasts"
						},
						"text": {
							"preschool": {
								"vi": "Có bốn bạn to. Voi to. Chim to. Kỳ nhông to. Lạc đà to. Link giúp họ.",
								"en": "There are four big friends. A big elephant. A big bird. A big lizard. A big camel. Link helped them."
							},
							"primary": {
								"vi": "Bốn thú máy đang buồn. Link vào trong. Link giúp họ. Các thú khỏe lại. Họ giúp Link.",
								"en": "Four machine beasts were sad. Link went inside. Link helped them. The beasts got well. They helped Link."
							},
							"intermediate": {
								"vi": "Vah Ruta, Medoh, Rudania và Naboris — bốn Thú Thần. Link giải phóng họ. Họ chĩa sức mạnh về lâu đài.",
								"en": "Vah Ruta, Medoh, Rudania, and Naboris — four Divine Beasts. Link freed them. They turned their power toward the castle."
							},
							"senior": {
								"vi": "Bốn cỗ máy khổng lồ nhớ các dũng sĩ cũ. Link đi qua nước, gió, lửa, và cát — trả họ về với trời.",
								"en": "Four giant machines remembered old champions. Link crossed water, wind, fire, and sand — and gave them back to the sky."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "There are four big friends",
									"vi": "Có bốn bạn to"
								},
								{
									"en": "A big elephant",
									"vi": "Voi to"
								},
								{
									"en": "A big bird",
									"vi": "Chim to"
								},
								{
									"en": "A big lizard",
									"vi": "Kỳ nhông to"
								},
								{
									"en": "A big camel",
									"vi": "Lạc đà to"
								},
								{
									"en": "Link helped them",
									"vi": "Link giúp họ"
								}
							],
							"primary": [
								{
									"en": "Four machine beasts were sad",
									"vi": "Bốn thú máy đang buồn"
								},
								{
									"en": "Link went inside",
									"vi": "Link vào trong"
								},
								{
									"en": "Link helped them",
									"vi": "Link giúp họ"
								},
								{
									"en": "The beasts got well",
									"vi": "Các thú khỏe lại"
								},
								{
									"en": "They helped Link",
									"vi": "Họ giúp Link"
								}
							],
							"intermediate": [
								{
									"en": "Vah Ruta, Medoh, Rudania, and Naboris — four Divine Beasts",
									"vi": "Vah Ruta, Medoh, Rudania và Naboris — bốn Thú Thần"
								},
								{
									"en": "Link freed them",
									"vi": "Link giải phóng họ"
								},
								{
									"en": "They turned their power toward the castle",
									"vi": "Họ chĩa sức mạnh về lâu đài"
								},
								{
									"en": "Divine Beasts",
									"vi": "Thú thần"
								}
							],
							"senior": [{
								"en": "Four giant machines remembered old champions",
								"vi": "Bốn cỗ máy khổng lồ nhớ các dũng sĩ cũ"
							}, {
								"en": "Link crossed water, wind, fire, and sand — and gave them back to the sky",
								"vi": "Link đi qua nước, gió, lửa, và cát — trả họ về với trời"
							}]
						}
					},
					{
						"id": "z1-zelda",
						"image": "/illustrations/z1-07.jpg",
						"file": "z1-page-07",
						"title": {
							"vi": "Zelda",
							"en": "Zelda"
						},
						"text": {
							"preschool": {
								"vi": "Có bạn Zelda. Zelda dũng cảm. Zelda giữ thú tối. Link phải giúp.",
								"en": "There is a friend named Zelda. Zelda is brave. Zelda holds the dark thing. Link must help."
							},
							"primary": {
								"vi": "Zelda nói với Link trong gió. Cô giữ họa kiếp trong lâu đài. Cô chờ Link một trăm năm.",
								"en": "Zelda spoke to Link on the wind. She held the calamity in the castle. She waited for Link for a hundred years."
							},
							"intermediate": {
								"vi": "Công chúa Zelda dùng sức thiêng giữ Ganon. Cô để lại ký ức trên cỏ — hoa công chúa lặng, và một giọng nói.",
								"en": "Princess Zelda used sacred power to hold Ganon. She left memories in the grass — silent princess flowers, and a voice."
							},
							"senior": {
								"vi": "Zelda không đánh bằng kiếm. Cô đánh bằng thời gian: một trăm năm đứng giữa họa và đất, chờ người đã ngủ.",
								"en": "Zelda did not fight with a sword. She fought with time: a hundred years standing between calamity and land, waiting for the one who slept."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "There is a friend named Zelda",
									"vi": "Có bạn Zelda"
								},
								{
									"en": "Zelda is brave",
									"vi": "Zelda dũng cảm"
								},
								{
									"en": "Zelda holds the dark thing",
									"vi": "Zelda giữ thú tối"
								},
								{
									"en": "Link must help",
									"vi": "Link phải giúp"
								}
							],
							"primary": [
								{
									"en": "waited",
									"vi": "chờ"
								},
								{
									"en": "Zelda spoke to Link on the wind",
									"vi": "Zelda nói với Link trong gió"
								},
								{
									"en": "She held the calamity in the castle",
									"vi": "Cô giữ họa kiếp trong lâu đài"
								},
								{
									"en": "She waited for Link for a hundred years",
									"vi": "Cô chờ Link một trăm năm"
								},
								{
									"en": "a hundred years",
									"vi": "một trăm năm"
								}
							],
							"intermediate": [{
								"en": "Princess Zelda used sacred power to hold Ganon",
								"vi": "Công chúa Zelda dùng sức thiêng giữ Ganon"
							}, {
								"en": "She left memories in the grass — silent princess flowers, and a voice",
								"vi": "Cô để lại ký ức trên cỏ — hoa công chúa lặng, và một giọng nói"
							}],
							"senior": [
								{
									"en": "Zelda did not fight with a sword",
									"vi": "Zelda không đánh bằng kiếm"
								},
								{
									"en": "She fought with time: a hundred years standing between calamity and land, waiting for the one who slept",
									"vi": "Cô đánh bằng thời gian: một trăm năm đứng giữa họa và đất, chờ người đã ngủ"
								},
								{
									"en": "a hundred years",
									"vi": "một trăm năm"
								}
							]
						}
					},
					{
						"id": "z1-sword",
						"image": "/illustrations/z1-08.jpg",
						"file": "z1-page-08",
						"title": {
							"vi": "Kiếm đặc biệt",
							"en": "The Special Sword"
						},
						"text": {
							"preschool": {
								"vi": "Có rừng. Có kiếm đặc biệt. Kiếm chờ. Link cầm kiếm. Cẩn thận nha.",
								"en": "There is a forest. There is a special sword. The sword waited. Link took the sword. Be careful."
							},
							"primary": {
								"vi": "Trong rừng Korok, một thanh kiếm cũ chờ Link. Cậu kéo Thiên Kiếm lên. Rừng vui.",
								"en": "In the Korok forest, an old sword waited for Link. He pulled out the Master Sword. The forest was glad."
							},
							"intermediate": {
								"vi": "Cây Deku canh Thanh Kiếm Trừ Tà. Link chứng tỏ trái tim. Kiếm xanh sáng trong tay cậu.",
								"en": "The Deku Tree guarded the sword that seals the darkness. Link proved his heart. The sword glowed blue-green in his hand."
							},
							"senior": {
								"vi": "Trong sương Korok, thép nhớ chủ. Link đặt tay lên chuôi — và Hyrule, lần nữa, có một lưỡi sáng.",
								"en": "In Korok mist, steel remembered its master. Link set his hand on the hilt — and Hyrule, once more, had a bright blade."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "waited",
									"vi": "chờ"
								},
								{
									"en": "There is a forest",
									"vi": "Có rừng"
								},
								{
									"en": "There is a special sword",
									"vi": "Có kiếm đặc biệt"
								},
								{
									"en": "The sword waited",
									"vi": "Kiếm chờ"
								},
								{
									"en": "Link took the sword",
									"vi": "Link cầm kiếm"
								},
								{
									"en": "Be careful",
									"vi": "Cẩn thận nha"
								}
							],
							"primary": [
								{
									"en": "waited",
									"vi": "chờ"
								},
								{
									"en": "In the Korok forest, an old sword waited for Link",
									"vi": "Trong rừng Korok, một thanh kiếm cũ chờ Link"
								},
								{
									"en": "He pulled out the Master Sword",
									"vi": "Cậu kéo Thiên Kiếm lên"
								},
								{
									"en": "The forest was glad",
									"vi": "Rừng vui"
								},
								{
									"en": "Master Sword",
									"vi": "Kiếm Master"
								},
								{
									"en": "Korok forest",
									"vi": "rừng Korok"
								}
							],
							"intermediate": [
								{
									"en": "The Deku Tree guarded the sword that seals the darkness",
									"vi": "Cây Deku canh Thanh Kiếm Trừ Tà"
								},
								{
									"en": "Link proved his heart",
									"vi": "Link chứng tỏ trái tim"
								},
								{
									"en": "The sword glowed blue-green in his hand",
									"vi": "Kiếm xanh sáng trong tay cậu"
								}
							],
							"senior": [{
								"en": "In Korok mist, steel remembered its master",
								"vi": "Trong sương Korok, thép nhớ chủ"
							}, {
								"en": "Link set his hand on the hilt — and Hyrule, once more, had a bright blade",
								"vi": "Link đặt tay lên chuôi — và Hyrule, lần nữa, có một lưỡi sáng"
							}]
						}
					},
					{
						"id": "z1-castle",
						"image": "/illustrations/z1-09.jpg",
						"file": "z1-page-09",
						"title": {
							"vi": "Lâu đài",
							"en": "The Castle"
						},
						"text": {
							"preschool": {
								"vi": "Có lâu đài. Trời hồng. Thú tối ở đó. Link đi vào. Bạn bè giúp.",
								"en": "There is a castle. The sky is pink. The dark thing is there. Link went in. Friends helped."
							},
							"primary": {
								"vi": "Link vào lâu đài Hyrule. Bốn thú máy bắn hỗ trợ. Zelda gọi. Link không sợ.",
								"en": "Link went into Hyrule Castle. The four machine beasts fired to help. Zelda called. Link was not scared."
							},
							"intermediate": {
								"vi": "Lâu đài quấn họa kiếp màu hồng. Link leo lên. Với Thiên Kiếm và lời Zelda, cậu đối mặt Ganon.",
								"en": "The castle was wrapped in pink calamity. Link climbed. With the Master Sword and Zelda's voice, he faced Ganon."
							},
							"senior": {
								"vi": "Hồng khí như một vết thương trên trời. Link đi vào trái tim lâu đài — không để trả thù, mà để đánh thức một công chúa đang giữ cửa.",
								"en": "Pink haze like a wound in the sky. Link entered the castle's heart — not for revenge, but to wake a princess who was holding the door."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "There is a castle",
									"vi": "Có lâu đài"
								},
								{
									"en": "The sky is pink",
									"vi": "Trời hồng"
								},
								{
									"en": "The dark thing is there",
									"vi": "Thú tối ở đó"
								},
								{
									"en": "Link went in",
									"vi": "Link đi vào"
								},
								{
									"en": "Friends helped",
									"vi": "Bạn bè giúp"
								}
							],
							"primary": [
								{
									"en": "Link went into Hyrule Castle",
									"vi": "Link vào lâu đài Hyrule"
								},
								{
									"en": "The four machine beasts fired to help",
									"vi": "Bốn thú máy bắn hỗ trợ"
								},
								{
									"en": "Zelda called",
									"vi": "Zelda gọi"
								},
								{
									"en": "Link was not scared",
									"vi": "Link hông sợ"
								},
								{
									"en": "was not scared",
									"vi": "hông sợ"
								},
								{
									"en": "Hyrule Castle",
									"vi": "lâu đài Hyrule"
								}
							],
							"intermediate": [
								{
									"en": "The castle was wrapped in pink calamity",
									"vi": "Lâu đài quấn họa kiếp màu hồng"
								},
								{
									"en": "Link climbed",
									"vi": "Link leo lên"
								},
								{
									"en": "With the Master Sword and Zelda's voice, he faced Ganon",
									"vi": "Với Thiên Kiếm và lời Zelda, cậu đối mặt Ganon"
								},
								{
									"en": "Master Sword",
									"vi": "Kiếm Master"
								}
							],
							"senior": [{
								"en": "Pink haze like a wound in the sky",
								"vi": "Hồng khí như một vết thương trên trời"
							}, {
								"en": "Link entered the castle's heart — not for revenge, but to wake a princess who was holding the door",
								"vi": "Link đi vào trái tim lâu đài — không để trả thù, mà để đánh thức một công chúa đang giữ cửa"
							}]
						}
					},
					{
						"id": "z1-peace",
						"image": "/illustrations/z1-10.jpg",
						"file": "z1-page-10",
						"title": {
							"vi": "Yên",
							"en": "Peace"
						},
						"text": {
							"preschool": {
								"vi": "Zelda cười. Đất xanh. Link ngồi. Hết chuyện rồi. Ngủ ngon nha.",
								"en": "Zelda smiled. The land was green. Link sat down. The end. Night night."
							},
							"primary": {
								"vi": "Họa kiếp tan. Zelda trở về. Cỏ mọc. Link và Zelda đi trên đồng. Hyrule yên.",
								"en": "The calamity faded. Zelda came back. Grass grew. Link and Zelda walked the field. Hyrule was calm."
							},
							"intermediate": {
								"vi": "Ganon tan thành ánh. Zelda đứng trên cỏ. Hyrule thở lại. Hai người bắt đầu việc mới: chữa đất.",
								"en": "Ganon became light and vanished. Zelda stood in the grass. Hyrule breathed again. The two began a new task: healing the land."
							},
							"senior": {
								"vi": "Gió hạ. Zelda — trăm năm không già trong lời thề — nhìn Link như nhìn mùa xuân vừa về. Đất xanh. Chuyện cũ khép lại cho chuyện sống.",
								"en": "The wind lowered. Zelda — a hundred years unaged inside a vow — looked at Link as one looks at a spring just returned. The land was green. The old story closed so living could begin."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "smiled",
									"vi": "cười"
								},
								{
									"en": "Zelda smiled",
									"vi": "Zelda cười"
								},
								{
									"en": "The land was green",
									"vi": "Đất xanh"
								},
								{
									"en": "Link sat down",
									"vi": "Link ngồi"
								},
								{
									"en": "Night night",
									"vi": "Ngủ ngon nha"
								},
								{
									"en": "the end",
									"vi": "hết chuyện rồi"
								}
							],
							"primary": [
								{
									"en": "The calamity faded",
									"vi": "Họa kiếp tan"
								},
								{
									"en": "Zelda came back",
									"vi": "Zelda trở về"
								},
								{
									"en": "Grass grew",
									"vi": "Cỏ mọc"
								},
								{
									"en": "Link and Zelda walked the field",
									"vi": "Link và Zelda đi trên đồng"
								},
								{
									"en": "Hyrule was calm",
									"vi": "Hyrule yên"
								},
								{
									"en": "came back",
									"vi": "về"
								},
								{
									"en": "was calm",
									"vi": "yên"
								}
							],
							"intermediate": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "Ganon became light and vanished",
									"vi": "Ganon tan thành ánh"
								},
								{
									"en": "Zelda stood in the grass",
									"vi": "Zelda đứng trên cỏ"
								},
								{
									"en": "Hyrule breathed again",
									"vi": "Hyrule thở lại"
								},
								{
									"en": "The two began a new task: healing the land",
									"vi": "Hai người bắt đầu việc mới: chữa đất"
								}
							],
							"senior": [
								{
									"en": "The wind lowered",
									"vi": "Gió hạ"
								},
								{
									"en": "Zelda — a hundred years unaged inside a vow — looked at Link as one looks at a spring just returned",
									"vi": "Zelda — trăm năm không già trong lời thề — nhìn Link như nhìn mùa xuân vừa về"
								},
								{
									"en": "The land was green",
									"vi": "Đất xanh"
								},
								{
									"en": "The old story closed so living could begin",
									"vi": "Chuyện cũ khép lại cho chuyện sống"
								},
								{
									"en": "a hundred years",
									"vi": "một trăm năm"
								}
							]
						}
					}
				]
			}]
		},
		{
			"id": "transformers",
			"vi": "Transformers",
			"en": "Transformers",
			"coverTitle": {
				"vi": "Truyện Transformers",
				"en": "Transformers"
			},
			"seasons": [{
				"id": "t1986",
				"vi": "Phim 1986",
				"en": "The 1986 Movie",
				"tagline": {
					"vi": "Ánh sáng cứu mọi người",
					"en": "The light saves everyone"
				},
				"pages": [
					{
						"id": "t1-cover",
						"image": "/illustrations/t1-00.jpg?v=g1",
						"file": "t1-page-00",
						"title": {
							"vi": "Phim 1986",
							"en": "The 1986 Movie"
						},
						"text": {
							"preschool": {
								"vi": "Đây là chuyện Transformers. Phim năm 1986. Robot hiền. Có ánh sáng đặc biệt.",
								"en": "This is Transformers. The 1986 movie. Kind robots. There is a special light."
							},
							"primary": {
								"vi": "Đây là phim Transformers năm 1986. Robot hiền giúp người. Robot dữ muốn lấy hết. Một ánh sáng có thể cứu mọi người.",
								"en": "This is the 1986 Transformers movie. Kind robots help people. Mean robots want to take everything. A special light can save everyone."
							},
							"intermediate": {
								"vi": "Năm 1986, cuộc chiến robot kéo dài. Autobot bảo vệ. Decepticon cướp. Chỉ ánh sáng Matrix mới dừng được hành tinh đói.",
								"en": "In 1986 the robot war still went on. Autobots protect. Decepticons take. Only the Matrix light can stop the hungry planet."
							},
							"senior": {
								"vi": "Một trời kim loại, một ánh sáng giấu trong ngực người lãnh đạo. Phim năm ấy kể chuyện chiến tranh già — và một đứa trẻ robot phải học cầm ánh sáng.",
								"en": "A metal sky, and a light hidden in a leader's chest. That year's film told of an old war — and of a young robot who had to learn to hold the light."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "This is Transformers",
									"vi": "Đây là chuyện Transformers"
								},
								{
									"en": "The 1986 movie",
									"vi": "Phim năm 1986"
								},
								{
									"en": "Kind robots",
									"vi": "Robot hiền"
								},
								{
									"en": "There is a special light",
									"vi": "Có ánh sáng đặc biệt"
								},
								{
									"en": "special light",
									"vi": "ánh sáng đặc biệt"
								}
							],
							"primary": [
								{
									"en": "This is the 1986 Transformers movie",
									"vi": "Đây là phim Transformers năm 1986"
								},
								{
									"en": "Kind robots help people",
									"vi": "Robot hiền giúp người"
								},
								{
									"en": "Mean robots want to take everything",
									"vi": "Robot dữ muốn lấy hết"
								},
								{
									"en": "A special light can save everyone",
									"vi": "Một ánh sáng có thể cứu mọi người"
								},
								{
									"en": "kind robots",
									"vi": "robot hiền"
								},
								{
									"en": "mean robots",
									"vi": "robot dữ"
								},
								{
									"en": "special light",
									"vi": "ánh sáng đặc biệt"
								}
							],
							"intermediate": [
								{
									"en": "In 1986 the robot war still went on",
									"vi": "Năm 1986, cuộc chiến robot kéo dài"
								},
								{
									"en": "Autobots protect",
									"vi": "Autobot bảo vệ"
								},
								{
									"en": "Decepticons take",
									"vi": "Decepticon cướp"
								},
								{
									"en": "Only the Matrix light can stop the hungry planet",
									"vi": "Chỉ ánh sáng Matrix mới dừng được hành tinh đói"
								},
								{
									"en": "hungry planet",
									"vi": "hành tinh đói"
								}
							],
							"senior": [{
								"en": "A metal sky, and a light hidden in a leader's chest",
								"vi": "Một trời kim loại, một ánh sáng giấu trong ngực người lãnh đạo"
							}, {
								"en": "That year's film told of an old war — and of a young robot who had to learn to hold the light",
								"vi": "Phim năm ấy kể chuyện chiến tranh già — và một đứa trẻ robot phải học cầm ánh sáng"
							}]
						}
					},
					{
						"id": "t1-sides",
						"image": "/illustrations/t1-01.jpg?v=g1",
						"file": "t1-page-01",
						"title": {
							"vi": "Hai bên",
							"en": "Two Sides"
						},
						"text": {
							"preschool": {
								"vi": "Có robot hiền. Có robot dữ. Robot hiền giúp. Robot dữ lấy. Phải chọn hiền nha.",
								"en": "There are kind robots. There are mean robots. Kind robots help. Mean robots take. Choose kind."
							},
							"primary": {
								"vi": "Autobot là robot hiền. Decepticon là robot dữ. Họ không ưa nhau. Trẻ con cũng biết ai đáng tin.",
								"en": "Autobots are kind robots. Decepticons are mean robots. They do not like each other. Even children can tell who to trust."
							},
							"intermediate": {
								"vi": "Hai tộc máy móc chia trời: Autobot giữ lời hứa, Decepticon giữ sức mạnh. Chiến tranh làm cả hai mệt.",
								"en": "Two metal nations split the sky: Autobots keep promises, Decepticons keep power. The war tired both."
							},
							"senior": {
								"vi": "Không phải mọi cỗ máy đều biết thương. Một bên học cách quỳ xuống với kẻ yếu. Một bên chỉ học cách đứng trên.",
								"en": "Not every machine learns mercy. One side learned to kneel beside the weak. The other learned only to stand above."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "There are kind robots",
									"vi": "Có robot hiền"
								},
								{
									"en": "There are mean robots",
									"vi": "Có robot dữ"
								},
								{
									"en": "Kind robots help",
									"vi": "Robot hiền giúp"
								},
								{
									"en": "Mean robots take",
									"vi": "Robot dữ lấy"
								},
								{
									"en": "Choose kind",
									"vi": "Phải chọn hiền nha"
								},
								{
									"en": "kind robots",
									"vi": "robot hiền"
								},
								{
									"en": "mean robots",
									"vi": "robot dữ"
								}
							],
							"primary": [
								{
									"en": "Autobots are kind robots",
									"vi": "Autobot là robot hiền"
								},
								{
									"en": "Decepticons are mean robots",
									"vi": "Decepticon là robot dữ"
								},
								{
									"en": "They do not like each other",
									"vi": "Họ hông ưa nhau"
								},
								{
									"en": "Even children can tell who to trust",
									"vi": "Trẻ con cũng biết ai đáng tin"
								},
								{
									"en": "kind robots",
									"vi": "robot hiền"
								},
								{
									"en": "mean robots",
									"vi": "robot dữ"
								}
							],
							"intermediate": [{
								"en": "Two metal nations split the sky: Autobots keep promises, Decepticons keep power",
								"vi": "Hai tộc máy móc chia trời: Autobot giữ lời hứa, Decepticon giữ sức mạnh"
							}, {
								"en": "The war tired both",
								"vi": "Chiến tranh làm cả hai mệt"
							}],
							"senior": [
								{
									"en": "Not every machine learns mercy",
									"vi": "Không phải mọi cỗ máy đều biết thương"
								},
								{
									"en": "One side learned to kneel beside the weak",
									"vi": "Một bên học cách quỳ xuống với kẻ yếu"
								},
								{
									"en": "The other learned only to stand above",
									"vi": "Một bên chỉ học cách đứng trên"
								}
							]
						}
					},
					{
						"id": "t1-earth",
						"image": "/illustrations/t1-02.jpg?v=g1",
						"file": "t1-page-02",
						"title": {
							"vi": "Trái Đất",
							"en": "Earth"
						},
						"text": {
							"preschool": {
								"vi": "Robot tới Trái Đất. Họ giả làm xe. Có bạn nhỏ. Mọi người chơi. Vui lắm.",
								"en": "Robots came to Earth. They pretended to be cars. There is a little friend. Everyone played. So fun."
							},
							"primary": {
								"vi": "Trên Trái Đất, robot hiền giả làm xe tải và xe hơi. Một bạn nhỏ tên Daniel chơi với họ. Họ che chở thị trấn.",
								"en": "On Earth, the kind robots pretended to be trucks and cars. A little friend named Daniel played with them. They kept the town safe."
							},
							"intermediate": {
								"vi": "Họ ngủ trong hình dạng xe, dậy khi trời tối. Trái Đất tưởng chỉ có máy — nhưng máy ấy biết thương người.",
								"en": "They slept in the shapes of cars and woke at night. Earth thought they were only machines — but those machines knew how to care."
							},
							"senior": {
								"vi": "Một hành tinh xanh chứa chấp những người sắt đang trốn chiến tranh của chính họ. Tình bạn với một đứa trẻ — đó là cách họ nhớ mình còn là ai.",
								"en": "A blue planet hid iron people fleeing their own war. Friendship with a child — that was how they remembered who they still were."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Robots came to Earth",
									"vi": "Robot tới Trái Đất"
								},
								{
									"en": "They pretended to be cars",
									"vi": "Họ giả làm xe"
								},
								{
									"en": "There is a little friend",
									"vi": "Có bạn nhỏ"
								},
								{
									"en": "Everyone played",
									"vi": "Mọi người chơi"
								},
								{
									"en": "so fun",
									"vi": "vui lắm"
								}
							],
							"primary": [
								{
									"en": "On Earth, the kind robots pretended to be trucks and cars",
									"vi": "Trên Trái Đất, robot hiền giả làm xe tải và xe hơi"
								},
								{
									"en": "A little friend named Daniel played with them",
									"vi": "Một bạn nhỏ tên Daniel chơi với họ"
								},
								{
									"en": "They kept the town safe",
									"vi": "Họ che chở thị trấn"
								},
								{
									"en": "kind robots",
									"vi": "robot hiền"
								}
							],
							"intermediate": [{
								"en": "They slept in the shapes of cars and woke at night",
								"vi": "Họ ngủ trong hình dạng xe, dậy khi trời tối"
							}, {
								"en": "Earth thought they were only machines — but those machines knew how to care",
								"vi": "Trái Đất tưởng chỉ có máy — nhưng máy ấy biết thương người"
							}],
							"senior": [{
								"en": "A blue planet hid iron people fleeing their own war",
								"vi": "Một hành tinh xanh chứa chấp những người sắt đang trốn chiến tranh của chính họ"
							}, {
								"en": "Friendship with a child — that was how they remembered who they still were",
								"vi": "Tình bạn với một đứa trẻ — đó là cách họ nhớ mình còn là ai"
							}]
						}
					},
					{
						"id": "t1-attack",
						"image": "/illustrations/t1-03.jpg?v=g1",
						"file": "t1-page-03",
						"title": {
							"vi": "Tới rồi",
							"en": "They Came"
						},
						"text": {
							"preschool": {
								"vi": "Robot dữ tới. Các bạn sợ. Optimus đứng trước. Optimus hông chạy. Các bạn núp.",
								"en": "Mean robots came. The friends were scared. Optimus stood in front. Optimus did not run. The friends hid."
							},
							"primary": {
								"vi": "Decepticon ập vào thành phố robot. Mọi người sợ. Optimus bước ra trước cửa. Cậu nói: các bạn ra sau đi.",
								"en": "Decepticons rushed the robot city. Everyone was scared. Optimus stepped in front of the gate. He said: friends, go behind me."
							},
							"intermediate": {
								"vi": "Thành Autobot rung. Megatron muốn lấy. Optimus không để chiến tranh đụng vào người nhỏ.",
								"en": "Autobot City shook. Megatron wanted to take it. Optimus would not let the war touch the little ones."
							},
							"senior": {
								"vi": "Khi trời kim loại tối lại, lãnh đạo không phải người hét to nhất. Là người đứng ngay cửa, để bóng mình che những đứa đang học cách sống.",
								"en": "When the metal sky went dark, a leader was not the one who shouted loudest. It was the one who stood in the doorway, so his shadow could cover those still learning how to live."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "Mean robots came",
									"vi": "Robot dữ tới"
								},
								{
									"en": "The friends were scared",
									"vi": "Các bạn sợ"
								},
								{
									"en": "Optimus stood in front",
									"vi": "Optimus đứng trước"
								},
								{
									"en": "Optimus did not run",
									"vi": "Optimus hông chạy"
								},
								{
									"en": "The friends hid",
									"vi": "Các bạn núp"
								},
								{
									"en": "stood in front",
									"vi": "đứng trước"
								},
								{
									"en": "mean robots",
									"vi": "robot dữ"
								},
								{
									"en": "did not run",
									"vi": "hông chạy"
								}
							],
							"primary": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Decepticons rushed the robot city",
									"vi": "Decepticon ập vào thành phố robot"
								},
								{
									"en": "Everyone was scared",
									"vi": "Mọi người sợ"
								},
								{
									"en": "Optimus stepped in front of the gate",
									"vi": "Optimus bước ra trước cửa"
								},
								{
									"en": "He said: friends, go behind me",
									"vi": "Cậu nói: các bạn ra sau đi"
								},
								{
									"en": "was scared",
									"vi": "sợ"
								}
							],
							"intermediate": [
								{
									"en": "Autobot City shook",
									"vi": "Thành Autobot rung"
								},
								{
									"en": "Megatron wanted to take it",
									"vi": "Megatron muốn lấy"
								},
								{
									"en": "Optimus would not let the war touch the little ones",
									"vi": "Optimus không để chiến tranh đụng vào người nhỏ"
								}
							],
							"senior": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "When the metal sky went dark, a leader was not the one who shouted loudest",
									"vi": "Khi trời kim loại tối lại, lãnh đạo không phải người hét to nhất"
								},
								{
									"en": "It was the one who stood in the doorway, so his shadow could cover those still learning how to live",
									"vi": "Là người đứng ngay cửa, để bóng mình che những đứa đang học cách sống"
								}
							]
						}
					},
					{
						"id": "t1-optimus",
						"image": "/illustrations/t1-04.jpg?v=g1",
						"file": "t1-page-04",
						"title": {
							"vi": "Optimus",
							"en": "Optimus"
						},
						"text": {
							"preschool": {
								"vi": "Optimus to. Optimus hiền. Optimus che mọi người. Optimus giỏi lắm. Bạn bè tin.",
								"en": "Optimus is big. Optimus is kind. Optimus covers everyone. Optimus did so well. Friends trust him."
							},
							"primary": {
								"vi": "Optimus là thủ lĩnh hiền. Cậu lớn và mạnh, nhưng không thích đánh. Cậu chỉ đứng ra khi bạn bè cần.",
								"en": "Optimus is the kind leader. He is big and strong, but he does not like to fight. He only stands up when his friends need him."
							},
							"intermediate": {
								"vi": "Optimus Prime mang sức của một xe tải và trái tim của một thầy. Megatron đối diện cậu — hai người từng là một trời.",
								"en": "Optimus Prime carried a truck's strength and a teacher's heart. Megatron faced him — two who had once shared a sky."
							},
							"senior": {
								"vi": "Người ta nhớ Optimus không vì thép. Vì cậu biết đặt bàn tay lên vai kẻ yếu, rồi mới quay lại với kẻ mạnh.",
								"en": "People remember Optimus not for the steel. For the way he set a hand on the weak, and only then turned to face the strong."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Optimus is big",
									"vi": "Optimus to"
								},
								{
									"en": "Optimus is kind",
									"vi": "Optimus hiền"
								},
								{
									"en": "Optimus covers everyone",
									"vi": "Optimus che mọi người"
								},
								{
									"en": "Optimus did so well",
									"vi": "Optimus giỏi lắm"
								},
								{
									"en": "Friends trust him",
									"vi": "Bạn bè tin"
								},
								{
									"en": "did so well",
									"vi": "giỏi lắm"
								}
							],
							"primary": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Optimus is the kind leader",
									"vi": "Optimus là thủ lĩnh hiền"
								},
								{
									"en": "He is big and strong, but he does not like to fight",
									"vi": "Cậu lớn và mạnh, nhưng hông thích đánh"
								},
								{
									"en": "He only stands up when his friends need him",
									"vi": "Cậu chỉ đứng ra khi bạn bè cần"
								}
							],
							"intermediate": [
								{
									"en": "teacher",
									"vi": "thầy"
								},
								{
									"en": "Optimus Prime carried a truck's strength and a teacher's heart",
									"vi": "Optimus Prime mang sức của một xe tải và trái tim của một thầy"
								},
								{
									"en": "Megatron faced him — two who had once shared a sky",
									"vi": "Megatron đối diện cậu — hai người từng là một trời"
								}
							],
							"senior": [{
								"en": "People remember Optimus not for the steel",
								"vi": "Người ta nhớ Optimus không vì thép"
							}, {
								"en": "For the way he set a hand on the weak, and only then turned to face the strong",
								"vi": "Vì cậu biết đặt bàn tay lên vai kẻ yếu, rồi mới quay lại với kẻ mạnh"
							}]
						}
					},
					{
						"id": "t1-light",
						"image": "/illustrations/t1-05.jpg?v=g1",
						"file": "t1-page-05",
						"title": {
							"vi": "Ánh sáng",
							"en": "The Light"
						},
						"text": {
							"preschool": {
								"vi": "Optimus mệt lắm. Optimus đưa ánh sáng cho Hot Rod. Này, cầm nha. Con giỏi mà.",
								"en": "Optimus was so tired. Optimus gave the light to Hot Rod. Here. Hold it. You can do it."
							},
							"primary": {
								"vi": "Optimus quá mệt. Cậu đưa Hot Rod một ánh sáng vàng. Cậu nói: con cầm. Ánh sáng này cứu được mọi người.",
								"en": "Optimus was too tired. He gave Hot Rod a golden light. He said: you hold it. This light can save everyone."
							},
							"intermediate": {
								"vi": "Matrix — ánh sáng lãnh đạo — rời ngực Optimus. Hot Rod còn trẻ, tay run, nhưng không trả lại.",
								"en": "The Matrix — the light of leaders — left Optimus's chest. Hot Rod was young, his hands shook, but he did not give it back."
							},
							"senior": {
								"vi": "Có thứ ánh sáng không truyền bằng lệnh. Optimus chỉ còn hơi thở để nói: cầm lấy, rồi đi. Chiến tranh già trao việc cho một đứa chưa kịp lớn.",
								"en": "Some lights are not passed by command. Optimus had only breath enough to say: take it, then go. An old war handed its work to a child who had not finished growing."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Optimus was so tired",
									"vi": "Optimus mệt lắm"
								},
								{
									"en": "Optimus gave the light to Hot Rod",
									"vi": "Optimus đưa ánh sáng cho Hot Rod"
								},
								{
									"en": "so tired",
									"vi": "mệt lắm"
								}
							],
							"primary": [
								{
									"en": "Optimus was too tired",
									"vi": "Optimus quá mệt"
								},
								{
									"en": "He gave Hot Rod a golden light",
									"vi": "Cậu đưa Hot Rod một ánh sáng vàng"
								},
								{
									"en": "He said: you hold it",
									"vi": "Cậu nói: con cầm"
								},
								{
									"en": "This light can save everyone",
									"vi": "Ánh sáng này cứu được mọi người"
								}
							],
							"intermediate": [{
								"en": "The Matrix — the light of leaders — left Optimus's chest",
								"vi": "Matrix — ánh sáng lãnh đạo — rời ngực Optimus"
							}, {
								"en": "Hot Rod was young, his hands shook, but he did not give it back",
								"vi": "Hot Rod còn trẻ, tay run, nhưng không trả lại"
							}],
							"senior": [
								{
									"en": "Some lights are not passed by command",
									"vi": "Có thứ ánh sáng không truyền bằng lệnh"
								},
								{
									"en": "Optimus had only breath enough to say: take it, then go",
									"vi": "Optimus chỉ còn hơi thở để nói: cầm lấy, rồi đi"
								},
								{
									"en": "An old war handed its work to a child who had not finished growing",
									"vi": "Chiến tranh già trao việc cho một đứa chưa kịp lớn"
								}
							]
						}
					},
					{
						"id": "t1-unicron",
						"image": "/illustrations/t1-06.jpg?v=g1",
						"file": "t1-page-06",
						"title": {
							"vi": "Hành tinh đói",
							"en": "Hungry Planet"
						},
						"text": {
							"preschool": {
								"vi": "Có hành tinh to lắm. Tên Unicron. Unicron đói. Unicron muốn ăn trời. Phải lo.",
								"en": "There is a planet so big. His name is Unicron. Unicron is hungry. Unicron wants to eat the sky. Be careful."
							},
							"primary": {
								"vi": "Unicron là hành tinh khổng lồ. Cậu ta đói và muốn ăn các vì sao. Megatron theo Unicron. Mọi người phải tìm ánh sáng.",
								"en": "Unicron is a giant planet. He is hungry and wants to eat the stars. Megatron follows Unicron. Everyone must find the light."
							},
							"intermediate": {
								"vi": "Unicron — thần đói đội lốt hành tinh — nuốt thế giới như bánh. Megatron được ông ta đổi thành Galvatron. Trời hẹp lại.",
								"en": "Unicron — a hungry god wearing a planet — swallowed worlds like bread. He remade Megatron into Galvatron. The sky grew small."
							},
							"senior": {
								"vi": "Đói không cần mặt để đáng sợ. Unicron là sự đói có quỹ đạo. Dưới bóng ông, ngay kẻ mạnh cũng trở thành đồ chơi.",
								"en": "Hunger needs no face to be feared. Unicron was appetite given an orbit. Under his shadow, even the strong became toys."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "There is a planet so big",
									"vi": "Có hành tinh to lắm"
								},
								{
									"en": "His name is Unicron",
									"vi": "Tên Unicron"
								},
								{
									"en": "Unicron is hungry",
									"vi": "Unicron đói"
								},
								{
									"en": "Unicron wants to eat the sky",
									"vi": "Unicron muốn ăn trời"
								},
								{
									"en": "Be careful",
									"vi": "Phải lo"
								},
								{
									"en": "so big",
									"vi": "to lắm"
								}
							],
							"primary": [
								{
									"en": "Unicron is a giant planet",
									"vi": "Unicron là hành tinh khổng lồ"
								},
								{
									"en": "He is hungry and wants to eat the stars",
									"vi": "Cậu ta đói và muốn ăn các vì sao"
								},
								{
									"en": "Megatron follows Unicron",
									"vi": "Megatron theo Unicron"
								},
								{
									"en": "Everyone must find the light",
									"vi": "Mọi người phải tìm ánh sáng"
								}
							],
							"intermediate": [
								{
									"en": "Unicron — a hungry god wearing a planet — swallowed worlds like bread",
									"vi": "Unicron — thần đói đội lốt hành tinh — nuốt thế giới như bánh"
								},
								{
									"en": "He remade Megatron into Galvatron",
									"vi": "Megatron được ông ta đổi thành Galvatron"
								},
								{
									"en": "The sky grew small",
									"vi": "Trời hẹp lại"
								}
							],
							"senior": [
								{
									"en": "Hunger needs no face to be feared",
									"vi": "Đói không cần mặt để đáng sợ"
								},
								{
									"en": "Unicron was appetite given an orbit",
									"vi": "Unicron là sự đói có quỹ đạo"
								},
								{
									"en": "Under his shadow, even the strong became toys",
									"vi": "Dưới bóng ông, ngay kẻ mạnh cũng trở thành đồ chơi"
								}
							]
						}
					},
					{
						"id": "t1-run",
						"image": "/illustrations/t1-07.jpg?v=g1",
						"file": "t1-page-07",
						"title": {
							"vi": "Đi tiếp",
							"en": "Keep Going"
						},
						"text": {
							"preschool": {
								"vi": "Hot Rod chạy với bạn. Bay tiếp. Tìm mãi. Hông bỏ ánh sáng. Đi tiếp nha.",
								"en": "Hot Rod ran with friends. They flew on. They keep looking. Do not drop the light. Keep going."
							},
							"primary": {
								"vi": "Hot Rod và bạn bè bay đi tìm cách mở ánh sáng. Họ hỏi người lạ. Họ không dừng. Ánh sáng còn ấm trong tay.",
								"en": "Hot Rod and his friends flew to find a way to open the light. They asked strangers. They did not stop. The light stayed warm in their hands."
							},
							"intermediate": {
								"vi": "Họ đi qua bãi phế liệu, qua tòa án lạ, qua những ông già robot. Kup kể chuyện. Hot Rod vẫn chưa hiểu mình đang lớn.",
								"en": "They crossed junk worlds, strange courts, old robots. Kup told stories. Hot Rod still did not see that he was growing."
							},
							"senior": {
								"vi": "Đường cứu thế giới ít khi thẳng. Họ đi vòng qua rác và luật lạ — chỉ để học rằng ánh sáng chưa mở vì người cầm nó còn đang trốn chính mình.",
								"en": "The road that saves a world is seldom straight. They circled through junk and strange law — only to learn the light would not open while its holder was still hiding from himself."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Hot Rod ran with friends",
									"vi": "Hot Rod chạy với bạn"
								},
								{
									"en": "They flew on",
									"vi": "Bay tiếp"
								},
								{
									"en": "They keep looking",
									"vi": "Tìm mãi"
								},
								{
									"en": "Do not drop the light",
									"vi": "Hông bỏ ánh sáng"
								},
								{
									"en": "Keep going",
									"vi": "Đi tiếp nha"
								},
								{
									"en": "flew on",
									"vi": "bay tiếp"
								}
							],
							"primary": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Hot Rod and his friends flew to find a way to open the light",
									"vi": "Hot Rod và bạn bè bay đi tìm cách mở ánh sáng"
								},
								{
									"en": "They asked strangers",
									"vi": "Họ hỏi người lạ"
								},
								{
									"en": "They did not stop",
									"vi": "Họ hông dừng"
								},
								{
									"en": "The light stayed warm in their hands",
									"vi": "Ánh sáng còn ấm trong tay"
								}
							],
							"intermediate": [
								{
									"en": "They crossed junk worlds, strange courts, old robots",
									"vi": "Họ đi qua bãi phế liệu, qua tòa án lạ, qua những ông già robot"
								},
								{
									"en": "Kup told stories",
									"vi": "Kup kể chuyện"
								},
								{
									"en": "Hot Rod still did not see that he was growing",
									"vi": "Hot Rod vẫn chưa hiểu mình đang lớn"
								}
							],
							"senior": [{
								"en": "The road that saves a world is seldom straight",
								"vi": "Đường cứu thế giới ít khi thẳng"
							}, {
								"en": "They circled through junk and strange law — only to learn the light would not open while its holder was still hiding from himself",
								"vi": "Họ đi vòng qua rác và luật lạ — chỉ để học rằng ánh sáng chưa mở vì người cầm nó còn đang trốn chính mình"
							}]
						}
					},
					{
						"id": "t1-brave",
						"image": "/illustrations/t1-08.jpg?v=g1",
						"file": "t1-page-08",
						"title": {
							"vi": "Dũng cảm",
							"en": "Brave"
						},
						"text": {
							"preschool": {
								"vi": "Hot Rod cầm ánh sáng. Ánh sáng ấm. Hot Rod hông sợ. Hot Rod thở. Rồi sáng.",
								"en": "Hot Rod held the light. The light was warm. Hot Rod was not scared. Hot Rod breathed. Then it glowed."
							},
							"primary": {
								"vi": "Hot Rod đứng trước Unicron. Cậu hông chạy. Cậu mở tay. Ánh sáng vàng lớn lên. Cậu trở thành người lớn.",
								"en": "Hot Rod stood in front of Unicron. He did not run. He opened his hands. The golden light grew. He became grown."
							},
							"intermediate": {
								"vi": "Matrix chỉ mở cho người dám chịu. Hot Rod không còn trốn sau Optimus. Ánh sáng đội lên — Rodimus Prime.",
								"en": "The Matrix opens only for someone willing to carry it. Hot Rod stopped hiding behind Optimus. The light crowned him — Rodimus Prime."
							},
							"senior": {
								"vi": "Trở thành lãnh đạo không phải đội thêm thép. Là ở lại khi hành tinh há miệng. Hot Rod ở lại — và ánh sáng nhận ra cậu.",
								"en": "Becoming a leader is not more steel. It is staying when a planet opens its mouth. Hot Rod stayed — and the light recognized him."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Hot Rod held the light",
									"vi": "Hot Rod cầm ánh sáng"
								},
								{
									"en": "The light was warm",
									"vi": "Ánh sáng ấm"
								},
								{
									"en": "Hot Rod was not scared",
									"vi": "Hot Rod hông sợ"
								},
								{
									"en": "Hot Rod breathed",
									"vi": "Hot Rod thở"
								},
								{
									"en": "Then it glowed",
									"vi": "Rồi sáng"
								},
								{
									"en": "was not scared",
									"vi": "hông sợ"
								}
							],
							"primary": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "Hot Rod stood in front of Unicron",
									"vi": "Hot Rod đứng trước Unicron"
								},
								{
									"en": "He did not run",
									"vi": "Cậu hông chạy"
								},
								{
									"en": "He opened his hands",
									"vi": "Cậu mở tay"
								},
								{
									"en": "The golden light grew",
									"vi": "Ánh sáng vàng lớn lên"
								},
								{
									"en": "He became grown",
									"vi": "Cậu trở thành người lớn"
								},
								{
									"en": "stood in front",
									"vi": "đứng trước"
								},
								{
									"en": "did not run",
									"vi": "hông chạy"
								}
							],
							"intermediate": [
								{
									"en": "stopped",
									"vi": "dừng"
								},
								{
									"en": "The Matrix opens only for someone willing to carry it",
									"vi": "Matrix chỉ mở cho người dám chịu"
								},
								{
									"en": "Hot Rod stopped hiding behind Optimus",
									"vi": "Hot Rod không còn trốn sau Optimus"
								},
								{
									"en": "The light crowned him — Rodimus Prime",
									"vi": "Ánh sáng đội lên — Rodimus Prime"
								}
							],
							"senior": [
								{
									"en": "Becoming a leader is not more steel",
									"vi": "Trở thành lãnh đạo không phải đội thêm thép"
								},
								{
									"en": "It is staying when a planet opens its mouth",
									"vi": "Là ở lại khi hành tinh há miệng"
								},
								{
									"en": "Hot Rod stayed — and the light recognized him",
									"vi": "Hot Rod ở lại — và ánh sáng nhận ra cậu"
								}
							]
						}
					},
					{
						"id": "t1-open",
						"image": "/illustrations/t1-09.jpg?v=g1",
						"file": "t1-page-09",
						"title": {
							"vi": "Mở sáng",
							"en": "The Light Opens"
						},
						"text": {
							"preschool": {
								"vi": "Ánh sáng mở. Hành tinh đói dừng. Trời xong. Mọi người vui. Giỏi lắm.",
								"en": "The light opened. The hungry planet stopped. The sky was safe. Everyone was happy. So well done."
							},
							"primary": {
								"vi": "Ánh sáng Matrix mở to. Unicron không ăn nữa. Galvatron chạy. Các robot hiền ôm nhau. Thành phố xong.",
								"en": "The Matrix light opened wide. Unicron stopped eating. Galvatron ran. The kind robots hugged. The city was safe."
							},
							"intermediate": {
								"vi": "Một tia vàng xé bóng Unicron. Hành tinh đói vỡ thành sao lặng. Chiến tranh già, trong một phút, không còn chỗ đứng.",
								"en": "A gold ray tore Unicron's shadow. The hungry planet broke into quiet stars. For one minute the old war had nowhere to stand."
							},
							"senior": {
								"vi": "Ánh sáng không đấm. Nó chỉ mở — và đói không chịu được chỗ có đủ. Unicron tan như một cơn ác mộng bị gọi đúng tên.",
								"en": "The light did not strike. It only opened — and hunger cannot bear a place that is enough. Unicron came apart like a nightmare named out loud."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "stopped",
									"vi": "dừng"
								},
								{
									"en": "The light opened",
									"vi": "Ánh sáng mở"
								},
								{
									"en": "The hungry planet stopped",
									"vi": "Hành tinh đói dừng"
								},
								{
									"en": "The sky was safe",
									"vi": "Trời xong"
								},
								{
									"en": "Everyone was happy",
									"vi": "Mọi người vui"
								},
								{
									"en": "So well done",
									"vi": "Giỏi lắm"
								},
								{
									"en": "hungry planet",
									"vi": "hành tinh đói"
								}
							],
							"primary": [
								{
									"en": "hugged",
									"vi": "ôm"
								},
								{
									"en": "stopped",
									"vi": "dừng"
								},
								{
									"en": "The Matrix light opened wide",
									"vi": "Ánh sáng Matrix mở to"
								},
								{
									"en": "Unicron stopped eating",
									"vi": "Unicron hông ăn nữa"
								},
								{
									"en": "Galvatron ran",
									"vi": "Galvatron chạy"
								},
								{
									"en": "The kind robots hugged",
									"vi": "Các robot hiền ôm nhau"
								},
								{
									"en": "The city was safe",
									"vi": "Thành phố xong"
								},
								{
									"en": "city was safe",
									"vi": "thành phố xong"
								},
								{
									"en": "kind robots",
									"vi": "robot hiền"
								}
							],
							"intermediate": [
								{
									"en": "A gold ray tore Unicron's shadow",
									"vi": "Một tia vàng xé bóng Unicron"
								},
								{
									"en": "The hungry planet broke into quiet stars",
									"vi": "Hành tinh đói vỡ thành sao lặng"
								},
								{
									"en": "For one minute the old war had nowhere to stand",
									"vi": "Chiến tranh già, trong một phút, không còn chỗ đứng"
								},
								{
									"en": "hungry planet",
									"vi": "hành tinh đói"
								}
							],
							"senior": [
								{
									"en": "The light did not strike",
									"vi": "Ánh sáng không đấm"
								},
								{
									"en": "It only opened — and hunger cannot bear a place that is enough",
									"vi": "Nó chỉ mở — và đói không chịu được chỗ có đủ"
								},
								{
									"en": "Unicron came apart like a nightmare named out loud",
									"vi": "Unicron tan như một cơn ác mộng bị gọi đúng tên"
								}
							]
						}
					},
					{
						"id": "t1-peace",
						"image": "/illustrations/t1-10.jpg?v=g1",
						"file": "t1-page-10",
						"title": {
							"vi": "Yên",
							"en": "Peace"
						},
						"text": {
							"preschool": {
								"vi": "Trời yên. Hot Rod cười. Robot hiền ngồi. Hết chuyện rồi. Ngủ ngon nha.",
								"en": "The sky was calm. Hot Rod smiled. Kind robots sat down. The end. Night night."
							},
							"primary": {
								"vi": "Sáng hôm sau trời trong. Hot Rod làm thủ lĩnh mới. Mọi người nghỉ. Chiến tranh im. Ngủ ngon nha.",
								"en": "The next morning the sky was clear. Hot Rod was the new leader. Everyone rested. The war went quiet. Night night."
							},
							"intermediate": {
								"vi": "Rodimus nhìn bình minh kim loại. Còn việc, còn bạn, còn ánh sáng phải giữ. Nhưng hôm nay được ngồi. Được thở.",
								"en": "Rodimus watched a metal dawn. There was still work, still friends, still a light to keep. But today they could sit. They could breathe."
							},
							"senior": {
								"vi": "Chiến tranh già khép lại không phải vì hết kẻ dữ — vì có đứa trẻ robot dám cầm ánh sáng mà không biến nó thành lệnh. Trời yên. Ngủ được rồi.",
								"en": "The old war closed not because meanness ended — because a young robot held the light without turning it into a command. The sky was calm. Sleep could come."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "smiled",
									"vi": "cười"
								},
								{
									"en": "The sky was calm",
									"vi": "Trời yên"
								},
								{
									"en": "Hot Rod smiled",
									"vi": "Hot Rod cười"
								},
								{
									"en": "Kind robots sat down",
									"vi": "Robot hiền ngồi"
								},
								{
									"en": "Night night",
									"vi": "Ngủ ngon nha"
								},
								{
									"en": "the end",
									"vi": "hết chuyện rồi"
								},
								{
									"en": "was calm",
									"vi": "yên"
								},
								{
									"en": "kind robots",
									"vi": "robot hiền"
								}
							],
							"primary": [
								{
									"en": "rested",
									"vi": "nghỉ"
								},
								{
									"en": "The next morning the sky was clear",
									"vi": "Sáng hôm sau trời trong"
								},
								{
									"en": "Hot Rod was the new leader",
									"vi": "Hot Rod làm thủ lĩnh mới"
								},
								{
									"en": "Everyone rested",
									"vi": "Mọi người nghỉ"
								},
								{
									"en": "The war went quiet",
									"vi": "Chiến tranh im"
								},
								{
									"en": "Night night",
									"vi": "Ngủ ngon nha"
								}
							],
							"intermediate": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Rodimus watched a metal dawn",
									"vi": "Rodimus nhìn bình minh kim loại"
								},
								{
									"en": "There was still work, still friends, still a light to keep",
									"vi": "Còn việc, còn bạn, còn ánh sáng phải giữ"
								},
								{
									"en": "But today they could sit",
									"vi": "Nhưng hôm nay được ngồi"
								},
								{
									"en": "They could breathe",
									"vi": "Được thở"
								}
							],
							"senior": [
								{
									"en": "The old war closed not because meanness ended — because a young robot held the light without turning it into a command",
									"vi": "Chiến tranh già khép lại không phải vì hết kẻ dữ — vì có đứa trẻ robot dám cầm ánh sáng mà không biến nó thành lệnh"
								},
								{
									"en": "The sky was calm",
									"vi": "Trời yên"
								},
								{
									"en": "Sleep could come",
									"vi": "Ngủ được rồi"
								},
								{
									"en": "was calm",
									"vi": "yên"
								}
							]
						}
					}
				]
			}, {
				"id": "bumblebee",
				"vi": "Bumblebee",
				"en": "Bumblebee",
				"tagline": {
					"vi": "Bạn vàng năm 1987",
					"en": "A yellow friend in 1987"
				},
				"pages": [
					{
						"id": "b1-cover",
						"image": "/illustrations/b1-00.jpg?v=la",
						"file": "b1-page-00",
						"title": {
							"vi": "Bumblebee",
							"en": "Bumblebee"
						},
						"text": {
							"preschool": {
								"vi": "Đây là chuyện Bumblebee. Năm 1987. Xe vàng. Có bạn tên Charlie.",
								"en": "This is Bumblebee. The year is 1987. A yellow car. There is a friend named Charlie."
							},
							"primary": {
								"vi": "Đây là phim Bumblebee. Năm 1987 ở California. Charlie tìm một xe vàng. Xe ấy là robot hiền.",
								"en": "This is the Bumblebee movie. 1987 in California. Charlie finds a yellow car. That car is a kind robot."
							},
							"intermediate": {
								"vi": "Năm 1987, một Autobot vàng rơi xuống Trái Đất. Charlie Watson — mười tám tuổi — tìm thấy cậu trong bãi xe. Tình bạn bắt đầu từ một chiếc Camaro cũ.",
								"en": "In 1987 a yellow Autobot fell to Earth. Charlie Watson — eighteen — found him in a junkyard. Friendship began with an old Camaro."
							},
							"senior": {
								"vi": "Trước khi chiến tranh lớn ồn ào, có một mùa hè vàng: một robot mất tiếng, một cô gái mất chỗ đứng, và một chiếc xe biết nghe radio như người biết nghe tim.",
								"en": "Before the loud war, there was a yellow summer: a robot without a voice, a girl without a place, and a car that listened to the radio the way some people listen to a heart."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "This is Bumblebee",
									"vi": "Đây là chuyện Bumblebee"
								},
								{
									"en": "The year is 1987",
									"vi": "Năm 1987"
								},
								{
									"en": "A yellow car",
									"vi": "Xe vàng"
								},
								{
									"en": "There is a friend named Charlie",
									"vi": "Có bạn tên Charlie"
								},
								{
									"en": "yellow car",
									"vi": "xe vàng"
								}
							],
							"primary": [
								{
									"en": "This is the Bumblebee movie",
									"vi": "Đây là phim Bumblebee"
								},
								{
									"en": "1987 in California",
									"vi": "Năm 1987 ở California"
								},
								{
									"en": "Charlie finds a yellow car",
									"vi": "Charlie tìm một xe vàng"
								},
								{
									"en": "That car is a kind robot",
									"vi": "Xe ấy là robot hiền"
								},
								{
									"en": "yellow car",
									"vi": "xe vàng"
								}
							],
							"intermediate": [
								{
									"en": "fell",
									"vi": "ngã"
								},
								{
									"en": "In 1987 a yellow Autobot fell to Earth",
									"vi": "Năm 1987, một Autobot vàng rơi xuống Trái Đất"
								},
								{
									"en": "Charlie Watson — eighteen — found him in a junkyard",
									"vi": "Charlie Watson — mười tám tuổi — tìm thấy cậu trong bãi xe"
								},
								{
									"en": "Friendship began with an old Camaro",
									"vi": "Tình bạn bắt đầu từ một chiếc Camaro cũ"
								}
							],
							"senior": [{
								"en": "listened",
								"vi": "nghe"
							}, {
								"en": "Before the loud war, there was a yellow summer: a robot without a voice, a girl without a place, and a car that listened to the radio the way some people listen to a heart",
								"vi": "Trước khi chiến tranh lớn ồn ào, có một mùa hè vàng: một robot mất tiếng, một cô gái mất chỗ đứng, và một chiếc xe biết nghe radio như người biết nghe tim"
							}]
						}
					},
					{
						"id": "b1-fall",
						"image": "/illustrations/b1-01.jpg?v=la",
						"file": "b1-page-01",
						"title": {
							"vi": "Rơi xuống",
							"en": "He Fell"
						},
						"text": {
							"preschool": {
								"vi": "Robot vàng rơi. Đêm tối. Cậu đau. Cậu núp. Phải giấu.",
								"en": "The yellow robot fell. Night was dark. He hurt. He hid. He had to hide."
							},
							"primary": {
								"vi": "Bumblebee rơi từ trời xuống rừng. Cậu bị thương. Cậu không nói được. Cậu phải trốn những robot dữ.",
								"en": "Bumblebee fell from the sky into the forest. He was hurt. He could not speak. He had to hide from the mean robots."
							},
							"intermediate": {
								"vi": "Chiến tranh trên Cybertron đẩy Bumblebee xuống Trái Đất. Cậu mất tiếng. Chỉ còn một mắt sáng trong khói đêm.",
								"en": "The war on Cybertron threw Bumblebee down to Earth. He lost his voice. Only one eye still glowed in the night smoke."
							},
							"senior": {
								"vi": "Người ta gửi đi một vệ sĩ, và đất chỉ nhận một đứa trẻ sắt bị gãy. Rừng 1987 nuốt lấy cậu — im lặng, đó là cách Trái Đất giữ bí mật.",
								"en": "They sent a scout, and the ground received a broken iron child. The 1987 woods swallowed him — silence is how Earth keeps a secret."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "fell",
									"vi": "ngã"
								},
								{
									"en": "The yellow robot fell",
									"vi": "Robot vàng rơi"
								},
								{
									"en": "Night was dark",
									"vi": "Đêm tối"
								},
								{
									"en": "He had to hide",
									"vi": "Phải giấu"
								},
								{
									"en": "yellow robot",
									"vi": "robot vàng"
								}
							],
							"primary": [
								{
									"en": "fell",
									"vi": "ngã"
								},
								{
									"en": "Bumblebee fell from the sky into the forest",
									"vi": "Bumblebee rơi từ trời xuống rừng"
								},
								{
									"en": "He was hurt",
									"vi": "Cậu bị thương"
								},
								{
									"en": "He could not speak",
									"vi": "Cậu hông nói được"
								},
								{
									"en": "He had to hide from the mean robots",
									"vi": "Cậu phải trốn những robot dữ"
								},
								{
									"en": "mean robots",
									"vi": "robot dữ"
								}
							],
							"intermediate": [
								{
									"en": "The war on Cybertron threw Bumblebee down to Earth",
									"vi": "Chiến tranh trên Cybertron đẩy Bumblebee xuống Trái Đất"
								},
								{
									"en": "He lost his voice",
									"vi": "Cậu mất tiếng"
								},
								{
									"en": "Only one eye still glowed in the night smoke",
									"vi": "Chỉ còn một mắt sáng trong khói đêm"
								}
							],
							"senior": [{
								"en": "They sent a scout, and the ground received a broken iron child",
								"vi": "Người ta gửi đi một vệ sĩ, và đất chỉ nhận một đứa trẻ sắt bị gãy"
							}, {
								"en": "The 1987 woods swallowed him — silence is how Earth keeps a secret",
								"vi": "Rừng 1987 nuốt lấy cậu — im lặng, đó là cách Trái Đất giữ bí mật"
							}]
						}
					},
					{
						"id": "b1-junk",
						"image": "/illustrations/b1-02.jpg?v=la",
						"file": "b1-page-02",
						"title": {
							"vi": "Bãi xe",
							"en": "The Junkyard"
						},
						"text": {
							"preschool": {
								"vi": "Charlie muốn xe. Charlie thấy xe vàng. Xe cũ. Charlie mua. Vui lắm.",
								"en": "Charlie wanted a car. Charlie saw a yellow car. The car was old. Charlie bought it. So fun."
							},
							"primary": {
								"vi": "Charlie đi bãi xe cũ. Cô thấy một Camaro vàng bụi. Rẻ. Cô kéo xe về nhà. Cô chưa biết xe ấy sống.",
								"en": "Charlie went to the junkyard. She saw a dusty yellow Camaro. It was cheap. She pulled the car home. She did not know the car was alive yet."
							},
							"intermediate": {
								"vi": "Trong đống sắt, Charlie chọn đúng thứ không phải đồ chơi. Camaro vàng — bí mật đang ngủ, giá bằng một mùa hè.",
								"en": "In a pile of steel, Charlie picked the one thing that was not a toy. A yellow Camaro — a sleeping secret, priced like one summer."
							},
							"senior": {
								"vi": "Bãi xe là nơi người ta vứt chuyện chưa xong. Charlie — vừa đủ lớn để lái, vừa đủ tổn để cần một chỗ ngồi — chọn chiếc vàng như chọn một lời hứa.",
								"en": "A junkyard is where unfinished stories are left. Charlie — old enough to drive, hurt enough to need a seat — chose the yellow one the way you choose a promise."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Charlie wanted a car",
									"vi": "Charlie muốn xe"
								},
								{
									"en": "Charlie saw a yellow car",
									"vi": "Charlie thấy xe vàng"
								},
								{
									"en": "The car was old",
									"vi": "Xe cũ"
								},
								{
									"en": "Charlie bought it",
									"vi": "Charlie mua"
								},
								{
									"en": "so fun",
									"vi": "vui lắm"
								},
								{
									"en": "yellow car",
									"vi": "xe vàng"
								}
							],
							"primary": [
								{
									"en": "Charlie went to the junkyard",
									"vi": "Charlie đi bãi xe cũ"
								},
								{
									"en": "She saw a dusty yellow Camaro",
									"vi": "Cô thấy một Camaro vàng bụi"
								},
								{
									"en": "It was cheap",
									"vi": "Rẻ"
								},
								{
									"en": "She pulled the car home",
									"vi": "Cô kéo xe về nhà"
								},
								{
									"en": "She did not know the car was alive yet",
									"vi": "Cô chưa biết xe ấy sống"
								},
								{
									"en": "the junkyard",
									"vi": "bãi xe"
								}
							],
							"intermediate": [{
								"en": "In a pile of steel, Charlie picked the one thing that was not a toy",
								"vi": "Trong đống sắt, Charlie chọn đúng thứ không phải đồ chơi"
							}, {
								"en": "A yellow Camaro — a sleeping secret, priced like one summer",
								"vi": "Camaro vàng — bí mật đang ngủ, giá bằng một mùa hè"
							}],
							"senior": [{
								"en": "A junkyard is where unfinished stories are left",
								"vi": "Bãi xe là nơi người ta vứt chuyện chưa xong"
							}, {
								"en": "Charlie — old enough to drive, hurt enough to need a seat — chose the yellow one the way you choose a promise",
								"vi": "Charlie — vừa đủ lớn để lái, vừa đủ tổn để cần một chỗ ngồi — chọn chiếc vàng như chọn một lời hứa"
							}]
						}
					},
					{
						"id": "b1-awake",
						"image": "/illustrations/b1-03.jpg?v=la",
						"file": "b1-page-03",
						"title": {
							"vi": "Thức",
							"en": "He Wakes"
						},
						"text": {
							"preschool": {
								"vi": "Xe vàng dậy. Xe thành robot. Charlie sợ. Rồi Charlie cười. Bạn mới.",
								"en": "The yellow car woke up. The car became a robot. Charlie was scared. Then Charlie smiled. A new friend."
							},
							"primary": {
								"vi": "Trong garage đêm, Camaro vàng đứng dậy. Bumblebee to và hiền. Charlie sợ một cái, rồi cô hiểu: cậu không muốn hại.",
								"en": "In the garage at night, the yellow Camaro stood up. Bumblebee was big and kind. Charlie was scared for a second, then she understood: he did not want to hurt her."
							},
							"intermediate": {
								"vi": "Sắt xếp lại thành người. Charlie lùi một bước — rồi bước tới. Sợ biến thành tò mò, tò mò biến thành bạn.",
								"en": "Steel folded into a person. Charlie stepped back — then stepped in. Fear became curiosity, and curiosity became a friend."
							},
							"senior": {
								"vi": "Có thứ thức trong garage không xin phép. Charlie không gọi cảnh sát. Cô gọi tên. Đôi khi đó là cách thế giới máy móc được phép ở lại.",
								"en": "Something woke in the garage without asking. Charlie did not call the police. She called him a name. Sometimes that is how a machine world is allowed to stay."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "smiled",
									"vi": "cười"
								},
								{
									"en": "The yellow car woke up",
									"vi": "Xe vàng dậy"
								},
								{
									"en": "The car became a robot",
									"vi": "Xe thành robot"
								},
								{
									"en": "Charlie was scared",
									"vi": "Charlie sợ"
								},
								{
									"en": "Then Charlie smiled",
									"vi": "Rồi Charlie cười"
								},
								{
									"en": "A new friend",
									"vi": "Bạn mới"
								},
								{
									"en": "was scared",
									"vi": "sợ"
								},
								{
									"en": "yellow car",
									"vi": "xe vàng"
								}
							],
							"primary": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "In the garage at night, the yellow Camaro stood up",
									"vi": "Trong garage đêm, Camaro vàng đứng dậy"
								},
								{
									"en": "Bumblebee was big and kind",
									"vi": "Bumblebee to và hiền"
								},
								{
									"en": "Charlie was scared for a second, then she understood: he did not want to hurt her",
									"vi": "Charlie sợ một cái, rồi cô hiểu: cậu hông muốn hại"
								},
								{
									"en": "was scared",
									"vi": "sợ"
								},
								{
									"en": "did not want",
									"vi": "hông muốn"
								}
							],
							"intermediate": [
								{
									"en": "Steel folded into a person",
									"vi": "Sắt xếp lại thành người"
								},
								{
									"en": "Charlie stepped back — then stepped in",
									"vi": "Charlie lùi một bước — rồi bước tới"
								},
								{
									"en": "Fear became curiosity, and curiosity became a friend",
									"vi": "Sợ biến thành tò mò, tò mò biến thành bạn"
								},
								{
									"en": "became a friend",
									"vi": "thành bạn"
								}
							],
							"senior": [
								{
									"en": "Something woke in the garage without asking",
									"vi": "Có thứ thức trong garage không xin phép"
								},
								{
									"en": "Charlie did not call the police",
									"vi": "Charlie không gọi cảnh sát"
								},
								{
									"en": "She called him a name",
									"vi": "Cô gọi tên"
								},
								{
									"en": "Sometimes that is how a machine world is allowed to stay",
									"vi": "Đôi khi đó là cách thế giới máy móc được phép ở lại"
								}
							]
						}
					},
					{
						"id": "b1-radio",
						"image": "/illustrations/b1-04.jpg?v=la",
						"file": "b1-page-04",
						"title": {
							"vi": "Radio",
							"en": "The Radio"
						},
						"text": {
							"preschool": {
								"vi": "Bee hông nói. Bee bật radio. Nhạc. Charlie hiểu. Giỏi lắm.",
								"en": "Bee did not talk. Bee played the radio. Songs. Charlie understood. So well done."
							},
							"primary": {
								"vi": "Bumblebee mất tiếng. Cậu bật radio để nói. Charlie nghe bài hát và hiểu cậu muốn gì. Hai người tập nói bằng nhạc.",
								"en": "Bumblebee had no voice. He played the radio to talk. Charlie heard the songs and knew what he meant. They learned to speak with music."
							},
							"intermediate": {
								"vi": "Không cổ họng, chỉ có đài. Từng câu hát thành câu trả lời. Charlie học một ngôn ngữ không có chữ — chỉ có tần số.",
								"en": "No throat, only a radio. Each song became an answer. Charlie learned a language with no letters — only stations."
							},
							"senior": {
								"vi": "Mất tiếng không phải mất lời. Bee cắt nhạc như người cắt hơi thở. Charlie — cô gái năm 1987 — trở thành người dịch một trái tim bằng cassette.",
								"en": "Losing a voice is not losing speech. Bee cut songs the way people cut breath. Charlie — a girl of 1987 — became the translator of a heart on cassette."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Bee did not talk",
									"vi": "Bee hông nói"
								},
								{
									"en": "Bee played the radio",
									"vi": "Bee bật radio"
								},
								{
									"en": "Charlie understood",
									"vi": "Charlie hiểu"
								},
								{
									"en": "So well done",
									"vi": "Giỏi lắm"
								},
								{
									"en": "did not talk",
									"vi": "hông nói"
								},
								{
									"en": "played the radio",
									"vi": "bật radio"
								}
							],
							"primary": [
								{
									"en": "Bumblebee had no voice",
									"vi": "Bumblebee mất tiếng"
								},
								{
									"en": "He played the radio to talk",
									"vi": "Cậu bật radio để nói"
								},
								{
									"en": "Charlie heard the songs and knew what he meant",
									"vi": "Charlie nghe bài hát và hiểu cậu muốn gì"
								},
								{
									"en": "They learned to speak with music",
									"vi": "Hai người tập nói bằng nhạc"
								},
								{
									"en": "played the radio",
									"vi": "bật radio"
								}
							],
							"intermediate": [
								{
									"en": "No throat, only a radio",
									"vi": "Không cổ họng, chỉ có đài"
								},
								{
									"en": "Each song became an answer",
									"vi": "Từng câu hát thành câu trả lời"
								},
								{
									"en": "Charlie learned a language with no letters — only stations",
									"vi": "Charlie học một ngôn ngữ không có chữ — chỉ có tần số"
								}
							],
							"senior": [
								{
									"en": "Losing a voice is not losing speech",
									"vi": "Mất tiếng không phải mất lời"
								},
								{
									"en": "Bee cut songs the way people cut breath",
									"vi": "Bee cắt nhạc như người cắt hơi thở"
								},
								{
									"en": "Charlie — a girl of 1987 — became the translator of a heart on cassette",
									"vi": "Charlie — cô gái năm 1987 — trở thành người dịch một trái tim bằng cassette"
								}
							]
						}
					},
					{
						"id": "b1-charlie",
						"image": "/illustrations/b1-05.jpg?v=la",
						"file": "b1-page-05",
						"title": {
							"vi": "Charlie",
							"en": "Charlie"
						},
						"text": {
							"preschool": {
								"vi": "Charlie buồn. Ba đi rồi. Bee ở đó. Charlie cười xíu. Đỡ rồi.",
								"en": "Charlie was sad. Dad was gone. Bee was there. Charlie smiled a little. That helped."
							},
							"primary": {
								"vi": "Charlie mười tám. Cô nhớ ba. Nhà hơi trống. Bumblebee đậu trước cửa. Cô không còn ngồi một mình.",
								"en": "Charlie was eighteen. She missed her dad. The house felt empty. Bumblebee parked out front. She did not sit alone anymore."
							},
							"intermediate": {
								"vi": "Tuổi mười tám là cửa. Charlie đứng đó, chưa vào cũng chưa ra. Bee không chữa nỗi nhớ — cậu chỉ ở, và ở đã là đủ.",
								"en": "Eighteen is a doorway. Charlie stood in it, not in and not out. Bee did not fix missing someone — he only stayed, and staying was enough."
							},
							"senior": {
								"vi": "Có thứ trống không xe nào lấp. Bee không thay ba. Cậu chỉ làm cái ghế bên cạnh đỡ lạnh. Năm 1987, đôi khi đó là cả một phép lạ.",
								"en": "Some emptiness no car can fill. Bee did not replace a father. He only made the seat beside her less cold. In 1987, sometimes that was the whole miracle."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "smiled",
									"vi": "cười"
								},
								{
									"en": "Charlie was sad",
									"vi": "Charlie buồn"
								},
								{
									"en": "Dad was gone",
									"vi": "Ba đi rồi"
								},
								{
									"en": "Bee was there",
									"vi": "Bee ở đó"
								},
								{
									"en": "Charlie smiled a little",
									"vi": "Charlie cười xíu"
								},
								{
									"en": "That helped",
									"vi": "Đỡ rồi"
								}
							],
							"primary": [
								{
									"en": "empty",
									"vi": "vắng"
								},
								{
									"en": "Charlie was eighteen",
									"vi": "Charlie mười tám"
								},
								{
									"en": "She missed her dad",
									"vi": "Cô nhớ ba"
								},
								{
									"en": "The house felt empty",
									"vi": "Nhà hơi trống"
								},
								{
									"en": "Bumblebee parked out front",
									"vi": "Bumblebee đậu trước cửa"
								},
								{
									"en": "She did not sit alone anymore",
									"vi": "Cô hông còn ngồi một mình"
								}
							],
							"intermediate": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "Eighteen is a doorway",
									"vi": "Tuổi mười tám là cửa"
								},
								{
									"en": "Charlie stood in it, not in and not out",
									"vi": "Charlie đứng đó, chưa vào cũng chưa ra"
								},
								{
									"en": "Bee did not fix missing someone — he only stayed, and staying was enough",
									"vi": "Bee không chữa nỗi nhớ — cậu chỉ ở, và ở đã là đủ"
								}
							],
							"senior": [
								{
									"en": "Some emptiness no car can fill",
									"vi": "Có thứ trống không xe nào lấp"
								},
								{
									"en": "Bee did not replace a father",
									"vi": "Bee không thay ba"
								},
								{
									"en": "He only made the seat beside her less cold",
									"vi": "Cậu chỉ làm cái ghế bên cạnh đỡ lạnh"
								},
								{
									"en": "In 1987, sometimes that was the whole miracle",
									"vi": "Năm 1987, đôi khi đó là cả một phép lạ"
								}
							]
						}
					},
					{
						"id": "b1-hunt",
						"image": "/illustrations/b1-06.jpg?v=la",
						"file": "b1-page-06",
						"title": {
							"vi": "Người ta tìm",
							"en": "They Hunt"
						},
						"text": {
							"preschool": {
								"vi": "Robot dữ tìm Bee. Người lạ tới. Charlie giấu. Bee núp. Phải lo.",
								"en": "Mean robots looked for Bee. Strangers came. Charlie hid him. Bee hid. Be careful."
							},
							"primary": {
								"vi": "Decepticon tới Trái Đất tìm Bumblebee. Còn có người lính nữa. Charlie phải giấu bạn. Cô không kể với ai.",
								"en": "Decepticons came to Earth looking for Bumblebee. There were soldiers too. Charlie had to hide her friend. She did not tell anyone."
							},
							"intermediate": {
								"vi": "Hai cuộc săn: máy móc dữ, và người muốn giữ bí mật cho riêng họ. Charlie đứng giữa — chọn Bee.",
								"en": "Two hunts: mean machines, and people who wanted the secret for themselves. Charlie stood in the middle — and chose Bee."
							},
							"senior": {
								"vi": "Thế giới lớn luôn tới nhà nhỏ hỏi: mày giấu ai. Charlie không trả lời đúng. Cô trả lời bằng cách đứng trước cửa garage.",
								"en": "The big world always comes to a small house and asks: who are you hiding. Charlie did not answer correctly. She answered by standing in front of the garage door."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Mean robots looked for Bee",
									"vi": "Robot dữ tìm Bee"
								},
								{
									"en": "Strangers came",
									"vi": "Người lạ tới"
								},
								{
									"en": "Charlie hid him",
									"vi": "Charlie giấu"
								},
								{
									"en": "Be careful",
									"vi": "Phải lo"
								},
								{
									"en": "mean robots",
									"vi": "robot dữ"
								}
							],
							"primary": [
								{
									"en": "Decepticons came to Earth looking for Bumblebee",
									"vi": "Decepticon tới Trái Đất tìm Bumblebee"
								},
								{
									"en": "There were soldiers too",
									"vi": "Còn có người lính nữa"
								},
								{
									"en": "Charlie had to hide her friend",
									"vi": "Charlie phải giấu bạn"
								},
								{
									"en": "She did not tell anyone",
									"vi": "Cô hông kể với ai"
								}
							],
							"intermediate": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "Two hunts: mean machines, and people who wanted the secret for themselves",
									"vi": "Hai cuộc săn: máy móc dữ, và người muốn giữ bí mật cho riêng họ"
								},
								{
									"en": "Charlie stood in the middle — and chose Bee",
									"vi": "Charlie đứng giữa — chọn Bee"
								}
							],
							"senior": [
								{
									"en": "The big world always comes to a small house and asks: who are you hiding",
									"vi": "Thế giới lớn luôn tới nhà nhỏ hỏi: mày giấu ai"
								},
								{
									"en": "Charlie did not answer correctly",
									"vi": "Charlie không trả lời đúng"
								},
								{
									"en": "She answered by standing in front of the garage door",
									"vi": "Cô trả lời bằng cách đứng trước cửa garage"
								}
							]
						}
					},
					{
						"id": "b1-guard",
						"image": "/illustrations/b1-07.jpg?v=la",
						"file": "b1-page-07",
						"title": {
							"vi": "Che",
							"en": "He Guards"
						},
						"text": {
							"preschool": {
								"vi": "Bee đứng trước. Charlie ở sau. Bee hông chạy. Bee che. Giỏi lắm.",
								"en": "Bee stood in front. Charlie stayed behind. Bee did not run. Bee covered her. So well done."
							},
							"primary": {
								"vi": "Bumblebee bước ra trước Charlie. Cậu to. Cậu hiền nhưng không lùi. Cậu nói bằng người: không được đụng bạn tao.",
								"en": "Bumblebee stepped in front of Charlie. He was big. He was kind, but he did not step back. His body said: you do not touch my friend."
							},
							"intermediate": {
								"vi": "Vệ sĩ không cần tiếng. Bee chỉ cần đứng đúng chỗ. Charlie, lần đầu, được ai đó chọn che.",
								"en": "A guard does not need a voice. Bee only needed to stand in the right place. Charlie, for the first time, was the one someone chose to cover."
							},
							"senior": {
								"vi": "Người ta dạy robot chiến. Bee học một việc nhỏ hơn: biến ngực thành tường. Đêm ấy Charlie hiểu — bạn không phải thứ mình sửa, là thứ mình được phép đứng sau.",
								"en": "They taught robots war. Bee learned a smaller job: to turn a chest into a wall. That night Charlie understood — a friend is not what you fix, it is what you are allowed to stand behind."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "Bee stood in front",
									"vi": "Bee đứng trước"
								},
								{
									"en": "Charlie stayed behind",
									"vi": "Charlie ở sau"
								},
								{
									"en": "Bee did not run",
									"vi": "Bee hông chạy"
								},
								{
									"en": "Bee covered her",
									"vi": "Bee che"
								},
								{
									"en": "So well done",
									"vi": "Giỏi lắm"
								},
								{
									"en": "stood in front",
									"vi": "đứng trước"
								},
								{
									"en": "did not run",
									"vi": "hông chạy"
								}
							],
							"primary": [
								{
									"en": "Bumblebee stepped in front of Charlie",
									"vi": "Bumblebee bước ra trước Charlie"
								},
								{
									"en": "He was big",
									"vi": "Cậu to"
								},
								{
									"en": "He was kind, but he did not step back",
									"vi": "Cậu hiền nhưng hông lùi"
								},
								{
									"en": "His body said: you do not touch my friend",
									"vi": "Cậu nói bằng người: hông được đụng bạn tao"
								},
								{
									"en": "was kind",
									"vi": "hiền"
								}
							],
							"intermediate": [
								{
									"en": "A guard does not need a voice",
									"vi": "Vệ sĩ không cần tiếng"
								},
								{
									"en": "Bee only needed to stand in the right place",
									"vi": "Bee chỉ cần đứng đúng chỗ"
								},
								{
									"en": "Charlie, for the first time, was the one someone chose to cover",
									"vi": "Charlie, lần đầu, được ai đó chọn che"
								}
							],
							"senior": [
								{
									"en": "They taught robots war",
									"vi": "Người ta dạy robot chiến"
								},
								{
									"en": "Bee learned a smaller job: to turn a chest into a wall",
									"vi": "Bee học một việc nhỏ hơn: biến ngực thành tường"
								},
								{
									"en": "That night Charlie understood — a friend is not what you fix, it is what you are allowed to stand behind",
									"vi": "Đêm ấy Charlie hiểu — bạn không phải thứ mình sửa, là thứ mình được phép đứng sau"
								}
							]
						}
					},
					{
						"id": "b1-run",
						"image": "/illustrations/b1-08.jpg?v=la",
						"file": "b1-page-08",
						"title": {
							"vi": "Chạy",
							"en": "They Run"
						},
						"text": {
							"preschool": {
								"vi": "Charlie lái. Bee chạy. Đèn sáng. Biển tối. Đi tiếp nha.",
								"en": "Charlie drove. Bee ran. Lights were bright. The sea was dark. Keep going."
							},
							"primary": {
								"vi": "Họ chạy trên đường biển đêm. Charlie lái Camaro vàng. Bumblebee bảo vệ. Họ không dừng. Họ tin nhau.",
								"en": "They ran on the night coast road. Charlie drove the yellow Camaro. Bumblebee protected her. They did not stop. They trusted each other."
							},
							"intermediate": {
								"vi": "Đường 1987 ướt đèn. Hai người — một người cầm vô lăng, một người cầm chiến tranh — chạy như một.",
								"en": "The 1987 road was wet with lights. Two people — one on the wheel, one on the war — ran as one."
							},
							"senior": {
								"vi": "Chạy không phải trốn mãi. Là chọn hướng. Charlie đạp ga; Bee đạp khoảng cách giữa cô và những kẻ muốn lấy cậu. Đó là tình bạn có tốc độ.",
								"en": "Running is not hiding forever. It is choosing a direction. Charlie pressed the pedal; Bee pressed the distance between her and those who wanted him. That is friendship at speed."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Charlie drove",
									"vi": "Charlie lái"
								},
								{
									"en": "Lights were bright",
									"vi": "Đèn sáng"
								},
								{
									"en": "The sea was dark",
									"vi": "Biển tối"
								},
								{
									"en": "Keep going",
									"vi": "Đi tiếp nha"
								}
							],
							"primary": [
								{
									"en": "They ran on the night coast road",
									"vi": "Họ chạy trên đường biển đêm"
								},
								{
									"en": "Charlie drove the yellow Camaro",
									"vi": "Charlie lái Camaro vàng"
								},
								{
									"en": "Bumblebee protected her",
									"vi": "Bumblebee bảo vệ"
								},
								{
									"en": "They did not stop",
									"vi": "Họ hông dừng"
								},
								{
									"en": "They trusted each other",
									"vi": "Họ tin nhau"
								}
							],
							"intermediate": [{
								"en": "The 1987 road was wet with lights",
								"vi": "Đường 1987 ướt đèn"
							}, {
								"en": "Two people — one on the wheel, one on the war — ran as one",
								"vi": "Hai người — một người cầm vô lăng, một người cầm chiến tranh — chạy như một"
							}],
							"senior": [
								{
									"en": "Running is not hiding forever",
									"vi": "Chạy không phải trốn mãi"
								},
								{
									"en": "It is choosing a direction",
									"vi": "Là chọn hướng"
								},
								{
									"en": "Charlie pressed the pedal; Bee pressed the distance between her and those who wanted him",
									"vi": "Charlie đạp ga; Bee đạp khoảng cách giữa cô và những kẻ muốn lấy cậu"
								},
								{
									"en": "That is friendship at speed",
									"vi": "Đó là tình bạn có tốc độ"
								}
							]
						}
					},
					{
						"id": "b1-free",
						"image": "/illustrations/b1-09.jpg?v=la",
						"file": "b1-page-09",
						"title": {
							"vi": "Tự do",
							"en": "Free"
						},
						"text": {
							"preschool": {
								"vi": "Xong rồi. Bee khỏe. Charlie cười. Trời sáng. Giỏi lắm.",
								"en": "It was over. Bee was strong. Charlie smiled. The sky was bright. So well done."
							},
							"primary": {
								"vi": "Họ thắng. Bumblebee được tự do. Charlie đứng cạnh cậu trên vách đá. Biển yên. Cậu không phải núp nữa.",
								"en": "They won. Bumblebee was free. Charlie stood beside him on the cliff. The sea was calm. He did not have to hide anymore."
							},
							"intermediate": {
								"vi": "Bí mật ra ánh sáng mà không bị lấy. Bee đứng như người, không như đồ. Charlie — lần đầu — thấy bạn mình nguyên.",
								"en": "The secret came into the light and was not taken. Bee stood as a person, not as a thing. Charlie — for the first time — saw her friend whole."
							},
							"senior": {
								"vi": "Tự do của một cỗ máy là được đứng mà không bị mở. Tự do của Charlie là được ở cạnh mà không phải giải thích. Bình minh chỉ việc chứng kiến.",
								"en": "Freedom for a machine is to stand without being opened. Freedom for Charlie is to stay beside him without explaining. Dawn only had to witness."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "smiled",
									"vi": "cười"
								},
								{
									"en": "It was over",
									"vi": "Xong rồi"
								},
								{
									"en": "Bee was strong",
									"vi": "Bee khỏe"
								},
								{
									"en": "Charlie smiled",
									"vi": "Charlie cười"
								},
								{
									"en": "The sky was bright",
									"vi": "Trời sáng"
								},
								{
									"en": "So well done",
									"vi": "Giỏi lắm"
								}
							],
							"primary": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "They won",
									"vi": "Họ thắng"
								},
								{
									"en": "Bumblebee was free",
									"vi": "Bumblebee được tự do"
								},
								{
									"en": "Charlie stood beside him on the cliff",
									"vi": "Charlie đứng cạnh cậu trên vách đá"
								},
								{
									"en": "The sea was calm",
									"vi": "Biển yên"
								},
								{
									"en": "He did not have to hide anymore",
									"vi": "Cậu hông phải núp nữa"
								},
								{
									"en": "was calm",
									"vi": "yên"
								}
							],
							"intermediate": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "The secret came into the light and was not taken",
									"vi": "Bí mật ra ánh sáng mà không bị lấy"
								},
								{
									"en": "Bee stood as a person, not as a thing",
									"vi": "Bee đứng như người, không như đồ"
								},
								{
									"en": "Charlie — for the first time — saw her friend whole",
									"vi": "Charlie — lần đầu — thấy bạn mình nguyên"
								}
							],
							"senior": [
								{
									"en": "Freedom for a machine is to stand without being opened",
									"vi": "Tự do của một cỗ máy là được đứng mà không bị mở"
								},
								{
									"en": "Freedom for Charlie is to stay beside him without explaining",
									"vi": "Tự do của Charlie là được ở cạnh mà không phải giải thích"
								},
								{
									"en": "Dawn only had to witness",
									"vi": "Bình minh chỉ việc chứng kiến"
								}
							]
						}
					},
					{
						"id": "b1-drive",
						"image": "/illustrations/b1-10.jpg?v=la",
						"file": "b1-page-10",
						"title": {
							"vi": "Lái",
							"en": "Drive"
						},
						"text": {
							"preschool": {
								"vi": "Charlie lái. Xe vàng. Biển đẹp. Bạn hiền. Ngủ ngon nha.",
								"en": "Charlie drove. Yellow car. Pretty sea. Kind friend. Night night."
							},
							"primary": {
								"vi": "Charlie lái dọc biển lúc chiều. Bumblebee là xe, là bạn. Họ không nói nhiều. Đủ rồi. Ngủ ngon nha.",
								"en": "Charlie drove along the sea in the evening. Bumblebee was the car, and the friend. They did not talk much. That was enough. Night night."
							},
							"intermediate": {
								"vi": "Camaro vàng cắt nắng cuối. Không cần radio lớn. Có đường, có bạn, có chỗ về. Hết một mùa hè.",
								"en": "The yellow Camaro cut the last light. No need for a loud radio. There was a road, a friend, a place to go back to. One summer closed."
							},
							"senior": {
								"vi": "Phim khép bằng một đường biển, vì đó là thứ Trái Đất cho những kẻ đã chiến: không tượng, không lệnh — chỉ một chỗ ngồi và ai đó chịu lái cùng. Ngủ được rồi.",
								"en": "The film closes on a coast road, because that is what Earth gives those who have fought: no statue, no order — only a seat and someone willing to drive. Sleep could come."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Charlie drove",
									"vi": "Charlie lái"
								},
								{
									"en": "Yellow car",
									"vi": "Xe vàng"
								},
								{
									"en": "Pretty sea",
									"vi": "Biển đẹp"
								},
								{
									"en": "Kind friend",
									"vi": "Bạn hiền"
								},
								{
									"en": "Night night",
									"vi": "Ngủ ngon nha"
								}
							],
							"primary": [
								{
									"en": "Charlie drove along the sea in the evening",
									"vi": "Charlie lái dọc biển lúc chiều"
								},
								{
									"en": "Bumblebee was the car, and the friend",
									"vi": "Bumblebee là xe, là bạn"
								},
								{
									"en": "They did not talk much",
									"vi": "Họ hông nói nhiều"
								},
								{
									"en": "That was enough",
									"vi": "Đủ rồi"
								},
								{
									"en": "Night night",
									"vi": "Ngủ ngon nha"
								},
								{
									"en": "did not talk",
									"vi": "hông nói"
								}
							],
							"intermediate": [
								{
									"en": "The yellow Camaro cut the last light",
									"vi": "Camaro vàng cắt nắng cuối"
								},
								{
									"en": "No need for a loud radio",
									"vi": "Không cần radio lớn"
								},
								{
									"en": "There was a road, a friend, a place to go back to",
									"vi": "Có đường, có bạn, có chỗ về"
								},
								{
									"en": "One summer closed",
									"vi": "Hết một mùa hè"
								}
							],
							"senior": [{
								"en": "The film closes on a coast road, because that is what Earth gives those who have fought: no statue, no order — only a seat and someone willing to drive",
								"vi": "Phim khép bằng một đường biển, vì đó là thứ Trái Đất cho những kẻ đã chiến: không tượng, không lệnh — chỉ một chỗ ngồi và ai đó chịu lái cùng"
							}, {
								"en": "Sleep could come",
								"vi": "Ngủ được rồi"
							}]
						}
					}
				]
			}]
		},
		{
			"id": "sonic",
			"vi": "Sonic",
			"en": "Sonic",
			"coverTitle": {
				"vi": "Truyện Sonic",
				"en": "Sonic's Story"
			},
			"seasons": [{
				"id": "so1",
				"vi": "Phim 1",
				"en": "Movie 1",
				"tagline": {
					"vi": "Nhím xanh ở thị trấn nhỏ",
					"en": "A blue hedgehog in a small town"
				},
				"pages": [
					{
						"id": "so1-cover",
						"image": "/illustrations/so1-00.jpg?v=la",
						"file": "so1-page-00",
						"title": {
							"vi": "Sonic",
							"en": "Sonic"
						},
						"text": {
							"preschool": {
								"vi": "Đây là chuyện Sonic. Nhím xanh. Chạy nhanh lắm. Có bạn Tom.",
								"en": "This is Sonic. A blue hedgehog. He runs so fast. There is a friend named Tom."
							},
							"primary": {
								"vi": "Đây là phim Sonic. Sonic sống bí mật ở thị trấn nhỏ. Bác sĩ dữ tìm cậu. Sheriff Tom giúp cậu.",
								"en": "This is the Sonic movie. Sonic lives in secret in a small town. A mean doctor looks for him. Sheriff Tom helps him."
							},
							"intermediate": {
								"vi": "Sonic — nhím xanh từ thế giới khác — trốn ở Green Hills. Tốc độ của cậu đánh thức Robotnik. Tom Wachowski phải chọn: luật, hay bạn.",
								"en": "Sonic — a blue hedgehog from another world — hides in Green Hills. His speed wakes Robotnik. Tom Wachowski must choose: the law, or a friend."
							},
							"senior": {
								"vi": "Phim mở bằng một thị trấn quá yên cho một đứa trẻ có sấm trong chân. Jim Carrey — bác sĩ muốn nhốt tốc độ vào lọ. Tom — người lớn lần đầu thấy thế giới có vòng vàng.",
								"en": "The film opens on a town too quiet for a child with thunder in his feet. Jim Carrey — a doctor who wants speed in a jar. Tom — a grown-up seeing golden rings for the first time."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "This is Sonic",
									"vi": "Đây là chuyện Sonic"
								},
								{
									"en": "A blue hedgehog",
									"vi": "Nhím xanh"
								},
								{
									"en": "He runs so fast",
									"vi": "Chạy nhanh lắm"
								},
								{
									"en": "There is a friend named Tom",
									"vi": "Có bạn Tom"
								},
								{
									"en": "blue hedgehog",
									"vi": "nhím xanh"
								},
								{
									"en": "runs so fast",
									"vi": "chạy nhanh lắm"
								}
							],
							"primary": [
								{
									"en": "This is the Sonic movie",
									"vi": "Đây là phim Sonic"
								},
								{
									"en": "Sonic lives in secret in a small town",
									"vi": "Sonic sống bí mật ở thị trấn nhỏ"
								},
								{
									"en": "A mean doctor looks for him",
									"vi": "Bác sĩ dữ tìm cậu"
								},
								{
									"en": "Sheriff Tom helps him",
									"vi": "Sheriff Tom giúp cậu"
								},
								{
									"en": "small town",
									"vi": "thị trấn nhỏ"
								}
							],
							"intermediate": [
								{
									"en": "Sonic — a blue hedgehog from another world — hides in Green Hills",
									"vi": "Sonic — nhím xanh từ thế giới khác — trốn ở Green Hills"
								},
								{
									"en": "His speed wakes Robotnik",
									"vi": "Tốc độ của cậu đánh thức Robotnik"
								},
								{
									"en": "Tom Wachowski must choose: the law, or a friend",
									"vi": "Tom Wachowski phải chọn: luật, hay bạn"
								},
								{
									"en": "blue hedgehog",
									"vi": "nhím xanh"
								}
							],
							"senior": [
								{
									"en": "The film opens on a town too quiet for a child with thunder in his feet",
									"vi": "Phim mở bằng một thị trấn quá yên cho một đứa trẻ có sấm trong chân"
								},
								{
									"en": "Jim Carrey — a doctor who wants speed in a jar",
									"vi": "Jim Carrey — bác sĩ muốn nhốt tốc độ vào lọ"
								},
								{
									"en": "Tom — a grown-up seeing golden rings for the first time",
									"vi": "Tom — người lớn lần đầu thấy thế giới có vòng vàng"
								}
							]
						}
					},
					{
						"id": "so1-hide",
						"image": "/illustrations/so1-01.jpg?v=la",
						"file": "so1-page-01",
						"title": {
							"vi": "Núp",
							"en": "He Hides"
						},
						"text": {
							"preschool": {
								"vi": "Sonic ở nhà nhỏ. Ăn bánh. Buồn xíu. Phải núp. Chưa được ra.",
								"en": "Sonic stays in a small house. He eats a donut. A little sad. He has to hide. Not time to go out."
							},
							"primary": {
								"vi": "Sonic sống trên gác. Cậu xem bóng chày. Cậu ăn donut. Cậu nhớ nhà. Người ta chưa được thấy cậu.",
								"en": "Sonic lives in an attic. He watches baseball. He eats donuts. He misses home. People must not see him yet."
							},
							"intermediate": {
								"vi": "Gác mái Green Hills là đảo. Sonic đủ nhanh để đi khắp Trái Đất — và đủ cô đơn để ở yên một chỗ.",
								"en": "The Green Hills attic is an island. Sonic is fast enough to cross Earth — and lonely enough to stay still."
							},
							"senior": {
								"vi": "Tốc độ không chữa cô đơn. Cậu ăn đường, xem người ta chơi bóng, và học cách là khách trên hành tinh mình cứu.",
								"en": "Speed does not cure lonely. He eats sugar, watches people play ball, and learns how to be a guest on the planet he saved."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Sonic stays in a small house",
									"vi": "Sonic ở nhà nhỏ"
								},
								{
									"en": "He eats a donut",
									"vi": "Ăn bánh"
								},
								{
									"en": "A little sad",
									"vi": "Buồn xíu"
								},
								{
									"en": "He has to hide",
									"vi": "Phải núp"
								},
								{
									"en": "Not time to go out",
									"vi": "Chưa được ra"
								},
								{
									"en": "time to go",
									"vi": "đi thôi"
								}
							],
							"primary": [
								{
									"en": "Sonic lives in an attic",
									"vi": "Sonic sống trên gác"
								},
								{
									"en": "He watches baseball",
									"vi": "Cậu xem bóng chày"
								},
								{
									"en": "He eats donuts",
									"vi": "Cậu ăn donut"
								},
								{
									"en": "He misses home",
									"vi": "Cậu nhớ nhà"
								},
								{
									"en": "People must not see him yet",
									"vi": "Người ta chưa được thấy cậu"
								}
							],
							"intermediate": [{
								"en": "The Green Hills attic is an island",
								"vi": "Gác mái Green Hills là đảo"
							}, {
								"en": "Sonic is fast enough to cross Earth — and lonely enough to stay still",
								"vi": "Sonic đủ nhanh để đi khắp Trái Đất — và đủ cô đơn để ở yên một chỗ"
							}],
							"senior": [{
								"en": "Speed does not cure lonely",
								"vi": "Tốc độ không chữa cô đơn"
							}, {
								"en": "He eats sugar, watches people play ball, and learns how to be a guest on the planet he saved",
								"vi": "Cậu ăn đường, xem người ta chơi bóng, và học cách là khách trên hành tinh mình cứu"
							}]
						}
					},
					{
						"id": "so1-speed",
						"image": "/illustrations/so1-02.jpg?v=la",
						"file": "so1-page-02",
						"title": {
							"vi": "Quá nhanh",
							"en": "Too Fast"
						},
						"text": {
							"preschool": {
								"vi": "Sonic chạy. Sấm xanh. Đèn sáng. Trời kêu. Ồ!",
								"en": "Sonic ran. Blue thunder. Lights went bright. The sky made a sound. Oh!"
							},
							"primary": {
								"vi": "Sonic chơi bóng một mình. Cậu chạy quá nhanh. Một tia xanh đánh lên trời. Người lớn thấy. Hỏng rồi.",
								"en": "Sonic played ball alone. He ran too fast. A blue flash hit the sky. Grown-ups saw it. Oh no."
							},
							"intermediate": {
								"vi": "Một đêm, cậu không giữ được chân. Sân bóng thành sấm. Tín hiệu bay xa — xa tới tai kẻ đang chờ một phép lạ để nhốt.",
								"en": "One night he could not hold his feet. The field became thunder. The signal flew far — as far as someone waiting for a miracle to cage."
							},
							"senior": {
								"vi": "Cô đơn có cách tự tiết lộ: chạy hết sức. Green Hills sáng như cái nút. Thế giới máy móc ngẩng lên, mỉm cười.",
								"en": "Loneliness has a way of telling on itself: running all-out. Green Hills lit up like a switch. The machine world looked up, and smiled."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Sonic ran",
									"vi": "Sonic chạy"
								},
								{
									"en": "Blue thunder",
									"vi": "Sấm xanh"
								},
								{
									"en": "Lights went bright",
									"vi": "Đèn sáng"
								},
								{
									"en": "The sky made a sound",
									"vi": "Trời kêu"
								}
							],
							"primary": [
								{
									"en": "Sonic played ball alone",
									"vi": "Sonic chơi bóng một mình"
								},
								{
									"en": "He ran too fast",
									"vi": "Cậu chạy quá nhanh"
								},
								{
									"en": "A blue flash hit the sky",
									"vi": "Một tia xanh đánh lên trời"
								},
								{
									"en": "Grown-ups saw it",
									"vi": "Người lớn thấy"
								},
								{
									"en": "too fast",
									"vi": "nhanh quá"
								}
							],
							"intermediate": [
								{
									"en": "One night he could not hold his feet",
									"vi": "Một đêm, cậu không giữ được chân"
								},
								{
									"en": "The field became thunder",
									"vi": "Sân bóng thành sấm"
								},
								{
									"en": "The signal flew far — as far as someone waiting for a miracle to cage",
									"vi": "Tín hiệu bay xa — xa tới tai kẻ đang chờ một phép lạ để nhốt"
								}
							],
							"senior": [
								{
									"en": "smiled",
									"vi": "cười"
								},
								{
									"en": "Loneliness has a way of telling on itself: running all-out",
									"vi": "Cô đơn có cách tự tiết lộ: chạy hết sức"
								},
								{
									"en": "Green Hills lit up like a switch",
									"vi": "Green Hills sáng như cái nút"
								},
								{
									"en": "The machine world looked up, and smiled",
									"vi": "Thế giới máy móc ngẩng lên, mỉm cười"
								}
							]
						}
					},
					{
						"id": "so1-doctor",
						"image": "/illustrations/so1-03.jpg?v=la",
						"file": "so1-page-03",
						"title": {
							"vi": "Bác sĩ",
							"en": "The Doctor"
						},
						"text": {
							"preschool": {
								"vi": "Bác sĩ dữ tới. Tóc dựng. Găng đỏ. Cười lạ. Muốn bắt Sonic.",
								"en": "A mean doctor came. Wild hair. Red gloves. A strange smile. He wanted to catch Sonic."
							},
							"primary": {
								"vi": "Dr. Robotnik tới thị trấn. Ông ta thông minh nhưng không hiền. Ông ta muốn sức mạnh của Sonic. Xe đen đậu đầy đường.",
								"en": "Dr. Robotnik came to town. He was smart but not kind. He wanted Sonic's power. Black trucks filled the road."
							},
							"intermediate": {
								"vi": "Robotnik không phải lính. Ông ta là trò đùa nguy hiểm: tóc, găng, và một cái đầu muốn biến sự sống thành dữ liệu.",
								"en": "Robotnik was not a soldier. He was a dangerous joke: hair, gloves, and a mind that wanted to turn a life into data."
							},
							"senior": {
								"vi": "Jim Carrey chơi bác sĩ như một cơn sốt vui. Đằng sau tiếng cười là ý muốn: nếu chạy được, thì phải thuộc về ông. Thị trấn nhỏ chưa từng thấy kẻ đói như vậy.",
								"en": "Jim Carrey plays the doctor like a joyful fever. Behind the laugh is a want: if it can run, it should belong to him. The small town had never met a hunger like that."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "A mean doctor came",
									"vi": "Bác sĩ dữ tới"
								},
								{
									"en": "Wild hair",
									"vi": "Tóc dựng"
								},
								{
									"en": "Red gloves",
									"vi": "Găng đỏ"
								},
								{
									"en": "A strange smile",
									"vi": "Cười lạ"
								},
								{
									"en": "He wanted to catch Sonic",
									"vi": "Muốn bắt Sonic"
								}
							],
							"primary": [
								{
									"en": "Robotnik came to town",
									"vi": "Robotnik tới thị trấn"
								},
								{
									"en": "He was smart but not kind",
									"vi": "Ông ta thông minh nhưng hông hiền"
								},
								{
									"en": "He wanted Sonic's power",
									"vi": "Ông ta muốn sức mạnh của Sonic"
								},
								{
									"en": "Black trucks filled the road",
									"vi": "Xe đen đậu đầy đường"
								}
							],
							"intermediate": [{
								"en": "Robotnik was not a soldier",
								"vi": "Robotnik không phải lính"
							}, {
								"en": "He was a dangerous joke: hair, gloves, and a mind that wanted to turn a life into data",
								"vi": "Ông ta là trò đùa nguy hiểm: tóc, găng, và một cái đầu muốn biến sự sống thành dữ liệu"
							}],
							"senior": [
								{
									"en": "Jim Carrey plays the doctor like a joyful fever",
									"vi": "Jim Carrey chơi bác sĩ như một cơn sốt vui"
								},
								{
									"en": "Behind the laugh is a want: if it can run, it should belong to him",
									"vi": "Đằng sau tiếng cười là ý muốn: nếu chạy được, thì phải thuộc về ông"
								},
								{
									"en": "The small town had never met a hunger like that",
									"vi": "Thị trấn nhỏ chưa từng thấy kẻ đói như vậy"
								},
								{
									"en": "small town",
									"vi": "thị trấn nhỏ"
								}
							]
						}
					},
					{
						"id": "so1-tom",
						"image": "/illustrations/so1-04.jpg?v=la",
						"file": "so1-page-04",
						"title": {
							"vi": "Tom",
							"en": "Tom"
						},
						"text": {
							"preschool": {
								"vi": "Sonic gặp Tom. Tom sợ. Rồi Tom hiền. Hai bạn. Được rồi.",
								"en": "Sonic met Tom. Tom was scared. Then Tom was kind. Two friends. It's okay."
							},
							"primary": {
								"vi": "Sonic chạy vào nhà sheriff. Tom thấy nhím nói chuyện. Tom sốc. Rồi Tom tin. Cậu cần giúp.",
								"en": "Sonic ran into the sheriff's house. Tom saw a talking hedgehog. Tom was shocked. Then Tom believed him. The boy needed help."
							},
							"intermediate": {
								"vi": "Luật của Tom là giữ yên. Sonic là chuyện trái luật. Tom chọn trái luật — vì một đứa trẻ đang bị săn.",
								"en": "Tom's law was to keep the peace. Sonic was against the law. Tom chose against the law — because a child was being hunted."
							},
							"senior": {
								"vi": "Người lớn tốt không phải người không sợ. Tom sợ. Rồi ông ta đưa ghế. Đó là toàn bộ đạo đức của phim, gói trong một nhà bếp.",
								"en": "A good grown-up is not one who is not scared. Tom was scared. Then he pulled out a chair. That is the whole ethic of the movie, packed into a kitchen."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Sonic met Tom",
									"vi": "Sonic gặp Tom"
								},
								{
									"en": "Tom was scared",
									"vi": "Tom sợ"
								},
								{
									"en": "Then Tom was kind",
									"vi": "Rồi Tom hiền"
								},
								{
									"en": "Two friends",
									"vi": "Hai bạn"
								},
								{
									"en": "It's okay",
									"vi": "Được rồi"
								},
								{
									"en": "was scared",
									"vi": "sợ"
								},
								{
									"en": "was kind",
									"vi": "hiền"
								}
							],
							"primary": [
								{
									"en": "Sonic ran into the sheriff's house",
									"vi": "Sonic chạy vào nhà sheriff"
								},
								{
									"en": "Tom saw a talking hedgehog",
									"vi": "Tom thấy nhím nói chuyện"
								},
								{
									"en": "Tom was shocked",
									"vi": "Tom sốc"
								},
								{
									"en": "Then Tom believed him",
									"vi": "Rồi Tom tin"
								},
								{
									"en": "The boy needed help",
									"vi": "Cậu cần giúp"
								}
							],
							"intermediate": [
								{
									"en": "Tom's law was to keep the peace",
									"vi": "Luật của Tom là giữ yên"
								},
								{
									"en": "Sonic was against the law",
									"vi": "Sonic là chuyện trái luật"
								},
								{
									"en": "Tom chose against the law — because a child was being hunted",
									"vi": "Tom chọn trái luật — vì một đứa trẻ đang bị săn"
								}
							],
							"senior": [
								{
									"en": "A good grown-up is not one who is not scared",
									"vi": "Người lớn tốt không phải người không sợ"
								},
								{
									"en": "Tom was scared",
									"vi": "Tom sợ"
								},
								{
									"en": "Then he pulled out a chair",
									"vi": "Rồi ông ta đưa ghế"
								},
								{
									"en": "That is the whole ethic of the movie, packed into a kitchen",
									"vi": "Đó là toàn bộ đạo đức của phim, gói trong một nhà bếp"
								},
								{
									"en": "was scared",
									"vi": "sợ"
								}
							]
						}
					},
					{
						"id": "so1-chase",
						"image": "/illustrations/so1-05.jpg?v=la",
						"file": "so1-page-05",
						"title": {
							"vi": "Rượt",
							"en": "The Chase"
						},
						"text": {
							"preschool": {
								"vi": "Xe chạy. Sonic bám. Vòng vàng. Máy bay. Chạy đi!",
								"en": "The truck ran. Sonic held on. Golden rings. Drones flew. Run!"
							},
							"primary": {
								"vi": "Tom lái xe. Sonic bám theo. Robotnik thả máy bay nhỏ. Sonic mở vòng vàng để đi xa. Họ phải chạy.",
								"en": "Tom drove. Sonic held on. Robotnik sent little flying machines. Sonic opened golden rings to go far. They had to run."
							},
							"intermediate": {
								"vi": "Đường đêm thành đường vòng. Sonic ném vàng — cửa sang chỗ khác. Tom lái như người vừa biết thế giới có cửa.",
								"en": "The night road became a ring-road. Sonic threw gold — a door to somewhere else. Tom drove like a man who had just learned the world has doors."
							},
							"senior": {
								"vi": "Rượt đuổi là cách phim dạy tin: không bài nói, chỉ có tay trên thành xe và ai đó không buông. Vòng vàng chỉ là hình của lời hứa.",
								"en": "The chase is how the movie teaches trust: no speech, only a hand on the truck and someone who does not let go. The golden rings are just the shape of a promise."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "The truck ran",
									"vi": "Xe chạy"
								},
								{
									"en": "Sonic held on",
									"vi": "Sonic bám"
								},
								{
									"en": "Golden rings",
									"vi": "Vòng vàng"
								},
								{
									"en": "Drones flew",
									"vi": "Máy bay"
								}
							],
							"primary": [
								{
									"en": "Tom drove",
									"vi": "Tom lái xe"
								},
								{
									"en": "Sonic held on",
									"vi": "Sonic bám theo"
								},
								{
									"en": "Robotnik sent little flying machines",
									"vi": "Robotnik thả máy bay nhỏ"
								},
								{
									"en": "Sonic opened golden rings to go far",
									"vi": "Sonic mở vòng vàng để đi xa"
								},
								{
									"en": "They had to run",
									"vi": "Họ phải chạy"
								}
							],
							"intermediate": [
								{
									"en": "The night road became a ring-road",
									"vi": "Đường đêm thành đường vòng"
								},
								{
									"en": "Sonic threw gold — a door to somewhere else",
									"vi": "Sonic ném vàng — cửa sang chỗ khác"
								},
								{
									"en": "Tom drove like a man who had just learned the world has doors",
									"vi": "Tom lái như người vừa biết thế giới có cửa"
								}
							],
							"senior": [
								{
									"en": "teaches",
									"vi": "dạy"
								},
								{
									"en": "The chase is how the movie teaches trust: no speech, only a hand on the truck and someone who does not let go",
									"vi": "Rượt đuổi là cách phim dạy tin: không bài nói, chỉ có tay trên thành xe và ai đó không buông"
								},
								{
									"en": "The golden rings are just the shape of a promise",
									"vi": "Vòng vàng chỉ là hình của lời hứa"
								}
							]
						}
					},
					{
						"id": "so1-friend",
						"image": "/illustrations/so1-06.jpg?v=la",
						"file": "so1-page-06",
						"title": {
							"vi": "Bạn",
							"en": "Friends"
						},
						"text": {
							"preschool": {
								"vi": "Tom và Sonic ngồi. Nói chuyện. Cười. Bạn hiền. Vui lắm.",
								"en": "Tom and Sonic sat. They talked. They smiled. Kind friends. So fun."
							},
							"primary": {
								"vi": "Họ dừng xe. Tom nghe Sonic kể nhà. Sonic nghe Tom kể thị trấn. Hai người không còn lạ.",
								"en": "They stopped the truck. Tom heard Sonic talk about home. Sonic heard Tom talk about the town. They were not strangers anymore."
							},
							"intermediate": {
								"vi": "Trên thùng xe, chiến tranh tạm nghỉ. Một sheriff và một nhím học cùng một bài: ở lại là dũng cảm hơn chạy.",
								"en": "On the tailgate, the war paused. A sheriff and a hedgehog learned the same lesson: staying can be braver than running."
							},
							"senior": {
								"vi": "Phim gia đình sống ở chỗ này — không sấm, không găng đỏ. Chỉ hai kẻ lạc loài nhận ra họ cùng muốn một mái, dù một người có gai.",
								"en": "The family movie lives here — no thunder, no red gloves. Only two strays realizing they both want a roof, even if one of them has quills."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "smiled",
									"vi": "cười"
								},
								{
									"en": "Tom and Sonic sat",
									"vi": "Tom và Sonic ngồi"
								},
								{
									"en": "They talked",
									"vi": "Nói chuyện"
								},
								{
									"en": "They smiled",
									"vi": "Cười"
								},
								{
									"en": "Kind friends",
									"vi": "Bạn hiền"
								},
								{
									"en": "so fun",
									"vi": "vui lắm"
								}
							],
							"primary": [
								{
									"en": "stopped",
									"vi": "dừng"
								},
								{
									"en": "They stopped the truck",
									"vi": "Họ dừng xe"
								},
								{
									"en": "Tom heard Sonic talk about home",
									"vi": "Tom nghe Sonic kể nhà"
								},
								{
									"en": "Sonic heard Tom talk about the town",
									"vi": "Sonic nghe Tom kể thị trấn"
								},
								{
									"en": "They were not strangers anymore",
									"vi": "Hai người hông còn lạ"
								}
							],
							"intermediate": [{
								"en": "On the tailgate, the war paused",
								"vi": "Trên thùng xe, chiến tranh tạm nghỉ"
							}, {
								"en": "A sheriff and a hedgehog learned the same lesson: staying can be braver than running",
								"vi": "Một sheriff và một nhím học cùng một bài: ở lại là dũng cảm hơn chạy"
							}],
							"senior": [{
								"en": "The family movie lives here — no thunder, no red gloves",
								"vi": "Phim gia đình sống ở chỗ này — không sấm, không găng đỏ"
							}, {
								"en": "Only two strays realizing they both want a roof, even if one of them has quills",
								"vi": "Chỉ hai kẻ lạc loài nhận ra họ cùng muốn một mái, dù một người có gai"
							}]
						}
					},
					{
						"id": "so1-machines",
						"image": "/illustrations/so1-07.jpg?v=la",
						"file": "so1-page-07",
						"title": {
							"vi": "Máy",
							"en": "Machines"
						},
						"text": {
							"preschool": {
								"vi": "Bác sĩ thả máy. Máy bay. Máy to. Ồ. Sonic phải lo.",
								"en": "The doctor sent machines. Flying machines. A big machine. Oh. Sonic had to be careful."
							},
							"primary": {
								"vi": "Robotnik thả drone và robot trứng. Thị trấn nhỏ sợ. Sonic phải chạy và nghĩ. Tom không bỏ cậu.",
								"en": "Robotnik sent drones and an egg robot. The small town was scared. Sonic had to run and think. Tom did not leave him."
							},
							"intermediate": {
								"vi": "Đồ chơi của bác sĩ không phải đồ chơi. Ông ta biến thị trấn thành phòng thí nghiệm. Sonic lần đầu thấy tốc độ không đủ.",
								"en": "The doctor's toys were not toys. He turned the town into a lab. Sonic saw for the first time that speed was not enough."
							},
							"senior": {
								"vi": "Robotnik không ghét Sonic. Ông ta yêu kiểm soát. Máy bay là cách một cái ego ôm lấy trời. Green Hills, lần đầu, bị đo.",
								"en": "Robotnik does not hate Sonic. He loves control. The drones are how an ego hugs the sky. Green Hills, for the first time, was being measured."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "The doctor sent machines",
									"vi": "Bác sĩ thả máy"
								},
								{
									"en": "Flying machines",
									"vi": "Máy bay"
								},
								{
									"en": "A big machine",
									"vi": "Máy to"
								},
								{
									"en": "Sonic had to be careful",
									"vi": "Sonic phải lo"
								}
							],
							"primary": [
								{
									"en": "Robotnik sent drones and an egg robot",
									"vi": "Robotnik thả drone và robot trứng"
								},
								{
									"en": "The small town was scared",
									"vi": "Thị trấn nhỏ sợ"
								},
								{
									"en": "Sonic had to run and think",
									"vi": "Sonic phải chạy và nghĩ"
								},
								{
									"en": "Tom did not leave him",
									"vi": "Tom hông bỏ cậu"
								},
								{
									"en": "was scared",
									"vi": "sợ"
								},
								{
									"en": "small town",
									"vi": "thị trấn nhỏ"
								}
							],
							"intermediate": [
								{
									"en": "The doctor's toys were not toys",
									"vi": "Đồ chơi của bác sĩ không phải đồ chơi"
								},
								{
									"en": "He turned the town into a lab",
									"vi": "Ông ta biến thị trấn thành phòng thí nghiệm"
								},
								{
									"en": "Sonic saw for the first time that speed was not enough",
									"vi": "Sonic lần đầu thấy tốc độ không đủ"
								}
							],
							"senior": [
								{
									"en": "Robotnik does not hate Sonic",
									"vi": "Robotnik không ghét Sonic"
								},
								{
									"en": "He loves control",
									"vi": "Ông ta yêu kiểm soát"
								},
								{
									"en": "The drones are how an ego hugs the sky",
									"vi": "Máy bay là cách một cái ego ôm lấy trời"
								},
								{
									"en": "Green Hills, for the first time, was being measured",
									"vi": "Green Hills, lần đầu, bị đo"
								}
							]
						}
					},
					{
						"id": "so1-fight",
						"image": "/illustrations/so1-08.jpg?v=la",
						"file": "so1-page-08",
						"title": {
							"vi": "Đánh",
							"en": "The Fight"
						},
						"text": {
							"preschool": {
								"vi": "Sonic xoay. Xanh lắm. Máy bể. Tom reo. Giỏi lắm.",
								"en": "Sonic spun. So blue. Machines broke. Tom cheered. So well done."
							},
							"primary": {
								"vi": "Sonic dùng tốc độ hết sức. Cậu xoay thành cầu sấm. Robotnik thua. Thị trấn được yên.",
								"en": "Sonic used all his speed. He spun into a thunder ball. Robotnik lost. The town was safe."
							},
							"intermediate": {
								"vi": "Không phải giận — là chọn ở lại. Sonic đánh không để phá, để giữ Tom, giữ nhà, giữ chỗ ngồi trên thùng xe.",
								"en": "Not anger — a choice to stay. Sonic fought not to smash, but to keep Tom, keep home, keep the seat on the tailgate."
							},
							"senior": {
								"vi": "Cao trào gia đình: sấm xanh, không máu. Robotnik học rằng dữ liệu không nuốt được một đứa trẻ được một người lớn tin. Đó là đòn chí mạng.",
								"en": "A family climax: blue thunder, no blood. Robotnik learns that data cannot swallow a child a grown-up believes in. That is the killing blow."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Sonic spun",
									"vi": "Sonic xoay"
								},
								{
									"en": "Machines broke",
									"vi": "Máy bể"
								},
								{
									"en": "Tom cheered",
									"vi": "Tom reo"
								},
								{
									"en": "So well done",
									"vi": "Giỏi lắm"
								}
							],
							"primary": [
								{
									"en": "Sonic used all his speed",
									"vi": "Sonic dùng tốc độ hết sức"
								},
								{
									"en": "He spun into a thunder ball",
									"vi": "Cậu xoay thành cầu sấm"
								},
								{
									"en": "Robotnik lost",
									"vi": "Robotnik thua"
								},
								{
									"en": "The town was safe",
									"vi": "Thị trấn được yên"
								}
							],
							"intermediate": [{
								"en": "Not anger — a choice to stay",
								"vi": "Không phải giận — là chọn ở lại"
							}, {
								"en": "Sonic fought not to smash, but to keep Tom, keep home, keep the seat on the tailgate",
								"vi": "Sonic đánh không để phá, để giữ Tom, giữ nhà, giữ chỗ ngồi trên thùng xe"
							}],
							"senior": [
								{
									"en": "A family climax: blue thunder, no blood",
									"vi": "Cao trào gia đình: sấm xanh, không máu"
								},
								{
									"en": "Robotnik learns that data cannot swallow a child a grown-up believes in",
									"vi": "Robotnik học rằng dữ liệu không nuốt được một đứa trẻ được một người lớn tin"
								},
								{
									"en": "That is the killing blow",
									"vi": "Đó là đòn chí mạng"
								}
							]
						}
					},
					{
						"id": "so1-stay",
						"image": "/illustrations/so1-09.jpg?v=la",
						"file": "so1-page-09",
						"title": {
							"vi": "Ở lại",
							"en": "He Stays"
						},
						"text": {
							"preschool": {
								"vi": "Trời sáng. Sonic đứng. Thị trấn đẹp. Được ở. Vui lắm.",
								"en": "The sky was bright. Sonic stood. The town was pretty. He could stay. So fun."
							},
							"primary": {
								"vi": "Robotnik đi. Sonic không phải núp nữa. Green Hills thành nhà. Cậu đứng trên đồi và cười.",
								"en": "Robotnik was gone. Sonic did not have to hide anymore. Green Hills became home. He stood on the hill and smiled."
							},
							"intermediate": {
								"vi": "Tự do không phải chạy thêm. Là được đứng nhìn thị trấn mà không sợ bị thấy. Sonic, lần đầu, ở.",
								"en": "Freedom is not more running. It is standing, looking at a town, without fearing being seen. Sonic, for the first time, stayed."
							},
							"senior": {
								"vi": "Người tị nạn thắng không phải khi về được nơi cũ. Là khi nơi mới chịu nhận tên cậu. Bình minh chỉ việc chứng kiến.",
								"en": "A refugee does not win by going back. He wins when the new place will say his name. Dawn only had to witness."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "The sky was bright",
									"vi": "Trời sáng"
								},
								{
									"en": "Sonic stood",
									"vi": "Sonic đứng"
								},
								{
									"en": "The town was pretty",
									"vi": "Thị trấn đẹp"
								},
								{
									"en": "He could stay",
									"vi": "Được ở"
								},
								{
									"en": "so fun",
									"vi": "vui lắm"
								}
							],
							"primary": [
								{
									"en": "smiled",
									"vi": "cười"
								},
								{
									"en": "stood",
									"vi": "đứng"
								},
								{
									"en": "Robotnik was gone",
									"vi": "Robotnik đi"
								},
								{
									"en": "Sonic did not have to hide anymore",
									"vi": "Sonic hông phải núp nữa"
								},
								{
									"en": "Green Hills became home",
									"vi": "Green Hills thành nhà"
								},
								{
									"en": "He stood on the hill and smiled",
									"vi": "Cậu đứng trên đồi và cười"
								}
							],
							"intermediate": [
								{
									"en": "Freedom is not more running",
									"vi": "Tự do không phải chạy thêm"
								},
								{
									"en": "It is standing, looking at a town, without fearing being seen",
									"vi": "Là được đứng nhìn thị trấn mà không sợ bị thấy"
								},
								{
									"en": "Sonic, for the first time, stayed",
									"vi": "Sonic, lần đầu, ở"
								}
							],
							"senior": [
								{
									"en": "A refugee does not win by going back",
									"vi": "Người tị nạn thắng không phải khi về được nơi cũ"
								},
								{
									"en": "He wins when the new place will say his name",
									"vi": "Là khi nơi mới chịu nhận tên cậu"
								},
								{
									"en": "Dawn only had to witness",
									"vi": "Bình minh chỉ việc chứng kiến"
								}
							]
						}
					},
					{
						"id": "so1-home",
						"image": "/illustrations/so1-10.jpg?v=la",
						"file": "so1-page-10",
						"title": {
							"vi": "Nhà",
							"en": "Home"
						},
						"text": {
							"preschool": {
								"vi": "Sonic và Tom ngồi. Đèn ấm. Sao. Bạn hiền. Ngủ ngon nha.",
								"en": "Sonic and Tom sat. Warm lights. Stars. Kind friends. Night night."
							},
							"primary": {
								"vi": "Họ ngồi trước nhà. Thị trấn yên. Sonic có nhà. Tom có bạn lạ. Đủ rồi. Ngủ ngon nha.",
								"en": "They sat in front of the house. The town was quiet. Sonic had a home. Tom had a strange friend. That was enough. Night night."
							},
							"intermediate": {
								"vi": "Phim khép bằng hiên nhà, vì đó là thứ tốc độ tìm được: không vương quốc, chỉ một chỗ ngồi và ai đó không đuổi.",
								"en": "The film closes on a porch, because that is what speed was looking for: no kingdom, only a seat and someone who does not send you away."
							},
							"senior": {
								"vi": "Jim Carrey đã gào xong. Còn lại hai kẻ ngồi, đèn vàng, và một thị trấn chịu chứa nhím. Ngủ được rồi — chạy đã đủ cho một đời trẻ.",
								"en": "Jim Carrey has finished shouting. What remains is two sitters, yellow lights, and a town willing to hold a hedgehog. Sleep could come — running had been enough for one young life."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Sonic and Tom sat",
									"vi": "Sonic và Tom ngồi"
								},
								{
									"en": "Warm lights",
									"vi": "Đèn ấm"
								},
								{
									"en": "Kind friends",
									"vi": "Bạn hiền"
								},
								{
									"en": "Night night",
									"vi": "Ngủ ngon nha"
								}
							],
							"primary": [
								{
									"en": "They sat in front of the house",
									"vi": "Họ ngồi trước nhà"
								},
								{
									"en": "The town was quiet",
									"vi": "Thị trấn yên"
								},
								{
									"en": "Sonic had a home",
									"vi": "Sonic có nhà"
								},
								{
									"en": "Tom had a strange friend",
									"vi": "Tom có bạn lạ"
								},
								{
									"en": "That was enough",
									"vi": "Đủ rồi"
								},
								{
									"en": "Night night",
									"vi": "Ngủ ngon nha"
								}
							],
							"intermediate": [{
								"en": "The film closes on a porch, because that is what speed was looking for: no kingdom, only a seat and someone who does not send you away",
								"vi": "Phim khép bằng hiên nhà, vì đó là thứ tốc độ tìm được: không vương quốc, chỉ một chỗ ngồi và ai đó không đuổi"
							}],
							"senior": [
								{
									"en": "Jim Carrey has finished shouting",
									"vi": "Jim Carrey đã gào xong"
								},
								{
									"en": "What remains is two sitters, yellow lights, and a town willing to hold a hedgehog",
									"vi": "Còn lại hai kẻ ngồi, đèn vàng, và một thị trấn chịu chứa nhím"
								},
								{
									"en": "Sleep could come — running had been enough for one young life",
									"vi": "Ngủ được rồi — chạy đã đủ cho một đời trẻ"
								}
							]
						}
					}
				]
			}, {
				"id": "so2",
				"vi": "Phim 2",
				"en": "Movie 2",
				"tagline": {
					"vi": "Knuckles tới thị trấn nhỏ",
					"en": "Knuckles comes to the small town"
				},
				"pages": [
					{
						"id": "so2-cover",
						"image": "/illustrations/so2-00.jpg?v=la",
						"file": "so2-page-00",
						"title": {
							"vi": "Knuckles",
							"en": "Knuckles"
						},
						"text": {
							"preschool": {
								"vi": "Đây là chuyện Sonic. Phim hai. Có Knuckles. Màu đỏ. Đấm mạnh lắm.",
								"en": "This is Sonic. Movie two. There is Knuckles. He is red. He punches so hard."
							},
							"primary": {
								"vi": "Đây là phim Sonic hai. Knuckles tới tìm Sonic. Cáo Tails cũng tới. Họ phải tìm một viên ngọc lớn.",
								"en": "This is Sonic movie two. Knuckles comes to find Sonic. The fox Tails comes too. They must find a big emerald."
							},
							"intermediate": {
								"vi": "Phim hai mở bằng một thị trấn đã quen nhím xanh — rồi một nắm đấm đỏ bước qua vòng vàng. Knuckles không tới chơi. Cậu tới đòi món nợ của cả một tộc.",
								"en": "Movie two opens on a town that already knows the blue hedgehog — then a red fist steps through a gold ring. Knuckles did not come to play. He came to collect a whole tribe's debt."
							},
							"senior": {
								"vi": "Sequel gia đình biết cách lớn: thêm một cáo hai đuôi, một chiến binh đỏ, và Idris Elba đọc danh dự như người đọc kinh. Green Hills chưa sẵn cho nắm đấm ấy.",
								"en": "The family sequel knows how to grow: add a two-tailed fox, a red warrior, and Idris Elba reading honor like scripture. Green Hills was not ready for that fist."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "This is Sonic",
									"vi": "Đây là chuyện Sonic"
								},
								{
									"en": "Movie two",
									"vi": "Phim hai"
								},
								{
									"en": "There is Knuckles",
									"vi": "Có Knuckles"
								},
								{
									"en": "He is red",
									"vi": "Màu đỏ"
								},
								{
									"en": "He punches so hard",
									"vi": "Đấm mạnh lắm"
								},
								{
									"en": "punches so hard",
									"vi": "đấm mạnh lắm"
								},
								{
									"en": "so hard",
									"vi": "mạnh lắm"
								}
							],
							"primary": [
								{
									"en": "This is Sonic movie two",
									"vi": "Đây là phim Sonic hai"
								},
								{
									"en": "Knuckles comes to find Sonic",
									"vi": "Knuckles tới tìm Sonic"
								},
								{
									"en": "The fox Tails comes too",
									"vi": "Cáo Tails cũng tới"
								},
								{
									"en": "They must find a big emerald",
									"vi": "Họ phải tìm một viên ngọc lớn"
								},
								{
									"en": "movie two",
									"vi": "phim hai"
								}
							],
							"intermediate": [
								{
									"en": "Movie two opens on a town that already knows the blue hedgehog — then a red fist steps through a gold ring",
									"vi": "Phim hai mở bằng một thị trấn đã quen nhím xanh — rồi một nắm đấm đỏ bước qua vòng vàng"
								},
								{
									"en": "Knuckles did not come to play",
									"vi": "Knuckles không tới chơi"
								},
								{
									"en": "He came to collect a whole tribe's debt",
									"vi": "Cậu tới đòi món nợ của cả một tộc"
								},
								{
									"en": "movie two",
									"vi": "phim hai"
								}
							],
							"senior": [
								{
									"en": "The family sequel knows how to grow: add a two-tailed fox, a red warrior, and Idris Elba reading honor like scripture",
									"vi": "Sequel gia đình biết cách lớn: thêm một cáo hai đuôi, một chiến binh đỏ, và Idris Elba đọc danh dự như người đọc kinh"
								},
								{
									"en": "Green Hills was not ready for that fist",
									"vi": "Green Hills chưa sẵn cho nắm đấm ấy"
								},
								{
									"en": "red warrior",
									"vi": "chiến binh đỏ"
								}
							]
						}
					},
					{
						"id": "so2-hero",
						"image": "/illustrations/so2-01.jpg?v=la",
						"file": "so2-page-01",
						"title": {
							"vi": "Anh hùng",
							"en": "Hero"
						},
						"text": {
							"preschool": {
								"vi": "Sonic muốn làm anh hùng. Chạy. Cứu. Hơi lộn. Ồ.",
								"en": "Sonic wanted to be a hero. He ran. He saved. A little messy. Oh."
							},
							"primary": {
								"vi": "Sonic ở Green Hills. Cậu muốn làm người hùng. Cậu giúp người. Cậu cũng làm hỏng một ít. Tom thở dài.",
								"en": "Sonic lived in Green Hills. He wanted to be a hero. He helped people. He also broke a few things. Tom sighed."
							},
							"intermediate": {
								"vi": "Tốc độ đã có nhà. Giờ cậu muốn danh. Blue Justice — cái tên quá lớn cho một đứa trẻ còn học cách đứng yên.",
								"en": "Speed already had a home. Now he wanted a name. Blue Justice — a title too big for a child still learning how to stand still."
							},
							"senior": {
								"vi": "Phim sequel hay bắt đầu bằng kiêu: đứa trẻ thắng mùa trước muốn mùa này là tượng. Green Hills chịu được nhím. Chưa chịu được anh hùng nghiệp dư.",
								"en": "Sequels like to open on pride: the child who won last season wants this one to be a statue. Green Hills could hold a hedgehog. It could not yet hold an amateur hero."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Sonic wanted to be a hero",
									"vi": "Sonic muốn làm anh hùng"
								},
								{
									"en": "He saved",
									"vi": "Cứu"
								},
								{
									"en": "A little messy",
									"vi": "Hơi lộn"
								}
							],
							"primary": [
								{
									"en": "Sonic lived in Green Hills",
									"vi": "Sonic ở Green Hills"
								},
								{
									"en": "He wanted to be a hero",
									"vi": "Cậu muốn làm người hùng"
								},
								{
									"en": "He helped people",
									"vi": "Cậu giúp người"
								},
								{
									"en": "He also broke a few things",
									"vi": "Cậu cũng làm hỏng một ít"
								},
								{
									"en": "Tom sighed",
									"vi": "Tom thở dài"
								}
							],
							"intermediate": [
								{
									"en": "Speed already had a home",
									"vi": "Tốc độ đã có nhà"
								},
								{
									"en": "Now he wanted a name",
									"vi": "Giờ cậu muốn danh"
								},
								{
									"en": "Blue Justice — a title too big for a child still learning how to stand still",
									"vi": "Blue Justice — cái tên quá lớn cho một đứa trẻ còn học cách đứng yên"
								}
							],
							"senior": [
								{
									"en": "Sequels like to open on pride: the child who won last season wants this one to be a statue",
									"vi": "Phim sequel hay bắt đầu bằng kiêu: đứa trẻ thắng mùa trước muốn mùa này là tượng"
								},
								{
									"en": "Green Hills could hold a hedgehog",
									"vi": "Green Hills chịu được nhím"
								},
								{
									"en": "It could not yet hold an amateur hero",
									"vi": "Chưa chịu được anh hùng nghiệp dư"
								}
							]
						}
					},
					{
						"id": "so2-fox",
						"image": "/illustrations/so2-02.jpg?v=la",
						"file": "so2-page-02",
						"title": {
							"vi": "Cáo",
							"en": "The Fox"
						},
						"text": {
							"preschool": {
								"vi": "Cáo vàng tới. Hai đuôi. Quay. Bay. Bạn mới.",
								"en": "A yellow fox came. Two tails. They spun. He flew. A new friend."
							},
							"primary": {
								"vi": "Tails tìm Sonic. Cậu bé cáo có hai đuôi. Cậu biết bay. Cậu nói có người dữ đang tới.",
								"en": "Tails looked for Sonic. The little fox had two tails. He could fly. He said a dangerous person was coming."
							},
							"intermediate": {
								"vi": "Miles Prower — Tails — tới bằng vòng, bằng máy, bằng lo. Hai đuôi không phải đồ chơi. Chúng là cách một đứa trẻ nhỏ đến kịp một cuộc chiến lớn.",
								"en": "Miles Prower — Tails — arrived by ring, by gadget, by worry. Two tails were not a toy. They were how a small child arrived in time for a large war."
							},
							"senior": {
								"vi": "Sidekick trong phim gia đình không phải người theo. Là người tới trước nỗi sợ. Tails mang bản đồ, mang máy, mang một trái tim chưa biết Knuckles sẽ nặng cỡ nào.",
								"en": "A sidekick in a family film is not a follower. He is the one who arrives ahead of the fear. Tails brought a map, a machine, and a heart that did not yet know how heavy Knuckles would be."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "A yellow fox came",
									"vi": "Cáo vàng tới"
								},
								{
									"en": "Two tails",
									"vi": "Hai đuôi"
								},
								{
									"en": "They spun",
									"vi": "Quay"
								},
								{
									"en": "A new friend",
									"vi": "Bạn mới"
								},
								{
									"en": "a yellow fox",
									"vi": "cáo vàng"
								},
								{
									"en": "new friend",
									"vi": "bạn mới"
								}
							],
							"primary": [
								{
									"en": "Tails looked for Sonic",
									"vi": "Tails tìm Sonic"
								},
								{
									"en": "The little fox had two tails",
									"vi": "Cậu bé cáo có hai đuôi"
								},
								{
									"en": "He could fly",
									"vi": "Cậu biết bay"
								},
								{
									"en": "He said a dangerous person was coming",
									"vi": "Cậu nói có người dữ đang tới"
								},
								{
									"en": "two tails",
									"vi": "hai đuôi"
								}
							],
							"intermediate": [
								{
									"en": "Miles Prower — Tails — arrived by ring, by gadget, by worry",
									"vi": "Miles Prower — Tails — tới bằng vòng, bằng máy, bằng lo"
								},
								{
									"en": "Two tails were not a toy",
									"vi": "Hai đuôi không phải đồ chơi"
								},
								{
									"en": "They were how a small child arrived in time for a large war",
									"vi": "Chúng là cách một đứa trẻ nhỏ đến kịp một cuộc chiến lớn"
								},
								{
									"en": "two tails",
									"vi": "hai đuôi"
								}
							],
							"senior": [
								{
									"en": "A sidekick in a family film is not a follower",
									"vi": "Sidekick trong phim gia đình không phải người theo"
								},
								{
									"en": "He is the one who arrives ahead of the fear",
									"vi": "Là người tới trước nỗi sợ"
								},
								{
									"en": "Tails brought a map, a machine, and a heart that did not yet know how heavy Knuckles would be",
									"vi": "Tails mang bản đồ, mang máy, mang một trái tim chưa biết Knuckles sẽ nặng cỡ nào"
								}
							]
						}
					},
					{
						"id": "so2-red",
						"image": "/illustrations/so2-03.jpg?v=la",
						"file": "so2-page-03",
						"title": {
							"vi": "Đỏ",
							"en": "The Red One"
						},
						"text": {
							"preschool": {
								"vi": "Knuckles tới. Đỏ. Nắm to. Mặt dữ. Ồ.",
								"en": "Knuckles came. Red. Big fists. A mean face. Oh."
							},
							"primary": {
								"vi": "Knuckles là thú mỏ gai đỏ. Cậu rất khỏe. Cậu giận Sonic. Cậu muốn tìm viên ngọc.",
								"en": "Knuckles was a red echidna. He was very strong. He was angry at Sonic. He wanted the emerald."
							},
							"intermediate": {
								"vi": "Cửa vòng mở. Một chiến binh đỏ bước ra — nắm đấm như đá, ngực trắng như mặt trăng khuyết. Knuckles không hỏi tên. Cậu hỏi món nợ.",
								"en": "The ring opened. A red warrior stepped through — fists like stone, a white crescent on his chest. Knuckles did not ask a name. He asked for a debt."
							},
							"senior": {
								"vi": "Idris Elba không chơi dễ thương. Ông ta chơi một đứa trẻ mồ côi đội lốt võ sĩ: đỏ, danh dự, và một lịch sử không vừa thị trấn nhỏ. Khán giả trẻ hiểu ngay — nắm đấm ấy đang đau.",
								"en": "Idris Elba does not play cute. He plays an orphan in a boxer's body: red, honorable, and a history too wide for a small town. Young viewers get it at once — those fists are in pain."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Knuckles came",
									"vi": "Knuckles tới"
								},
								{
									"en": "Big fists",
									"vi": "Nắm to"
								},
								{
									"en": "A mean face",
									"vi": "Mặt dữ"
								}
							],
							"primary": [
								{
									"en": "echidna",
									"vi": "thú mỏ gai"
								},
								{
									"en": "Knuckles was a red echidna",
									"vi": "Knuckles là thú mỏ gai đỏ"
								},
								{
									"en": "He was very strong",
									"vi": "Cậu rất khỏe"
								},
								{
									"en": "He was angry at Sonic",
									"vi": "Cậu giận Sonic"
								},
								{
									"en": "He wanted the emerald",
									"vi": "Cậu muốn tìm viên ngọc"
								},
								{
									"en": "the emerald",
									"vi": "viên ngọc"
								}
							],
							"intermediate": [
								{
									"en": "The ring opened",
									"vi": "Cửa vòng mở"
								},
								{
									"en": "A red warrior stepped through — fists like stone, a white crescent on his chest",
									"vi": "Một chiến binh đỏ bước ra — nắm đấm như đá, ngực trắng như mặt trăng khuyết"
								},
								{
									"en": "Knuckles did not ask a name",
									"vi": "Knuckles không hỏi tên"
								},
								{
									"en": "He asked for a debt",
									"vi": "Cậu hỏi món nợ"
								},
								{
									"en": "red warrior",
									"vi": "chiến binh đỏ"
								}
							],
							"senior": [
								{
									"en": "Idris Elba does not play cute",
									"vi": "Idris Elba không chơi dễ thương"
								},
								{
									"en": "He plays an orphan in a boxer's body: red, honorable, and a history too wide for a small town",
									"vi": "Ông ta chơi một đứa trẻ mồ côi đội lốt võ sĩ: đỏ, danh dự, và một lịch sử không vừa thị trấn nhỏ"
								},
								{
									"en": "Young viewers get it at once — those fists are in pain",
									"vi": "Khán giả trẻ hiểu ngay — nắm đấm ấy đang đau"
								},
								{
									"en": "small town",
									"vi": "thị trấn nhỏ"
								}
							]
						}
					},
					{
						"id": "so2-deal",
						"image": "/illustrations/so2-04.jpg?v=la",
						"file": "so2-page-04",
						"title": {
							"vi": "Hiệp ước",
							"en": "The Deal"
						},
						"text": {
							"preschool": {
								"vi": "Bác sĩ dữ gặp Knuckles. Nói ngọt. Hai người. Hiệp ước lạ.",
								"en": "The mean doctor met Knuckles. Sweet words. Two people. A strange deal."
							},
							"primary": {
								"vi": "Robotnik nói với Knuckles. Ông ta muốn Sonic thua. Knuckles muốn ngọc. Họ đi chung. Hông phải bạn.",
								"en": "Robotnik talked to Knuckles. He wanted Sonic to lose. Knuckles wanted the emerald. They went together. They were not friends."
							},
							"intermediate": {
								"vi": "Robotnik không cần bạn. Ông ta cần một nắm đấm. Knuckles không cần bác sĩ. Cậu cần đường tới Ngọc Chủ. Hai kẻ đói bắt tay — và chỉ một kẻ biết mình đang lừa.",
								"en": "Robotnik did not need a friend. He needed a fist. Knuckles did not need a doctor. He needed a road to the Master Emerald. Two hungers shook hands — and only one knew it was a trick."
							},
							"senior": {
								"vi": "Jim Carrey bán danh dự như bán máy. Knuckles mua, vì cô đơn hay mua những lời nghe giống sứ mệnh. Hiệp ước xấu luôn bắt đầu bằng một sự thật: viên ngọc có thật.",
								"en": "Jim Carrey sells honor the way he sells machines. Knuckles buys, because loneliness buys anything that sounds like a mission. A bad deal always begins with one true thing: the emerald is real."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "The mean doctor met Knuckles",
									"vi": "Bác sĩ dữ gặp Knuckles"
								},
								{
									"en": "Sweet words",
									"vi": "Nói ngọt"
								},
								{
									"en": "Two people",
									"vi": "Hai người"
								},
								{
									"en": "A strange deal",
									"vi": "Hiệp ước lạ"
								}
							],
							"primary": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Robotnik talked to Knuckles",
									"vi": "Robotnik nói với Knuckles"
								},
								{
									"en": "He wanted Sonic to lose",
									"vi": "Ông ta muốn Sonic thua"
								},
								{
									"en": "Knuckles wanted the emerald",
									"vi": "Knuckles muốn ngọc"
								},
								{
									"en": "They went together",
									"vi": "Họ đi chung"
								},
								{
									"en": "They were not friends",
									"vi": "Hông phải bạn"
								},
								{
									"en": "the emerald",
									"vi": "viên ngọc"
								}
							],
							"intermediate": [
								{
									"en": "Robotnik did not need a friend",
									"vi": "Robotnik không cần bạn"
								},
								{
									"en": "He needed a fist",
									"vi": "Ông ta cần một nắm đấm"
								},
								{
									"en": "Knuckles did not need a doctor",
									"vi": "Knuckles không cần bác sĩ"
								},
								{
									"en": "He needed a road to the Master Emerald",
									"vi": "Cậu cần đường tới Ngọc Chủ"
								},
								{
									"en": "Two hungers shook hands — and only one knew it was a trick",
									"vi": "Hai kẻ đói bắt tay — và chỉ một kẻ biết mình đang lừa"
								},
								{
									"en": "master emerald",
									"vi": "Ngọc Chủ"
								}
							],
							"senior": [
								{
									"en": "Jim Carrey sells honor the way he sells machines",
									"vi": "Jim Carrey bán danh dự như bán máy"
								},
								{
									"en": "Knuckles buys, because loneliness buys anything that sounds like a mission",
									"vi": "Knuckles mua, vì cô đơn hay mua những lời nghe giống sứ mệnh"
								},
								{
									"en": "A bad deal always begins with one true thing: the emerald is real",
									"vi": "Hiệp ước xấu luôn bắt đầu bằng một sự thật: viên ngọc có thật"
								},
								{
									"en": "the emerald",
									"vi": "viên ngọc"
								}
							]
						}
					},
					{
						"id": "so2-smash",
						"image": "/illustrations/so2-05.jpg?v=la",
						"file": "so2-page-05",
						"title": {
							"vi": "Đấm",
							"en": "The Punch"
						},
						"text": {
							"preschool": {
								"vi": "Knuckles đấm. Nhà rung. Sonic chạy. Tails kéo. Chạy đi!",
								"en": "Knuckles punched. The house shook. Sonic ran. Tails pulled. Run!"
							},
							"primary": {
								"vi": "Knuckles đánh vào nhà Tom. Tường bể. Sonic phải chạy. Tails lái xe cứu cậu. Họ thoát.",
								"en": "Knuckles hit Tom's house. The wall broke. Sonic had to run. Tails drove and saved him. They got away."
							},
							"intermediate": {
								"vi": "Nắm đỏ không gõ cửa. Nó vào nhà. Tốc độ lần đầu gặp thứ không chạy theo — thứ đứng lại và đấm. Tails kéo Sonic ra trước khi mái sập.",
								"en": "The red fist did not knock. It came in. Speed met, for the first time, something that did not chase — something that stood and punched. Tails pulled Sonic out before the roof gave."
							},
							"senior": {
								"vi": "Cảnh này là cách sequel dạy: nhà không phải pháo đài. Một đứa trẻ đỏ, tin mình đúng, có thể làm sập chỗ một đứa trẻ xanh mới vừa được gọi là nhà. Đó là sợ thật, không phải trò đuổi.",
								"en": "This scene is how the sequel teaches: a home is not a fort. A red child, sure he is right, can bring down the place a blue child had just learned to call home. That is real fear, not a chase gag."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Knuckles punched",
									"vi": "Knuckles đấm"
								},
								{
									"en": "The house shook",
									"vi": "Nhà rung"
								},
								{
									"en": "Sonic ran",
									"vi": "Sonic chạy"
								},
								{
									"en": "Tails pulled",
									"vi": "Tails kéo"
								}
							],
							"primary": [
								{
									"en": "Knuckles hit Tom's house",
									"vi": "Knuckles đánh vào nhà Tom"
								},
								{
									"en": "The wall broke",
									"vi": "Tường bể"
								},
								{
									"en": "Sonic had to run",
									"vi": "Sonic phải chạy"
								},
								{
									"en": "Tails drove and saved him",
									"vi": "Tails lái xe cứu cậu"
								},
								{
									"en": "They got away",
									"vi": "Họ thoát"
								}
							],
							"intermediate": [
								{
									"en": "The red fist did not knock",
									"vi": "Nắm đỏ không gõ cửa"
								},
								{
									"en": "Speed met, for the first time, something that did not chase — something that stood and punched",
									"vi": "Tốc độ lần đầu gặp thứ không chạy theo — thứ đứng lại và đấm"
								},
								{
									"en": "Tails pulled Sonic out before the roof gave",
									"vi": "Tails kéo Sonic ra trước khi mái sập"
								}
							],
							"senior": [
								{
									"en": "This scene is how the sequel teaches: a home is not a fort",
									"vi": "Cảnh này là cách sequel dạy: nhà không phải pháo đài"
								},
								{
									"en": "A red child, sure he is right, can bring down the place a blue child had just learned to call home",
									"vi": "Một đứa trẻ đỏ, tin mình đúng, có thể làm sập chỗ một đứa trẻ xanh mới vừa được gọi là nhà"
								},
								{
									"en": "That is real fear, not a chase gag",
									"vi": "Đó là sợ thật, không phải trò đuổi"
								}
							]
						}
					},
					{
						"id": "so2-emerald",
						"image": "/illustrations/so2-06.jpg?v=la",
						"file": "so2-page-06",
						"title": {
							"vi": "Ngọc",
							"en": "The Emerald"
						},
						"text": {
							"preschool": {
								"vi": "Ngọc xanh. To lắm. Sáng. Knuckles muốn. Cẩn thận.",
								"en": "A green emerald. So big. It shone. Knuckles wanted it. Be careful."
							},
							"primary": {
								"vi": "Họ tìm Ngọc Chủ. Viên ngọc xanh rất mạnh. Ai giữ ngọc có thể đổi thế giới. Knuckles tin ngọc của tộc cậu.",
								"en": "They looked for the Master Emerald. The green gem was very strong. Whoever held it could change the world. Knuckles believed it belonged to his people."
							},
							"intermediate": {
								"vi": "Ngọc Chủ không phải đồ chơi. Nó biến ý nghĩ thành sức. Tộc Knuckles gác nó. Tộc cú giấu nó. Sonic đứng giữa hai chuyện cũ mà cậu chưa sống.",
								"en": "The Master Emerald was not a toy. It turned thought into force. Knuckles' people guarded it. The owls hid it. Sonic stood between two old stories he had not lived."
							},
							"senior": {
								"vi": "MacGuffin gia đình lần này có trọng lượng: không vàng, không súng — một viên đá nhớ cả một cuộc chiến trẻ con không chứng kiến. Knuckles không tham. Cậu nhớ.",
								"en": "The family MacGuffin has weight this time: not gold, not guns — a stone that remembers a war the children did not watch. Knuckles is not greedy. He is remembering."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "A green emerald",
									"vi": "Ngọc xanh"
								},
								{
									"en": "It shone",
									"vi": "Sáng"
								},
								{
									"en": "Knuckles wanted it",
									"vi": "Knuckles muốn"
								},
								{
									"en": "Be careful",
									"vi": "Cẩn thận"
								},
								{
									"en": "so big",
									"vi": "to lắm"
								},
								{
									"en": "green emerald",
									"vi": "ngọc xanh"
								}
							],
							"primary": [
								{
									"en": "They looked for the Master Emerald",
									"vi": "Họ tìm Ngọc Chủ"
								},
								{
									"en": "The green gem was very strong",
									"vi": "Viên ngọc xanh rất mạnh"
								},
								{
									"en": "Whoever held it could change the world",
									"vi": "Ai giữ ngọc có thể đổi thế giới"
								},
								{
									"en": "Knuckles believed it belonged to his people",
									"vi": "Knuckles tin ngọc của tộc cậu"
								},
								{
									"en": "master emerald",
									"vi": "Ngọc Chủ"
								}
							],
							"intermediate": [
								{
									"en": "The Master Emerald was not a toy",
									"vi": "Ngọc Chủ không phải đồ chơi"
								},
								{
									"en": "It turned thought into force",
									"vi": "Nó biến ý nghĩ thành sức"
								},
								{
									"en": "Knuckles' people guarded it",
									"vi": "Tộc Knuckles gác nó"
								},
								{
									"en": "The owls hid it",
									"vi": "Tộc cú giấu nó"
								},
								{
									"en": "Sonic stood between two old stories he had not lived",
									"vi": "Sonic đứng giữa hai chuyện cũ mà cậu chưa sống"
								},
								{
									"en": "master emerald",
									"vi": "Ngọc Chủ"
								}
							],
							"senior": [
								{
									"en": "The family MacGuffin has weight this time: not gold, not guns — a stone that remembers a war the children did not watch",
									"vi": "MacGuffin gia đình lần này có trọng lượng: không vàng, không súng — một viên đá nhớ cả một cuộc chiến trẻ con không chứng kiến"
								},
								{
									"en": "Knuckles is not greedy",
									"vi": "Knuckles không tham"
								},
								{
									"en": "He is remembering",
									"vi": "Cậu nhớ"
								}
							]
						}
					},
					{
						"id": "so2-honor",
						"image": "/illustrations/so2-07.jpg?v=la",
						"file": "so2-page-07",
						"title": {
							"vi": "Danh dự",
							"en": "Honor"
						},
						"text": {
							"preschool": {
								"vi": "Sonic đánh. Knuckles đánh. Rồi dừng. Nhìn. Bạn được không?",
								"en": "Sonic fought. Knuckles fought. Then they stopped. They looked. Could they be friends?"
							},
							"primary": {
								"vi": "Sonic và Knuckles đánh nhau. Cả hai mạnh. Cả hai mệt. Họ hiểu nhau hơn. Knuckles hông phải xấu hết.",
								"en": "Sonic and Knuckles fought each other. Both were strong. Both were tired. They understood each other more. Knuckles was not all bad."
							},
							"intermediate": {
								"vi": "Hai đứa trẻ đánh vì chuyện người lớn chết. Hết đấm, còn lại cùng một câu: ai bảo vệ những gì còn lại. Danh dự của Knuckles không phải giận. Là không bỏ.",
								"en": "Two children fought a war grown-ups had died in. After the punches, one question was left: who guards what remains. Knuckles' honor was not anger. It was not leaving."
							},
							"senior": {
								"vi": "Đây là cảnh Idris Elba được viết cho: không diễn hề, không găng đỏ. Một võ sĩ nhỏ học rằng kẻ chạy kia cũng mất nhà. Khi hai đứa nhận ra điều đó, phim hết cần phản diện phụ.",
								"en": "This is the scene Idris Elba was written for: no clowning, no red gloves. A small fighter learns that the one who runs also lost a home. Once the two children see that, the movie no longer needs a side villain."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Sonic fought",
									"vi": "Sonic đánh"
								},
								{
									"en": "Knuckles fought",
									"vi": "Knuckles đánh"
								},
								{
									"en": "Then they stopped",
									"vi": "Rồi dừng"
								},
								{
									"en": "They looked",
									"vi": "Nhìn"
								},
								{
									"en": "Could they be friends",
									"vi": "Bạn được hông"
								}
							],
							"primary": [
								{
									"en": "Sonic and Knuckles fought each other",
									"vi": "Sonic và Knuckles đánh nhau"
								},
								{
									"en": "Both were strong",
									"vi": "Cả hai mạnh"
								},
								{
									"en": "Both were tired",
									"vi": "Cả hai mệt"
								},
								{
									"en": "They understood each other more",
									"vi": "Họ hiểu nhau hơn"
								},
								{
									"en": "Knuckles was not all bad",
									"vi": "Knuckles hông phải xấu hết"
								}
							],
							"intermediate": [
								{
									"en": "Two children fought a war grown-ups had died in",
									"vi": "Hai đứa trẻ đánh vì chuyện người lớn chết"
								},
								{
									"en": "After the punches, one question was left: who guards what remains",
									"vi": "Hết đấm, còn lại cùng một câu: ai bảo vệ những gì còn lại"
								},
								{
									"en": "Knuckles' honor was not anger",
									"vi": "Danh dự của Knuckles không phải giận"
								},
								{
									"en": "It was not leaving",
									"vi": "Là không bỏ"
								}
							],
							"senior": [
								{
									"en": "This is the scene Idris Elba was written for: no clowning, no red gloves",
									"vi": "Đây là cảnh Idris Elba được viết cho: không diễn hề, không găng đỏ"
								},
								{
									"en": "A small fighter learns that the one who runs also lost a home",
									"vi": "Một võ sĩ nhỏ học rằng kẻ chạy kia cũng mất nhà"
								},
								{
									"en": "Once the two children see that, the movie no longer needs a side villain",
									"vi": "Khi hai đứa nhận ra điều đó, phim hết cần phản diện phụ"
								}
							]
						}
					},
					{
						"id": "so2-trick",
						"image": "/illustrations/so2-08.jpg?v=la",
						"file": "so2-page-08",
						"title": {
							"vi": "Lừa",
							"en": "The Trick"
						},
						"text": {
							"preschool": {
								"vi": "Bác sĩ lấy ngọc. Knuckles sốc. Bị lừa. Buồn. Ồ.",
								"en": "The doctor took the emerald. Knuckles was shocked. He was tricked. Sad. Oh."
							},
							"primary": {
								"vi": "Robotnik cướp Ngọc Chủ. Ông ta hông giữ lời. Knuckles thấy mình bị lừa. Cậu giận. Cậu cũng buồn.",
								"en": "Robotnik stole the Master Emerald. He did not keep his word. Knuckles saw he was tricked. He was angry. He was sad too."
							},
							"intermediate": {
								"vi": "Robotnik không đánh Knuckles. Ông ta lấy thứ cậu tin. Đó là đòn chí mạng với người sống bằng danh dự: không đấm, chỉ lấy.",
								"en": "Robotnik did not punch Knuckles. He took what Knuckles believed in. That is the killing blow for someone who lives on honor: no fist, only theft."
							},
							"senior": {
								"vi": "Phản diện thật không cần khỏe hơn nắm đấm. Chỉ cần biết đứa trẻ cô đơn sẽ giao ngọc nếu được gọi là đồng minh. Jim Carrey, lần này, không hài. Ông ta lạnh.",
								"en": "A true villain does not need to be stronger than the fist. He only needs to know a lonely child will hand over the stone if someone calls him an ally. Jim Carrey, this time, is not funny. He is cold."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "The doctor took the emerald",
									"vi": "Bác sĩ lấy ngọc"
								},
								{
									"en": "Knuckles was shocked",
									"vi": "Knuckles sốc"
								},
								{
									"en": "He was tricked",
									"vi": "Bị lừa"
								},
								{
									"en": "was tricked",
									"vi": "bị lừa"
								},
								{
									"en": "the emerald",
									"vi": "viên ngọc"
								}
							],
							"primary": [
								{
									"en": "Robotnik stole the Master Emerald",
									"vi": "Robotnik cướp Ngọc Chủ"
								},
								{
									"en": "He did not keep his word",
									"vi": "Ông ta hông giữ lời"
								},
								{
									"en": "Knuckles saw he was tricked",
									"vi": "Knuckles thấy mình bị lừa"
								},
								{
									"en": "He was angry",
									"vi": "Cậu giận"
								},
								{
									"en": "He was sad too",
									"vi": "Cậu cũng buồn"
								},
								{
									"en": "was tricked",
									"vi": "bị lừa"
								},
								{
									"en": "he was tricked",
									"vi": "bị lừa"
								},
								{
									"en": "master emerald",
									"vi": "Ngọc Chủ"
								}
							],
							"intermediate": [
								{
									"en": "Robotnik did not punch Knuckles",
									"vi": "Robotnik không đánh Knuckles"
								},
								{
									"en": "He took what Knuckles believed in",
									"vi": "Ông ta lấy thứ cậu tin"
								},
								{
									"en": "That is the killing blow for someone who lives on honor: no fist, only theft",
									"vi": "Đó là đòn chí mạng với người sống bằng danh dự: không đấm, chỉ lấy"
								}
							],
							"senior": [
								{
									"en": "A true villain does not need to be stronger than the fist",
									"vi": "Phản diện thật không cần khỏe hơn nắm đấm"
								},
								{
									"en": "He only needs to know a lonely child will hand over the stone if someone calls him an ally",
									"vi": "Chỉ cần biết đứa trẻ cô đơn sẽ giao ngọc nếu được gọi là đồng minh"
								},
								{
									"en": "Jim Carrey, this time, is not funny",
									"vi": "Jim Carrey, lần này, không hài"
								}
							]
						}
					},
					{
						"id": "so2-team",
						"image": "/illustrations/so2-09.jpg?v=la",
						"file": "so2-page-09",
						"title": {
							"vi": "Chung",
							"en": "Together"
						},
						"text": {
							"preschool": {
								"vi": "Ba bạn. Xanh. Vàng. Đỏ. Đánh máy to. Giỏi lắm.",
								"en": "Three friends. Blue. Yellow. Red. They fought a big machine. So well done."
							},
							"primary": {
								"vi": "Sonic, Tails và Knuckles đánh chung. Robot to lắm. Knuckles đấm. Tails bay. Sonic chạy. Họ thắng.",
								"en": "Sonic, Tails, and Knuckles fought together. The robot was so big. Knuckles punched. Tails flew. Sonic ran. They won."
							},
							"intermediate": {
								"vi": "Cái máy của bác sĩ nuốt trời Green Hills. Ba đứa trẻ — tốc độ, trí, nắm — lần đầu đứng một hàng. Super Sonic chỉ là hình. Hình thật là Knuckles không bỏ cuộc.",
								"en": "The doctor's machine swallowed the Green Hills sky. Three children — speed, mind, fist — stood in one line for the first time. Super Sonic was only the shape. The real shape was Knuckles not walking away."
							},
							"senior": {
								"vi": "Cao trào sequel: không một anh hùng, một tổ. Vàng trên người Sonic, đỏ trên nắm Knuckles, hai đuôi giữ máy bay. Jim Carrey học bài cũ: dữ liệu không nuốt được ba đứa trẻ tin nhau.",
								"en": "Sequel climax: not one hero, a set. Gold on Sonic, red on Knuckles' fist, two tails holding the plane. Jim Carrey learns the old lesson: data cannot swallow three children who believe each other."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Three friends",
									"vi": "Ba bạn"
								},
								{
									"en": "They fought a big machine",
									"vi": "Đánh máy to"
								},
								{
									"en": "So well done",
									"vi": "Giỏi lắm"
								}
							],
							"primary": [
								{
									"en": "Sonic, Tails, and Knuckles fought together",
									"vi": "Sonic, Tails và Knuckles đánh chung"
								},
								{
									"en": "The robot was so big",
									"vi": "Robot to lắm"
								},
								{
									"en": "Knuckles punched",
									"vi": "Knuckles đấm"
								},
								{
									"en": "Tails flew",
									"vi": "Tails bay"
								},
								{
									"en": "Sonic ran",
									"vi": "Sonic chạy"
								},
								{
									"en": "They won",
									"vi": "Họ thắng"
								},
								{
									"en": "so big",
									"vi": "to lắm"
								}
							],
							"intermediate": [
								{
									"en": "The doctor's machine swallowed the Green Hills sky",
									"vi": "Cái máy của bác sĩ nuốt trời Green Hills"
								},
								{
									"en": "Three children — speed, mind, fist — stood in one line for the first time",
									"vi": "Ba đứa trẻ — tốc độ, trí, nắm — lần đầu đứng một hàng"
								},
								{
									"en": "Super Sonic was only the shape",
									"vi": "Super Sonic chỉ là hình"
								},
								{
									"en": "The real shape was Knuckles not walking away",
									"vi": "Hình thật là Knuckles không bỏ cuộc"
								}
							],
							"senior": [
								{
									"en": "Sequel climax: not one hero, a set",
									"vi": "Cao trào sequel: không một anh hùng, một tổ"
								},
								{
									"en": "Gold on Sonic, red on Knuckles' fist, two tails holding the plane",
									"vi": "Vàng trên người Sonic, đỏ trên nắm Knuckles, hai đuôi giữ máy bay"
								},
								{
									"en": "Jim Carrey learns the old lesson: data cannot swallow three children who believe each other",
									"vi": "Jim Carrey học bài cũ: dữ liệu không nuốt được ba đứa trẻ tin nhau"
								},
								{
									"en": "two tails",
									"vi": "hai đuôi"
								}
							]
						}
					},
					{
						"id": "so2-family",
						"image": "/illustrations/so2-10.jpg?v=la",
						"file": "so2-page-10",
						"title": {
							"vi": "Nhà",
							"en": "Home"
						},
						"text": {
							"preschool": {
								"vi": "Knuckles ở lại. Bóng chày. Kem. Bạn mới. Ngủ ngon nha.",
								"en": "Knuckles stayed. Baseball. Ice cream. New friends. Night night."
							},
							"primary": {
								"vi": "Knuckles hông về. Cậu ở Green Hills. Họ chơi bóng. Họ giữ ngọc chung. Nhà đủ chỗ cho màu đỏ.",
								"en": "Knuckles did not go back. He stayed in Green Hills. They played ball. They guarded the emerald together. Home had room for red."
							},
							"intermediate": {
								"vi": "Phim khép bằng sân bóng, vì đó là thứ nắm đấm tìm được: không đền, chỉ một đội và ai đó không đuổi. Knuckles ngồi. Lần đầu, không gác một mình.",
								"en": "The film closes on a ball field, because that is what the fist was looking for: no temple, only a team and someone who does not send you away. Knuckles sat. For the first time, he was not guarding alone."
							},
							"senior": {
								"vi": "Idris Elba được phép nghỉ: không kinh, không nợ. Còn lại kem, găng bóng chày, và một thị trấn chịu chứa thú mỏ gai. Ngủ được rồi — đấm đã đủ cho một đời trẻ.",
								"en": "Idris Elba is allowed to rest: no scripture, no debt. What remains is ice cream, a baseball glove, and a town willing to hold an echidna. Sleep could come — punching had been enough for one young life."
							}
						},
						"lexicon": {
							"preschool": [
								{
									"en": "Baseball",
									"vi": "Bóng chày"
								},
								{
									"en": "friends",
									"vi": "bạn bè"
								},
								{
									"en": "Knuckles stayed",
									"vi": "Knuckles ở lại"
								},
								{
									"en": "Ice cream",
									"vi": "Kem"
								},
								{
									"en": "New friends",
									"vi": "Bạn mới"
								},
								{
									"en": "Night night",
									"vi": "Ngủ ngon nha"
								}
							],
							"primary": [
								{
									"en": "Knuckles did not go back",
									"vi": "Knuckles hông về"
								},
								{
									"en": "He stayed in Green Hills",
									"vi": "Cậu ở Green Hills"
								},
								{
									"en": "They played ball",
									"vi": "Họ chơi bóng"
								},
								{
									"en": "They guarded the emerald together",
									"vi": "Họ giữ ngọc chung"
								},
								{
									"en": "Home had room for red",
									"vi": "Nhà đủ chỗ cho màu đỏ"
								},
								{
									"en": "the emerald",
									"vi": "viên ngọc"
								}
							],
							"intermediate": [
								{
									"en": "The film closes on a ball field, because that is what the fist was looking for: no temple, only a team and someone who does not send you away",
									"vi": "Phim khép bằng sân bóng, vì đó là thứ nắm đấm tìm được: không đền, chỉ một đội và ai đó không đuổi"
								},
								{
									"en": "Knuckles sat",
									"vi": "Knuckles ngồi"
								},
								{
									"en": "For the first time, he was not guarding alone",
									"vi": "Lần đầu, không gác một mình"
								}
							],
							"senior": [
								{
									"en": "baseball",
									"vi": "bóng chày"
								},
								{
									"en": "echidna",
									"vi": "thú mỏ gai"
								},
								{
									"en": "Idris Elba is allowed to rest: no scripture, no debt",
									"vi": "Idris Elba được phép nghỉ: không kinh, không nợ"
								},
								{
									"en": "What remains is ice cream, a baseball glove, and a town willing to hold an echidna",
									"vi": "Còn lại kem, găng bóng chày, và một thị trấn chịu chứa thú mỏ gai"
								},
								{
									"en": "Sleep could come — punching had been enough for one young life",
									"vi": "Ngủ được rồi — đấm đã đủ cho một đời trẻ"
								},
								{
									"en": "ice cream",
									"vi": "kem"
								}
							]
						}
					}
				]
			}]
		}
	]
};
var APP_NAME = story_default.appName;
var ARCHIVED = Boolean(story_default.archived);
var LEVELS = story_default.levels;
var SERIES = story_default.series.filter((item) => !item.archived);
function audioPath(level, lang, file) {
	return `/audio/${level}/${lang}/${file}.mp3`;
}
var styles_default = "/assets/styles-BBp7653n.css";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Aang, người cuối cùng điều khiển gió. A gentle picture book with Southern Vietnamese narration."
			},
			{
				name: "theme-color",
				content: "#C56D24"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "preload",
				as: "image",
				href: "/illustrations/page-00.jpg"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "vi",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "font-sans bg-paper text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter = () => import("./routes-BpJMBsvC.mjs");
var rootRouteChildren = { IndexRoute: createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { SERIES as a, LEVELS as i, APP_NAME as n, audioPath as o, ARCHIVED as r, router_exports as t };
