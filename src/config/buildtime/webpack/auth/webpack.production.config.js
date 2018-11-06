const path = require('path');
const mergeConfig = require('./webpack.base');

const rootDir = path.join(__dirname, '../../../../../');
const buildDir = path.join(rootDir, 'dist/auth/public');
const srcDir = path.join(rootDir, 'src/auth/view');
const entryFile = path.join(srcDir, 'index.jsx');

const prodConfig = {
  mode: 'production',
  entry: ['@babel/polyfill', entryFile],
  output: {
    path: buildDir,
    publicPath: '/assets',
    filename: 'bundle.js',
  },
  devtool: 'false',
};

const config = mergeConfig(prodConfig);

module.exports = config;
