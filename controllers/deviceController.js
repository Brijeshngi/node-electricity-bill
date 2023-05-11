import "express-async-errors";
import { Device } from "../models/Device.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createDevice = async (req, res, next) => {
  const { device_number } = req.body;

  if (!device_number)
    return next(new ErrorHandler("Please Enter Device number", 400));

  let device = await Device.findOne({ device_number });

  if (device) return next(new ErrorHandler("Device already registered", 409));

  device = await Device.create({
    device_number,
  });

  res.status(201).json({
    success: true,
    device,
    message: "Device created succesfully",
  });
};

export const getdevice = async (req, res, next) => {
  let device = await Device.find({});
  res.status(200).json({
    device,
  });
};

export const deleteDevice = async (req, res, next) => {
  let device = await Device.findByIdAndDelete({});
  res.status(200).json({
    device,
  });
};

export const updateUnits = async (req, res, next) => {
  const { id } = req.params;

  const deviceData = await Device.findById(id);

  if (!deviceData) return next(new ErrorHandler("No device found", 404));

  const { currentreadingunits, previousredingunits } = req.body;

  if (!currentreadingunits || !previousredingunits)
    return next(new ErrorHandler("please provide units"));

  const units = currentreadingunits - previousredingunits;

  deviceData.reading.push({
    currentreadingunits: currentreadingunits,
    previousredingunits: previousredingunits,
    Date: Date.now(),
  });
  deviceData.units.push({
    units: units,
    Date: Date.now(),
  });

  await deviceData.save();

  let device = await Device.findById();
  res.status(200).json({
    succes: true,
    message: "units updated successfully",
  });
};
