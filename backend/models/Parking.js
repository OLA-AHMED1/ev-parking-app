const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true, default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  available_chargers: { type: Number, default: 0 },   // عدد الشواحن المتاحة
  chargerAvailable: { type: Boolean, default: false }, // هل يوجد شاحن متاح (true لو available_chargers > 0)
  rating: { type: Number, default: 0 },
  chargerTypes: [String],
});

ParkingSchema.index({ location: '2dsphere' }); // لتفعيل البحث الجغرافي

// Middleware لتحديث chargerAvailable تلقائياً حسب available_chargers قبل الحفظ
ParkingSchema.pre('save', function(next) {
  this.chargerAvailable = this.available_chargers > 0;
  next();
});

module.exports = mongoose.model('Parking', ParkingSchema);
