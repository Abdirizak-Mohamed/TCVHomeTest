// Importing modules
var express = require("express");
var mongoose = require("mongoose");
const port = process.env.PORT || 3005;
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize express app
var app = express();

// Mongodb connection url
var MONGODB_URI = "mongodb://localhost:27017/tcvcodingchallenge";

//Enable Cross-Origin-Requst and intialise BodyParser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
const conn = mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//Log Successful DB connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB @ 27017");
});

// Importing route
const comments = require("./routes/comments");

// Use comment route when url matches
app.use("/comment", comments);

// Creating server
app.listen(port, () => {
  console.log("Server running at port: " + port);
});
