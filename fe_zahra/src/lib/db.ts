/**
 * Geo Attend — Local Data Layer
 * -----------------------------------
 * The previous version of this app mixed Supabase calls (for `attendances`
 * and `vendor_locations`) with ad-hoc localStorage writes for employees.
 * That made "CRUD" unreliable: employees lived only in localStorage while
 * vendors/attendance lived (partially) in a Supabase project this codebase
 * doesn't actually have credentials/schema for.
 *
 * To make every CRUD flow ACTUALLY WORK end-to-end without a backend,
 * this file centralizes Employees, Vendors, and Attendance Logs into a
 * single localStorage-backed "database" with sequential IDs, referential
 * integrity (deleting a vendor unbinds its employees), and a session helper
 * so the employee-facing screens read real, dynamic data instead of
 * hardcoded strings.
 *
 * If/when a real backend is wired up, only the functions in this file need
 * to change — every screen calls these functions, never localStorage directly.
 */

export type Employee = {
  id: string; // EMP-0001
  full_name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  vendor_id: string | null;
  created_at: string;
};

export type Vendor = {
  id: string; // VEN-0001
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  radius_m: number;
  created_at: string;
};

export type AttendanceStatus = "success" | "anomaly";
export type AttendanceType = "Check-In" | "Check-Out";

export type AttendanceLog = {
  id: string; // LOG-0001
  employee_id: string;
  vendor_id: string | null;
  type: AttendanceType;
  status: AttendanceStatus;
  distance_m: number;
  latitude: number;
  longitude: number;
  photo: string | null; // base64 data URL captured at the moment of check-in/out
  note?: string;
  created_at: string;
};

