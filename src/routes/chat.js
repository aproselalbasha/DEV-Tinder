const express = require("express");
const { userauth } = require("../middleware/auth");
const { Chat } = require("../models/Chat");
const chatrouter = express.Router();
chatrouter.get("/chat/:targetuserid", userauth, async (req, res) => {
  const { targetuserid } = req.params;
  const userid = req.user._id;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [userid, targetuserid] },
    }).populate({
      path: "messages.senderid",
      select: "firstName",
    });
    if (!chat) {
      chat = new Chat({
        participants: [userid, targetuserid],
        messages: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    console.log(err);
  }
});
module.exports = chatrouter;
