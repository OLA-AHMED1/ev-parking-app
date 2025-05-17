const haversine = require('haversine-distance');

/**
 * يحصل على أفضل المواقف بناءً على الموقع ونوع الشاحن.
 * 
 * @param {Object} userLocation - يحتوي على latitude و longitude
 * @param {Array} spots - قائمة المواقف المتوفرة
 * @param {String} preferredType - نوع الشاحن المفضل
 * @param {Number} limit - عدد النتائج المطلوبة (افتراضي 3)
 * @returns {Array} قائمة بأفضل المواقف
 */
function getTopSpots(userLocation, spots, preferredType, limit = 3) {
  return spots
    .filter(spot => spot.chargerAvailable)
    .map(spot => {
      const dist = haversine(userLocation, {
        latitude: spot.location.coordinates[1],
        longitude: spot.location.coordinates[0],
      });

      const typeMatch = spot.chargerTypes?.includes(preferredType) ? 1 : 0;

      const score =
        1 +                        // الشاحن متاح (ضمن الفلترة)
        typeMatch * 2 +            // نوع الشاحن
        (1 / (dist + 1)) +         // القرب
        (spot.rating || 0) * 0.5;  // التقييم

      return { ...spot._doc, distance: dist, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

module.exports = getTopSpots;
