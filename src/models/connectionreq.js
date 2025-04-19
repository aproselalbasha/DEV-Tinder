const mongoose = require("mongoose");
const Connectionreqschema = new mongoose.Schema(
  {
    fromUserid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);
Connectionreqschema.pre("save", function (next) {
  if (this.fromUserid.equals(this.toUserid)) {
    throw new Error("Cannot send connection request to yourself!...");
  }
  next();
});

const connectionrequestmodel = new mongoose.model(
  "ConnectionRequest",
  Connectionreqschema
);

module.exports = connectionrequestmodel;
