import { r as __toESM } from "../_runtime.mjs";
import { m as require_react, p as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { i as supabase, n as Label, t as Input$1 } from "./supabaseService-D_Lp6Qrb.mjs";
import { t as Button$1 } from "./button-CqVBJ60X.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as ArrowRight, O as FingerprintPattern, T as LoaderCircle, w as Lock } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bt0nrW7j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const handleLogin = async () => {
		if (!email || !password) {
			toast.error("Formulir Wajib Diisi", { description: "Mohon masukkan email korporat dan password Anda." });
			return;
		}
		setIsLoading(true);
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			if (data.user) {
				const userName = data.user.user_metadata?.full_name || "Karyawan";
				toast.success(`Selamat Datang, ${userName}!`);
				navigate({ to: "/employee" });
			}
		} catch (error) {
			toast.error("Kredensial Tidak Valid", { description: "Email atau password salah. Silakan hubungi HRD jika masalah berlanjut." });
			console.error("Authentication Error:", error);
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 grid place-items-center shadow-lg shadow-indigo-900/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "w-6 h-6 text-white" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold tracking-tight",
					children: "Geo Attend"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: "Secure Workforce Verification"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-md font-semibold text-indigo-400",
						children: "Employee Portal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-slate-500 mt-1",
						children: "Gunakan email yang didaftarkan oleh HRD"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-slate-300",
								children: "Corporate Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "email",
								placeholder: "contoh: joko@company.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								onKeyDown: (e) => e.key === "Enter" && handleLogin(),
								disabled: isLoading,
								className: "bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-indigo-500"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-slate-300",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "password",
								placeholder: "Masukkan password Anda",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								onKeyDown: (e) => e.key === "Enter" && handleLogin(),
								disabled: isLoading,
								className: "bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-indigo-500"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							onClick: handleLogin,
							disabled: isLoading,
							className: "w-full bg-indigo-600 hover:bg-indigo-500 mt-2 h-11 font-medium transition-colors",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }), " Memverifikasi..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Secure Sign In" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })
								]
							})
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { Login as component };
