const express = require("express");
const app = express();
app.listen(7777);
app.use("/test", (req, res) => {
  res.send("test created sucessfully ");
});
app.use("/hello", (req, res) => {
  res.send("hello page created");
});
app.use((req, res) => {
  res.send("app created sucessfully");
});
