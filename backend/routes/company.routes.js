const express = require("express");
const {
  addNewCompanyDetails,
  deleteCompanyId,
  getAllCompanies,
  updateCompanyStatus
} = require("../controllers/company.controller");

const route = express.Router();

route.post("/add", addNewCompanyDetails);
route.get("/get", getAllCompanies);
route.patch("/update/status/:companyId",updateCompanyStatus);
route.delete("/delete/:companyId", deleteCompanyId);

module.exports = route;
