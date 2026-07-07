export const OFFICE = { lat: -6.2088, lng: 106.8456, name: "HQ Jakarta", radius: 50 };

export type AttendanceLog = {
  id: string;
  name: string;
  avatar: string;
  timestamp: string;
  location: string;
  distance: number;
  status: "Success" | "Flagged Mock GPS" | "Face Mismatch";
  photo: string;
};

export const mockLogs: AttendanceLog[] = [
  { id: "1", name: "Aisha Rahman", avatar: "AR", timestamp: "2026-06-25 08:02:14", location: "-6.20881, 106.84561", distance: 12, status: "Success", photo: "https://i.pravatar.cc/80?img=47" },
  { id: "2", name: "Budi Santoso", avatar: "BS", timestamp: "2026-06-25 08:14:51", location: "-6.20895, 106.84572", distance: 22, status: "Success", photo: "https://i.pravatar.cc/80?img=12" },
  { id: "3", name: "Chitra Dewi", avatar: "CD", timestamp: "2026-06-25 08:21:09", location: "-6.21102, 106.84812", distance: 312, status: "Flagged Mock GPS", photo: "https://i.pravatar.cc/80?img=32" },
  { id: "4", name: "Dimas Pratama", avatar: "DP", timestamp: "2026-06-25 08:29:33", location: "-6.20879, 106.84549", distance: 8, status: "Success", photo: "https://i.pravatar.cc/80?img=15" },
  { id: "5", name: "Eka Putri", avatar: "EP", timestamp: "2026-06-25 08:35:42", location: "-6.20910, 106.84600", distance: 47, status: "Face Mismatch", photo: "https://i.pravatar.cc/80?img=45" },
  { id: "6", name: "Fajar Nugroho", avatar: "FN", timestamp: "2026-06-25 08:41:18", location: "-6.20885, 106.84563", distance: 15, status: "Success", photo: "https://i.pravatar.cc/80?img=8" },
  { id: "7", name: "Gita Maharani", avatar: "GM", timestamp: "2026-06-25 08:47:55", location: "-6.20893, 106.84570", distance: 19, status: "Success", photo: "https://i.pravatar.cc/80?img=49" },
];

export const mockEmployees = [
  { id: "E001", name: "Aisha Rahman", role: "Software Engineer", dept: "Engineering", device: "Linked" },
  { id: "E002", name: "Budi Santoso", role: "Product Manager", dept: "Product", device: "Linked" },
  { id: "E003", name: "Chitra Dewi", role: "UX Designer", dept: "Design", device: "Unlinked" },
  { id: "E004", name: "Dimas Pratama", role: "Data Analyst", dept: "Analytics", device: "Linked" },
  { id: "E005", name: "Eka Putri", role: "HR Specialist", dept: "Human Resources", device: "Linked" },
];

// Simulated Haversine distance (m)
export function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}
