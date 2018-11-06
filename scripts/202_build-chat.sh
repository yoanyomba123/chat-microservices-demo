#!/bin/sh
rm -rf dist/chat/*
mkdir -p dist/chat
mkdir -p dist/config

cp -r src/chat/* dist/chat/
cp -r src/config/runtime dist/config/
cp -r src/libs dist/

echo -e "\033[0;32m-- CHAT BUILDED --\033[0m"