import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (data: any) => {
  return await prisma.product.create({
    data,
  });
};

export const getAllProducts = async () => {
  return await prisma.product.findMany({
    orderBy: { created_at: 'desc' },
  });
};

export const getProductById = async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};