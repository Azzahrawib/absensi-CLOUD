import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Fingerprint, ArrowRight, Lock, Loader2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [checking, setChecking] = useState(false);
  const [showError, setShowError] = useState(false);

  // State kredensial
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Formulir Wajib Diisi", { 
        description: "Mohon masukkan email korporat dan password Anda." 
      });
      return;
    }

    setChecking(true);
    await new Promise((r) => setTimeout(r, 1000));
    setChecking(false);

    // Ambil data karyawan hasil CRUD HRD dari localStorage
    const savedUsers = localStorage.getItem("sentinel_users_db");
    const userDatabase = savedUsers ? JSON.parse(savedUsers) : [];

    // Cek apakah email terdaftar (Password bebas buat demo)
    const matchedEmployee = userDatabase.find(
      (emp: any) => emp.email?.trim().toLowerCase() === email.trim().toLowerCase()
    ) || (email === "aisha.r@sentinel.co" ? { id: "EMP-9999", full_name: "Azzahra Asabri", email: "aisha.r@sentinel.co", role: "IT Intern" } : null);

    if (!matchedEmployee) {
      toast.error("Akses Ditolak!", {
        description: "Email korporat Anda belum terdaftar di sistem HRD.",
      });
      return;
    }

    // Cek Device Binding (Simulasi)
    const bindingKey = `device_bound_status_${matchedEmployee.id}`;
    const hasBinding = localStorage.getItem(bindingKey);

    if (hasBinding === "blocked") {
      setShowError(true);
      return;
    }

    if (!hasBinding) {
      localStorage.setItem(bindingKey, "bound_to_current_hardware");
    }

    toast.success(`Selamat Datang, ${matchedEmployee.full_name || matchedEmployee.name}!`);
    sessionStorage.setItem("active_session_user", JSON.stringify(matchedEmployee));
    nav({ to: "/employee" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 grid place-items-center shadow-lg shadow-indigo-900/50">
            <Fingerprint className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Sentinel Attend</h1>
            <p className="text-xs text-slate-400">Secure Workforce Verification</p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur">
          <div className="mb-6 text-center">
            <h2 className="text-md font-semibold text-indigo-400">Employee Portal</h2>
            <p className="text-[11px] text-slate-500 mt-1">Gunakan email yang didaftarkan oleh HRD</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Corporate Email</Label>
              <Input
                type="email"
                placeholder="contoh: joko@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Password</Label>
              <Input 
                type="password" 
                placeholder="Bebas ketik apa saja untuk demo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-indigo-500" 
              />
            </div>

            <Button 
              onClick={handleLogin} 
              disabled={checking} 
              className="w-full bg-indigo-600 hover:bg-indigo-500 mt-2 h-11 font-medium transition-colors"
            >
              {checking ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Memverifikasi...</>
              ) : (
                <div className="flex items-center justify-center gap-2"><Lock className="w-4 h-4" /><span>Secure Sign In</span><ArrowRight className="w-4 h-4" /></div>
              )}
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={showError} onOpenChange={setShowError}>
        <AlertDialogContent className="bg-slate-900 border-slate-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="w-5 h-5" /> Keamanan Terkunci!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400 text-sm">
              Sistem mendeteksi Anda mencoba masuk menggunakan HP yang berbeda. Harap hubungi HRD untuk melakukan <b>Reset Device Binding</b>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-indigo-600 text-white hover:bg-indigo-500" onClick={() => setShowError(false)}>Mengerti</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}