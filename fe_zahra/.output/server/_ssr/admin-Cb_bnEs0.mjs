import { r as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as DialogPortal$1, c as DialogClose, i as DialogRoot, l as DialogBackdrop, m as require_react, o as DialogPopup, p as require_jsx_runtime, r as DialogTitle$1 } from "../_libs/@base-ui/react+[...].mjs";
import { i as supabase, n as Label, r as inviteNewEmployee, t as Input$1 } from "./supabaseService-D_Lp6Qrb.mjs";
import { t as Button$1 } from "./button-CqVBJ60X.mjs";
import { r as deleteEmployee, s as updateEmployee, t as countEmployeesForVendor } from "./db-_r_BwSlB.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Image, L as Building2, M as CircleCheck, O as FingerprintPattern, T as LoaderCircle, _ as Pencil, b as MapPin, c as Trash2, h as Radio, i as Users, j as ClipboardList, k as Crosshair, n as Wifi, o as UserPlus, p as RefreshCw, r as WifiOff, s as TriangleAlert, t as X, y as MapPinned, z as Bell } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Cb_bnEs0.js
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
function Dialog$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
		"data-slot": "dialog",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
		"data-slot": "dialog-content",
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			"data-slot": "dialog-close",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				className: "absolute top-2 right-2",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-header",
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, { variant: "outline" }),
			children: "Close"
		})]
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "dialog-title",
		className: cn("font-heading text-base leading-none font-medium", className),
		...props
	});
}
var alertVariants = cva("group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4", {
	variants: { variant: {
		default: "bg-card text-card-foreground",
		destructive: "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current"
	} },
	defaultVariants: { variant: "default" }
});
function Alert({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert",
		role: "alert",
		className: cn(alertVariants({ variant }), className),
		...props
	});
}
function AlertTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-title",
		className: cn("font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", className),
		...props
	});
}
function AlertDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-description",
		className: cn("text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4", className),
		...props
	});
}
var emptyEmployeeForm = {
	full_name: "",
	email: "",
	role: "",
	department: "",
	phone: "",
	vendor_id: ""
};
var emptyVendorForm = {
	name: "",
	address: "",
	latitude: "",
	longitude: "",
	radius_m: "150"
};
function AdminDashboard() {
	const [view, setView] = (0, import_react.useState)("reports");
	const [online, setOnline] = (0, import_react.useState)(true);
	const queryClient = useQueryClient();
	(0, import_react.useEffect)(() => {
		const update = () => setOnline(navigator.onLine);
		update();
		window.addEventListener("online", update);
		window.addEventListener("offline", update);
		return () => {
			window.removeEventListener("online", update);
			window.removeEventListener("offline", update);
		};
	}, []);
	const employeesQuery = useQuery({
		queryKey: ["employees"],
		queryFn: async () => {
			const { data, error } = await supabase.from("employees").select("*");
			if (error) throw error;
			return data ?? [];
		}
	});
	const vendorsQuery = useQuery({
		queryKey: ["vendors"],
		queryFn: async () => {
			const { data, error } = await supabase.from("vendors").select("*");
			if (error) throw error;
			return data ?? [];
		}
	});
	const attendanceQuery = useQuery({
		queryKey: ["attendance"],
		queryFn: async () => {
			const { data, error } = await supabase.from("attendances").select("*");
			if (error) throw error;
			return (data ?? []).map((r) => ({
				...r,
				photo: r.photo_data
			}));
		}
	});
	const employees = employeesQuery.data ?? [];
	const vendors = vendorsQuery.data ?? [];
	const attendance = attendanceQuery.data ?? [];
	const invalidateAll = () => {
		queryClient.invalidateQueries({ queryKey: ["employees"] });
		queryClient.invalidateQueries({ queryKey: ["vendors"] });
		queryClient.invalidateQueries({ queryKey: ["attendance"] });
	};
	const employeeSummaries = (0, import_react.useMemo)(() => {
		const latestByEmployee = /* @__PURE__ */ new Map();
		attendance.forEach((log) => {
			const current = latestByEmployee.get(log.employee_id);
			if (!current || new Date(log.created_at).getTime() > new Date(current.created_at).getTime()) latestByEmployee.set(log.employee_id, log);
		});
		return employees.map((profile) => ({
			profile,
			latestAttendance: latestByEmployee.get(profile.id)
		}));
	}, [employees, attendance]);
	const sideNavItems = [
		{
			id: "reports",
			label: "Laporan & Log Anomali",
			icon: ClipboardList
		},
		{
			id: "monitoring",
			label: "Monitoring Real-Time",
			icon: Radio
		},
		{
			id: "devices",
			label: "Manajemen Karyawan",
			icon: Users
		},
		{
			id: "locations",
			label: "Vendor Locations",
			icon: MapPinned
		}
	];
	const isLoading = employeesQuery.isLoading || vendorsQuery.isLoading || attendanceQuery.isLoading;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-100 dark:bg-slate-950 flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden md:flex w-64 bg-slate-900 text-slate-100 flex-col shrink-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 flex items-center gap-3 border-b border-slate-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-9 h-9 rounded-lg bg-indigo-600 grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-sm",
						children: "GeoAttend"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-400",
						children: "HRD Admin Console"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "p-3 flex-1 space-y-1",
					children: sideNavItems.map((n) => {
						const active = view === n.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setView(n.id),
							className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors relative ${active ? "bg-indigo-600 text-white shadow-sm" : "text-slate-300 hover:bg-slate-800"}`,
							children: [
								active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full bg-white/70" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "w-4 h-4 shrink-0" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.label })
							]
						}, n.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3 border-t border-slate-800",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-2 text-[11px] px-3 py-2 rounded-lg ${online ? "text-emerald-400" : "text-red-400"}`,
						children: [online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "w-3.5 h-3.5" }), online ? "Sistem Online" : "Koneksi Terputus"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 flex flex-col min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-16 bg-white border-b px-6 flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold",
					children: sideNavItems.find((n) => n.id === view)?.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-5 h-5 text-slate-500" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 p-6 overflow-auto",
				children: [
					view === "reports" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reports, {
						summaries: employeeSummaries,
						allLogs: attendance
					}),
					view === "monitoring" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitoring, {
						summaries: employeeSummaries,
						vendors
					}),
					view === "devices" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeesPanel, {
						employees,
						vendors,
						onChanged: invalidateAll
					}),
					view === "locations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VendorsPanel, {
						vendors,
						onChanged: invalidateAll
					})
				]
			})]
		})]
	});
}
function EmployeesPanel({ employees, vendors, onChanged }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyEmployeeForm);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const vendorName = (id) => vendors.find((v) => v.id === id)?.name ?? "Belum ditentukan";
	const openCreate = () => {
		setEditingId(null);
		setForm(emptyEmployeeForm);
		setOpen(true);
	};
	const openEdit = (emp) => {
		setEditingId(emp.id);
		setForm({
			full_name: emp.full_name,
			email: emp.email,
			role: emp.role,
			department: emp.department,
			phone: emp.phone,
			vendor_id: emp.vendor_id ?? ""
		});
		setOpen(true);
	};
	const handleSave = async () => {
		if (!form.full_name.trim() || !form.email.trim()) {
			toast.error("Nama dan email wajib diisi.");
			return;
		}
		setIsSubmitting(true);
		const payload = {
			full_name: form.full_name.trim(),
			email: form.email.trim(),
			role: form.role.trim() || "Staff",
			department: form.department.trim() || "General",
			phone: form.phone.trim(),
			vendor_id: form.vendor_id || null
		};
		try {
			if (editingId) {
				await updateEmployee(editingId, payload);
				toast.success("Data karyawan diperbarui.");
			} else {
				const res = await inviteNewEmployee(payload);
				if (res.success) toast.success("Karyawan baru diundang! Email verifikasi telah terkirim.");
				else throw new Error(res.error || "Gagal melakukan registrasi.");
			}
			onChanged();
			setOpen(false);
			setForm(emptyEmployeeForm);
			setEditingId(null);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Terjadi kesalahan integrasi database cloud.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleDelete = (emp) => {
		if (!window.confirm(`Hapus karyawan ${emp.full_name}? Tindakan ini tidak bisa dibatalkan.`)) return;
		deleteEmployee(emp.id);
		toast.success("Karyawan dihapus.");
		onChanged();
	};
	const handleResetDevice = async (empId) => {
		try {
			const { error } = await supabase.from("device_bindings").update({ is_active: false }).eq("employee_id", empId);
			if (error) throw error;
			localStorage.removeItem(`device_bound_status_${empId}`);
			toast.success("Device Binding berhasil direset di Cloud Supabase!");
		} catch (err) {
			toast.error("Gagal mereset perangkat: " + err.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex flex-row items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Data Master Karyawan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-slate-500 mt-1",
				children: [employees.length, " karyawan terdaftar"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				className: "bg-indigo-600 hover:bg-indigo-500",
				onClick: openCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4 mr-1.5" }), " Daftarkan Karyawan Baru"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0",
			children: employees.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				className: "m-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "Belum ada data" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: "Klik \"Daftarkan Karyawan Baru\" untuk menambahkan karyawan pertama." })
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nama Karyawan" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Email Login" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Jabatan / Dept" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Vendor Terikat" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Aksi"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: employees.map((emp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: emp.full_name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: emp.email }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: emp.role }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400",
					children: emp.department
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "w-3 h-3" }),
						" ",
						vendorName(emp.vendor_id)
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "text-right space-x-1.5 whitespace-nowrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "outline",
							size: "sm",
							onClick: () => openEdit(emp),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "w-3.5 h-3.5 mr-1" }), " Edit"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "outline",
							size: "sm",
							onClick: () => handleResetDevice(emp.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "w-3.5 h-3.5 mr-1" }), " Reset Device"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "outline",
							size: "sm",
							className: "text-red-600 hover:bg-red-50",
							onClick: () => handleDelete(emp),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
						})
					]
				})
			] }, emp.id)) })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "bg-slate-900 border-slate-800 text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? "Edit Data Karyawan" : "Registrasi Karyawan Baru (Sistem Undang Email)" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nama Lengkap" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								className: "bg-slate-950 border-slate-800",
								value: form.full_name,
								onChange: (e) => setForm({
									...form,
									full_name: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email Login" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								className: "bg-slate-950 border-slate-800",
								value: form.email,
								disabled: !!editingId,
								onChange: (e) => setForm({
									...form,
									email: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nomor Telepon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								className: "bg-slate-950 border-slate-800",
								value: form.phone,
								onChange: (e) => setForm({
									...form,
									phone: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Jabatan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									className: "bg-slate-950 border-slate-800",
									value: form.role,
									onChange: (e) => setForm({
										...form,
										role: e.target.value
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Departemen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									className: "bg-slate-950 border-slate-800",
									value: form.department,
									onChange: (e) => setForm({
										...form,
										department: e.target.value
									})
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Lokasi Vendor (mengikat radius presensi)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "w-full mt-1 rounded-md bg-slate-950 border border-slate-800 text-sm px-3 py-2 text-white",
								value: form.vendor_id,
								onChange: (e) => setForm({
									...form,
									vendor_id: e.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— Belum ditentukan —"
								}), vendors.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: v.id,
									children: [
										v.name,
										" (radius ",
										v.radius_m,
										"m)"
									]
								}, v.id))]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						onClick: () => setOpen(false),
						disabled: isSubmitting,
						children: "Batal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						className: "bg-indigo-600 hover:bg-indigo-500 text-white",
						onClick: handleSave,
						disabled: isSubmitting,
						children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : null, editingId ? "Simpan Perubahan" : "Kirim Undangan Akun"]
					})] })
				]
			})
		})
	] });
}
function VendorsPanel({ vendors, onChanged }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyVendorForm);
	const [locating, setLocating] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const openCreate = () => {
		setEditingId(null);
		setForm(emptyVendorForm);
		setOpen(true);
	};
	const openEdit = (v) => {
		setEditingId(v.id);
		setForm({
			name: v.name,
			address: v.address,
			latitude: String(v.latitude),
			longitude: String(v.longitude),
			radius_m: String(v.radius_m)
		});
		setOpen(true);
	};
	const useCurrentLocation = () => {
		if (!navigator.geolocation) {
			toast.error("Geolocation tidak didukung browser ini.");
			return;
		}
		setLocating(true);
		navigator.geolocation.getCurrentPosition((pos) => {
			setForm((f) => ({
				...f,
				latitude: pos.coords.latitude.toFixed(6),
				longitude: pos.coords.longitude.toFixed(6)
			}));
			setLocating(false);
			toast.success("Koordinat lokasi saat ini berhasil diambil.");
		}, () => {
			setLocating(false);
			toast.error("Gagal mengambil lokasi. Pastikan izin GPS diaktifkan.");
		}, { enableHighAccuracy: true });
	};
	const handleSave = async () => {
		const payload = {
			name: form.name.trim(),
			address: form.address.trim(),
			latitude: parseFloat(form.latitude),
			longitude: parseFloat(form.longitude),
			radius_m: parseInt(form.radius_m, 10)
		};
		if (!payload.name || Number.isNaN(payload.latitude) || Number.isNaN(payload.longitude) || Number.isNaN(payload.radius_m)) {
			toast.error("Nama, latitude, longitude, dan radius wajib diisi dengan benar.");
			return;
		}
		setIsSubmitting(true);
		try {
			if (editingId) {
				const { error } = await supabase.from("vendors").update(payload).eq("id", editingId);
				if (error) throw error;
				toast.success("Vendor location diperbarui.");
			} else {
				const { error } = await supabase.from("vendors").insert([payload]);
				if (error) throw error;
				toast.success("Vendor location baru ditambahkan.");
			}
			onChanged();
			setOpen(false);
			setForm(emptyVendorForm);
			setEditingId(null);
		} catch (err) {
			toast.error(err?.message || "Gagal menyimpan vendor ke Supabase.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleDelete = async (v) => {
		const boundCount = countEmployeesForVendor(v.id);
		const warning = boundCount > 0 ? `${boundCount} karyawan saat ini terikat ke "${v.name}" dan akan menjadi "belum ditentukan". Lanjutkan hapus?` : `Hapus vendor location "${v.name}"?`;
		if (!window.confirm(warning)) return;
		try {
			const { error } = await supabase.from("vendors").delete().eq("id", v.id);
			if (error) throw error;
			toast.success("Vendor location deleted.");
			onChanged();
		} catch (err) {
			toast.error(err?.message || "Gagal menghapus vendor dari Supabase.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex flex-row items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Vendor Locations"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-slate-500 mt-1",
				children: [vendors.length, " lokasi terdaftar"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				className: "bg-indigo-600 hover:bg-indigo-500",
				onClick: openCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPinned, { className: "w-4 h-4 mr-1.5" }), " Tambah Vendor"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-0",
			children: vendors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				className: "m-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "Belum ada vendor" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: "Tambahkan lokasi vendor terlebih dahulu." })
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nama Vendor" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Alamat" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Koordinat" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Radius" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Karyawan" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Aksi"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: vendors.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: v.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-xs text-slate-500 max-w-[220px] truncate",
					children: v.address || "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "font-mono text-xs",
					children: [
						v.latitude.toFixed(5),
						", ",
						v.longitude.toFixed(5)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [v.radius_m, " m"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: countEmployeesForVendor(v.id) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "text-right space-x-1.5 whitespace-nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "outline",
						size: "sm",
						onClick: () => openEdit(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "w-3.5 h-3.5 mr-1" }), " Edit"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						size: "sm",
						className: "text-red-600 hover:bg-red-50",
						onClick: () => handleDelete(v),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
					})]
				})
			] }, v.id)) })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "bg-slate-900 border-slate-800 text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingId ? "Edit Vendor Location" : "Tambah Vendor Location" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nama Vendor / Lokasi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								className: "bg-slate-950 border-slate-800",
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Alamat" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								className: "bg-slate-950 border-slate-800",
								value: form.address,
								onChange: (e) => setForm({
									...form,
									address: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Latitude" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									className: "bg-slate-950 border-slate-800",
									value: form.latitude,
									onChange: (e) => setForm({
										...form,
										latitude: e.target.value
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Longitude" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
									className: "bg-slate-950 border-slate-800",
									value: form.longitude,
									onChange: (e) => setForm({
										...form,
										longitude: e.target.value
									})
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								type: "button",
								variant: "outline",
								className: "w-full",
								onClick: useCurrentLocation,
								disabled: locating,
								children: [locating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "w-3.5 h-3.5 mr-1.5" }), "Ambil Lokasi Saat Ini"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Radius Presensi (meter)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								className: "bg-slate-950 border-slate-800",
								type: "number",
								value: form.radius_m,
								onChange: (e) => setForm({
									...form,
									radius_m: e.target.value
								})
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "outline",
						onClick: () => setOpen(false),
						disabled: isSubmitting,
						children: "Batal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						className: "bg-indigo-600 hover:bg-indigo-500 text-white",
						onClick: handleSave,
						disabled: isSubmitting,
						children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2 inline" }) : null, editingId ? "Simpan Perubahan" : "Simpan Vendor"]
					})] })
				]
			})
		})
	] });
}
function Reports({ summaries, allLogs }) {
	const [previewPhoto, setPreviewPhoto] = (0, import_react.useState)(null);
	const nameOf = (id) => summaries.find((s) => s.profile.id === id)?.profile.full_name ?? id;
	const anomalies = allLogs.filter((l) => l.status === "flagged_mock_gps" || l.status === "outside_geofence");
	const getStatusLabel = (status) => {
		switch (status) {
			case "success": return "Valid";
			case "flagged_mock_gps": return "Fake GPS!";
			case "outside_geofence": return "Luar Radius";
			default: return "Anomali";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base text-red-500",
				children: "Log Kecurangan & Anomali Presensi"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: anomalies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
					className: "m-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-emerald-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "Aman" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: "Belum ada indikasi kecurangan Geofence maupun Fake GPS terdeteksi." })
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Foto" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Karyawan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Jenis Pelanggaran" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Jarak Saat Absen" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Waktu" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: anomalies.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "bg-red-50/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoThumb, {
							photo: log.photo,
							onClick: () => log.photo && setPreviewPhoto(log.photo)
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: nameOf(log.employee_id)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full",
							children: getStatusLabel(log.status)
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "font-mono text-red-600",
							children: [Math.round(log.distance_m), " m"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(log.created_at).toLocaleString() })
					]
				}, log.id)) })] })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: "Seluruh Log Absensi Real-Time"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: allLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
					className: "m-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "Belum ada aktivitas" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: "Log presensi karyawan cloud akan muncul di sini." })
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Foto" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Karyawan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tipe" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status Validasi" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Jarak" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Waktu" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: allLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoThumb, {
						photo: log.photo,
						onClick: () => log.photo && setPreviewPhoto(log.photo)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: nameOf(log.employee_id) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "uppercase text-xs font-semibold text-slate-600",
						children: log.type
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[11px] font-semibold px-2 py-0.5 rounded-full ${log.status === "success" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`,
						children: getStatusLabel(log.status)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "font-mono",
						children: [Math.round(log.distance_m), " m"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: new Date(log.created_at).toLocaleString() })
				] }, log.id)) })] })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open: !!previewPhoto,
				onOpenChange: (o) => !o && setPreviewPhoto(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "bg-slate-900 border-slate-800 max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-white",
						children: "Foto Bukti Presensi (On-Site Selfie)"
					}) }), previewPhoto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: previewPhoto,
						alt: "Bukti presensi",
						className: "w-full rounded-lg object-cover"
					})]
				})
			})
		]
	});
}
function PhotoThumb({ photo, onClick }) {
	if (!photo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-10 h-10 rounded-lg bg-slate-100 grid place-items-center text-slate-400",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "w-4 h-4" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: "w-10 h-10 rounded-lg overflow-hidden border hover:ring-2 hover:ring-indigo-400",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: photo,
			alt: "Foto absen",
			className: "w-full h-full object-cover"
		})
	});
}
function Monitoring({ summaries, vendors }) {
	const vendorName = (id) => vendors.find((v) => v.id === id)?.name ?? "Belum ditentukan";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
		className: "text-base",
		children: "Monitoring Kedatangan Real-Time"
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "space-y-4",
		children: [summaries.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "Belum ada karyawan" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: "Tambahkan data karyawan terlebih dahulu." })
		] }), summaries.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between p-4 rounded-xl border bg-slate-50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [s.latestAttendance?.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.latestAttendance.photo,
					alt: s.profile.full_name,
					className: "w-10 h-10 rounded-full object-cover border"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center font-semibold text-sm",
					children: s.profile.full_name.slice(0, 2).toUpperCase()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: s.profile.full_name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-slate-500 flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }),
						" ",
						vendorName(s.profile.vendor_id)
					]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold",
					children: s.latestAttendance ? `${Math.round(s.latestAttendance.distance_m)} m` : "—"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-xs font-semibold ${s.latestAttendance?.status === "success" ? "text-emerald-600" : s.latestAttendance ? "text-red-500" : "text-slate-400"}`,
					children: s.latestAttendance ? s.latestAttendance.status === "success" ? "Valid On-Site" : `Pelanggaran: ${getStatusLabel(s.latestAttendance.status)}` : "Belum Melakukan Absen"
				})]
			})]
		}, s.profile.id))]
	})] });
	function getStatusLabel(status) {
		switch (status) {
			case "success": return "Valid";
			case "flagged_mock_gps": return "Fake GPS!";
			case "outside_geofence": return "Luar Radius";
			default: return "Anomali";
		}
	}
}
//#endregion
export { AdminDashboard as component };
