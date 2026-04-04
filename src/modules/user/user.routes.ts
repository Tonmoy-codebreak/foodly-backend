import express from "express";
import { loginUser, registerUser } from "./user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
export const UserRoutes = router;
