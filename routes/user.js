const express = require("express");
const { getUser, updateUser, deleteUser } = require("../controllers/user");

const router = express.Router();

router.get("/user/:id", getUser);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

module.exports = router;
