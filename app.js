import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
config({
  path: "./config/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(cookieParser());

// importing and using routes
import user from "./routes/userRoutes.js";
import device from "./routes/deviceRoutes.js";
import payment from "./routes/paymentRoutes.js";
import invoice from "./routes/invoiceRoutes.js";
import complaint from "./routes/complaintRoutes.js";

app.use("/api/v1", user);
app.use("/api/v1", device);
app.use("/api/v1", payment);
app.use("/api/v1", invoice);
app.use("/api/v1", complaint);

export default app;

app.use(ErrorMiddleware);
