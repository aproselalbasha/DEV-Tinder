const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ayaan",
    lastName: "A",
    emailId: "ap.aprose@gmail.com",
    passWord: "Applemmac@786",
    age: "5.5",
    gender: "m",
  });
  await user.save();
  res.send("data saved");
});

connectDB()
  .then(() => {
    console.log("database connected");
    app.listen(7777, () => {
      console.log(" server listining");
    });
  })
  .catch((err) => console.log("data base not conncted"));
