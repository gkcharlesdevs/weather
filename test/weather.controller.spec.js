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
        temperature: 13,
        windSpeed: 4,
        humidity: 67,
        airpressure: 1025,
        city: "Nairobi",
        zipcode: 00100,
        country: "Kenya",
      },
      params: {
        weatherId: "610e2cc2c38e103be50257db",
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
      expected = {
        _id: "610e2cc2c38e103be50257db",
        temperature: 13,
        windSpeed: 4,
        humidity: 67,
        airpressure: 1025,
        city: "Nairobi",
        zipcode: 64,
        country: "Kenya",
        createdAt: "2021-08-07T06:48:34.855Z",
        __v: 0,
      };
      sinon.stub(Weather, "create").yields(null, expected);
      createWeather(request, response);
      sinon.assert.calledWith(Weather.create, request.body);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ _id: expected._id })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ temperature: expected.temperature })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ windSpeed: expected.windSpeed })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ humidity: expected.humidity })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ airpressure: expected.airpressure })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ city: expected.city })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ zipcode: expected.zipcode })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ country: expected.country })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ createdAt: expected.createdAt })
      );

      sinon.assert.calledWith(response.json, sinon.match({ _v: expected._V }));
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
          _id: "610e354a131d8e53a36f11c9",
          temperature: 15,
          windSpeed: 8,
          humidity: 24,
          airpressure: 1030,
          city: "Johannesburg",
          zipcode: 2153,
          country: "South Africa",
          createdAt: "2021-08-07T07:24:58.151Z",
          __v: 0,
        },
        {
          _id: "610e2cc2c38e103be50257db",
          temperature: 13,
          windSpeed: 4,
          humidity: 67,
          airpressure: 1025,
          city: "Nairobi",
          zipcode: 64,
          country: "Kenya",
          createdAt: "2021-08-07T06:48:34.855Z",
          __v: 0,
        },
        {
          _id: "610e36e60610f9564ecda91f",
          temperature: 34,
          windSpeed: 15,
          humidity: 47,
          airpressure: 1006,
          city: "Cairo",
          zipcode: 11511,
          country: "Egypt",
          createdAt: "2021-08-07T07:31:50.969Z",
          __v: 0,
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
      sinon.assert.calledWith(response.json, expected);
    });

    it("should return empty array", function () {
      let expected = [];
      sinon.stub(Weather, "find").yields(null, expected);
      getWeathers(request, response);
      sinon.assert.calledWith(Weather.find, {});
      sinon.assert.calledWith(response.json, sinon.match.array);
      sinon.assert.calledWith(response.json, expected);
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledOnce(response.json);
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
        _id: "610e2cc2c38e103be50257db",
        temperature: 13,
        windSpeed: 4,
        humidity: 67,
        airpressure: 1025,
        city: "Nairobi",
        zipcode: 64,
        country: "Kenya",
        createdAt: "2021-08-07T06:48:34.855Z",
        __v: 0,
      };
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return Weather obj", function () {
      sinon.stub(Weather, "findById").yields(null, expected);
      getWeather(request, response);
      sinon.assert.calledWith(Weather.findById, request.params.weatherId);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ _id: expected._id })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ temperature: expected.temperature })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ windSpeed: expected.windSpeed })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ humidity: expected.humidity })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ airpressure: expected.airpressure })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ city: expected.city })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ zipcode: expected.zipcode })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ country: expected.country })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ createdAt: expected.createdAt })
      );

      sinon.assert.calledWith(response.json, sinon.match({ _v: expected._v }));
    });

    it("should return 404 for non-existing Weather id", function () {
      let error = new Error(
        `The record with the id ${request.params.weatherId} does not exist`
      );
      error.name = "CastError";
      sinon.stub(Weather, "findById").yields(error, null);
      getWeather(request, response);
      sinon.assert.calledWith(Weather.findById, request.params.weatherId);
      sinon.assert.calledWith(response.status, 404);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ error: error.message })
      );
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledOnce(response.json);
    });

    it("should return status 500 on server error", function () {
      let error = new Error();
      sinon.stub(Weather, "findById").yields(error);
      getWeather(request, response);
      sinon.assert.calledWith(Weather.findById, request.params.weatherId);
      sinon.assert.calledWith(response.status, 500);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ error: error.message })
      );
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledOnce(response.json);
    });
  });

  describe("deleteWeather", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns(response),
      };
    });

    afterEach(function () {
      sinon.restore();
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

  describe("updateWeather", function () {
    beforeEach(function () {
      res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() }),
      };
      expectedResult = req.body;
    });

    afterEach(function () {
      sinon.restore();
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
