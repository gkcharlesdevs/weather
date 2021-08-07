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

exports.getWeathers = (req, res) => {
  Weather.find({}, (error, weather) => {
    if (error) {
      res.status(500);
      return res.json({ error: "Server error unable to get list" });
    } else {
      res.status(200);
      res.json(weather);
    }
  });
};

exports.getWeather = (req, res) => {
  Weather.findById();
};

exports.updateWeather = (req, res) => {};

exports.deleteWeather = (req, res) => {};
