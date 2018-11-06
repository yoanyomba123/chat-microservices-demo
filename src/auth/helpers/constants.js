const ERR_GENERIC = 'An error occured during process.!';
const ERR_USER_EXISTS = 'User already exists!';
const ERR_REQUIREDS_EMPTY = 'Required fields cannot be empty!';
const REGISTERED = 'Registration successful. Please confirm your email.';
const ERR_LOGIN_FAILED = 'Login failed.';
const NOT_AUTHENTICATED = { error: 'You have no authorization!', user: null };

module.exports = {
  ERR_GENERIC,
  ERR_LOGIN_FAILED,
  ERR_REQUIREDS_EMPTY,
  ERR_USER_EXISTS,
  REGISTERED,
  NOT_AUTHENTICATED,
};
