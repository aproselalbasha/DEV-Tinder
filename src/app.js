require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const cookieparser = require("cookie-parser");
const app = express();
const { userauth } = require("./middleware/auth");
const cors = require("cors");
const http = require("http");
const { authroutes } = require("./routes/authroutes");
const { profileroute } = require("./routes/profile");
const requestRouter = require("./routes/request");
const userconnectionreq = require("./routes/userrouter");
const initializeSocket = require("./utils/socket");
const chatrouter = require("./routes/chat");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

app.use("/", authroutes);
app.use("/", profileroute);
app.use("/", requestRouter);
app.use("/", userconnectionreq);
app.use("/", chatrouter);

app.get("/sendconnection", userauth, async (req, res) => {
  try {
    res.send("request send");
  } catch (err) {
    res.send("error" + err);
  }
});
const server = http.createServer(app);
initializeSocket(server);
connectDB()
  .then(() => {
    console.log("DB started");

    server.listen(7777, () => {
      console.log("server listining port number 7777");
    });
  })
  .catch(() => {
    console.log("db not connected ");
  });
