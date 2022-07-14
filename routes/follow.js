const express = require("express");
const { followUser, unfollowUser } = require("../controllers/follow");

const router = express.Router();

router.put("/follow/:id", followUser);
router.put("/unfollow/:id", unfollowUser);

module.exports = router;
