use notes_demo::AppState;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub async fn app_request() {
    let mut app_state = AppState::new();
    app_state.environment.insert(String::from("API_ORIGIN"), String::from("https://rora-note-demo-api.herokuapp.com"));
    let app = notes_demo::create(app_state);
}