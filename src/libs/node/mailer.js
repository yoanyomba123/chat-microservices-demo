const nodemailer = require('nodemailer');

const MSG_ACCOUNT_CREATED = (name, email, code) => ({
  from: 'No-reply Tahc <no.reply@example.com>',
  to: `${name} <${email}>`,
  subject: 'Your TAHC account has been created',
  text: `Hello ${name}!\nPlease activate your account via following link.\nhttp://chatapi.tahc.mnfy.me/activate?code=${code}`,
  html: `<p><b>Hello ${name}</b></p><p>Please activate your account via following link.</p><p><a href="http://chatapi.tahc.mnfy.me/activate?code=${code}">http://chatapi.tahc.mnfy.me/activate?code=${code}</a></p>`,
});

const MSG_PASSWORD_RESET_REQUEST = (name, email, code) => ({
  from: 'No-reply Tahc <no.reply@example.com>',
  to: `${name} <${email}>`,
  subject: 'Password reset request',
  text: `Hello ${name}!\nWe got password reset request from you.\n You can change your password via following link.(Valid for 24 hours)\n  http://chatapi.tahc.mnfy.me/reset-password?code=${code}`,
  html: `<p><b>Hello ${name}</b></p><p>We got password reset request from you.</p> <p>You can change your password via following link.(Valid for 24 hours)</p> <a href="http://chatapi.tahc.mnfy.me/reset-password?code=${code}"> http://chatapi.tahc.mnfy.me/reset-password?code=${code}</a></p>`,
});

const sendMail = (message) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'neivlukap6enucmt@ethereal.email',
      pass: 'hDxDTcVYfT2VDjKuMG',
    },
  });

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(`Error occurred. ${error.message}`); // eslint-disable-line no-console
      return process.exit(1);
    }
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // eslint-disable-line no-console
    return true;
  });
};

module.exports = {
  MSG_ACCOUNT_CREATED,
  MSG_PASSWORD_RESET_REQUEST,
  sendMail,
};
