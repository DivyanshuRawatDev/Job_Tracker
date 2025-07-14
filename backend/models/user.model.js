const { default: mongoose, Schema } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: false,
    },
    gender: { type: String, enum: ["male", "female"], required: false },
    profilePic: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
    },
    companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
