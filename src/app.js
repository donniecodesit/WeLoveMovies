if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();

const notFoundHandler = require("./errors/notFoundHandler.js");
const errorHandler = require("./errors/errorHandler.js");

const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));


//Not Found Handler
app.use(notFoundHandler);

//Error Handler
app.use(errorHandler);

module.exports = app;
