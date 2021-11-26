const spawn = require('cross-spawn');
const path = require('path');
const webpack = require('webpack');
const webpackConfigClient = require('../config/webpack.config.client');
const webpackConfigServer = require('../config/webpack.config.server');

const injectVariables = new webpack.DefinePlugin({
  process: {
    env: {
      NODE_ENV: JSON.stringify('production'),
      BROWSER: JSON.stringify('true'),
      SERVER: JSON.stringify('false'),
    },
  },
});

const compiler = webpack([
  {
    ...webpackConfigClient,
    plugins: [...webpackConfigClient.plugins, injectVariables],
  },
  {
    ...webpackConfigServer,
  },
]);

process.on('unhandledRejection', (err) => {
  throw err;
});

compiler.run((err, stats) => {
  if (err) {
    console.log({ err });
    process.exit(1);
  }
  console.log(stats?.toString('minimal'));
  const isCompiledSuccessfully = !stats?.hasErrors();
  if (isCompiledSuccessfully) {
    spawn(
      'NODE_ENV=production SERVER=TRUE node',
      [path.join(__dirname, '..', 'dist/server/index.js')],
      {
        stdio: 'inherit',
      }
    );
  }
});
