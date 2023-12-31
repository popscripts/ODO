import * as ClassroomService from '../services/classroom.service'
import { Request, Response } from 'express'
import * as Error from '../libs/errors'
import * as Callback from '../libs/callbacks'
import * as AuthHelper from '../utils/auth.helper'
import { setClassroomStatus } from '../utils/status.helper'
import { Token } from '../types/auth.type'
import { verifyToken } from '../utils/auth.helper'
import { logger } from '../config/logger'

export const listClassrooms = async (request: Request, response: Response) => {
    try {
        const token: string = request.cookies.JWT
        const tokenData: Token = verifyToken(token, 'accessToken')
        const classrooms = await ClassroomService.listClassrooms(tokenData.openDayId)
        return response.status(200).json({ result: classrooms, error: 0 })
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const addClassroom = async (request: Request, response: Response) => {
    try {
        const { classroom, title, description, managedById } = request.body
        const token = request.cookies.JWT
        const tokenData = verifyToken(token, 'accessToken')
        await ClassroomService.addClassroom(tokenData.openDayId, classroom, title, description, managedById)
        return response.status(201).json(Callback.newClassroom)
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const updateClassroom = async (request: Request, response: Response) => {
    try {
        const editedClassroom = request.body
        const id: number = request.body.id
        await ClassroomService.updateClassroom(id, editedClassroom)
        return response.status(201).json(Callback.editClassroom)
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const deleteClassroom = async (request: Request, response: Response) => {
    try {
        const id: number = request.body.id
        await ClassroomService.deleteClassroom(id)
        return response.status(200).json(Callback.deleteClassroom)
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const restoreClassroom = async (request: Request, response: Response) => {
    try {
        const id: number = request.body.id
        await ClassroomService.restoreClassroom(id)
        return response.status(200).json(Callback.restoreClassroom)
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const listClassroomsByStatuses = async (request: Request, response: Response) => {
    try {
        const token: string = request.cookies.JWT
        const tokenData: Token = verifyToken(token, 'accessToken')
        const free = await ClassroomService.listFreeClassrooms(tokenData.openDayId)
        const busy = await ClassroomService.listBusyClassrooms(tokenData.openDayId)
        const reserved = await ClassroomService.listReservedClassrooms(tokenData.openDayId)
        const classrooms = {
            free,
            busy,
            reserved
        }
        return response.status(200).json({ result: classrooms, error: 0 })
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const changeClassroomStatus = async (request: Request, response: Response) => {
    try {
        const { id, status } = request.body
        const token = request.cookies.JWT
        const tokenData: Token = AuthHelper.verifyToken(token, 'accessToken')
        await setClassroomStatus(id, status, tokenData.id)
        return response.status(201).json(Callback.changeStatus)
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}
