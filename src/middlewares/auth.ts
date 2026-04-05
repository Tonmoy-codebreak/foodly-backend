import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

// ১. Request কে এক্সটেন্ড করে একটি নতুন ইন্টারফেস তৈরি করুন
interface CustomRequest extends Request {
  user?: JwtPayload | string;
}

export const auth = (...roles: string[]) => {
  // ২. এখানে Request এর বদলে CustomRequest টাইপ ব্যবহার করুন
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      // ৩. টোকেন আছে কি না চেক করা (Bearer টোকেন হ্যান্ডেল করা সহ)
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("You are not authorized!");
      }

      const token = authHeader.split(" ")[1]!; // "Bearer <token>" থেকে শুধু টোকেন নেওয়া

      // ৪. টোকেন ভেরিফাই করা
      const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string,
      ) as JwtPayload;

      // ৫. রোল (Role) চেক করা
      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("You have no permission to access this!");
      }

      // ৬. ইউজারের ডাটা রিকোয়েস্টে সেট করা (এখন আর এরর দিবে না)
      req.user = decoded;
      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || "Unauthorized access",
      });
    }
  };
};
