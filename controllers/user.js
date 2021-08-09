const User = require("../models/User");

exports.createUser = (req, res) => {};

exports.getUsers = (req, res) => {};

exports.getUser = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
    } else {
      console.log(user);
    }
  });
};

exports.updateUser = (req, res) => {};

exports.deleteUser = (req, res) => {};
