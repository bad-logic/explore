const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  name: 'client',
  entry: {
    client: path.resolve(__dirname, '..', 'src', 'client', 'index.tsx'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'static'),
    filename: '[name].[contenthash].js', // name will be replaced with the key from the entry dictionary
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.client.json',
        },
      },
    ],
  },
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(), //  removes any obsolete build artifacts resulting from including the hash
    new WebpackManifestPlugin(), // generates a JSON file called manifest.json in the output directory from which we can gather the filename of the latest built bundle
  ],
};
