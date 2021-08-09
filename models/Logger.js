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
  city: {
    type: String,
    required: [true, "Please add city value"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

model.exports = mongoose.model("Logger", LoggerSchema);
