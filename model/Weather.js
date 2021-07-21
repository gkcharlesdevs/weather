const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  temperature: {
    type: number,
    required: [true, "Please add temperature value"],
  },
  windSpeed: {
    type: number,
    required: [true, "Please add windspeed"],
  },
  humidity: {
    type: number,
    required: [true, "Please add humidity value"],
  },
  airpressure: {
    type: number,
    required: [true, "Please add airpressure  value"],
  },
  city: {
    type: string,
    required: [true, "Please add city value"],
  },
  country: {
    type: string,
    required: [true, "Please add country value"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Weather", WeatherSchema);
