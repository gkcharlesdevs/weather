const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: [true, "Please add temperature value"],
  },
  windSpeed: {
    type: Number,
    required: [true, "Please add windspeed"],
  },
  humidity: {
    type: Number,
    required: [true, "Please add humidity value"],
  },
  airpressure: {
    type: Number,
    required: [true, "Please add airpressure  value"],
  },
  city: {
    type: String,
    required: [true, "Please add city value"],
  },
  zipcode: {
    type: Number,
    required: [true, "Please enter zipcode"],
  },
  country: {
    type: String,
    required: [true, "Please add country value"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Weather", WeatherSchema);
