const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
  campaignId: mongoose.Schema.Types.ObjectId,
  customerId: mongoose.Schema.Types.ObjectId,
  message: String,
  status: String, // SENT / FAILED
});
module.exports = mongoose.model('Log', LogSchema);
