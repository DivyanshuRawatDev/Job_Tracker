const { default: mongoose, mongo } = require("mongoose");

const companySchema = mongoose.Schema(
  {
    companyName: { type: String, required: true },
    designation: { type: String, required: true },
    appliedFrom: { type: String, required: true },
    contact: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Interview", "Rejected"],
      required: true,
      default: "Pending",
    },
    about: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model("company", companySchema);

module.exports = { CompanyModel };
