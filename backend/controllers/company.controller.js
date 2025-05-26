const { CompanyModel } = require("../models/company.model");
const { UserModel } = require("../models/user.model");

const addNewCompanyDetails = async (req, res) => {
  try {
    const { companyName, designation, appliedFrom, contact, status, about } =
      req.body;

    const user = await UserModel.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json({ message: "Invalid Req" });
    }

    const newCompany = await CompanyModel.create({
      companyName,
      designation,
      appliedFrom,
      contact,
      status,
      about,
    });

    user.companies.push(newCompany._id);

    await user.save();

    return res
      .status(201)
      .json({ message: "Company added successfully", data: newCompany });
  } catch (error) {
    console.log("Error while adding new company : " + error.message);
  }
};

module.exports = { addNewCompanyDetails };
