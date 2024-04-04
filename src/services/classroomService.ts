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

    async getParsedClassrooms() {
        try {
            const response = await this.httpClient.get('api/classroom/status')
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async changeClassroomStatus(
        id: number,
        status: string,
        prevStatus: string
    ) {
        try {
            const response = await this.httpClient.patch(
                'api/classroom/status',
                { id, status, prevStatus }
            )
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }
    async getVisitedClassrooms(GroupId: number) {
        try {
            const response = await this.httpClient.get(
                'api/group/visited-classrooms/' + GroupId
            )
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async addToVisitedClassrooms(groupId: number, classroomId: number) {
        try {
            const response = await this.httpClient.post(
                'api/group/visited-classrooms',
                {
                    id: groupId,
                    classroomId
                }
            )
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async removeFromVisitedClassrooms(groupId: number, classroomId: number) {
        try {
            const response = await this.httpClient.delete(
                'api/group/visited-classrooms',
                {
                    id: groupId,
                    classroomId
                }
            )
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}

export default new ClassroomService()
