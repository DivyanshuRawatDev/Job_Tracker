const express = require("express");
const {
  userFollowupNotification,
  clearSingleNotification,
  rejectFollowUpNotification,
} = require("../controllers/notification.controller");

const route = express.Router();

route.get("/notification", userFollowupNotification);
route.patch("/notification/clear/:id", clearSingleNotification);
route.patch("/notification/reject/:id", rejectFollowUpNotification);

module.exports = route;
