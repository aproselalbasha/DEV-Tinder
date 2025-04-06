const express = require("express");
const { connectDB } = require("./config/database");
const cookieparser = require("cookie-parser");
const app = express();
const { userauth } = require("./middleware/auth");
app.use(express.json());
app.use(cookieparser());
const { authroutes } = require("./routes/authroutes");
const { profileroute } = require("./routes/profile");
app.use("/", authroutes);
app.use("/", profileroute);
app.get("/sendconnection", userauth, async (req, res) => {
  try {
    res.send("request send");
  } catch (err) {
    res.send("error" + err);
  }
});

connectDB()
  .then(() => {
    console.log("DB started");

    app.listen(7777, () => {
      console.log("server listining port number 7777");
    });
  })
  .catch(() => {
    console.log("db not connected ");
  });
