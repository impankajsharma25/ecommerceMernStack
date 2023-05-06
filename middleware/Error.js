const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //   wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //   Mongoosee duplicate error
  if (err.name === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //   wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid , try again`;
    err = new ErrorHandler(message, 400);
  }

  //  JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired , try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    messsage: err.message,
  });
};
