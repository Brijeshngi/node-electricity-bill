import { User } from "../models/User.js";
import "express-async-errors";
// import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";

export const register = async (req, res, next) => {
  const { name, email, password, contact } = req.body;

  // console.log(req.body); testing

  if (!name || !email || !password || !contact)
    return next(new ErrorHandler("Please add all fields", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exists", 409));

  user = await User.create({
    name,
    email,
    password,
    contact,
  });

  sendToken(res, user, 201);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please provide all data", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return next(new ErrorHandler("Please provide correct credentials", 401));
  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Please provide correct credentials", 401));

  sendToken(res, user, `Welcome, ${user.name}`, 200);
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out Succesfully",
    });
};

export const getMyprofile = async (req, res, next) => {
  // console.log(req.user._id);
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
};

export const changepassword = async (req, res, next) => {
  const { oldpassword, newpassword } = req.body;

  if (!oldpassword || !newpassword)
    return next(new ErrorHandler("provide all data", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldpassword);

  if (!isMatch) return next(new ErrorHandler("incorrect old password", 400));

  user.password = newpassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "password changed successfully",
  });
};

export const updateprofile = async (req, res, next) => {
  const { name, email, contact, connection_type, device_information } =
    req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;
  if (contact) user.contact = contact;
  if (connection_type) user.connection_type = connection_type;
  if (device_information) user.device_information = device_information;

  await user.save();

  res.status(200).json({
    success: true,
    message: "user updated successfully",
  });
};

export const forgetpassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User not found", 400));

  const resetToken = await user.getResetToken();

  await user.save();
  // send token via email
  // const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  // const message = `Click on link to resetpassword ${url}`;
  // await sendEmail(user.email, "Password reset", message);
  // res.status(200).json({
  //   success: true,
  //   message: `Reset token sent to ${user.email}`,
  // });
  res.status(200).json({
    success: true,
    token_url: `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`,
    message: "Reset token sent successfully",
  });
};

export const resetpassword = async (req, res, next) => {
  const { token } = req.params;

  const ResetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    ResetPasswordToken,
    ResetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) return next(new ErrorHandler("Token has been expired", 401));

  user.password = req.body.password;

  user.ResetPasswordToken = undefined;
  user.ResetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "password Changed successfully",
  });
};
export const deleteprofile = async (req, res, next) => {
  const user = await findById(req.user._id);

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "Profile deleted successfully",
  });
};

// Error: Can't set headers after they are sent to the client use of res for double time
