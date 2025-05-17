const Charger = require('../models/Charger');

exports.getAllChargers = async (req, res) => {
  try {
    const chargers = await Charger.find();
    res.json(chargers);
  } catch (err) {
    res.status(500).json({ message: '❌ خطأ في جلب الشواحن', error: err.message });
  }
};

exports.getChargerById = async (req, res) => {
  try {
    const charger = await Charger.findById(req.params.id);
    if (!charger) return res.status(404).json({ message: '❌ الشاحن غير موجود' });
    res.json(charger);
  } catch (err) {
    res.status(500).json({ message: '❌ خطأ في جلب الشاحن', error: err.message });
  }
};