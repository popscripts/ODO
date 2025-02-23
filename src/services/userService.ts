import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'

class UserService {
    private ENDPOINT = 'api/users'
    private httpClient: FetchClientType = FetchClient

    async getUserData() {
        return await this.httpClient.get(`${this.ENDPOINT}/me`)
    }

    async setUserName(name: string) {
        return await this.httpClient.post(`${this.ENDPOINT}/me/personal-data`, {
            name
        })
    }

    async setPicture(formdata: FormData) {
        return await this.httpClient.postFormData(
            `${this.ENDPOINT}/me/picture`,
            formdata
        )
    }
}

export default new UserService()
