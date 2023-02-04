# RORA - Notes Demo Single Page Application

This is a Rust server app written with ([tide](https://github.com/http-rs/tide)) _running_ in the browser. The core app
code lives in [notes-demo](https://github.com/rora-rs/notes-demo) and this repository contains the glue code needed to 
_run_ the app in the browser.

Try the [demo](https://notes-demo-spa.pages.dev/).


Local Development
* `rustup target add wasm32-unknown-unknown`
* `cargo install -f wasm-bindgen-cli@0.2.79`
* `cargo install basic-http-server`
* `cp .env.sample .env`
* fill out the details in the .env file
* `. ./scripts/debug.sh`
* `basic-http-server`
* visit `http://localhost:4000`