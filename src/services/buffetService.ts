import { FetchClientType } from '../types/fetchClient.type'
import FetchClient from '../utils/FetchClient'
import { OrderPosition, OrderStatus } from '../types/buffet.type'

class BuffetService {
    private httpClient: FetchClientType = FetchClient

    async getOrders() {
        try {
            const response = await this.httpClient.get('api/buffet/user')
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async placeOrder(orderPositions: OrderPosition[], comment: string) {
        try {
            const response = await this.httpClient.post('api/buffet', {
                order: {
                    orderPositions,
                    comment
                }
            })
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async changeOrderStatus(id: number, statusId: number) {
        try {
            const response = await this.httpClient.patch('api/buffet', {
                id,
                statusId
            })
            return response.json()
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}

export default new BuffetService()
