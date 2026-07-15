import { r as __toESM } from "../_runtime.mjs";
import { m as require_react, p as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { i as getActiveEmployee, o as getVendorById } from "./db-_r_BwSlB.mjs";
import { F as Calendar, I as Building, M as CircleCheck, b as MapPin, g as Phone, l as Smartphone, u as Shield, x as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.profile-1lc0Wy0l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const [profile, setProfile] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		setProfile(getActiveEmployee());
	}, []);
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-5 text-center text-sm text-slate-500",
		children: "Memuat profil..."
	});
	const vendor = getVendorById(profile.vendor_id);
	const initials = profile.full_name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
	const joined = new Date(profile.created_at).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	const infoRows = [
		[Mail, profile.email],
		[Phone, profile.phone || "Belum diisi"],
		[Building, vendor ? vendor.name : "Belum terikat ke vendor"],
		[Calendar, `Bergabung ${joined}`]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 grid place-items-center text-white text-2xl font-bold mx-auto shadow-lg",
						children: initials
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-xl font-bold",
						children: profile.full_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-slate-500",
						children: [
							profile.role,
							" · ",
							profile.department
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 rounded-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), " Verified Employee"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-slate-400 mt-1 font-mono",
						children: profile.id
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700",
				children: infoRows.map(([Icon, t], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 text-indigo-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t })]
				}, i))
			}),
			vendor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2",
					children: "Lokasi Vendor Terikat"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 text-indigo-600 mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: vendor.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500",
							children: vendor.address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-400 mt-1",
							children: [
								"Radius presensi: ",
								vendor.radius_m,
								"m"
							]
						})
					] })]
				})]
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "w-4 h-4 text-emerald-500" }), " Device Linked · IMEI terdaftar"]
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
