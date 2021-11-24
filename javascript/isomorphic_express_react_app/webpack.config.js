const path = require("path");
module.exports = {
  mode: "development",
  entry: "/src/client.entry.ts",
  devtool: "source-map",
  output: {
    filename: "browser.bundle.js",
    path: path.resolve(__dirname, "dist/client"),
  },
  module: {
    rules: [
      {
        test: /\.(tsx|es6)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".es6", ".css"],
  },
};
