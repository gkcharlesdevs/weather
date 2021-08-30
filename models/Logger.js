const mongoose = require("mongoose");

const LoggerSchema = new mongose.Schema({
  loggerId: {
    type: String,
    unique: true,
    required: [true, "No logger Id"],
  },
  city: {
    type: String,
    required: [true, "No city included"],
  },
  latitude: {
    type: Number,
    required: [true, "Please add the latitude"],
  },
  longitude: {
    type: Number,
    required: [true, "Please add the longitude"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

model.exports = mongoose.model("Logger", LoggerSchema);
