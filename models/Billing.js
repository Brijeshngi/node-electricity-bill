import mongoose from "mongoose";

const schema = new mongoose.Schema({
  cust_name: {
    type: mongoose.Schema.Types.ObjectId,
  },
  device_number: {
    type: mongoose.Schema.Types.ObjectId,
  },
  units: {
    type: Number,
  },
  bill_total: {
    type: String,
  },
  due_date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid"],
  },
});

export const Billing = mongoose.model("Billing", schema);
