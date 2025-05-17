const express = require('express');
const router = express.Router();
const Charger = require('../models/Charger');

// جلب جميع الشواحن
router.get('/', async (req, res) => {
  try {
    const chargers = await Charger.find();
    res.json(chargers);
  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ', error: err.message });
  }
});

// جلب شاحن واحد حسب المعرف (ID)
router.get('/:id', async (req, res) => {
  try {
    const charger = await Charger.findById(req.params.id);
    if (!charger) {
      return res.status(404).json({ message: 'الشاحن غير موجود' });
    }
    res.json(charger);
  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ', error: err.message });
  }
});

module.exports = router;