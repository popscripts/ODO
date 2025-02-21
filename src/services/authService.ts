import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'

class AuthService {
    private ENDPOINT = 'api/auth'
    private httpClient: FetchClientType = FetchClient

    async logIn(email: string, password: string) {
        return await this.httpClient.post(`${this.ENDPOINT}/login`, {
            email,
            password
        })
    }

    async register(key: number, email: string, password: string) {
        return await this.httpClient.post(`${this.ENDPOINT}/register`, {
            key,
            email,
            password
        })
    }

    async logOut() {
        return await this.httpClient.get(`${this.ENDPOINT}/logout`)
    }
}

export default new AuthService()
