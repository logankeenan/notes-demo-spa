(() => {
  // dist/wasm/notes_demo_spa.js
  var import_meta = {};
  var wasm;
  var heap = new Array(32).fill(void 0);
  heap.push(void 0, null, true, false);
  function getObject(idx) {
    return heap[idx];
  }
  var heap_next = heap.length;
  function dropObject(idx) {
    if (idx < 36)
      return;
    heap[idx] = heap_next;
    heap_next = idx;
  }
  function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
  }
  var WASM_VECTOR_LEN = 0;
  var cachegetUint8Memory0 = null;
  function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
      cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
  }
  var cachedTextEncoder = new TextEncoder("utf-8");
  var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  } : function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === void 0) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr2 = malloc(buf.length);
      getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr2;
    }
    let len = arg.length;
    let ptr = malloc(len);
    const mem = getUint8Memory0();
    let offset = 0;
    for (; offset < len; offset++) {
      const code = arg.charCodeAt(offset);
      if (code > 127)
        break;
      mem[ptr + offset] = code;
    }
    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, len = offset + arg.length * 3);
      const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);
      offset += ret.written;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
  }
  function isLikeNone(x) {
    return x === void 0 || x === null;
  }
  var cachegetInt32Memory0 = null;
  function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
      cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
  }
  function addHeapObject(obj) {
    if (heap_next === heap.length)
      heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
  }
  var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
  cachedTextDecoder.decode();
  function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
  }
  function debugString(val) {
    const type = typeof val;
    if (type == "number" || type == "boolean" || val == null) {
      return `${val}`;
    }
    if (type == "string") {
      return `"${val}"`;
    }
    if (type == "symbol") {
      const description = val.description;
      if (description == null) {
        return "Symbol";
      } else {
        return `Symbol(${description})`;
      }
    }
    if (type == "function") {
      const name = val.name;
      if (typeof name == "string" && name.length > 0) {
        return `Function(${name})`;
      } else {
        return "Function";
      }
    }
    if (Array.isArray(val)) {
      const length = val.length;
      let debug = "[";
      if (length > 0) {
        debug += debugString(val[0]);
      }
      for (let i = 1; i < length; i++) {
        debug += ", " + debugString(val[i]);
      }
      debug += "]";
      return debug;
    }
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
      className = builtInMatches[1];
    } else {
      return toString.call(val);
    }
    if (className == "Object") {
      try {
        return "Object(" + JSON.stringify(val) + ")";
      } catch (_2) {
        return "Object";
      }
    }
    if (val instanceof Error) {
      return `${val.name}: ${val.message}
${val.stack}`;
    }
    return className;
  }
  function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
      state.cnt++;
      const a = state.a;
      state.a = 0;
      try {
        return f(a, state.b, ...args);
      } finally {
        if (--state.cnt === 0) {
          wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
        } else {
          state.a = a;
        }
      }
    };
    real.original = state;
    return real;
  }
  function __wbg_adapter_26(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1bfb4720384f141d(arg0, arg1);
  }
  function __wbg_adapter_29(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0c31640ab24c8b1e(arg0, arg1, addHeapObject(arg2));
  }
  function handleError(f, args) {
    try {
      return f.apply(this, args);
    } catch (e) {
      wasm.__wbindgen_exn_store(addHeapObject(e));
    }
  }
  function notDefined(what) {
    return () => {
      throw new Error(`${what} is not defined`);
    };
  }
  function __wbg_adapter_60(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__hc7a0caf85c95e028(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
  }
  function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
      throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
  }
  function app(js_request) {
    _assertClass(js_request, JsRequest);
    var ptr0 = js_request.ptr;
    js_request.ptr = 0;
    var ret = wasm.app(ptr0);
    return takeObject(ret);
  }
  var PolishConfig = Object.freeze({ Off: 0, "0": "Off", Lossy: 1, "1": "Lossy", Lossless: 2, "2": "Lossless" });
  var RequestRedirect = Object.freeze({ Error: 0, "0": "Error", Follow: 1, "1": "Follow", Manual: 2, "2": "Manual" });
  var JsRequest = class {
    static __wrap(ptr) {
      const obj = Object.create(JsRequest.prototype);
      obj.ptr = ptr;
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.ptr;
      this.ptr = 0;
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_jsrequest_free(ptr);
    }
    constructor(uri, method) {
      var ptr0 = passStringToWasm0(uri, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      var ptr1 = passStringToWasm0(method, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      var ret = wasm.jsrequest_new(ptr0, len0, ptr1, len1);
      return JsRequest.__wrap(ret);
    }
    get uri() {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.jsrequest_uri(retptr, this.ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
      }
    }
    get method() {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.jsrequest_method(retptr, this.ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
      }
    }
    get body() {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.jsrequest_body(retptr, this.ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
      }
    }
    get headers() {
      var ret = wasm.jsrequest_headers(this.ptr);
      return takeObject(ret);
    }
    headers_append(key, value) {
      var ptr0 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      var ptr1 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      wasm.jsrequest_headers_append(this.ptr, ptr0, len0, ptr1, len1);
    }
  };
  var JsResponse = class {
    static __wrap(ptr) {
      const obj = Object.create(JsResponse.prototype);
      obj.ptr = ptr;
      return obj;
    }
    __destroy_into_raw() {
      const ptr = this.ptr;
      this.ptr = 0;
      return ptr;
    }
    free() {
      const ptr = this.__destroy_into_raw();
      wasm.__wbg_jsresponse_free(ptr);
    }
    constructor() {
      var ret = wasm.jsresponse_new();
      return JsResponse.__wrap(ret);
    }
    get status_code() {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.jsresponse_status_code(retptr, this.ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
      }
    }
    get body() {
      try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.jsresponse_body(retptr, this.ptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        let v0;
        if (r0 !== 0) {
          v0 = getStringFromWasm0(r0, r1).slice();
          wasm.__wbindgen_free(r0, r1 * 1);
        }
        return v0;
      } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
      }
    }
    get headers() {
      var ret = wasm.jsresponse_headers(this.ptr);
      return takeObject(ret);
    }
  };
  async function load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === "function") {
        try {
          return await WebAssembly.instantiateStreaming(module, imports);
        } catch (e) {
          if (module.headers.get("Content-Type") != "application/wasm") {
            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
          } else {
            throw e;
          }
        }
      }
      const bytes = await module.arrayBuffer();
      return await WebAssembly.instantiate(bytes, imports);
    } else {
      const instance = await WebAssembly.instantiate(module, imports);
      if (instance instanceof WebAssembly.Instance) {
        return { instance, module };
      } else {
        return instance;
      }
    }
  }
  async function init(input) {
    if (typeof input === "undefined") {
      input = new URL("notes_demo_spa_bg.wasm", import_meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
      takeObject(arg0);
    };
    imports.wbg.__wbg_jsresponse_new = function(arg0) {
      var ret = JsResponse.__wrap(arg0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_clearTimeout_d8b36ad8fa330187 = typeof clearTimeout == "function" ? clearTimeout : notDefined("clearTimeout");
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
      const obj = takeObject(arg0).original;
      if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
      }
      var ret = false;
      return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
      var ret = getObject(arg0) === void 0;
      return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
      const obj = getObject(arg1);
      var ret = typeof obj === "string" ? obj : void 0;
      var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
      var ret = getObject(arg0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_Window_424f0a27f77b8fdd = function(arg0) {
      var ret = getObject(arg0).Window;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_WorkerGlobalScope_212ebfcc0586c20e = function(arg0) {
      var ret = getObject(arg0).WorkerGlobalScope;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_fetch_427498e0ccea81f4 = function(arg0, arg1) {
      var ret = getObject(arg0).fetch(getObject(arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_fetch_fe54824ee845f6b4 = function(arg0, arg1) {
      var ret = getObject(arg0).fetch(getObject(arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Response_ea36d565358a42f7 = function(arg0) {
      var ret = getObject(arg0) instanceof Response;
      return ret;
    };
    imports.wbg.__wbg_arrayBuffer_0e2a43f68a8b3e49 = function() {
      return handleError(function(arg0) {
        var ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_649f53c967aec9b3 = function(arg0) {
      var ret = getObject(arg0) instanceof ArrayBuffer;
      return ret;
    };
    imports.wbg.__wbg_new_e3b800e570795b3c = function(arg0) {
      var ret = new Uint8Array(getObject(arg0));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_30803400a8f15c59 = function(arg0) {
      var ret = getObject(arg0).length;
      return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
      var ret = wasm.memory;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_5e74a88a1424a2e0 = function(arg0) {
      var ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_5b8081e9d002f0df = function(arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_new_d3138911a89329b0 = function() {
      var ret = new Object();
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
      var ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_278ec7532799393a = function(arg0, arg1, arg2) {
      var ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithstrandinit_c07f0662ece15bc6 = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_headers_1a60dec7fbd28a3b = function(arg0) {
      var ret = getObject(arg0).headers;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_f9448486a94c9aef = function() {
      return handleError(function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
      }, arguments);
    };
    imports.wbg.__wbg_setTimeout_290c28f3580809b6 = function() {
      return handleError(function(arg0, arg1) {
        var ret = setTimeout(getObject(arg0), arg1);
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_status_3a55bb50e744b834 = function(arg0) {
      var ret = getObject(arg0).status;
      return ret;
    };
    imports.wbg.__wbg_headers_e4204c6775f7b3b4 = function(arg0) {
      var ret = getObject(arg0).headers;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_4b9cedbeda0c0e30 = function() {
      var ret = Symbol.iterator;
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
      var ret = typeof getObject(arg0) === "function";
      return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
      const val = getObject(arg0);
      var ret = typeof val === "object" && val !== null;
      return ret;
    };
    imports.wbg.__wbg_next_c7a2a6b012059a5e = function(arg0) {
      var ret = getObject(arg0).next;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_done_982b1c7ac0cbc69d = function(arg0) {
      var ret = getObject(arg0).done;
      return ret;
    };
    imports.wbg.__wbg_value_2def2d1fb38b02cd = function(arg0) {
      var ret = getObject(arg0).value;
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_values_71935f80778b5113 = function(arg0) {
      var ret = getObject(arg0).values();
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_dd1a890d37e38d73 = function() {
      return handleError(function(arg0) {
        var ret = getObject(arg0).next();
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_call_89558c3e96703ca1 = function() {
      return handleError(function(arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_self_e23d74ae45fb17d1 = function() {
      return handleError(function() {
        var ret = self.self;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_window_b4be7f48b24ac56e = function() {
      return handleError(function() {
        var ret = window.window;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_globalThis_d61b1f48a57191ae = function() {
      return handleError(function() {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_global_e7669da72fd7f239 = function() {
      return handleError(function() {
        var ret = global.global;
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_newnoargs_f579424187aa1717 = function(arg0, arg1) {
      var ret = new Function(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_94697a95cb7e239c = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_get_8bbb82393651dd9c = function() {
      return handleError(function(arg0, arg1) {
        var ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    };
    imports.wbg.__wbg_set_c42875065132a932 = function() {
      return handleError(function(arg0, arg1, arg2) {
        var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
      }, arguments);
    };
    imports.wbg.__wbg_new_4beacc9c71572250 = function(arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg02, arg12) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wbg_adapter_60(a, state0.b, arg02, arg12);
          } finally {
            state0.a = a;
          }
        };
        var ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = state0.b = 0;
      }
    };
    imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
      var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
      var ret = debugString(getObject(arg1));
      var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len0 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len0;
      getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_then_58a04e42527f52c6 = function(arg0, arg1, arg2) {
      var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_a6860c82b90816ca = function(arg0, arg1) {
      var ret = getObject(arg0).then(getObject(arg1));
      return addHeapObject(ret);
    };
    imports.wbg.__wbg_resolve_4f8f547f26b30b27 = function(arg0) {
      var ret = Promise.resolve(getObject(arg0));
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper404 = function(arg0, arg1, arg2) {
      var ret = makeMutClosure(arg0, arg1, 17, __wbg_adapter_26);
      return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper2623 = function(arg0, arg1, arg2) {
      var ret = makeMutClosure(arg0, arg1, 76, __wbg_adapter_29);
      return addHeapObject(ret);
    };
    if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
      input = fetch(input);
    }
    const { instance, module } = await load(await input, imports);
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    return wasm;
  }
  var notes_demo_spa_default = init;

  // node_modules/@rora/javascript-adapter/dist/index.js
  var z = 11;
  function ue(e, a) {
    var t = a.attributes, n, r, s, l, A;
    if (!(a.nodeType === z || e.nodeType === z)) {
      for (var S = t.length - 1; S >= 0; S--)
        n = t[S], r = n.name, s = n.namespaceURI, l = n.value, s ? (r = n.localName || r, A = e.getAttributeNS(s, r), A !== l && (n.prefix === "xmlns" && (r = n.name), e.setAttributeNS(s, r, l))) : (A = e.getAttribute(r), A !== l && e.setAttribute(r, l));
      for (var x = e.attributes, w = x.length - 1; w >= 0; w--)
        n = x[w], r = n.name, s = n.namespaceURI, s ? (r = n.localName || r, a.hasAttributeNS(s, r) || e.removeAttributeNS(s, r)) : a.hasAttribute(r) || e.removeAttribute(r);
    }
  }
  var _;
  var fe = "http://www.w3.org/1999/xhtml";
  var o = typeof document > "u" ? void 0 : document;
  var se = !!o && "content" in o.createElement("template");
  var le = !!o && o.createRange && "createContextualFragment" in o.createRange();
  function ce(e) {
    var a = o.createElement("template");
    return a.innerHTML = e, a.content.childNodes[0];
  }
  function oe(e) {
    _ || (_ = o.createRange(), _.selectNode(o.body));
    var a = _.createContextualFragment(e);
    return a.childNodes[0];
  }
  function ve(e) {
    var a = o.createElement("body");
    return a.innerHTML = e, a.childNodes[0];
  }
  function pe(e) {
    return e = e.trim(), se ? ce(e) : le ? oe(e) : ve(e);
  }
  function B(e, a) {
    var t = e.nodeName, n = a.nodeName, r, s;
    return t === n ? true : (r = t.charCodeAt(0), s = n.charCodeAt(0), r <= 90 && s >= 97 ? t === n.toUpperCase() : s <= 90 && r >= 97 ? n === t.toUpperCase() : false);
  }
  function he(e, a) {
    return !a || a === fe ? o.createElement(e) : o.createElementNS(a, e);
  }
  function ge(e, a) {
    for (var t = e.firstChild; t; ) {
      var n = t.nextSibling;
      a.appendChild(t), t = n;
    }
    return a;
  }
  function j(e, a, t) {
    e[t] !== a[t] && (e[t] = a[t], e[t] ? e.setAttribute(t, "") : e.removeAttribute(t));
  }
  var J = { OPTION: function(e, a) {
    var t = e.parentNode;
    if (t) {
      var n = t.nodeName.toUpperCase();
      n === "OPTGROUP" && (t = t.parentNode, n = t && t.nodeName.toUpperCase()), n === "SELECT" && !t.hasAttribute("multiple") && (e.hasAttribute("selected") && !a.selected && (e.setAttribute("selected", "selected"), e.removeAttribute("selected")), t.selectedIndex = -1);
    }
    j(e, a, "selected");
  }, INPUT: function(e, a) {
    j(e, a, "checked"), j(e, a, "disabled"), e.value !== a.value && (e.value = a.value), a.hasAttribute("value") || e.removeAttribute("value");
  }, TEXTAREA: function(e, a) {
    var t = a.value;
    e.value !== t && (e.value = t);
    var n = e.firstChild;
    if (n) {
      var r = n.nodeValue;
      if (r == t || !t && r == e.placeholder)
        return;
      n.nodeValue = t;
    }
  }, SELECT: function(e, a) {
    if (!a.hasAttribute("multiple")) {
      for (var t = -1, n = 0, r = e.firstChild, s, l; r; )
        if (l = r.nodeName && r.nodeName.toUpperCase(), l === "OPTGROUP")
          s = r, r = s.firstChild;
        else {
          if (l === "OPTION") {
            if (r.hasAttribute("selected")) {
              t = n;
              break;
            }
            n++;
          }
          r = r.nextSibling, !r && s && (r = s.nextSibling, s = null);
        }
      e.selectedIndex = t;
    }
  } };
  var y = 1;
  var Te = 11;
  var W = 3;
  var $ = 8;
  function T() {
  }
  function Ae(e) {
    if (e)
      return e.getAttribute && e.getAttribute("id") || e.id;
  }
  function me(e) {
    return function(t, n, r) {
      if (r || (r = {}), typeof n == "string")
        if (t.nodeName === "#document" || t.nodeName === "HTML" || t.nodeName === "BODY") {
          var s = n;
          n = o.createElement("html"), n.innerHTML = s;
        } else
          n = pe(n);
      var l = r.getNodeKey || Ae, A = r.onBeforeNodeAdded || T, S = r.onNodeAdded || T, x = r.onBeforeElUpdated || T, w = r.onElUpdated || T, ae = r.onBeforeNodeDiscarded || T, U = r.onNodeDiscarded || T, ne = r.onBeforeElChildrenUpdated || T, M = r.childrenOnly === true, m = /* @__PURE__ */ Object.create(null), O = [];
      function D(u) {
        O.push(u);
      }
      function k(u, d) {
        if (u.nodeType === y)
          for (var i = u.firstChild; i; ) {
            var f = void 0;
            d && (f = l(i)) ? D(f) : (U(i), i.firstChild && k(i, d)), i = i.nextSibling;
          }
      }
      function P(u, d, i) {
        ae(u) !== false && (d && d.removeChild(u), U(u), k(u, i));
      }
      function F(u) {
        if (u.nodeType === y || u.nodeType === Te)
          for (var d = u.firstChild; d; ) {
            var i = l(d);
            i && (m[i] = d), F(d), d = d.nextSibling;
          }
      }
      F(t);
      function H(u) {
        S(u);
        for (var d = u.firstChild; d; ) {
          var i = d.nextSibling, f = l(d);
          if (f) {
            var v = m[f];
            v && B(d, v) ? (d.parentNode.replaceChild(v, d), C(v, d)) : H(d);
          } else
            H(d);
          d = i;
        }
      }
      function re(u, d, i) {
        for (; d; ) {
          var f = d.nextSibling;
          (i = l(d)) ? D(i) : P(d, u, true), d = f;
        }
      }
      function C(u, d, i) {
        var f = l(d);
        f && delete m[f], !(!i && (x(u, d) === false || (e(u, d), w(u), ne(u, d) === false))) && (u.nodeName !== "TEXTAREA" ? ie(u, d) : J.TEXTAREA(u, d));
      }
      function ie(u, d) {
        var i = d.firstChild, f = u.firstChild, v, p, b, E, h;
        e:
          for (; i; ) {
            for (E = i.nextSibling, v = l(i); f; ) {
              if (b = f.nextSibling, i.isSameNode && i.isSameNode(f)) {
                i = E, f = b;
                continue e;
              }
              p = l(f);
              var V = f.nodeType, g = void 0;
              if (V === i.nodeType && (V === y ? (v ? v !== p && ((h = m[v]) ? b === h ? g = false : (u.insertBefore(h, f), p ? D(p) : P(f, u, true), f = h) : g = false) : p && (g = false), g = g !== false && B(f, i), g && C(f, i)) : (V === W || V == $) && (g = true, f.nodeValue !== i.nodeValue && (f.nodeValue = i.nodeValue))), g) {
                i = E, f = b;
                continue e;
              }
              p ? D(p) : P(f, u, true), f = b;
            }
            if (v && (h = m[v]) && B(h, i))
              u.appendChild(h), C(h, i);
            else {
              var q = A(i);
              q !== false && (q && (i = q), i.actualize && (i = i.actualize(u.ownerDocument || o)), u.appendChild(i), H(i));
            }
            i = E, f = b;
          }
        re(u, f, p);
        var X = J[u.nodeName];
        X && X(u, d);
      }
      var c = t, L = c.nodeType, K = n.nodeType;
      if (!M) {
        if (L === y)
          K === y ? B(t, n) || (U(t), c = ge(t, he(n.nodeName, n.namespaceURI))) : c = n;
        else if (L === W || L === $) {
          if (K === L)
            return c.nodeValue !== n.nodeValue && (c.nodeValue = n.nodeValue), c;
          c = n;
        }
      }
      if (c === n)
        U(t);
      else {
        if (n.isSameNode && n.isSameNode(c))
          return;
        if (C(c, n, M), O)
          for (var G = 0, de = O.length; G < de; G++) {
            var I = m[O[G]];
            I && P(I, I.parentNode, false);
          }
      }
      return !M && c !== t && t.parentNode && (c.actualize && (c = c.actualize(t.ownerDocument || o)), t.parentNode.replaceChild(c, t)), c;
    };
  }
  var be = me(ue);
  var Y = be;
  function Q(e, a) {
    if (e.nodeName === "SCRIPT" && a.nodeName === "SCRIPT") {
      let t = document.createElement("script");
      return [...a.attributes].forEach((n) => {
        t.setAttribute(n.nodeName, n.nodeValue);
      }), t.text = a.text, e.replaceWith(t), false;
    }
    return true;
  }
  function Z(e) {
    if (e.nodeName === "SCRIPT") {
      var a = document.createElement("script");
      [...e.attributes].forEach((t) => {
        a.setAttribute(t.nodeName, t.nodeValue);
      }), a.text = e.text, e.replaceWith(a);
    }
  }
  var te;
  var N;
  var Ne;
  var ee;
  function Ce(e) {
    return te = e.app, N = e.JsRequest, Ne = e.JsResponse, { pageLoaded: Re, start: xe };
  }
  async function R(e) {
    let a = await te(e);
    if (a.status_code === "302") {
      let t = `${window.location.origin}${a.headers.location}`;
      return R(new N(t, "GET"));
    }
    Y(document.documentElement, a.body, { onBeforeElUpdated: Q, onNodeAdded: Z });
  }
  async function Se(e) {
    let a = e.target.href, t = window.location.origin;
    if (e.target.tagName === "A" && a.startsWith(t)) {
      e.preventDefault();
      let n = a.replace(t, "");
      history.pushState(void 0, void 0, n), await R(new N(a, "GET"));
    }
    e.target.tagName === "BUTTON" && e.target.type === "submit" || e.preventDefault();
  }
  function we(e) {
    let a = new FormData(e.target), t = new URLSearchParams(a).toString(), n = e.target.action, r = e.target.method, s = new N(n, r);
    s.body = t, s.headers_append("Content-Type", e.target.encoding), R(s), e.preventDefault();
  }
  function ye() {
    let e = new N(window.location.href, "GET");
    R(e);
  }
  function Re() {
    ee || (document.addEventListener("click", Se), window.addEventListener("popstate", ye), ee = true), document.querySelectorAll("form").forEach((e) => e.addEventListener("submit", we));
  }
  async function xe() {
    let e = new N(window.location.href, "GET");
    await R(e);
  }

  // src/index.js
  (async () => {
    const url = new URL("dist/wasm/notes_demo_spa_bg.wasm", window.location.href);
    await notes_demo_spa_default(url);
    window.roraAdapter = Ce({
      app,
      JsRequest,
      JsResponse
    });
    await window.roraAdapter.start();
  })();
})();
