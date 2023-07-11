import { Server as httpServer } from 'http'
import { Server, Socket } from 'socket.io'
import * as SocketHandler from '../utils/socket.handler'

export const socketConfig = (server: httpServer): Server => {
    return new Server(server, {
        cors: {
            origin: 'http://192.168.1.7:19000'
        }
    })
}

export const ioConnectionConfig = (io: Server): void => {
    io.on('connection', (socket: Socket): void => {
        console.log('connected')
        socket.use(SocketHandler.socketMiddlewareHandler)
        socket.on('joinRoomByAccountType', (data, err) => SocketHandler.roomHandler(socket, data, err))
        socket.on('send_message', (data, err) => SocketHandler.newMessageHandler(socket, data, err))
        socket.on('setClassroomStatus', (data, err) => SocketHandler.statusHandler(io, data, err))

        socket.on('error', (error: Error): void => {
            socket.emit('error_handler', error.message)
            console.log(error.message)
        })
    })
}
