import express from "express";
import { serverSideRendering } from "./middlewares/ssr";

const app = express();

app.get("/api", (req, res) => {
  res.send("apis here");
});

app.get("/*", serverSideRendering);

app.listen(3000, () => {
  console.log("app started at port 3000");
});