const KEYS = {
  employees: "sentinel_employees_db",
  vendors: "sentinel_vendors_db",
  attendance: "sentinel_attendance_logs",
  seq: "sentinel_seq_counters",
  session: "sentinel_active_session_user",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

function nextId(prefix: "EMP" | "VEN" | "LOG") {
  const counters = read<Record<string, number>>(KEYS.seq, {});
  const next = (counters[prefix] ?? 0) + 1;
  counters[prefix] = next;
  write(KEYS.seq, counters);
  return `${prefix}-${String(next).padStart(4, "0")}`;
}

/** Seed a first vendor + employee on very first run so the app isn't empty. */
function seedIfEmpty() {
  const vendors = read<Vendor[]>(KEYS.vendors, []);
  if (vendors.length === 0) {
    const seedVendor: Vendor = {
      id: nextId("VEN"),
      name: "Client Site — Sudirman Tower",
      address: "Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan",
      latitude: -6.2246,
      longitude: 106.809,
      radius_m: 150,
      created_at: new Date().toISOString(),
    };
    write(KEYS.vendors, [seedVendor]);
  }

  const employees = read<Employee[]>(KEYS.employees, []);
  if (employees.length === 0) {
    const currentVendors = read<Vendor[]>(KEYS.vendors, []);
    const seedEmployee: Employee = {
      id: nextId("EMP"),
      full_name: "Azzahra Asabri",
      email: "aisha.r@sentinel.co",
      role: "IT Intern",
      department: "Engineering",
      phone: "+62 812-3456-7890",
      vendor_id: currentVendors[0]?.id ?? null,
      created_at: new Date().toISOString(),
    };
    write(KEYS.employees, [seedEmployee]);
  }
}
seedIfEmpty();

/* ------------------------------- EMPLOYEES ------------------------------ */

export function listEmployees(): Employee[] {
  return read<Employee[]>(KEYS.employees, []);
}

export function getEmployeeById(id: string): Employee | undefined {
  return listEmployees().find((e) => e.id === id);
}

export function createEmployee(data: Omit<Employee, "id" | "created_at">): Employee {
  const employees = listEmployees();
  const employee: Employee = { ...data, id: nextId("EMP"), created_at: new Date().toISOString() };
  write(KEYS.employees, [...employees, employee]);
  return employee;
}

export function updateEmployee(id: string, patch: Partial<Omit<Employee, "id" | "created_at">>): Employee | undefined {
  const employees = listEmployees();
  const idx = employees.findIndex((e) => e.id === id);
  if (idx === -1) return undefined;
  employees[idx] = { ...employees[idx], ...patch };
  write(KEYS.employees, employees);
  return employees[idx];
}

export function deleteEmployee(id: string) {
  write(KEYS.employees, listEmployees().filter((e) => e.id !== id));
}

/* -------------------------------- VENDORS -------------------------------- */

export function listVendors(): Vendor[] {
  return read<Vendor[]>(KEYS.vendors, []);
}

export function getVendorById(id: string | null | undefined): Vendor | undefined {
  if (!id) return undefined;
  return listVendors().find((v) => v.id === id);
}

export function createVendor(data: Omit<Vendor, "id" | "created_at">): Vendor {
  const vendors = listVendors();
  const vendor: Vendor = { ...data, id: nextId("VEN"), created_at: new Date().toISOString() };
  write(KEYS.vendors, [...vendors, vendor]);
  return vendor;
}

export function updateVendor(id: string, patch: Partial<Omit<Vendor, "id" | "created_at">>): Vendor | undefined {
  const vendors = listVendors();
  const idx = vendors.findIndex((v) => v.id === id);
  if (idx === -1) return undefined;
  vendors[idx] = { ...vendors[idx], ...patch };
  write(KEYS.vendors, vendors);
  return vendors[idx];
}

/** Deleting a vendor unbinds any employee that was assigned to it (referential integrity). */
export function deleteVendor(id: string) {
  write(KEYS.vendors, listVendors().filter((v) => v.id !== id));
  const employees = listEmployees().map((e) => (e.vendor_id === id ? { ...e, vendor_id: null } : e));
  write(KEYS.employees, employees);
}

export function countEmployeesForVendor(vendorId: string): number {
  return listEmployees().filter((e) => e.vendor_id === vendorId).length;
}

/* ------------------------------ ATTENDANCE ------------------------------- */

export function listAttendance(): AttendanceLog[] {
  return read<AttendanceLog[]>(KEYS.attendance, []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function listAttendanceByEmployee(employeeId: string): AttendanceLog[] {
  return listAttendance().filter((l) => l.employee_id === employeeId);
}

export function getLatestAttendanceByEmployee(employeeId: string): AttendanceLog | undefined {
  return listAttendanceByEmployee(employeeId)[0];
}

export function createAttendance(data: Omit<AttendanceLog, "id" | "created_at">): AttendanceLog {
  const logs = read<AttendanceLog[]>(KEYS.attendance, []);
  const log: AttendanceLog = { ...data, id: nextId("LOG"), created_at: new Date().toISOString() };
  write(KEYS.attendance, [log, ...logs]);
  return log;
}

/* --------------------------------- SESSION -------------------------------- */
/**
 * Lightweight "who is using the employee app right now" helper. In lieu of a
 * real auth system, it defaults to the first registered employee and persists
 * the choice for the browser tab (sessionStorage), so the employee UI is
 * always driven by real Employee records instead of a hardcoded name.
 */
export function getActiveEmployee(): Employee | undefined {
  if (typeof window !== "undefined") {
    const raw = sessionStorage.getItem(KEYS.session);
    if (raw) {
      try {
        const { id } = JSON.parse(raw) as { id: string };
        const found = getEmployeeById(id);
        if (found) return found;
      } catch {
        /* ignore malformed session */
      }
    }
  }
  const [first] = listEmployees();
  if (first && typeof window !== "undefined") {
    sessionStorage.setItem(KEYS.session, JSON.stringify({ id: first.id }));
  }
  return first;
}

export function setActiveEmployee(id: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(KEYS.session, JSON.stringify({ id }));
  }
}
