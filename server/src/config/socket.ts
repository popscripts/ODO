import { Server as httpServer } from 'http'
import { Server, Socket } from 'socket.io'
import { messageHandler } from '../handlers/message.handler'
import { connectionHandler } from '../handlers/connection.handler'
import { statusHandler } from '../handlers/status.handler'
export const socketConfig = (server: httpServer): Server => {
    return new Server(server, {
        cors: {
            origin: 'http://192.168.1.7:19000'
        }
    })
}

export const ioConnectionConfig = (io: Server): void => {
    io.on('connection', (socket: Socket): void => {
        messageHandler(io, socket)
        connectionHandler(io, socket)
        statusHandler(io, socket)
    })
}
