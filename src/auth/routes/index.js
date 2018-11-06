const path = require('path');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/runtime/auth.config');
const { User } = require('../models/user');
const { Confirmation } = require('../models/confirmation');
const { sendMail, MSG_ACCOUNT_CREATED } = require('../../libs/node/mailer');
const { NOT_AUTHENTICATED, ERR_REQUIREDS_EMPTY } = require('../helpers/constants');
require('../helpers/passport-strategies');

const defaultRouter = express.Router();

// Authorization request by client
defaultRouter.get('/auth', (req, res) => {
  if (req.user) {
    return res.json({ user: req.user, error: false });
  }
  if (req.cookies && !req.cookies.auth) {
    return res.json(NOT_AUTHENTICATED);
  }

  // Client has a token so, try to verify it
  const token = req.cookies.auth;
  return jwt.verify(token, authConfig.authKey, (err, decoded) => {
    if (err || !decoded.id) {
      return res.json(NOT_AUTHENTICATED);
    }

    // Try to login with token
    return User.findOne({ _id: decoded.id }, (error, user) => {
      if (error || !user) {
        return res.json(NOT_AUTHENTICATED);
      }
      req.user = user.toJSON();
      return res.json({ user, error: false });
    });
  });
});

// Classic login
defaultRouter.post('/login', passport.authenticate('local'), (req, res) => {
  if (!req.user) {
    return res.json(NOT_AUTHENTICATED);
  }

  const expires = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000);
  const { _id: id } = req.user;
  const tokenData = {
    id,
    validTo: expires,
  };

  const token = jwt.sign(tokenData, authConfig.authKey);
  res.cookie('auth', token, { domain: authConfig.cookieDomain, expires, httpOnly: true });

  req.session.user = req.user;
  return res.json({ user: req.user, error: false });
});

// Register a user
defaultRouter.route('/register').post((req, res) => {
  const { displayName, email, password } = req.body;
  if (!displayName || !email || !password) {
    return res.json({ error: ERR_REQUIREDS_EMPTY, user: null });
  }

  const newUser = { displayName, email, password };

  return User.create(newUser, (err, userDoc) => {
    if (err) {
      return res.json({ error: err.message, user: null });
    }

    /**
     * @TODO: Since, we didn't care about confirmation creation result.
     * We should show re-send activation link to user,
     * if she/he couldn't receive activation email
     */
    const { _id: id } = userDoc;
    Confirmation.create({ id }, (error, confirmationDoc) => {
      if (!error) {
        const { _id: code } = confirmationDoc;
        const welcomeMessage = MSG_ACCOUNT_CREATED(userDoc.displayName, userDoc.email, code);
        sendMail(welcomeMessage);
      }
    });

    return res.json({ error: null, user: userDoc });
  });
});

// Activate account
defaultRouter.route('/activate').get((req, res) => {
  if (!req.query.code) {
    return res.redirect('/register');
  }

  return Confirmation.findOneAndDelete({ _id: req.query.code }, (err, data) => {
    if (err || !data) {
      return res.redirect('/register');
    }
    return User.findOneAndUpdate({ _id: data.userId }, { confirmed: true }, (error, result) => {
      if (error || !result) {
        return res.redirect('/register');
      }
      return res.redirect('/?confirmed=1');
    });
  });
});

// Password reset request
// @TODO Create a reset token on database and send it to the user
defaultRouter.route('/reset-request').post((req, res) => res.json({ error: false }));

// Client has a reset token so, process the request
// @TODO Verify the request is valid or not then process it
defaultRouter.route('/reset-password').post((req, res) => res.json({ error: false }));

// Catch all
defaultRouter.route('*').get((req, res) => {
  if (process.env.NODE_ENV === 'development') {
    return res.sendFile(path.join(__dirname, '../../../dist-dev/auth/public/index.html'));
  }
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = defaultRouter;
