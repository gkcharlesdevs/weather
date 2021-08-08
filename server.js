const express = require("express");
const app = express();
const { config } = require("dotenv");
config({ path: "./config/config.env" });
const db = require("./config/db");

// Port
const port = 3300;

// connection to mongodb database server
db();

// Routes files
const weathers = require("./routes/weather");
//const auth = require("./routes/auth");
//const users = require("./routes/users");

// middleware
app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Mount routers

app.use("/api/v1/weathers", weathers);
//app.use("/api/v1/auth", auth);
//app.use("/api/v1/users", users);

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
