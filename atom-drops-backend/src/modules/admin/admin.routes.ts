import { Router } from "express";
import { authenticate, requireAdmin } from "../../shared/middlewares/auth.middleware";
import * as adminController from "./admin.controller";

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

// Dashboard
router.get("/dashboard/stats", adminController.getDashboardStats);
router.get("/analytics/products", adminController.getProductAnalytics);

// Orders management
router.get("/orders", adminController.getAllOrders);
router.patch("/orders/:id/status", adminController.updateOrderStatus);

// Users management
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id/role", adminController.updateUserRole);

export default router;
