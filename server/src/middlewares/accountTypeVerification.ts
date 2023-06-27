import { NextFunction, Request, Response } from 'express'
import * as AuthHelper from '../utils/auth.helper'
import * as Error from '../libs/errors'
import { Token } from '../types/auth.type'

export const verifyAccountType = (...accountTypes: number[]) => {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            const accountTypesArray = [...accountTypes]
            const token = request.cookies.JWT
            const tokenData: Token = AuthHelper.verifyToken(token, 'accessToken')
            const result = accountTypesArray
                .map((allowedAccountType) => allowedAccountType === tokenData.accountType.id)
                .includes(true)
            if (!result) {
                return response.status(401).json(Error.permissionError)
            }
            next()
        } catch (error: any) {
            return response.status(401).json(Error.permissionError)
        }
    }
}
