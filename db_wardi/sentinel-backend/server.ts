import http from "node:http";
import { URL } from "node:url";
import {
  resetDeviceBinding,
  deleteDeviceBindings,
  createVendorLocation,
  updateVendorLocation,
  deleteVendorLocation,
  fetchVendorLocations,
  createBiometricEnrollment,
  fetchPendingBiometricEnrollments,
  approveBiometricEnrollment,
  rejectBiometricEnrollment,
} from "./src/lib/supabaseService.ts";

const port = Number(process.env.ADMIN_API_PORT ?? 4000);

function sendJson(res: http.ServerResponse, status: number, payload: unknown) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

async function parseJsonBody(req: http.IncomingMessage) {
  return new Promise<any>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      if (!chunks.length) return resolve({});
      try {
        const body = Buffer.concat(chunks).toString("utf-8");
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function parseIdFromPath(pathname: string, prefix: string) {
  if (!pathname.startsWith(prefix)) return null;
  const remainder = pathname.slice(prefix.length);
  if (!remainder || remainder === "/") return null;
  return remainder.replace(/^\//, "");
}

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) {
      sendJson(res, 400, { error: "Missing request URL" });
      return;
    }

    const url = new URL(req.url, `http://localhost:${port}`);
    const pathname = url.pathname;
    const method = req.method?.toUpperCase() ?? "GET";

    if (method === "OPTIONS") {
      sendJson(res, 204, {});
      return;
    }

    if (pathname === "/admin/reset-device-binding" && method === "POST") {
      const body = await parseJsonBody(req);
      if (!body.employeeId) {
        sendJson(res, 400, { error: "employeeId required" });
        return;
      }
      const data = await resetDeviceBinding(body.employeeId);
      sendJson(res, 200, { data });
      return;
    }

    if (pathname === "/admin/device-bindings" && method === "DELETE") {
      const body = await parseJsonBody(req);
      if (!body.employeeId) {
        sendJson(res, 400, { error: "employeeId required" });
        return;
      }
      const data = await deleteDeviceBindings(body.employeeId);
      sendJson(res, 200, { data });
      return;
    }

    if (pathname === "/admin/vendor-locations" && method === "GET") {
      const data = await fetchVendorLocations();
      sendJson(res, 200, { data });
      return;
    }

    if (pathname === "/admin/vendor-locations" && method === "POST") {
      const payload = await parseJsonBody(req);
      const data = await createVendorLocation(payload);
      sendJson(res, 201, { data });
      return;
    }

    if (pathname.startsWith("/admin/vendor-locations/") && method === "PUT") {
      const id = parseIdFromPath(pathname, "/admin/vendor-locations/");
      if (!id) {
        sendJson(res, 400, { error: "Missing vendor location id" });
        return;
      }
      const payload = await parseJsonBody(req);
      const data = await updateVendorLocation(id, payload);
      sendJson(res, 200, { data });
      return;
    }

    if (pathname.startsWith("/admin/vendor-locations/") && method === "DELETE") {
      const id = parseIdFromPath(pathname, "/admin/vendor-locations/");
      if (!id) {
        sendJson(res, 400, { error: "Missing vendor location id" });
        return;
      }
      const data = await deleteVendorLocation(id);
      sendJson(res, 200, { data });
      return;
    }

    if (pathname === "/admin/biometric-enrollments" && method === "GET") {
      const status = url.searchParams.get("status") ?? "pending";
      const data = await fetchPendingBiometricEnrollments(status as any);
      sendJson(res, 200, { data });
      return;
    }

    if (pathname === "/admin/biometric-enrollments" && method === "POST") {
      const body = await parseJsonBody(req);
      const { employeeId, photoBase64 } = body;
      if (!employeeId || !photoBase64) {
        sendJson(res, 400, { error: "employeeId and photoBase64 are required" });
        return;
      }
      const data = await createBiometricEnrollment(employeeId, photoBase64);
      sendJson(res, 201, { data });
      return;
    }

    if (pathname.endsWith("/approve") && method === "PUT") {
      const id = parseIdFromPath(pathname, "/admin/biometric-enrollments/")?.replace("/approve", "");
      if (!id) {
        sendJson(res, 400, { error: "Missing enrollment id" });
        return;
      }
      const body = await parseJsonBody(req);
      const { reviewerId, templateUrl } = body;
      if (!reviewerId || !templateUrl) {
        sendJson(res, 400, { error: "reviewerId and templateUrl are required" });
        return;
      }
      const data = await approveBiometricEnrollment(id, reviewerId, templateUrl);
      sendJson(res, 200, { data });
      return;
    }

    if (pathname.endsWith("/reject") && method === "PUT") {
      const id = parseIdFromPath(pathname, "/admin/biometric-enrollments/")?.replace("/reject", "");
      if (!id) {
        sendJson(res, 400, { error: "Missing enrollment id" });
        return;
      }
      const body = await parseJsonBody(req);
      const { reviewerId, reviewNotes } = body;
      if (!reviewerId || !reviewNotes) {
        sendJson(res, 400, { error: "reviewerId and reviewNotes are required" });
        return;
      }
      const data = await rejectBiometricEnrollment(id, reviewerId, reviewNotes);
      sendJson(res, 200, { data });
      return;
    }

    sendJson(res, 404, { error: "Route not found" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, {
      error: "Internal server error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

server.listen(port, () => {
  console.log(`Admin API server listening at http://localhost:${port}`);
});
