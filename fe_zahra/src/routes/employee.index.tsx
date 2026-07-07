import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  MapPin, Clock, LogIn, LogOut, Bell, Navigation, CheckCircle2,
  Building2, Briefcase, AlertTriangle, ShieldAlert, Smartphone, ShieldCheck, Wifi,
} from "lucide-react";
import { OFFICE, haversine, useWorkMode, workStore, getVendor } from "../lib/work-mode";
import { getActiveEmployee, getLatestAttendanceByEmployee, type Employee } from "../lib/db";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/employee/")({
  component: EmployeeHome,
});

function EmployeeHome() {
  const nav = useNavigate();
  const [now, setNow] = useState(new Date());

  const [realCoords, setRealCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [loadingGps, setLoadingGps] = useState(true);
  const [mockGps, setMockGps] = useState(false);

  const [profile, setProfile] = useState<Employee | undefined>(undefined);

  const { mode } = useWorkMode();

  // Load the real, dynamic employee record instead of a hardcoded name.
  useEffect(() => {
    setProfile(getActiveEmployee());
  }, []);

  const assignedVendor = useMemo(() => getVendor(profile?.vendor_id), [profile?.vendor_id]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setGpsError("Geolocation tidak didukung browser ini.");
      setLoadingGps(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setRealCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setGpsError(null);
        setLoadingGps(false);
      },
      (error) => {
        console.error(error);
        setGpsError("Akses lokasi diblokir.");
        setLoadingGps(false);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // The employee is BOUND to whichever vendor the admin assigned — no free picker.
  const target = useMemo(() => {
    if (mode === "office") return { lat: OFFICE.lat, lng: OFFICE.lng, radius: OFFICE.radius, name: OFFICE.name };
    if (assignedVendor) {
      return { lat: assignedVendor.latitude, lng: assignedVendor.longitude, radius: assignedVendor.radius_m, name: assignedVendor.name };
    }
    return null;
  }, [mode, assignedVendor]);

  const currentCoords = useMemo(() => realCoords || { lat: 0, lng: 0 }, [realCoords]);
  const distance = target ? haversine(currentCoords.lat, currentCoords.lng, target.lat, target.lng) : 0;
  const hasTarget = !!target;
  const safe = hasTarget && currentCoords.lat !== 0 && distance <= (target?.radius ?? 0);

  const canCheckIn = safe && !loadingGps && !gpsError && !mockGps && hasTarget;
  const canCheckOut = !loadingGps && !gpsError && !mockGps;

  const latestAttendance = profile ? getLatestAttendanceByEmployee(profile.id) : undefined;

  const handleCheckIn = () => {
    if (!hasTarget) {
      toast.error("Anda belum terikat ke vendor manapun. Hubungi admin.");
      return;
    }
    if (mockGps) {
      toast.error("Fake GPS Terdeteksi", { description: "Presensi ditolak demi keamanan data." });
      return;
    }
    if (distance > (target?.radius ?? 0)) {
      toast.error(`Gagal! Anda berada ${Math.round(distance)}m dari lokasi. Radius maks: ${target?.radius}m.`);
      return;
    }
    nav({ to: "/employee/checkin", search: { type: "in" } });
  };

  const handleCheckOut = () => {
    if (mockGps) {
      toast.error("Fake GPS Terdeteksi", { description: "Anomali terdeteksi. Gagal Checkout." });
      return;
    }
    nav({ to: "/employee/checkin", search: { type: "out" } });
  };

  const initials = (profile?.full_name ?? "??").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="pb-8 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100">
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 text-white px-5 pt-6 pb-10 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/15 grid place-items-center font-semibold">{initials}</div>
            <div>
              <p className="text-xs text-indigo-200">Good shift,</p>
              <p className="font-semibold truncate max-w-[180px]">{profile?.full_name ?? "Memuat..."}</p>
            </div>
          </div>
          <Bell className="w-5 h-5" />
        </div>

        <div className="bg-white/10 backdrop-blur rounded-xl p-1 grid grid-cols-2 gap-1 mb-5">
          {([
            { id: "office", label: "Office Base", icon: Building2 },
            { id: "vendor", label: "Vendor Visit", icon: Briefcase },
          ] as const).map((m) => (
            <button key={m.id} onClick={() => workStore.set({ mode: m.id })} className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold ${mode === m.id ? "bg-white text-indigo-700 shadow" : "text-indigo-100"}`}>
              <m.icon className="w-3.5 h-3.5" /> {m.label}
            </button>
          ))}
        </div>
        <p className="text-4xl font-bold font-mono tracking-tight mt-1">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</p>
      </div>

      <div className="px-5 -mt-6 space-y-4">
        {mode === "vendor" && (
          <div className="rounded-2xl border bg-white dark:bg-slate-800 p-4 shadow-md">
            {assignedVendor ? (
              <>
                <p className="text-sm font-semibold text-indigo-600">{assignedVendor.name}</p>
                <p className="text-[11px] text-slate-400 mt-1">{assignedVendor.address}</p>
              </>
            ) : (
              <div className="flex items-start gap-2 text-amber-600">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="text-xs">Anda belum diikat ke vendor location manapun. Hubungi admin HRD untuk pengaturan.</p>
              </div>
            )}
          </div>
        )}

        <div className={`rounded-2xl border bg-white dark:bg-slate-800 p-4 shadow-lg transition-all ${loadingGps || !hasTarget ? "border-slate-200" : safe ? "border-emerald-200" : "border-red-200"}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><Navigation className="w-4 h-4 text-indigo-600" /><p className="text-sm font-semibold truncate max-w-[180px]">{mode === "office" ? "Radius Presensi Kantor" : `Vendor: ${target?.name ?? "—"}`}</p></div>
            {loadingGps ? (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 animate-pulse">TUNING GPS...</span>
            ) : !hasTarget ? (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">TANPA LOKASI</span>
            ) : (
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${safe ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{safe ? "● DI DALAM RADIUS" : "● DI LUAR RADIUS"}</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><p className="text-slate-500 mb-0.5">Koordinat GPS Anda</p><p className="font-mono">{currentCoords.lat.toFixed(5)}, {currentCoords.lng.toFixed(5)}</p></div>
            <div><p className="text-slate-500 mb-0.5">Jarak ke Lokasi Kerja</p><p className="font-mono font-bold text-lg">{hasTarget ? `${distance} m` : "—"}</p></div>
          </div>
        </div>

        {mockGps && (
          <div className="rounded-2xl border border-red-300 bg-red-50 p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-bold text-red-700 text-sm">Fake GPS Terdeteksi</p>
              <p className="text-[11px] text-red-700/80 mt-0.5">Sistem mendeteksi aplikasi manipulasi lokasi aktif. Fitur ditutup otomatis.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button onClick={handleCheckIn} disabled={!canCheckIn} title={!hasTarget ? "Belum terikat ke vendor" : !safe ? "Di luar radius lokasi" : undefined} className={`rounded-2xl p-5 text-white shadow-lg text-left transition-all ${canCheckIn ? "bg-gradient-to-br from-emerald-500 to-emerald-700 cursor-pointer" : "bg-slate-300 opacity-60 cursor-not-allowed"}`}><LogIn className="w-7 h-7 mb-2" /><p className="font-bold">Kirim Presensi</p></button>
          <button onClick={handleCheckOut} disabled={!canCheckOut} className={`rounded-2xl p-5 text-white shadow-lg text-left transition-all ${canCheckOut ? "bg-gradient-to-br from-slate-700 to-slate-900 cursor-pointer" : "bg-slate-300 opacity-60 cursor-not-allowed"}`}><LogOut className="w-7 h-7 mb-2" /><p className="font-bold">Check Out</p></button>
        </div>

        {latestAttendance && (
          <div className="rounded-2xl border bg-white dark:bg-slate-800 p-4 flex items-center gap-3">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <p className="text-xs text-slate-500">
              Aktivitas terakhir: <span className="font-semibold text-slate-700 dark:text-slate-200">{latestAttendance.type}</span> pada{" "}
              {new Date(latestAttendance.created_at).toLocaleString()}
            </p>
          </div>
        )}

        {/* INTEGRITY STATUS SYSTEM */}
        <div className={`rounded-2xl border p-4 ${mockGps ? "border-red-500 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Verifikasi Keamanan Perangkat</p>
              <p className="text-sm font-bold mt-1">{mockGps ? "Mock Location Detected" : "Sistem Terverifikasi Aman"}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${mockGps ? "bg-red-600 text-white" : "bg-emerald-100 text-emerald-700"}`}>{mockGps ? "UNSAFE" : "SECURE"}</span>
          </div>
          <div className="flex items-center justify-between gap-3 mb-4 bg-white p-2.5 rounded-xl border border-dashed">
            <p className="text-[11px] text-slate-500 font-medium">Uji Coba Deteksi Fake GPS (Dev Simulation)</p>
            <Switch checked={mockGps} onCheckedChange={setMockGps} />
          </div>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><Smartphone className="w-3.5 h-3.5 text-slate-400" /><span>Device Linked · IMEI verified</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><ShieldCheck className="w-3.5 h-3.5 text-slate-400" /><span>Non-Rooted system</span></li>
            <li className={`flex items-center gap-2 ${!mockGps ? "text-slate-700" : "text-red-600"}`}>{!mockGps ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}<MapPin className="w-3.5 h-3.5" /><span>{mockGps ? "Mock Location: DETECTED" : "Location integrity: Secure"}</span></li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><Wifi className="w-3.5 h-3.5 text-slate-400" /><span>Network online · Sync ready</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
