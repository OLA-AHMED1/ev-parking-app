import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-green-600 text-white p-6 text-center">
      <h1 className="text-3xl font-bold">تطبيق مواقف السيارات الكهربائية ⚡</h1>
      <p className="mt-2">حلول ذكية لإدارة مواقف السيارات الكهربائية - البنية التحتية</p>
      <nav className="mt-4">
        <Link to="/" className="mx-4 text-white hover:underline">الرئيسية</Link>
        <Link to="/chargers" className="mx-4 text-white hover:underline">الشواحن</Link>
      </nav>
    </header>
  );
};

export default Header;