import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecommendationBox() {
  const [topSpots, setTopSpots] = useState([]);
  const [preferredType, setPreferredType] = useState('CCS');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;

      try {
    const res = await axios.post('https://ev-parking-app-backend.onrender.com/api/recommend', {
   userLocation: { latitude, longitude },
    preferredType,
  });

        setTopSpots(res.data);
      } catch (error) {
        console.error('فشل في جلب التوصية:', error);
      }
    });
  }, [preferredType]);

  return React.createElement(
    'div',
    { className: 'bg-green-100 p-4 rounded shadow mb-4' },
    React.createElement(
      'label',
      { className: 'block mb-2 font-semibold' },
      'اختر نوع الشاحن المفضل:',
      React.createElement(
        'select',
        {
          value: preferredType,
          onChange: e => setPreferredType(e.target.value),
          className: 'ml-2 p-1 rounded border',
        },
        React.createElement('option', { value: 'CCS' }, 'CCS'),
        React.createElement('option', { value: 'Type2' }, 'Type2'),
        React.createElement('option', { value: 'Tesla' }, 'Tesla')
      )
    ),
    topSpots.length > 0
      ? React.createElement(
          'div',
          { className: 'mt-4' },
          React.createElement('h2', { className: 'text-lg font-bold' }, 'أفضل 3 مواقف مقترحة لك:'),
          React.createElement(
            'ul',
            { className: 'mt-2 space-y-3' },
            topSpots.map((spot, index) =>
              React.createElement(
                'li',
                { key: index, className: 'bg-white p-3 rounded shadow border' },
                React.createElement('p', { className: 'font-bold' }, `📍 ${spot.name}`),
                React.createElement('p', null, `الموقع: ${spot.location?.coordinates?.join(', ')}`),
                React.createElement('p', null, `الحالة: ${spot.chargerAvailable ? 'متاح' : 'غير متاح'}`),
                React.createElement('p', null, `أنواع الشواحن: ${spot.chargerTypes?.join(', ')}`),
                React.createElement('p', null, `⭐ التقييم: ${spot.rating}`)
              )
            )
          )
        )
      : React.createElement('p', null, 'جاري البحث عن مواقف مناسبة...')
  );
}

export default RecommendationBox;
