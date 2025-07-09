const { conversationModel } = require("../models/conversation.model");
const { messageModel } = require("../models/message.model");
const { UserModel } = require("../models/user.model");

const createNewConversation = async (req, res) => {
  try {
    const { senderID, receiverID } = req.body;

    if (!senderID || !receiverID) {
      return res.status(400).json({ message: "Something went wrong!" });
    }

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderID, receiverID] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderID, receiverID],
      });
      console.log("New conversation created:", conversation._id);
    } else {
      console.log("Existing conversation found:", conversation._id);
    }

    const messages = await messageModel
      .find({
        $or: [
          { senderID, receiverID },
          { receiverID: senderID, senderID: receiverID },
        ],
      })
      .sort({ createdAt: 1 });

    return res.status(201).json({
      message: "New conversation created",
      conversation,
      messages,
    });
  } catch (error) {
    console.log("Error while create new conversation : " + error.message);
  }
};

const getAllConversationUsers = async (req, res) => {
  try {
    const userID = req.userId;
    const allUsers = await UserModel.find({ _id: { $ne: userID } }).select("-companies");
    return res.status(200).json({ data: allUsers });
  } catch (error) {
    console.log("Error while getAllConversation Users" + error.message);
  }
};

module.exports = { createNewConversation, getAllConversationUsers };
