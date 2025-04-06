const express = require("express");
const User = require("../models/user");

const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieparser());
const profileroute = express.Router();
profileroute.get("/profile", async (req, res) => {
  try {
    const getcookie = req.cookies;
    const { tokken } = getcookie;
    if (!tokken) {
      throw new Error("invalid tokken");
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
module.exports = { profileroute };
