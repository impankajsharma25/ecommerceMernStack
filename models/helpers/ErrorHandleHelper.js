const chalk = require("chalk");
const { validationResult } = require("express-validator");

exports.customErrorLogger = (err) => {
  if (!(err instanceof Error)) {
    err = new Error(err);
  }
  console.log(chalk.red("✘"), err);
};

exports.requestValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(404).json(errors.array());
  }
  next();
};
