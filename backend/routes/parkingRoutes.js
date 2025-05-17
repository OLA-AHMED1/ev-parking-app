const express = require('express');
const router = express.Router();
const Parking = require('../models/Parking');

// جلب جميع المواقف
router.get('/', async (req, res) => {
  const spots = await Parking.find();
  res.json(spots);
});

// ✅ جلب موقف حسب المعرف
router.get('/:id', async (req, res) => {
  try {
    const spot = await Parking.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
