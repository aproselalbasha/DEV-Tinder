const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://apaprose:wVvCXiNxxz5Tb4AS@namastenode.tttrz.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
