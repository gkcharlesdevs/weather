const Weather = require("../models/Weather");

exports.createWeather = (req, res) => {
  Weather.create(req.body, function (error, weather) {
    if (error) {
      res.status(500);
      return res.json({ error: "Weather could not be created" });
    } else {
      return res.json(weather);
    }
  });
};

exports.getWeathers = (req, res) => {};

exports.getWeather = (req, res) => {};

exports.updateWeather = (req, res) => {};

exports.deleteWeather = (req, res) => {};
