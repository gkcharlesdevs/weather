const Weather = require("../models/Weather");

exports.createWeather = (req, res) => {
  const weather = Weather.create(req.body);
  res.json(weather);
};

exports.getWeathers = (req, res) => {};

exports.getWeather = (req, res) => {};

exports.updateWeather = (req, res) => {};

exports.deleteWeather = (req, res) => {};
