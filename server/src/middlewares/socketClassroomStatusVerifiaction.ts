import { Classroom } from '../types/classroom.type'
import { getClassroom } from '../services/classroom.service'
import { Group } from '../types/auth.type'
import { getGroupByMemberId } from '../services/auth.service'

export const socketClassroomStatusVerification = async (
    classroomId: number,
    status: string,
    userId: number,
    accountType: string
): Promise<boolean> => {
    const classroom: Classroom | null = await getClassroom(classroomId)
    const group: Group | null = await getGroupByMemberId(userId)

    // Check if classroom is already free and request status is free
    if (classroom?.status.name === 'free' && status === 'free') {
        return false
    }

    // Check if user is an admin
    if (accountType === 'admin') {
        return true
    }

    // Check if classroom is free and no classroom is taken by him
    if (classroom?.status.name === 'free' && group?.Taken === null) {
        return true
    }

    // Check if classroom isn't reserved and request status is "reserved"
    if (classroom?.status.name !== 'reserved' && status === 'reserved') {
        return true
    }

    // Check if user is a manager of the classroom
    if (accountType === 'classroomManager' && classroom?.managedBy?.id === userId) {
        return true
    }

    // Check if classroom is taken by group
    if (classroomId === group?.Taken?.id) {
        return true
    }

    // Check if classroom is reserved by user and classroom isn't busy
    if (group?.Reserved?.id === classroomId && classroom?.status.name !== 'busy') {
        return true
    }

    // Check if classroom is reserved by user and request status is "free"
    if (group?.Reserved?.id === classroomId && status === 'free') {
        return true
    }

    return false
}
