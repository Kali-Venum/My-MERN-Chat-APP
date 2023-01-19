// require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectToDB = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URI);
    if (connection) {
      console.log("Mongodb connected successfully.");
    }
  } catch (error) {
    console.log("Error:-", error.message);
    process.exit();
  }
};

module.exports = connectToDB;
