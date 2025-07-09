const express = require("express");
const { sendMessage } = require("../controllers/message.controller");

const route = express.Router();

route.post("/message", sendMessage);

module.exports = route;
