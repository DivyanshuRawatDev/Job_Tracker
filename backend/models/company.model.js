const { default: mongoose, mongo } = require("mongoose");

const companySchema = mongoose.Schema(
  {
    companyName: { type: String, required: true },
    designation: { type: String, required: true },
    appliedFrom: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contact: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Interview", "Rejected"],
      required: true,
      default: "Pending",
    },
    starWishList: { type: Boolean, default: false },
    notificationRejected: {
      type: Boolean,
      default: false,
    },
    followUpNotified: {
      type: Boolean,
      default: false,
    },
    followUpCount: {
      type: Number,
      default: 0,
    },
    lastFollowUpAt: {
      type: Date,
      default: null,
    },
    about: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model("Company", companySchema);

module.exports = { CompanyModel };
