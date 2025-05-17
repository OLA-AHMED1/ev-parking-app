const Booking = require('../models/Booking');
const Parking = require('../models/Parking');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('spotId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: '❌ خطأ في جلب الحجوزات', error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { spotId, bookingTime, userName, carModel } = req.body;
    if (!spotId || !bookingTime || !userName || !carModel) {
      return res.status(400).json({ message: '❌ جميع الحقول مطلوبة' });
    }
    const booking = new Booking({ spotId, bookingTime, userName, carModel });
    await booking.save();
    await Parking.findByIdAndUpdate(spotId, { chargerAvailable: false });
    res.status(201).json({ message: '✅ تم الحجز بنجاح', booking });
  } catch (err) {
    res.status(500).json({ message: '❌ خطأ في إضافة الحجز', error: err.message });
  }
};