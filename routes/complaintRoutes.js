import express from "express";
import {
  createComplaint,
  replyComplaint,
} from "../controllers/complaintController.js";
import {
  authorizeAdmin,
  authorizeSubscribers,
  isAuthenticated,
} from "../middleware/auth.js";

const router = express.Router();

router
  .route("/complaint")
  .post(isAuthenticated, authorizeSubscribers, createComplaint);

router.route("/reply/:id").put(isAuthenticated, authorizeAdmin, replyComplaint);

export default router;
