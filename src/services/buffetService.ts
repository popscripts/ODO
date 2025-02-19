import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'
import { OrderPosition, OrderStatus } from '../types/buffet.type'

class BuffetService {
    private ENDPOINT = 'api/buffet'
    private httpClient: FetchClientType = FetchClient

    async getOrders() {
        return await this.httpClient.get('api/buffet/user') // TODO: nie wiem jaki
    }

    async placeOrder(orderPositions: OrderPosition[], comment: string) {
        return await this.httpClient.post(this.ENDPOINT, {
            order: {
                orderPositions,
                comment
            }
        })
    }

    async changeOrderStatus(id: number, statusId: number) {
        return await this.httpClient.patch(this.ENDPOINT, {
            id,
            statusId
        })
    }
}

export default new BuffetService()
