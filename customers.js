// routes/customers.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.post('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    await Customer.deleteMany(); // Clear existing (optional)

    const mockData = [
      { name: "Amit", email: "amit@example.com", age: 35, location: "Delhi", gender: "male", spends: 3000 },
      { name: "Priya", email: "priya@example.com", age: 28, location: "Mumbai", gender: "female", spends: 1500 },
      { name: "Sara", email: "sara@example.com", age: 22, location: "Delhi", gender: "female", spends: 800 },
      { name: "Ravi", email: "ravi@example.com", age: 40, location: "Delhi", gender: "male", spends: 5000 },
      { name: "Anita", email: "anita@example.com", age: 31, location: "Bangalore", gender: "female", spends: 1200 }
    ];

    await Customer.insertMany(mockData);
    res.json({ message: 'Mock customers seeded!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
