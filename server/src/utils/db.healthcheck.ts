import { db } from './db.server'
import { logger } from '../config/logger'

export const dbHealthCheck = (): Promise<void> => {
    return dbStatus().then((status) => {
        if (!status) {
            logger.error('Database connection error')
            process.exit(1)
        } else {
            logger.info('Database connected!')
        }
    })
}
const dbStatus = async (): Promise<boolean> => {
    try {
        await db.$queryRaw`SELECT 1`
        return true
    } catch (error: any) {
        return false
    }
}
