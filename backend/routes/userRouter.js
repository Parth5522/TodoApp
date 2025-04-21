import express from "express";
import {Login, Logout, register, Getuser} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/getuser", isAuthenticated, Getuser)

export default router;

