import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header />
      <div className="bg-white p-8 rounded-lg shadow-lg text-center mt-10">
        <h1 className="text-2xl font-bold mb-4 text-green-600">تم تأكيد الحجز بنجاح!</h1>
        <p className="text-gray-600 mb-6">شكرًا لاستخدام تطبيق مواقف السيارات الكهربائية. تم حجز موقفك بنجاح.</p>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;