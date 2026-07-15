import { r as __toESM } from "../_runtime.mjs";
import { m as require_react, p as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cx1rhAkW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Fungsi global untuk menangkap dan melaporkan runtime error aplikasi.
* Bisa diintegrasikan dengan Console Logging, Supabase DB, atau Sentry di masa depan.
*/
function reportAppError(error, context = {}) {
	if (typeof window === "undefined") return;
	const errorRoute = window.location.pathname;
	const errorPayload = {
		message: error instanceof Error ? error.message : String(error),
		stack: error instanceof Error ? error.stack : void 0,
		route: errorRoute,
		source: "react_error_boundary",
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		...context
	};
	const options = {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	};
	console.error(`[App Error] [${options.severity?.toUpperCase()}] Route: ${errorRoute}`, {
		payload: errorPayload,
		options
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: "system",
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-slate-500",
			actionButton: "group-[.toast]:bg-slate-900 group-[.toast]:text-slate-50",
			cancelButton: "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportAppError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({ meta: [
		{ charSet: "utf-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{ title: "Absensi App" },
		{
			name: "description",
			content: "Absensi App by Azzahra"
		},
		{
			name: "author",
			content: "Azzahra"
		},
		{
			property: "og:title",
			content: "Absensi App"
		},
		{
			property: "og:description",
			content: "Absensi App by Azzahra"
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "twitter:site",
			content: "@Lovable"
		}
	] }),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", {
			suppressHydrationWarning: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			suppressHydrationWarning: true,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-center"
		})]
	});
}
var $$splitComponentImporter$5 = () => import("./employee-Czb8XSlk.mjs");
var Route$5 = createFileRoute("/employee")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin-Cb_bnEs0.mjs");
var Route$4 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./routes-Bt0nrW7j.mjs");
var Route$3 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./employee.index-CiP8J0EH.mjs");
var Route$2 = createFileRoute("/employee/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./employee.profile-1lc0Wy0l.mjs");
var Route$1 = createFileRoute("/employee/profile")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./employee.checkin-Cq3ttkBy.mjs");
var Route = createFileRoute("/employee/checkin")({
	validateSearch: (search) => ({ type: search.type === "out" ? "out" : "in" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var EmployeeRoute = Route$5.update({
	id: "/employee",
	path: "/employee",
	getParentRoute: () => Route$6
});
var AdminRoute = Route$4.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$6
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var EmployeeIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => EmployeeRoute
});
var EmployeeProfileRoute = Route$1.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => EmployeeRoute
});
var EmployeeRouteChildren = {
	EmployeeCheckinRoute: Route.update({
		id: "/checkin",
		path: "/checkin",
		getParentRoute: () => EmployeeRoute
	}),
	EmployeeProfileRoute,
	EmployeeIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	EmployeeRoute: EmployeeRoute._addFileChildren(EmployeeRouteChildren)
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		ssr: { enabled: false },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
