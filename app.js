const cl = console.log;

const express = require("express");
const app = express();

const cors = require("cors");
const router = require("./routes/productRoutes");

app.use(express.json());
app.use(cors());
app.use("/api/product", router);

module.exports = app;