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
  Weather.findById(req.params.weatherId, (error, weather) => {
    if (error) {
      if (error.name === "CastError") {
        res.status(404);
        return res.json({ error: error.message });
      } else {
        res.status(500);
        return res.json({ error: error.message });
      }
    } else {
      res.status(200);
      res.json(weather);
    }
  });
};

exports.updateWeather = (req, res) => {
  Weather.findByIdAndUpdate(
    req.params.weatherId,
    req.body,
    {
      new: true,
    },
    (err, weather) => {
      if (err) {
        if (err.name === "CastError") {
          res.status(404);
          return res.json({ error: err.message });
        } else {
          res.status(500);
          return res.json({ error: err.message });
        }
      } else {
        res.status(200);
        res.json(weather);
      }
    }
  );
};

exports.deleteWeather = (req, res) => {
  Weather.findByIdAndDelete(req.params.weatherId, (err, weather) => {
    if (err) {
      if (err.name === "CastError") {
        res.status(404);
        res.json({ error: err.message });
      } else {
        res.status(500);
        res.json({ error: err.message });
      }
    } else {
      res.json({ message: "Weather record removed" });
    }
  });
};

exports.getWeatherByCity = (req, res) => {
  Weather.find({});
};
