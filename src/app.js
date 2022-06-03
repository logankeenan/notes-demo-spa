import morphdom from "morphdom";
import {onBeforeElUpdated, onNodeAdded} from "./morphdom-options.js";
import {app, JsRequest} from "../dist/wasm/notes_demo_spa.js";

export async function makeRequest(jsRequest) {
    const userId = localStorage.getItem("user-id");
    if (userId) {
        jsRequest.headers_append("user-id", userId);
    }

    const jsResponse = await app(jsRequest);
    const newUserId = jsResponse.headers["user-id"];
    if (newUserId) {
        localStorage.setItem("user-id", newUserId)
    }

    if (jsResponse.status_code === "302") {
        const url = `${window.location.origin}${jsResponse.headers["location"]}`;
        return makeRequest(new JsRequest(url, "GET"));
    }
    morphdom(document.documentElement, jsResponse.body, {
        onBeforeElUpdated,
        onNodeAdded
    });
}