import "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { d as Input, m as require_react, p as require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input$1({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		type,
		"data-slot": "input",
		className: cn("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
var supabase = createClient("https://dmqahvlogokuqecvqyxr.supabase.co", "sb_publishable_erVMtzb2Az5aW4pADYM_Ow_ccsG3mq2");
function generateRandomPassword(len = 24) {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()-_=+[]{}";
	let out = "";
	const cryptoObj = globalThis.crypto;
	if (cryptoObj?.getRandomValues) {
		const arr = new Uint32Array(len);
		cryptoObj.getRandomValues(arr);
		for (let i = 0; i < len; i++) out += chars[arr[i] % 75];
		return out;
	}
	for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * 75)];
	return out;
}
async function inviteNewEmployee(payload) {
	const { full_name, email, phone, role, department, vendor_id = null, ...rest } = payload;
	try {
		const inviteResult = await supabase.auth.admin.inviteUserByEmail(email);
		if (inviteResult.error) throw inviteResult.error;
		const invitedUser = inviteResult.data;
		const authUserId = invitedUser?.user?.id ?? invitedUser?.id ?? invitedUser?.user_id;
		const insertPayload = {
			full_name,
			email,
			phone,
			role,
			department,
			vendor_id,
			...authUserId ? { auth_user_id: authUserId } : {},
			...rest
		};
		const { data: inserted, error: insertError } = await supabase.from("employees").insert(insertPayload).select().maybeSingle();
		if (insertError) throw insertError;
		return {
			success: true,
			invite: inviteResult.data,
			data: inserted
		};
	} catch (err) {
		const message = String(err?.message ?? err);
		if (!/privilege|permission|not authorized|not authorized|forbidden|insufficient|admin/i.test(message)) return {
			success: false,
			error: message
		};
		try {
			const password = generateRandomPassword();
			const signUpResult = await supabase.auth.signUp({
				email,
				password
			});
			if (signUpResult.error) throw signUpResult.error;
			const authUserId = signUpResult.data?.user?.id;
			const insertPayload = {
				full_name,
				email,
				phone,
				role,
				department,
				vendor_id,
				...authUserId ? { auth_user_id: authUserId } : {},
				...rest
			};
			const { data: inserted, error: insertError } = await supabase.from("employees").insert([insertPayload]).select().maybeSingle();
			if (insertError) throw insertError;
			return {
				success: true,
				invite: { method: "signUp-fallback" },
				data: inserted,
				signup: signUpResult.data
			};
		} catch (err2) {
			return {
				success: false,
				error: String(err2?.message ?? err2)
			};
		}
	}
}
//#endregion
export { supabase as i, Label as n, inviteNewEmployee as r, Input$1 as t };
