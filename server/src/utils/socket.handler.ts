import { Server, Socket } from 'socket.io'
import { Group, SocketUserData } from '../types/auth.type'
import { Classroom, ClassroomStatusEvent } from '../types/classroom.type'
import { socketClassroomStatusVerification } from '../middlewares/socketClassroomStatusVerifiaction'
import { getClassroom } from '../services/classroom.service'
import { setClassroomStatus } from './status.helper'
import { getGroupByMemberId } from '../services/auth.service'

export const roomHandler = (socket: Socket, data: SocketUserData, error: Error): void => {
    if (error) {
        console.log(error.message)
    } else {
        socket.join(data.accountType)
        console.log(data.username + ' joined room: ' + data.accountType)
    }
}

export const newMessageHandler = (socket: Socket, data: any, error: Error): void => {
    if (error) {
        console.log(error.message)
    } else {
        socket.broadcast.emit('receive_message', data.message)
        console.log(`message from ${data.username} - ${data.message} to room: ${data.room}`)
    }
}

export const statusHandler = async (io: Server, data: any, error: Error): Promise<void> => {
    if (error) {
        console.log('error.message')
    } else {
        try {
            const { classroomId, status, prevStatus, userId, accountType } = data as ClassroomStatusEvent
            const group: Group | null = await getGroupByMemberId(userId)
            await setClassroomStatus(classroomId, status, group!.id)

            const classroom: Classroom | null = await getClassroom(classroomId)
            io.to(accountType).emit('classroomStatuses', {
                prevStatus,
                status,
                classroom
            })
            console.log(
                `Classroom ${classroomId} status changed from ${prevStatus} to ${status} by ${userId}`
            )
        } catch (error: any) {
            console.log(error.message)
        }
    }
}

export const socketMiddlewareHandler = async (event: Event[], next: any): Promise<void> => {
    switch (event[0].toString()) {
        case 'setClassroomStatus':
            try {
                const { classroomId, status, userId, accountType } = event[1] as ClassroomStatusEvent
                if (await socketClassroomStatusVerification(classroomId, status, userId, accountType)) {
                    next()
                }
                break
            } catch (error: any) {
                console.log(error.message)
                break
            }
        default:
            next()
            break
    }
}
