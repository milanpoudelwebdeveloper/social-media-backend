const User = require("../models/user");

//get a user

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    if (user) {
      res.status(200).json(user);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("Something went wrong while getting user", e);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentAdminStatus } = req.body;

  //need to verify all info so that only authorized users can update their info
  if (id === currentUserId || currentAdminStatus) {
    try {
      const updatedInfo = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedInfo);
    } catch (e) {
      console.log(e);
      res.status(400).send("Something went wrong while updating user", e);
    }
  }
};
