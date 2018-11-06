const path = require('path');
const mergeConfig = require('./webpack.base');

const rootDir = path.join(__dirname, '../../../../../');
const buildDir = path.join(rootDir, 'dist-dev/auth/public');
const srcDir = path.join(rootDir, 'src/auth/view');
const entryFile = path.join(srcDir, 'index.jsx');

const devConfig = {
  mode: 'development',
  entry: ['@babel/polyfill', entryFile],
  output: {
    path: buildDir,
    publicPath: '/assets',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    port: 3079,
    open: true,
    proxy: {
      '/': 'http://localhost:7979',
    },
    historyApiFallback: true,
  },
};

const config = mergeConfig(devConfig);

module.exports = config;
