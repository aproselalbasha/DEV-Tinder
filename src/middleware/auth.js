const jwt = require("jsonwebtoken");
const usermodel = require("../models/user");
const userauth = async (req, res, next) => {
  try {
    //getting cookie

    const { tokken } = req.cookies;
    if (!tokken) {
      return res.status(401).send("please login");
    }

    //verify jwt
    const uniqueauth = await jwt.verify(tokken, "Aprose@@@786");
    const { _id } = uniqueauth;
    const user = await usermodel.findById(_id);
    req.user = user;
    next();
  } catch (err) {
    res.send("error" + err);
  }
};
module.exports = { userauth };
