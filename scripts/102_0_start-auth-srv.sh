#!/bin/sh
export NODE_ENV=development
rm -rf dist-dev/auth/*
mkdir -p dist-dev/auth
mkdir -p dist-dev/config

cp src/auth/server.js dist-dev/auth/
cp -r src/auth/routes dist-dev/auth/routes
cp -r src/auth/helpers dist-dev/auth/helpers
cp -r src/auth/models dist-dev/auth/models

cp -r src/config/runtime dist-dev/config/
cp -r src/libs dist-dev/

webpack --config src/config/buildtime/webpack/auth/webpack.development.config.js
nodemon src/auth/server.js -w src/auth/