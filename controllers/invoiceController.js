import "express-async-errors";
import { Device } from "../models/Device.js";
import { Invoice } from "../models/Invoice.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import Jwt from "jsonwebtoken";

export const createInvoice = async (req, res, next) => {
  // const { id } = req.params;

  // const dataof = await Device.findById(id);

  // console.log(dataof.device_number);

  const { device_number, bill_amount } = req.body;

  const device = await Device.findOne({ device_number });

  if (!device) return next(new ErrorHandler("No device found", 404));

  const invoice = await Invoice.create({
    device_number,
    bill_amount,
  });

  await invoice.save();

  res.status(201).json({
    success: true,
    message: "Invoice generated",
  });
};

export const getInvoice = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Please login again", 401));

  const decoded = Jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  const user = await User.findById(req.user._id);

  if (!user) return next(new ErrorHandler("login Please", 403));

  const deviceNumber = user.device_information;

  const invoice = await Invoice.findOne({ device_number: deviceNumber });

  // console.log(invoice);

  // console.log(user.device_information);

  res.status(201).json({
    success: true,
    invoice,
    message: "Invoice generated",
  });
};
