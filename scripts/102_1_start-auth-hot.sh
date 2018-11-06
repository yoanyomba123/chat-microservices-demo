#!/bin/sh
export NODE_ENV=development
webpack-dev-server --config src/config/buildtime/webpack/auth/webpack.development.config.js --hot
