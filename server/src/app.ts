import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { routerConfig } from './config/router'
import { dbHealthCheck } from './utils/db.healthcheck'
import cookieParser from 'cookie-parser'
import { cronConfig } from './config/cron'
import { logger, morganMiddleware } from './config/logger'
import fileUpload from 'express-fileupload'

dotenv.config()

if (!process.env.PORT) {
    logger.error('PORT is undefined')
    process.exit(1)
}

dbHealthCheck()

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()
app.use(cors())
app.use(
    fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
        }
    })
)
app.use(express.json())
app.use(cookieParser())
app.use(morganMiddleware)
routerConfig(app)
if (process.env.ODO_ENV === 'prod') {
    cronConfig()
}

app.listen(PORT, () => {
    logger.info('Server started!')
})
