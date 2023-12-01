import { Server, Socket } from 'socket.io'
import { Group, SocketUserData } from '@customTypes/auth.type'
import { Classroom, ClassroomStatusEvent } from '@customTypes/classroom.type'
import { socketClassroomStatusVerification } from '@middlewares/socketClassroomStatusVerifiaction'
import { getClassroom } from '@services/classroom.service'
import { setClassroomStatus } from '@utils/status.helper'
import { getGroupByMemberId } from '@services/auth.service'
import { logger } from '@config/logger'

export const roomHandler = (
    socket: Socket,
    data: SocketUserData,
    error: Error
): void => {
    if (error) {
        console.log(error.message)
    } else {
        socket.join(data.accountType)
        console.log(data.username + ' joined room: ' + data.accountType)
    }
}

export const newMessageHandler = (
    io: Server,
    data: any,
    error: Error
): void => {
    if (error) {
        console.log(error.message)
    } else {
        io.in(data.room).emit('receive_message', data.message)
        console.log(
            `message from ${data.username} - ${data.message} to room: ${data.room}`
        )
    }
}

export const statusHandler = async (
    io: Server,
    data: ClassroomStatusEvent,
    error: Error
): Promise<void> => {
    if (error) {
        console.log(error)
    } else {
        try {
            const { id, status, prevStatus, userId } = data
            const group: Group | null = await getGroupByMemberId(userId)
            if (!group) {
                throw new Error('User is not a member of any group')
            }

            await setClassroomStatus(id, status, group.id)
            const classroom: Classroom | null = await getClassroom(id)

            io.emit('classroomStatus', {
                prevStatus,
                classroom
            })

            console.log(
                `Classroom ${id} status changed from ${prevStatus} to ${status} by ${userId}`
            )
        } catch (error: any) {
            console.log(error.message)
        }
    }
}

export const socketMiddlewareHandler = async (
    event: Event[],
    next: any
): Promise<void> => {
    logger.info(event[0])
    switch (event[0].toString()) {
        case 'setClassroomStatus':
            try {
                const { id, status, userId, accountType } =
                    event[1] as ClassroomStatusEvent
                if (
                    await socketClassroomStatusVerification(
                        id,
                        status,
                        userId,
                        accountType
                    )
                ) {
                    next()
                } else {
                    next(new Error('Something went wrong'))
                }

                break
            } catch (error: any) {
                next(new Error('Something went wrong'))
                break
            }
        default:
            next()
            break
    }
}
