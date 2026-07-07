import { p as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { C as CircleCheck, E as Building, T as Calendar, c as Shield, f as Phone, h as Mail, s as Smartphone } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.profile-JbcA544a.js
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 grid place-items-center text-white text-2xl font-bold mx-auto shadow-lg",
						children: "AR"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-xl font-bold",
						children: "Azzahra"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500",
						children: "Employee · Attendance App"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 rounded-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), " Verified Employee"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700",
				children: [
					[Mail, "aisha.r@sentinel.co"],
					[Phone, "+62 812-3456-7890"],
					[Building, "Sentinel HQ Jakarta"],
					[Calendar, "Joined 12 March 2023"]
				].map(([Icon, t], i) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 text-indigo-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t })]
					}, i);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-3",
					children: "Security"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "w-4 h-4 text-emerald-500" }), " Device Linked · IMEI 35•••42"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-4 h-4 text-emerald-500" }), " Biometric template enrolled"]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Profile as component };
