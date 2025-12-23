import { Router } from 'express';
import * as productController from './product.controller';

const router = Router();

// Public: Everyone can see products
router.get('/', productController.getProducts);

// Admin Only: Create product (We will add security here in the next step)
router.post('/', productController.createProduct);

export default router;