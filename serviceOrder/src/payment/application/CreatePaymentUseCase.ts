import { Payment } from "../domain/Payment";
import { PaymentRepository } from "../domain/PaymentRepository";
import { INotificationService } from "./Services/INotificationUseCase";

export class CreatePaymentUseCase {
    constructor(
        readonly paymentRepository: PaymentRepository,
        readonly sendNotification: INotificationService
    ) {}

    async run(
        id: number,
        name: string,
        amount: number,
        concept: string
    ): Promise<Payment | null> {
        try {
            const payment = new Payment(id, name, amount, concept)
            const result = await this.paymentRepository.createPayment(payment)
            if(result)
                this.sendNotification.sendNotification(JSON.stringify(result));
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}