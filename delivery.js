const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

router.post('/', async (req, res) => {
  const { campaignId, customerId, status } = req.body;

  try {
    const log = await Log.findOneAndUpdate(
      { campaignId, customerId },
      { status },
      { new: true }
    );
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
