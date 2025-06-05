const { default: mongoose, Schema } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    profilePic: { type: String},
    companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
