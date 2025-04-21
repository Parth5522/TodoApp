import express from "express";
import { getOtp } from "../controllers/otpController.js";
const router = express.Router();

router.post('/getotp', getOtp);

export default router;