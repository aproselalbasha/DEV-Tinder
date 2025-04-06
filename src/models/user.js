const mongoose = require("mongoose");
const validate = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Userschema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 8,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: function (value) {
        if (!validate.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      timestamps: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("invalid gender");
        }
      },
    },
    skills: { type: [String] },
    passWord: {
      type: String,
      validate: function (value) {
        if (!validate.isStrongPassword(value)) {
          throw new Error("please enter strong password");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);
Userschema.methods.getjwt = async function () {
  const user = this;
  const tokken = await jwt.sign({ _id: user._id }, "Aprose@@@786", {
    expiresIn: "1d",
  });
  return tokken;
};
Userschema.methods.validatepassword = async function (passwordsendbyuser) {
  const user = this;
  const passwordhash = user.passWord;
  const ispasswordvalid = await bcrypt.compare(
    passwordsendbyuser,
    passwordhash
  );
  return ispasswordvalid;
};
module.exports = mongoose.model("User", Userschema);
