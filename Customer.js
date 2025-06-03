const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  lastPurchase: Date,
  totalSpent: Number,
  visitCount: Number,
});
module.exports = mongoose.model('Customer', CustomerSchema);
