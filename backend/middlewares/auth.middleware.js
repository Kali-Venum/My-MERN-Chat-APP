const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      req.user = await UserModel.findById(decode.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized, Invalid token.");
    }
  }

  if(!token){
    res.status(401);
    throw new Error("No token found.");
  }
});

module.exports = {
    protect
}
