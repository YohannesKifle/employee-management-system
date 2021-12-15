const mongoose = require("mongoose");

var EmployeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    fatherName: { type: String, required: true },
    grandFatherName: { type: String, required: true },
    photoUrl: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, default: "" },
    department: { type: String, required: true },
    position: { type: String, required: true },
    birthDay: { type: Date, required: false, default: null },
    country: { type: String, required: true, default: "Ethiopia" },
    homeAddress: { type: String, required: true },
    hiredOn: { type: Date, require: true },
  },
  { timestamps: true }
);

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
module.exports = EmployeeModel;
