const ChatModel = require("../models/chat.model");
const userModel = require("../models/user.model");

const accessChat = async (reqBody, reqUser) => {
  const { userId } = reqBody;

  if (!userId) {
  }

  let isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      {
        users: {
          $elemMatch: {
            $eq: reqUser._id,
          },
        },
      },
      {
        users: {
          $elemMatch: {
            $eq: userId,
          },
        },
      },
    ],
  })
    .populate("users")
    .populate("latestMessage");

  isChat = await userModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    return isChat[0];
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [reqUser._id, userId],
    };

    try {
      const createdChat = await ChatModel.create(chatData);

      const FullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users");
      return FullChat;
    } catch (error) {}
  }
};

module.exports = {
  accessChat,
};
