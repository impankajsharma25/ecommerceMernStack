const express = require("express");
const errorMiddleware = require("./middleware/Error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const product = require("./routes/productRoute");

const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(errorMiddleware);

module.exports = app;
