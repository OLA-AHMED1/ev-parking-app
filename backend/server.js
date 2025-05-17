const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// --------------------- إعداد CORS ---------------------
// السماح لأصلين محددين فقط بالوصول إلى الخادم
const allowedOrigins = [
  'http://localhost:3002', // بيئة التطوير المحلية
  'https://ev-parking-app-we3g.vercel.app' // عنوان الواجهة الأمامية على Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // السماح بالطلبات بدون origin (مثل Postman أو أدوات اختبار API)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// --------------------- Middlewares ---------------------
// تحليل جسم الطلبات بصيغة JSON
app.use(express.json());

// --------------------- الاتصال بـ MongoDB ---------------------
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ متصل بـ MongoDB Atlas'))
  .catch(err => console.error('❌ خطأ في الاتصال بـ MongoDB:', err));

// --------------------- Routes ---------------------
// Route اختبار بسيط
app.get('/test', (req, res) => {
  res.json({ status: 'server is running' });
});

// ربط الراوتات بواجهات API
const parkingRoutes = require('./routes/parkingRoutes');
app.use('/api/parking', parkingRoutes);

const chargersRoutes = require('./routes/chargers');
app.use('/api/chargers', chargersRoutes);

const bookingsRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingsRoutes);

const recommendRoutes = require('./routes/recommend');
app.use('/api/recommend', recommendRoutes);

// --------------------- معالجة الأخطاء ---------------------
// Middleware لمعالجة الأخطاء غير المتوقعة
app.use((err, req, res, next) => {
  console.error('❌ خطأ في الخادم:', err.message);
  res.status(500).json({ error: 'حدث خطأ في الخادم' });
});

// --------------------- تشغيل الخادم ---------------------
app.listen(PORT, () => {
  console.log(`✅ الخادم يعمل على المنفذ: ${PORT}`);
});