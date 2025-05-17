import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Header from '../components/Header';

const ChargingMap = () => {
  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/chargers', { timeout: 5000 })
      .then(response => {
        if (Array.isArray(response.data)) {
          setChargers(response.data);
          setLoading(false);
        } else {
          throw new Error('البيانات غير صالحة');
        }
      })
      .catch(err => {
        console.error('Error fetching chargers:', err);
        setError('فشل في جلب مواقع الشواحن.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-600 p-6">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <h1 className="text-2xl font-bold mb-4 text-blue-900 text-center p-4">خريطة الشواحن</h1>
      <MapContainer center={[24.7136, 46.6753]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {chargers.map(charger => (
          charger.location && charger.location.coordinates && Array.isArray(charger.location.coordinates) && charger.location.coordinates.length === 2 ? (
            <Marker key={charger._id} position={[charger.location.coordinates[0], charger.location.coordinates[1]]}>
              <Popup>
                <strong>{charger.name || 'شاحن غير مسمى'}</strong>
                <p>الحالة: {charger.chargerAvailable ? 'متاح ✅' : 'غير متاح ❌'}</p>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
};

export default ChargingMap;