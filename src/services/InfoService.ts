import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'

class InfoService {
    private httpClient: FetchClientType = FetchClient

    async getInfo() {
        try {
            const response = await this.httpClient.get('api/info')
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}

export default new InfoService()
