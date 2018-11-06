#!/bin/sh
export NODE_ENV=development
rm -rf dist-dev/frontend/*
mkdir -p dist-dev/frontend
cp src/frontend/server.js dist-dev/frontend/
cp -r src/config/runtime dist-dev/config/
cp -r src/libs dist-dev/

webpack --config src/config/buildtime/webpack/frontend/webpack.development.config.js
nodemon src/frontend/server.js -w src/frontend/server.js