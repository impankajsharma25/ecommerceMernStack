const validator = require("validator");

exports.register = {
  name: {
    in: ["body"],
    trim: true,
    notEmpty: true,
    errorMessage: `Please Enter your Name`,
    isString: {
      errorMessage: "Name must be string",
    },
    // maxLength: [30, "Name cannot Exceed 30 Characters"],
    // minLength: [4, "Name should have more than 4 Characters"],
  },
  email: {
    in: ["body"],
    trim: true,
    notEmpty: true,
    errorMessage: `Please Enter Your Email`,
    // unique : true,
    // validate: [validator.isEmail, "Please Enter a valid Email"],
    isString: {
      errorMessage: "Email must be string",
    },
  },
  password: {
    in: ["body"],
    notEmpty: true,
    errorMessage: `Please Enter your Password`,
    select: false,
    isString: {
      errorMessage: "password must be string",
    },
    // minLength: [0, "password should have more than 0 Characters"],
  },
  
};
