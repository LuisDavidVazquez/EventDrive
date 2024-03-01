import { INotificationUseCase } from "../../application/Services/INotificationUseCase";
import amqplib from "amqplib"

export class NotificationHelper implements INotificationUseCase {

  private options: any;
  private url: any;
  private exch: any;

  constructor() {
    this.options = {
      vhost: process.env.AMQP_VHOST,
      username: process.env.AMQP_USERNAME,
      password: process.env.AMQP_PASSWORD,
      port: process.env.AMQP_PORT,
    };
    this.url = process.env.AMQP_URL;
    this.exch = process.env.AMQP_EXCH;
  }

  async sendNotification(message: string): Promise<boolean> {
    const conn = await amqplib.connect(this.url, this.options);
    const channel = await conn.createChannel();
    const status = await channel.publish(this.exch, "", Buffer.from(message));
    return status;
  }

}