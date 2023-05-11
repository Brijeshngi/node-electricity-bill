import express from "express";
import {
  createDevice,
  getdevice,
  deleteDevice,
  updateUnits,
} from "../controllers/deviceController.js";
import { authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/device")
  .post(authorizeAdmin, createDevice)
  .get(authorizeAdmin, getdevice)
  .delete(authorizeAdmin, deleteDevice);
router.route("/device/:id").put(authorizeAdmin, updateUnits);
export default router;
