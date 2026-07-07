import { r as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { m as require_react, p as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as Input$1 } from "./input-B6v4Jp25.mjs";
import { t as Button$1 } from "./button-CqVBJ60X.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { S as ClipboardList, d as Radio, i as UserPlus, n as Users, o as Trash2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-pQSByNOo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Table({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			"data-slot": "table",
			className: cn("w-full caption-bottom text-sm", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
		"data-slot": "table-header",
		className: cn("[&_tr]:border-b", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", className),
		...props
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		"data-slot": "table-row",
		className: cn("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", className),
		...props
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		"data-slot": "table-head",
		className: cn("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		"data-slot": "table-cell",
		className: cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className),
		...props
	});
}
function Card({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		"data-size": size,
		className: cn("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-header",
		className: cn("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-title",
		className: cn("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-content",
		className: cn("px-(--card-spacing)", className),
		...props
	});
}
function AdminDashboard() {
	const [view, setView] = (0, import_react.useState)("devices");
	const [users, setUsers] = (0, import_react.useState)([]);
	const [logs, setLogs] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setUsers(JSON.parse(localStorage.getItem("sentinel_users_db") || "[]"));
		setLogs(JSON.parse(localStorage.getItem("attendance_logs") || "[]"));
	}, []);
	const addEmployee = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newUser = {
			id: `EMP-${users.length + 1001}`,
			full_name: formData.get("name"),
			email: formData.get("email"),
			password: formData.get("password")
		};
		const updated = [...users, newUser];
		setUsers(updated);
		localStorage.setItem("sentinel_users_db", JSON.stringify(updated));
		toast.success("Karyawan ditambahkan!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-100 flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-64 bg-slate-900 text-white p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-bold mb-6",
				children: "Sentinel Admin"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "ghost",
						className: "w-full justify-start",
						onClick: () => setView("devices"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mr-2" }), " Karyawan"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "ghost",
						className: "w-full justify-start",
						onClick: () => setView("monitoring"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "mr-2" }), " Monitoring"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "ghost",
						className: "w-full justify-start",
						onClick: () => setView("reports"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "mr-2" }), " Laporan & Log"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 p-8",
			children: [view === "devices" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Manajemen Karyawan" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: addEmployee,
				className: "grid grid-cols-4 gap-2 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						name: "name",
						placeholder: "Nama",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						name: "email",
						type: "email",
						placeholder: "Email",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						name: "password",
						type: "password",
						placeholder: "Password",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						type: "submit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-2" }), " Tambah"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nama" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Email" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Aksi" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: u.id }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: u.full_name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: u.email }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "destructive",
					size: "sm",
					onClick: () => {
						const filtered = users.filter((x) => x.id !== u.id);
						setUsers(filtered);
						localStorage.setItem("sentinel_users_db", JSON.stringify(filtered));
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				}) })
			] }, u.id)) })] })] })] }), view === "reports" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Foto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: logs.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.employee_id }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.photo_data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: l.photo_data,
					className: "w-12 h-12 object-cover rounded"
				}) : "No Photo" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.status })
			] }, i)) })] })]
		})]
	});
}
//#endregion
export { AdminDashboard as component };
