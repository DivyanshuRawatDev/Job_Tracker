const { messageModel } = require("../models/message.model");
const { getIO } = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { senderID, receiverID, message, roomID } = req.body;

    const newMessage = await messageModel.create({
      senderID,
      receiverID,
      message,
    });

    // sending message to frontend :-
    const io = getIO();
    io.to(roomID).emit("message", { message, senderID });

    return res.status(201).json({ message: "new Message", data: newMessage });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage };
