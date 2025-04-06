pp.use("/test/2", (req, res) => {
res.send("test 2 created sucessfully ");
});
app.use("/test", (req, res) => {
res.send("test created sucessfully ");
});
app.use("/hello", (req, res) => {
res.send("hello page created");
});
app.use("/", (req, res) => {
res.send("hello homepage");
});
app.post("/test", (req, res) => {
res.send("this post from test");
});
app.put("/test/put", (req, res) => {
res.send("this is from put");
});

app.delete("/test", (req, res) => {
res.send("deleted sucessfully");
});
app.patch("/test", (req, res) => {
res.send("patch sucessfully");
});

app.use((req, res) => {
res.send("hello homepage");
});

---

app.get("/ab?c", (req, res) => {
res.send({ name: "aprose", location: "chennai" });
});

app.get("/ab+c", (req, res) => {
res.send({ name: "aprose", location: "chennai" });
});
app.get("/ab\*cd", (req, res) => {
res.send({ name: "aprose", location: "chennai" });
});
app.get("/a(bc)?d", (req, res) => {
res.send({ name: "aprose", location: "chennai" });
});
app.get("/a(bc)+d", (req, res) => {
res.send({ name: "aprose", location: "chennai" });
});
//anything the value is a it work like car in car a is there
app.get(/a/, (req, res) => {
res.send({ name: "aprose", location: "chennai" });
});
//startwith anything end with fly
app.get(/.\*fly$/, (req, res) => {
res.send({ name: "aprose", location: "chennai" });
});

---

to get ghe value of userid and password
http://localhost:7777/user?userid=101&password=pass
app.get("/user", (req, res) => {
console.log(req.query);
res.send({ name: "aprose", location: "chennai" });
});
http://localhost:7777/user/102

app.get("/user/:userid", (req, res) => {
console.log(req.params);
res.send({ name: "aprose", location: "chennai" });
});
http://localhost:7777/user/102/aprose/pass

app.get("/user/:userid/:name/:password", (req, res) => {
console.log(req.params);
res.send({ name: "aprose", location: "chennai" });
});

route handlers
1.its loading in postman becoz of not mentoned any response
app.get("/user", (req, res) => {
console.log("nothing get response ");
});
2.it will always reslove first response becox js have sync lamguage
app.get(
"/user",
(req, res) => {
res.send("user1");
},
(req, res) => {
res.send("user2");
}
);
3.if not menthoed the response also will always search first not to go secound
app.get(
"/user",
(req, res) => {},
(req, res) => {
res.send("user2");
}
);

app.listen(7777, () => {
console.log(" server listining");
}); 4. if you want to access below route use next in parameter alwell as inside route .
app.get(
"/user",
(req, res, next) => {
next();
},
(req, res) => {
res.send("user2");
}
);

5. will get result but console get error
   app.get(
   "/user",
   (req, res, next) => {
   res.send("user1");
   next();
   },
   (req, res) => {
   res.send("user2");
   }
   );
6. this also get error becoz of sync language nad clint close the scoket so server not to send again response
   app.get(
   "/user",
   (req, res, next) => {
   next();
   res.send("user1");
   },
   (req, res) => {
   res.send("user2");
   }
   );

app.listen(7777, () => {
console.log(" server listining");
});
7.we will chain mutiple route
app.get(
"/user",
(req, res, next) => {
next();
},
(req, res, next) => {
next();
},
(req, res, next) => {
next();
},
(req, res) => {
res.send("finial resloved ");
}
); 8. we can make everyware as array also behave same
app.get(
"/user",
(req, res, next) => {
next();
},
[
(req, res, next) => {
next();
},
(req, res, next) => {
next();
},
],
(req, res) => {
res.send("finial resloved ");
}
);

app.listen(7777, () => {
console.log(" server listining");
}); 8. we can create saparate also
app.get("/user", (req, res, next) => {
next();
});
app.get("/user", (req, res) => {
res.send("2nd response ");
});
app.listen(7777, () => {
console.log(" server listining");
});

middleare using auth

