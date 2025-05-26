const express = require("express");
const { addNewCompanyDetails } = require("../controllers/company.controller");

const route = express.Router();

route.post("/add", addNewCompanyDetails);

module.exports = route;
