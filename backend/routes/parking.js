const express = require('express');
const router = express.Router();
const Parking = require('../models/Parking');

router.get('/', async (req, res) => {
  try {
    const parkings = await Parking.find();
    res.json(parkings);
  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ', error: err.message });
  }
});

module.exports = router;
