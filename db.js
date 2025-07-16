// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI = "mongodb+srv://yash:yash123@demo.djkmtp0.mongodb.net/Techxica?retryWrites=true&w=majority&appName=demo";
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
