// ========================================================
// Geo Attend — Core Error Reporting System
// ========================================================

type AppErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

/**
 * Fungsi global untuk menangkap dan melaporkan runtime error aplikasi.
 * Bisa diintegrasikan dengan Console Logging, Supabase DB, atau Sentry di masa depan.
 */
export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  // Pastikan kode berjalan di lingkungan browser (Client-Side)
  if (typeof window === "undefined") return;

  const errorRoute = window.location.pathname;
  const errorPayload = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    route: errorRoute,
    source: "react_error_boundary",
    timestamp: new Date().toISOString(),
    ...context,
  };

  const options: AppErrorOptions = {
    mechanism: "react_error_boundary",
    handled: false,
    severity: "error",
  };

  // 1. Output ke console log local dulu untuk kebutuhan debugging/development kalian
  console.error(`[App Error] [${options.severity?.toUpperCase()}] Route: ${errorRoute}`, {
    payload: errorPayload,
    options,
  });

  // 2. TEMPAT COLOKAN BACKEND MASA DEPAN:
  // Jika nanti malam kalian mau error sistem yang fatal otomatis tersimpan ke Supabase, 
  // tinggal un-comment baris di bawah ini:
  /*
  import { supabase } from './supabaseService';
  supabase.from('log_anomali').insert({
    jenis_pelanggaran: 'Runtime Code Error',
    status_review: 'Pending',
    created_at: new Date().toISOString()
  }).then(({ error }) => {
    if (error) console.error('Gagal mengirim log error ke Supabase:', error);
  });
  */
}