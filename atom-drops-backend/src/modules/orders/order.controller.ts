import { Request, Response } from 'express';
import * as orderService from './order.service';
import { StatusCodes } from 'http-status-codes';

export const createOrder = async (req: Request, res: Response) => {
  try {
    // req.user is guaranteed to exist because of 'authenticate' middleware
    const userId = req.user!.id; 
    const { items } = req.body;

    const order = await orderService.createOrder(userId, items);

    res.status(StatusCodes.CREATED).json({
      message: 'Order placed successfully',
      order,
    });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const orders = await orderService.getMyOrders(userId);
    res.status(StatusCodes.OK).json({ orders });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};