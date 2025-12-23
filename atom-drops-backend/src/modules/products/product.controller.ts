import { Request, Response } from 'express';
import * as productService from './product.service';
import { StatusCodes } from 'http-status-codes';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(StatusCodes.CREATED).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(StatusCodes.OK).json({ products });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};