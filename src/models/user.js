const mongoose = require("mongoose");
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
    },
    passWord: {
      type: String,
      default: "applemac786",
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("invalid gender");
        }
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", Userschema);
