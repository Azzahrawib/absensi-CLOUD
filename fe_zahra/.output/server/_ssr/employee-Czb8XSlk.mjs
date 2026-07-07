import { p as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { b as House, g as LogOut, r as User, w as Camera } from "../_libs/lucide-react.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee-Czb8XSlk.js
var import_jsx_runtime = require_jsx_runtime();
function EmployeeLayout() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-slate-100 dark:bg-slate-950",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen flex flex-col relative shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 pb-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-4",
					children: [[
						{
							to: "/employee",
							label: "Home",
							icon: House,
							exact: true
						},
						{
							to: "/employee/checkin",
							label: "Check In",
							icon: Camera
						},
						{
							to: "/employee/profile",
							label: "Profile",
							icon: User
						}
					].map((t) => {
						const active = t.exact ? path === t.to : path.startsWith(t.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: t.to,
							className: `flex flex-col items-center py-3 gap-1 text-[11px] font-medium ${active ? "text-indigo-600" : "text-slate-400"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "w-5 h-5" }), t.label]
						}, t.to);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex flex-col items-center py-3 gap-1 text-[11px] font-medium text-slate-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-5 h-5" }), "Sign Out"]
					})]
				})
			})]
		})
	});
}
//#endregion
export { EmployeeLayout as component };
