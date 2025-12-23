import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (userId: string, items: { product_id: string; quantity: number }[]) => {
  // 1. Fetch all products to get real prices
  const productIds = items.map(i => i.product_id);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  // 2. Calculate Total & Prepare Data
  let totalAmount = 0;
  const orderItemsData = items.map(item => {
    const product = products.find(p => p.id === item.product_id);
    if (!product) throw new Error(`Product ${item.product_id} not found`);
    
    // Check stock logic could go here later

    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    return {
      product_id: product.id,
      quantity: item.quantity,
      price: product.price, // Store snapshot of price
    };
  });

  // 3. Save to DB (Transaction)
  // We create the order AND all items in one go
  const order = await prisma.order.create({
    data: {
      user_id: userId,
      total_amount: totalAmount,
      status: 'PENDING',
      items: {
        create: orderItemsData
      }
    },
    include: { items: true } // Return the items in response
  });

  return order;
};

export const getMyOrders = async (userId: string) => {
  return await prisma.order.findMany({
    where: { user_id: userId },
    include: { items: { include: { product: true } } },
    orderBy: { created_at: 'desc' }
  });
};