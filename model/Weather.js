const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  temperature: {},
  windspeed: {},
  humidity: {},
});

module.exports = mongoose.model("Weather", WeatherSchema);
