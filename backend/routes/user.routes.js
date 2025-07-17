const express = require("express");
const {
  userSignup,
  userLogin,
  googleAuthLogin,
  authVerify,
  userLogout,
  sendOTP,
  verifyOTP
} = require("../controllers/user.controller");
const { authorization } = require("../middlewares/authorization");

const route = express.Router();

route.post("/signup", userSignup);
route.post("/login", userLogin);
route.post("/google", googleAuthLogin);
route.get("/verify", authorization, authVerify);
route.get("/logout",authorization, userLogout);
route.post("/send-otp",sendOTP);
route.post("/verify-otp",verifyOTP);

module.exports = route;
