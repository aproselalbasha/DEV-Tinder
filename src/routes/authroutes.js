const express = require("express");
const User = require("../models/user");

const { dataverify } = require("../utils/helper");
const cookieparser = require("cookie-parser");

const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(cookieparser());
const authroutes = express.Router();
authroutes.post("/signup", async (req, res) => {
  try {
    dataverify(req);
    const { firstName, emailId, passWord } = req.body;
    //password hash
    const passwordhash = await bcrypt.hash(passWord, 10);
    console.log(passwordhash);

    const user = new User({ firstName, emailId, passWord: passwordhash });

    const savedUser = await user.save();

    const token = await savedUser.getjwt();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
      httpOnly: true,
    });
    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("error saving user:" + err);
  }
});
authroutes.post("/signin", async (req, res) => {
  try {
    const { emailId, passWord } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid email");
    }
    //compare brypt password
    const ispasswordvalid = await user.validatepassword(passWord);
    if (!ispasswordvalid) {
      throw new Error("Invalid passord");
    } else {
      //createing jwt tokken
      const jwttokken = await user.getjwt();
      //creating cookies
      res.cookie("token", jwttokken, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("error saving user:" + err);
  }
});
authroutes.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) }),
    res.send("loggout sucessfull");
});
module.exports = { authroutes };
