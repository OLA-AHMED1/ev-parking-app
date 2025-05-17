const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  chargerAvailable: { type: Boolean, default: false } // قيمة افتراضية لتغطية الحالات المفقودة
});

// إضافة فهرس جغرافي لدعم الاستعلامات المكانية
chargerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Charger', chargerSchema);