const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema({
  email: String,
  type: String,
  message: String,
  status: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmailLog", emailLogSchema);