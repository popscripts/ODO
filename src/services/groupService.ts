import { GroupMember } from '../types/auth.type'
import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'

class GroupService {
    private httpClient: FetchClientType = FetchClient

    async createGroup(
        groupSize: number | null,
        description: string | null,
        groupMembers: GroupMember[]
    ) {
        try {
            const response = await this.httpClient.post('api/group', {
                groupSize,
                description,
                groupMembers
            })
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async updateGroup(
        id: number,
        groupSize: number | null,
        description: string | null,
        groupMembers: GroupMember[]
    ) {
        try {
            const response = await this.httpClient.put('api/group', {
                id,
                groupSize,
                description,
                groupMembers
            })
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async removeGroup(id: number) {
        try {
            const response = await this.httpClient.delete('api/group', {
                id
            })
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async searchMembers(member: string) {
        try {
            const response = await this.httpClient.get(
                'api/dynamic-content/members?value=' + member
            )
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}

export default new GroupService()
