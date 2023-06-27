import { Server, Socket } from 'socket.io'
import { setClassroomStatus } from '../utils/status.helper'

type classroomStatus = {
    id: number
    userId: number
    status: string
    accountType: string
}

export const statusHandler = (io: Server, socket: Socket): void => {
    const changeClassroomStatus = async (data: classroomStatus): Promise<void> => {
        const { id, userId, status, accountType } = data
        // TODO... Add JWT verification middleware
        // await setClassroomStatus(id, status, userId)
        io.to(accountType).emit(
            'classroomStatuses',
            `Classroom ${id} status changed from free to ${status} by ${userId}`
        )
        console.log(`Classroom ${id} status changed from free to ${status} by ${userId}`)
    }

    socket.on('setClassroomStatus', changeClassroomStatus)
}
