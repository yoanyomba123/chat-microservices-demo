#!/bin/sh
rm -rf dist/frontend/*
mkdir -p dist/frontend
cp src/frontend/server.js dist/frontend/
cp -r src/config/runtime dist/config/
cp -r src/libs dist/

webpack -p --config src/config/buildtime/webpack/frontend/webpack.production.config.js

echo -e "\033[0;32m-- FRONTEND BUILDED --\033[0m"
