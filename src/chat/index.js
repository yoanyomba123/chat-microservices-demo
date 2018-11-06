const os = require('os');
const http = require('http');
const express = require('express');
const chatConfig = require('../config/runtime/chat.config');
const redisClient = require('../libs/node/redis-client');
const socketHandler = require('./socket');

const IS_REDIS_ABSOLUTELY_REQUIRED = true;

const app = express();
const server = http.Server(app);

redisClient.connect(
  IS_REDIS_ABSOLUTELY_REQUIRED,
  (client) => {
    socketHandler(server, client);
    server.listen(chatConfig.servicePort, () => {
      console.log(`Host: ${os.hostname()} Listening on *:${chatConfig.servicePort}`); // eslint-disable-line no-console
    });
  },
);

process.on('SIGTERM', () => {
  console.log('Got SIGTERM, shutting down server'); // eslint-disable-line no-console
  process.exit(0);
});
