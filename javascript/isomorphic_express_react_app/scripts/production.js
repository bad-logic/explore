const spawn = require("cross-spawn");
const path = require("path");
const webpack = require("webpack");
const webpackConfigClient = require("../config/webpack.config.client");
const webpackConfigServer = require("../config/webpack.config.server");

const compiler = webpack([
  {
    ...webpackConfigClient,
  },
  {
    ...webpackConfigServer,
  },
]);

process.on("unhandledRejection", (err) => {
  throw err;
});

compiler.run((err, stats) => {
  if (err) {
    console.log({ err });
    process.exit(1);
  }
  console.log(stats?.toString("minimal"));
  const isCompiledSuccessfully = !stats?.hasErrors();
  if (isCompiledSuccessfully) {
    spawn("node", [path.join(__dirname, "..", "dist/server/index.js")], {
      stdio: "inherit",
    });
  }
});
