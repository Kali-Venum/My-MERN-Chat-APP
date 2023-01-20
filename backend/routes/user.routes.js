const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

// User Routes.

// User login route.
router.post("/login", userController.userLogin);

// User registration route.
router.post("/register", userController.userRegistration);

// To get all users.
router.get("/all", protect, userController.allUsers);

module.exports = router;
