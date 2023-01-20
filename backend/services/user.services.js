const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const userLogin = async (reqBody) => {
  const { email, password } = reqBody;
  if (!email || !password) {
    throw new Error("Please enter all the details.");
  } else {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid user credentials.");
    } else {
      const checkedPassword = await bcrypt.compare(password, user.password);
      if (checkedPassword) {
        return user;
      } else {
        throw new Error("Invalid user credentials.");
      }
    }
  }
};

const userRegistration = async (reqBody) => {
  const { name, email, password, confirmPassword } = reqBody;

  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Please enter all the details.");
  }
  if (password !== confirmPassword) {
    throw new Error("Password & Confirm password is unmatched.");
  }

  const existingEmail = await UserModel.findOne({ email });
  console.log(existingEmail, "<<== existingEmail....");
  if (existingEmail) {
    throw new Error("Someone registered with this email previously.");
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password.toString(), salt);

    const user = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    if (newUser) {
      return newUser;
    }
  }
};

const allUsers = async (reqQuery, reqUser) => {
  const keyword = reqQuery.search
    ? {
        $or: [
          {
            name: {
              $regex: reqQuery.search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: reqQuery.search,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const users = await UserModel.find(keyword).find({
    _id: { $ne: reqUser._id },
  });
  if (users) {
    return users;
  }
};

module.exports = {
  userLogin,
  userRegistration,
  allUsers,
};
