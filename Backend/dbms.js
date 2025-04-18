const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://veeranenirithikrao:Ramsusisiri6%23@cluster0.6ot8ftf.mongodb.net/Florosync?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB!');
    
    const data = await mongoose.connection.db.collection("Plants").find({}).toArray();
    console.log("ok");

  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
};

module.exports = connectDB;
