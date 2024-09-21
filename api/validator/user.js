const { body, query } = require("express-validator");
const User = require('../models/user')

exports.userCreateValidator = [
    body("userName")
        .exists()
        .notEmpty()
        .withMessage('fullName required'),
    body('password')
        .exists()
        .withMessage('password required'),
    body('email')
        .exists()
        .notEmpty()
        .withMessage('email required')
        .custom(async value => {
            let checkUser = await User.findOne({ email: value.toLowerCase() })
            if (checkUser) {
                return Promise.reject("Email already exist.");
            }
        }),
]

