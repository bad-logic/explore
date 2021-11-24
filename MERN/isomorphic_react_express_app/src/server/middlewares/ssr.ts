import React from "react";
import ReactDOMServer from "react-dom/server";
import Server from "../../client/entrypoint.server";

export const serverSideRendering = (req: any, res: any, next: any) => {
  let html = ReactDOMServer.renderToString(
    React.createElement(Server, {
      location: req.url,
    })
  );
  console.log({ html, location: req.url });
  res.send("<!DOCTYPE html>" + html);
};
