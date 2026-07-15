import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Fingerprint, ArrowRight, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { supabase } from "../lib/supabaseService";

export const Route = createFileRoute("/")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Formulir Wajib Diisi", {
        description: "Mohon masukkan email korporat dan password Anda.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        // Tangkap error dari Supabase dan tampilkan pesan generik
        throw error;
      }

      if (data.user) {
        // Ambil nama dari metadata jika ada, jika tidak, gunakan placeholder
        const userName = data.user.user_metadata?.full_name || "Karyawan";
        toast.success(`Selamat Datang, ${userName}!`);
        
        // Arahkan ke dashboard setelah berhasil login
        navigate({ to: "/employee" });
      }
    } catch (error) {
      // Tampilkan pesan error yang manusiawi untuk semua jenis kegagalan
      toast.error("Kredensial Tidak Valid", {
        description: "Email atau password salah. Silakan hubungi HRD jika masalah berlanjut.",
      });
      console.error("Authentication Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 grid place-items-center shadow-lg shadow-indigo-900/50">
            <Fingerprint className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Geo Attend</h1>
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
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                disabled={isLoading}
                className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Password</Label>
              <Input
                type="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                disabled={isLoading}
                className="bg-slate-800/60 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 mt-2 h-11 font-medium transition-colors"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Memverifikasi...</>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Secure Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
