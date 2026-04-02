import { Request, Response } from "express";
import { createNewUser } from "./user.service";
import { ZodError } from "zod";

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
