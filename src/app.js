const express = require("express");
const app = express();
const { isuserauth, isadminauth } = require("./middleware/auth");

app.get("/user", (req, res) => {
  // try {
  //   throw new Error("its throwing error");
  //   res.send("profile sent");
  // } catch (err) {
  //   res.status(500).send("error");
  // }
  throw new Error("its throwing error");
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("error from middle ware");
  }
});
app.listen(7777, () => {
  console.log(" server listining");
});
