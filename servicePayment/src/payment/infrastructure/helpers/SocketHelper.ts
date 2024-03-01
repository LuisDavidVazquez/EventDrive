import socketClient from 'socket.io-client'
import { ISocketUseCase } from '../../application/Services/ISocketUseCase'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.SOCKET_PORT

export class SocketHelper implements ISocketUseCase {
  private socket: any

  constructor() {
    if(port)
    this.socket = socketClient(port)
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data)
  }
}