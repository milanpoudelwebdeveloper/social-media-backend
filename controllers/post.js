const Post = require("../models/post");

exports.createPost = async (req, res) => {
  const postData = req.body;
  try {
    const post = await new Post(postData).save();
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong while creating post", e);
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const foundPost = await Post.findById(postId);

    if (foundPost.userId === userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json("Post updated successfully");
    } else {
      return res
        .status(403)
        .send("Unauthorized, you can only update your post");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong while updating post", e);
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const foundPost = await Post.findById(postId);
    //checking if the post belongs to the user
    if (userId === foundPost.userId) {
      await Post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      return res
        .status(403)
        .send("Unauthorized, you can only delete your post");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong while deleting post", e);
  }
};
