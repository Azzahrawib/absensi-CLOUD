globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/camera-B8vl39FQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"150-xZxkSeWhUO1MTWtiFQWPQ3JTlRo\"",
		"mtime": "2026-07-05T16:37:41.269Z",
		"size": 336,
		"path": "../public/assets/camera-B8vl39FQ.js"
	},
	"/assets/circle-check-BMmbSs6l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-Tr/tvl1HqZ187ylYAWhDdazeiek\"",
		"mtime": "2026-07-05T16:37:41.269Z",
		"size": 178,
		"path": "../public/assets/circle-check-BMmbSs6l.js"
	},
	"/assets/createBaseUIEventDetails-B5glDO4T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0b-FSK8Ds7nHcXPpW3oNh6vx7R7lHQ\"",
		"mtime": "2026-07-05T16:37:41.270Z",
		"size": 3339,
		"path": "../public/assets/createBaseUIEventDetails-B5glDO4T.js"
	},
	"/assets/button-CM-DpHsL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e08-VGg1JmwDSQllV5NipdmCMCv0ifc\"",
		"mtime": "2026-07-05T16:37:41.269Z",
		"size": 3592,
		"path": "../public/assets/button-CM-DpHsL.js"
	},
	"/assets/admin-VNoDUEQ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1abb-XbqdUg+6At1gBJ42aXOLf/52LsM\"",
		"mtime": "2026-07-05T16:37:41.269Z",
		"size": 6843,
		"path": "../public/assets/admin-VNoDUEQ1.js"
	},
	"/assets/employee-fzV9cX7Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"756-ycfnMg6RO7Gq8MSF9rFv55xVce0\"",
		"mtime": "2026-07-05T16:37:41.270Z",
		"size": 1878,
		"path": "../public/assets/employee-fzV9cX7Y.js"
	},
	"/assets/createLucideIcon-DeQrcgrh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-cR1PODv03KUfJz4HloEEypYngbs\"",
		"mtime": "2026-07-05T16:37:41.270Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-DeQrcgrh.js"
	},
	"/assets/employee.profile-xrQe8huq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d17-KoM7VHG737tlQ99KO9bsbbOfhJs\"",
		"mtime": "2026-07-05T16:37:41.271Z",
		"size": 3351,
		"path": "../public/assets/employee.profile-xrQe8huq.js"
	},
	"/assets/employee.index-BwQn87aJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f2d-VC03PjjVftBFXfBcBffW7OQYph8\"",
		"mtime": "2026-07-05T16:37:41.270Z",
		"size": 24365,
		"path": "../public/assets/employee.index-BwQn87aJ.js"
	},
	"/assets/geist-cyrillic-wght-normal-BEAKL7Jp.woff2": {
		"type": "font/woff2",
		"etag": "\"3aec-5kpQSZEtAzzU5kdiuro3Zr2YR54\"",
		"mtime": "2026-07-05T16:37:41.274Z",
		"size": 15084,
		"path": "../public/assets/geist-cyrillic-wght-normal-BEAKL7Jp.woff2"
	},
	"/assets/employee.checkin-DuHC6aV0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1197-kHYqX8s9MGcwUjWhYgZvcgePGxg\"",
		"mtime": "2026-07-05T16:37:41.270Z",
		"size": 4503,
		"path": "../public/assets/employee.checkin-DuHC6aV0.js"
	},
	"/assets/geist-cyrillic-ext-wght-normal-DjL33-gN.woff2": {
		"type": "font/woff2",
		"etag": "\"1cfc-yYSDXNlt/tTRaj6rJo8ZMqvY7pQ\"",
		"mtime": "2026-07-05T16:37:41.274Z",
		"size": 7420,
		"path": "../public/assets/geist-cyrillic-ext-wght-normal-DjL33-gN.woff2"
	},
	"/assets/geist-latin-ext-wght-normal-DC-KSUi6.woff2": {
		"type": "font/woff2",
		"etag": "\"4080-mZu3Z7sOWqglha+kefNbUA9Pp+Q\"",
		"mtime": "2026-07-05T16:37:41.275Z",
		"size": 16512,
		"path": "../public/assets/geist-latin-ext-wght-normal-DC-KSUi6.woff2"
	},
	"/assets/geist-latin-wght-normal-BgDaEnEv.woff2": {
		"type": "font/woff2",
		"etag": "\"72d8-9J+D7/6th5UzRxIgoFX9awJv47A\"",
		"mtime": "2026-07-05T16:37:41.275Z",
		"size": 29400,
		"path": "../public/assets/geist-latin-wght-normal-BgDaEnEv.woff2"
	},
	"/assets/geist-vietnamese-wght-normal-6IgcOCM7.woff2": {
		"type": "font/woff2",
		"etag": "\"1f44-6MZ7/PEEOeDVF0eHI650KpwKQV8\"",
		"mtime": "2026-07-05T16:37:41.275Z",
		"size": 8004,
		"path": "../public/assets/geist-vietnamese-wght-normal-6IgcOCM7.woff2"
	},
	"/assets/index-BDgXgfzW.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"f045-8qxGGbYIo1VA0JJr6D02/0tkn48\"",
		"mtime": "2026-07-05T16:37:41.276Z",
		"size": 61509,
		"path": "../public/assets/index-BDgXgfzW.css"
	},
	"/assets/input-B5L9Fhip.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9c-93j95LLjmbFWJtCJ/fEI0J2/0w0\"",
		"mtime": "2026-07-05T16:37:41.271Z",
		"size": 2716,
		"path": "../public/assets/input-B5L9Fhip.js"
	},
	"/assets/loader-circle-aedxAz1-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-oRwsLr02YXjb+KE/IkQkjsNEMmU\"",
		"mtime": "2026-07-05T16:37:41.271Z",
		"size": 144,
		"path": "../public/assets/loader-circle-aedxAz1-.js"
	},
	"/assets/smartphone-CcpSh2jH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-+L4btkJTs4v7yGUDBSsyT3JNM7U\"",
		"mtime": "2026-07-05T16:37:41.272Z",
		"size": 197,
		"path": "../public/assets/smartphone-CcpSh2jH.js"
	},
	"/assets/visuallyHidden-CU33ee32.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce-IZjsy+4MLyenTnBqCLqB79DuNgQ\"",
		"mtime": "2026-07-05T16:37:41.273Z",
		"size": 462,
		"path": "../public/assets/visuallyHidden-CU33ee32.js"
	},
	"/assets/jsx-runtime-bzQ4Vb5N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d8-vMfP+4a4ykIjbw4InHkj3E5HWt0\"",
		"mtime": "2026-07-05T16:37:41.271Z",
		"size": 8408,
		"path": "../public/assets/jsx-runtime-bzQ4Vb5N.js"
	},
	"/assets/log-out-DoLQqS8K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-F7daWOysjZkw9NclzECfGUm4oIs\"",
		"mtime": "2026-07-05T16:37:41.271Z",
		"size": 230,
		"path": "../public/assets/log-out-DoLQqS8K.js"
	},
	"/assets/routes-340w_yIA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2f9-xY/f+L8uJf6RMlesTCbay0Nwv90\"",
		"mtime": "2026-07-05T16:37:41.272Z",
		"size": 54009,
		"path": "../public/assets/routes-340w_yIA.js"
	},
	"/assets/useButton-D0xCRTjp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"88f3-WwGpQZN2NUEfBJVV8NBlL7zP5Ww\"",
		"mtime": "2026-07-05T16:37:41.272Z",
		"size": 35059,
		"path": "../public/assets/useButton-D0xCRTjp.js"
	},
	"/assets/index-BJl_LbKV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a973-VcZf/xLYx/ZQQhCLkawNG6dYrPQ\"",
		"mtime": "2026-07-05T16:37:41.268Z",
		"size": 371059,
		"path": "../public/assets/index-BJl_LbKV.js"
	},
	"/assets/work-mode-BaxRXLRF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31e04-OiQRmqgM04602FbvFQICOKCjfUE\"",
		"mtime": "2026-07-05T16:37:41.273Z",
		"size": 204292,
		"path": "../public/assets/work-mode-BaxRXLRF.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_khfkxD = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_khfkxD
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
