const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const userExists = await User.findOne({ username }).exec();

  if (userExists) {
    return res
      .status(400)
      .send("Username already exists.Please try with another username");
  }
  try {
    const user = {
      firstName,
      lastName,
      username,
      password,
    };
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await new User(user).save();
    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong while creating an account");
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userNameExists = await User.findOne({ username }).exec();
    if (userNameExists) {
      const passwordMatch = await bcrypt.compare(
        password,
        userNameExists.password
      );
      if (passwordMatch) {
        return res.status(200).send("Login Successful");
      } else {
        return res.status(401).send("Invalid Password");
      }
    } else {
      return res.status(400).send("Username doesn't exist. Please try again");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong while logging in");
  }
};
