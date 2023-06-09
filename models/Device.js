import mongoose from "mongoose";

const schema = new mongoose.Schema({
  device_number: {
    type: String,
  },
  reading: [
    {
      currentreadingunits: { type: Array },
      previousredingunits: { type: Array },
      units: { type: Array },
      date: Date,
    },
  ],
});
export const Device = mongoose.model("Device", schema);
