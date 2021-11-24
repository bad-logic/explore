import React from "react";
import ReactDOM from "react-dom";
import Client from "./entrypoint.client";

console.log("Browser packed file loaded");

// ReactDOM.render(<App />, document.getElementById("react-content"));

ReactDOM.hydrate(
  React.createElement(Client),
  document.getElementById("react-content")
);
