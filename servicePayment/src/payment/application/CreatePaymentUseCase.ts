import { Payment } from "../domain/Payment";
import { PaymentRepository } from "../domain/PaymentRepository";
import { INotificationUseCase } from "./Services/INotificationUseCase";
import { ISocketUseCase } from "./Services/ISocketUseCase";

export class CreatePaymentUseCase {
    constructor(
        readonly paymentRepository: PaymentRepository,
        readonly sendNotification: INotificationUseCase,
        readonly emitSocket: ISocketUseCase
    ) { }

    async run(
        id: number,
        name: string,
        amount: number,
        concept: string
    ): Promise<Payment | null> {
        try {
            const payment = new Payment(id, name, amount, concept)
            const result = await this.paymentRepository.createPayment(payment)
            if (result) {
                this.sendNotification.sendNotification(JSON.stringify(result));
                this.emitSocket.emit("payment", JSON.stringify(result))
            }
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}