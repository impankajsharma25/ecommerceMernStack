const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.DATABASE;
const connectDatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/EcommercePankaj", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Connected to database : ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
