const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  chargerAvailable: { type: Boolean, default: false },
  available_chargers: { type: Number, default: 0 },
  chargerTypes: [{ type: String }],
  rating: { type: Number, default: 0 }
});

parkingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Parking', parkingSchema);