const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controllers");

const router = express.Router();

//GET Routes
//Get Users
router.get("/", usersController.getUsers);

//POST Routes
//Post Method to Signup // Express Validator
//Post Method to Login
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
router.post("/login", usersController.login);

module.exports = router;
