const express = require("express");
const app = express();
const router = require("../routes/router");
const cors = require("cors");

// basic config
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use("/",router);


module.exports = app;