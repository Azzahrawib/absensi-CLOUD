import { useSyncExternalStore } from "react";
import { getVendorById } from "./db";

/** Fixed head-office coordinates used when an employee checks in as "Office Base". */
export const OFFICE = {
  name: "Sentinel HQ Jakarta",
  lat: -6.2088,
  lng: 106.8456,
  radius: 150,
};

/** Great-circle distance between two coordinates, in meters (rounded). */
export function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  if (!lat1 && !lng1) return 0;
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export type WorkMode = "office" | "vendor";
type WorkModeState = { mode: WorkMode };

const STORAGE_KEY = "sentinel_work_mode";

function loadInitial(): WorkModeState {
  if (typeof window === "undefined") return { mode: "office" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore malformed state */
  }
  return { mode: "office" };
}

/**
 * Tiny external store (no extra deps) so multiple components can read/write
 * the current work mode and stay in sync via useSyncExternalStore.
 */
class WorkStore {
  private state: WorkModeState = loadInitial();
  private listeners = new Set<() => void>();

  get = () => this.state;

  set = (partial: Partial<WorkModeState>) => {
    this.state = { ...this.state, ...partial };
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    }
    this.listeners.forEach((l) => l());
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

export const workStore = new WorkStore();

export function useWorkMode() {
  return useSyncExternalStore(workStore.subscribe, workStore.get, workStore.get);
}

/**
 * An employee is no longer free to pick any vendor — they are bound to
 * exactly one vendor location by the admin (Employee.vendor_id). This just
 * resolves that binding.
 */
export function getVendor(vendorId: string | null | undefined) {
  return getVendorById(vendorId);
}
