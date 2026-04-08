const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  condition: String,
  description: String,
  userEmail: String,
  image: String,

  // 🔥 ADD THIS
  status: {
    type: String,
    default: "available"
  },
  interestedUsers: [String]

}, { timestamps: true });

module.exports = mongoose.model("Listing", listingSchema);