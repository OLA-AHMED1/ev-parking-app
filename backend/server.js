const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// إعداد CORS للسماح للواجهة الأمامية فقط
app.use(cors({
  origin: 'http://localhost:3002', // عدّل الرابط حسب موقع الواجهة لديك
}));

// Middleware لتحليل JSON في الجسم
app.use(express.json());

// الاتصال بـ MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ متصل بـ MongoDB Atlas'))
  .catch(err => console.error('❌ خطأ في الاتصال بـ MongoDB:', err));

// Route أساسي لاختبار الخادم
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the EV Parking API!' });
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
  console.log(`✅ الخادم يعمل على: http://localhost:${PORT}`);
});
