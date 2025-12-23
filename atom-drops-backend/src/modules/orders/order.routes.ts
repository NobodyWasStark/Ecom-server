import { Router } from 'express';
import * as orderController from './order.controller';
import { authenticate } from '../../shared/middlewares/auth.middleware';

const router = Router();

// Protect all routes below this line
router.use(authenticate); 

router.post('/', orderController.createOrder);
router.get('/my', orderController.getMyOrders);

export default router;