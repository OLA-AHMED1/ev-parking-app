import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const formatLocation = (location) => {
  if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2 || location.coordinates.some(coord => coord == null)) {
    return 'غير متاح';
  }
  return location.coordinates.join(', ');
};

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    date: '',
    carModel: '',
  });

  useEffect(() => {
    axios
      .get(`https://ev-parking-app-backend.onrender.com/api/parking/${id}`, { timeout: 5000 })

      .then(response => {
        if (response.data && typeof response.data === 'object') {
          setSpot(response.data);
          setLoading(false);
        } else {
          throw new Error('البيانات غير صالحة');
        }
      })
      .catch(err => {
        console.error('Error fetching spot:', err);
        setError('فشل في جلب تفاصيل الموقف.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!bookingDetails.name || !bookingDetails.date || !bookingDetails.carModel) {
      setError('يرجى ملء جميع الحقول.');
      return;
    }

    const selectedDate = new Date(bookingDetails.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError('يرجى اختيار تاريخ مستقبلي.');
      return;
    }

    if (!spot || !spot.chargerAvailable) {
      setError('الموقف غير متاح للحجز.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/bookings', {
        parkingId: id,
        ...bookingDetails,
      });
      console.log('Booking confirmed:', response.data);
      navigate('/confirmation', { state: { booking: response.data, spot } });
    } catch (err) {
      console.error('Error confirming booking:', err);
      setError('فشل في تأكيد الحجز. حاولي لاحقًا.');
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-600 p-6">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500 p-6">{error}</div>;
  }

  if (!spot) {
    return <div className="text-center text-lg text-gray-600 p-6">الموقف غير موجود.</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <Header />
      <h1 className="text-2xl font-bold mb-6 text-blue-900">حجز موقف #{id}</h1>
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{spot.name || 'موقف غير مسمى'}</h2>
        <p className="text-gray-600 mb-2">📍 {formatLocation(spot.location)}</p>
        <p className="text-gray-600 mb-4">
          الحالة: {spot.chargerAvailable ? 'متاح ✅' : 'غير متاح ❌'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label htmlFor="name" className="block text-gray-700">الاسم</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bookingDetails.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="أدخل اسمك"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700">التاريخ</label>
            <input
              type="date"
              id="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="carModel" className="block text-gray-700">طراز السيارة</label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              value={bookingDetails.carModel}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="أدخل طراز السيارة"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!spot.chargerAvailable}
          >
            تأكيد الحجز
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingDetails;