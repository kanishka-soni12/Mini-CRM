const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');

const Customer = require('../models/Customer');
const Campaign = require('../models/Campaign');
const Log = require('../models/Log');
const { evaluateCustomer } = require('../utils/evaluator');
const { getMessageSuggestions } = require('../services/openai');


    router.post('/', ensureAuthenticated, async (req, res) => {
    const { title, rule, objective } = req.body;
    console.log("Received title:", title);
    console.log("Objective:", objective);
    console.log("Rule object:", rule);

  try {
    const customers = await Customer.find();
    console.log("Customers:", customers.length);

    const matched = customers.filter(c => evaluateCustomer(c, rule));
    console.log("Matched customers:", matched.length);
    const suggestions = [`Campaign message for: ${objective}`];

    const campaign = await Campaign.create({
      title,
      segmentRule: rule,
      message: suggestions[0],
      audienceSize: matched.length,
      sent: 0,
      failed: 0
    });

    let sent = 0, failed = 0;
    for (let c of matched) {
      const isSuccess = Math.random() < 0.9;

      await Log.create({
        campaignId: campaign._id,
        customerId: c._id,
        message: suggestions[0],
        status: isSuccess ? "SENT" : "FAILED"
      });

      isSuccess ? sent++ : failed++;
    }

    campaign.sent = sent;
    campaign.failed = failed;
    await campaign.save();

    res.json(campaign);
  } catch (error) {
    console.error("Campaign creation failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    console.error("Fetching campaigns failed:", error);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
});

module.exports = router;
