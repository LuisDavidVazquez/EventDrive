import { MysqlPaymentRepository } from "./repositories/MysqlPaymentRepository";
import { CreatePaymentUseCase } from "../application/CreatePaymentUseCase";
import { CreatePaymentController } from "./controllers/CreatePaymentController";
import { NotificationNewPayment } from "./helpers/NotificationHelper";

export const mysqlPaymentRepository = new MysqlPaymentRepository();

export const servicesNotification = new NotificationNewPayment();

export const createPaymentUseCase = new CreatePaymentUseCase(
    mysqlPaymentRepository,
    servicesNotification
)

export const createPaymentController = new CreatePaymentController(
    createPaymentUseCase
);