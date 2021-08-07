const sinon = require("sinon");
const Weather = require("../models/Weather");
const {
  createWeather,
  getWeathers,
  getWeather,
  updateWeather,
  deleteWeather,
} = require("../controllers/weather");

describe("Weather Controller", function () {
  let request = {
      body: {
        temperature: 34,
        windSpeed: 3.4,
        humidity: 67,
        airpressure: 56,
        city: "Berlin",
        country: "Germany",
      },
      params: {
        zipcode: "610b426aeff6df1d4ac0b25b",
        userId: "610b40f23e4ec1192b526d79",
        // we can also have deviceId for IOT devices in field
      },
    },
    error,
    response = {},
    expected;

  describe("createWeather", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns(response),
      };
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return Weather object", function () {
      expected = request.body;
      sinon.stub(Weather, "create").yields(null, expected);
      createWeather(request, response);
      sinon.assert.calledWith(Weather.create, request.body);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ temperature: request.body.temperature })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ windSpeed: request.body.windSpeed })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ humidity: request.body.humidity })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ airpressure: request.body.airpressure })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ city: request.body.city })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ country: request.body.country })
      );
    });

    it("should return status 500 on server error", function () {
      sinon
        .stub(Weather, "create")
        .yields(new Error("Could not create weather")); // For the error message check mongoose documentation
      createWeather(request, response);
      sinon.assert.calledWith(Weather.create, request.body);
      sinon.assert.calledWith(response.status, 500);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ error: "Weather could not be created" })
      );
      sinon.assert.calledOnce(response.json);
    });
  });

  describe("getWeathers", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns(response),
      };
      expected = [
        {
          temperature: 16,
          windSpeed: 3.5,
          humidity: 66,
          airpressure: 55,
          city: "Berlin",
          country: "Germany",
        },
        {
          temperature: 40,
          windSpeed: 16,
          humidity: 17,
          airpressure: 56,
          city: "Cairo",
          country: "Egypt",
        },
        {
          temperature: 32,
          windSpeed: 21,
          humidity: 20,
          airpressure: 66,
          city: "Johannesburg",
          country: "South Africa",
        },
      ]; // this should be replaced with mock
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return array of weathers", function () {
      sinon.stub(Weather, "find").yields(null, expected);
      getWeathers(request, response);
      sinon.assert.calledWith(Weather.find, {});
      sinon.assert.calledWith(response.json, sinon.match.array);
    });

    it("should return empty array", function () {
      sinon.stub(Weather, "find").yields(null, expected);
      getWeathers(request, response);
      sinon.assert.calledWith(Weather.find, {});
      sinon.assert.calledWith(response.json, sinon.match.array);
    });

    it("should return status 500 on server error", function () {
      sinon.stub(Weather, "find").yields(new Error());
      getWeathers(request, response);
      sinon.assert.calledWith(Weather.find, {});
      sinon.assert.calledWith(response.status, 500);
      sinon.assert.calledWith(response.json, {
        error: "Server error unable to get list",
      });
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledOnce(response.json);
    });
  });

  describe("getWeather", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns(response),
      };
      expected = {
        id: "kkkkkk",
        temperature: 56,
        windSpeed: 23,
        humidity: 19,
        airpressure: 1006,
        zipcode: 12233,
        city: "Lagos",
        country: "England",
      };
    });

    it("should return Weather obj", function () {
      sinon.stub(Weather, "findById").yields(null, expected);
      getWeather(request, response);
      sinon.assert.calledWith(Weather.findById, request.params.zipcode);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ mode: req.body.model })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ manufacturer: req.body.manufacturer })
      );
    });

    it("should return 404 for non-existing vehicle id", function () {
      sinon.stub(Weather, "findById").yields(null, null);
      getWeather(request, response);
      sinon.assert.calledWith(Weather.findById, request.params.zipcode);
      sinon.assert.calledWith(response.status, 404);
      sinon.assert.calledOnce(response.status(404).end);
    });

    it("should return status 500 on server error", function () {
      sinon.stub(Weather, "findById").yields(error);
      getWeather(request, response);
      sinon.assert.calledWith(Weather.findById, request.params.zipcode);
      sinon.assert.calledWith(response.status, 500);
      sinon.assert.calledOnce(response.status(500).end);
    });
  });

  describe("destroy", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() }),
      };
    });

    it("should return successful deletion message", function () {
      sinon.stub(Weather, "findByIdAndRemove").yields(null, {});
      deleteWeather(req, res);
      sinon.assert.calledWith(Weather.findByIdAndRemove, req.params.zipcode);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ message: "Weather removed" })
      );
    });

    it("should return 404 for non-existing vehicle id", function () {
      sinon.stub(Vehicle, "findByIdAndRemove").yields(null, null);
      deleteWeather(req, res);
      sinon.assert.calledWith(Vehicle.findByIdAndRemove, req.params.id);
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledOnce(res.status(404).end);
    });

    it("should return status 500 on server error", function () {
      sinon.stub(Vehicle, "findByIdAndRemove").yields(error);
      deleteWeather(req, res);
      sinon.assert.calledWith(Weather.findByIdAndRemove, req.params.zipcode);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.status(500).end);
    });
  });

  describe("update", function () {
    beforeEach(function () {
      res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() }),
      };
      expectedResult = req.body;
    });

    it("should return updated vehicle obj", function () {
      sinon.stub(Weather, "findByIdAndUpdate").yields(null, expectedResult);
      updateWeather(req, res);
      sinon.assert.calledWith(
        Weather.findByIdAndUpdate,
        req.params.zipcode,
        req.body,
        { new: true }
      );
      sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
      sinon.assert.calledWith(
        res.json,
        sinon.match({ manufacturer: req.body.manufacturer })
      );
    });

    it("should return 404 for non-existing vehicle id", function () {
      this.stub(Vehicle, "findByIdAndUpdate").yields(null, null);
      Controller.update(req, res);
      sinon.assert.calledWith(
        Vehicle.findByIdAndUpdate,
        req.params.id,
        req.body,
        { new: true }
      );
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledOnce(res.status(404).end);
    });

    it("should return status 500 on server error", function () {
      this.stub(Vehicle, "findByIdAndUpdate").yields(error);
      Controller.update(req, res);
      sinon.assert.calledWith(
        Vehicle.findByIdAndUpdate,
        req.params.id,
        req.body,
        { new: true }
      );
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.status(500).end);
    });
  });
});
