const mongoose = require('mongoose');
const Parking = require('./models/Parking');
const Charger = require('./models/Charger');
const Booking = require('./models/Booking');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ متصل بـ MongoDB Atlas');

    // حذف البيانات القديمة
    await Parking.deleteMany({});
    await Charger.deleteMany({});
    await Booking.deleteMany({});
    console.log('🗑️ تم حذف البيانات القديمة');

    // تهيئة مواقف السيارات
    const parkingData = [
      {
        name: "مواقف المملكة سنتر",
        location: { type: "Point", coordinates: [46.6793, 24.7415] },
        chargerAvailable: true,
        available_chargers: 2,
        chargerTypes: ['Type2', 'CCS'],
        rating: 4.5
      },
      {
        name: "مواقف الراجحي",
        location: { type: "Point", coordinates: [46.6821, 24.7432] },
        chargerAvailable: true,
        available_chargers: 1,
        chargerTypes: ['Type2'],
        rating: 4.0
      },
      {
        name: "مواقف الممشى",
        location: { type: "Point", coordinates: [39.1823, 21.5489] },
        chargerAvailable: false,
        available_chargers: 0,
        chargerTypes: [],
        rating: 3.5
      },
      {
        name: "مواقف التحلية",
        location: { type: "Point", coordinates: [39.1698, 21.5512] },
        chargerAvailable: true,
        available_chargers: 3,
        chargerTypes: ['CCS', 'CHAdeMO'],
        rating: 4.8
      },
      {
        name: "مواقف السويدي",
        location: { type: "Point", coordinates: [46.6654, 24.6987] },
        chargerAvailable: false,
        available_chargers: 0,
        chargerTypes: [],
        rating: 3.0
      }
    ];

    const parkingCount = await Parking.countDocuments();
    if (parkingCount === 0) {
      await Parking.insertMany(parkingData);
      console.log('✅ تم تهيئة بيانات المواقف');
    } else {
      console.log('ℹ️ بيانات المواقف موجودة بالفعل');
    }

    // تهيئة الشواحن
    const chargerData = [
      { name: "شاحن العليا", location: { type: "Point", coordinates: [46.6753, 24.7136] }, chargerAvailable: true },
      { name: "شاحن النخيل مول", location: { type: "Point", coordinates: [46.7386, 24.7743] }, chargerAvailable: false },
      { name: "مواقف المملكة سنتر", location: { type: "Point", coordinates: [46.6793, 24.7415] }, chargerAvailable: true },
      { name: "شاحن الراجحي", location: { type: "Point", coordinates: [46.6821, 24.7432] }, chargerAvailable: true },
      { name: "شاحن التحلية", location: { type: "Point", coordinates: [39.1698, 21.5512] }, chargerAvailable: true },
      { name: "شاحن السويدي", location: { type: "Point", coordinates: [46.6654, 24.6987] }, chargerAvailable: false },
      { name: "شاحن الحمراء مول", location: { type: "Point", coordinates: [46.6987, 24.6723] }, chargerAvailable: true },
      { name: "شاحن الرياض مول", location: { type: "Point", coordinates: [46.6978, 24.7111] }, chargerAvailable: true },
      { name: "شاحن كورنيش جدة", location: { type: "Point", coordinates: [39.1797, 21.4910] }, chargerAvailable: false },
      { name: "شاحن الغدير", location: { type: "Point", coordinates: [46.6765, 24.7254] }, chargerAvailable: true },
      { name: "شاحن العزيزية", location: { type: "Point", coordinates: [39.1745, 21.5632] }, chargerAvailable: true },
      { name: "شاحن الشفا", location: { type: "Point", coordinates: [46.6832, 24.6901] }, chargerAvailable: false }
    ];

    const chargerCount = await Charger.countDocuments();
    if (chargerCount === 0) {
      await Charger.insertMany(chargerData);
      console.log('✅ تم تهيئة بيانات الشواحن');
    } else {
      console.log('ℹ️ بيانات الشواحن موجودة بالفعل');
    }

    // تهيئة الحجوزات
    const bookingCount = await Booking.countDocuments();
    if (bookingCount === 0 && parkingCount > 0) {
      const parking = await Parking.findOne();
      const bookingData = [
        {
          spotId: parking._id,
          bookingTime: new Date(),
          userName: 'علي أحمد',
          carModel: 'Ceer EV'
        }
      ];
      await Booking.insertMany(bookingData);
      console.log('✅ تم تهيئة بيانات الحجوزات');
    } else {
      console.log('ℹ️ بيانات الحجوزات موجودة بالفعل');
    }

    console.log('✅ اكتملت التهيئة');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ خطأ في التهيئة:', err);
    mongoose.connection.close();
  }
};

seedData();