const express = require("express");
const { userauth } = require("../middleware/auth");
const User = require("../models/user");
const user = require("../models/user");
const connectionrequest = require("../models/connectionreq");
const { default: mongoose } = require("mongoose");
const requestRouter = express.Router();
requestRouter.post(
  "/request/send/:status/:toUserId",
  userauth,
  async (req, res) => {
    try {
      //get the value of touserid,status,fromuserid
      const fromUserid = req.user._id;
      const toUserid = req.params.toUserId;
      const status = req.params.status;
      //checking randam userid came
      if (!mongoose.Types.ObjectId.isValid(toUserid)) {
        return res.status(400).json({ message: "Invalid toUserId format" });
      }
      //chck only allowed status like "ignored", "interested"
      const allowedstatus = ["ignored", "interested"];
      const isallowed = allowedstatus.includes(status);
      if (!isallowed) {
        return res
          .status(400)
          .json({ message: "invalid status type" + status });
      }
      //check touserid is avalable in db
      const touser = await User.findById(toUserid);
      if (!touser) {
        throw new Error("invalid touser");
      }
      // check not to send more then one req and toid also not to send requet
      const existingConnectionRequest = await connectionrequest.findOne({
        $or: [
          { fromUserid, toUserid },
          { fromUserid: toUserid, toUserid: fromUserid },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "connection request already exisist" });
      }
      //same user not to send interst to same user
      if (String(fromUserid) === String(toUserid)) {
        return res
          .status(400)
          .json({ message: "You cannot send a request to yourself." });
      }
      //save the request form db
      const connectionreq = new connectionrequest({
        fromUserid,
        toUserid,
        status,
      });
      const data = await connectionreq.save();
      res.send("request send sucessfully");
    } catch (err) {
      res.status(400).send("err" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestid",
  userauth,
  async (req, res) => {
    try {
      //get the input to perfom action
      const loginuser = req.user;

      const { status, requestid } = req.params;
      if (!mongoose.Types.ObjectId.isValid(requestid)) {
        throw new Error("invalid id");
      }
      // checking the valid  status
      const allowedstatus = ["accepted", "rejected"];
      if (!allowedstatus.includes(status)) {
        return res.status(400).json({ message: "invalid status" });
      }
      //checking login user is receiver

      const connectionreq = await connectionrequest.findOne({
        _id: requestid,
        toUserid: loginuser._id,
        status: "interested",
      });

      if (!connectionreq) {
        return res.status(400).json({ message: "request not found" });
      }
      connectionreq.status = status;
      const data = await connectionreq.save();
      res.json({
        message: "connection request" + status,
        data,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);
module.exports = requestRouter;
