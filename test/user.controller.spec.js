const sinon = require("sinon");
const User = require("../models/User");
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");

describe("User Controller", function () {
  let request = {
      body: {
        name: "Josiah Mensah",
        email: "josiah.mensah@itlock.com",
        role: "user",
      },
      params: {
        userId: "610e2cc2c38e103be50257db",
      },
    },
    error,
    response = {},
    expected;

  describe("createUser", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns(response),
      };
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return user object", function () {
      expected = {
        _id: "610e2cc2c38e103be50257db",
        name: "Josiah Mensah",
        email: "josiah.mensah@itlock.com",
        role: "user",
        createdAt: "2021-08-07T06:48:34.855Z",
        __v: 0,
      };
      sinon.stub(User, "create").yields(null, expected);
      createUser(request, response);
      sinon.assert.calledWith(User.create, request.body);
      sinon.assert.calledWith(response.status, 200);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ _id: expected._id })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ name: expected.name })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ email: expected.email })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ role: expected.role })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ createdAt: expected.createdAt })
      );

      sinon.assert.calledWith(response.json, sinon.match({ _v: expected._v }));
      sinon.assert.calledOnce(response.json);
      sinon.assert.calledOnce(response.status);
    });

    it("should return status 500 on server error", function () {
      let error = new Error();
      sinon.stub(User, "create").yields(error); // For the error message check mongoose documentation
      createUser(request, response);
      sinon.assert.calledWith(User.create, request.body);
      sinon.assert.calledWith(response.status, 500);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ error: error.message })
      );
      sinon.assert.calledOnce(response.json);
      sinon.assert.calledOnce(response.status);
    });
  });

  describe("getUsers", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns(response),
      };
      expected = [
        {
          _id: "610e354a131d8e53a36f11c9",
          name: "Donogan Richie",
          email: "donogan.richie@outlook.com",
          role: "user",
          createdAt: "2021-08-07T07:24:58.151Z",
          __v: 0,
        },
        {
          _id: "610e2cc2c38e103be50257db",
          name: "Blessing Kinks",
          email: "blessing.kinks@itlock.com",
          role: "user",
          createdAt: "2021-08-07T06:48:34.855Z",
          __v: 0,
        },
        {
          _id: "610e36e60610f9564ecda91f",
          name: "Uchia Hush",
          email: "uchia.hush@itlock.com",
          role: "user",
          createdAt: "2021-08-07T07:31:50.969Z",
          __v: 0,
        },
      ]; // this should be replaced with mock
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return array of users", function () {
      sinon.stub(User, "find").yields(null, expected);
      getUsers(request, response);
      sinon.assert.calledWith(User.find, {});
      sinon.assert.calledWith(response.json, sinon.match.array);
      sinon.assert.calledWith(response.json, expected);
      sinon.assert.calledOnce(response.json);
      sinon.assert.calledOnce(response.status);
    });

    it("should return empty array", function () {
      let expected = [];
      sinon.stub(User, "find").yields(null, expected);
      getUsers(request, response);
      sinon.assert.calledWith(User.find, {});
      sinon.assert.calledWith(response.json, sinon.match.array);
      sinon.assert.calledWith(response.json, expected);
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledOnce(response.json);
    });

    it("should return status 500 on server error", function () {
      let error = new Error();
      sinon.stub(User, "find").yields(error);
      getUsers(request, response);
      sinon.assert.calledWith(User.find, {});
      sinon.assert.calledWith(response.status, 500);
      sinon.assert.calledWith(
        response.json,
        sinon.match({
          error: error.message,
        })
      );
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledOnce(response.json);
    });
  });

  describe("getUser", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns(response),
      };
      expected = {
        _id: "610e2cc2c38e103be50257db",
        name: "Blessing Kinks",
        email: "blessing.kinks@itlock.com",
        role: "user",
        createdAt: "2021-08-07T06:48:34.855Z",
        __v: 0,
      };
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return user object", function () {
      sinon.stub(User, "findById").yields(null, expected);
      getUser(request, response);
      sinon.assert.calledWith(User.findById, request.params.userId);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ _id: expected._id })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ name: expected.name })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ email: expected.email })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ role: expected.role })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ createdAt: expected.createdAt })
      );

      sinon.assert.calledWith(response.json, sinon.match({ _v: expected._v }));
      sinon.assert.calledWith(response.status, 200);
      sinon.assert.calledOnce(response.json);
      sinon.assert.calledOnce(response.status);
    });

    it("should return 404 for non-existing User id", function () {
      let error = new Error(
        `The record with the id ${request.params.weatherId} does not exist`
      );
      error.name = "CastError";
      sinon.stub(User, "findById").yields(error, null);
      getUser(request, response);
      sinon.assert.calledWith(User.findById, request.params.userId);
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
      sinon.stub(User, "findById").yields(error);
      getUser(request, response);
      sinon.assert.calledWith(User.findById, request.params.userId);
      sinon.assert.calledWith(response.status, 500);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ error: error.message })
      );
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledOnce(response.json);
    });
  });

  describe("deleteUser", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns(response),
      };
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return the deleted user", function () {
      sinon.stub(User, "findByIdAndDelete").yields(null, {});
      deleteUser(request, response);
      sinon.assert.calledWith(User.findByIdAndDelete, request.params.userId);
      sinon.assert.calledWith(
        response.json,
        sinon.match({
          message: `User with the ${request.params.userId} deleted`,
        })
      );
    });

    it("should return 404 for non-existing user id", function () {
      let error = new Error(
        `The user record with the id ${request.params.userId} does not exist`
      );
      error.name = "CastError";
      sinon.stub(User, "findByIdAndDelete").yields(error, null);
      deleteUser(request, response);
      sinon.assert.calledWith(User.findByIdAndDelete, request.params.userId);
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
      sinon.stub(User, "findByIdAndDelete").yields(error, null);
      deleteUser(request, response);
      sinon.assert.calledWith(User.findByIdAndDelete, request.params.userId);
      sinon.assert.calledWith(response.status, 500);
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledOnce(response.json);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ error: error.message })
      );
    });
  });

  describe("updateWeather", function () {
    beforeEach(function () {
      response = {
        json: sinon.spy(),
        status: sinon.stub().returns(response),
      };
      expected = request.body;
    });

    afterEach(function () {
      sinon.restore();
    });

    it("should return updated User object", function () {
      let request = {
        body: {
          name: "Kingley Impela",
          email: "kingley.impela@out.com",
        },
        params: {
          weatherId: "610e2cc2c38e103be50257db",
        },
      };

      let expected = {
        _id: "610e2cc2c38e103be50257db",
        name: "Kingley Impela",
        email: "kingley.impela@out.com",
        role: "user",
        createdAt: "2021-08-07T06:48:34.855Z",
        _V: 0,
      };
      sinon.stub(User, "findByIdAndUpdate").yields(null, expected);
      updateUser(request, response);
      sinon.assert.calledWith(
        User.findByIdAndUpdate,
        request.params.userId,
        request.body,
        { new: true }
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ _id: expected._id })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ name: expected.name })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ email: expected.email })
      );
      sinon.assert.calledWith(
        response.json,
        sinon.match({ role: expected.role })
      );

      sinon.assert.calledWith(
        response.json,
        sinon.match({ createdAt: expected.createdAt })
      );
      sinon.assert.calledWith(response.json, sinon.match({ _v: expected._v }));
      sinon.assert.calledWith(response.status, 200);
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledOnce(response.json);
    });

    it("should return 404 for non-existing user id", function () {
      let error = new Error(
        `The user record with the id ${request.params.userId} does not exist`
      );
      error.name = "CastError";
      sinon.stub(User, "findByIdAndUpdate").yields(error, null);
      updateUser(request, response);
      sinon.assert.calledWith(
        User.findByIdAndUpdate,
        request.params.userId,
        request.body,
        sinon.match({ new: true })
      );
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
      sinon.stub(User, "findByIdAndUpdate").yields(error, null);
      updateUser(request, response);
      sinon.assert.calledWith(
        User.findByIdAndUpdate,
        request.params.userId,
        request.body,
        sinon.match({ new: true })
      );
      sinon.assert.calledWith(response.status, 500);
      sinon.assert.calledOnce(response.status);
      sinon.assert.calledWith(
        response.json,
        sinon.match({ error: error.message })
      );
      sinon.assert.calledOnce(response.json);
    });
  });
});
