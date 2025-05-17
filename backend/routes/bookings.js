const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET all bookings
// جلب حجز واحد حسب الـ ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'الحجز غير موجود' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ', error: err.message });
  }
});


module.exports = router;