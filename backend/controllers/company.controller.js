const { CompanyModel } = require("../models/company.model");
const { UserModel } = require("../models/user.model");
const { geminiModel, getCompanySummary } = require("../utils/gemini");

const addNewCompanyDetails = async (req, res) => {
  try {
    const { companyName, designation, appliedFrom, contact, status, about } =
      req.body;

    const user = await UserModel.findOne({ _id: req.userId });

    if (!user) {
      return res.status(400).json({ message: "Invalid Req" });
    }

    const AIsummary = await getCompanySummary(about);

    const newCompany = await CompanyModel.create({
      companyName,
      designation,
      appliedFrom,
      contact,
      status,
      about: AIsummary ? AIsummary : about,
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

const getAllCompanies = async (req, res) => {
  const { userId } = req;
  try {
    const user = await UserModel.findOne({ _id: userId }).populate("companies");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ companies: user.companies });
  } catch (error) {
    console.log("Error whole getting all companies : " + error.message);
  }
};

const deleteCompanyId = async (req, res) => {
  const { companyId } = req.params;
  const { userId } = req;

  try {
    const deletedCompany = await CompanyModel.findOneAndDelete({
      _id: companyId,
    });

    await UserModel.updateOne(
      { _id: userId },
      { $pull: { companies: companyId } }
    );

    res
      .status(200)
      .json({ message: "Deleted successfully", data: deletedCompany });
  } catch (error) {
    console.log("Error while delete company : " + error.message);
  }
};

const updateCompanyStatus = async (req, res) => {
  const { companyId } = req.params;
  const { status } = req.body;
  try {
    const company = await CompanyModel.findOne({ _id: companyId });

    if (!status) {
      res.status(400).json({ message: "Invalid Req" });
    }

    company.status = status;

    await company.save();

    res.status(200).json({ message: "Update status", data: company });
  } catch (error) {
    console.log(" Error while update company status : " + error.message);
  }
};

module.exports = {
  addNewCompanyDetails,
  deleteCompanyId,
  getAllCompanies,
  updateCompanyStatus,
};
