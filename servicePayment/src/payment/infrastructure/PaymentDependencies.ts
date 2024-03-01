import { MysqlPaymentRepository } from "./repositories/MysqlPaymentRepository";
import { CreatePaymentUseCase } from "../application/CreatePaymentUseCase";
import { CreatePaymentController } from "./controllers/CreatePaymentController";
import { NotificationHelper } from "./helpers/NotificationHelper";
import { SocketHelper } from "./helpers/SocketHelper";

export const mysqlPaymentRepository = new MysqlPaymentRepository();

export const servicesNotification = new NotificationHelper();

export const servicesSocket = new SocketHelper();

export const createPaymentUseCase = new CreatePaymentUseCase(
    mysqlPaymentRepository,
    servicesNotification,
    servicesSocket

)

export const createPaymentController = new CreatePaymentController(
    createPaymentUseCase
);