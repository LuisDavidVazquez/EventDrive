import { Payment } from "./Payment";

export interface PaymentRepository {
    createPayment( payment : Payment) : Promise <Payment | null> 
}