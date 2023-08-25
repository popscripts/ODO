import * as ClassroomService from '@services/classroom.service'
import { Request, Response } from 'express'
import * as Error from '@libs/errors'
import * as Callback from '@libs/callbacks'
import * as AuthHelper from '@utils/auth.helper'
import { setClassroomStatus } from '@utils/status.helper'
import {  Group,Token } from '@customTypes/auth.type'
import { verifyToken } from '@utils/auth.helper'
import { logger } from '@config/logger'
import { Classroom } from '@customTypes/classroom.type'
import { getGroupByMemberId } from '../services/auth.service'

export const listClassrooms = async (request: Request, response: Response) => {
    try {
        const token: string = request.cookies.JWT
        const { openDayId }: Token = verifyToken(token, 'accessToken')
        const classrooms: Classroom[] = await ClassroomService.listClassrooms(openDayId)
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
        const { openDayId }: Token = verifyToken(token, 'accessToken')
        await ClassroomService.addClassroom(openDayId, classroom, title, description, managedById)
        return response.status(201).json(Callback.newClassroom)
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const updateClassroom = async (request: Request, response: Response) => {
    try {
        const { id, classroom, title, description, managedById } = request.body
        await ClassroomService.updateClassroom(id, classroom, title, description, managedById)
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
        const free: Classroom[] = await ClassroomService.listFreeClassrooms(tokenData.openDayId)
        const busy: Classroom[] = await ClassroomService.listBusyClassrooms(tokenData.openDayId)
        const reserved: Classroom[] = await ClassroomService.listReservedClassrooms(tokenData.openDayId)
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
        const group: Group | null = await getGroupByMemberId(tokenData.id)
        await setClassroomStatus(id, status, group!.id)
        return response.status(201).json(Callback.changeStatus)
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}
