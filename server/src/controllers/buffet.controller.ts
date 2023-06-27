import { Request, Response } from 'express'
import * as BuffetService from '../services/buffet.service'
import * as Error from '../libs/errors'
import { verifyToken } from '../utils/auth.helper'
import { Token } from '../types/auth.type'
import * as Callback from '../libs/callbacks'
import { statuses } from '../libs/statuses'
import { logger } from '../config/logger'

export const orders = async (request: Request, response: Response) => {
    try {
        const token = request.cookies.JWT
        const tokenData: Token = verifyToken(token, 'accessToken')
        const orders = await BuffetService.getOrders(tokenData.openDayId)
        return response.status(200).json({ result: orders, error: 0 })
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const userOrders = async (request: Request, response: Response) => {
    try {
        const token: string = request.cookies.JWT
        const tokenData = verifyToken(token, 'accessToken')
        const usersOrders = await BuffetService.getUserOrders(tokenData.id)
        return response.status(200).json({ result: usersOrders, error: 0 })
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const ordersByStatus = async (request: Request, response: Response) => {
    try {
        const status: string = request.params.status
        const token = request.cookies.JWT
        const tokenData: Token = verifyToken(token, 'accessToken')
        const statusId: number = statuses[status]
        const orders = await BuffetService.getOrdersByStatus(tokenData.openDayId, statusId)
        return response.status(200).json({ result: orders, error: 0 })
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const placeOrder = async (request: Request, response: Response) => {
    try {
        const order: string = request.body.order
        const tokenData = verifyToken(request.cookies.JWT, 'accessToken')
        await BuffetService.placeOrder(tokenData.openDayId, tokenData.id, order)
        return response.status(201).json(Callback.newOrder)
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const changeOrderStatus = async (request: Request, response: Response) => {
    try {
        const { id, status } = request.body
        const statusId = statuses[status]
        await BuffetService.changeOrderStatus(id, statusId)
        return response.status(200).json(Callback.changeStatus)
    } catch (error: any) {
        logger.error(`500 | ${error}`)
        return response.status(500).json(Error.responseError)
    }
}

export const userOrdersByStatus = async (request: Request, response: Response) => {
    try {
        const status: string = request.params.status
        const statusId: number = statuses[status]
        const token: string = request.cookies.JWT
        const tokenData = verifyToken(token, 'accessToken')
        const usersOrders = await BuffetService.getUserOrdersByStatus(
            tokenData.openDayId,
            statusId,
            tokenData.id
        )
        return response.status(200).json({ result: usersOrders, error: 0 })
    } catch (error: any) {
        return response.status(500).json(Error.responseError)
    }
}
