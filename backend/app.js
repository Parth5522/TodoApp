import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import applicationRouter from "./routes/adminRouter.js";
import todoRouter from "./routes/todoRouter.js";
import adminRouter from "./routes/adminRouter.js";
import otpRouter from "./routes/otpRouter.js";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/userRouter.js";
import dbConnection from "./database/dbConnection.js";
import reminderService from "./services/reminderService.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    allowedHeaders: [
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/otp", otpRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/application", applicationRouter);
app.use("/todo", todoRouter);

dbConnection();
app.use(errorMiddleware);

reminderService.startReminderService();

export default app;
