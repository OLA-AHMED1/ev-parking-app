import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecommendationBox() {
  const [topSpots, setTopSpots] = useState([]);
  const [preferredType, setPreferredType] = useState('CCS');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;

      try {
        const API_URL = process.env.REACT_APP_API_URL || 'https://ev-parking-app-4.onrender.com/api';
        const res = await axios.post(`${API_URL}/recommend`, {
          userLocation: { latitude, longitude },
          preferredType,
        });

        setTopSpots(res.data);
      } catch (error) {
        console.error('فشل في جلب التوصية:', error);
      }
    });
  }, [preferredType]);

  return (
    <div className="bg-green-100 p-4 rounded shadow mb-4">
      <label className="block mb-2 font-semibold">
        اختر نوع الشاحن المفضل:
        <select
          value={preferredType}
          onChange={e => setPreferredType(e.target.value)}
          className="ml-2 p-1 rounded border"
        >
          <option value="CCS">CCS</option>
          <option value="Type2">Type2</option>
          <option value="Tesla">Tesla</option>
        </select>
      </label>

      {topSpots.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-lg font-bold">أفضل 3 مواقف مقترحة لك:</h2>
          <ul className="mt-2 space-y-3">
            {topSpots.map((spot, index) => (
              <li key={index} className="bg-white p-3 rounded shadow border">
                <p className="font-bold">📍 {spot.name}</p>
                <p>الموقع: {spot.location?.coordinates?.join(', ')}</p>
                <p>الحالة: {spot.chargerAvailable ? 'متاح' : 'غير متاح'}</p>
                <p>أنواع الشواحن: {spot.chargerTypes?.join(', ')}</p>
                <p>⭐ التقييم: {spot.rating}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>جاري البحث عن مواقف مناسبة...</p>
      )}
    </div>
  );
}

export default RecommendationBox;
