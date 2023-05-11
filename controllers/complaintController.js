import "express-async-errors";
import { Complaint } from "../models/Complaint.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createComplaint = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler("Registered user only"));

  const { subject, complaint } = req.body;

  if (!subject || !complaint)
    return next(new ErrorHandler("please provide all details", 400));
  await Complaint.create({
    user,
    subject,
    complaint,
  });
  res.status(201).json({
    success: true,
    message: "complaint raised successfully",
  });
};

export const replyComplaint = async (req, res, next) => {
  const { id } = req.params;

  const complaint = await Complaint.findById(id);

  if (!complaint) return next(new ErrorHandler("No complaints", 404));

  const { reply, status } = req.body;

  if (!reply) return next(new ErrorHandler("Please reply", 400));

  complaint.reply = reply;
  complaint.status = status;

  await complaint.save();

  res.status(200).json({
    success: true,
    message: "Replied",
  });
};
