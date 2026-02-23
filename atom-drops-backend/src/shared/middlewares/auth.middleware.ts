import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

// Require ADMIN role — must be used AFTER authenticate
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(StatusCodes.FORBIDDEN).json({
      error: "Admin access required",
    });
  }
  next();
};

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Get token from Cookies OR Header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Authentication required. Please log in.",
    });
  }

  try {
    // 2. Verify Token
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      role: string;
    };

    // 3. Attach user info to request
    req.user = decoded;

    next(); // Pass control to the next function (the controller)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Token expired. Please log in again.",
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid token. Please log in again.",
      });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Authentication failed.",
    });
  }
};
