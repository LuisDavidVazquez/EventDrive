import express from "express";

import { createPaymentController } from "./PaymentDependencies";

export const paymentRouter = express.Router();

paymentRouter.post("/",createPaymentController.run.bind(createPaymentController));