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
            origin: process.env.EXPO_URI
        }
    })
}

export const ioConnectionConfig = (io: Server): void => {
    io.on('connection', (socket: Socket): void => {
        console.log('connected') // TODO... just for development
        socket.use(socketMiddlewareHandler)

        socket.on('joinRoom', (data, err) => roomHandler(socket, data, err))

        socket.on('setClassroomStatus', (data, err) =>
            statusHandler(io, data, err)
        )

        socket.on('send_message', (data, err) =>
            newMessageHandler(io, data, err)
        )

        socket.on('error', (error: Error): void => {
            socket.emit('error_handler', error.message)
        })
    })
}
