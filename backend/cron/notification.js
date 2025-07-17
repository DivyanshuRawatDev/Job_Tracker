const cron = require("node-cron");
const { CompanyModel } = require("../models/company.model");

cron.schedule("0 0 * * *", async () => {
  console.log("Running follow-up notification");

  const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);

  const pendingCompanies = await CompanyModel.find({
    status: "Pending",

    createdAt: { $lte: fourDaysAgo },
    notificationRejected: false,
    followUpNotified: false,
    $or: [{ lastFollowUpAt: null }, { lastFollowUpAt: { $lte: fourDaysAgo } }],
  });

  console.log(pendingCompanies);

  for (let company of pendingCompanies) {
    company.followUpNotified = true;
    company.followUpCount += 1;
    company.lastFollowUpAt = new Date();
    await company.save();
    console.log(`Notification: Follow up with ${company.companyName}`);
  }
});
