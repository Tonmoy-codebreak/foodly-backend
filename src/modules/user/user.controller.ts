import { Request, Response } from "express";
import { createNewUser, loginNewUser, userProfileFromDB } from "./user.service";
import { ZodError } from "zod";

// Register new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await createNewUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: result,
    });
  } catch (error: any) {
    // Zod validation error handle
    // =========================
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: error.issues.map((e) => e.message), // সব validation error পাঠাবে
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

//Login old user
export const loginUser = async (req: Request, res: Response) => {
  const result = await loginNewUser(req.body);

  try {
    res.status(201).json({
      success: true,
      message: "User login Successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

//get user data from db
export const getMyProfile = async (req: any, res: Response) => {
  try {
    // ১. টোকেন থেকে পাওয়া আইডি বের করা
    const userId = req.user.userId;

    // ২. সার্ভিস কল করে ডাটাবেস থেকে ফ্রেশ ডাটা আনা
    const result = await userProfileFromDB(userId);

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
