const mongoose = require('mongoose');
const CampaignSchema = new mongoose.Schema({
  title: String,
  segmentRule: Object,
  message: String,
  audienceSize: Number,
  sent: Number,
  failed: Number,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Campaign', CampaignSchema);
