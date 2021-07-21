const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  temperature: {},
  windSpeed: {},
  humidity: {},
  airpressure: {},
  location: {}, // longitude, latitude,
  country: {},
});

module.exports = mongoose.model("Weather", WeatherSchema);
