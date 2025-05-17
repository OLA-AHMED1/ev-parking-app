const Parking = require('../models/Parking');

// جلب كل مواقف السيارات
exports.getAllParkingSpots = async (req, res) => {
  try {
    const parkingSpots = await Parking.find();
    res.json(parkingSpots);
  } catch (err) {
    res.status(500).json({ message: '❌ خطأ في جلب المواقف', error: err.message });
  }
};

// جلب موقف سيارة معين حسب الـ ID
exports.getParkingSpotById = async (req, res) => {
  try {
    const parkingSpot = await Parking.findById(req.params.id);
    if (!parkingSpot) return res.status(404).json({ message: '❌ الموقف غير موجود' });
    res.json(parkingSpot);
  } catch (err) {
    res.status(500).json({ message: '❌ خطأ في جلب الموقف', error: err.message });
  }
};

// جلب المواقف القريبة من إحداثيات (lat, lng) مع نصف القطر radius بالمتر (افتراضي 5000 متر)
exports.getNearbyParkingSpots = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: '❌ يجب توفير إحداثيات' });

    const locations = await Parking.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(radius)
        }
      }
    });

    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: '❌ خطأ في جلب المواقف القريبة', error: err.message });
  }
};

// تحديث حالة توفر الشاحن لموقف معين حسب الـ ID
exports.updateParkingSpot = async (req, res) => {
  try {
    const { chargerAvailable } = req.body;
    const updatedSpot = await Parking.findByIdAndUpdate(
      req.params.id,
      { chargerAvailable },
      { new: true }
    );
    if (!updatedSpot) return res.status(404).json({ message: '❌ الموقف غير موجود' });

    res.json({ message: '✅ تم تحديث حالة الموقف', updatedSpot });
  } catch (err) {
    res.status(500).json({ message: '❌ خطأ في تحديث الموقف', error: err.message });
  }
};
