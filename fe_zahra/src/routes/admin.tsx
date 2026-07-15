import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ClipboardList,
  Users,
  MapPinned,
  Bell,
  Fingerprint,
  WifiOff,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  UserPlus,
  Radio,
  Loader2,
  Pencil,
  Trash2,
  MapPin,
  Image as ImageIcon,
  Building2,
  Crosshair, // FIX 1: Sudah ditambahkan ke dalam daftar import lucide-react
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { toast } from "sonner";

// Import integrasi cloud Supabase service yang baru
import { inviteNewEmployee, supabase } from "../lib/supabaseService";

// Mengambil fungsi lokal yang tersisa
import {
  type Employee, type Vendor,
  updateEmployee, deleteEmployee,
  countEmployeesForVendor,
} from "../lib/db";

// Type lokal agar kompatibel dengan schema Supabase
type SupabaseAttendanceStatus = "success" | "flagged_mock_gps" | "outside_geofence";

type SupabaseAttendanceLog = {
  id: string;
  employee_id: string;
  vendor_id: string | null;
  type: string; 
  status: SupabaseAttendanceStatus;
  distance_m: number;
  latitude: number;
  longitude: number;
  photo_data: string | null;
  anomaly_note?: string | null;
  location_name?: string | null;
  location_type?: string | null;
  created_at: string;
};

type AttendanceLogView = Omit<SupabaseAttendanceLog, "photo_data"> & { photo: string | null };

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

type View = "reports" | "monitoring" | "devices" | "locations";
type EmployeeSummary = { profile: Employee; latestAttendance?: AttendanceLogView };

const emptyEmployeeForm = {
  full_name: "", email: "", role: "", department: "", phone: "", vendor_id: "" as string,
};
const emptyVendorForm = {
  name: "", address: "", latitude: "" as string, longitude: "" as string, radius_m: "150",
};

