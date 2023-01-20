const asyncHandler = require("express-async-handler");
const chatServices = require("../services/chat.services");

const accessChat = asyncHandler(async (req, res) => {
  const chats = await chatServices.accessChat(req.body, req.user);
  if (chats) {
    res.status(200).send({
      statusCode: 200,
      statusType: "SUCCESS",
      error: false,
      data: chats,
    });
  }
});

module.exports = {
    accessChat,
};