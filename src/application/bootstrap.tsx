import React from "react";
import ReactDOM from "react-dom";
import AppModule from "./modules/app/app.module";

export class Bootstrap {
  static init() {
    ReactDOM.render(
      <React.StrictMode>
        <AppModule />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
}
