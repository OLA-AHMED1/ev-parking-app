import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './ParkingDetails.css';

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

function ParkingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSpot = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/parking/${id}`, {
          timeout: 5000,
        });

        if (!response.data || typeof response.data !== 'object') {
          throw new Error('البيانات المستلمة غير صحيحة');
        }

        if (isMounted) {
          setSpot(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching spot details:', err);
          setError('فشل في جلب تفاصيل الموقف. يرجى المحاولة لاحقًا.');
          setLoading(false);
        }
      }
    };

    fetchSpot();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleConfirmBooking = () => {
    if (!spot || !spot.chargerAvailable) {
      setError('هذا الموقف غير متاح حاليًا.');
      return;
    }
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return (
      <div className="parking-details-container max-w-2xl mx-auto p-6">
        <p className="text-lg text-gray-600 text-center">جاري التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="parking-details-container max-w-2xl mx-auto p-6">
        <p className="text-lg text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (!spot) {
    return (
      <div className="parking-details-container max-w-2xl mx-auto p-6">
        <p className="text-lg text-gray-600 text-center">الموقف غير موجود.</p>
      </div>
    );
  }

  return (
    <div className="parking-details-container max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <Header />
      <h2 className="text-3xl font-bold text-blue-900 mb-6">📍 تفاصيل الموقف #{id}</h2>
      <p className="text-lg text-gray-600 my-2">الاسم: {spot.name || 'غير محدد'}</p>
      <p className="text-lg text-gray-600 my-2">الموقع: {formatLocation(spot.location)}</p>
      <p className="text-lg text-gray-600 my-2">
        الحالة: {spot.chargerAvailable ? 'متاح ✅' : 'غير متاح ❌'}
      </p>
      {spot.price && (
        <p className="text-lg text-gray-600 my-2">السعر: {spot.price} ريال</p>
      )}
      <button
        className={`mt-6 w-full py-2 rounded-lg text-white font-semibold transition ${
          spot.chargerAvailable
            ? 'bg-amber-500 hover:bg-amber-600'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
        onClick={handleConfirmBooking}
        disabled={!spot.chargerAvailable}
      >
        احجز الآن ✅
      </button>
    </div>
  );
}

export default ParkingDetails;
