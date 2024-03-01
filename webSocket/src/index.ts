import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from "dotenv";

dotenv.config();

const clientHost = process.env.CLIENT_HOST;
const port = process.env.PORT  ;
const app = express()

app.use(express.json())
if(clientHost)
app.use(cors({
  origin: [clientHost]
}))

const server = app.listen(port, () => {
  console.log('api-websocket is running on port 3002')
})

const io: Server = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: [clientHost ? clientHost : '']
  }
})

io.on('connection', socket => {

  socket.on('payment', payment => {
    console.log('payment success and sended to client: ', payment)
    io.emit('payment-processed', payment)
  })

socket.on("connect_error", (error) => {
  console.error("Error de conexión:", error);
});

socket.on("disconnect", (reason) => {
  console.error("Desconectado:", reason);
});

})