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
        return await this.httpClient.post('api/group', {
            groupSize,
            description,
            groupMembers
        })
    }

    async updateGroup(
        id: number,
        groupSize: number | null,
        description: string | null,
        groupMembers: GroupMember[]
    ) {
        return await this.httpClient.put('api/group', {
            id,
            groupSize,
            description,
            groupMembers
        })
    }

    async removeGroup(id: number) {
        return await this.httpClient.delete('api/group', {
            id
        })
    }

    async leaveGroup(id: number) {
        return await this.httpClient.put('api/group/leave', {
            id
        })
    }

    async searchMembers(member: string) {
        return await this.httpClient.get(
            'api/dynamic-content/members?value=' + member
        )
    }
}

export default new GroupService()
