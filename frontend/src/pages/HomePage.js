import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">مرحبًا بك في تطبيق مواقف السيارات الكهربائية</h1>
        <p className="text-gray-600 mb-6">ابحث عن أفضل مواقف السيارات الكهربائية القريبة منك وحجزها بسهولة!</p>
        <div className="space-x-4">
          <Link to="/parking" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            عرض المواقف
          </Link>
          <Link to="/map" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            عرض الخريطة
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;