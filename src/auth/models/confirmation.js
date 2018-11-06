const mongoose = require('mongoose');

const confirmationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
  },
  { versionKey: false },
);

const Confirmation = mongoose.model('Confirmation', confirmationSchema);

module.exports = { Confirmation };
