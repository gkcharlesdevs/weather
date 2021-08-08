const express = require("express");
const {
  getWeather,
  getWeathers,
  createWeather,
  updateWeather,
  deleteWeather,
} = require("../controllers/weather");

const router = express.Router();

router.route("/").get(getWeathers).post(createWeather);

router
  .route("/:weatherId")
  .get(getWeather)
  .put(updateWeather)
  .delete(deleteWeather);

module.exports = router;
