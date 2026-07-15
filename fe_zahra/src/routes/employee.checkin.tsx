import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, RefreshCcw, Check, X, Loader2, AlertTriangle, MapPin } from "lucide-react";
import { toast } from "sonner";
import { OFFICE, haversine, useWorkMode, getVendor } from "../lib/work-mode";
import { getActiveEmployee, createAttendance } from "../lib/db";
import { Button } from "../components/ui/button";

type CheckSearch = { type?: "in" | "out" };

export const Route = createFileRoute("/employee/checkin")({
  validateSearch: (search: Record<string, unknown>): CheckSearch => ({
    type: search.type === "out" ? "out" : "in",
  }),
  component: CheckinScreen,
});

function CheckinScreen() {
  const nav = useNavigate();
  const { type = "in" } = useSearch({ from: "/employee/checkin" });
  const attendanceType = type === "out" ? "Check-Out" : "Check-In";

  const profile = getActiveEmployee();
  const { mode } = useWorkMode();
  const assignedVendor = getVendor(profile?.vendor_id);

  const target = mode === "office"
    ? { lat: OFFICE.lat, lng: OFFICE.lng, radius: OFFICE.radius, name: OFFICE.name }
    : assignedVendor
      ? { lat: assignedVendor.latitude, lng: assignedVendor.longitude, radius: assignedVendor.radius_m, name: assignedVendor.name }
      : null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraError, setCameraError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Camera
  useEffect(() => {
    let active = true;
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "user" }, audio: false })
      .then((stream) => {
        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => setCameraError("Tidak bisa mengakses kamera. Periksa izin kamera pada browser."));

    return () => {
      active = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Fresh GPS read for this attempt
  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation tidak didukung.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setGpsError("Gagal membaca lokasi GPS."),
      { enableHighAccuracy: true }
    );
  }, []);

  const distance = target && coords ? haversine(coords.lat, coords.lng, target.lat, target.lng) : null;
  const withinRadius = target && distance !== null ? distance <= target.radius : false;

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 640;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1); // mirror, like a selfie
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL("image/jpeg", 0.7));
  };

  const retake = () => setPhoto(null);

  const handleSubmit = () => {
    if (!profile) {
      toast.error("Profil karyawan tidak ditemukan.");
      return;
    }
    if (attendanceType === "Check-In") {
      if (!target) {
        toast.error("Anda belum terikat ke vendor manapun. Hubungi admin.");
        return;
      }
      if (!coords) {
        toast.error("Lokasi GPS belum terbaca, coba lagi.");
        return;
      }
      if (!withinRadius) {
        toast.error(`Di luar radius (${distance}m). Batas maksimal ${target.radius}m.`);
        return;
      }
      if (!photo) {
        toast.error("Ambil foto selfie terlebih dahulu sebagai bukti presensi.");
        return;
      }
    }

    setSubmitting(true);
    createAttendance({
      employee_id: profile.id,
      vendor_id: mode === "vendor" ? assignedVendor?.id ?? null : null,
      type: attendanceType,
      status: target && distance !== null ? (distance <= target.radius ? "success" : "anomaly") : "success",
      distance_m: distance ?? 0,
      latitude: coords?.lat ?? 0,
      longitude: coords?.lng ?? 0,
      photo,
    });
    toast.success(attendanceType === "Check-In" ? "Check-In Berhasil!" : "Check-Out Berhasil!");
    setSubmitting(false);
    nav({ to: "/employee" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        <button onClick={() => nav({ to: "/employee" })} className="p-2 -ml-2 rounded-full hover:bg-slate-800">
          <X className="w-5 h-5" />
        </button>
        <p className="font-semibold text-sm">{attendanceType === "Check-In" ? "Presensi Masuk" : "Presensi Keluar"}</p>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-5 gap-4">
        <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
          {photo ? (
            <img src={photo} alt="Foto presensi" className="w-full h-full object-cover" />
          ) : cameraError ? (
            <div className="w-full h-full grid place-items-center p-6 text-center text-slate-400 text-sm gap-2">
              <AlertTriangle className="w-6 h-6 mx-auto text-amber-500 mb-2" />
              {cameraError}
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover -scale-x-100" />
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />

        <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Lokasi target</span>
            <span className="font-semibold">{target?.name ?? "Belum ditentukan"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Jarak</span>
            <span className={`font-mono font-bold ${withinRadius ? "text-emerald-400" : "text-red-400"}`}>
              {gpsError ? "GPS error" : distance !== null ? `${distance} m` : "Membaca..."}
            </span>
          </div>
          {attendanceType === "Check-In" && target && distance !== null && !withinRadius && (
            <p className="text-red-400">Di luar radius {target.radius}m — presensi akan ditolak.</p>
          )}
        </div>

        {photo ? (
          <div className="w-full max-w-sm grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-slate-700 text-white" onClick={retake}>
              <RefreshCcw className="w-4 h-4 mr-1.5" /> Ambil Ulang
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-500"
              onClick={handleSubmit}
              disabled={submitting || (attendanceType === "Check-In" && !withinRadius)}
            >
              {submitting ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Check className="w-4 h-4 mr-1.5" />}
              Kirim
            </Button>
          </div>
        ) : (
          <Button
            className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-500"
            onClick={capturePhoto}
            disabled={!!cameraError}
          >
            <Camera className="w-4 h-4 mr-1.5" /> Ambil Foto
          </Button>
        )}

        {attendanceType === "Check-Out" && !photo && (
          <button onClick={handleSubmit} className="text-xs text-slate-400 underline underline-offset-2">
            Lewati foto & langsung check-out
          </button>
        )}
      </div>
    </div>
  );
}
