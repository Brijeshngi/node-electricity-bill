import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import moment from "moment";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
  },
  email: {
    type: String,
    required: [true, "Please enter Email"],
    unique: true,
    validate: validator.isEmail,
  },
  contact: {
    type: String,
    minlength: [10, "Please Enter 10 digit contact number"],
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minlength: [8, "Passowrd length must be of 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  connection_type: {
    type: String,
    enum: ["commercial", "domestic"],
    default: "domestic",
  },
  device_information: {
    type: String,
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "device",
    },
    default: 15454,
  },
  subscription: {
    id: String,
    status: String,
  },

  createdAt: {
    type: Date,
    default: moment().format(),
  },

  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.ResetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.ResetPasswordExpire = Date.now() + 15 * 60 * 1000;
  console.log(resetToken);
  return resetToken;
};

export const User = mongoose.model("User", schema);
