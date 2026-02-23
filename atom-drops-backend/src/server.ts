import app from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma.client";

const SHUTDOWN_TIMEOUT = 10_000; // 10 seconds

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const server = app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
    });

    const gracefulShutdown = async (signal: NodeJS.Signals) => {
      console.log(`${signal} received. Shutting down gracefully...`);

      // Force exit if graceful shutdown takes too long
      const forceTimeout = setTimeout(() => {
        console.error("Forced shutdown — timed out");
        process.exit(1);
      }, SHUTDOWN_TIMEOUT);

      server.close(async () => {
        try {
          await prisma.$disconnect();
          console.log("Database disconnected");
          clearTimeout(forceTimeout);
          process.exit(0);
        } catch (error) {
          console.error("Error during shutdown:", error);
          clearTimeout(forceTimeout);
          process.exit(1);
        }
      });
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);

    // Catch unhandled rejections and uncaught exceptions
    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled Rejection:", reason);
    });
    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
