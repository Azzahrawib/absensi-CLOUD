import { r as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as DialogBackdrop, i as DialogDescription, m as require_react, n as DialogPortal, o as AlertDialogRoot, p as require_jsx_runtime, r as DialogPopup, t as DialogTitle } from "../_libs/@base-ui/react+[...].mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { t as Button$1 } from "./button-CqVBJ60X.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as ArrowRight, a as TriangleAlert, v as Lock, x as FingerprintPattern, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DAZVbOFQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function AlertDialog$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogRoot, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "alert-dialog-overlay",
		className: cn("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function AlertDialogContent({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPopup, {
		"data-slot": "alert-dialog-content",
		"data-size": size,
		className: cn("group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		"data-slot": "alert-dialog-title",
		className: cn("font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		"data-slot": "alert-dialog-description",
		className: cn("text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		"data-slot": "alert-dialog-action",
		className: cn(className),
		...props
	});
}
function Login() {
	const nav = useNavigate();
	const [checking, setChecking] = (0, import_react.useState)(false);
	const [showError, setShowError] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const handleLogin = async () => {
		if (!email || !password) {
			toast.error("Formulir Wajib Diisi", { description: "Mohon masukkan email korporat dan password Anda." });
			return;
		}
		setChecking(true);
		await new Promise((r) => setTimeout(r, 1e3));
		setChecking(false);
		const savedUsers = localStorage.getItem("sentinel_users_db");
		const matchedEmployee = (savedUsers ? JSON.parse(savedUsers) : []).find((emp) => emp.email?.trim().toLowerCase() === email.trim().toLowerCase()) || (email === "aisha.r@sentinel.co" ? {
			id: "EMP-9999",
			full_name: "Azzahra Asabri",
			email: "aisha.r@sentinel.co",
			role: "IT Intern"
		} : null);
		if (!matchedEmployee) {
			toast.error("Akses Ditolak!", { description: "Email korporat Anda belum terdaftar di sistem HRD." });
			return;
		}
		const bindingKey = `device_bound_status_${matchedEmployee.id}`;
		const hasBinding = localStorage.getItem(bindingKey);
		if (hasBinding === "blocked") {
			setShowError(true);
			return;
		}
		if (!hasBinding) localStorage.setItem(bindingKey, "bound_to_current_hardware");
		toast.success(`Selamat Datang, ${matchedEmployee.full_name || matchedEmployee.name}!`);
		sessionStorage.setItem("active_session_user", JSON.stringify(matchedEmployee));
		nav({ to: "/employee" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 grid place-items-center shadow-lg shadow-indigo-900/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "w-6 h-6 text-white" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold tracking-tight",
					children: "Sentinel Attend"
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
								placeholder: "Bebas ketik apa saja untuk demo",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-indigo-500"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							onClick: handleLogin,
							disabled: checking,
							className: "w-full bg-indigo-600 hover:bg-indigo-500 mt-2 h-11 font-medium transition-colors",
							children: checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }), " Memverifikasi..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog$1, {
			open: showError,
			onOpenChange: setShowError,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				className: "bg-slate-900 border-slate-800 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, {
					className: "flex items-center gap-2 text-red-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5" }), " Keamanan Terkunci!"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, {
					className: "text-slate-400 text-sm",
					children: [
						"Sistem mendeteksi Anda mencoba masuk menggunakan HP yang berbeda. Harap hubungi HRD untuk melakukan ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Reset Device Binding" }),
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-indigo-600 text-white hover:bg-indigo-500",
					onClick: () => setShowError(false),
					children: "Mengerti"
				}) })]
			})
		})]
	});
}
//#endregion
export { Login as component };
