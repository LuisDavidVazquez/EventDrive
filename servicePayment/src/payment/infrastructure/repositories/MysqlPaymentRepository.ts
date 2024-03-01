import { query } from "../../../database/mysql";
import { Payment } from "../../domain/Payment";
import { PaymentRepository } from "../../domain/PaymentRepository";

export class MysqlPaymentRepository implements PaymentRepository {

  async createPayment(payment: Payment): Promise<Payment | null> {
    const sql = "INSERT INTO payment (name, amount, concept) VALUES (?, ?, ?)";
    const params: any[] = [payment.name, payment.amount, payment.concept];
    try {
      const [result]: any = await query(sql, params);
      const paymentObject = new Payment(
        result.insertId,
        payment.name,
        payment.amount,
        payment.concept
      );
      return paymentObject;
    } catch (error) {
      console.log(error)
       return null;
    } 
  }
}
