const express = require("express");
const { userauth } = require("../middleware/auth");
const connectionrequestmodel = require("../models/connectionreq");

const userconnectionreq = express.Router();
const User = require("../models/user");
// const USER_SAFE_DATA = "firstName lastName";
userconnectionreq.get("/user/request/received", userauth, async (req, res) => {
  try {
    const loguser = req.user;

    const allrequest = await connectionrequestmodel
      .find({
        toUserid: loguser,
        status: "interested",
      })
      .populate("fromUserid", ["firstName", "lastName"]);

    res.json({ message: "data receved", data: allrequest });
  } catch (err) {
    res.send(err);
  }
});

userconnectionreq.get("/user/connection", userauth, async (req, res) => {
  try {
    const loggedinuser = req.user;

    const userconnection = await connectionrequestmodel
      .find({
        $or: [
          { fromUserid: loggedinuser._id, status: "accepted" },
          { toUserid: loggedinuser._id, status: "accepted" },
        ],
      })
      .populate("fromUserid", "firstName")
      .populate("toUserid", "firstName");
    const data = userconnection.map((row) => {
      if (row.fromUserid._id.toString() === row.toUserid._id.toString()) {
        return row.toUserid;
      } else return row.fromUserid;
    });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: "ERROR", data: err });
  }
});

userconnectionreq.get("/feed", userauth, async (req, res) => {
  try {
    const loginuser = req.user;
    const pageno = parseInt(req.query.pageno) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 10 ? 10 : limit;
    const skip = (pageno - 1) * limit;
    const allrequest = await connectionrequestmodel
      .find({
        $or: [{ fromUserid: loginuser._id }, { toUserid: loginuser._id }],
      })
      .select("fromUserid toUserid");
    const hideuser = new Set();
    allrequest.forEach((req) => {
      hideuser.add(req.fromUserid.toString());
      hideuser.add(req.toUserid.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideuser) } },
        { _id: { $ne: loginuser._id } },
      ],
    })
      .select("firstName lastName photoUrl age gender ")
      .skip(skip)
      .limit(limit);

    console.log(users);
    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: "error", err: err.message });
  }
});
module.exports = userconnectionreq;
