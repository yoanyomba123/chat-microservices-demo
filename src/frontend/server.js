const path = require('path');
const express = require('express');
const commonServer = require('../libs/node/common-server');
const webConfig = require('../config/runtime/web.config');

const authService = process.env.NODE_ENV === 'production'
  ? webConfig.authapi.production
  : webConfig.authapi.development;
const callbackUrl = process.env.NODE_ENV === 'production' ? webConfig.productionDomain : webConfig.developmentDomain;
const app = express();
commonServer.initialize(app);
commonServer.enableSession(app, webConfig.sessionKey);

if (process.env.NODE_ENV === 'production') {
  app.use('/assets', express.static(path.join(__dirname, './public')));
}
if (process.env.NODE_ENV === 'development') {
  app.use('/assets', express.static(path.join(__dirname, '../../dist-dev/frontend/public')));
}

// Catch all
app.get('/', (req, res) => {
  if (!req.cookies.auth) {
    return res.redirect(`//${authService.server}:${authService.port}?ref=//${callbackUrl}`);
  }
  if (process.env.NODE_ENV === 'development') {
    return res.sendFile(path.join(__dirname, '../../dist-dev/frontend/public/index.html'));
  }
  return res.sendFile(path.join(__dirname, './public/index.html'));
});

commonServer.start(app, webConfig.servicePort);

process.on('SIGTERM', () => {
  console.log('Got SIGTERM, shutting down server'); // eslint-disable-line no-console
  process.exit(0);
});
