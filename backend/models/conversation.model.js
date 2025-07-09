import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User" }, 
    ],
  },
  { timestamps: true }
);

const conversationModel = mongoose.model("Conversation", conversationSchema);

export { conversationModel };
