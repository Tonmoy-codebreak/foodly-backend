import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app: Application = express();

// ১. মিডলওয়্যার সেটআপ
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ২. বেস রুট (টেস্ট করার জন্য)
app.get('/', (req: Request, res: Response) => {
  res.send({
    message: "Welcome to Foodly Backend! 🚀",
  });
});

// ৩. গ্লোবাল এরর হ্যান্ডলার (মেন্টর স্টাইল)
app.use((err: any, req: Request, res: Response, next: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export default app;