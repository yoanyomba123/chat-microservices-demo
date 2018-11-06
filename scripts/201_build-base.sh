#!/bin/sh
rm -rf dist/
mkdir -p dist/config/runtime
mkdir -p dist/libs
mkdir dist/chat
mkdir dist/frontend
mkdir dist/auth
cp package*.json dist/
cp .babelrc dist/
docker build -f deploy/docker/03_base_server.Dockerfile -t tahc/base:1.0.5 dist/
echo -e "\033[0;32m-- BASE IMAGE BUILDED --\033[0m"
