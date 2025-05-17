const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  chargerAvailable: { type: Boolean, required: true }
});

chargerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Charger', chargerSchema);