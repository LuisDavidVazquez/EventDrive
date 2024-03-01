import { Request, Response } from "express";
import { CreatePaymentUseCase } from "../../application/CreatePaymentUseCase";

export class CreatePaymentController {
  constructor(
    readonly createPaymentUseCase: CreatePaymentUseCase
  ) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const payment = await this.createPaymentUseCase.run(
        data.id,
        data.name,
        data.amount,
        data.concept
      );
      if (payment)
        res.status(201).send({
          status: "success",
          data: {
            id: payment?.id,
            name: payment?.name,
            description: payment?.amount,
            price: payment?.concept,
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "The record could not be added",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "An error occurred",
        msn: error,
      });
    }
  }
}