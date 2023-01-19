const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

// User Routes.

// // User Login route.
// router.post(
//   "/login",
//   userController.userLogin
// );

router.post(
    "/register",
    userController.userRegistration
  );

module.exports = router;
