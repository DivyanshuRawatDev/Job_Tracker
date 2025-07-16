const { CompanyModel } = require("../models/company.model");

const userFollowupNotification = async (req, res) => {
  try {
    const notifications = await CompanyModel.find({
      followUpNotified: true,
      notificationRejected: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({ data: notifications || [] });
  } catch (error) {
    console.log("Error while followup notification" + error.message);
  }
};

const clearSingleNotification = async (req, res) => {
  try {
    const companyID = req.params.id;
    const company = await CompanyModel.findOne({ _id: companyID });
    if (!company) return res.status(404).json({ message: "Company not found" });

    company.followUpNotified = false;
    company.lastFollowUpAt = new Date();
    await company.save();
    res.status(200).json({ message: "Notification cleared", data: company });
  } catch (error) {
    console.log("Error while clear single notification" + error.message);
  }
};

const rejectFollowUpNotification = async (req, res) => {
  try {
    const companyID = req.params.id;
    const company = await CompanyModel.findOne({ _id: companyID });
    if (!company) return res.status(404).json({ message: "Company not found" });

    company.status = "Rejected";

    company.notificationRejected = true;
    company.followUpNotified = false;

    await company.save();

    res
      .status(200)
      .json({ message: "Notification rejected forever", data: company });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userFollowupNotification,
  clearSingleNotification,
  rejectFollowUpNotification,
};
