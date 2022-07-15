const express = require("express");
const {
  createPost,
  updatePost,
  getPost,
  deletePost,
  likePost,
} = require("../controllers/post");
const router = express.Router();

router.post("/post", createPost);
router.get("/post/:id", getPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);
router.put("/post/like/:id", likePost);

module.exports = router;
