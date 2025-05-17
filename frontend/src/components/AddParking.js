import axios from 'axios';
import { useState } from 'react';

const AddParking = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const newParking = {
    name: "Red Sea Mall",
    location: { type: "Point", coordinates: [39.1728, 21.5433] },
    chargerAvailable: true,
    rating: 4.5,
    chargerTypes: ["Type2", "CCS"],
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5001/api/parking/add', newParking);
      setMessage('✅ Parking added successfully!');
      console.log('Parking added:', response.data);
    } catch (err) {
      setMessage('❌ Error adding parking: ' + err.message);
      console.error('Error adding parking:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding...' : 'Add Parking'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddParking;