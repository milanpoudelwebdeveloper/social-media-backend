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
