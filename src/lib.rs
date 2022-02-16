use std::str::FromStr;
use notes_demo::AppState;
use tide::http::{Method, Url, Request as TideRequest, Response as TideResponse};
use wasm_bindgen::prelude::*;
pub use javascript_adapter::{JsRequest, JsResponse};
use tide::{Body, Middleware, Next, Request, Response};

#[macro_use]
extern crate dotenv_codegen;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

pub async fn to_js_response(mut tide_response: TideResponse) -> JsResponse {
    let mut response = JsResponse::new();
    response.body = Some(tide_response.body_string().await.unwrap());
    response.set_status_code(tide_response.status().to_string());

    tide_response.header_names().for_each(|header_name| {
        let header_value = tide_response.header(header_name).unwrap();
        response.headers.insert(
            String::from(header_name.as_str()),
            String::from(header_value.as_str()),
        );
    });

    response
}

fn to_tide_request(js_request: JsRequest) -> TideRequest {
    let method = Method::from_str(js_request.method.to_string().as_str()).unwrap();
    let url = Url::from_str(js_request.uri.as_str()).unwrap();
    let mut tide_request: TideRequest = TideRequest::new(method, url);

    js_request.headers.into_iter().for_each(|(key, value)| {
        tide_request.insert_header(key.as_str(), value.as_str());
    });

    if js_request.body.is_some() {
        tide_request.set_body(js_request.body.unwrap());
    }

    tide_request
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
<script src="/dist/bundle.js"></script>
<script>
    (async () => {
        await window.rora.javascriptAdapter.initialize();
    })();
</script>
"#;


#[wasm_bindgen]
pub async fn app(js_request: JsRequest) -> JsResponse {
    let mut app_state = AppState::new();
    app_state.environment.insert(String::from("API_ORIGIN"), dotenv!("API_ORIGIN").to_string());
    let mut app = notes_demo::create(app_state);
    app.with(HtmlInjection { content: HTML_INJECTION });

    let request: TideRequest = to_tide_request(js_request);
    let _tide_response: TideResponse = app.respond(request).await.unwrap();

    to_js_response(_tide_response).await
}
