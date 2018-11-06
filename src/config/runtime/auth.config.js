// Critical data should be read from env ;)
const authConfig = {
  servicePort: 7979,
  cookieDomain: process.env.NODE_ENV === 'production' ? '.example.com' : 'localhost',
  mongodb: {
    production: {
      server: 'mongosrv',
      port: 27017,
      user: 'higuita',
      pass: 'scorpionKick',
      db: 'authms',
    },
    development: {
      server: 'localhost',
      port: 37017,
      user: 'higuita',
      pass: 'scorpionKick',
      db: 'authms',
    },
  },
  authKey: 'RDOWfbWbI5qr9HBV6XN47l7S6mCL1Sxj8ILNRtiAS6OX9vOQy0ryVVTo2cSuhfoS',
  sessionKey: 'QT4Cf4WlFKtWLP66OYyKza0JPl7osXyNRrfNRDDh8sed4db4rs1A9hrAdi6820wl',
};
module.exports = authConfig;