function AdminDashboard() {
  const [view, setView] = useState<View>("reports");
  const [online, setOnline] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  // Fetch data master real-time dari Supabase
  const employeesQuery = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await supabase.from("employees").select("*");
      if (error) throw error;
      return (data ?? []) as Employee[];
    },
  });

  const vendorsQuery = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      const { data, error } = await supabase.from("vendors").select("*");
      if (error) throw error;
      return (data ?? []) as Vendor[];
    },
  });

  const attendanceQuery = useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const { data, error } = await supabase.from("attendances").select("*");
      if (error) throw error;
      const rows = (data ?? []) as SupabaseAttendanceLog[];
      const mapped: AttendanceLogView[] = rows.map((r) => ({
        ...r,
        photo: r.photo_data,
      }));
      return mapped;
    },
  });

  const employees = employeesQuery.data ?? [];
  const vendors = vendorsQuery.data ?? [];
  const attendance = (attendanceQuery.data ?? []) as AttendanceLogView[];

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["employees"] });
    queryClient.invalidateQueries({ queryKey: ["vendors"] });
    queryClient.invalidateQueries({ queryKey: ["attendance"] });
  };

  // FIX 2 & 3: Tipe data Map diganti ke AttendanceLogView agar cocok dengan model Supabase
  const employeeSummaries: EmployeeSummary[] = useMemo(() => {
    const latestByEmployee = new Map<string, AttendanceLogView>();
    attendance.forEach((log) => {
      const current = latestByEmployee.get(log.employee_id);
      if (!current || new Date(log.created_at).getTime() > new Date(current.created_at).getTime()) {
        latestByEmployee.set(log.employee_id, log);
      }
    });
    return employees.map((profile) => ({ profile, latestAttendance: latestByEmployee.get(profile.id) }));
  }, [employees, attendance]);

  const sideNavItems = [
    { id: "reports", label: "Laporan & Log Anomali", icon: ClipboardList },
    { id: "monitoring", label: "Monitoring Real-Time", icon: Radio },
    { id: "devices", label: "Manajemen Karyawan", icon: Users },
    { id: "locations", label: "Vendor Locations", icon: MapPinned },
  ] as const;

  const isLoading = employeesQuery.isLoading || vendorsQuery.isLoading || attendanceQuery.isLoading;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex">
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-100 flex-col shrink-0">
        <div className="p-5 flex items-center gap-3 border-b border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 grid place-items-center">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm">GeoAttend</p>
            <p className="text-[10px] text-slate-400">HRD Admin Console</p>
          </div>
        </div>
        <nav className="p-3 flex-1 space-y-1">
          {sideNavItems.map((n) => {
            const active = view === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setView(n.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors relative ${
                  active ? "bg-indigo-600 text-white shadow-sm" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full bg-white/70" />}
                <n.icon className="w-4 h-4 shrink-0" />
                <span>{n.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <div className={`flex items-center gap-2 text-[11px] px-3 py-2 rounded-lg ${online ? "text-emerald-400" : "text-red-400"}`}>
            {online ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            {online ? "Sistem Online" : "Koneksi Terputus"}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between gap-4">
          <h1 className="text-lg font-bold">{sideNavItems.find((n) => n.id === view)?.label}</h1>
          <div className="flex items-center gap-3">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
            <Bell className="w-5 h-5 text-slate-500" />
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          {view === "reports" && <Reports summaries={employeeSummaries} allLogs={attendance} />}
          {view === "monitoring" && <Monitoring summaries={employeeSummaries} vendors={vendors} />}
          {view === "devices" && (
            <EmployeesPanel employees={employees} vendors={vendors} onChanged={invalidateAll} />
          )}
          {view === "locations" && (
            <VendorsPanel vendors={vendors} onChanged={invalidateAll} />
          )}
        </div>
      </main>
    </div>
  );
}

/* ============================== EMPLOYEES ============================== */

function EmployeesPanel({
  employees, vendors, onChanged,
}: { employees: Employee[]; vendors: Vendor[]; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyEmployeeForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vendorName = (id: string | null) => vendors.find((v) => v.id === id)?.name ?? "Belum ditentukan";

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyEmployeeForm);
    setOpen(true);
  };

  const openEdit = (emp: Employee) => {
    setEditingId(emp.id);
    setForm({
      full_name: emp.full_name, email: emp.email, role: emp.role,
      department: emp.department, phone: emp.phone, vendor_id: emp.vendor_id ?? "",
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
      vendor_id: form.vendor_id || null,
    };

    try {
      if (editingId) {
        await updateEmployee(editingId, payload);
        toast.success("Data karyawan diperbarui.");
      } else {
        const res = await inviteNewEmployee(payload);
        if (res.success) {
          toast.success("Karyawan baru diundang! Email verifikasi telah terkirim.");
        } else {
          throw new Error(res.error || "Gagal melakukan registrasi.");
        }
      }
      onChanged();
      setOpen(false);
      setForm(emptyEmployeeForm);
      setEditingId(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Terjadi kesalahan integrasi database cloud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (emp: Employee) => {
    if (!window.confirm(`Hapus karyawan ${emp.full_name}? Tindakan ini tidak bisa dibatalkan.`)) return;
    deleteEmployee(emp.id);
    toast.success("Karyawan dihapus.");
    onChanged();
  };

  const handleResetDevice = async (empId: string) => {
    try {
      const { error } = await supabase
        .from('device_bindings')
        .update({ is_active: false })
        .eq('employee_id', empId);

      if (error) throw error;

      localStorage.removeItem(`device_bound_status_${empId}`);
      toast.success("Device Binding berhasil direset di Cloud Supabase!");
    } catch (err: any) {
      toast.error("Gagal mereset perangkat: " + err.message);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Data Master Karyawan</CardTitle>
          <p className="text-xs text-slate-500 mt-1">{employees.length} karyawan terdaftar</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500" onClick={openCreate}>
          <UserPlus className="w-4 h-4 mr-1.5" /> Daftarkan Karyawan Baru
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {employees.length === 0 ? (
          <Alert className="m-4">
            <AlertTriangle className="w-4 h-4" />
            <AlertTitle>Belum ada data</AlertTitle>
            <AlertDescription>Klik "Daftarkan Karyawan Baru" untuk menambahkan karyawan pertama.</AlertDescription>
          </Alert>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Karyawan</TableHead>
                <TableHead>Email Login</TableHead>
                <TableHead>Jabatan / Dept</TableHead>
                <TableHead>Vendor Terikat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.full_name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>
                    <p>{emp.role}</p>
                    <p className="text-xs text-slate-400">{emp.department}</p>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">
                      <Building2 className="w-3 h-3" /> {vendorName(emp.vendor_id)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-1.5 whitespace-nowrap">
                    <Button variant="outline" size="sm" onClick={() => openEdit(emp)}>
                      <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleResetDevice(emp.id)}>
                      <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reset Device
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(emp)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Data Karyawan" : "Registrasi Karyawan Baru (Sistem Undang Email)"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <Label>Nama Lengkap</Label>
              <Input className="bg-slate-950 border-slate-800" value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
            </div>
            <div>
              <Label>Email Login</Label>
              <Input className="bg-slate-950 border-slate-800" value={form.email} disabled={!!editingId}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label>Nomor Telepon</Label>
              <Input className="bg-slate-950 border-slate-800" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Jabatan</Label>
                <Input className="bg-slate-950 border-slate-800" value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </div>
              <div>
                <Label>Departemen</Label>
                <Input className="bg-slate-950 border-slate-800" value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Lokasi Vendor (mengikat radius presensi)</Label>
              <select
                className="w-full mt-1 rounded-md bg-slate-950 border border-slate-800 text-sm px-3 py-2 text-white"
                value={form.vendor_id}
                onChange={(e) => setForm({ ...form, vendor_id: e.target.value })}
              >
                <option value="">— Belum ditentukan —</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>{v.name} (radius {v.radius_m}m)</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>Batal</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white" onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {editingId ? "Simpan Perubahan" : "Kirim Undangan Akun"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

/* ============================== VENDORS ============================== */

function VendorsPanel({ vendors, onChanged }: { vendors: Vendor[]; onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyVendorForm);
  const [locating, setLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyVendorForm);
    setOpen(true);
  };

  const openEdit = (v: Vendor) => {
    setEditingId(v.id);
    setForm({
      name: v.name, address: v.address,
      latitude: String(v.latitude), longitude: String(v.longitude), radius_m: String(v.radius_m),
    });
    setOpen(true);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation tidak didukung browser ini.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((f) => ({ ...f, latitude: pos.coords.latitude.toFixed(6), longitude: pos.coords.longitude.toFixed(6) }));
        setLocating(false);
        toast.success("Koordinat lokasi saat ini berhasil diambil.");
      },
      () => {
        setLocating(false);
        toast.error("Gagal mengambil lokasi. Pastikan izin GPS diaktifkan.");
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSave = async () => {
    const payload = {
      name: form.name.trim(),
      address: form.address.trim(),
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      radius_m: parseInt(form.radius_m, 10),
    };

    if (!payload.name || Number.isNaN(payload.latitude) || Number.isNaN(payload.longitude) || Number.isNaN(payload.radius_m)) {
      toast.error("Nama, latitude, longitude, dan radius wajib diisi dengan benar.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        const { error } = await supabase.from('vendors').update(payload).eq('id', editingId);
        if (error) throw error;
        toast.success("Vendor location diperbarui.");
      } else {
        const { error } = await supabase.from('vendors').insert([payload]);
        if (error) throw error;
        toast.success("Vendor location baru ditambahkan.");
      }

      onChanged();
      setOpen(false);
      setForm(emptyVendorForm);
      setEditingId(null);
    } catch (err: any) {
      toast.error(err?.message || "Gagal menyimpan vendor ke Supabase.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (v: Vendor) => {
    const boundCount = countEmployeesForVendor(v.id);
    const warning = boundCount > 0
      ? `${boundCount} karyawan saat ini terikat ke "${v.name}" dan akan menjadi "belum ditentukan". Lanjutkan hapus?`
      : `Hapus vendor location "${v.name}"?`;
    if (!window.confirm(warning)) return;

    try {
      const { error } = await supabase.from('vendors').delete().eq('id', v.id);
      if (error) throw error;
      toast.success("Vendor location deleted.");
      onChanged();
    } catch (err: any) {
      toast.error(err?.message || "Gagal menghapus vendor dari Supabase.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Vendor Locations</CardTitle>
          <p className="text-xs text-slate-500 mt-1">{vendors.length} lokasi terdaftar</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500" onClick={openCreate}>
          <MapPinned className="w-4 h-4 mr-1.5" /> Tambah Vendor
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {vendors.length === 0 ? (
          <Alert className="m-4">
            <AlertTriangle className="w-4 h-4" />
            <AlertTitle>Belum ada vendor</AlertTitle>
            <AlertDescription>Tambahkan lokasi vendor terlebih dahulu.</AlertDescription>
          </Alert>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Vendor</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Koordinat</TableHead>
                <TableHead>Radius</TableHead>
                <TableHead>Karyawan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell className="text-xs text-slate-500 max-w-[220px] truncate">{v.address || "—"}</TableCell>
                  <TableCell className="font-mono text-xs">{v.latitude.toFixed(5)}, {v.longitude.toFixed(5)}</TableCell>
                  <TableCell>{v.radius_m} m</TableCell>
                  <TableCell>{countEmployeesForVendor(v.id)}</TableCell>
                  <TableCell className="text-right space-x-1.5 whitespace-nowrap">
                    <Button variant="outline" size="sm" onClick={() => openEdit(v)}>
                      <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(v)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Vendor Location" : "Tambah Vendor Location"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <Label>Nama Vendor / Lokasi</Label>
              <Input className="bg-slate-950 border-slate-800" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Alamat</Label>
              <Input className="bg-slate-950 border-slate-800" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Latitude</Label>
                <Input className="bg-slate-950 border-slate-800" value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
              </div>
              <div>
                <Label>Longitude</Label>
                <Input className="bg-slate-950 border-slate-800" value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
              </div>
            </div>
            <Button type="button" variant="outline" className="w-full" onClick={useCurrentLocation} disabled={locating}>
              {locating ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Crosshair className="w-3.5 h-3.5 mr-1.5" />}
              Ambil Lokasi Saat Ini
            </Button>
            <div>
              <Label>Radius Presensi (meter)</Label>
              <Input className="bg-slate-950 border-slate-800" type="number" value={form.radius_m}
                onChange={(e) => setForm({ ...form, radius_m: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>Batal</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white" onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2 inline" /> : null}
              {editingId ? "Simpan Perubahan" : "Simpan Vendor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

/* ============================== REPORTS ============================== */

function Reports({ summaries, allLogs }: { summaries: EmployeeSummary[]; allLogs: AttendanceLogView[] }) {
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const nameOf = (id: string) => summaries.find((s) => s.profile.id === id)?.profile.full_name ?? id;

  const anomalies = allLogs.filter((l) => l.status === "flagged_mock_gps" || l.status === "outside_geofence");

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "success": return "Valid";
      case "flagged_mock_gps": return "Fake GPS!";
      case "outside_geofence": return "Luar Radius";
      default: return "Anomali";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base text-red-500">Log Kecurangan & Anomali Presensi</CardTitle></CardHeader>
        <CardContent className="p-0">
          {anomalies.length === 0 ? (
            <Alert className="m-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <AlertTitle>Aman</AlertTitle>
              <AlertDescription>Belum ada indikasi kecurangan Geofence maupun Fake GPS terdeteksi.</AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Foto</TableHead>
                  <TableHead>Karyawan</TableHead>
                  <TableHead>Jenis Pelanggaran</TableHead>
                  <TableHead>Jarak Saat Absen</TableHead>
                  <TableHead>Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {anomalies.map((log) => (
                  <TableRow key={log.id} className="bg-red-50/30">
                    <TableCell><PhotoThumb photo={log.photo} onClick={() => log.photo && setPreviewPhoto(log.photo)} /></TableCell>
                    <TableCell className="font-medium">{nameOf(log.employee_id)}</TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                        {getStatusLabel(log.status)}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-red-600">{Math.round(log.distance_m)} m</TableCell>
                    <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Seluruh Log Absensi Real-Time</CardTitle></CardHeader>
        <CardContent className="p-0">
          {allLogs.length === 0 ? (
            <Alert className="m-4">
              <AlertTriangle className="w-4 h-4" />
              <AlertTitle>Belum ada aktivitas</AlertTitle>
              <AlertDescription>Log presensi karyawan cloud akan muncul di sini.</AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Foto</TableHead><TableHead>Karyawan</TableHead><TableHead>Tipe</TableHead>
                  <TableHead>Status Validasi</TableHead><TableHead>Jarak</TableHead><TableHead>Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell><PhotoThumb photo={log.photo} onClick={() => log.photo && setPreviewPhoto(log.photo)} /></TableCell>
                    <TableCell>{nameOf(log.employee_id)}</TableCell>
                    <TableCell className="uppercase text-xs font-semibold text-slate-600">{log.type}</TableCell>
                    <TableCell>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        log.status === "success" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                      }`}>
                        {getStatusLabel(log.status)}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono">{Math.round(log.distance_m)} m</TableCell>
                    <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!previewPhoto} onOpenChange={(o) => !o && setPreviewPhoto(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 max-w-md">
          <DialogHeader><DialogTitle className="text-white">Foto Bukti Presensi (On-Site Selfie)</DialogTitle></DialogHeader>
          {previewPhoto && <img src={previewPhoto} alt="Bukti presensi" className="w-full rounded-lg object-cover" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PhotoThumb({ photo, onClick }: { photo: string | null; onClick: () => void }) {
  if (!photo) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-100 grid place-items-center text-slate-400">
        <ImageIcon className="w-4 h-4" />
      </div>
    );
  }
  return (
    <button onClick={onClick} className="w-10 h-10 rounded-lg overflow-hidden border hover:ring-2 hover:ring-indigo-400">
      <img src={photo} alt="Foto absen" className="w-full h-full object-cover" />
    </button>
  );
}

/* ============================== MONITORING ============================== */

function Monitoring({ summaries, vendors }: { summaries: EmployeeSummary[]; vendors: Vendor[] }) {
  const vendorName = (id: string | null) => vendors.find((v) => v.id === id)?.name ?? "Belum ditentukan";

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Monitoring Kedatangan Real-Time</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {summaries.length === 0 && (
          <Alert>
            <AlertTriangle className="w-4 h-4" />
            <AlertTitle>Belum ada karyawan</AlertTitle>
            <AlertDescription>Tambahkan data karyawan terlebih dahulu.</AlertDescription>
          </Alert>
        )}
        {summaries.map((s) => (
          <div key={s.profile.id} className="flex items-center justify-between p-4 rounded-xl border bg-slate-50">
            <div className="flex items-center gap-3">
              {s.latestAttendance?.photo ? (
                <img src={s.latestAttendance.photo} alt={s.profile.full_name} className="w-10 h-10 rounded-full object-cover border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center font-semibold text-sm">
                  {s.profile.full_name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-semibold">{s.profile.full_name}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {vendorName(s.profile.vendor_id)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">{s.latestAttendance ? `${Math.round(s.latestAttendance.distance_m)} m` : "—"}</p>
              <p className={`text-xs font-semibold ${
                s.latestAttendance?.status === "success" ? "text-emerald-600" : s.latestAttendance ? "text-red-500" : "text-slate-400"
              }`}>
                {s.latestAttendance 
                  ? (s.latestAttendance.status === "success" ? "Valid On-Site" : `Pelanggaran: ${getStatusLabel(s.latestAttendance.status)}`) 
                  : "Belum Melakukan Absen"
                }
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  function getStatusLabel(status: string) {
    switch (status) {
      case "success": return "Valid";
      case "flagged_mock_gps": return "Fake GPS!";
      case "outside_geofence": return "Luar Radius";
      default: return "Anomali";
    }
  }
}