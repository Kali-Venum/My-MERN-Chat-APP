const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");
const { protect } = require("../middlewares/auth.middleware");

// User Routes.

// Access chats of a user.
router.post("/", protect, chatController.accessChat);

// // Fetch all chats of that uiser.
// router.get("/", protect, userController.fetchChats);

// // Fetch all chats of that uiser.
// router.get("/group", protect, userController.createGroupChat);

// // Fetch all chats of that uiser.
// router.get("/rename", protect, userController.renameGroup);

// // Fetch all chats of that uiser.
// router.put("/groupremove", protect, userController.removeFromGroup);

// // Fetch all chats of that uiser.
// router.put("/groupadd", protect, userController.addToGroup);

module.exports = router;
