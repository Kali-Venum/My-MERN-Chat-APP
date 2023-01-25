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

const fetchChats = asyncHandler(async (req, res) => {
  const chats = await chatServices.fetchChats(req.user);
  if (chats) {
    res.status(200).send({
      statusCode: 200,
      statusType: "SUCCESS",
      error: false,
      data: chats,
    });
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  const chats = await chatServices.createGroupChat(req.body, req.user);
  if (chats) {
    res.status(200).send({
      statusCode: 200,
      statusType: "SUCCESS",
      error: false,
      data: chats,
    });
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const chats = await chatServices.renameGroup(req.body);
  if (chats) {
    res.status(200).send({
      statusCode: 200,
      statusType: "SUCCESS",
      error: false,
      data: chats,
    });
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const chats = await chatServices.addToGroup(req.body, req.user);
  if (chats) {
    res.status(200).send({
      statusCode: 200,
      statusType: "SUCCESS",
      error: false,
      data: chats,
    });
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const chats = await chatServices.removeFromGroup(req.body, req.user);
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
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
};