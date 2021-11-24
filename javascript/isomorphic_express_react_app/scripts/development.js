const spawn = require("cross-spawn");
const path = require("path");
const webpack = require("webpack");
const webpackConfigClient = require("../config/webpack.config.client");
const webpackConfigServer = require("../config/webpack.config.server");

const compiler = webpack([
  {
    ...webpackConfigClient,
    mode: "development",
    devtool: "source-map",
    output: {
      ...webpackConfigClient.output,
      filename: "[name].js",
    },
  },
  {
    ...webpackConfigServer,
    mode: "development",
    devtool: "source-map",
  },
]);

let node;

process.on("unhandledRejection", (err) => {
  throw err;
});

compiler.hooks.watchRun.tap("Dev", (compiler) => {
  console.log(`compiling ${compiler.name} ...`);
  if (node) {
    // if not throws address already used error
    node.kill();
    node = undefined;
  }
});

compiler.watch({}, (err, stats) => {
  if (err) {
    console.log({ err });
    process.exit(1);
  }
  console.log(stats?.toString("minimal"));
  const isCompiledSuccessfully = !stats?.hasErrors();
  if (isCompiledSuccessfully) {
    node = spawn(
      "node",
      ["--inspect", path.join(__dirname, "..", "dist/server.js")],
      { stdio: "inherit" }
    );
  } else {
    console.log("unable to compile", JSON.stringify(stats));
    process.exit(1);
  }
});
