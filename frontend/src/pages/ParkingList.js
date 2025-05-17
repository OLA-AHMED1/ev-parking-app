import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const formatLocation = (location) => {
  if (
    !location ||
    !location.coordinates ||
    !Array.isArray(location.coordinates) ||
    location.coordinates.length !== 2 ||
    location.coordinates.some(coord => coord == null)
  ) {
    return 'غير متاح';
  }
  return location.coordinates.join(', ');
};

const ParkingList = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/parking', { timeout: 5000 });
        if (Array.isArray(response.data)) {
          setParkingSpots(response.data);
        } else {
          throw new Error('البيانات غير صالحة');
        }
      } catch (err) {
        console.error('Error fetching parking spots:', err);
        setError('فشل في جلب المواقف. يرجى المحاولة لاحقًا.');
      } finally {
        setLoading(false);
      }
    };
    fetchParkingSpots();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-600 p-6">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-4 text-blue-900">مواقف السيارات الكهربائية</h1>
      {parkingSpots.length > 0 ? (
        <div className="space-y-4">
          {parkingSpots.map((spot) => (
            <div key={spot._id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{spot.name || 'موقف غير مسمى'}</h2>
                <p className="text-gray-600">📍 {formatLocation(spot.location)}</p>
                <p className="text-gray-600">
                  الحالة: {spot.available_chargers > 0 ? 'متاح ✅' : 'غير متاح ❌'}
                </p>
              </div>
              <Link
                to={`/parking/${spot._id}`}
                className={`px-4 py-2 rounded text-white ${
                  spot.available_chargers > 0
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                onClick={(e) => spot.available_chargers === 0 && e.preventDefault()}
              >
                التفاصيل
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">لا توجد مواقف متاحة حاليًا.</p>
      )}
    </div>
  );
};

export default ParkingList;
