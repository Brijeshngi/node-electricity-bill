import moment from "moment";
import mongoose from "mongoose";

const schema = mongoose.Schema({
  cust_name: {
    type: mongoose.Schema.Types.ObjectId,
  },
  device_number: {
    type: String,
  },
  bill_number: {
    type: mongoose.Schema.Types.ObjectId,
  },
  bill_amount: {
    type: String,
  },
  invoice_date: {
    type: Date,
    Date: moment().format(),
  },
});

export const Invoice = mongoose.model("Invoice", schema);
