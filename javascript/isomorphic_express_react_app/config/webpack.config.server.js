const nodeExternals = require('webpack-node-externals');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  name: 'server',
  entry: {
    server: path.resolve(__dirname, '..', 'src', 'server', 'index.ts'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', 'dist/server'),
    filename: 'index.js',
  },
  externals: [nodeExternals()], // skip bundling files from the node_modules directory and instead import them at runtime because certain Node.js dependencies can't be bundled.
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader', // to compile ts files
        options: {
          configFile: 'tsconfig.server.json',
        },
      },
    ],
  },
  target: 'node',
  node: {
    __dirname: false, // setting node.__dirname to false keeps the special __dirname path variable working as expected after the bundling
  },
  plugins: [new CleanWebpackPlugin()],
};
