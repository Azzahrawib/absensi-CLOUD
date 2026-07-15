import { createClient } from '@supabase/supabase-js';

// 1. Inisialisasi Client Supabase
const supabaseUrl = 'https://dmqahvlogokuqecvqyxr.supabase.co';
const supabaseKey = 'sb_publishable_erVMtzb2Az5aW4pADYM_Ow_ccsG3mq2';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Interface agar tipe data terstruktur dengan baik
interface PresensiPayload {
    userId: string;
    type: 'check_in' | 'check_out';
    lat: number;
    lon: number;
    distance: number;
    locName: string;
    locType: 'office' | 'vendor';
    vendorId?: string | null;
    photoBase64: string;
    isMockGps: boolean;
    deviceInfo?: any;
}

/**
 * ========================================================
 * 1. FLOW LOGIN & CHECK DEVICE BINDING
 * ========================================================
 * Memverifikasi kredensial login sekaligus memeriksa integritas perangkat (Device Binding)
 */
export async function handleLoginFlow(
    email: string,
    password: string,
    currentDeviceId: string,
    currentDeviceName: string
) {
    // A. Jalankan autentikasi bawaan Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (authError) throw new Error('Email atau password salah, jir!');

    const userId = authData.user.id;

    // B. Cari data device binding yang sedang aktif untuk user ini
    const { data: bindingData, error: bindingError } = await supabase
        .from('device_bindings')
        .select('*')
        .eq('employee_id', userId)
        .eq('is_active', true)
        .maybeSingle();

    if (bindingError) throw bindingError;

    // C. Jika belum ada device terdaftar, kunci perangkat ini sebagai perangkat utama
    if (!bindingData) {
        const { error: insertError } = await supabase.from('device_bindings').insert({
            employee_id: userId,
            device_id: currentDeviceId,
            device_name: currentDeviceName,
            is_active: true,
        });

        if (insertError) throw insertError;
        return { status: 'success', message: 'Perangkat baru berhasil di-binding secara otomatis.' };
    }

    // D. Jika device ID yang digunakan login TIDAK COCOK dengan yang terdaftar aktif
    if (bindingData && bindingData.device_id !== currentDeviceId) {
        // Melempar error spesifik agar UI Azzahra bisa langsung memicu Alert Modal error perangkat
        throw new Error('outside_device_binding');
    }

    return { status: 'success', message: 'Login sukses & verifikasi perangkat lolos.' };
}

/**
 * ========================================================
 * 2. FLOW SUBMIT PRESENSI (SUKSES & ANOMALI)
 * ========================================================
 * Menyimpan data absensi karyawan, mendeteksi kecurangan Geofence maupun Fake GPS secara Cloud
 */
export async function submitPresensi(payload: PresensiPayload) {
    const {
        userId,
        type,
        lat,
        lon,
        distance,
        locName,
        locType,
        vendorId,
        photoBase64,
        isMockGps,
        deviceInfo = {},
    } = payload;

    let attendanceStatus = 'success';
    let geofencePass = true;
    let anomalyNote = '';

    // A. Deteksi Indikasi Kecurangan 1: Fake GPS / Mock Location aktif di perangkat
    if (isMockGps) {
        attendanceStatus = 'flagged_mock_gps';
        geofencePass = false;
        anomalyNote = 'Karyawan terdeteksi menggunakan aplikasi Fake GPS / Mock Location!';
    }
    // B. Deteksi Indikasi Kecurangan 2: Berada di luar batas radius aman (150m sesuai skema)
    else if (distance > 150) {
        attendanceStatus = 'outside_geofence';
        geofencePass = false;
        anomalyNote = `Karyawan melakukan presensi di luar radius aman. Jarak saat ini: ${Math.round(distance)} meter.`;
    }

    // C. Simpan seluruh log ke tabel `attendances` (Sesuai skema database milik Azzahra)
    const { data, error } = await supabase.from('attendances').insert({
        employee_id: userId,
        type: type,
        latitude: lat,
        longitude: lon,
        distance_m: Math.round(distance),
        location_name: locName,
        location_type: locType,
        vendor_id: vendorId || null,
        photo_data: photoBase64, // Menyimpan langsung string gambar (Base64) sesuai struktur tabel
        status: attendanceStatus,
        geofence_pass: geofencePass,
        anomaly_note: anomalyNote || null,
        device_info: deviceInfo,
    }).select();

    if (error) throw error;

    // D. Jika gagal verifikasi, lemparkan error flag agar sisi UI bisa memunculkan warning khusus
    if (!geofencePass) {
        throw new Error(attendanceStatus);
    }

    return { status: 'success', data: data[0] };
}

