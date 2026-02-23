import { prisma } from "../../config/prisma.client";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../shared/errors/app-error";
import { sendPaymentSuccessEmail } from "../../shared/utils/email.util";

// bKash manual payment number
const BKASH_NUMBER = "01997125063";

export const initiatePayment = async (userId: string, orderId: string) => {
  // 1. Get the Order
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });

  if (!order) throw new NotFoundError("Order not found");
  if (order.user_id !== userId) throw new UnauthorizedError("Unauthorized");
  if (order.status === "PAID") throw new BadRequestError("Order already paid");

  try {
    const paymentID = `BKASH_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    // Save Payment Record in DB
    await prisma.payment.create({
      data: {
        order_id: order.id,
        amount: order.total_amount,
        transaction_id: paymentID,
        status: "PENDING",
        provider: "bkash",
      },
    });

    // Build WhatsApp message with order details
    const amount = order.total_amount.toLocaleString();
    const whatsappMessage = encodeURIComponent(
      `🛒 *Atom Drops — bKash Payment*\n\n` +
        `Order ID: ${order.id}\n` +
        `Amount: ৳${amount}\n` +
        `Payment Ref: ${paymentID}\n\n` +
        `I'd like to pay for my order via bKash. Please confirm once received.`,
    );
    const whatsappURL = `https://wa.me/8801997125063?text=${whatsappMessage}`;

    return {
      paymentID,
      bkashNumber: BKASH_NUMBER,
      amount: order.total_amount,
      orderId: order.id,
      whatsappURL,
    };
  } catch (error) {
    throw new Error("Payment initiation failed");
  }
};

export const executePayment = async (paymentID: string) => {
  // 1. Find the local payment record
  const payment = await prisma.payment.findFirst({
    where: { transaction_id: paymentID },
    include: { order: { include: { user: true } } },
  });

  if (!payment) throw new NotFoundError("Invalid Payment ID");
  if (payment.status === "SUCCESS") return payment; // Idempotency (Prevent double processing)

  // 2. Verify with bKash (Mocking the verification)
  // In production: await axios.post('/execute', { paymentID })

  // 3. Update Database (Atomic Transaction)
  const result = await prisma.$transaction([
    // Update Payment Status
    prisma.payment.update({
      where: { id: payment.id },
      data: { status: "SUCCESS" },
    }),
    // Update Order Status
    prisma.order.update({
      where: { id: payment.order_id },
      data: { status: "PAID" },
    }),
  ]);

  // Send payment success email
  if (payment.order.user) {
    await sendPaymentSuccessEmail(payment.order.user.email, payment.order);
  }

  return result;
};
