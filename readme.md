1. `cargo build --target wasm32-unknown-unknown`
2. ` wasm-bindgen target/wasm32-unknown-unknown/debug/notes_demo_spa.wasm --out-dir ./out --target web`
3. Run [basic-http-server](https://crates.io/crates/basic-http-server) or similar and serve index.html file.