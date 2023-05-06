const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const processMultipart = require("express-fileupload/lib/processMultipart");

const port = 3001;

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

dotenv.config({ path: "./config/config.env" });


// config

// connecting to database

connectDatabase();

const server = app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
