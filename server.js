const express = require("express");
const app = express();
const { config } = require("dotenv");
config({ path: "./config/config.env" });
const db = require("./config/db");

// Port
const port = 3300;

// connection to mongodb database server
db();

// middleware
app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