const express = require("express");
const app = express();
const token = "xyz";
app.use("/user", (req, res, next) => {
const isauth = token === "xyz";
if (!isauth) {
res.status(401).send("unautharized");
} else {
next();
}
});
app.get("/user/profile", (req, res) => {
res.send("profile sent");
});
app.get("/user/profiledelete", (req, res) => {
res.send("profile delete");
});
app.listen(7777, () => {
console.log(" server listining");
});
auth updateding saprate page
const express = require("express");
const app = express();
const { isuserauth, isadminauth } = require("./middleware/auth");

app.use("/user", isuserauth);
app.use("/admin", isadminauth);
app.get("/user/profile", (req, res) => {
res.send("profile sent");
});
app.get("/user/profiledelete", (req, res) => {
res.send("profile delete");
});
app.get("/admin", (req, res) => {
res.send("admin data send");
});
app.listen(7777, () => {
console.log(" server listining");
});
auth.js file
const isuserauth = (req, res, next) => {
const token = "xyz";
const isauth = token === "xyz";
if (!isauth) {
res.status(401).send("unautharized");
} else {
next();
}
};
const isadminauth = (req, res, next) => {
const token = "xyz";
const isauth = token === "xyz";
if (!isauth) {
res.status(401).send("unautharized");
} else {
next();
}
};
module.exports = { isuserauth, isadminauth };
can we use like this also
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
error handling using try catch block
const express = require("express");
const app = express();
const { isuserauth, isadminauth } = require("./middleware/auth");

app.get("/user", (req, res) => {
try {
throw new Error("its throwing error");
res.send("profile sent");
} catch (err) {
res.status(500).send("error");
}
});
app.listen(7777, () => {
console.log(" server listining");
});
error handling usimg middle ware
app.get("/user", (req, res) => {
// try {
// throw new Error("its throwing error");
// res.send("profile sent");
// } catch (err) {
// res.status(500).send("error");
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
to connect the database
const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
connectDB()
.then(() => {
console.log("database connected");
app.listen(7777, () => {
console.log(" server listining");
});
})
.catch((err) => console.log("data base not conncted"));
database.js file
const mongoose = require("mongoose");
const connectDB = async () => {
await mongoose.connect(
"mongodb+srv://apaprose:wVvCXiNxxz5Tb4AS@namastenode.tttrz.mongodb.net/"
);
};

module.exports = { connectDB };
sample code
// app.get("/user", async (req, res) => {
// const useremail = req.body.emailId;
// try {
// const user = await User.findOne({ emailId: useremail });
// if (user.length === 0) {
// res.send("user not found");
// } else {
// res.send(user);
// }
// } catch (err) {
// console.log("something went wrong");
// }
// });
//delete user
// app.delete("/user", async (req, res) => {
// const userid = req.body.userid;
// console.log(userid);
// try {
// await User.findByIdAndDelete(userid);
// res.send("deleted the user ");
// } catch (err) {
// console.log("something went wrong");
// }
// });
// update the user
// app.patch("/user", async (req, res) => {
// const userid = req.body.\_id;
// const data = req.body;

// try {
// const updateallowed = ["_id", "firstName", "lastName", "age", "skills"];
// const isallowed = Object.keys(data).every((k) => updateallowed.includes(k));

// if (!isallowed) {
// res.send("not allowed");
// }
// if (data?.skills.length > 5) {
// throw new Error("update more 5 skill not allowed");
// }

// const userupdate = await User.findByIdAndUpdate({ \_id: userid }, data, {
// returnDocument: "after",
// runValidators: true,
// });

// res.send("user detail updated");
// } catch (err) {
// console.log("something went wrong");
// res.send("something went wrong :" + err);
// }
// });
// app.get("/feed", async (req, res) => {
// const userid = req.body.id;

// try {
// const user = await User.findById({ \_id: userid });
// if (!user) {
// res.send("no user");
// } else {
// res.send(user);
// }
// } catch (err) {
// console.log("something went wrong");
// }
// });
// update the user with email address
// app.patch("/user", async (req, res) => {
// const useremail = req.body.useremail;
// const userdata = req.body;

// try {
// const updatedata = await User.findOneAndUpdate(
// { emailId: useremail },
// userdata
// );

// res.send("name updated");
// } catch (err) {
// console.log("something ent wrong");
// }
// });
