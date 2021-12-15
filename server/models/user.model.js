const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    fatherName: { type: String, required: true },
    grandFatherName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, default: "" },
    hashedPassword: { type: String, required: true },
    roles: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
