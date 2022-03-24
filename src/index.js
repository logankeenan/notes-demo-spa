import init, {app, JsRequest, JsResponse} from '../dist/wasm/notes_demo_spa.js'
import * as jsAdapter from "@rora/javascript-adapter"

(async () => {
    const url = new URL('/dist/wasm/notes_demo_spa_bg.wasm', window.location.href);
    await init(url);

    window.roraAdapter = jsAdapter.create({
        app,
        JsRequest,
        JsResponse
    });
    await window.roraAdapter.start();
})();