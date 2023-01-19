const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      ref: "user",
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, ret, opt) => {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model("user", userSchema);
