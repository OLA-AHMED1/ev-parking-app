import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ spot, onConfirm }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [carModel, setCarModel] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !date || !carModel) {
      setError('يرجى ملء جميع الحقول.');
      return;
    }

    const bookingData = {
      parkingId: spot._id,
      name,
      date,
      carModel,
    };

    try {
     await axios.post('https://ev-parking-app-backend.onrender.com/api/bookings', bookingData);

      onConfirm(bookingData);
    } catch (err) {
      console.error('Error saving booking:', err);
      setError('فشل في إتمام الحجز. حاولي لاحقًا.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-gray-700">الاسم:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">تاريخ الحجز:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">طراز السيارة:</label>
        <input
          type="text"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        تأكيد الحجز
      </button>
    </form>
  );
};

export default BookingForm;
