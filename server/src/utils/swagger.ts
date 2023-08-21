import { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import docs from '../../swagger.json'

export const swaggerDocs = (app: Express) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs))

    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(docs)
    })
}
