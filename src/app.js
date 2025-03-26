const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
app.use(express.json());

const User = require("./models/user");
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("data stored in database");
  } catch (err) {
    res.status(400).send("error saving user:" + err);
  }
});

// app.get("/user", async (req, res) => {
//   const useremail = req.body.emailId;
//   try {
//     const user = await User.findOne({ emailId: useremail });
//     if (user.length === 0) {
//       res.send("user not found");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     console.log("something went wrong");
//   }
// });
//delete user
// app.delete("/user", async (req, res) => {
//   const userid = req.body.userid;
//   console.log(userid);
//   try {
//     await User.findByIdAndDelete(userid);
//     res.send("deleted the user ");
//   } catch (err) {
//     console.log("something went wrong");
//   }
// });
// update the user
app.patch("/user", async (req, res) => {
  const userid = req.body._id;
  const data = req.body;

  try {
    const userupdate = await User.findByIdAndUpdate({ _id: userid }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(userupdate);
    res.send("user detail updated");
  } catch (err) {
    console.log("something went wrong");
    res.send("invalid gender" + err);
  }
});
// app.get("/feed", async (req, res) => {
//   const userid = req.body.id;

//   try {
//     const user = await User.findById({ _id: userid });
//     if (!user) {
//       res.send("no user");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     console.log("something went wrong");
//   }
// });
//update the user with email address
// app.patch("/user", async (req, res) => {
//   const useremail = req.body.useremail;
//   const userdata = req.body;

//   try {
//     const updatedata = await User.findOneAndUpdate(
//       { emailId: useremail },
//       userdata
//     );

//     res.send("name updated");
//   } catch (err) {
//     console.log("something ent wrong");
//   }
// });
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
