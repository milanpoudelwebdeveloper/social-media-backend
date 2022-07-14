const express = require("express");
const { createPost, updatePost } = require("../controllers/post");
const router = express.Router();

router.post("/post", createPost);
router.put("/post/:id", updatePost);

module.exports = router;
