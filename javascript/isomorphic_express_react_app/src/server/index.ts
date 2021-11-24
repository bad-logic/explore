import express from "express";
import { serverSideRendering } from "./middlewares/ssr";

const app = express();

app.get("/*", serverSideRendering);

app.get("/success", (req, res) => {
  res.send("success");
});

app.listen(3000, () => {
  console.log("app started at port 3000");
});
