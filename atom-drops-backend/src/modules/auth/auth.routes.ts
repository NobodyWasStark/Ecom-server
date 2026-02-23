import { Router } from "express";
import * as authController from "./auth.controller";
import { authenticate } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.middleware";
import {
  registerSchema,
  loginSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
  updateProfileSchema,
} from "./auth.schema";

const router = Router();

// Public routes
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.post(
  "/password-reset/request",
  validate(passwordResetRequestSchema),
  authController.requestPasswordReset
);
router.post(
  "/password-reset/confirm",
  validate(passwordResetConfirmSchema),
  authController.resetPassword
);

// Protected routes
router.get("/profile", authenticate, authController.getProfile);
router.patch(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  authController.updateProfile
);

export default router;
