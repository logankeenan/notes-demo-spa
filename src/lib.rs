use notes_demo::AppState;
use tide::http::{Request as TideRequest, Response as TideResponse};
use wasm_bindgen::prelude::*;
pub use rora_javascript_adapter::{JsRequest, JsResponse};
use tide::{Body, Middleware, Next, Request, Response};
use rora_tide_adapter::javascript;

#[macro_use]
extern crate dotenv_codegen;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

pub struct HtmlInjection {
    content: &'static str,
}

#[tide::utils::async_trait]
impl<State: Clone + Send + Sync + 'static> Middleware<State> for HtmlInjection {
    async fn handle(&self, request: Request<State>, next: Next<'_, State>) -> tide::Result {
        let mut response: Response = next.run(request).await;
        let body_string = response.take_body().into_string().await?;
        let body_string = body_string.replace(
            "<!--html-injection-middleware-->",
            self.content,
        );
        response.set_body(Body::from_string(body_string));
        Ok(response)
    }
}

const HTML_INJECTION: &str = r#"
<script type="module">
    import {initialize as javaScriptAdapterInitialize} from "@rora/javascript-adapter"
    import {onAnchorClicked, onFormSubmission, onPopState} from "/src/browser-event-handlers.js";

    javaScriptAdapterInitialize({
            onAnchorClicked,
            onFormSubmission,
            onPopState
        });
</script>
"#;


#[wasm_bindgen]
pub async fn app(js_request: JsRequest) -> JsResponse {
    let mut app_state = AppState::new();
    app_state.environment.insert(String::from("API_ORIGIN"), dotenv!("API_ORIGIN").to_string());
    let mut app = notes_demo::create(app_state);
    app.with(HtmlInjection { content: HTML_INJECTION });

    let request: TideRequest = javascript::to_tide_request(js_request);
    let _tide_response: TideResponse = app.respond(request).await.unwrap();

    javascript::to_response(_tide_response).await
}
