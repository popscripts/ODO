import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'

class AuthService {
    private ENDPOINT = 'api/auth'
    private httpClient: FetchClientType = FetchClient

    async logIn(username: string, password: string) {
        return await this.httpClient.post(`${this.ENDPOINT}/login`, {
            username,
            password
        })
    }

    async register(key: number, username: string, password: string) {
        return await this.httpClient.post(`${this.ENDPOINT}/register`, {
            key,
            username,
            password
        })
    }

    async logOut() {
        return await this.httpClient.get(`${this.ENDPOINT}/logout`)
    }
}

export default new AuthService()
