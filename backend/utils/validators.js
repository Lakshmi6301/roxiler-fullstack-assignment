const { body } = require("express-validator")

exports.signupValidation = [
  body("name").isLength({ min: 20, max: 60 }),
  body("email").isEmail(),
  body("password").matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/),
  body("address").isLength({ max: 400 })
]
