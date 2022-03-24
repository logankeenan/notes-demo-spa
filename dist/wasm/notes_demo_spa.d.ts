/* tslint:disable */
/* eslint-disable */
/**
* @param {JsRequest} js_request
* @returns {Promise<JsResponse>}
*/
export function app(js_request: JsRequest): Promise<JsResponse>;
/**
* Configuration options for Cloudflare's image optimization feature:
* <https://blog.cloudflare.com/introducing-polish-automatic-image-optimizati/>
*/
export enum PolishConfig {
  Off,
  Lossy,
  Lossless,
}
/**
*/
export enum RequestRedirect {
  Error,
  Follow,
  Manual,
}
/**
*
* Represents a request originating from JavaScript.
* ```javascript
* // JavaScript Example
* import {JsRequest} from "my-wasm-app"
*
* const jsRequest = new JsRequest("https://www.rust-lang.org/", "GET");
* jsRequest.headers_append("Content-Type", "text/html");
*
* // pass request to WASM app
* ```
*
* Consume the request in Rust
* ```
* use javascript_adapter::JsRequest;
*
* #[wasm_bindgen]
* pub fn app(js_request: JsRequest) {
*     // do things with js_request
* }
*/
export class JsRequest {
  free(): void;
/**
* @param {string} uri
* @param {string} method
*/
  constructor(uri: string, method: string);
/**
* @param {string} key
* @param {string} value
*/
  headers_append(key: string, value: string): void;
/**
* @returns {string}
*/
  readonly body: string;
/**
* @returns {any}
*/
  readonly headers: any;
/**
* @returns {string}
*/
  readonly method: string;
/**
* @returns {string}
*/
  readonly uri: string;
}
/**
* Represents a response originating from Rust.
*
* ```
* use crate::javascript_adapter::JsResponse;
*
* #[wasm_bindgen]
* pub fn app() -> JsResponse {
*     let mut  response = JsResponse::new();
*     response.body = Some(String::from("hello world"));
*     response.headers.insert(String::from("Content-Type"), String::from("text/plain"));
*     response.status_code = String::from("200");
*
*     response
* }
* ```
*/
export class JsResponse {
  free(): void;
/**
*/
  constructor();
/**
* @returns {string | undefined}
*/
  readonly body: string | undefined;
/**
* @returns {any}
*/
  readonly headers: any;
/**
* @returns {string}
*/
  readonly status_code: string;
}
/**
* Configuration options for Cloudflare's minification features:
* <https://www.cloudflare.com/website-optimization/>
*/
export class MinifyConfig {
  free(): void;
/**
*/
  css: boolean;
/**
*/
  html: boolean;
/**
*/
  js: boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly app: (a: number) => number;
  readonly __wbg_jsrequest_free: (a: number) => void;
  readonly jsrequest_new: (a: number, b: number, c: number, d: number) => number;
  readonly jsrequest_uri: (a: number, b: number) => void;
  readonly jsrequest_method: (a: number, b: number) => void;
  readonly jsrequest_body: (a: number, b: number) => void;
  readonly jsrequest_headers: (a: number) => number;
  readonly jsrequest_headers_append: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbg_jsresponse_free: (a: number) => void;
  readonly jsresponse_new: () => number;
  readonly jsresponse_status_code: (a: number, b: number) => void;
  readonly jsresponse_body: (a: number, b: number) => void;
  readonly jsresponse_headers: (a: number) => number;
  readonly __wbg_minifyconfig_free: (a: number) => void;
  readonly __wbg_get_minifyconfig_js: (a: number) => number;
  readonly __wbg_set_minifyconfig_js: (a: number, b: number) => void;
  readonly __wbg_get_minifyconfig_html: (a: number) => number;
  readonly __wbg_set_minifyconfig_html: (a: number, b: number) => void;
  readonly __wbg_get_minifyconfig_css: (a: number) => number;
  readonly __wbg_set_minifyconfig_css: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1bfb4720384f141d: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0c31640ab24c8b1e: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__hc7a0caf85c95e028: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
