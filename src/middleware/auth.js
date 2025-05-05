const jwt = require("jsonwebtoken");
const usermodel = require("../models/user");
const userauth = async (req, res, next) => {
  try {
    //getting cookie

    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("please login");
    }

    //verify jwt
    const uniqueauth = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = uniqueauth;
    const user = await usermodel.findById(_id);
    req.user = user;
    next();
  } catch (err) {
    res.send("error" + err);
  }
};
module.exports = { userauth };
