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
        return await this.httpClient.patch(
            `${this.ENDPOINT}/${id}/status`,
            {
                status,
                prevStatus
            }
        )
    }

    async addToVisitedClassrooms(groupId: number, classroomId: number) {
        return await this.httpClient.post(
            'api/group/visited-classrooms', // TODO.. Przenieść do grup
            {
                id: groupId,
                classroomId
            }
        )
    }

    async removeFromVisitedClassrooms(groupId: number, classroomId: number) {
        return await this.httpClient.delete(
            'api/group/visited-classrooms', // TODO.. Przenieść do grup
            {
                id: groupId,
                classroomId
            }
        )
    }
}

export default new ClassroomService()
