import express from "express";
import {
  buySubscription,
  cancelSubscription,
  checkout,
  getRazorpayKey,
  orderVerification,
  paymentVerifications,
  paymentVerification,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/verification").post(orderVerification);

router.route("/subscribe").get(isAuthenticated, buySubscription);

router.route("/verify").post(paymentVerifications);

router.route("/paymentverification").post(paymentVerification);

router.route("/apikey").get(getRazorpayKey);

router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
