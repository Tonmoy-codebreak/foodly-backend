import express from "express";
import { getMyProfile, loginUser, registerUser } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

// Public route
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/me", auth("CUSTOMER", "ADMIN"), getMyProfile);

export const UserRoutes = router;
