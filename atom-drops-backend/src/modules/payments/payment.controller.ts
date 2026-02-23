import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { env } from "../../config/env";
import * as paymentService from "./payment.service";

export const initPayment = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { order_id } = req.body;

    const data = await paymentService.initiatePayment(userId, order_id);

    // Frontend should redirect user to data.bkashURL
    res.status(StatusCodes.OK).json(data);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

export const bkashCallback = async (req: Request, res: Response) => {
  try {
    const { paymentID, status } = req.query;

    if (!paymentID || typeof paymentID !== "string") {
      return res.redirect(
        `${env.FRONTEND_URL}/payment/failed?message=invalid_payment`,
      );
    }

    if (status === "cancel" || status === "failure") {
      return res.redirect(
        `${env.FRONTEND_URL}/payment/failed?message=${status}`,
      );
    }

    await paymentService.executePayment(paymentID);
    res.redirect(`${env.FRONTEND_URL}/payment/success?trxID=${paymentID}`);
  } catch (error: any) {
    res.redirect(`${env.FRONTEND_URL}/payment/failed?message=${error.message}`);
  }
};

// MOCK PAGE (Development/testing only)
export const mockBkashPage = (req: Request, res: Response) => {
  if (env.NODE_ENV === "production") {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Not available" });
  }

  const paymentID = String(req.query.paymentID || "").replace(/[<>"'&]/g, ""); // Sanitize to prevent XSS
  res.send(`
    <h1>Mock bKash Payment Page</h1>
    <p>Payment ID: ${paymentID}</p>
    <button onclick="window.location.href='/api/v1/payments/bkash/callback?paymentID=${encodeURIComponent(paymentID)}&status=success'">
      Confirm Payment (Success)
    </button>
    <br><br>
    <button onclick="window.location.href='/api/v1/payments/bkash/callback?paymentID=${encodeURIComponent(paymentID)}&status=failure'">
      Cancel Payment
    </button>
  `);
};
