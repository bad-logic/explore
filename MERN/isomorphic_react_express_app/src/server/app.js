import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("success");
});

app.listen(3000, () => {
  console.log("app started at port 3000");
});
