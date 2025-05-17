const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ تم الاتصال بـ MongoDB'))
.catch(err => console.error('❌ فشل الاتصال بـ MongoDB:', err));

// ✅ Routes
const parkingRoutes = require('./routes/parkings');
app.use('/api/parkings', parkingRoutes); // ⬅️ واجهة API لمواقف السيارات

const recommendRoutes = require('./routes/recommend');
app.use('/api/recommend', recommendRoutes); // ⬅️ واجهة الذكاء الاصطناعي

// ✅ Root
app.get('/', (req, res) => {
  res.send('🚗 EV Parking API is running...');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
