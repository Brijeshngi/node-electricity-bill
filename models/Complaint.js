import moment from "moment";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: {
    type: String,
  },

  subject: {
    type: String,
    required: true,
  },

  complaint: {
    type: String,
    required: true,
  },
  complaint_date: {
    type: Date,
    default: moment().format(),
  },
  status: {
    type: String,
    enum: ["resolved", "Pending", "Processing"],
    default: "Pending",
  },
  reply: {
    type: String,
  },
});

export const Complaint = mongoose.model("Complaint", schema);
