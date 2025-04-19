const express = require("express");
const User = require("../models/user");
const { userauth } = require("../middleware/auth");
const { profileeditvalidation } = require("../utils/helper");
const bcrypt = require("bcrypt");

const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieparser());
const profileroute = express.Router();
profileroute.get("/profile/view", async (req, res) => {
  try {
    const getcookie = req.cookies;
    const { tokken } = getcookie;
    if (!tokken) {
      return res.status(401).send("PLEASE LOGIN");
    }
    const istokkenvalid = await jwt.verify(tokken, "Aprose@@@786");
    const { _id } = istokkenvalid;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    res.send(user);
  } catch (err) {
    res.send("profile error" + err);
  }
});
profileroute.patch("/profile/edit", userauth, async (req, res) => {
  //santize the data
  try {
    const isValid = profileeditvalidation(req);
    if (!isValid) {
      throw new Error("unable to edit  restricted data");
    }
    const userdata = req.body;
    const loggedindata = req.user;
    Object.keys(userdata).forEach((key) => (loggedindata[key] = userdata[key]));
    await loggedindata.save();
    res.send(loggedindata);
  } catch (err) {
    res.send("inavled field" + err);
  }
});
profileroute.patch("/profile/password", userauth, async (req, res) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
  try {
    const { passWord } = req.body;
    if (!passWord) {
      throw new Error("please enter the password");
    }
    if (!strongPasswordRegex.test(passWord)) {
      throw new Error("please enter strong password ");
    }

    const userpasswordhash = await bcrypt.hash(passWord, 10);
    const user = await User.findById(req.user._id);
    user.passWord = userpasswordhash;
    await user.save();
    res.send("password updated ");
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).send("Error: " + err.message);
  }
});
module.exports = { profileroute };
