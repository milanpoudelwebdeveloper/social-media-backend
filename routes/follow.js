const express = require("express");
const { followUser } = require("../controllers/follow");

const router = express.Router();

router.post("/follow/:id", followUser);

module.exports = router;
