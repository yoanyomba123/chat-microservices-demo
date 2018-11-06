#!/bin/sh
export NODE_ENV=development
nodemon --inspect src/chat/index.js --exec babel-node