
import {makeRequest} from "./app.js";
import {JsRequest} from "../dist/wasm/notes_demo_spa.js";

export async function onPopState() {
    const jsRequest = new JsRequest(window.location.href, "GET");
    await makeRequest(jsRequest);
}

export async function onAnchorClicked(href) {
    const jsRequest = new JsRequest(href, 'GET');

    await makeRequest(jsRequest);
}

export async function onFormSubmission(url, method, bodyData = undefined, encoding) {
    const jsRequest = new JsRequest(url, method);
    if (bodyData) {
        jsRequest.body = bodyData;
    }

    jsRequest.headers_append("Content-Type", encoding);
    await makeRequest(jsRequest)
}