/**
 * ========================================================
 * 3. INVITE NEW EMPLOYEE (ADMIN/HRD)
 * ========================================================
 * Opsi 1: inviteUserByEmail (Supabase sends activation email)
 * Jika privilege error (admin API tidak tersedia untuk anon key),
 * fallback: signUp dengan password acak supaya Supabase mengirim email konfirmasi.
 */
export type InviteNewEmployeePayload = {
    full_name: string;
    email: string;
    phone: string;
    role: string; // jabatan
    department: string;
    vendor_id?: string | null; // lokasi vendor
    // field tambahan bila skema `employees` punya kolom lain
    [key: string]: unknown;
};

function generateRandomPassword(len = 24) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()-_=+[]{}';
    let out = '';
    const cryptoObj = (globalThis as any).crypto;
    if (cryptoObj?.getRandomValues) {
        const arr = new Uint32Array(len);
        cryptoObj.getRandomValues(arr);
        for (let i = 0; i < len; i++) {
            out += chars[arr[i] % chars.length];
        }
        return out;
    }
    // fallback non-crypto
    for (let i = 0; i < len; i++) {
        out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
}

export async function inviteNewEmployee(payload: InviteNewEmployeePayload) {
    const { full_name, email, phone, role, department, vendor_id = null, ...rest } = payload;

    try {
        // 1) Invite user via Supabase Auth
        const inviteResult = await supabase.auth.admin.inviteUserByEmail(email);

        if (inviteResult.error) {
            throw inviteResult.error;
        }

        // 2) Ambil user id yang di-invite
        const invitedUser = inviteResult.data;
        // Supabase dapat mengembalikan data berbeda antar versi; ambil yang tersedia
        const authUserId: string | undefined =
            (invitedUser as any)?.user?.id ?? (invitedUser as any)?.id ?? (invitedUser as any)?.user_id;

        // 3) Insert profil karyawan ke tabel `employees`
        const insertPayload: Record<string, unknown> = {
            // mapping berdasarkan payload UI
            full_name,
            email,
            phone,
            role,
            department,
            vendor_id,
            ...(authUserId ? { id: authUserId } : {}), // <-- UBAH DISINI
            ...rest,
        };

        const { data: inserted, error: insertError } = await supabase
            .from('employees')
            .insert(insertPayload)
            .select()
            .maybeSingle();

        if (insertError) throw insertError;

        return {
            success: true,
            invite: inviteResult.data,
            data: inserted,
        };
    } catch (err: any) {
        // Fallback jika privilege admin invite tidak tersedia untuk anon key
        const message = String(err?.message ?? err);
        const isPrivilegeProblem =
            /privilege|permission|not authorized|forbidden|insufficient|admin|bearer token/i.test(message);
        
        if (!isPrivilegeProblem) {
            return {
                success: false,
                error: message,
            };
        }

        try {
            const password = generateRandomPassword();

            // fallback: signUp agar Supabase mengirim email konfirmasi
            const signUpResult = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpResult.error) throw signUpResult.error;

            // 1) Dapatkan user id dari signUp
            const authUserId: string | undefined = signUpResult.data?.user?.id;

            // 2) Setelah signUp sukses, masukkan profil karyawan ke tabel employees
            const insertPayload: Record<string, unknown> = {
                full_name,
                email,
                phone,
                role,
                department,
                vendor_id,
                ...(authUserId ? { id: authUserId } : {}), // <-- UBAH DISINI JUGA
                ...rest,
            };

            const { data: inserted, error: insertError } = await supabase
                .from('employees')
                .insert([insertPayload]) // Insert expects an array or single object, array is safe
                .select()
                .maybeSingle();

            if (insertError) throw insertError;

            return {
                success: true,
                invite: { method: 'signUp-fallback' },
                data: inserted,
                signup: signUpResult.data,
            };
        } catch (err2: any) {
            return {
                success: false,
                error: String(err2?.message ?? err2),
            };
        }
    }
}