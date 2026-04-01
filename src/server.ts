import { Server } from 'http';
import app from './app.js';
import prisma from './lib/prisma.js';

const PORT = process.env.PORT || 5000;

async function main() {
  const server: Server = app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });

  // ডাটাবেস কানেকশন চেক করা (ঐচ্ছিক কিন্তু ভালো প্র্যাকটিস)
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

main();