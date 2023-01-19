const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

// const userLogin = async (reqBody) => {};

const userRegistration = async (reqBody) => {
  const { name, email, password, confirmPassword } = reqBody;

  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Please enter all the details.");
  }
  if (password !== confirmPassword) {
    throw new Error("Password & Confirm password is unmatched.");
  }

  const existingEmail = await UserModel.findOne({ email });
  console.log(existingEmail, "<<== existingEmail....")
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

module.exports = {
  //   userLogin,
  userRegistration,
};
