import { Server as httpServer } from 'http'
import { Server, Socket } from 'socket.io'
import {
    newMessageHandler,
    roomHandler,
    socketMiddlewareHandler,
    statusHandler
} from '@utils/socket.handler'

export const socketConfig = (server: httpServer): Server => {
    return new Server(server, {
        cors: {
            origin: 'http://192.168.1.11:19000'
        }
    })
}

export const ioConnectionConfig = (io: Server): void => {
    io.on('connection', (socket: Socket): void => {
        console.log('connected')
        socket.use(socketMiddlewareHandler)
        socket.on('joinRoomByAccountType', (data, err) =>
            roomHandler(socket, data, err)
        )
        socket.on('send_message', (data, err) =>
            newMessageHandler(io, data, err)
        )
        socket.on('setClassroomStatus', (data, err) =>
            statusHandler(io, data, err)
        )

        socket.on('error', (error: Error): void => {
            socket.emit('error_handler', error.message)
            console.log(error)
        })
    })
}
