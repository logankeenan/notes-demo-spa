import {default as wasmbin} from '../wasm-out/notes_demo_spa_bg.wasm';
import init, {app, JsRequest, JsResponse} from '../wasm-out/notes_demo_spa';
import * as jsAdapter from "@rora/javascript-adapter"

(async () => {
    await init(wasmbin);

    window.roraAdapter = jsAdapter.create({
        app,
        JsRequest,
        JsResponse
    });
    await window.roraAdapter.start();
})();