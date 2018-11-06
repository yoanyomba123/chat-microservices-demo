const yup = require('yup');

// Fields
const emailField = yup
  .string()
  .email()
  .required();

const passwordField = yup
  .string()
  .required()
  .min(6);

const displayNameField = yup
  .string()
  .required()
  .min(3);

// Schemas
const loginSchema = yup.object().shape({
  email: emailField,
  password: passwordField,
});

const registrationSchema = yup.object().shape({
  displayName: displayNameField,
  email: emailField,
  password: passwordField,
});

module.exports = {
  loginSchema,
  registrationSchema,
};
