// config connenction to database
const mongoose = require("mongoose");

const connect = function () {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err) {
      console.log("Connection to localhost:27017/weatherapp esatblished");
    }
  );
};

module.exports = connect;
