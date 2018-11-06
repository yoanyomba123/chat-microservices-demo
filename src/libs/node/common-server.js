// npm packages
const os = require('os');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { redisServer, redisPort } = require('./redis-client');

const initialize = (app) => {
  app.use(
    cors({
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true,
      maxAge: 3600,
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
};

const enableSession = (app, secretKey) => {
  app.use(cookieParser(secretKey));
  // @TODO Redis implementation
  app.use(
    session({
      name: 'sid',
      secret: secretKey,
      store: new RedisStore({ host: redisServer, port: redisPort }),
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 8 * 60 * 60 * 1000, // 8 hours
      },
    }),
  );
};

const enablePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

const start = (app, servicePort) => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error Handling middleware
  app.use((err, req, res) => {
    res
      .status(err.status || 500)
      .type('txt')
      .send(err.message || 'Internal Server Error');
  });

  // Run the server!
  app.listen(servicePort, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Host: ${os.hostname()} Listening on *:${servicePort}`); // eslint-disable-line no-console
  });
};

module.exports = {
  initialize,
  start,
  enablePassport,
  enableSession,
};
