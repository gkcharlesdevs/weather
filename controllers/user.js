const User = require("../models/User");

exports.createUser = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      res.status(500);
      return res.json({ error: err.message });
    } else {
      res.status(200);
      res.json(user);
    }
  });
};

exports.getUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500);
      res.json({ error: err.message });
    } else {
      res.status(200);
      res.json(user);
    }
  });
};

exports.getUser = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      if (err.name === "CastError") {
        res.status(404);
        return res.json({ error: err.message });
      }

      res.status(500);
      res.json({ error: err.message });
    } else {
      res.status(200);
      res.json(user);
    }
  });
};

exports.updateUser = (req, res) => {};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.userId, (err, user) => {
    if (err) {
      if (err.name === "CastError") {
        res.status(404);
        return res.json({ error: err.message });
      }

      res.status(500);
      return res.json({ error: err.message });
    } else {
      res.status(200);
      res.json({ message: `User with the ${req.params.userId} deleted` });
    }
  });
};
