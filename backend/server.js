const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// السماح لأصلين (Origins) محددين فقط بالوصول للسيرفر
const allowedOrigins = [
  'http://localhost:3002',               // بيئة التطوير المحلية
  'https://ev-parking-app.vercel.app',  // عنوان الواجهة الأمامية على Vercel
];

app.use(cors({
  origin: function(origin, callback){
    // السماح بالطلبات بدون origin (مثل Postman أو أدوات اختبار API)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Middleware لتحليل JSON في جسم الطلبات
app.use(express.json());

// الاتصال بـ MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ متصل بـ MongoDB Atlas'))
  .catch(err => console.error('❌ خطأ في الاتصال بـ MongoDB:', err));

// Route اختبار بسيط
app.get('/test', (req, res) => {
  res.json({ status: 'server is running' });
});

// استيراد الراوتات وربطها
const parkingRoutes = require('./routes/parkingRoutes');
app.use('/api/parking', parkingRoutes);

const chargersRoutes = require('./routes/chargers');
app.use('/api/chargers', chargersRoutes);

const bookingsRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingsRoutes);

const recommendRoutes = require('./routes/recommend');
app.use('/api/recommend', recommendRoutes);

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`✅ الخادم يعمل على المنفذ: ${PORT}`);
});
