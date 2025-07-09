import mongoose, { Schema } from "mongoose";

const messageSchema = mongoose.Schema(
  {
   
    message: { type: String },
    senderID: { type: Schema.Types.ObjectId },
    receiverID: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("message", messageSchema);

export { messageModel };
