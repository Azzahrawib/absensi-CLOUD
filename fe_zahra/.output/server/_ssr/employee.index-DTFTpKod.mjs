import { r as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { c as SwitchRoot, m as require_react, p as require_jsx_runtime, s as SwitchThumb } from "../_libs/@base-ui/react+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as CircleCheck, D as Building2, O as Briefcase, _ as LogIn, a as TriangleAlert, g as LogOut, k as Bell, l as ShieldCheck, m as MapPin, p as Navigation, s as Smartphone, t as Wifi, u as ShieldAlert } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as supabase, o as useWorkMode, r as haversine, s as workStore, t as OFFICE } from "./work-mode-BOTRJ7Ng.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employee.index-DTFTpKod.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Switch$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchRoot, {
		"data-slot": "switch",
		"data-size": size,
		className: cn("peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, {
			"data-slot": "switch-thumb",
			className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
		})
	});
}
async function fetchRealVendorLocations() {
	const { data, error } = await supabase.from("vendor_locations").select("id, name, address, latitude, longitude, radius_m").order("name", { ascending: true });
	if (error) throw error;
	return data ?? [];
}
function EmployeeHome() {
	const nav = useNavigate();
	const [now, setNow] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const [realCoords, setRealCoords] = (0, import_react.useState)(null);
	const [gpsError, setGpsError] = (0, import_react.useState)(null);
	const [loadingGps, setLoadingGps] = (0, import_react.useState)(true);
	const [mockGps, setMockGps] = (0, import_react.useState)(false);
	const [attendanceLogs, setAttendanceLogs] = (0, import_react.useState)([]);
	const [profile, setProfile] = (0, import_react.useState)({
		id: "EMP-9999",
		full_name: "Azzahra Asabri"
	});
	const { mode, vendorId } = useWorkMode();
	const { data: realVendors = [], isLoading: isLoadingVendors } = useQuery({
		key: ["vendor_locations_employee"],
		queryFn: fetchRealVendorLocations
	});
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const savedLogs = localStorage.getItem("attendance_logs");
			if (savedLogs) setAttendanceLogs(JSON.parse(savedLogs));
			const sessionUser = sessionStorage.getItem("active_session_user");
			if (sessionUser) setProfile(JSON.parse(sessionUser));
		}
	}, []);
	const activeVendor = (0, import_react.useMemo)(() => {
		if (realVendors.length === 0) return null;
		return realVendors.find((v) => v.id === vendorId) || realVendors[0];
	}, [realVendors, vendorId]);
	(0, import_react.useEffect)(() => {
		if (realVendors.length > 0 && (!vendorId || !realVendors.some((v) => v.id === vendorId))) workStore.set({ vendorId: realVendors[0].id });
	}, [realVendors, vendorId]);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(t);
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !navigator.geolocation) {
			setGpsError("Geolocation tidak didukung browser ini.");
			setLoadingGps(false);
			return;
		}
		const watchId = navigator.geolocation.watchPosition((position) => {
			setRealCoords({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			});
			setGpsError(null);
			setLoadingGps(false);
		}, (error) => {
			console.error(error);
			setGpsError("Akses lokasi diblokir.");
			setLoadingGps(false);
		}, { enableHighAccuracy: true });
		return () => navigator.geolocation.clearWatch(watchId);
	}, []);
	const target = (0, import_react.useMemo)(() => {
		if (mode === "office") return {
			lat: OFFICE.lat,
			lng: OFFICE.lng,
			radius: OFFICE.radius,
			name: OFFICE.name
		};
		if (activeVendor) return {
			lat: activeVendor.latitude,
			lng: activeVendor.longitude,
			radius: activeVendor.radius_m,
			name: activeVendor.name
		};
		return {
			lat: 0,
			lng: 0,
			radius: 150,
			name: "Loading Vendor..."
		};
	}, [mode, activeVendor]);
	const currentCoords = (0, import_react.useMemo)(() => realCoords || {
		lat: 0,
		lng: 0
	}, [realCoords]);
	const distance = haversine(currentCoords.lat, currentCoords.lng, target.lat, target.lng);
	const safe = distance <= target.radius && currentCoords.lat !== 0 && !isLoadingVendors;
	const canCheckIn = safe && !loadingGps && !gpsError;
	const canCheckOut = !loadingGps && !gpsError;
	const handleCheckIn = () => {
		if (distance > target.radius) {
			toast.error(`Gagal! Anda berada ${Math.round(distance)}m dari lokasi. Radius maks: ${target.radius}m.`);
			return;
		}
		nav({ to: "/employee/checkin" });
	};
	const handleCheckOut = () => {
		if (mockGps) {
			toast.error("Fake GPS Terdeteksi", { description: "Anomali terdeteksi. Gagal Checkout." });
			return;
		}
		const updatedLogs = [{
			employee_id: profile.id,
			status: "success",
			latitude: currentCoords.lat,
			longitude: currentCoords.lng,
			distance_m: distance,
			type: "Check-Out",
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}, ...attendanceLogs];
		setAttendanceLogs(updatedLogs);
		localStorage.setItem("attendance_logs", JSON.stringify(updatedLogs));
		toast.success("Check-Out Berhasil!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 text-white px-5 pt-6 pb-10 rounded-b-3xl shadow-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-11 h-11 rounded-full bg-white/15 grid place-items-center font-semibold",
							children: "AR"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-indigo-200",
							children: "Good shift,"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold truncate max-w-[180px]",
							children: profile.full_name
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-5 h-5" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white/10 backdrop-blur rounded-xl p-1 grid grid-cols-2 gap-1 mb-5",
					children: [{
						id: "office",
						label: "Office Base",
						icon: Building2
					}, {
						id: "vendor",
						label: "Vendor Visit",
						icon: Briefcase
					}].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => workStore.set({ mode: m.id }),
						className: `flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold ${mode === m.id ? "bg-white text-indigo-700 shadow" : "text-indigo-100"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: "w-3.5 h-3.5" }),
							" ",
							m.label
						]
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-4xl font-bold font-mono tracking-tight mt-1",
					children: now.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 -mt-6 space-y-4",
			children: [
				mode === "vendor" && activeVendor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-white dark:bg-slate-800 p-4 shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-indigo-600",
						children: activeVendor.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-slate-400 mt-1",
						children: activeVendor.address
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-2xl border bg-white dark:bg-slate-800 p-4 shadow-lg transition-all ${loadingGps || isLoadingVendors ? "border-slate-200" : safe ? "border-emerald-200" : "border-red-200"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "w-4 h-4 text-indigo-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold truncate max-w-[180px]",
								children: mode === "office" ? "Radius Presensi Kantor" : `Vendor: ${target.name}`
							})]
						}), loadingGps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 animate-pulse",
							children: "TUNING GPS..."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[10px] font-bold px-2.5 py-1 rounded-full ${safe ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`,
							children: safe ? "● DI DALAM RADIUS" : "● DI LUAR RADIUS"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-500 mb-0.5",
							children: "Koordinat GPS Anda"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono",
							children: [
								currentCoords.lat.toFixed(5),
								", ",
								currentCoords.lng.toFixed(5)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-500 mb-0.5",
							children: "Jarak ke Lokasi Kerja"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono font-bold text-lg",
							children: [distance, " m"]
						})] })]
					})]
				}),
				mockGps && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-red-300 bg-red-50 p-4 flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5 text-red-600 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-red-700 text-sm",
						children: "Fake GPS Terdeteksi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-red-700/80 mt-0.5",
						children: "Sistem mendeteksi aplikasi manipulasi lokasi aktif. Fitur ditutup otomatis."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCheckIn,
						disabled: !canCheckIn,
						className: `rounded-2xl p-5 text-white shadow-lg text-left transition-all ${canCheckIn ? "bg-gradient-to-br from-emerald-500 to-emerald-700 cursor-pointer" : "bg-slate-300 opacity-60 cursor-not-allowed"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "w-7 h-7 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: "Kirim Presensi"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCheckOut,
						disabled: !canCheckOut,
						className: `rounded-2xl p-5 text-white shadow-lg text-left transition-all ${canCheckOut ? "bg-gradient-to-br from-slate-700 to-slate-900 cursor-pointer" : "bg-slate-300 opacity-60 cursor-not-allowed"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-7 h-7 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: "Check Out"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-2xl border p-4 ${mockGps ? "border-red-500 bg-red-50" : "border-emerald-200 bg-emerald-50"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-wider font-semibold text-slate-500",
								children: "Verifikasi Keamanan Perangkat"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold mt-1",
								children: mockGps ? "Mock Location Detected" : "Sistem Terverifikasi Aman"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-3 py-1 text-[11px] font-semibold ${mockGps ? "bg-red-600 text-white" : "bg-emerald-100 text-emerald-700"}`,
								children: mockGps ? "UNSAFE" : "SECURE"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 mb-4 bg-white p-2.5 rounded-xl border border-dashed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-500 font-medium",
								children: "Uji Coba Deteksi Fake GPS (Dev Simulation)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
								checked: mockGps,
								onCheckedChange: setMockGps
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "w-3.5 h-3.5 text-slate-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Device Linked · IMEI verified" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-slate-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Non-Rooted system" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: `flex items-center gap-2 ${!mockGps ? "text-slate-700" : "text-red-600"}`,
									children: [
										!mockGps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-3.5 h-3.5 text-red-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mockGps ? "Mock Location: DETECTED" : "Location integrity: Secure" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "w-3.5 h-3.5 text-slate-400" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Network online · Sync ready" })
									]
								})
							]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { EmployeeHome as component };
