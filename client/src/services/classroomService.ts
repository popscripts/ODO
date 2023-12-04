import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'

class ClassroomService {
    private httpClient: FetchClientType = FetchClient

    async getClassrooms() {
        try {
            const response = await this.httpClient.get('api/classroom')
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async changeClassroomStatus(id: number, status: string) {
        try {
            const response = await this.httpClient.patch('api/classroom/status', { id, status })
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}

export default new ClassroomService()
