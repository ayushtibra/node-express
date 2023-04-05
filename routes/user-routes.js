const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
} = require("../controller/users-controller");

const router = express.Router();

router.get("/", getAllUsers);

router.post("/signup", registerUser);

router.post("/login", loginUser);

module.exports = router;
