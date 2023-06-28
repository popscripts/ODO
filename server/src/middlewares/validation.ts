import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validate = (validations: Array<any>) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(request)))

        const errors = validationResult(request)
        if (errors.isEmpty()) {
            return next()
        }

        return response
            .status(422)
            .json({ result: errors.array()[0].msg, error: 1, param: errors.array()[0].param })
    }
}
