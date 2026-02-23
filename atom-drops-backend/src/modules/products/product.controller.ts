import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as productService from "./product.service";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(StatusCodes.CREATED).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const parsedMinPrice = req.query.minPrice
      ? parseInt(req.query.minPrice as string)
      : undefined;
    const parsedMaxPrice = req.query.maxPrice
      ? parseInt(req.query.maxPrice as string)
      : undefined;
    const parsedMinRating = req.query.minRating
      ? parseFloat(req.query.minRating as string)
      : undefined;
    const parsedPage = req.query.page ? parseInt(req.query.page as string) : 1;
    const parsedLimit = req.query.limit
      ? parseInt(req.query.limit as string)
      : 20;

    const filters = {
      search: req.query.search as string,
      category_id: req.query.category_id as string,
      minPrice: !isNaN(parsedMinPrice!) ? parsedMinPrice : undefined,
      maxPrice: !isNaN(parsedMaxPrice!) ? parsedMaxPrice : undefined,
      minRating: !isNaN(parsedMinRating!) ? parsedMinRating : undefined,
      inStock: req.query.inStock === "true",
      sortBy: req.query.sortBy as any,
      page: !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1,
      limit:
        !isNaN(parsedLimit) && parsedLimit > 0
          ? Math.min(parsedLimit, 100)
          : 20,
    };

    const result = await productService.getAllProducts(filters);
    res.status(StatusCodes.OK).json({ data: result });
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(StatusCodes.OK).json({ data: product });
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.NOT_FOUND)
      .json({ error: error.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductBySlug(req.params.slug);
    res.status(StatusCodes.OK).json({ data: product });
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.NOT_FOUND)
      .json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(StatusCodes.OK).json(result);
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Image management
export const addProductImage = async (req: Request, res: Response) => {
  try {
    const image = await productService.addProductImage(req.params.id, req.body);
    res.status(StatusCodes.CREATED).json({
      message: "Image added successfully",
      data: image,
    });
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const deleteProductImage = async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProductImage(req.params.imageId);
    res.status(StatusCodes.OK).json(result);
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const setPrimaryImage = async (req: Request, res: Response) => {
  try {
    const image = await productService.setPrimaryImage(req.params.imageId);
    res.status(StatusCodes.OK).json({
      message: "Primary image updated",
      data: image,
    });
  } catch (error: any) {
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
