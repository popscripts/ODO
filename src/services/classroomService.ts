import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'

class ClassroomService {
    private ENDPOINT = 'api/classrooms'
    private httpClient: FetchClientType = FetchClient

    async getClassrooms() {
        await this.httpClient.get(this.ENDPOINT)
    }

    async getGroupedClassrooms() {
        return await this.httpClient.get(`${this.ENDPOINT}/grouped`)
    }

    async changeClassroomStatus(
        id: number,
        status: string,
        prevStatus: string
    ) {
        return await this.httpClient.patch(`${this.ENDPOINT}/${id}/status`, {
            status,
            prevStatus
        })
    }

    async addToVisitedClassrooms(groupId: number, classroomId: number) {
        return await this.httpClient.post(
            `api/groups/${groupId}/visited-classrooms/${classroomId}`
        )
    }

    async removeFromVisitedClassrooms(groupId: number, classroomId: number) {
        return await this.httpClient.delete(
            `api/groups/${groupId}/visited-classrooms/${classroomId}`
        )
    }
}

export default new ClassroomService()
