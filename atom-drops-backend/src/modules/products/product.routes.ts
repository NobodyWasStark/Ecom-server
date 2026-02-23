import { Router } from "express";
import {
  authenticate,
  requireAdmin,
} from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.middleware";
import * as productController from "./product.controller";
import { createProductSchema } from "./product.schema";

const router = Router();

// Public routes
router.get("/", productController.getProducts);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProduct);

// Protected routes (Admin only)
router.post(
  "/",
  authenticate,
  requireAdmin,
  validate(createProductSchema),
  productController.createProduct,
);
router.patch(
  "/:id",
  authenticate,
  requireAdmin,
  productController.updateProduct,
);
router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  productController.deleteProduct,
);

// Image management routes
router.post(
  "/:id/images",
  authenticate,
  requireAdmin,
  productController.addProductImage,
);
router.delete(
  "/:id/images/:imageId",
  authenticate,
  requireAdmin,
  productController.deleteProductImage,
);
router.patch(
  "/:id/images/:imageId/primary",
  authenticate,
  requireAdmin,
  productController.setPrimaryImage,
);

export default router;
