const express = require("express");
const { createUser, getUsers, getUserById, updateUser } = require("../controllers/userController");
const router = express.Router();

router.post("/login", createUser);
router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);

module.exports = router;
