#!/bin/sh
rm -rf dist/auth/*
mkdir -p dist/auth
mkdir -p dist/config

cp src/auth/server.js dist/auth/
cp -r src/auth/routes dist/auth/routes
cp -r src/auth/helpers dist/auth/helpers
cp -r src/auth/models dist/auth/models

cp -r src/config/runtime dist/config/
cp -r src/libs dist/

webpack -p --config src/config/buildtime/webpack/auth/webpack.production.config.js

echo -e "\033[0;32m-- AUTHMS BUILDED --\033[0m"
