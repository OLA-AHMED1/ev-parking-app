// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RecommendationBox from './components/RecommendationBox'; // ✅ إضافة التوصيات
import HomePage from './pages/HomePage';
import ParkingList from './pages/ParkingList';
import ParkingDetails from './pages/ParkingDetails';
import BookingDetails from './pages/BookingDetails';
import ChargingMap from './pages/ChargingMap';
import ConfirmationPage from './pages/ConfirmationPage';
import AddParking from './components/AddParking';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <RecommendationBox /> {/* إظهار توصيات الشواحن */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/parking" element={<ParkingList />} />
          <Route path="/parking/:id" element={<ParkingDetails />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
          <Route path="/map" element={<ChargingMap />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/add-parking" element={<AddParking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
