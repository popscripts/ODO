import * as ClassroomService from '../services/classroom.service'
import { Classroom } from '../types/classroom.type'

export const setClassroomStatus = async (id: number, status: string, userId: number) => {
    const date = new Date()
    const classroom: Classroom | null = await ClassroomService.getClassroom(id)
    switch (status) {
        case 'free':
            // Check if classroom is busy and isn't reserved
            if (classroom?.status.status === 'busy' && classroom?.reservedBy === null) {
                await ClassroomService.setFreeStatus(id)
                break
            }

            // Check if classroom is busy and reserved by the user
            if (classroom?.status.status === 'busy' && classroom.reservedBy?.id === userId) {
                await ClassroomService.cancelReservation(id)
                break
            }

            if (classroom?.reservedBy !== null && classroom?.status.status !== 'busy') {
                await ClassroomService.setFreeStatus(id)
                break
            }

            // Check if classroom is reserved
            if (classroom?.reservedBy !== null) {
                await ClassroomService.setFreeWhenReserved(id)
                break
            }
            break
        case 'busy':
            if (classroom?.status.status === 'reserved') {
                await ClassroomService.setBusyClassroomWhenReserved(id, userId, date)
                break
            } else {
                await ClassroomService.setBusyStatus(id, userId, date)
                break
            }
        case 'reserved':
            if (classroom?.status.status === 'busy') {
                await ClassroomService.setReservedStatusWhenBusy(id, userId, date)
                break
            } else {
                await ClassroomService.setReservedStatus(id, userId, date)
                break
            }
    }
}
