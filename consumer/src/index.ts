import { connect } from "amqplib";
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

async function consumeMessages() {

  const options = {
    vhost: process.env.AMQP_VHOST,
    username: process.env.AMQP_USERNAME,
    password: process.env.AMQP_PASSWORD,
    port: process.env.AMQP_PORT,
  }

  const url = process.env.AMQP_URL;
  const exch = process.env.AMQP_EXCH;
  const queue = process.env.AMQP_QUEUE;
  const urlHost = process.env.HOST_URL;

  if(url && exch && queue){
    const connection = await connect(url, options);
    const channel = await connection.createChannel();
    await channel.assertQueue(exch, { durable: false });
    channel.consume(queue, async (payment) => {
      try {
        if (payment) {
          const paymentContent = payment.content.toString();
          const res = await axios.post(`${urlHost}/payments`,JSON.parse(paymentContent));
          console.log('successful payment', res);
          await channel.publish(exch, 'successful payment', Buffer.from(paymentContent));
          await channel.ack(payment);
        }
      } catch (error) {
        console.error(error);
      }
    }, { noAck: false });
  }
  
}

consumeMessages().then(() => console.log('Connected')).catch(error => console.error(error));
