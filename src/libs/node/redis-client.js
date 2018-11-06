const redis = require('redis');
const redisConfig = require('../../config/runtime/redis.config');

const { production, development } = redisConfig;
const redisServer = process.env.NODE_ENV === 'production' ? production.server : development.server;
const redisPort = process.env.NODE_ENV === 'production' ? production.port : development.port;

let isCriticalError = false;

const errorHandler = (isRequired, err) => {
  // Should be extend according programmatic error or not?
  switch (err.code) {
    case 'ECONNREFUSED':
      isCriticalError = true;
      break;
    default:
      isCriticalError = false;
      break;
  }
  console.error(err); // eslint-disable-line no-console

  // Grace shutdown if redis is absolutely required by caller
  if (isRequired && isCriticalError) {
    console.error('Critical error. Terminating...'); // eslint-disable-line no-console
    process.exit(5);
  }
};

const connect = (isRequired, cb) => {
  const client = redis.createClient({
    host: redisServer,
    port: redisPort,
  });

  client.on('error', (err) => {
    errorHandler(isRequired, err);
  });

  client.on('ready', () => {
    console.info('Redis is ready.'); // eslint-disable-line no-console
    if (typeof cb === 'function') {
      cb(client);
    }
  });
};

module.exports = { connect, redisServer, redisPort };
