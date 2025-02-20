import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'

class UserService {
    private ENDPOINT = 'api/users'
    private httpClient: FetchClientType = FetchClient

    async getUserData() {
        return await this.httpClient.get(`${this.ENDPOINT}/me`)
    }

    async setUserName(userId: number, name: string) {
        return await this.httpClient.post(
            `${this.ENDPOINT}/${userId}/personal-data`,
            {
                name
            }
        )
    }

    async setPicture(userId: number, formdata: FormData) {
        return await this.httpClient.postFormData(
            `${this.ENDPOINT}/${userId}/personal-data`,
            formdata
        )
    }
}

export default new UserService()
