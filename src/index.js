import { default as wasmbin }  from '../wasm-out/notes_demo_spa_bg.wasm';
import init, {app, JsRequest, JsResponse} from '../wasm-out/notes_demo_spa';
import * as jsAdapter from "@rora/javascript-adapter"

async function initialize() {
    await init(wasmbin);

    jsAdapter.initialize({
        app,
        JsRequest,
        JsResponse
    });
    jsAdapter.registerEvents();
}

window.rora = {};
window.rora.javascriptAdapter = {};
window.rora.javascriptAdapter.initialize = initialize;
window.rora.javascriptAdapter.pageLoad = jsAdapter.pageLoad;