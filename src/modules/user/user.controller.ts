import { Request, Response } from "express";
import { createNewUser } from "./user.service";

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
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};
