const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    location: String,
    officeLocation: String,
    relationShipStatus: String,
    followers: [],
    followings: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
