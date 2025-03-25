const mongoose = require("mongoose");
const Userschema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  passWord: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
});
module.exports = mongoose.model("User", Userschema);
