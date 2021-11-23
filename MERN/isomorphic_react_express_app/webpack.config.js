import path from "path";
const __dirname = path.resolve();
const configs = {
  mode: "development",
  entry: __dirname + "/src/client/index.jsx",
  output: {
    path: path.resolve(__dirname + "/src/dist/"),
    filename: "browser.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(jsx|es6)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".es6"],
  },
};

export default configs;
