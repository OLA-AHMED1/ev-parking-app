const express = require('express');
const router = express.Router();
const Parking = require('../models/Parking');
const getTopSpots = require('../utils/getBestSpot');

/**
 * نقطة نهاية للحصول على توصيات بأفضل مواقف الشواحن بناءً على الموقع ونوع الشاحن.
 * @route POST /recommend
 * @param {Object} req.body.userLocation - يحتوي على latitude و longitude
 * @param {String} [req.body.preferredType] - نوع الشاحن المفضل (اختياري)
 * @returns {Array} قائمة بأفضل المواقف أو رسالة خطأ
 */
router.post('/', async (req, res) => {
  const { userLocation, preferredType } = req.body;

  // التحقق من صحة المدخلات
  if (!userLocation?.latitude || !userLocation?.longitude) {
    return res.status(400).json({ message: 'موقع المستخدم غير صالح: يجب إدخال latitude و longitude' });
  }
  if (preferredType && typeof preferredType !== 'string') {
    return res.status(400).json({ message: 'نوع الشاحن المفضل يجب أن يكون سلسلة نصية' });
  }

  try {
    // استرجاع جميع المواقف من قاعدة البيانات
    const spots = await Parking.find();

    // التحقق من وجود مواقف تحتوي على شواحن متاحة
    const hasAvailableSpots = spots.some(spot => spot.available_chargers > 0);
    if (!hasAvailableSpots) {
      return res.status(404).json({ message: 'لم يتم العثور على مواقف تحتوي على شواحن متاحة' });
    }

    // الحصول على أفضل المواقف باستخدام getTopSpots
    const bestSpots = getTopSpots(userLocation, spots, preferredType, 3);

    // إرجاع النتائج
    res.json(bestSpots);
  } catch (err) {
    // إرجاع رسالة خطأ عامة دون كشف تفاصيل حساسة
    res.status(500).json({ message: 'حدث خطأ أثناء معالجة الطلب' });
  }
});

module.exports = router;