const socket = require("socket.io");
const { Chat } = require("../models/Chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });
  io.on("connection", (socket) => {
    socket.on("joinchat", ({ firstname, userid, targetuserid }) => {
      const roomid = [userid, targetuserid].sort().join("-");
      console.log(firstname + "joining room:" + roomid);
      socket.join(roomid);
    });

    socket.on(
      "sendmessage",
      async ({ firstname, userid, targetuserid, text }) => {
        try {
          const roomid = [userid, targetuserid].sort().join("-");
          console.log(text);
          let chat = await Chat.findOne({
            participants: { $all: [userid, targetuserid] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userid, targetuserid],
              messages: [],
            });
          }
          chat.messages.push({ senderid: userid, text });
          await chat.save();
          io.to(roomid).emit("newmessageReceived", { firstname, text });
        } catch (err) {
          console.log(err);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
