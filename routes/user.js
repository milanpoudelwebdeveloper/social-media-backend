const express = require("express");
const { getUser, updateUser } = require("../controllers/user");

const router = express.Router();

router.get("/user/:id", getUser);

router.put("/user/:id", updateUser);

module.exports = router;
