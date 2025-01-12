import express from "express";
import { googleAuth, signin, signup,signout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google-auth",googleAuth)
router.get('/signout',signout)
export default router;
