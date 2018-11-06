const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');
const { loginSchema } = require('./validators');
const { ERR_LOGIN_FAILED } = require('./constants');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findOne({ id }).exec((err, userDoc) => {
    if (err || !userDoc) {
      return done(err, false, { message: `${ERR_LOGIN_FAILED}--1` });
    }
    return done(null, userDoc.toJSON());
  });
});

// use LocalStrategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    loginSchema
      .validate({ email, password })
      .then(() => {
        User.authenticate(email, password, (err, userDoc) => {
          if (err) {
            return done(err, false, { message: `${ERR_LOGIN_FAILED}--2` });
          }
          return done(null, userDoc.toJSON());
        });
      })
      .catch((err) => {
        done(err, false, { message: `${ERR_LOGIN_FAILED}--3` });
      });
  }),
);
