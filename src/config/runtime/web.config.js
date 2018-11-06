const webConfig = {
  servicePort: 8080,
  productionDomain: 'www.example.com',
  developmentDomain: 'localhost:8080',
  sessionKey: 'QT4Cf4WlFKtWLP66OYyKza0JPl7osXyNRrfNRDDh8sed4db4rs1A9hrAdi6820wl',
  chatapi: {
    production: {
      server: 'chat.example.com',
      port: 80,
    },
    development: {
      server: 'localhost',
      port: 7007,
    },
  },
  authapi: {
    production: {
      server: 'auth.example.com',
      port: 80,
    },
    development: {
      server: 'localhost',
      port: 7979,
    },
  },
};
module.exports = webConfig;
