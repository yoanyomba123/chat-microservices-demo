const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
const sass = require('sass'); // eslint-disable-line

const rootDir = path.join(__dirname, '../../../../../');
const srcDir = path.join(rootDir, 'src/auth/view');
const libDir = path.join(rootDir, 'src/libs/react');

const mergeConfig = additionalConfigs => ({
  ...additionalConfigs,
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [srcDir, libDir],
        exclude: [/node_modules/, /server.js/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${srcDir}/public/index.html`,
      favicon: `${srcDir}/public/favicon.ico`,
    }),
  ],
});

module.exports = mergeConfig;
