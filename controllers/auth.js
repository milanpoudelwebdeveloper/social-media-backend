const User = require("../models/user");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  try {
    const newUser = await new User({
      firstName,
      lastName,
      username,
      password,
    }).save();
    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong while creating an account");
  }
};
