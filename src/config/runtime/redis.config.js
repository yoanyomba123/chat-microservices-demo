const redisConfig = {
  production: {
    server: 'redis',
    port: 6379,
  },
  development: {
    server: 'localhost',
    port: 36379,
  },
};

module.exports = redisConfig;
