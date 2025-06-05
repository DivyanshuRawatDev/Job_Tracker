const express = require("express");
const {
  userSignup,
  userLogin,
  googleAuthLogin,
  authVerify
} = require("../controllers/user.controller");
const { authorization } = require("../middlewares/authorization");

const route = express.Router();

route.post("/signup", userSignup);
route.post("/login", userLogin);
route.post("/google", googleAuthLogin);
route.get("/verify",authorization,authVerify);

module.exports = route;
