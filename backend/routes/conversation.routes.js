const express = require("express");
const {
  createNewConversation,
  getAllConversationUsers
} = require("../controllers/conversation.controller");

const route = express.Router();

route.get('/get-users',getAllConversationUsers);
route.post("/conversation", createNewConversation);


module.exports = route;
