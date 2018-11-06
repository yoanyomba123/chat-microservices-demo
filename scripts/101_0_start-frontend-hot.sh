#!/bin/sh
export NODE_ENV=development
webpack-dev-server --config src/config/buildtime/webpack/frontend/webpack.development.config.js --hot