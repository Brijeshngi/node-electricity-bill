import express from "express";
import { createInvoice, getInvoice } from "../controllers/invoiceController.js";

const router = express.Router();

router.route("/invoice").post(createInvoice).get(getInvoice);

export default router;
