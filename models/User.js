const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true
  },

  // ✅ Additional Information
  contactNo: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"]
  },
  field: {
    type: String,
    enum: ["IT", "Robotics"],
    required: true
  },
  collegeName: {
    type: String,
    required: true
  },
  degreePursuing: {
    type: String,
    required: true
  },
  currentYear: {
    type: Number,
    min: 1,
    max: 6,
    required: true
  },
  degreeStart: {
    type: Date,
    required: true
  },
  degreeEnd: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
