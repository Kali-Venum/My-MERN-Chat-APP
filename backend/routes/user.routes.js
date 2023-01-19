const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

// User Routes.

// User login route.
router.post(
  "/login",
  userController.userLogin
);

// User registration route.
router.post(
    "/register",
    userController.userRegistration
  );

module.exports = router;
