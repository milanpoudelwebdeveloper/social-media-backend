const User = require("../models/user");

//get a user

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password").exec();
    if (user) {
      res.status(200).json(user);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong while getting user", e);
  }
};

//if it is an admin
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentAdminStatus, password } = req.body;

  //need to verify all info so that only authorized users can update their info
  if (id === currentUserId || currentAdminStatus) {
    try {
      //if they want to update their password
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const updatedInfo = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedInfo);
    } catch (e) {
      console.log(e);
      res.status(400).send("Something went wrong while updating user", e);
    }
  } else {
    return res.status(403).send("Unauthorized, access denied");
  }
};

//if it is an admin

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentAdminStatus } = req.body;

  if (id === currentUserId || currentAdminStatus) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (e) {
      console.log(e);
      res.status(400).send("Something went wrong while deleting user", e);
    }
  } else {
    return res.status(403).send("Unauthorized, access denied");
  }
};
