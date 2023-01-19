const asyncHandler = require("express-async-handler");
const userServices = require("../services/user.services");

// const userLogin = asyncHandler(async (req, res) => {
//   const user = await userServices.userLogin(req.body);
// });

const userRegistration = asyncHandler(async (req, res) => {
  const user = await userServices.userRegistration(req.body);
  if (user) {
    res.status(201).send({
      statusCode: 200,
      statusType: "SUCCESS",
      error: false,
      data: user,
    });
  }
});

module.exports = {
//   userLogin,
  userRegistration,
};
