const express = require("express");
const app = express();
const { isuserauth, isadminauth } = require("./middleware/auth");

app.get("/user/profile", isuserauth, (req, res) => {
  res.send("profile sent");
});
app.get("/user/profiledelete", isuserauth, (req, res) => {
  res.send("profile delete");
});
app.get("/admin", isadminauth, (req, res) => {
  res.send("admin data send");
});
app.post("/user/login", (req, res) => {
  res.send("logges in sucessfully");
});
app.listen(7777, () => {
  console.log(" server listining");
});
