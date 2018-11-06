const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const commonServer = require('../libs/node/common-server');
const authConfig = require('../config/runtime/auth.config');
const defaultRouter = require('./routes');

if (!process.env.NODE_ENV) {
  console.log('NODE_ENV not defined! (production|development)'); // eslint-disable-line no-console
  process.exit(5);
}

const { production, development } = authConfig.mongodb;
const mongoConfig = process.env.NODE_ENV === 'production' ? production : development;
const app = express();
commonServer.initialize(app);
commonServer.enableSession(app, authConfig.sessionKey);
commonServer.enablePassport(app);

const assetPath = process.env.NODE_ENV === 'production' ? './public' : '../../dist-dev/auth/public';

app.use('/assets', express.static(path.join(__dirname, assetPath)));
app.use(defaultRouter);

mongoose
  .connect(
    `mongodb://${mongoConfig.user}:${mongoConfig.pass}@${mongoConfig.server}:${mongoConfig.port}/${
      mongoConfig.db
    }`,
    { useNewUrlParser: true },
  )
  .then(() => {
    mongoose.Promise = global.Promise;
    commonServer.start(app, authConfig.servicePort);
  })
  .catch((error) => {
    console.error(error); // eslint-disable-line no-console
    process.exit(5);
  });

process.on('SIGTERM', () => {
  console.log('Got SIGTERM, shutting down server'); // eslint-disable-line no-console
  process.exit(0);
});
