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

//get a single post details
exports.getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.find({ _id: postId });
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong while getting post", e);
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

//like-dislike a post

exports.likePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findById(postId);
    //we have to check if a user has liked the post, if not liked we will make they like it when they press on button
    if (!post.likes.includes(userId)) {
      await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
      return res.status(200).json("Post liked successfully");
    } else {
      //if user presses on the button and if they have liked it before we have to make them dislike it
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      return res.status(200).json("Post disliked successfully");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong while liking post", e);
  }
};
