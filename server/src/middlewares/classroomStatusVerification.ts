import { Request, Response, NextFunction } from 'express'
import * as AuthHelper from '../utils/auth.helper'
import * as AuthService from '../services/auth.service'
import { Classroom } from '../types/classroom.type'
import { getClassroom } from '../services/classroom.service'
import * as Error from '../libs/errors'

export const classroomStatusVerification = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { id, status } = request.body
    const token = request.cookies.JWT
    const tokenData: any = AuthHelper.verifyToken(token, 'accessToken')
    const classroom: Classroom | null = await getClassroom(id)
    let verified = false

    const user = await AuthService.getUser(tokenData.id)

    // Check if classroom is already free and request status is free
    if (classroom?.status.status === 'free' && status === 'free') {
        return response.status(500).json(Error.classroomAlreadyFree)
    }

    // Check if user is an admin
    if (tokenData.accountType.accountType === 'admin') {
        verified = true
    }

    // Check if classroom is free and no classroom is taken by him
    if (classroom?.status.status === 'free' && user?.TakenClassroom.length === 0) {
        verified = true
    }

    // Check if classroom isn't reserved and request status is "reserved"
    if (classroom?.status.status !== 'reserved' && status === 'reserved') {
        verified = true
    }

    // Check if user is a manager of the classroom
    Object.values(user!.ManagedClassroom).forEach((managedClassroom) => {
        if (managedClassroom.id === id) {
            verified = true
        }
    })

    // Check if classroom is taken by user
    Object.values(user!.TakenClassroom).forEach((takenClassroom) => {
        if (takenClassroom.id === id && status === 'free') {
            verified = true
        }
    })

    // Check if classroom is reserved by user and classroom isn't busy
    Object.values(user!.ReservedClassroom).forEach((reservedClassroom) => {
        if (reservedClassroom.id === id && reservedClassroom.status.status !== 'busy') {
            verified = true
        }
    })

    // Check if classroom is reserved by user and request status is "free"
    Object.values(user!.ReservedClassroom).forEach((reservedClassroom) => {
        if (reservedClassroom.id === id && status === 'free') {
            verified = true
        }
    })

    if (verified) {
        next()
    } else {
        return response.status(500).json(Error.responseError)
    }
}
