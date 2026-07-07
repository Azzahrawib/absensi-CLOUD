import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Phone, Building, Calendar, Shield, Smartphone, CheckCircle2, MapPin } from "lucide-react";
import { getActiveEmployee, getVendorById, type Employee } from "../lib/db";

export const Route = createFileRoute("/employee/profile")({
  component: Profile,
});

function Profile() {
  const [profile, setProfile] = useState<Employee | undefined>(undefined);

  useEffect(() => {
    setProfile(getActiveEmployee());
  }, []);

  if (!profile) {
    return <div className="p-5 text-center text-sm text-slate-500">Memuat profil...</div>;
  }

  const vendor = getVendorById(profile.vendor_id);
  const initials = profile.full_name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const joined = new Date(profile.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const infoRows: [React.ComponentType<{ className?: string }>, string][] = [
    [Mail, profile.email],
    [Phone, profile.phone || "Belum diisi"],
    [Building, vendor ? vendor.name : "Belum terikat ke vendor"],
    [Calendar, `Bergabung ${joined}`],
  ];

  return (
    <div className="p-5 space-y-4">
      <div className="text-center pt-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 grid place-items-center text-white text-2xl font-bold mx-auto shadow-lg">
          {initials}
        </div>
        <h1 className="mt-3 text-xl font-bold">{profile.full_name}</h1>
        <p className="text-sm text-slate-500">{profile.role} · {profile.department}</p>
        <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 rounded-full">
          <CheckCircle2 className="w-3 h-3" /> Verified Employee
        </span>
        <p className="text-[11px] text-slate-400 mt-1 font-mono">{profile.id}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700">
        {infoRows.map(([Icon, t], i) => (
          <div key={i} className="flex items-center gap-3 p-4 text-sm">
            <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{t}</span>
          </div>
        ))}
      </div>

      {vendor && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">Lokasi Vendor Terikat</p>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">{vendor.name}</p>
              <p className="text-xs text-slate-500">{vendor.address}</p>
              <p className="text-xs text-slate-400 mt-1">Radius presensi: {vendor.radius_m}m</p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-3">Security</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-500" /> Device Linked · IMEI terdaftar</div>
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> Biometric template enrolled</div>
        </div>
      </div>
    </div>
  );
}
