const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const utils = require('../../libs/js-common/utils');
const authConfig = require('../../config/runtime/auth.config');
const { ERR_LOGIN_FAILED } = require('../helpers/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Cannot be blank'],
      trim: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: [true, 'Cannot be blank'] },
    displayName: { type: String, required: [true, 'Cannot be blank'] },
    confirmed: { type: Boolean, default: false },
    avatar: { type: String, default: '/assets/img/noimg.jpg' },
  },
  { timestamps: true, versionKey: false },
);

userSchema.plugin(uniqueValidator, { message: 'is already registered.' });

// We cannot use ES6 arrow function here. https://mongoosejs.com/docs/guide.html#methods
/* eslint-disable-next-line func-names  */
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = utils.hash(authConfig.authKey, user.password);
  return next();
});

// We cannot use ES6 arrow function here. https://mongoosejs.com/docs/guide.html#methods
/* eslint-disable-next-line func-names  */
userSchema.statics.authenticate = function (email, password, callback) {
  /* eslint-disable-next-line no-use-before-define */
  User.findOne({ email }).exec((err, user) => {
    const error = new Error(ERR_LOGIN_FAILED);
    if (err) {
      return callback(error, null);
    }
    if (!user) {
      return callback(error, null);
    }
    if (!utils.stringsEqual(user.password, utils.hash(authConfig.authKey, password))) {
      return callback(error, null);
    }

    return callback(null, user);
  });
};

userSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret) => {
    const json = ret;
    delete json.password;
    delete json.confirmed;
    delete json.createdAt;
    delete json.updatedAt;
    return json;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
