const ChatModel = require("../models/chat.model");
const UserModel = require("../models/user.model");

const accessChat = async (reqBody, reqUser) => {
  const { userId } = reqBody;

  if (!userId) {
    throw new Error("User id not exists.");
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

  isChat = await UserModel.populate(isChat, {
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

      const fullChat = await ChatModel.findOne({
        _id: createdChat._id,
      }).populate("users");

      return fullChat;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

const fetchChats = async (reqUser) => {
  return (allChats = await ChatModel.find({
    users: {
      $elemMatch: {
        $eq: reqUser._id,
      },
    },
  })
    .populate(["users", "groupAdmin", "latestMessage", "latestMessage.sender"])
    .sort({
      updatedAt: -1,
    }));
};

const createGroupChat = async (reqBody, reqUser) => {
  if (!reqBody && !reqBody.users && !reqBody.groupName) {
    throw new Error("Please enter all the fields.");
  } else {
    if (reqBody.users.length < 2) {
      throw new Error("2 users required to form a group chat.");
    } else {
      let allUsers = [...reqBody.users, reqUser._id];

      const groupChat = await ChatModel.create({
        chatName: reqBody.groupName,
        users: allUsers,
        isGroupChat: true,
        groupAdmin: reqUser._id,
      });

      return await ChatModel.findOne({ _id: groupChat._id }).populate([
        "users",
        "groupAdmin",
      ]);
    }
  }
};

const renameGroup = async (reqBody) => {
  const { chatRoomId, chatRoomName } = reqBody;

  return await ChatModel.findByIdAndUpdate(
    {
      _id: chatRoomId,
    },
    {
      chatName: chatRoomName,
    },
    {
      new: true,
    }
  ).populate(["users", "groupAdmin"]);
};

const addToGroup = async (reqBody) => {
  const { userId, chatRoomId } = reqBody;

  return await ChatModel.findByIdAndUpdate(
    {
      _id: chatRoomId,
    },
    {
      $push: {
        users: userId,
      },
    },
    {
      new: true,
    }
  ).populate(["users", "groupAdmin"]);
};

const removeFromGroup = async (reqBody) => {
  const { userId, chatRoomId } = reqBody;

  return await ChatModel.findByIdAndUpdate(
    {
      _id: chatRoomId,
    },
    {
      $pull: {
        users: userId,
      },
    },
    {
      new: true,
    }
  ).populate(["users", "groupAdmin"]);
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
};
