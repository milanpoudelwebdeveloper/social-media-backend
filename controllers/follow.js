const User = require("../models/user");

//follow a user
exports.followUser = async (req, res) => {
  const { id } = req.params;

  const { currentUserId } = req.body;
  //user can't follow himself/herself
  if (currentUserId === id) {
    return res.status(403).send("You can't follow yourself, action forbidden");
  } else {
    try {
      //first we have to find the user that user wants to follow so

      await User.findByIdAndUpdate(id, {
        $push: { followers: currentUserId },
      });
      //likewise when a user follows another user, his/her following should be updated too
      await User.findByIdAndUpdate(currentUserId, {
        $push: { following: id },
      });
    } catch (e) {
      console.log(e);
      res.status(400).send("Something went wrong while following user", e);
    }
  }
};
