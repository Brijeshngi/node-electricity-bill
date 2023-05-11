import moment from "moment";
import mongoose from "mongoose";

const schema = mongoose.Schema({
  device_number: {
    type: String,
  },
  bill_amount: {
    type: String,
  },
  due_date: {
    type: Date,
    Date: Date.now() + 15 * 60 * 60 * 1000,
  },
  invoice_date: {
    type: Date,
    Date: moment().format(),
  },
});

export const Invoice = mongoose.model("Invoice", schema);
