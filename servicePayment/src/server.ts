import express from "express";
import { Signale } from "signale";
import cors from "cors"
import dotenv from "dotenv";
import { paymentRouter } from "./payment/infrastructure/PaymentRouter";

dotenv.config();

const port = process.env.PORT;
const app = express();
const signale = new Signale();

app.use(cors())
app.use(express.json());
app.use("/payments", paymentRouter);

app.listen(port, () => {
  signale.success("Server running in port", port);
});
