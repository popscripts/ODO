import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'

class InfoService {
    private httpClient: FetchClientType = FetchClient

    async getInfo() {
        return await this.httpClient.get('api/infos')
    }
}

export default new InfoService()
