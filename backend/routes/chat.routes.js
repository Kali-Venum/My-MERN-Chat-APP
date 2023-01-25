const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");
const { protect } = require("../middlewares/auth.middleware");

// User Routes.

// Access chats of a user.
router.post("/", protect, chatController.accessChat);

// Fetch all chats of that user.
router.get("/", protect, chatController.fetchChats);

// Create a new group chat.
router.post("/group", protect, chatController.createGroupChat);

// Rename a chat group name.
router.put("/rename", protect, chatController.renameGroup);

// Add a user to a group.
router.put("/groupadd", protect, chatController.addToGroup);

// Remove a user from a group.
router.delete("/groupremove", protect, chatController.removeFromGroup);



module.exports = router;
